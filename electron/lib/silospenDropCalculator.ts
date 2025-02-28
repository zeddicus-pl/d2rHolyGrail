import { join } from 'path';
import { IpcMainEvent } from 'electron/renderer';
// @ts-ignore
import fetch, { Response } from 'node-fetch';
import { silospenMapping } from './silospenMapping';
import { getHolyGrailSeedData } from './holyGrailSeedData';
import { versions, which } from 'njar';
import { spawn } from 'child_process'
import { SilospenItem } from '../../src/@types/main.d';
import https from 'https';
import settingsStore from './settings';
import { flattenObject } from '../../src/utils/objects';
import { eventToReply } from '../main';
import getPort, {portNumbers} from 'get-port';

const httpsAgent = new https.Agent({
  rejectUnauthorized: false,
});

let silospenFallback = false;
let silospenPort = 3766;

export function fetchSilospen(event: IpcMainEvent, type: string, itemName: string) {
  const name = silospenMapping[itemName.trim()] || 'null';
  const settings = settingsStore.getSettings();
  const players = settings.playersNumber || 1;
  const mf = settings.magicFind !== null ? settings.magicFind : 0;
  if (silospenFallback) {
    const url = 'https://dropcalc.silospen.com/dropcalc.php?type=itemProbabilities&decMode=false&monsterId=undefined&difficulty=none&monsterType=BOSS&players='+players+'&party=1&magicFind='+mf+'&itemQuality='+type+'&decMode=false&desecrated=0&desecratedLevel=0&version=D2R_V1_0&itemId=' + encodeURIComponent(name);
    fetch(url, {
      agent: httpsAgent
    })
      .then((response: any) => response.text())
      .then((text: string) => {
        event.reply('silospenResponse', parseSilospenServerResponse(JSON.parse(text)));
      })
      .catch((err: any) => {
        console.log(err);
        event.reply('silospenResponse', err.message ? err.message : '')
      });
  } else {
    const url = 'http://localhost:'+silospenPort+'/tabularItem?decMode=false&version=D2R_V1_0&monsterType=BOSS&desecrated=0&desecratedLevel=0&itemQuality='+type+'&party=1&players='+players+'&magicFind='+mf+'&itemId=' + encodeURIComponent(name);
    fetch(url)
      .then((response: any) => response.text())
      .then((text: string) => {
        event.reply('silospenResponse', parseSilospenServerResponse(JSON.parse(text)));
      })
      .catch((err: any) => {
        console.log(err);
        event.reply('silospenResponse', err.message ? err.message : '')
      });
  }
}

const parseSilospenServerResponse = (json: any): SilospenItem[] => {
  if (!json || !json.rows) {
    console.log(json);
    throw new Error("Invalid Silospen response");
  }
  return json.rows.map((row: string[]) => ({
    name: row[0],
    area: row[1],
    chance: row[2].split(':')[1].replace(/,/g, ' ').replace(/\s\s+/g, ' '),
  }))
}

export async function runSilospenServer() {
  const jarPath = join(__dirname, './bin/DropCalc-1.0.jar');
  silospenPort = await getPort({port: portNumbers(3766, 3866)});
  try {
    const versionList = await versions();
    if (versionList && versionList.length) {
      const javaPath = await which();
      // executing async, not waiting to finish, because the process is meant to run in the background
      const output = spawn(javaPath, ['-jar', jarPath, '--server.port=' + silospenPort]);
      output.stdout.on('data', (data) => {
        console.log(data.toString());
      })
      output.stderr.on('data', (data) => {
        console.log(data.toString());
      })
      let tries = 0;
      const tryConnectingToLocalSilospenServer = () => {
        setTimeout(() => {
          try {
            fetch('http://localhost:' + silospenPort)
              .then((response: Response) => {
                if (response.status !== 200) {
                  if (tries < 3) {
                    tries++;
                    tryConnectingToLocalSilospenServer();
                    return;
                  }
                  console.log('FAILED to run silospen drop calculator server (status !== 200)');
                  silospenFallback = true;
                } else {
                  console.log('CONNECTED to local Silospen server');
                }
              })
              .catch((e) => {
                if (tries < 3) {
                  tries++;
                  tryConnectingToLocalSilospenServer();
                  return;
                }
                console.log('FAILED to run silospen drop calculator server (fetch failed)', e);
                silospenFallback = true;
              });
          } catch (e) {
            if (tries < 3) {
              tries++;
              tryConnectingToLocalSilospenServer();
              return;
            }
            console.log('FAILED to run silospen drop calculator server (fetch failed)', e);
            silospenFallback = true;
          }
        }, 5000); // it starts up in around 4-6 seconds for here
      };
      tryConnectingToLocalSilospenServer();
    } else {
      console.log('NO JAVA FOUND IN SYSTEM');
      silospenFallback = true;
    }
  } catch (e) {
    console.log('FAILED to run silospen drop calculator server, exception:', e);
    silospenFallback = true;
  }
}

const sets = flattenObject(getHolyGrailSeedData(null, false).sets, 'sets');

export async function getAllDropRates() {
  const keys = Object.keys(silospenMapping);
  const chances: {[key:string]: SilospenItem[]} = {};

  for await (const key of keys) {
    const silospenName = silospenMapping[key];
    const url = 'http://localhost:3667/itemProbabilities?version=D2R_V1_0&monsterType=BOSS&itemQuality='+(sets[key] ? 'SET' : 'UNIQUE')+'&party=1&players=3&magicFind=200&itemId=' + encodeURIComponent(silospenName);
    const response = await fetch(url);
    const json: SilospenItem[] = await response.json();
    if (json.length > 0) {
      const items = json.filter((item) => item.name.indexOf('(q)') === -1);
      if (items.length) {
        chances[key] = items;
      }
    }
  }

  eventToReply?.reply('allDropRates', chances);
}
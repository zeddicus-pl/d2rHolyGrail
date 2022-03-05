import { join } from 'path';
import { IpcMainEvent } from 'electron/renderer';
// @ts-ignore
import fetch, { Response } from 'node-fetch';
import { silospenMapping } from './silospenMapping';
import { holyGrailSeedData } from './holyGrailSeedData';
import { execute } from 'njar';
import { SilospenItem, AllSilospenItems } from '../../src/@types/main.d';
import https from 'https';
import settingsStore from './settings';
import { flattenObject } from '../../src/utils/objects';
import { eventToReply } from '../main';

const httpsAgent = new https.Agent({
  rejectUnauthorized: false,
});

let silospenFallback = false;

export function fetchSilospen(event: IpcMainEvent, type: string, itemName: string) {
  const name = silospenMapping[itemName.trim()] || 'null';
  const settings = settingsStore.getSettings();
  const players = settings.playersNumber || 1;
  const mf = settings.magicFind !== null ? settings.magicFind : 0;
  if (silospenFallback) {
    const url = 'https://dropcalc.silospen.com/dropcalc.php?type=item&monsterId=undefined&difficulty=none&monsterType=BOSS&players='+players+'&party=1&magicFind='+mf+'&itemQuality='+type+'&decMode=false&version=D2R_V1_0&itemId=' + encodeURIComponent(name);
    fetch(url, {
      agent: httpsAgent
    })
      .then((response: any) => response.text())
      .then((text: any) => {
        const lines: SilospenItem[] = text
          .split('</td></tr><tr><td>')
          .map((line: string) => line.replace('<tr><td>', '').replace('</td></tr>', ''))
          .map((line: string) => {
            if (line.indexOf('No Results!') !== -1) {
              return { name: "No Results!", area: "", chance: 0 };
            }
            const [name, area, chance] = line.split('</td><td>');
            return { name, area, chance: chance.split(':')[1]};
          });
        event.reply('silospenResponse', lines)
      })
      .catch((err: any) =>
        event.reply('silospenResponse', err.message)
      );
  } else {
    const url = 'http://localhost:3667/item?version=D2R_V1_0&monsterType=BOSS&itemQuality='+type+'&party=1&players='+players+'&magicFind='+mf+'&itemId=' + encodeURIComponent(name);
    fetch(url)
      .then((response: any) => response.json())
      .then((json: any) => {
        const lines: SilospenItem[] = json.map((item: any) => {
          return {
            name: item.name,
            area: item.area,
            chance: Math.round(1 / item.prob),
          }
        })
        event.reply('silospenResponse', lines);
      })
      .catch((err: any) =>
        event.reply('silospenResponse', err.message)
      );
  }
}

export function runSilospenServer() {
  const jarPath = join(__dirname, './bin/DropCalc-1.0.jar');
  try {
    execute(jarPath);
    setTimeout(() => {
      try {
        fetch('http://localhost:3667')
          .then((response: Response) => {
            if (response.status !== 200) {
              console.log('FAILED to run silospen drop calculator server (status !== 200)');
              silospenFallback = true;
            }
          })
          .catch((e) => {
            console.log('FAILED to run silospen drop calculator server (fetch failed)', e);
            silospenFallback = true;
          });
      } catch (e) {
        console.log('FAILED to run silospen drop calculator server (fetch failed)', e);
        silospenFallback = true;
      }
    }, 5000);
  } catch (e) {
    console.log('FAILED to run silospen drop calculator server, exception:', e);
    silospenFallback = true;
  }
}

const sets: AllSilospenItems = {};
flattenObject(holyGrailSeedData.sets, sets);

export async function getAllDropRates() {
  const keys = Object.keys(silospenMapping);
  const chances: {[key:string]: SilospenItem[]} = {};

  for await (const key of keys) {
    const silospenName = silospenMapping[key];
    const url = 'http://localhost:3667/item?version=D2R_V1_0&monsterType=BOSS&itemQuality='+(sets[key] ? 'SET' : 'UNIQUE')+'&party=1&players=3&magicFind=200&itemId=' + encodeURIComponent(silospenName);
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
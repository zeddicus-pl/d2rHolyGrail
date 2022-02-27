import { join } from 'path';
import { IpcMainEvent } from 'electron/renderer';
// @ts-ignore
import fetch from 'node-fetch';
import { silospenMapping } from './silospenMapping';
import { execute } from 'njar';
import { SilospenItem } from '../../src/@types/main';
import https from 'https';

const httpsAgent = new https.Agent({
  rejectUnauthorized: false,
});

let silospenFallback = false;

export function fetchSilospen(event: IpcMainEvent, type: string, itemName: string) {
  const name = silospenMapping[itemName.trim()] || 'null';
  if (silospenFallback) {
    const url = 'https://dropcalc.silospen.com/dropcalc.php?type=item&monsterId=undefined&difficulty=none&monsterType=BOSS&players=1&party=1&magicFind=0&itemQuality='+type+'&decMode=false&version=D2R_V1_0&itemId=' + encodeURIComponent(name);
    console.log(url);
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
    const url = 'http://localhost:3667/item?version=D2R_V1_0&monsterType=BOSS&itemQuality='+type+'&party=1&players=1&magicFind=0&itemId=' + encodeURIComponent(name);  
    console.log(url);
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
      fetch('http://localhost:3667')
        .then((response: any) => console.log('TEST', response));
    }, 5000);
  } catch (e) {
    silospenFallback = true;
  }
}
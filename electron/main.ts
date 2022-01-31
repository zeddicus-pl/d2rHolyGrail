import { app, BrowserWindow, ipcMain, dialog, shell } from 'electron';
import * as d2s from '@dschu012/d2s';
import { constants } from '@dschu012/d2s/lib/data/versions/96_constant_data';
import { readFileSync } from 'fs';
import { basename, extname, join } from 'path';
import { IpcMainEvent } from 'electron/renderer';
import { readdirSync } from 'original-fs';
import { ItemsInSaves } from '../src/@types/main';
// @ts-ignore
import fetch from 'node-fetch';
import https from 'https';
import { silospenMapping } from './silospenMapping';

const httpsAgent = new https.Agent({
  rejectUnauthorized: false,
});

let mainWindow: BrowserWindow | null

declare const MAIN_WINDOW_WEBPACK_ENTRY: string
declare const MAIN_WINDOW_PRELOAD_WEBPACK_ENTRY: string

const assetsPath =
  process.env.NODE_ENV === 'production'
    ? process.resourcesPath
    : app.getAppPath()

function createWindow () {
  mainWindow = new BrowserWindow({
    icon: join(assetsPath, 'assets', 'icon.png'),
    width: 1100,
    height: 700,
    backgroundColor: '#111111',
    webPreferences: {
      nodeIntegration: false,
      contextIsolation: true,
      preload: MAIN_WINDOW_PRELOAD_WEBPACK_ENTRY
    }
  })

  mainWindow.loadURL(MAIN_WINDOW_WEBPACK_ENTRY)
  // mainWindow.webContents.openDevTools()

  mainWindow.on('closed', () => {
    if (process.platform !== 'darwin') {
      app.quit()
    }
  })
}

async function registerListeners () {
  ipcMain.on('openFolderRequest', (event, arg) => {
    openAndParseSaves(event);
  });
  ipcMain.on('openUrl', (_, url) => {
    shell.openExternal(url);
  });
  ipcMain.on('silospenRequest', (event, type, itemName) => {
    fetchSilospen(event, type, itemName);
  });
}

app.on('ready', createWindow)
  .whenReady()
  .then(registerListeners)
  .catch(e => console.error(e))

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit()
  }
})

app.on('activate', () => {
  if (BrowserWindow.getAllWindows().length === 0) {
    createWindow()
  }
})

const openAndParseSaves = (event: IpcMainEvent) => {
  return dialog.showOpenDialog({
    title: "Select Diablo 2 / Diablo 2 Ressurected save folder",
    message: "Select Diablo 2 / Diablo 2 Ressurected save folder",
    properties: ['openDirectory'],
  }).then((result) => {
    if (result.filePaths[0]) {
      event.reply('openFolderWorking', null);
      parseSaves(result.filePaths[0]).then((results) => {
        event.reply('openFolder', results);
      });
    } else {
      event.reply('openFolder', null);
    }
  }).catch((e) => {
    console.log(e);
  });
};

const parseSaves = async (path: string) => {
  const results: ItemsInSaves = {};
  const files = readdirSync(path).filter(file => extname(file).toLowerCase() === '.d2s');
  const promises = files.map((file) => {
    const saveName = basename(file).replace(".d2s", "");
    return parseSave(saveName, readFileSync(join(path, file), null))
      .then((result) => {
        result.forEach((item) => {
          if (results[item.unique_name]) {
            if (results[item.unique_name].saveName) {
              results[item.unique_name].saveName.push(saveName);
            } else {
              results[item.unique_name].saveName = [saveName];
            }
          } else {
            results[item.unique_name] = {
              item,
              saveName: [ saveName ],
            }
          }
        });
      });
  });
  return Promise.all(promises).then(() => results);
}

const parseSave = async (saveName: string, content: Buffer): Promise<d2s.types.IItem[]>  => {
  const items: d2s.types.IItem[] = [];
  try {
    await d2s.read(content, constants).then((response) => {
      response.items.forEach((item) => {
        if (item.unique_name) {
          items.push(item);
        }
      });
    }).catch((e) => {
      console.log('CATCH', saveName, e);
    });
    console.log('OK', saveName)
  } catch (e) {
    console.log('ERROR', saveName, e);
  }
  return items;
};

const fetchSilospen = (event: IpcMainEvent, type: string, itemName: string) => {
  const name = silospenMapping[itemName.trim()] || 'null';
  const url = 'https://dropcalc.silospen.com/dropcalc.php?type=item&monsterId=undefined&difficulty=HELL&monsterType=BOSS&players=1&party=1&magicFind=0&itemQuality='+type+'&decMode=false&version=D2R_V1_0&itemId=' + encodeURIComponent(name);
  console.log(url);
  fetch(url, {
    agent: httpsAgent
  })
    .then((response: any) => response.text())
    .then((text: any) =>
      event.reply('silospenResponse', '<html><body><table cellspacing="0" cellpadding="5" border="1" style="border-color: #999">' + text + '</table></body></html>')
    )
    .catch((err: any) =>
      event.reply('silospenResponse', err.message)
    );
}
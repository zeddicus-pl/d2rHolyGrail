import { app, BrowserWindow, ipcMain, dialog, shell, session } from 'electron';
import { writeFile } from 'fs';
import { extname, join } from 'path';
import { IpcMainEvent } from 'electron/renderer';
import WindowStateKeeper from "electron-window-state";
import { fetchSilospen, getAllDropRates, runSilospenServer } from './lib/silospenDropCalculator'
import itemsDatabase from './lib/items';
import settingsStore from './lib/settings';
import { setupStreamFeed, updateDataToListeners } from './lib/stream';

// these constants are set by the build stage
declare const MAIN_WINDOW_WEBPACK_ENTRY: string
declare const MAIN_WINDOW_PRELOAD_WEBPACK_ENTRY: string

export const CSP_HEADER =
  "default-src 'self' 'unsafe-inline' data: ws:; " +
  "script-src 'self' 'unsafe-eval' 'unsafe-inline' data:; " +
  "style-src 'unsafe-inline'; " +
  "style-src-elem 'unsafe-inline' http://localhost:*; " +
  "font-src http://localhost:*; " +
  "frame-src http://localhost:3666";

export let eventToReply: IpcMainEvent | null;
export function setEventToReply(e: IpcMainEvent) {
  eventToReply = e;
}

let mainWindow: BrowserWindow | null

const assetsPath =
  process.env.NODE_ENV === 'production'
    ? process.resourcesPath
    : app.getAppPath()

function createWindow () {
  session.defaultSession.webRequest.onHeadersReceived((details, callback) => {
    // eslint-disable-next-line node/no-callback-literal
    callback({
      responseHeaders: {
        ...details.responseHeaders,
        'Content-Security-Policy': [ CSP_HEADER ]
      }
    })
  })

  const mainWindowState = WindowStateKeeper({
    defaultWidth: 1100,
    defaultHeight: 700,
  });

  mainWindow = new BrowserWindow({
    icon: join(assetsPath, 'assets', 'icon.png'),
    x: mainWindowState.x,
    y: mainWindowState.y,
    width: mainWindowState.width,
    height: mainWindowState.height,
    minWidth: 540,
    minHeight: 300,
    backgroundColor: '#111111',
    autoHideMenuBar: true,
    webPreferences: {
      nodeIntegration: false,
      contextIsolation: true,
      preload: MAIN_WINDOW_PRELOAD_WEBPACK_ENTRY,
    }
  })
  mainWindowState.manage(mainWindow);

  mainWindow.loadURL(MAIN_WINDOW_WEBPACK_ENTRY)
  if (process.env.ELECTRON_ENV === 'development') {
    mainWindow.webContents.openDevTools()
  }

  mainWindow.on('closed', () => {
    closeApp();
  })

  setupStreamFeed();
  runSilospenServer();
}

async function closeApp () {
  itemsDatabase.shutdown();
  app.quit();
}

async function registerListeners () {
  ipcMain.on('readFilesUponStart', (event) => {
    itemsDatabase.readFilesUponStart(event);
  });
  ipcMain.on('openFolderRequest', (event) => {
    itemsDatabase.openAndParseSaves(event);
  });
  ipcMain.on('openUrl', (_, url) => {
    shell.openExternal(url);
  });
  ipcMain.on('silospenRequest', (event, type, itemName) => {
    fetchSilospen(event, type, itemName);
  });
  ipcMain.on('getSetting', (event, key) => {
    event.returnValue = settingsStore.getSetting(key);
  });
  ipcMain.on('getSettings', (event) => {
    eventToReply = event;
    event.returnValue = settingsStore.getSettings();
  });
  ipcMain.on('saveSetting', (event, key, value) => {
    settingsStore.saveSetting(key, value);
  });
  ipcMain.on('saveImage', (event, data: string) => {
    saveImage(data);
  });
  ipcMain.on('loadManualItems', (event) => {
    eventToReply = event;
    itemsDatabase.loadManualItems();
    event.reply('openFolder', itemsDatabase.getItems());
    updateDataToListeners();
  });
  ipcMain.on('saveManualItem', (event, itemId, isFound) => {
    eventToReply = event;
    itemsDatabase.saveManualItem(itemId, isFound);
    event.reply('openFolder', itemsDatabase.getItems());
    updateDataToListeners();
  });
  ipcMain.on('getAllDropRates', (event) => {
    eventToReply = event;
    getAllDropRates();
  })
}

app.on('ready', createWindow)
  .whenReady()
  .then(registerListeners)
  .catch(e => console.error(e))

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    closeApp();
  }
})

app.on('activate', () => {
  if (BrowserWindow.getAllWindows().length === 0) {
    createWindow()
  }
})

const saveImage = async (data: string) => {
  return dialog.showSaveDialog({
    defaultPath: 'HolyGrail.png',
    properties: ['createDirectory'],
  }).then((result) => {
    if (result.filePath) {
      const regExMatches = data.match('data:(image/.*);base64,(.*)');
      if (regExMatches && regExMatches[2]) {
        const buffer = Buffer.from(regExMatches[2], 'base64')
        const filePath = extname(result.filePath).length ? result.filePath : result.filePath + '.png'
        writeFile(filePath, buffer, (err) => {
          if (err) {
            console.log('Failed saving the file: ' + JSON.stringify(err, null, 4));
          }
        });
      }
    }
  }).catch((e) => {
    console.log(e);
  });
}

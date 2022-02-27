import { app, BrowserWindow, ipcMain, dialog, shell, session } from 'electron';
import { writeFile } from 'fs';
import { extname, join } from 'path';
import { IpcMainEvent } from 'electron/renderer';
import WindowStateKeeper from "electron-window-state";
import { fetchSilospen, runSilospenServer } from './lib/silospenDropCalculator'
import { currentData, loadManualItems, openAndParseSaves, readFilesUponStart, saveManualItem, shutdown } from './lib/items';
import { getSetting, getSettings, saveSetting } from './lib/settings';
import { updateDataToListeners } from './lib/stream';

// these constants are set by the build stage
declare const MAIN_WINDOW_WEBPACK_ENTRY: string
declare const MAIN_WINDOW_PRELOAD_WEBPACK_ENTRY: string

export const CSP_HEADER =
  "default-src 'self' 'unsafe-inline' data: ws:; " +
  "script-src 'self' 'unsafe-eval' 'unsafe-inline' data:; " +
  "style-src 'unsafe-inline'; " +
  "style-src-elem 'unsafe-inline' https://fonts.googleapis.com; " +
  "font-src https://fonts.gstatic.com; " +
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

  runSilospenServer();
}

async function closeApp () {
  shutdown();
  app.quit();
}

async function registerListeners () {
  ipcMain.on('readFilesUponStart', (event) => {
    readFilesUponStart(event);
  });
  ipcMain.on('openFolderRequest', (event) => {
    openAndParseSaves(event);
  });
  ipcMain.on('openUrl', (_, url) => {
    shell.openExternal(url);
  });
  ipcMain.on('silospenRequest', (event, type, itemName) => {
    fetchSilospen(event, type, itemName);
  });
  ipcMain.on('getSetting', (event, key) => {
    event.returnValue = getSetting(key);
  });
  ipcMain.on('getSettings', (event) => {
    eventToReply = event;
    event.returnValue = getSettings();
  });
  ipcMain.on('saveSetting', (event, key, value) => {
    saveSetting(key, value);
  });
  ipcMain.on('saveImage', (event, data: string) => {
    saveImage(data);
  });
  ipcMain.on('loadManualItems', (event) => {
    eventToReply = event;
    loadManualItems();
    event.reply('openFolder', currentData);
    updateDataToListeners();
  });
  ipcMain.on('saveManualItem', (event, itemId, isFound) => {
    eventToReply = event;
    saveManualItem(itemId, isFound);
    event.reply('openFolder', currentData);
    updateDataToListeners();
  });
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
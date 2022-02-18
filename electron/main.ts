import { app, BrowserWindow, ipcMain, dialog, shell, session } from 'electron';
import * as d2s from '@dschu012/d2s';
import * as d2stash from '@dschu012/d2s/lib/d2/stash';
import { constants } from '@dschu012/d2s/lib/data/versions/96_constant_data';
import { existsSync, promises, writeFile } from 'fs';
import { basename, extname, join, resolve, sep } from 'path';
import { IpcMainEvent } from 'electron/renderer';
import { readdirSync } from 'original-fs';
import { FileReaderResponse, GameMode, Settings, SilospenItem } from '../src/@types/main';
// @ts-ignore
import fetch from 'node-fetch';
import https from 'https';
import storage from 'electron-json-storage';
import { silospenMapping } from './silospenMapping';
import chokidar, { FSWatcher } from 'chokidar';
import WindowStateKeeper from "electron-window-state";
import express from "express";
import http from "http";
import request from "request";
import { Server, Socket } from "socket.io";

const { readFile } = promises;

// these constants are set by the build stage
declare const STREAM_WEBPACK_ENTRY: string;
declare const MAIN_WINDOW_WEBPACK_ENTRY: string
declare const MAIN_WINDOW_PRELOAD_WEBPACK_ENTRY: string

const CSP_HEADER =
  "default-src 'self' 'unsafe-inline' data: ws:; " +
  "script-src 'self' 'unsafe-eval' 'unsafe-inline' data:; " +
  "style-src 'unsafe-inline'; " +
  "style-src-elem 'unsafe-inline' fonts.googleapis.com; " +
  "font-src fonts.gstatic.com; " +
  "frame-src http://localhost:3666";

const httpsAgent = new https.Agent({
  rejectUnauthorized: false,
});

let mainWindow: BrowserWindow | null
let fileWatcher: FSWatcher | null = null;
let watchPath: string | null = null;
let filesChanged: boolean = false;
let readingFiles: boolean = false;
let eventToReply: IpcMainEvent | null;
let currentData: FileReaderResponse;
let currentSettings: Settings = {
  lang: 'en',
  saveDir: '',
  gameMode: GameMode.Both,
}

const streamListeners: Map<string, Socket> = new Map();

storage.setDataPath(app.getPath('userData'));

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

  currentSettings = getSettings();

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

  const streamApp = express();
  const server = http.createServer(streamApp);
  const io = new Server(server, {
    serveClient: false,
  });

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  streamApp.get("/", (req: any, res: any) => {
    if (STREAM_WEBPACK_ENTRY.startsWith("http")) {
      request(STREAM_WEBPACK_ENTRY)
        .on("response", remoteRes => {
            remoteRes.headers["content-security-policy"] = CSP_HEADER;
        })
        .pipe(res);
    } else {
      res.setHeader('content-security-policy', CSP_HEADER);
      res.sendFile(STREAM_WEBPACK_ENTRY.replace('file://', ''));
    }
  });

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  streamApp.get("/stream/index.js", (req: any, res: any) => {
    res.sendFile(resolve(join(__dirname, "..", "renderer", "stream", "index.js")));
  });

  io.on("connection", (socket: Socket) => {
    console.log('client connected')
    addStreamListener(socket);
    socket.on("disconnect", () => {
      console.log('client disconnected')
      removeStreamListener(socket);
    });
  });

  server.listen(3666);
}

async function closeApp () {
  if (fileWatcher) {
    await fileWatcher.close();
  }
  app.quit();
}

const addStreamListener = (socket: Socket): void => {
  streamListeners.set(socket.id, socket);
  socket.emit("updatedSettings", currentSettings);
  socket.emit("openFolder", currentData);
}

const removeStreamListener = (socket: Socket): void => {
  streamListeners.delete(socket.id);
}

const updateSettingsToListeners = () => {
  streamListeners.forEach((socket) => {
    socket.emit("updatedSettings", currentSettings);
  })
}

const updateDataToListeners = () => {
  streamListeners.forEach((socket) => {
    socket.emit("openFolder", currentData);
  })
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

const getSettings = (): Settings => {
  return (storage.getSync('settings') as Settings);
}

const getSetting = <K extends keyof Settings>(key: K): Settings[K] | null => {
  return currentSettings[key] ? currentSettings[key] : null;
}

const saveSetting = <K extends keyof Settings>(key: K, value: Settings[K]) => {
  currentSettings[key] = value;
  storage.set('settings', currentSettings, (error) => {
    if (error) console.log(error);
    if (eventToReply) {
      eventToReply.reply('updatedSettings', currentSettings);
    }
    updateSettingsToListeners();
  });
}

const loadManualItems = () => {
  const data = (storage.getSync('manualItems') as FileReaderResponse);
  if (!data.items) {
    storage.set('manualItems', {items: {}, stats: {}}, (err) => {
      if (err) {
        console.log(err);
      }
    });
    currentData = {items: {}, stats: {}}
  } else {
    currentData = data;
  }
}

const saveManualItem = (itemId: string, isFound: boolean) => {
  if (isFound) {
    currentData.items[itemId] = { item: null, saveName: [] }
  } else if (currentData.items[itemId]) {
    delete(currentData.items[itemId]);
  }
  storage.set('manualItems', currentData, (err) => {
    if (err) {
      console.log(err);
    }
  });
}

const openAndParseSaves = (event: IpcMainEvent) => {
  return dialog.showOpenDialog({
    title: "Select Diablo 2 / Diablo 2 Resurrected save folder",
    message: "Select Diablo 2 / Diablo 2 Resurrected save folder",
    properties: ['openDirectory'],
  }).then((result) => {
    if (result.filePaths[0]) {
      const path = result.filePaths[0];
      event.reply('openFolderWorking', null);
      parseSaves(event, path);
    } else {
      event.reply('openFolder', null);
    }
  }).catch((e) => {
    console.log(e);
  });
};

const tickReader = async () => {
  if (eventToReply && watchPath && filesChanged && !readingFiles && currentSettings.gameMode !== GameMode.Manual) {
    console.log('re-reading files!');
    readingFiles = true;
    filesChanged = false;
    await parseSaves(eventToReply, watchPath);
    readingFiles = false;
  }
}
setInterval(tickReader, 200);

const prepareChokidarGlobe = (filename: string): string => {
  if (filename.length < 2) {
    return filename;
  }
  const resolved = resolve(filename);
  return resolved.substring(0, 1) + resolved.substring(1).split(sep).join('/') + '/*.{d2s,sss,d2x}';
}

const parseSaves = async (event: IpcMainEvent, path: string) => {
  const results: FileReaderResponse = {
    items: {},
    stats: {},
  };
  const files = readdirSync(path).filter(file => ['.d2s', '.sss', '.d2x'].indexOf(extname(file).toLowerCase()) !== -1);

  if (!eventToReply) {
    eventToReply = event;
  }

  if (files.length) {
    // if no file watcher is active
    if (!fileWatcher) {
      watchPath = path;
      fileWatcher = chokidar.watch(prepareChokidarGlobe(watchPath), {
        followSymlinks: false,
        ignoreInitial: true,
        depth: 0,
      }).on('all', () => {
        filesChanged = true;
      });
    }
    // if file watcher is enabled, and directory changed
    if (fileWatcher && watchPath && watchPath !== path) {
      fileWatcher.unwatch(prepareChokidarGlobe(watchPath)).add(prepareChokidarGlobe(path));
      watchPath = path;
    }
  }

  const promises = files.map((file) => {
    const saveName = basename(file).replace(".d2s", "").replace(".sss", "").replace(".d2x", "");
    return readFile(join(path, file))
      .then((buffer) => parseSave(saveName, buffer, extname(file).toLowerCase()))
      .then((result) => {
        result.forEach((item) => {
          let name = item.unique_name || item.set_name || item.rare_name || item.rare_name2 || '';
          if (name.indexOf('Rainbow Facet') !== -1) {
            let type = '';
            let skill = '';
            item.magic_attributes.forEach((attr) => {
              if (attr.name === 'item_skillondeath') { type = 'death' }
              if (attr.name === 'item_skillonlevelup') { type = 'levelup' }
              if (attr.name === 'passive_cold_mastery') { skill = 'cold' }
              if (attr.name === 'passive_pois_mastery') { skill = 'poison' }
              if (attr.name === 'passive_fire_mastery') { skill = 'fire' }
              if (attr.name === 'passive_ltng_mastery') { skill = 'lightning' }
            })
            name = name + skill + type;
          }
          if (name === '') return;
          const itemName = name.toLowerCase().replace(/[^a-z0-9]/gi, '');
          if (results.items[itemName]) {
            if (results.items[itemName].saveName) {
              results.items[itemName].saveName.push(saveName);
            } else {
              results.items[itemName].saveName = [saveName];
            }
          } else {
            results.items[itemName] = {
              item,
              saveName: [ saveName ],
            }
          }
          results.stats[saveName] = result.length;
        });
      })
      .catch((e) => {
        console.log("ERROR", e);
        results.stats[saveName] = null;
      })
  });
  return Promise.all(promises).then(() => {
    if (path && path !== '') {
      saveSetting('saveDir', path);
    }
    event.reply('openFolder', results);
    currentData = results;
    updateDataToListeners();
  });
}

const parseSave = async (saveName: string, content: Buffer, extension: string): Promise<d2s.types.IItem[]>  => {
  const items: d2s.types.IItem[] = [];
  
  const parseItems = (itemList: d2s.types.IItem[]) => {
    itemList.forEach((item) => {
      if (item.unique_name || item.set_name || item.rare_name || item.rare_name2) {
        items.push(item);
      }
      if (item.socketed_items && item.socketed_items.length) {
        parseItems(item.socketed_items);
      }
    });
  }

  const parseD2S = (response: d2s.types.ID2S) => {
    if (currentSettings.gameMode === GameMode.Softcore && response.header.status.hardcore) {
      return [];
    }
    if (currentSettings.gameMode === GameMode.Hardcore && !response.header.status.hardcore) {
      return [];
    }
    const itemList = [
      ...response.items,
      ...response.merc_items,
      ...response.corpse_items,
    ]
    parseItems(itemList);
  };

  const parseStash = (response: d2s.types.IStash) => {
    response.pages.forEach(page => {
      parseItems(page.items);
    });
  }

  switch (extension) {
    case '.sss':
    case '.d2x':
        await d2stash.read(content, constants, 0x60).then(parseStash);
      break;
    default:
      await d2s.read(content, constants).then(parseD2S);
  }
  return items;
};

async function readFilesUponStart (event: IpcMainEvent) {
  const saveDir = getSetting('saveDir');
  if (saveDir && existsSync(saveDir)) {
    parseSaves(event, saveDir);
  } else {
    event.reply('noDirectorySelected', null);
  }
}

const fetchSilospen = (event: IpcMainEvent, type: string, itemName: string) => {
  const name = silospenMapping[itemName.trim()] || 'null';
  const url = 'https://dropcalc.silospen.com/dropcalc.php?type=item&monsterId=undefined&difficulty=none&monsterType=BOSS&players=1&party=1&magicFind=0&itemQuality='+type+'&decMode=false&version=D2R_V1_0&itemId=' + encodeURIComponent(name);
  console.log(url);
  fetch(url, {
    agent: httpsAgent
  })
    .then((response: any) => response.text())
    .then((text: any) => {
      const lines: SilospenItem = text
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
}

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
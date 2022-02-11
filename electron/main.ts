import { app, BrowserWindow, ipcMain, dialog, shell } from 'electron';
import * as d2s from '@dschu012/d2s';
import { constants } from '@dschu012/d2s/lib/data/versions/96_constant_data';
import { readFileSync, existsSync } from 'fs';
import { basename, extname, join, resolve, sep } from 'path';
import { IpcMainEvent } from 'electron/renderer';
import { readdirSync } from 'original-fs';
import { FileReaderResponse, ItemsInSaves, Settings, SilospenItem, ItemInSave } from '../src/@types/main';
// @ts-ignore
import fetch from 'node-fetch';
import https from 'https';
import storage from 'electron-json-storage';
import { silospenMapping } from './silospenMapping';
import chokidar, { FSWatcher } from 'chokidar';

const httpsAgent = new https.Agent({
  rejectUnauthorized: false,
});

let mainWindow: BrowserWindow | null
let fileWatcher: FSWatcher | null = null;
let watchPath: string | null = null;
let filesChanged: boolean = false;
let readingFiles: boolean = false;
let eventToReply: IpcMainEvent | null;
let history: ItemsInSaves;

declare const MAIN_WINDOW_WEBPACK_ENTRY: string
declare const MAIN_WINDOW_PRELOAD_WEBPACK_ENTRY: string

storage.setDataPath(app.getPath('userData'));

const assetsPath =
  process.env.NODE_ENV === 'production'
    ? process.resourcesPath
    : app.getAppPath()

function createWindow () {
  mainWindow = new BrowserWindow({
    icon: join(assetsPath, 'assets', 'icon.png'),
    width: 1100,
    height: 700,
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

  mainWindow.loadURL(MAIN_WINDOW_WEBPACK_ENTRY)
  if (process.env.ELECTRON_ENV === 'development') {
    mainWindow.webContents.openDevTools()
  }

  mainWindow.on('closed', () => {
    closeApp();
  })
}

async function closeApp () {
  if (fileWatcher) {
    await fileWatcher.close();
  }
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

const getSetting = (key: keyof Settings): string | null => {
  const settings = getSettings();
  return settings[key] ? settings[key] : null;
}

const saveSetting = (key: keyof Settings, value: string) => {
  const settings = getSettings();
  settings[key] = value;
  storage.set('settings', settings, (error) => {
    if (error) console.log(error);
    if (eventToReply) {
      eventToReply.reply('updatedSettings', settings);
    }  
  });
}

const getHistory = (): ItemsInSaves => {
  history = (storage.getSync('history') as ItemsInSaves);
  return history;
}

const saveHistory = (items: ItemsInSaves) => {
  history = items;
  storage.set('history', items, (error) => {
    if (error) console.log(error);
  });
}

const updateHistory = (itemName: string, item: ItemInSave) => {
  history[itemName] = item;
  saveHistory(history);
}

const openAndParseSaves = (event: IpcMainEvent) => {
  return dialog.showOpenDialog({
    title: "Select Diablo 2 / Diablo 2 Ressurected save folder",
    message: "Select Diablo 2 / Diablo 2 Ressurected save folder",
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
  if (eventToReply && watchPath && filesChanged && !readingFiles) {
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
  return resolved.substring(0, 1) + resolved.substring(1).split(sep).join('/') + '/*.d2s';
}

const parseSaves = async (event: IpcMainEvent, path: string) => {
  const results: FileReaderResponse = {
    items: {},
    stats: {},
  };
  const files = readdirSync(path).filter(file => extname(file).toLowerCase() === '.d2s');

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
        ignored: /((^|[/\\])\.\.|(^.*\.[^d][^2][^s]))/,
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
    const saveName = basename(file).replace(".d2s", "");
    return parseSave(saveName, readFileSync(join(path, file), null))
      .then((result) => {
        if (!result.length) {
          results.stats[saveName] = 0;
        }
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
          const itemName = name.toLowerCase().replace(/[^a-z0-9]/gi, '').toLowerCase();
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
      });
  });
  return Promise.all(promises).then(() => {
    if (path && path !== '') {
      saveSetting('saveDir', path);
    }
    event.reply('openFolder', results);
  });
}

const parseSave = async (saveName: string, content: Buffer): Promise<d2s.types.IItem[]>  => {
  const items: d2s.types.IItem[] = [];
  await d2s.read(content, constants).then((response) => {
    const itemList = [
      ...response.items,
      ...response.merc_items,
      ...response.corpse_items,
    ]
    itemList.forEach((item) => {
      if (item.unique_name || item.set_name || item.rare_name || item.rare_name2) {
        items.push(item);
      }
    });
  })
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
          const [name, area, chance] = line.split('</td><td>');
          return { name, area, chance: chance.split(':')[1]};
        });
      event.reply('silospenResponse', lines)
    })
    .catch((err: any) =>
      event.reply('silospenResponse', err.message)
    );
}
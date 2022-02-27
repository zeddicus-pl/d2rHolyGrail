import { dialog } from 'electron';
import * as d2s from '@dschu012/d2s';
import * as d2stash from '@dschu012/d2s/lib/d2/stash';
import { constants } from '@dschu012/d2s/lib/data/versions/96_constant_data';
import { existsSync, promises } from 'fs';
import { basename, extname, join, resolve, sep } from 'path';
import { IpcMainEvent } from 'electron/renderer';
import { readdirSync } from 'original-fs';
import { FileReaderResponse, GameMode } from '../../src/@types/main';
import storage from 'electron-json-storage';
import chokidar, { FSWatcher } from 'chokidar';
import { holyGrailSeedData } from './holyGrailSeedData';
import { flattenObject } from '../../src/utils/objects';
import { eventToReply, setEventToReply } from '../main';
import { currentSettings, getSetting, saveSetting } from './settings';
import { updateDataToListeners } from './stream';
const { readFile } = promises;

export let currentData: FileReaderResponse;
let fileWatcher: FSWatcher | null = null;
let watchPath: string | null = null;
let filesChanged: boolean = false;
let readingFiles: boolean = false;

export function loadManualItems() {
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

export function saveManualItem (itemId: string, isFound: boolean) {
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

export function openAndParseSaves(event: IpcMainEvent) {
  return dialog.showOpenDialog({
    title: "Select Diablo 2 / Diablo 2 Resurrected save folder",
    message: "Select Diablo 2 / Diablo 2 Resurrected save folder",
    properties: ['openDirectory'],
  }).then((result) => {
    if (result.filePaths[0]) {
      const path = result.filePaths[0];
      event.reply('openFolderWorking', null);
      parseSaves(event, path, true);
    } else {
      event.reply('openFolder', null);
    }
  }).catch((e) => {
    console.log(e);
  });
};

function prepareChokidarGlobe(filename: string): string {
  if (filename.length < 2) {
    return filename;
  }
  const resolved = resolve(filename);
  return resolved.substring(0, 1) + resolved.substring(1).split(sep).join('/') + '/*.{d2s,sss,d2x}';
}

async function parseSaves(event: IpcMainEvent, path: string, userRequested: boolean) {
  const results: FileReaderResponse = {
    items: {},
    stats: {},
  };
  const files = readdirSync(path).filter(file => ['.d2s', '.sss', '.d2x'].indexOf(extname(file).toLowerCase()) !== -1);

  if (!eventToReply) {
    setEventToReply(event);
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

  // prepare item list
  const flatItems: {[itemName: string]: any} = {};
  flattenObject(holyGrailSeedData, flatItems);

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
          if (flatItems[itemName]) {
            results.stats[saveName] = (results.stats[saveName] || 0) + 1;
          }
        });
      })
      .catch((e) => {
        console.log("ERROR", e);
        results.stats[saveName] = null;
      })
  });
  return Promise.all(promises).then(() => {
    if (userRequested && path && path !== '') {
      saveSetting('saveDir', path);
    }
    event.reply('openFolder', results);
    currentData = results;
    updateDataToListeners();
  });
}

async function parseSave(saveName: string, content: Buffer, extension: string): Promise<d2s.types.IItem[]> {
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
    const items = response.items || [];
    const mercItems = response.merc_items || [];
    const corpseItems = response.corpse_items || [];
    const itemList = [
      ...items,
      ...mercItems,
      ...corpseItems,
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

export async function readFilesUponStart(event: IpcMainEvent) {
  const saveDir = getSetting('saveDir');
  if (saveDir && existsSync(saveDir)) {
    parseSaves(event, saveDir, false);
  } else {
    event.reply('noDirectorySelected', null);
  }
}

async function tickReader() {
  if (eventToReply && watchPath && filesChanged && !readingFiles && currentSettings.gameMode !== GameMode.Manual) {
    console.log('re-reading files!');
    readingFiles = true;
    filesChanged = false;
    await parseSaves(eventToReply, watchPath, false);
    readingFiles = false;
  }
}
setInterval(tickReader, 500);

export async function shutdown () {
  if (fileWatcher) {
    await fileWatcher.close();
  }
}

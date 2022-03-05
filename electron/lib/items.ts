import { dialog } from 'electron';
import * as d2s from '@dschu012/d2s';
import * as d2stash from '@dschu012/d2s/lib/d2/stash';
import { constants } from '@dschu012/d2s/lib/data/versions/96_constant_data';
import { existsSync, promises } from 'fs';
import { basename, extname, join, resolve, sep } from 'path';
import { IpcMainEvent } from 'electron/renderer';
import { readdirSync } from 'original-fs';
import { FileReaderResponse, GameMode } from '../../src/@types/main.d';
import storage from 'electron-json-storage';
import chokidar, { FSWatcher } from 'chokidar';
import { holyGrailSeedData } from './holyGrailSeedData';
import { flattenObject } from '../../src/utils/objects';
import { eventToReply, setEventToReply } from '../main';
import settingsStore from './settings';
import { updateDataToListeners } from './stream';
const { readFile } = promises;

class ItemsStore {
  currentData: FileReaderResponse;
  fileWatcher: FSWatcher | null;
  watchPath: string | null;
  filesChanged: boolean;
  readingFiles: boolean;

  constructor() {
    this.currentData = {
      items: {},
      stats: {}
    };
    this.fileWatcher = null;
    this.watchPath = null;
    this.filesChanged = false;
    this.readingFiles = false;
    setInterval(this.tickReader, 500);
  }

  getItems = () => {
    return this.currentData;
  }

  loadManualItems = () => {
    const data = (storage.getSync('manualItems') as FileReaderResponse);
    if (!data.items) {
      storage.set('manualItems', {items: {}, stats: {}}, (err) => {
        if (err) {
          console.log(err);
        }
      });
      this.currentData = {items: {}, stats: {}}
    } else {
      this.currentData = data;
    }
  }

  saveManualItem = (itemId: string, isFound: boolean) => {
    if (isFound) {
      this.currentData.items[itemId] = { item: null, saveName: [] }
    } else if (this.currentData.items[itemId]) {
      delete(this.currentData.items[itemId]);
    }
    storage.set('manualItems', this.currentData, (err) => {
      if (err) {
        console.log(err);
      }
    });
  }

  openAndParseSaves = (event: IpcMainEvent) => {
    return dialog.showOpenDialog({
      title: "Select Diablo 2 / Diablo 2 Resurrected save folder",
      message: "Select Diablo 2 / Diablo 2 Resurrected save folder",
      properties: ['openDirectory'],
    }).then((result) => {
      if (result.filePaths[0]) {
        const path = result.filePaths[0];
        event.reply('openFolderWorking', null);
        this.parseSaves(event, path, true);
      } else {
        event.reply('openFolder', null);
      }
    }).catch((e) => {
      console.log(e);
    });
  };

  prepareChokidarGlobe = (filename: string): string => {
    if (filename.length < 2) {
      return filename;
    }
    const resolved = resolve(filename);
    return resolved.substring(0, 1) + resolved.substring(1).split(sep).join('/') + '/*.{d2s,sss,d2x}';
  }

  parseSaves = async (event: IpcMainEvent, path: string, userRequested: boolean) => {
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
      if (!this.fileWatcher) {
        this.watchPath = path;
        this.fileWatcher = chokidar.watch(this.prepareChokidarGlobe(this.watchPath), {
          followSymlinks: false,
          ignoreInitial: true,
          depth: 0,
        }).on('all', () => {
          this.filesChanged = true;
        });
      }
      // if file watcher is enabled, and directory changed
      if (this.fileWatcher && this.watchPath && this.watchPath !== path) {
        this.fileWatcher.unwatch(this.prepareChokidarGlobe(this.watchPath)).add(this.prepareChokidarGlobe(path));
        this.watchPath = path;
      }
    }

    // prepare item list
    const flatItems: {[itemName: string]: any} = {};
    flattenObject(holyGrailSeedData, flatItems);

    const promises = files.map((file) => {
      const saveName = basename(file).replace(".d2s", "").replace(".sss", "").replace(".d2x", "");
      return readFile(join(path, file))
        .then((buffer) => this.parseSave(saveName, buffer, extname(file).toLowerCase()))
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
        settingsStore.saveSetting('saveDir', path);
      }
      event.reply('openFolder', results);
      this.currentData = results;
      updateDataToListeners();
    });
  }

  parseSave = async (saveName: string, content: Buffer, extension: string): Promise<d2s.types.IItem[]> => {
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
      const settings = settingsStore.getSettings()
      if (settings.gameMode === GameMode.Softcore && response.header.status.hardcore) {
        return [];
      }
      if (settings.gameMode === GameMode.Hardcore && !response.header.status.hardcore) {
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

  readFilesUponStart = async (event: IpcMainEvent) => {
    const saveDir = settingsStore.getSetting('saveDir');
    if (saveDir && existsSync(saveDir)) {
      this.parseSaves(event, saveDir, false);
    } else {
      event.reply('noDirectorySelected', null);
    }
  }

  tickReader = async () => {
    const settings = settingsStore.getSettings();
    if (eventToReply && this.watchPath && this.filesChanged && !this.readingFiles && settings.gameMode !== GameMode.Manual) {
      console.log('re-reading files!');
      this.readingFiles = true;
      this.filesChanged = false;
      await this.parseSaves(eventToReply, this.watchPath, false);
      this.readingFiles = false;
    }
  }

  shutdown = async () => {
    if (this.fileWatcher) {
      await this.fileWatcher.close();
    }
  }
}

const itemsStore = new ItemsStore();
export default itemsStore;
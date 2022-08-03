import { dialog } from 'electron';
import * as d2s from '@dschu012/d2s';
import * as d2stash from '@dschu012/d2s/lib/d2/stash';
import { constants } from '@dschu012/d2s/lib/data/versions/96_constant_data';
import { existsSync, promises } from 'fs';
import { basename, extname, join, resolve, sep } from 'path';
import { IpcMainEvent } from 'electron/renderer';
import { readdirSync } from 'original-fs';
import { AvailableRunes, FileReaderResponse, GameMode, GrailType, Item, ItemDetails, ItemNotes } from '../../src/@types/main.d';
import storage from 'electron-json-storage';
import chokidar, { FSWatcher } from 'chokidar';
import { getHolyGrailSeedData, runesSeed } from './holyGrailSeedData';
import { buildFlattenObjectCacheKey, flattenObject, isRune, simplifyItemName } from '../../src/utils/objects';
import { eventToReply, setEventToReply } from '../main';
import settingsStore from './settings';
import { updateDataToListeners } from './stream';
import { runesMapping } from './runesMapping';
import getPath from 'platform-folders';
const { readFile } = promises;

class ItemsStore {
  currentData: FileReaderResponse;
  fileWatcher: FSWatcher | null;
  watchPath: string | null;
  filesChanged: boolean;
  readingFiles: boolean;
  itemNotes: ItemNotes | null;

  constructor() {
    this.currentData = {
      items: {},
      ethItems: {},
      stats: {},
      availableRunes: {},
    };
    this.fileWatcher = null;
    this.watchPath = null;
    this.filesChanged = false;
    this.readingFiles = false;
    this.itemNotes = null;
    setInterval(this.tickReader, 500);
  }

  getItems = () => {
    return this.currentData;
  }

  // used only in manual selection mode
  fillInAvailableRunes = () => {
    // filling in all the runes into the "available runes"
    this.currentData.availableRunes = Object.keys(this.currentData.items).reduce(
      (acc: AvailableRunes, itemKey: string) => {
        const item = this.currentData.items[itemKey];
        if (runesSeed[itemKey]) {
          acc[itemKey] = item;
        }
        return acc;
      },
      {} as AvailableRunes
    );
  }

  loadManualItems = () => {
    const data = (storage.getSync('manualItems') as FileReaderResponse);
    if (!data.items) {
      storage.set('manualItems', { items: {}, ethItems: {}, stats: {} }, (err) => {
        if (err) {
          console.log(err);
        }
      });
      this.currentData = { items: {}, ethItems: {}, stats: {}, availableRunes: {} }
    } else {
      // for compatibility with older manual items format
      if (!data.ethItems) {
        data.ethItems = {};
      }
      // filling in the "inSaves" information that is missing in older format
      Object.keys(this.currentData.items).forEach((key) => {
        if (!this.currentData.items[key].inSaves) {
          this.currentData.items[key] = this.createManualItem(1);
        }
      })
      Object.keys(this.currentData.ethItems).forEach((key) => {
        if (!this.currentData.ethItems[key].inSaves) {
          this.currentData.ethItems[key] = this.createManualItem(1);
        }
      })

      this.currentData = data;
      this.fillInAvailableRunes();
    }
  }

  saveManualItem = (itemId: string, count: number) => {
    if (count > 0) {
      this.currentData.items[itemId] = this.createManualItem(count);
    } else if (this.currentData.items[itemId]) {
      delete (this.currentData.items[itemId]);
    }
    storage.set('manualItems', this.currentData, (err) => {
      if (err) {
        console.log(err);
      }
    });
  }
  
  saveManualEthItem = (itemId: string, count: number) => {
    if (count > 0) {
      this.currentData.ethItems[itemId] = this.createManualItem(count);
    } else if (this.currentData.ethItems[itemId]) {
      delete (this.currentData.ethItems[itemId]);
    }
    storage.set('manualItems', this.currentData, (err) => {
      if (err) {
        console.log(err);
      }
    });
  }

  createManualItem = (count: number) => {
    return <Item>{
      inSaves: {
        "Manual entry": new Array(count).fill(<ItemDetails>{}),
      },
      name: '',
      type: '',
    };
  }

  getItemNotes = async (): Promise<ItemNotes> => {
    if (!!this.itemNotes) {
      return this.itemNotes;
    }
    this.itemNotes = await new Promise((resolve, reject) => {
      storage.get('itemNotes', (err, data) => {
        if (err) reject(err);
        resolve(data as ItemNotes);
      });
    });
    return this.itemNotes || {};
  }

  setItemNote = async (itemName: string, note: string): Promise<ItemNotes> => {
    if (!this.itemNotes) {
      await this.getItemNotes();
    }
    if (this.itemNotes) {
      this.itemNotes[itemName] = note;
      storage.set('itemNotes', this.itemNotes, (err) => {
        if (err) {
          console.log(err);
        }
      });
    }
    return this.itemNotes || {};
  }

  openAndParseSaves = (event: IpcMainEvent) => {
    return dialog.showOpenDialog({
      defaultPath: getPath('savegames'),
      title: "Select Diablo 2 / Diablo 2 Resurrected save folder",
      message: "Select Diablo 2 / Diablo 2 Resurrected save folder",
      properties: ['openDirectory', 'openFile'],
      filters: [
        { name: "Diablo 2 Save Files", extensions: ["d2s", "d2x", "sss", "d2i"] },
      ]
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
    return resolved.substring(0, 1) + resolved.substring(1).split(sep).join('/') + '/*.{d2s,sss,d2x,d2i}';
  }

  parseSaves = async (event: IpcMainEvent, path: string, userRequested: boolean, playSounds: boolean = false) => {
    const results: FileReaderResponse = {
      items: {},
      ethItems: {},
      stats: {},
      availableRunes: {}
    };
    const files = readdirSync(path).filter(file => ['.d2s', '.sss', '.d2x', '.d2i'].indexOf(extname(file).toLowerCase()) !== -1);

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
    const settings = settingsStore.getSettings();
    const flatItems = flattenObject(getHolyGrailSeedData(settings, false), buildFlattenObjectCacheKey('all', settings));
    const ethFlatItems = flattenObject(getHolyGrailSeedData(settings, true), 'ethall');

    const promises = files.map((file) => {
      const saveName = basename(file).replace(".d2s", "").replace(".sss", "").replace(".d2x", "").replace(".d2i", "");
      return readFile(join(path, file))
        .then((buffer) => this.parseSave(saveName, buffer, extname(file).toLowerCase()))
        .then((result) => {
          results.stats[saveName] = 0;
          result.forEach((item) => {
            let name = item.unique_name || item.set_name || item.rare_name || item.rare_name2 || '';
            name = name.toLowerCase().replace(/[^a-z0-9]/gi, '');
            if (name.indexOf('rainbowfacet') !== -1) {
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
            } else if (isRune(item)) {
              name = runesMapping[item.type].name.toLowerCase();
            } else if (item.type === 'runeword') {
              name = item.runeword_name;
            } else if (!flatItems[name] && (item.ethereal && !ethFlatItems[name])) {
              return;
            } else if (name === '') {
              return;
            };
            const savedItem: ItemDetails = {
              ethereal: !!item.ethereal,
              ilevel: item.level,
              socketed: !!item.socketed,
            }
            let key: 'items' | 'ethItems' = settings.grailType === GrailType.Each &&   savedItem.ethereal ? 'ethItems' : 'items';
            if (results[key][name]) {
              if (!results[key][name].inSaves[saveName]) {
                results[key][name].inSaves[saveName] = [];
              }
              results[key][name].inSaves[saveName].push(savedItem);
            } else {
              results[key][name] = {
                name,
                inSaves: {},
                type: item.type,
              }
              results[key][name].inSaves[saveName] = [ savedItem ];
            }
            if (isRune(item) && !item.socketed) {
              if (results.availableRunes[name]) {
                if (!results.availableRunes[name].inSaves[saveName]) {
                  results.availableRunes[name].inSaves[saveName] = [];
                }
                results.availableRunes[name].inSaves[saveName].push(savedItem);
              } else {
                results.availableRunes[name] = {
                  name,
                  inSaves: {},
                  type: item.type,
                }
                results.availableRunes[name].inSaves[saveName] = [ savedItem ];
              }
            }
            results.stats[saveName] = (results.stats[saveName] || 0) + 1;
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

    const parseItems = (itemList: d2s.types.IItem[], isEmbed: boolean = false) => {
      itemList.forEach((item) => {
        if (item.unique_name || item.set_name || item.rare_name || item.rare_name2) {
          items.push(item);
        }
        if (isRune(item) && runesMapping[item.type]) {
          if (isEmbed) {
            item.socketed = 1; // the "socketed" in Rune item types will indicated that *it* sits inside socket
          }
          items.push(item);
        }
        if (item.socketed_items && item.socketed_items.length) {
          parseItems(item.socketed_items, true);
        }
        if (item.runeword_name) {
          // super funny bug in d2s parser :D
          if (item.runeword_name === 'Love') {
            item.runeword_name = 'Lore';
          }
          // we push Runewords as "items" for easier displaying in a list
          const newItem = <d2s.types.IItem>{
            runeword_name: "runeword" + simplifyItemName(item.runeword_name),
            type: "runeword",
          };
          items.push(newItem);
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
      const settings = settingsStore.getSettings()
      if (settings.gameMode === GameMode.Softcore && saveName.toLowerCase().includes('hardcore')) {
        return [];
      }
      if (settings.gameMode === GameMode.Hardcore && saveName.toLowerCase().includes('softcore')) {
        return [];
      }
      response.pages.forEach(page => {
        parseItems(page.items);
      });
    }

    switch (extension) {
      case '.sss':
      case '.d2x':
        await d2stash.read(content, constants, 0x60).then((response) => {
          response.hardcore === saveName.toLowerCase().includes('hardcore');
          parseStash(response);
        });
        break;
      case '.d2i':
        await d2stash.read(content, constants, 0x62).then(parseStash);
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
      await this.parseSaves(eventToReply, this.watchPath, false, true);
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
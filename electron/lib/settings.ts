import { app } from 'electron';
import { Settings } from '../../src/@types/main.d';
import storage from 'electron-json-storage';
import { eventToReply } from '../main';
import { updateSettingsToListeners } from './stream';
import defaultSettings from '../../src/utils/defaultSettings';

class SettingsStore {
  currentSettings: Settings = defaultSettings;

  constructor() {
    storage.setDataPath(app.getPath('userData'));
    this.currentSettings = this.loadSettings();
  }

  getSettings = (): Settings => {
    return this.currentSettings;
  }

  loadSettings = (): Settings => {
    const settings = (storage.getSync('settings') as Settings);
    return {
      ...defaultSettings,
      ...settings
    };
  }
  
  getSetting = <K extends keyof Settings>(key: K): Settings[K] | null => {
    return this.currentSettings[key] ? this.currentSettings[key] : null;
  }
  
  saveSetting = <K extends keyof Settings>(key: K, value: Settings[K]) => {
    this.currentSettings[key] = value;
    storage.set('settings', this.currentSettings, (error) => {
      if (error) console.log(error);
      if (eventToReply) {
        eventToReply.reply('updatedSettings', this.currentSettings);
      }
      updateSettingsToListeners();
    });
  }
}

const settingsStore = new SettingsStore();
export default settingsStore;
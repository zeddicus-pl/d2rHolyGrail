import { app } from 'electron';
import { GameMode, Settings } from '../../src/@types/main';
import storage from 'electron-json-storage';
import { eventToReply } from '../main';
import { updateSettingsToListeners } from './stream';

export let currentSettings: Settings = {
  lang: 'en',
  saveDir: '',
  gameMode: GameMode.Both,
}
currentSettings = getSettings();

storage.setDataPath(app.getPath('userData'));

export function getSettings(): Settings {
  return (storage.getSync('settings') as Settings);
}

export function getSetting <K extends keyof Settings>(key: K): Settings[K] | null {
  return currentSettings[key] ? currentSettings[key] : null;
}

export function saveSetting <K extends keyof Settings>(key: K, value: Settings[K]) {
  currentSettings[key] = value;
  storage.set('settings', currentSettings, (error) => {
    if (error) console.log(error);
    if (eventToReply) {
      eventToReply.reply('updatedSettings', currentSettings);
    }
    updateSettingsToListeners();
  });
}

import { contextBridge, ipcRenderer } from 'electron'
import { Settings } from '../src/@types/main.d'

export const api = {
  readFilesUponStart: () => {
    ipcRenderer.send('readFilesUponStart')
  },
  openFolder: () => {
    ipcRenderer.send('openFolderRequest')
  },
  openUrl: (url: string) => {
    ipcRenderer.send('openUrl', url)
  },
  getSilospen: (type: string, itemName: string) => {
    ipcRenderer.send('silospenRequest', type, itemName);
  },
  getSettings: (): Settings => {
    return ipcRenderer.sendSync('getSettings');
  },
  getSetting: <K extends keyof Settings>(key: K): Settings[K] => {
    return ipcRenderer.sendSync('getSetting', key);
  },
  saveSetting: <K extends keyof Settings>(key: K, value: Settings[K]) => {
    ipcRenderer.send('saveSetting', key, value);
  },
  saveImage: (data: string) => {
    ipcRenderer.send('saveImage', data);
  },
  loadManualItems: () => {
    ipcRenderer.send('loadManualItems');
  },
  saveManualItem: (itemName: string, count: number) => {
    ipcRenderer.send('saveManualItem', itemName, count);
  },
  saveManualEthItem: (itemName: string, count: number) => {
    ipcRenderer.send('saveManualEthItem', itemName, count);
  },
  getAllDropRates: () => {
    ipcRenderer.send('getAllDropRates');
  },
  isWindows: () => {
    return process.platform.includes('win');
  },
  downloadNewVersion: (url: string) => {
    ipcRenderer.send('downloadNewVersion', url);
  },
  cancelDownload: () => {
    ipcRenderer.send('cancelDownload');
  },
  getStreamPort: () => {
    return ipcRenderer.sendSync('getStreamPort');
  },
  getItemNotes: () => {
    ipcRenderer.send('getItemNotes');
  },
  setItemNote: (itemName: string, note: string) => {
    ipcRenderer.send('setItemNote', itemName, note);
  },
  on: (channel: string, callback: Function) => {
    ipcRenderer.removeAllListeners(channel);
    ipcRenderer.on(channel, (_, data) => callback(data))
  },
}

contextBridge.exposeInMainWorld('Main', api)

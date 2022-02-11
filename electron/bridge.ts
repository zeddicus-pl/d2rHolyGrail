import { contextBridge, ipcRenderer } from 'electron'
import { Settings } from '../src/@types/main'

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
  getSetting: (key: keyof Settings): string => {
    return ipcRenderer.sendSync('getSetting', key);
  },
  saveSetting: (key: keyof Settings, value: string) => {
    ipcRenderer.send('saveSetting', key, value);
  },
  on: (channel: string, callback: Function) => {
    ipcRenderer.removeAllListeners(channel);
    ipcRenderer.on(channel, (_, data) => callback(data))
  }
}

contextBridge.exposeInMainWorld('Main', api)

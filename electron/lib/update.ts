import { BrowserWindow, DownloadItem, ipcMain, shell } from "electron";
import { download, File, Progress } from 'electron-dl';
import { eventToReply } from "../main";

export const registerUpdateDownloader = (mainWindow: BrowserWindow) => {
  let downloadItem: DownloadItem | null = null;
  ipcMain.on('downloadNewVersion', async (event, url) => {
    if (mainWindow) {
      download(mainWindow, url, {
        onStarted: (item: DownloadItem) => {
          downloadItem = item;
        },
        onProgress: (progress: Progress) => {
          if (eventToReply) {
            eventToReply.reply('downloadProgress', progress);
          };
        },
        onCompleted: (file: File) => {
          shell.openPath(file.path);
          process.exit();
        },
        onCancel: () => {
            downloadItem = null;
        }
      })
      .catch(e => console.log(e));
    }
  });
  ipcMain.on('cancelDownload', () => {
    if (downloadItem) {
        downloadItem.cancel();
    }
  });
};
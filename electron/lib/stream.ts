import { join, resolve } from 'path';
import express from "express";
import http from "http";
import request from "request";
import { Server, Socket } from "socket.io";
import { CSP_HEADER } from '../main';
import settingsStore from './settings';
import itemsDatabase from './items';

// these constants are set by the build stage
declare const STREAM_WEBPACK_ENTRY: string;

const streamListeners: Map<string, Socket> = new Map();

export function setupStreamFeed() {
  const streamApp = express();
  const server = http.createServer(streamApp);
    const io = new Server(server, {
    serveClient: false,
  });

  streamApp.get("/", (req, res) => {
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

  streamApp.get("/stream/*", (req, res) => {
    const filename = req.url.split('/').pop()?.replace('..', '') || 'none';
    res.sendFile(resolve(join(__dirname, "..", "renderer", "stream", filename)));
  });

  io.on("connection", (socket: Socket) => {
    console.log('stream client connected')
    addStreamListener(socket);
    socket.on("disconnect", () => {
      console.log('stream client disconnected')
      removeStreamListener(socket);
    });
  });

  server.listen(3666);
}

export function updateSettingsToListeners() {
  streamListeners.forEach((socket) => {
    socket.emit("updatedSettings", settingsStore.getSettings());
  })
}

export function updateDataToListeners() {
  streamListeners.forEach((socket) => {
    socket.emit("openFolder", itemsDatabase.getItems());
  })
}

const addStreamListener = (socket: Socket): void => {
  streamListeners.set(socket.id, socket);
  socket.emit("updatedSettings", settingsStore.getSettings());
  updateDataToListeners();
  updateSettingsToListeners();
}

const removeStreamListener = (socket: Socket): void => {
  streamListeners.delete(socket.id);
}

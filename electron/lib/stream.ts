import { join, resolve } from 'path';
import express from "express";
import http from "http";
import request from "request";
import { Server, Socket } from "socket.io";
import { CSP_HEADER } from '../main';
import { currentSettings } from './settings';
import { currentData } from './items';

// these constants are set by the build stage
declare const STREAM_WEBPACK_ENTRY: string;

const streamListeners: Map<string, Socket> = new Map();

export function setupStreamFeed() {
  const streamApp = express();
  const server = http.createServer(streamApp);
    const io = new Server(server, {
    serveClient: false,
  });

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  streamApp.get("/", (req: any, res: any) => {
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

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  streamApp.get("/stream/index.js", (req: any, res: any) => {
    res.sendFile(resolve(join(__dirname, "..", "renderer", "stream", "index.js")));
  });

  io.on("connection", (socket: Socket) => {
    console.log('client connected')
    addStreamListener(socket);
    socket.on("disconnect", () => {
      console.log('client disconnected')
      removeStreamListener(socket);
    });
  });

  server.listen(3666);
}

export function updateSettingsToListeners() {
  streamListeners.forEach((socket) => {
    socket.emit("updatedSettings", currentSettings);
  })
}

export function updateDataToListeners() {
  streamListeners.forEach((socket) => {
    socket.emit("openFolder", currentData);
  })
}


const addStreamListener = (socket: Socket): void => {
  streamListeners.set(socket.id, socket);
  socket.emit("updatedSettings", currentSettings);
  updateDataToListeners();
  updateSettingsToListeners();
}

const removeStreamListener = (socket: Socket): void => {
  streamListeners.delete(socket.id);
}

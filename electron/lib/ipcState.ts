import { IpcMainEvent } from 'electron';

let eventToReply: IpcMainEvent | null = null;

export function setEventToReply(e: IpcMainEvent) {
  eventToReply = e;
}

export function getEventToReply() {
  return eventToReply;
}
import { BrowserWindow } from "electron";
import { Event } from "../utils/models/Event";
import type EventEmitter from "events";

class Ready extends Event {
  constructor() {
    super("DisplayBlock", false);
  }
  async execute(_event: EventEmitter, target: string, mainWindow: BrowserWindow) {
    mainWindow.webContents.postMessage("displayBlock", target);
  }
}
export const event = new Ready();
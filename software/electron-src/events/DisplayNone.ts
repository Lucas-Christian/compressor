import { BrowserWindow } from "electron";
import { Event } from "../utils/models/Event";
import type EventEmitter from "events";

class Ready extends Event {
  constructor() {
    super("DisplayNone", false);
  }
  async execute(_event: EventEmitter, target: string, mainWindow: BrowserWindow) {
    mainWindow.webContents.postMessage("displayNone", target);
  }
}
export const event = new Ready();
import { clearDistFolder } from "../utils/functions/calledByEvents/clear/clearDistFolder";
import { BrowserWindow } from "electron";
import { Event } from "../utils/models/Event";
import type EventEmitter from "events";

class Ready extends Event {
  constructor() {
    super("ClearDistFolder", false);
  }
  async execute(_event: EventEmitter, mainWindow: BrowserWindow) {
    await clearDistFolder(mainWindow);
  }
}
export const event = new Ready();
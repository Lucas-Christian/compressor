import { clearSrcFolder } from "../utils/functions/calledByEvents/clear/clearSrcFolder";
import { BrowserWindow } from "electron";
import { Event } from "../utils/models/Event";
import type EventEmitter from "events";

class Ready extends Event {
  constructor() {
    super("ClearSrcFolder", false);
  }
  async execute(_event: EventEmitter, mainWindow: BrowserWindow) {
    await clearSrcFolder(mainWindow);
  }
}
export const event = new Ready();
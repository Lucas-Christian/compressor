import { updateTheOptions } from "../utils/functions/calledByEvents/update/updateTheOptions";
import { BrowserWindow } from "electron";
import { Event } from "../utils/models/Event";
import type EventEmitter from "events";

class Ready extends Event {
  constructor() {
    super("UpdateTheOptions", false);
  }
  async execute(_event: EventEmitter, mainWindow: BrowserWindow) {
    await updateTheOptions(mainWindow);
  }
}
export const event = new Ready();
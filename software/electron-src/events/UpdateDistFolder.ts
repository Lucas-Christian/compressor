import { updateDistFolder } from "../utils/functions/calledByEvents/update/updateDistFolder";
import { BrowserWindow } from "electron";
import { Event } from "../utils/models/Event";
import type EventEmitter from "events";

class Ready extends Event {
  constructor() {
    super("UpdateDistFolder", false);
  }
  async execute(_event: EventEmitter, type: "update" | "dialog", mainWindow: BrowserWindow) {
    await updateDistFolder(mainWindow, type);
  }
}
export const event = new Ready();
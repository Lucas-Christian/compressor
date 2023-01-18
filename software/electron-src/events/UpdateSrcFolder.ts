import { updateSrcFolder } from "../utils/functions/calledByEvents/update/updateSrcFolder";
import { BrowserWindow } from "electron";
import { Event } from "../utils/models/Event";
import type EventEmitter from "events";

class Ready extends Event {
  constructor() {
    super("UpdateSrcFolder", false);
  }
  async execute(_event: EventEmitter, type: "update" | "dialog", mainWindow: BrowserWindow) {
    await updateSrcFolder(mainWindow, type);
  }
}
export const event = new Ready();
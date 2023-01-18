import { BrowserWindow } from "electron";
import { homeLoaded } from "../utils/functions/calledByEvents/onload/homeLoaded";
import { Event } from "../utils/models/Event";
import type EventEmitter from "events";

class Ready extends Event {
  constructor() {
    super("HomeLoaded", false);
  }
  async execute(_event: EventEmitter, mainWindow: BrowserWindow) {
    await homeLoaded(mainWindow);
  }
}
export const event = new Ready();
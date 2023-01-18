import { executeOptions } from "../utils/functions/calledByEvents/options/executeOptions";
import { BrowserWindow } from "electron";
import { Event } from "../utils/models/Event";
import type EventEmitter from "events";

type Context = { id: string, check: boolean };

class Ready extends Event {
  constructor() {
    super("ExecuteOptions", false);
  }
  async execute(_event: EventEmitter, context: Context, mainWindow: BrowserWindow) {
    await executeOptions(context, mainWindow);
  }
}
export const event = new Ready();
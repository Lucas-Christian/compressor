import { 
  validateCompressOptions 
} from "../utils/functions/calledByEvents/options/validateCompressOptions";
import { compressImages } from "../utils/functions/calledByEvents/compress/compressImages";
import { BrowserWindow } from "electron";
import { Event } from "../utils/models/Event";
import type EventEmitter from "events";

type Options = { width: string, height: string, quality: string, format: "jpg" | "png" } 
type ValidatedOptions = { width: number, height: number, quality: number, format: "jpg" | "png"}
class Ready extends Event {
  constructor() {
    super("CompressImages", false);
  }
  async execute(_event: EventEmitter, options: Options, mainWindow: BrowserWindow) {
    let validatedOptions = validateCompressOptions(options);
    await compressImages(mainWindow, validatedOptions as ValidatedOptions);
  }
}
export const event = new Ready();
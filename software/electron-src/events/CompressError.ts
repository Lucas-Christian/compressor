import { Event } from "../utils/models/Event";
import { dialog } from "electron";
import type EventEmitter from "events";

class Ready extends Event {
  constructor() {
    super("CompressError", false);
  }
  async execute(_event: EventEmitter, image: any) {
    return dialog.showErrorBox(
      "Erro na compressão!", 
      "Um erro inesperado ocorreu durante a compressão da imagem: "+image
    );
  }
}
export const event = new Ready();
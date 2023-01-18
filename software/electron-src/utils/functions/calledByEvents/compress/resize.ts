import { getFileType } from "../../functions";
import Jimp from "jimp";

type Options = { width: number, height: number, format: "jpg" | "png", quality: number, path: string }

export async function resize(buffer: string | Buffer | string[], options: Options) {
  if(!Buffer.isBuffer(buffer)) {
    throw new TypeError(
      `Expected to receive a type \`Buffer\` but received \`${typeof buffer}\``
    );
  }

  const supportedFormats = {
    "jpg": Jimp.MIME_JPEG,
    "png": Jimp.MIME_PNG
  };

  const type = await getFileType(options.path);
  
  if (!type || !Object.values(supportedFormats).includes(type)) {
    throw new Error("Unsupported image format type");
  }

  if (!Number.isFinite(options.width) && !Number.isFinite(options.height)) {
    throw new TypeError("Faltou configurar `width` ou `height` corretamente nas opções...");
  }

  const image = await Jimp.read(buffer);
  const mime = supportedFormats[options.format] as string || "image/jpeg";

  if(typeof options.width !== "number") {
    options.width = Math.trunc(
      image.bitmap.width * (options.height / image.bitmap.height)
    );
  }

  if(typeof options.height !== "number") {
    options.height = Math.trunc(
      image.bitmap.height * (options.width / image.bitmap.width)
    );
  }

  image.quality(options.quality);
  
  return image.resize(options.width, options.height).getBufferAsync(mime);
};
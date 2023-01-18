import * as fs from "fs";
export function readFileSync(path: fs.PathOrFileDescriptor, 
  options?: {
    encoding: BufferEncoding;
    split: boolean;
    flag?: string | undefined;
  } | BufferEncoding) {
    if(options) {
      if(options.split) {
        return fs.readFileSync(path, options).split("\n");
      }
      return fs.readFileSync(path, options);
    }
    return fs.readFileSync(path);
}
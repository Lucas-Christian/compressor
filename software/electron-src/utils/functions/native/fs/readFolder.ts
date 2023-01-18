import * as fs from "fs";
export function readFolder(path: string) {
  return fs.readdirSync(path);
}
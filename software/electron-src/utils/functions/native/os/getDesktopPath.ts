import * as path from "path";
import * as fs from "fs";
import * as os from "os";

export function getDesktopOrHomeDir() {
  const homeDir = path.resolve(os.homedir())
  const desktopDir = path.resolve(os.homedir(), "Desktop")
  if(!fs.existsSync(desktopDir)) {
    return homeDir;
  }
  return desktopDir;
}
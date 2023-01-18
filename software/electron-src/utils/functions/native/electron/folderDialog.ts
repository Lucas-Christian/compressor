import { BrowserWindow, dialog } from "electron";

export async function folderDialog(mainWindow: BrowserWindow) {
  const result = await dialog.showOpenDialog(mainWindow, {
    properties: ["openDirectory"]
  });
  return result;
}
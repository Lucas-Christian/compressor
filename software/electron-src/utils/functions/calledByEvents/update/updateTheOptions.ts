import { BrowserWindow } from "electron";

export async function updateTheOptions(mainWindow: BrowserWindow) {
  const searchInDB = await mainWindow.userDB.searchData("userOptions", "1");
  let options = { src: false, dist: false };
  if(searchInDB.srcFolderAuto !== "false") {
    options.src = true;
  } 
  if(searchInDB.distFolderAuto !== "false") {
    options.dist = true;
  }
  mainWindow.webContents.postMessage("updateOptions", options);
}
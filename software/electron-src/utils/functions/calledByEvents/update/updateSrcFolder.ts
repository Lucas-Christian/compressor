import { getImages, folderDialog } from "../../functions";
import { BrowserWindow, dialog } from "electron";

export async function updateSrcFolder(mainWindow: BrowserWindow, type: "dialog" | "update") {
  let result: Electron.OpenDialogReturnValue;
  const userInDB = await mainWindow.userDB.searchData("user", "1");

  if(type === "dialog") {
    result = await folderDialog(mainWindow);
    if(result.canceled) return;

    while(result.filePaths[0].indexOf("\\") !== -1) {
      result.filePaths[0] = result.filePaths[0].replace("\\", "/");
    }
    
    if(result.filePaths[0] === userInDB.distFolder) {
      return dialog.showErrorBox(
        "Erro na seleção da pasta de origem!", 
        "Não é permitido que a pasta de origem seja igual a pasta de destino!!"
      )
    }
    const insertInUser = await mainWindow.userDB.insertData("user", "REPLACE", "ID", "srcFolder", "distFolder");
    await insertInUser([{ ID: "1", srcFolder: result.filePaths[0], distFolder: userInDB.distFolder }]);
  } else {
    let filePaths = [];
    filePaths.push(userInDB.srcFolder);
    result = { canceled: false, filePaths: filePaths };
  }
  
  let folderPath = result.filePaths[0];
  
  const images = await getImages(folderPath);

  if(folderPath === "undefined") {
    folderPath = "Selecionar pasta de origem das imagens"
  }
  
  mainWindow.webContents.postMessage("srcDialogResult", { 
    folderPath: folderPath, 
    images: images 
  });
}
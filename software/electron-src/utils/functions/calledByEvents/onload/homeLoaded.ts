import { getDesktopOrHomeDir, updateDistFolder, updateSrcFolder } from "../../functions";
import { BrowserWindow, dialog } from "electron";
import * as fs from "fs";

export async function homeLoaded(mainWindow: BrowserWindow) {
  let searchInUser = await mainWindow.userDB.searchData("user", "1"),
  searchInUserOptions = await mainWindow.userDB.searchData("userOptions", "1");

  if(searchInUser.distFolder === searchInUser.srcFolder) {
    if(searchInUser.srcFolder === "undefined" && searchInUser.distFolder === "undefined") return;
    const insertInUser = await mainWindow.userDB
      .insertData("user", "REPLACE", "ID", "srcFolder", "distFolder");
    let desktop = getDesktopOrHomeDir();
    while(desktop.indexOf("\\") !== -1) {
      desktop = desktop.replace("\\", "/");
    }
    if(searchInUserOptions.srcFolderAuto !== "false" 
    && searchInUserOptions.distFolderAuto !== "false") {
      await insertInUser([
        { 
          ID: "1",
          srcFolder: desktop+"/Origem",
          distFolder: desktop+"/Destino"
        }
      ]);
    } else if(searchInUserOptions.srcFolderAuto !== "false") {
      await insertInUser([
        { 
          ID: "1",
          srcFolder: desktop+"/Origem",
          distFolder: "undefined"
        }
      ]);
    } else if(searchInUserOptions.distFolderAuto !== "false") {
      await insertInUser([
        { 
          ID: "1",
          srcFolder: "undefined",
          distFolder: desktop+"/Destino"
        }
      ]);
    } else {
      await insertInUser([
        { 
          ID: "1",
          srcFolder: "undefined",
          distFolder: "undefined"
        }
      ]);
    }
    dialog.showErrorBox(
      "Erro inesperado...", 
      "Por algum motivo a pasta de "+
      "destino e a pasta de origem tinham "+
      "o mesmo caminho, por este motivo ambas serão redefinidas para o padrão!"
    );
  }

  searchInUser = await mainWindow.userDB.searchData("user", "1"),
  searchInUserOptions = await mainWindow.userDB.searchData("userOptions", "1");

  const source = searchInUser.srcFolder,
  dist = searchInUser.distFolder;

  if(!fs.existsSync(source)) {
    try {
      fs.mkdirSync(source, { recursive: true });
    } catch(err: any) {
      return dialog.showErrorBox(
        "Erro ao criar a pasta de Origem!", 
        "Falha ao criar a pasta de origem: "+source+" \n\n"+
        "A pasta não foi detectada ao iniciar a compressão... "+
        "O app tentou criar o caminho, mas se deparou com um erro. "+
        "Recomendado contatar o desenvolvedor."
      );
    }
  }
  if(!fs.existsSync(dist)) {
    try {
      fs.mkdirSync(dist, { recursive: true });
    } catch(err: any) {
      return dialog.showErrorBox(
        "Erro ao criar a pasta de Destino!", 
        "Falha ao criar a pasta de destino: "+dist+" \n\n"+
        "A pasta não foi detectada ao iniciar a compressão... "+
        "O app tentou criar o caminho, mas se deparou com um erro. "+
        "Recomendado contatar o desenvolvedor."
      );
    }
  }

  if(searchInUser.srcFolder !== "undefined") {
    await updateSrcFolder(mainWindow, "update");
  }
  if(searchInUser.distFolder !== "undefined") {
    await updateDistFolder(mainWindow, "update");
  }
}
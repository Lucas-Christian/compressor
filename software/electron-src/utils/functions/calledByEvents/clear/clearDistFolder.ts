import { BrowserWindow, dialog } from "electron";
import { updateDistFolder } from "../../functions";

export async function clearDistFolder(mainWindow: BrowserWindow) {
  const userDB = mainWindow.userDB;
  const userInDB = await userDB.searchData("user", "1"),
  userOptionsInDB = await userDB.searchData("userOptions", "1");
  if(userInDB.distFolder !== "undefined") {
    const insertInUser = await userDB.insertData("user", "REPLACE", "ID", "srcFolder", "distFolder"),
    insertInUserOptions = await userDB.insertData("userOptions", "REPLACE", "ID", 
      "srcFolderAuto", "distFolderAuto"
    );
    if(userOptionsInDB.distFolderAuto !== "undefined") {
      await insertInUser([
        { 
          ID: "1",
          srcFolder: userInDB.srcFolder,
          distFolder: "undefined"
        }
      ]);
      await insertInUserOptions([
        { 
          ID: "1",
          srcFolderAuto: userOptionsInDB.srcFolderAuto,
          distFolderAuto: "false"
        }
      ]);
    } else {
      await insertInUser([
        { 
          ID: "1",
          srcFolder: userInDB.srcFolder,
          distFolder: "undefined"
        }
      ]);
    }
  } else {
    return dialog.showErrorBox(
      "Erro ao remover a pasta de Destino do banco de dados!", 
      "Você não configurou nenhuma pasta de Destino..."
    );
  }
  await updateDistFolder(mainWindow, "update");
}
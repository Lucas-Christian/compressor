import { BrowserWindow, dialog } from "electron";
import { updateSrcFolder } from "../../functions";

export async function clearSrcFolder(mainWindow: BrowserWindow) {
  const userDB = mainWindow.userDB;
  const userInDB = await userDB.searchData("user", "1"),
  userOptionsInDB = await userDB.searchData("userOptions", "1");
  if(userInDB.srcFolder !== "undefined") {
    const insertInUser = await userDB.insertData("user", "REPLACE", "ID", "srcFolder", "distFolder"),
    insertInUserOptions = await userDB.insertData("userOptions", "REPLACE", "ID", 
      "srcFolderAuto", "distFolderAuto"
    );
    if(userOptionsInDB.srcFolderAuto !== "undefined") {
      await insertInUser([
        { 
          ID: "1",
          srcFolder: "undefined",
          distFolder: userInDB.distFolder
        }
      ]);
      await insertInUserOptions([
        { 
          ID: "1",
          srcFolderAuto: "false",
          distFolderAuto: userOptionsInDB.distFolderAuto
        }
      ]);
    } else {
      await insertInUser([
        { 
          ID: "1",
          srcFolder: "undefined",
          distFolder: userInDB.distFolder
        }
      ]);
    }
  } else {
    return dialog.showErrorBox(
      "Erro ao remover a pasta de Origem do banco de dados!", 
      "Você não configurou nenhuma pasta de Origem..."
    );
  }
  await updateSrcFolder(mainWindow, "update");
}
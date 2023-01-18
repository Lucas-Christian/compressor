import { getDesktopOrHomeDir, updateDistFolder, updateSrcFolder } from "../../functions";
import { BrowserWindow, dialog } from "electron";
import * as fs from "fs";

type Context = { id: string, check: boolean };

export async function executeOptions(context: Context, mainWindow: BrowserWindow) {
  const userInDB = await mainWindow.userDB.searchData("user", "1"),
  userOptionsInDB = await mainWindow.userDB.searchData("userOptions", "1");

  const insertInUser = await mainWindow.userDB.insertData("user", "REPLACE", 
    "ID", "srcFolder", "distFolder"
  ),
  insertInUserOptions = await mainWindow.userDB.insertData("userOptions", "REPLACE", 
    "ID", "srcFolderAuto", "distFolderAuto"
  );

  let desktopPath = getDesktopOrHomeDir();
  while(desktopPath.indexOf("\\") !== -1) {
    desktopPath = desktopPath.replace("\\", "/");
  }

  const options = {
    async checkBoxSrcAuto() {
      if(context.check) {
        await insertInUser([
          { 
            ID: "1",
            srcFolder: desktopPath+"/Origem",
            distFolder: userInDB.distFolder
          }
        ]);
        await insertInUserOptions([
          { 
            ID: "1",
            srcFolderAuto: "true",
            distFolderAuto: userOptionsInDB.distFolderAuto
          }
        ]);
        if(!fs.existsSync(desktopPath+"/Origem")) {
          try {
            fs.mkdirSync(desktopPath+"/Origem", { recursive: true });
          } catch(err: any) {
            return dialog.showErrorBox(
              "Erro ao criar a pasta de Origem!", 
              "Houve um erro ao criar a pasta de Origem, todavia, você ainda é capaz "+
              "de utilizar o caminho: "+desktopPath+"/Origem \n\n"+
              "Mas você deve criar a pasta manualmente, isso pode significar que o app "+
              "talvez não tenha as permissões, recomendado contatar o desenvolvedor para "+
              "a análise da situação."
            );
          }
        }
      } else {
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
      }
      await updateSrcFolder(mainWindow, "update");
    },
    async checkBoxDistAuto() {
      if(context.check) {
        await insertInUser([
          { 
            ID: "1",
            srcFolder: userInDB.srcFolder,
            distFolder: desktopPath+"/Destino"
          }
        ]);
        await insertInUserOptions([
          { 
            ID: "1",
            srcFolderAuto: userOptionsInDB.srcFolderAuto,
            distFolderAuto: "true"
          }
        ]);
        if(!fs.existsSync(desktopPath+"/Destino")){
          try {
            fs.mkdirSync(desktopPath+"/Destino", { recursive: true });
          } catch(err: any) {
            return dialog.showErrorBox(
              "Erro ao criar a pasta de Destino!", 
              "Houve um erro ao criar a pasta de Destino, todavia, você ainda é capaz "+
              "de utilizar o caminho: "+desktopPath+"/Destino \n\n"+
              "Mas você deve criar a pasta manualmente, isso pode significar que o app "+
              "talvez não tenha as permissões, recomendado contatar o desenvolvedor para "+
              "a análise da situação."
            );
          }
        }
      } else {
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
      }
      await updateDistFolder(mainWindow, "update");
    }
  }
  const execute = options[context.id as keyof typeof options];
  await execute();
}
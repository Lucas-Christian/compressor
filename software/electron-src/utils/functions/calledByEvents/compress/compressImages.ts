import { readFileSync, getImages, resize } from "../../functions";
import { BrowserWindow, dialog } from "electron";
import { setTimeout } from "timers/promises";
import * as fs from "fs/promises";
import { existsSync, mkdirSync } from "fs";
import { removeExtension } from "../../fileType/removeExtension";

type Options = { width: number, height: number, quality: number, format: "jpg" | "png" }

export async function compressImages(mainWindow: BrowserWindow, options: Options) {
  const searchInUser = await mainWindow.userDB.searchData("user", "1");
  
  const source = searchInUser.srcFolder,
  dist = searchInUser.distFolder;
  
  if(source === "undefined") {
    return dialog.showErrorBox(
      "Erro na compressão!", 
      "Antes de comprimir você deve definir uma pasta de Origem!"
    );
  }
  if(dist === "undefined") {
    return dialog.showErrorBox(
      "Erro na compressão!", 
      "Antes de comprimir você deve definir uma pasta de Destino!"
    );
  }

  const images = await getImages(source);
  if(images[0].context) {
    const exceptions = {
      emptyFolder() {
        return dialog.showErrorBox(
          "Erro na compressão!", 
          "A pasta de origem está vazia!"
        );
      },
      dontHasSupportedImages() {
        return dialog.showErrorBox(
          "Erro na compressão!", 
          "A pasta de origem não contém que o app seja capaz de comprimir..."
        );
      }
    }
    const showException = exceptions[images[0].context as keyof typeof exceptions];
    showException();
  } else {
    mainWindow.webContents.postMessage("startCompress", "Start the compression");
    await setTimeout(100);

    if(!existsSync(source)) {
      try {
        mkdirSync(source, { recursive: true });
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
    if(!existsSync(dist)) {
      try {
        mkdirSync(dist, { recursive: true });
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

    for(let i = 0;i < images.length;i++) {
      const buffer = readFileSync(images[i].path!),
      image = await resize(buffer, {
        width: options.width,
        height: options.height,
        format: options.format,
        quality: options.quality,
        path: images[i].path!
      });

      let imageName = removeExtension(images[i].name!);

      mainWindow.webContents.postMessage("updateProgressState", { 
        name: `${imageName}.${options.format}`,
        size: image.byteLength,
        total: images.length,
        actual: i
      });

      await setTimeout(50);
      
      try {
        fs.writeFile(`${dist}/${imageName}.${options.format}`, image);
      } catch(err: any) {
        return dialog.showErrorBox(
          "Erro ao criar a imagem!", 
          "Houve um erro ao criar o arquivo\n\n"+
          "Erro: "+err.message+
          "Recomendado contatar o desenvolvedor "+
          "para investigar a situação."
        );
      }
    };

    mainWindow.webContents.postMessage("hideProgressBar", "Hide The Progress Bar");
  }
}

import { 
  IsASupportedImage, 
  getFileType, 
  readFolder, 
  getStat
} from "../functions";
import { Result } from "../../../../renderer/interfaces/general";
import { Stats } from "fs";
import { join } from "path";

export async function getImages(folderPath: string) {
  let images: Result["images"] = [];
  if(folderPath === "undefined") {
    images.push({ context: "returnToDefault"});
    return images;
  }
  const folder = readFolder(folderPath);
  if(folder.length === 0) {
    images.push({ context: "emptyFolder"});
    return images;
  }

  for(let file in folder) {
    let pathToFile = join(folderPath, folder[file]),
    fileStat = await getStat(pathToFile) as Stats;

    if(!fileStat.isFile()) continue;
    let fileType = getFileType(pathToFile);

    if(!IsASupportedImage(fileType)) continue;
    images.push(
      { 
        name: folder[file], 
        size: fileStat.size, 
        path: pathToFile,
        type: fileType
      }
    );
  }
  if(images.length === 0) {
    images.push({ context: "dontHasSupportedImages"});
    return images;
  }
  images.sort((prev, next) => prev.name!.length - next.name!.length);
  return images;
}

import { formatBytes } from "../format/formatBytes";
import { Result } from "../../../interfaces/general";

export function appendPreviewChilds(result: Result, folderType: "src" | "dist") {
  const preview = window.document.querySelector(`#${folderType}FolderPreview`) as HTMLDivElement;
  preview.innerHTML = "";
  if(result.images[0].context && result.images[0].context === "emptyFolder") {
    let p = document.createElement("p");
    if(folderType === "src") {
      p.textContent = "A pasta de origem não contém arquivos...";
    } else {
      p.textContent = "A pasta de destino não contém arquivos...";
    }
    preview.append(p);
  } else if(result.images[0].context && result.images[0].context === "dontHasSupportedImages") {
    let p = document.createElement("p");
    if(folderType === "src") {
      p.textContent = "A pasta de origem não contém imagens que o aplicativo seja capaz de comprimir...";
    } else {
      p.textContent = "A pasta de destino não contém imagens que o aplicativo suporte observar...";
    }
    preview.append(p);
  } else if(result.images[0].context && result.images[0].context === "returnToDefault") {
    let p = document.createElement("p");
    if(folderType === "src") {
      p.textContent = "Nenhuma pasta de origem selecionada.";
    } else {
      p.textContent = "Nenhuma pasta de destino selecionada.";
    }
    preview.append(p);
  } else {
    result.images.forEach(image => {
      let p = document.createElement("p");
      const size = formatBytes(image.size!);
      if(folderType === "src") {
        p.textContent = `${image.name!} —————— ${size}`;
      } else {
        p.textContent = `${image.name!} —————— ${size}`;
      }
      preview.append(p);
    });
  }
}
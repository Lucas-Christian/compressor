import { formatBytes } from "../format/formatBytes";

let percentageValue = 0;

export function updateState(name: string, size: number, total: number, actual: number) {
  const progress = document.getElementById("progress") as HTMLDivElement,
  compressState = document.getElementById("compressState"),
  situationOfTheFile = document.getElementById("situationOfTheFile"),
  remainingFiles = document.getElementById("remainingFiles"),
  preview = document.getElementById("distFolderPreview") as HTMLDivElement;

  let percentageLogic = 100/total;
  
  if(percentageValue < 100) {
    progress.style.width = percentageValue+"%";
    percentageValue = percentageValue + percentageLogic;
    let roundedValue = Math.round(percentageValue);
    compressState.innerHTML = `${roundedValue}%`;
    situationOfTheFile.innerHTML = `${name}`;
    remainingFiles.innerHTML = `${actual+1}/${total}`;
    
    progress.style.width = `${roundedValue}%`;

    let p = document.createElement("p"),
    sizeOfTheImage = formatBytes(size);
    p.textContent = `${name} —————— ${sizeOfTheImage}`;
    preview.append(p);
  }

  if(total - 1 === actual) {
    percentageValue = 0;
  }
}

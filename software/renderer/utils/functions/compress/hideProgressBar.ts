export function hideProgressBar() {
  const progress = window.document.querySelector("#progress") as HTMLDivElement,
  compressState = window.document.querySelector("#compressState"),
  situationOfTheFile = window.document.querySelector("#situationOfTheFile"),
  remainingFiles = window.document.querySelector("#remainingFiles");
  
  progress.style.width = "0%";
  compressState.innerHTML = "0%";
  situationOfTheFile.innerHTML = "???";
  remainingFiles.innerHTML = "?/?";
}
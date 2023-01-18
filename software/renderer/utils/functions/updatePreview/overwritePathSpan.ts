import { Result } from "../../../interfaces/general";

export function overwritePathSpan(result: Result, folderType: "src" | "dist") {
  const pathSpan = window.document.getElementById(`${folderType}FolderSpan`) as HTMLSpanElement;
  
  let folderSpan = document.createElement("span");
  folderSpan.setAttribute("id", `${folderType}FolderSpan`);
  folderSpan.textContent = result.folderPath;
  pathSpan.replaceWith(folderSpan);

}
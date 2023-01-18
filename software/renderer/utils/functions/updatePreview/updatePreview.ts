import { appendPreviewChilds } from "./appendPreviewChilds";
import { overwritePathSpan } from "./overwritePathSpan";
import { Result } from "../../../interfaces/general";

export function updatePreview(result: Result, folderType: "src" | "dist") {
  appendPreviewChilds(result, folderType);
  overwritePathSpan(result, folderType);
}
import { updatePreview } from "../../../../../utils/functions/updatePreview/updatePreview";
import { useEffect } from "react";
import { Result } from "../../../../../interfaces/general";

type Props = {
  folderType: "src" | "dist";
}

export function FolderPreview({ folderType }: Props){
  useEffect(() => {
    window.electron.receive(`${folderType}DialogResult`, (result: Result) => {
      updatePreview(result, folderType);
    });
  }, []);
  return (
    <div 
      className="h-3/4 w-3/4 pt-4 pb-4 overflow-y-scroll text-white-weak bg-gray-200 even:bg-gray-150"
      id={folderType === "src" ? "srcFolderPreview" : "distFolderPreview"}
    >
      <p>Nenhuma pasta de {folderType === "src" ? "origem" : "destino"} selecionada.</p>
    </div>
  );
}
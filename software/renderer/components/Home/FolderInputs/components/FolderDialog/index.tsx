import { folderPath } from "../../../../../utils/constants/icons";

type Props = {
  folderType: "src" | "dist";
}

export function FolderDialog({ folderType }: Props) {
  const distDialogFolder = () => {
    window.electron.send("UpdateDistFolder", "dialog");
  };
  const srcDialogFolder = () => {
    window.electron.send("UpdateSrcFolder", "dialog");
  };
  return (
    <div className="h-1/4 w-3/4 mt-2
      flex flex-col justify-center
      bg-gray-600 rounded-t-lg
      hover:brightness-90 active:brightness-75"
    >
      <div 
        id={
          folderType === "src" ? "srcFolderInput" : "distFolderInput"
        } 
        className="p-5 flex items-center justify-start 
          break-all overflow-hidden 
          cursor-pointer disabled:cursor-default"
        onClick={folderType === "src" ? srcDialogFolder : distDialogFolder}
      >
        <div>
          <svg 
            xmlns="http://www.w3.org/2000/svg" 
            fill="none" viewBox="0 0 24 24" 
            strokeWidth={1.5} 
            stroke="currentColor"
            className="mr-1 text-white-weak box-border"
          >
            <path strokeLinecap="round" strokeLinejoin="round" d={folderPath} />
          </svg>
        </div>
        <div className="text-white-weak text-sm font-sans">
          <span
            id={
              folderType === "src" ? "srcFolderSpan" : "distFolderSpan"
            }
          >
            Selecionar pasta de {folderType === "src" ? "origem" : "destino"} das imagens
          </span>
        </div>
      </div>
    </div>
  )
}
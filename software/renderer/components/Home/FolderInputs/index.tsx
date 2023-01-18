import { UtilityIconsBar } from "./components/UtilityIconsBar";
import { FolderPreview } from "./components/FolderPreview";
import { FolderDialog } from "./components/FolderDialog";
import { Tooltip } from "./components/Tooltip";
import styles from "./styles.module.css";

export function FolderInputs() {
  const folderInput = [
    "src",
    "dist"
  ];
  return (
    <div className="flex justify-between mt-12 w-10/12 h-1/2 text-center">
      {
        folderInput.map((folderType: "src" | "dist", index) => 
          <div key={index.toString()} className="w-full h-full flex flex-col items-center justify-center">
            <Tooltip key={folderType+index.toString()} folderType={folderType} />
            <FolderDialog key={folderType+((index+1).toString())} folderType={folderType} />
            <FolderPreview key={folderType+((index+2).toString())} folderType={folderType} />
            <UtilityIconsBar key={folderType+((index+3).toString())} folderType={folderType} />
          </div>
        )
      }
    </div>
  );
}
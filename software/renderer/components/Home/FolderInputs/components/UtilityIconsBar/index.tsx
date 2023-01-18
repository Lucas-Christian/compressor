import { arrowPath, trash } from "../../../../../utils/constants/icons";

type Props = {
  folderType: "src" | "dist";
}

export function UtilityIconsBar({ folderType } : Props) {
  const clearSrcFolder = () => {
    window.electron.send("ClearSrcFolder");
  };
  const updateSrcFolder = () => {
    window.electron.send("UpdateSrcFolder", "update");
  };
  const clearDistFolder = () => {
    window.electron.send("ClearDistFolder");
  };
  const updateDistFolder = () => {
    window.electron.send("UpdateDistFolder", "update");
  };
  return (
    <div className="h-1/4 w-3/4 bg-gray-600 rounded-b-lg pt-2 pr-1 pb-1 flex justify-center items-center">
      <svg 
          xmlns="http://www.w3.org/2000/svg" 
          fill="none" 
          viewBox="0 0 24 24" 
          strokeWidth="1.5" 
          stroke="currentColor"
          className="mr-1 text-white-weak box-border cursor-pointer hover:brightness-90 no-underline"
          onClick={folderType === "src" ? clearSrcFolder : clearDistFolder}
        >
          <path strokeLinecap="round" strokeLinejoin="round" d={trash} />
      </svg>
      <svg 
        xmlns="http://www.w3.org/2000/svg" 
        fill="none" viewBox="0 0 24 24" 
        strokeWidth="1.5" 
        stroke="currentColor" 
        className="mr-1 text-white-weak box-border cursor-pointer hover:brightness-90 no-underline"
        onClick={folderType === "src" ? updateSrcFolder : updateDistFolder}
      >
        <path strokeLinecap="round" strokeLinejoin="round" d={arrowPath} />
      </svg>
    </div>
  );
}
import { HTMLAttributes, useEffect } from "react";
import { updateState } from "../../../../utils/functions/compress/updateState";

type DivProps = HTMLAttributes<HTMLDivElement>;
type UpdateState = { name: string, size: number, total: number, actual: number };

export function CompressBar(props: DivProps) {
  useEffect(() => {
    window.electron.receive("updateProgressState", (result: UpdateState) => {
      updateState(result.name, result.size, result.total, result.actual);
    });
  }, []);
  return (
    <div className="w-[37.5em] mt-5 mb-2 z-[99999]" id="progressBar" {...props}>
      <div className="w-full h-7 bg-gray-600">
        <div className="h-7 bg-red" style={{width: "0%"}} id="progress"></div>
      </div>
      <div className="flex justify-between text-white-weak">
        <p id="compressState">0%</p>
        <p id="situationOfTheFile">???</p>
        <p id="remainingFiles">?/?</p>
      </div>
    </div>
  );
}
import { HTMLAttributes, useEffect } from "react";
import { Checkbox } from "../../Checkbox";
import { Heading } from "../../Heading";
import { xMark } from "../../../utils/constants/icons";
import { Text } from "../../Text";

type DivProps = HTMLAttributes<HTMLDivElement>;
type Options = {src: boolean, dist: boolean};

export function Options(props: DivProps) {
  const closeTheOptions = function() {
    window.electron.send("DisplayNone", "options");
    window.electron.send("DisplayNone", "outsideModal");
  };
  const selected = function(event: any) {
    window.electron.send("ExecuteOptions", {
      id: event.target.id, 
      check: event.target.checked 
    });
  }
  useEffect(() => {
    window.electron.receive("updateOptions", (options: Options) => {
      let checkBoxSrcAuto = document.querySelector("#checkBoxSrcAuto") as HTMLInputElement,
      checkBoxDistAuto = document.querySelector("#checkBoxDistAuto") as HTMLInputElement;
      if(options.src) {
        checkBoxSrcAuto.checked = true;
      } else {
        checkBoxSrcAuto.checked = false;
      }
      if(options.dist) {
        checkBoxDistAuto.checked = true;
      } else {
        checkBoxDistAuto.checked = false;
      }
    });
  }, []);
  return (
    <div className="w-[50vw] h-[70vh] 
      absolute z-[99999] left-1/2 top-1/2 
      -translate-x-1/2 -translate-y-1/2" 
      id="options" {...props}
    >
      <div className="bg-gray-600 m-0 p-2 w-full h-[13.5%]
        text-center rounded-t-md
        border-b-0 border-2 border-solid border-[#888]"
      >
        <Heading className="sm:text-md md:text-lg lg:text-xl xl:text-2xl 2xl:text-3xl" asChild>
          <span>
            Opções
          </span>
        </Heading>
        <svg 
          xmlns="http://www.w3.org/2000/svg" 
          fill="none" 
          viewBox="0 0 24 24" 
          strokeWidth="1.5" 
          stroke="currentColor" 
          className="w-6 h-6 no-underline
            text-gray-100 hover:text-red
            cursor-pointer sticky float-right"
          onClick={closeTheOptions}
        >
          <path strokeLinecap="round" strokeLinejoin="round" d={xMark} />
        </svg>
      </div>
      <div className="w-full h-5/6 bg-gray-400 overflow-auto rounded-b-md border-t-0 border-2 border-solid border-[#888]">
        <div className="bg-gray-400 h-5/6 w-5/6 p-5 mt-[1%] ml-[5%] mb-[5%] mr-[5%]">
          <div className="flex text-center items-center mt-2">
            <Checkbox id="checkBoxSrcAuto" onChange={selected} />
            <Text className="ml-1 sm:text-sm md:text-sm lg:text-sm xl:text-lg 2xl:text-xl">Selecionar pasta de Origem automaticamente</Text>
          </div>
          <div className="flex text-center items-center mt-2">
            <Checkbox id="checkBoxDistAuto" onChange={selected} />
            <Text className="ml-1 sm:text-sm md:text-sm lg:text-sm xl:text-lg 2xl:text-xl">Selecionar pasta de Destino automaticamente</Text>
          </div>
        </div>
      </div>
    </div>
  );
}
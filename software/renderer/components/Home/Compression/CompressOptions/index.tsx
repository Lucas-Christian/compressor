import { DropdownButton } from "./components/DropdownButton";
import { HTMLAttributes } from "react";
import { NumberInput } from "./components/NumberInput";
import { Heading } from "../../../Heading";
import { Button } from "../../../Button";
import { xMark } from "../../../../utils/constants/icons";
import { Text } from "../../../Text";

type DivProps = HTMLAttributes<HTMLDivElement>;

export function CompressOptions(props: DivProps) {
  const compressImages = () => {
    closeTheOptions();

    let heightInput = document.querySelector("#height") as HTMLInputElement,
    widthInput = document.querySelector("#width") as HTMLInputElement,
    qualityInput = document.querySelector("#quality") as HTMLInputElement,
    formatSelector = document.querySelector("#format") as HTMLSelectElement;

    let options = {
      height: heightInput.value,
      width: widthInput.value,
      quality: qualityInput.value,
      format: formatSelector.value
    }
    
    window.electron.send("CompressImages", options); // Passar aqui as opções de compressão
  };
  const closeTheOptions = () => {
    window.electron.send("DisplayNone", "compression");
    window.electron.send("DisplayNone", "outsideModal");
  };
  return (
    <div id="compressOptions" {...props}>
      <div className="w-64 h-max
        absolute left-1/2 top-1/2
        -translate-x-1/2 -translate-y-1/2
        z-[99999]"
      >
        <div className="bg-gray-600 m-0 p-2 
          border-solid border border-gray-100
          border-b-0 w-full h-[13%] rounded-t-md
          text-center"
        >
          <Heading asChild size="sm">
            <span>
              Opções de Compressão
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
        <div className="w-full h-[90%] bg-gray-400 rounded-b-md
          border border-solid border-gray-100 border-t-0"
        >
          <div className="bg-gray-400 p-5 w-[90%] h-[94.5%] 
            flex flex-col items-center
            mt-0 mr-[5%] mb-[5%] ml-[5%]"
          >
            <div className="w-full flex text-center justify-between content-center">
              <div className="flex flex-col text-center justify-center content-center">
                <Text bold className="mt-1">Largura</Text>
                <NumberInput id="width" min={1} max={2000} defaultValue={600} />
              </div>
              <div className="flex flex-col text-center justify-center content-center">
                <Text bold className="mt-1">Altura</Text>
                <NumberInput id="height" min={1} max={2000} defaultValue={400} />
              </div>
            </div>
            
            <Text bold className="mt-1">Qualidade</Text>
            <NumberInput id="quality" min={1} max={100} defaultValue={60} />

            <Text bold className="mt-2">Formato</Text>
            <DropdownButton id="format" style={{marginTop: "5px"}} />

          </div>
        </div>
        <Button
          onClick={compressImages}
          className="z-[999999] left-1/2
            absolute -translate-x-1/2 -translate-y-1/2"
        >
          <Text bold>
            Iniciar Compressão
          </Text>
        </Button>
      </div>
    </div>
  );
}
import { ChevronLeftIcon, ChevronRightIcon } from "@heroicons/react/24/outline";
import { useState } from "react";
import { images } from "../../utils/constants/images";
import { RenderImage } from "./RenderImage";

export function Carousel() {
  const [actual, setActual] = useState(0);

  function increaseActual() {
    if(actual < (images.length - 1)) {
      setActual(actual + 1);
    }
  }
  function decreaseActual() {
    if(actual > 0) {
      setActual(actual - 1);
    }
  }
  
  return (
    <div className="flex items-center gap-5">
      <ChevronLeftIcon 
        onClick={decreaseActual} 
        className={`w-6 h-6 sm:w-12 sm:h-12 ${actual > 0 ? "cursor-pointer stroke-white" : "stroke-gray-100"}`}
      />
      <div className="w-48 h-20 sm:w-96 sm:h-56">
        <RenderImage 
          actual={actual} 
          increaseActual={increaseActual} 
          decreaseActual={decreaseActual} 
        />
      </div>
      <ChevronRightIcon 
        onClick={increaseActual} 
        className={`w-6 h-6 sm:w-12 sm:h-12 ${actual < (images.length - 1) ? "cursor-pointer stroke-white" : "stroke-gray-100"}`} 
      />
    </div>
  );
}
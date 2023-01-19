import { ModalCarousel } from "./ModalCarousel";
import { useState } from "react";
import { images } from "../../../utils/constants/images";

type RenderImageProps = {
  actual: number;
  decreaseActual: () => void;
  increaseActual: () => void;
}

export function RenderImage({ actual, decreaseActual, increaseActual }: RenderImageProps) {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <>
      <img
        onClick={() => setIsOpen(true)}
        src={images[actual].src}
        alt={images[actual].name}
        className="w-full h-full rounded hover:brightness-90 cursor-zoom-in"
      />
      <ModalCarousel 
        actual={actual} 
        isOpen={isOpen} 
        setIsOpen={setIsOpen} 
        decreaseActual={decreaseActual}
        increaseActual={increaseActual}
      />
    </>
  );
}
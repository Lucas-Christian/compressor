import { XMarkIcon, ChevronLeftIcon, ChevronRightIcon } from "@heroicons/react/24/outline";
import { Transition, Dialog } from "@headlessui/react";
import { ModalBackground } from "./ModalBackground";
import { ModalPanel } from "./ModalPanel";
import { Fragment } from "react";
import { images } from "../../../../utils/constants/images";
import { Text } from "../../../Text";
import Link from "next/link";

type ModalCarouselProps = {
  isOpen: boolean;
  actual: number;
  setIsOpen: (value: boolean) => void;
  decreaseActual: () => void;
  increaseActual: () => void;
}

export function ModalCarousel({ isOpen, actual, setIsOpen, decreaseActual, increaseActual }: ModalCarouselProps) {
  return (
    <Transition appear show={isOpen} as={Fragment}>
      <Dialog as="div" className="relative z-10" onClose={() => setIsOpen(false)}>
        <ModalBackground />
        <ModalPanel>
          <div className="w-3/4 flex justify-end">
            <XMarkIcon 
              onClick={() => setIsOpen(false)} 
              className="w-8 h-8 stroke-white hover:stroke-red stroke-2 cursor-pointer"
            />
          </div>
          <div className="flex justify-center items-center">
            <ChevronLeftIcon 
              onClick={decreaseActual} 
              className={`w-32 h-32 ${actual > 0 ? "cursor-pointer stroke-white" : "stroke-gray-100"}`}
            />
            <div className="w-3/4 flex justify-center items-center gap-2">
              <img
                onClick={() => setIsOpen(false)}
                alt={images[actual].name} 
                src={images[actual].src}
                className="w-full h-full rounded cursor-zoom-out" 
              />
            </div>
            <ChevronRightIcon 
              onClick={increaseActual} 
              className={`w-32 h-32 ${actual < (images.length - 1) ? "cursor-pointer stroke-white" : "stroke-gray-100"}`} 
            />
          </div>
          <div className="w-3/4 flex justify-start">
            <Link
              onClick={() => setIsOpen(false)}
              target="_blank"
              rel="nofollow"
              href={images[actual].src}
            >
              <Text size="lg" bold className="hover:text-blue-600 ">
                Abrir Original
              </Text>
            </Link>
          </div>
        </ModalPanel>
      </Dialog>
    </Transition>
  );
}
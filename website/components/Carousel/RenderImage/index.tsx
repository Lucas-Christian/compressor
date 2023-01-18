import { Dialog, Transition } from "@headlessui/react";
import Link from "next/link";
import { Fragment, useState } from "react";
import { images } from "../../../utils/constants/images";

type RenderImageProps = {
  actual: number;
}

export function RenderImage({ actual }: RenderImageProps) {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <Link
      className="inline-flex text-sm font-medium 
        text-black dark:text-white hover:text-blue-600 
        dark:hover:text-blue-600 cursor-pointer"
      onClick={() => setIsOpen(false)}
      target="_blank"
      rel="nofollow"
      href={images[actual].src}
    >
      <img
        onClick={() => setIsOpen(true)}
        alt={images[actual].name}
        src={images[actual].src}
        className="w-full h-full aspect-auto rounded hover:brightness-90 cursor-pointer"
      />
    </Link>
  );
}
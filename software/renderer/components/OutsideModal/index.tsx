import { HTMLAttributes } from "react";
import styles from "./styles.module.css";

type DivProps = HTMLAttributes<HTMLDivElement>;

export function OutsideModal(props: DivProps) {
  return (
    <div 
      className="w-full h-full absolute z-[99998] content-center bg-black opacity-5"
      id="outsideModalDiv"
      {...props} 
    />
  );
}
import { ButtonHTMLAttributes, ReactNode } from "react";
import { classNames } from "../../utils/functions/classNames/classNames";

type ButtonProps = {
  children: ReactNode;
} & ButtonHTMLAttributes<HTMLButtonElement>;

export function Button({className, ...props}: ButtonProps) {
  return (
    <button className={
      classNames("h-12 w-24 px-6 "+ 
        "flex items-center justify-center "+
        "bg-gray-600 rounded-lg pointer mt-4 border-0 "+
        "disabled:cursor-default active:brightness-75 hover:brightness-90 "+(className ? className : "")
      )}
      {...props} 
    />
  );
}
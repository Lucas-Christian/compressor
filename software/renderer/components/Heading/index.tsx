import { HTMLAttributes, ReactNode } from "react";
import { classNames } from "../../utils/functions/classNames/classNames";
import { Slot } from "@radix-ui/react-slot";

type HeadingProps = {
  size?: "sm" | "md" | "lg";
  bold?: boolean;
  asChild?: boolean;
  className?: HTMLAttributes<HTMLInputElement>["className"];
  children: ReactNode;
} & HTMLAttributes<HTMLTitleElement>;

export function Heading({ size = "md", bold = true, children, asChild, className }: HeadingProps) {
  const Comp = asChild ? Slot : "h2";
  return (
    <Comp className={classNames(
      size === "sm" ? "text-xs md:text-base" : size === "md" ? "text-sm sm:text-lg xl:text-2xl" : "text-xl sm:text-2xl xl:text-3xl", 
      bold ? "font-bold" : "",
      "font-sans text-white "+(className ? className : "")
    )}>{children}</Comp>
  );
}
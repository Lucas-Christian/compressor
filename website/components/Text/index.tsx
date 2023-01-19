"use client";

import { HTMLAttributes, ReactNode } from "react";
import { classNames } from "../../utils/functions/classNames";
import { Slot } from "@radix-ui/react-slot";

type TextProps = {
  size?: "sm" | "md" | "lg";
  bold?: boolean;
  asChild?: boolean;
  className?: HTMLAttributes<HTMLInputElement>["className"];
  children: ReactNode;
} & HTMLAttributes<HTMLParagraphElement>;

export function Text({ size = "md", bold = false, children, asChild, className }: TextProps) {
  const Comp = asChild ? Slot : "p";

  return (
    <Comp className={classNames(
      size === "sm" ? "text-xs" : size === "md" ? "text-xs sm:text-sm" : "text-sm sm:text-base", 
      bold ? "font-semibold" : "",
      "text-white font-sans "+
      (className ? className : "")
    )}>{children}</Comp>
  );
}
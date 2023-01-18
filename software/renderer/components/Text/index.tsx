import { HTMLAttributes, ReactNode } from "react";
import { classNames } from "../../utils/functions/classNames/classNames";
import { Slot } from "@radix-ui/react-slot";

type TextProps = {
  size?: "sm" | "md" | "lg";
  bold?: boolean;
  color?: "text-white" | "text-white-weak";
  asChild?: boolean;
  className?: HTMLAttributes<HTMLInputElement>["className"];
  children: ReactNode;
} & HTMLAttributes<HTMLParagraphElement>;

export function Text({ size = "md", bold = false, color = "text-white-weak", children, asChild, className }: TextProps) {
  const Comp = asChild ? Slot : "p";

  return (
    <Comp className={classNames(
      size === "sm" ? "text-xs" : size === "md" ? "text-sm" : "text-base", 
      bold ? "font-semibold" : "",
      "font-sans "+color+" "+(className ? className : "")
    )}>{children}</Comp>
  );
}
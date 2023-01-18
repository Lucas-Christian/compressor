import { InputHTMLAttributes } from "react";

type CheckboxProps = {
 id: string;
} & InputHTMLAttributes<HTMLInputElement>

export function Checkbox({id, ...props}: CheckboxProps) {
  return (
    <>
      <input type="checkbox" id={id} name="check" {...props} />
      <label htmlFor={id} />
    </>
  );
}
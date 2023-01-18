import { HTMLAttributes } from "react";

type DivProps = HTMLAttributes<HTMLSelectElement>;

export function DropdownButton(props: DivProps) {
  return (
    <div className="block mb-2"
    >
      <select className="bg-gray-600 border border-gray-400 
        text-sm rounded-lg outline-none
        focus:ring-gray-150 focus:border-gray-150
        block w-32 p-2.5 text-white-weak"
        {...props}
      >
        <option className="font-bold" value="jpg" defaultChecked>jpg</option>
        <option className="font-bold" value="png">png</option>
      </select>
    </div>
  )
}
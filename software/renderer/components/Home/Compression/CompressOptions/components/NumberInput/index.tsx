import { InputHTMLAttributes } from "react";

type NumberInputProps = InputHTMLAttributes<HTMLInputElement>;

export function NumberInput(props: NumberInputProps) {
  const increaseNumber = () => {
    let numberInput = document.querySelector(`#${props.id}`) as HTMLInputElement;
    if(parseInt(numberInput.value) < parseInt(numberInput.max)) {
      numberInput.value = (parseInt(numberInput.value) + 1).toString();
    } else if(numberInput.value === "") {
      numberInput.value = (1).toString();
    }
  }
  const decreaseNumber = () => {
    let numberInput = document.querySelector(`#${props.id}`) as HTMLInputElement;
    if(parseInt(numberInput.value) > parseInt(numberInput.min)) {
      numberInput.value = (parseInt(numberInput.value) - 1).toString();
    }
  }
  const validInput = (event: any) => {
    let numberInput = event.target;
    if(numberInput.value.indexOf("0") === 0) {
      return numberInput.value = numberInput.value.substring(1);
    } else if(parseInt(numberInput.value) > parseInt(numberInput.max)) {
      while(parseInt(numberInput.value) > parseInt(numberInput.max)) {
        numberInput.value = numberInput.value.slice(0, -1);
      }
    }
  }
  const isNumber = (event: any) => {
    if(event.data === "-") return event.preventDefault();
  }
  return (
    <div className="relative w-12 h-8 hover:w-16 xl:w-20 xl:h-12 xl:hover:w-28 rounded-2xl self-center 
      border-2 border-solid border-white opacity-20 duration-500 
      hover:opacity-100 [&>span]:hover:opacity-100 
      [&>.increase]:hover:right-3 [&>.decrease]:hover:left-3"
    >
      <span className="absolute top-1/2 right-[1.875em] block w-3 h-3 
        border-t-2 border-l-2 border-solid border-white-weak
        z-10 -translate-y-1/2 rotate-[135deg] cursor-pointer
        opacity-0 duration-500 increase text-white"
        onClick={increaseNumber} 
      />
      <span className="absolute top-1/2 left-[1.875em] block w-3 h-3 
        border-t-2 border-l-2 border-solid border-white-weak
        z-10 -translate-y-1/2 rotate-[315deg] cursor-pointer
        opacity-0 duration-500 decrease text-white" onClick={decreaseNumber} 
      />
      <input 
        type="number"
        className="numberInput text-white"
        onInput={validInput}
        onBeforeInput={isNumber}
        onPaste={(event: any) => event.preventDefault()}
        onDragStart={(event: any) => event.preventDefault()}
        onDragEnd={(event: any) => event.preventDefault()}
        {...props}
    />
    </div>
  );
}
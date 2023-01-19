import { Dialog, Transition } from "@headlessui/react";
import { Fragment, ReactNode } from "react";

type ModalPanelProps = {
  children: ReactNode;
}

export function ModalPanel({ children }: ModalPanelProps) {
  return (
    <div className="fixed w-screen inset-0 overflow-y-auto">
      <div className="flex min-h-full w-screen items-center justify-center text-center">
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0 scale-95"
          enterTo="opacity-100 scale-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100 scale-100"
          leaveTo="opacity-0 scale-95"
        >
          <Dialog.Panel 
            className="w-screen transform overflow-hidden rounded-2xl p-6 transition-all 
            flex flex-col gap-2 text-left justify-center items-center"
          >
            {children}
          </Dialog.Panel>
        </Transition.Child>
      </div>
    </div>
  );
}
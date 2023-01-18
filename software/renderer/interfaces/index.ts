// You can include shared interfaces/types in a separate file
// and then use them in any component by importing them. For
// example, to import the interface below do:
//
// import User from 'path/to/interfaces';

import type { AriaAttributes, DOMAttributes } from "react";

// eslint-disable-next-line @typescript-eslint/no-unused-vars
declare global {
  // eslint-disable-next-line @typescript-eslint/no-namespace
  interface Window {
    electron: {
      receive: (channel: string, message: any) => void;
      send: (channel: string, message?: any) => void;
    }
  }
}
declare module "react" {
  interface HTMLAttributes<T> extends AriaAttributes, DOMAttributes<T> {
    directory?: string;
    webkitdirectory?: string;
  }
}
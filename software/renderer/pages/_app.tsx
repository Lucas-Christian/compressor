import { AppProps } from "next/app";
import "react-tooltip/dist/react-tooltip.css";
import "../public/styles/globals.css";

declare global {
  interface Window {
    electron: {
      receive: (channel: string, message: any) => void;
      send: (channel: string, message?: any) => void;
    }
  }
}

function MyApp({ Component, pageProps }: AppProps) {
  return <Component {...pageProps} />
}

export default MyApp;
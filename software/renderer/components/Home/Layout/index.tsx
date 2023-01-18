import React, { ReactNode } from "react";
import Head from "next/head";

type Props = {
  children: ReactNode
  title?: string
}

export function Layout({ children, title="Compressor" }: Props) {
  return (
    <React.Fragment>
      <Head>
        <title>{title}</title>
        <meta charSet="UTF-8" />
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      </Head>
      <div className="h-screen w-screen p-6 flex flex-col 
        items-center justify-center select-none" id="homeScreen"
      >
        {children}
      </div>
    </React.Fragment>
  )
}
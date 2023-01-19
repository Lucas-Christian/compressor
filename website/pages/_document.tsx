import Document, { Head, Html, Main, NextScript } from "next/document";
import { Meta } from "../components/Meta";

export default class MyDocument extends Document {
  render() {
    return (
      <Html lang="pt-BR">
        <Head>
          <Meta />
        </Head>
        <body className="min-h-screen max-w-screen bg-gray-600 select-none flex flex-col justify-center items-center">
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}
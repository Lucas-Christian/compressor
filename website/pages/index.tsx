import { VersionToDownload } from "../components/VersionToDownload";
import { CompressorImage } from "../components/CompressorImage";
import { versions } from "../utils/constants/versions";
import { Carousel } from "../components/Carousel";
import { Text } from "../components/Text";
import Head from "next/head";
import Link from "next/link";
import { AiFillGithub } from "react-icons/ai";

export default function Home() {
  return (
    <>
      <Head>
        <title>Compressor · Home</title>
        <meta
          name="description"
          content="Instale o melhor compressor de imagens, e comprima imagens em massa!"
        />
      </Head>
      <main className="max-w-screen h-full flex flex-col items-center justify-center mb-5">
        <CompressorImage />
        <h1 className="bold text-white text-xl xl:text-2xl">
          Compressor
        </h1>
        <Text size="md" className="text-gray-100 mb-7">
          Instale o melhor compressor de imagens!
        </Text>
        <Carousel />
        <div className="w-full mt-5">
          <div className="w-full h-40 pr-1 pl-1 sm:pr-20 sm:pl-20 md:pr-40 md:pl-40 lg:pr-60 lg:pl-60">
            <div className="w-full h-full bg-gray-400 rounded">
              <div 
                className="bg-gray-200 w-full h-10 pt-5 pb-5 
                rounded-tr rounded-tl flex items-center justify-between
                pr-5 pl-5 sm:pr-20 sm:pl-20"
              >
                <Text size="md" bold>Versão</Text>
                <Text size="md" bold>Status</Text>
                <Text size="md" bold>Download</Text>
              </div>
              <div className="w-full h-[7.5rem] flex flex-col gap-2 pt-5 pb-5 overflow-y-auto pr-5 pl-5 sm:pr-[6.5rem] sm:pl-20">
                <RenderVersions />
              </div>
            </div>
          </div>
        </div>
        <Link
          key={"github repository"}
          href={"https://github.com/Lucas-Christian/compressor"}
          aria-label={"Compressor repository"}
          target="__blank"
          rel="external"
          className="p-2 cursor-pointer"
        >
          <AiFillGithub className="w-8 h-8 fill-white hover:fill-gray-100 duration-300" />
        </Link>
      </main>
    </>
  );
  function RenderVersions(): JSX.Element {
    let renderedVersions: any = [];
    
    versions.forEach(({version, version_status, version_download}) => 
      renderedVersions.push(
        <VersionToDownload 
          key={`VersionToDownload:${version}`}
          version={version} 
          version_status={version_status} 
          version_download={version_download}
        />
      )
    );

    return renderedVersions;
  }
}
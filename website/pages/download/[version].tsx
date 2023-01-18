import { AiFillWindows } from "react-icons/ai";
import { versions } from "../../utils/constants/versions";
import { Text } from "../../components/Text";
import Head from "next/head";
import Link from "next/link";

type PathsToGenerate = {params: { version: string }}[];

export async function getStaticPaths() {
  let pathsToGenerate: PathsToGenerate = [];

  for(let i = 0;i < versions.length;i++) {
    pathsToGenerate.push(
      {params: { version: versions[i].version }}
    );
  }

  return {
    paths: pathsToGenerate,
    fallback: false
  }
}

export async function getStaticProps({ params }: any) {
  return {
    props: {
      actual_version: params.version
    }
  }
}

type DownloadProps = {
  actual_version: string;
};

type Version = { 
  version: string; 
  version_status: string; 
  version_download: boolean; 
  windows_64_bits_url?: string;
  windows_32_bits_url?: string;
};

export default function Download({ actual_version }: DownloadProps) {

  let { 
    version, version_download, version_status, 
    windows_64_bits_url, windows_32_bits_url 
  } = getVersion();

  let title = "Compressor ·";

  let pageTitle = `${title} ${actual_version}`,
  pageDescription = `Instale a versão: ${actual_version}, do melhor compressor de imagens, e comprima imagens em massa!`,
  versionPlusStatus = `${title} ${version} ${version_status}`;

  function getVersion() {
    return versions.find(version => version["version"] === actual_version) as Version;
  }

  return (
    <>
      <Head>
        <title>{pageTitle}</title>
        <meta
          name="description"
          content={pageDescription}
        />
      </Head>
      <main className="max-w-screen h-screen flex flex-col items-center justify-center">
        <Link href="/" title="Voltar para o Ínicio" className="absolute top-5">
          <Text size="lg" bold className="underline">Voltar para o Ínicio</Text>
        </Link>

        <h1 className="bold text-white text-xl xl:text-2xl">
          {versionPlusStatus}
          </h1>
        {
          version_download ? 
            <>
              <AiFillWindows className="w-56 h-56 fill-blue-700" />
              <div className="flex justify-center items-center gap-5">
                <Link 
                  href={windows_64_bits_url!} 
                  title="Download Compressor for Windows 64 bits"
                  rel="nofollow"
                  target="_blank"
                >
                  <Text size="lg" bold className="underline">64 bits</Text>
                </Link>
                <Link 
                  href={windows_32_bits_url!} 
                  title="Download Compressor for Windows 32 bits"
                  rel="nofollow"
                  target="_blank"
                >
                  <Text size="lg" bold className="underline">32 bits</Text>
                </Link>
              </div>
            </>
          : <Text size="lg" bold className="underline">Versão indisponível!</Text>
        }
      </main>
    </>
  );
}
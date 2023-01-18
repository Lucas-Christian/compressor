import { useEffect, useState } from "react";

import { CompressOptions } from "../components/Home/Compression/CompressOptions";
import { FolderInputs } from "../components/Home/FolderInputs";
import { CompressBar } from "../components/Home/Compression/CompressBar";
import { Options } from "../components/Home/Options";
import { Layout } from "../components/Home/Layout";

import { OutsideModal } from "../components/OutsideModal";
import { Heading } from "../components/Heading";
import { Button } from "../components/Button";
import { Text } from "../components/Text";

import { hideProgressBar } from "../utils/functions/compress/hideProgressBar";

export default function HomePage() {
  const [ stateOutsideModal, setStateOutsideModal ] = useState("none");
  const [ stateCompression, setStateCompression ] = useState("none");
  const [ stateCompressBar, setStateCompressBar ] = useState("none");
  const [ stateOptions, setStateOptions ] = useState("none");

  const compressImages = () => {
    window.electron.send("DisplayBlock", "compression");
    window.electron.send("DisplayBlock", "outsideModal");
  };
  const openOptions = function() {
    window.electron.send("UpdateTheOptions");
    window.electron.send("DisplayBlock", "options");
    window.electron.send("DisplayBlock", "outsideModal");
  };
  
  useEffect(() => {
    window.electron.send("HomeLoaded");
    window.electron.receive("displayBlock", (target: string) => {
      const context = {
        outsideModal() {
          setStateOutsideModal("block");
        },
        compression() {
          setStateCompression("block");
        },
        compressBar() {
          setStateCompressBar("block");
        },
        options() {
          setStateOptions("block");
        }
      }
      let changeState = context[target as keyof typeof context];
      changeState();
    });
    window.electron.receive("displayNone", (target: string) => {
      const context = {
        outsideModal() {
          setStateOutsideModal("none");
        },
        compression() {
          setStateCompression("none");
        },
        compressBar() {
          setStateCompressBar("none");
        },
        options() {
          setStateOptions("none");
        }
      }
      let changeState = context[target as keyof typeof context];
      changeState();
    });
    window.electron.receive("startCompress", () => {
      const preview = window.document.querySelector("#distFolderPreview") as HTMLDivElement;
      preview.innerHTML = "";
      window.electron.send("DisplayBlock", "compressBar");
      window.electron.send("DisplayBlock", "outsideModal");
    });
    window.electron.receive("hideProgressBar", () => {
      hideProgressBar();
      window.electron.send("DisplayNone", "compressBar");
      window.electron.send("DisplayNone", "outsideModal");
    });
  }, []);
  return (
    <Layout title="Compressor">
      <Heading asChild><h1>Compressor</h1></Heading>

      <FolderInputs />

      {stateCompressBar === "block" ? <CompressBar /> : null}

      {stateCompression === "block" ? <CompressOptions /> : null}

      {stateOptions === "block" ? <Options /> : null}

      <Button onClick={compressImages} id="compressAllImages"><Text>Comprimir</Text></Button>
      <Button onClick={openOptions} id="openOptions"><Text>Opções</Text></Button>

      {stateOutsideModal === "block" ? <OutsideModal /> : null}

    </Layout>
  )
}
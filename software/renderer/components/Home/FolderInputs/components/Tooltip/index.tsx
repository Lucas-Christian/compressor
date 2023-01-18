import { Heading } from "../../../../Heading";
import { Tooltip as ReactTooltip } from "react-tooltip";

type Props = {
  folderType: "src" | "dist";
}

export function Tooltip({ folderType }: Props) {
  let id: string = (folderType === "src" ? "h2Src" : "h2Dist");
  return (
    <>
      <Heading asChild>
        <h2 
          key={id}
          id={id}
          data-tooltip-multiline
          data-tooltip-variant="info"
          data-tooltip-html={
            folderType === "src" ? 
              "Selecione a pasta de origem, o local "+
              "onde as <br />imagens que você deseja comprimir estão localizadas."
            :
              "Selecione a pasta de destino, o local "+
              "onde as <br />imagens devem ser enviadas após comprimir."
          }
        >
          {folderType === "src" ? "Origem" : "Destino"}
        </h2>
      </Heading>
      <ReactTooltip anchorId={id}  />
    </>
  )
}
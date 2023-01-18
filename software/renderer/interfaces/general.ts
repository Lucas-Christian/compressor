export interface Result {
  folderPath: string;
  images: Image[];
}
interface Image {
  name?: string;
  size?: number;
  path?: string;
  type?: string;

  context?: "emptyFolder" | "dontHasSupportedImages" | "returnToDefault";
}
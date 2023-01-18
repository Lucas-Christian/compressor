const fileTypes = [
  "image/jpeg",
  "image/pjpeg",
  "image/png"
];
export function IsASupportedImage(file: string) {
  return fileTypes.includes(file);
}
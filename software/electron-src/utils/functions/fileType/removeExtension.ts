export function removeExtension(filename: string) {
  return filename.replace(/\.[^\/.]+$/, '');
}
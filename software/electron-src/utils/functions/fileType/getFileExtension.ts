const { getExtension } = require("node-mime-types");

export function getFileExtension(mimeType: string) {
  return getExtension(mimeType);
}
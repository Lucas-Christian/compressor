const { getMIMEType } = require("node-mime-types");

export function getFileType(path: string) {
  return getMIMEType(path);
}
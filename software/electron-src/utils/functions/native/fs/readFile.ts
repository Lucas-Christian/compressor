import * as fs from "fs";
export async function readFile(path: string) {
  return fs.readFile(path, (err, data) => {
    if(err) { 
      return console.log(err);
    }
    return data;
  });
}
import * as fs from "fs";
export function getStat(path: string) {
  return new Promise((resolve, reject) => {
    fs.stat(path, (err, stat) => {
      if(err){
        reject(err)
      } else {
        resolve(stat)
      }
    })
  })
}
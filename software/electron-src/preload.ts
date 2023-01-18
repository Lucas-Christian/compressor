import { ipcRenderer, contextBridge } from "electron";

contextBridge.exposeInMainWorld(
  "electron", {
    send: (channel: string, message?: any) => {
      let validChannels = [
        "HomeLoaded", "CompressImages",
        "ClearSrcFolder", "ClearDistFolder",
        "ExecuteOptions", "UpdateTheOptions", 
        "UpdateSrcFolder", "UpdateDistFolder",
        "DisplayNone", "DisplayBlock"
      ];
      if(validChannels.includes(channel)) {
        if(message) {
          ipcRenderer.send(channel, message);
        } else {
          ipcRenderer.send(channel);
        }
      }
    },
    receive: (channel: string, func: (...args: any) => void) => {
      let validChannels = [
        "srcDialogResult", "distDialogResult", 
        "startCompress", "updateProgressState",
        "hideProgressBar", "updateOptions", 
        "displayNone", "displayBlock",
      ];
      if(validChannels.includes(channel)) {
        ipcRenderer.on(channel, (_event, ...args) => func(args[0]));
      }
    }
  }
);
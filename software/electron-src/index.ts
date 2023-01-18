// Native
import { pathToFileURL } from "url";
import { join } from "path";

// Packages
import { BrowserWindow, app, ipcMain } from "electron";
import prepareNext from "electron-next";
import isDev from "electron-is-dev";

// Functions 
import {
  createDefaultUser, createUserTables, readFolder
} from "./utils/functions/functions";

let mainWindow: BrowserWindow;

app.on("ready", async () => {
  await prepareNext("./renderer");

  mainWindow = new BrowserWindow({
    width: 1100,
    height: 600,
    minHeight: 530,
    minWidth: 950,
    icon: "../icon.ico",
    autoHideMenuBar: true, // Ligar quando for construir o app
    webPreferences: {
      nodeIntegration: false,
      contextIsolation: true,
      preload: join(__dirname, "preload.js"),
      devTools: false // Desligar quando for construir o app
    },
  });

  const userDB = await createUserTables();
  await createDefaultUser(userDB);
  mainWindow.userDB = userDB;
  await registerEvents();

  const url = isDev
    ? "http://localhost:8000/"
    : pathToFileURL(join(__dirname, "../../renderer/out/index.html")).toString();
  mainWindow.loadURL(url);

  mainWindow.once("ready-to-show", () => {
    mainWindow.maximize();
  });
});

app.on("window-all-closed", app.quit);

/* Eventos customizados*/

async function registerEvents() {
  const eventsFolderPath = join(__dirname, './events'),
  eventsFolder = readFolder(eventsFolderPath);
  for(const eventName of eventsFolder) {
    const filePath = join(eventsFolderPath, eventName);
    
    const { event } = await import(filePath);
    if(event.once) {
      ipcMain.once(event.name, (...args) => event.execute(...args, mainWindow));
    } else {
      ipcMain.on(event.name, (...args) => event.execute(...args, mainWindow));
    }
  }
}
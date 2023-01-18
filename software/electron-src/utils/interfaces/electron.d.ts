import type { Sql } from "../models/Sql";

declare module "electron" {
  interface BrowserWindow {
    userDB: Sql;
  }
}
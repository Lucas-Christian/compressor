import { open } from "sqlite";
import { Sql } from "../../../models/Sql";
import sqlite3Offline from "sqlite3";

export async function createUserDB() {
  const db = await open({
    filename: "./user.db",
    driver: sqlite3Offline.Database
  });
  const userDB = new Sql(db);
  return userDB;
}
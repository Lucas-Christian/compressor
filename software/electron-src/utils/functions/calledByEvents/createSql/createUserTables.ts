import { tables } from "../../../constants/tables";
import { createUserDB } from "./createUserDB";

export async function createUserTables() {
  const userDB = await createUserDB(), 
  tablesToCreate = Object.values(tables);
  for(let i in tablesToCreate as string[]) {
    await userDB.exec(tablesToCreate[i] as string);
  }
  return userDB;
}
import type sqlite3Offline from "sqlite3";
import { Database } from "sqlite";

type Table = "user" | "userOptions"

export class Sql {
  private db: Database<sqlite3Offline.Database, sqlite3Offline.Statement>;
  constructor(db: Database<sqlite3Offline.Database, sqlite3Offline.Statement>) {
    this.db = db;
  }
  public close = async () => await this.db.close();
  public exec = async (source: string) => await this.db.exec(source);
  public open = async () => await this.db.open();
  public deleteData = async (table: Table, id: string) => 
    await this.db.exec(`DELETE FROM ${table} WHERE ID = ${id}`);
  public searchData = async (table: Table, ID: string) => 
    await this.db.get(`SELECT * FROM ${table} WHERE ID = ${ID}`);
  public insertData = async (table: Table, action: "REPLACE" | "IGNORE", ...args: string[]) => {
    let values: string[] = [];
    args.map(arg => values.push("@"+arg));
    let insertInto = `INSERT or ${action} INTO ${table} (${args.toString()}) VALUES (${values.toString()})`
    const insertIn = async (table: any) => {
      for(let data of table) {
        await this.db.run(insertInto, Object.values(data));
      }
    };
    return insertIn;
  }
}
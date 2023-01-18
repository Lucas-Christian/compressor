import type { Sql } from "../../../models/Sql";

export async function createDefaultUser(userDB: Sql) {
  const insertInUser = await userDB.insertData("user", "IGNORE", "ID", "srcFolder", "distFolder"),
  insertInUserOptions = await userDB.insertData("userOptions", "IGNORE", "ID", 
    "srcFolderAuto", "distFolderAuto"
  );
  await insertInUser([
    { 
      ID: "1",
      srcFolder: "undefined",
      distFolder: "undefined"
    }
  ]);
  await insertInUserOptions([
    { 
      ID: "1",
      srcFolderAuto: "false",
      distFolderAuto: "false"
    }
  ]);
}
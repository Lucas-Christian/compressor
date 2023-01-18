export const tables = {
  user: `CREATE TABLE IF NOT EXISTS user("ID"	INTEGER NOT NULL UNIQUE, "srcFolder"	TEXT NOT NULL, "distFolder"	TEXT NOT NULL, PRIMARY KEY("ID"))`,
  userOptions: `CREATE TABLE IF NOT EXISTS userOptions(	"ID"	INTEGER NOT NULL UNIQUE, "srcFolderAuto"	TEXT NOT NULL, "distFolderAuto"	TEXT NOT NULL, PRIMARY KEY("ID"))`
}
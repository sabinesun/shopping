import { drizzle } from "drizzle-orm/mysql2";
import { migrate } from "drizzle-orm/mysql2/migrator";
import mysql from "mysql2/promise";

const connection = await mysql.createConnection({
  database: process.env["DATABASE_NAME"],
  host: process.env["DATABASE_HOST"],
  password: process.env["DATABASE_PASSWORD"],
  user: process.env["DATABASE_USERNAME"],
});

export const db = drizzle(connection);

await migrate(db, { migrationsFolder: "./database/drizzle" });

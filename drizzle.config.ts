import { cwd } from "node:process";
import type { Config } from "drizzle-kit";
import { loadEnvConfig } from "@next/env";

loadEnvConfig(cwd());

export default {
  schema: "./database/schema.ts",
  out: "./database/drizzle",
  driver: "mysql2",
  dbCredentials: {
    database: process.env["DATABASE_NAME"] ?? "",
    host: process.env["DATABASE_HOST"] ?? "",
    password: process.env["DATABASE_PASSWORD"],
    user: process.env["DATABASE_USERNAME"],
  },
} satisfies Config;

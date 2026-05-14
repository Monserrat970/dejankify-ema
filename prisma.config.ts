import "dotenv/config";
import { defineConfig } from "prisma/config";

const fallbackUrl =
  "postgresql://placeholder:placeholder@localhost:5432/placeholder";

export default defineConfig({
  schema: "prisma/schema.prisma",
  migrations: {
    path: "prisma/migrations",
  },
  datasource: {
    // `prisma generate` runs during installs/builds and does not need a live DB
    // connection, so avoid hard-failing when Railway build-time vars are absent.
    url: process.env.DATABASE_URL || fallbackUrl,
  },
});

import path from "path";
import { fileURLToPath } from "url";
import { buildConfig } from "payload";
import { postgresAdapter } from "@payloadcms/db-postgres";
import { lexicalEditor } from "@payloadcms/richtext-lexical";
import { Users } from "./collections/Users";
import { Media } from "./collections/Media";

const dirname = path.dirname(fileURLToPath(import.meta.url));

export default buildConfig({
  secret: process.env.PAYLOAD_SECRET || "DEVELOPMENT-SECRET-CHANGE-ME-PLEASE",
  db: postgresAdapter({
    pool: {
      connectionString: process.env.DATABASE_URI || "",
    },
  }),
  editor: lexicalEditor(),
  admin: {
    user: Users.slug,
    importMap: {
      baseDir: path.resolve(dirname, "../app/(payload)"),
    },
    meta: {
      titleSuffix: " — Booster CMS",
    },
  },
  collections: [Users, Media],
  globals: [],
  typescript: {
    outputFile: path.resolve(dirname, "../payload-types.ts"),
  },
});

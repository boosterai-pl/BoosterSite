import path from "path";
import { fileURLToPath } from "url";
import sharp from "sharp";
import { buildConfig } from "payload";
import { postgresAdapter } from "@payloadcms/db-postgres";
import { lexicalEditor } from "@payloadcms/richtext-lexical";
import { mcpPlugin } from "@payloadcms/plugin-mcp";
import { Users } from "./collections/Users";
import { Media } from "./collections/Media";
import { Services } from "./collections/Services";
import { CaseStudies } from "./collections/CaseStudies";
import { TeamMembers } from "./collections/TeamMembers";
import { Posts } from "./collections/Posts";
import { HomePage } from "./globals/HomePage";

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
  collections: [Users, Media, Posts, Services, CaseStudies, TeamMembers],
  globals: [HomePage],
  plugins: [
    mcpPlugin({
      collections: {
        posts: { enabled: true },
        services: { enabled: { find: true, create: false, update: false, delete: false } },
        "case-studies": { enabled: { find: true, create: false, update: false, delete: false } },
        "team-members": { enabled: { find: true, create: false, update: false, delete: false } },
      },
      globals: {
        "home-page": { enabled: { find: true, update: false } },
      },
    }),
  ],
  sharp,
  typescript: {
    outputFile: path.resolve(dirname, "../payload-types.ts"),
  },
});

import path from "path";
import { fileURLToPath } from "url";
import sharp from "sharp";
import { buildConfig } from "payload";
import { postgresAdapter } from "@payloadcms/db-postgres";
import { lexicalEditor } from "@payloadcms/richtext-lexical";
import { mcpPlugin } from "@payloadcms/plugin-mcp";
import { vercelBlobStorage } from "@payloadcms/storage-vercel-blob";
import { Users } from "./collections/Users.ts";
import { Media } from "./collections/Media.ts";
import { Services } from "./collections/Services.ts";
import { CaseStudies } from "./collections/CaseStudies.ts";
import { TeamMembers } from "./collections/TeamMembers.ts";
import { Posts } from "./collections/Posts.ts";
import { Practices } from "./collections/Practices.ts";
import { JobRoles } from "./collections/JobRoles.ts";
import { HomePage } from "./globals/HomePage.ts";

const dirname = path.dirname(fileURLToPath(import.meta.url));

export default buildConfig({
  secret: process.env.PAYLOAD_SECRET || "DEVELOPMENT-SECRET-CHANGE-ME-PLEASE",
  db: postgresAdapter({
    pool: {
      connectionString: process.env.DATABASE_URI || "",
    },
    push: false,
    migrationDir: path.resolve(dirname, "../../migrations"),
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
  localization: {
    locales: [
      { code: "en", label: "English" },
      { code: "pl", label: "Polish" },
    ],
    defaultLocale: "en",
    fallback: true,
  },
  collections: [Users, Media, Posts, Services, CaseStudies, TeamMembers, Practices, JobRoles],
  globals: [HomePage],
  plugins: [
    vercelBlobStorage({
      enabled: !!process.env.BLOB_READ_WRITE_TOKEN,
      collections: {
        media: true,
      },
      token: process.env.BLOB_READ_WRITE_TOKEN ?? "",
    }),
    mcpPlugin({
      collections: {
        posts: { enabled: true },
        services: { enabled: { find: true, create: false, update: false, delete: false } },
        "case-studies": { enabled: { find: true, create: false, update: false, delete: false } },
        "team-members": { enabled: { find: true, create: false, update: false, delete: false } },
        practices: { enabled: { find: true, create: false, update: false, delete: false } },
        "job-roles": { enabled: { find: true, create: true, update: true, delete: true } },
      },
      globals: {
        "home-page": { enabled: { find: true, update: false } },
      },
      overrideAuth: async (req, getDefault) => {
        const token = req.headers.get("Authorization")?.replace("Bearer ", "").trim();
        const devKey = process.env.MCP_API_KEY ?? "";
        if (token && token === devKey) {
          const { docs } = await req.payload.find({
            collection: "users",
            limit: 1,
            pagination: false,
          });
          const user = docs[0] ?? ({ id: "mcp", email: "mcp@localhost" } as never);
          return {
            // per-collection capabilities (camelCased slugs)
            posts: { find: true, create: true, update: true, delete: true },
            services: { find: true },
            caseStudies: { find: true },
            teamMembers: { find: true },
            // per-global capabilities (camelCased slugs)
            homePage: { find: true },
            user: { ...user, collection: "users", _strategy: "mcp-api-key" },
          };
        }
        return getDefault();
      },
    }),
  ],
  sharp,
  typescript: {
    outputFile: path.resolve(dirname, "../payload-types.ts"),
  },
});

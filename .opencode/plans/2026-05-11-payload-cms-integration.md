# Payload CMS Integration — Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Replace static `site.ts` and MDX blog with Payload CMS 3.x embedded in the existing Next.js 16 app, making all landing page and blog content editable via `/admin`, with full SEO optimization on the blog.

**Architecture:** Payload 3.x runs as a Next.js plugin inside the existing repo. A `HomePage` global holds all landing page sections. A `Posts` collection handles the blog. PostgreSQL via `@payloadcms/db-postgres`. `loadSite()` switches from static import to Payload Local API. All existing React components remain untouched.

**Tech Stack:** Payload CMS 3.x, `@payloadcms/db-postgres` (Drizzle), `@payloadcms/richtext-lexical`, `@vercel/og`, `sharp`, Next.js 16, React 19, PostgreSQL (Neon).

---

## File Structure

### New files to create:
- `src/payload/payload.config.ts` — main Payload configuration
- `src/payload/collections/Users.ts` — admin users collection
- `src/payload/collections/Media.ts` — media/uploads collection
- `src/payload/collections/Posts.ts` — blog posts collection
- `src/payload/collections/Services.ts` — services collection
- `src/payload/collections/CaseStudies.ts` — case studies collection
- `src/payload/collections/TeamMembers.ts` — team members collection
- `src/payload/globals/HomePage.ts` — landing page singleton global
- `src/app/(payload)/admin/[[...segments]]/page.tsx` — Payload admin panel route
- `src/app/(payload)/admin/[[...segments]]/not-found.tsx` — Payload admin 404
- `src/app/(payload)/api/[...payload]/route.ts` — Payload REST API route
- `src/app/api/og/route.tsx` — dynamic OG image generation
- `src/app/(frontend)/sitemap.ts` — global sitemap from Payload data
- `src/app/(frontend)/robots.ts` — robots.txt blocking /admin
- `src/lib/payload.ts` — `getPayloadClient()` helper
- `src/lib/reading-time.ts` — word count to minutes calculator
- `scripts/seed.ts` — one-time seed from site.ts into Payload
- `scripts/migrate-mdx.ts` — migrate existing MDX posts to Payload
- `.env.local` — environment variables (DATABASE_URI, PAYLOAD_SECRET)

### Files to modify:
- `next.config.mjs` — wrap with `withPayload()`
- `tsconfig.json` — add `@payload-config` path
- `package.json` — add Payload dependencies
- `src/content/index.ts` — switch `loadSite()` to Payload Local API
- `src/content/types.ts` — keep existing types, re-export Payload generated types
- `src/app/layout.tsx` — add Organization JSON-LD, wrap with `(frontend)` route group
- `src/app/(frontend)/page.tsx` — make async, use await loadSite()
- `src/app/(frontend)/blog/page.tsx` — rewrite to fetch from Payload with pagination
- `src/app/(frontend)/blog/[slug]/page.tsx` — rewrite to fetch from Payload, enhance SEO

### Files to delete (after migration verified):
- `src/content/blog/` directory (MDX files)
- `src/lib/blog.ts` (MDX reader)

---

## Task 1: Install Payload CMS dependencies

**Files:**
- Modify: `package.json`

- [ ] **Step 1: Install Payload core and database packages**

Run:
```bash
npm install payload @payloadcms/next @payloadcms/db-postgres @payloadcms/richtext-lexical sharp @vercel/og
```

- [ ] **Step 2: Verify installation succeeded**

Run: `npm ls payload`
Expected: Shows `payload@3.x.x` in dependency tree with no unmet peer dependencies.

- [ ] **Step 3: Commit**

```bash
git add package.json package-lock.json
git commit -m "chore: install Payload CMS 3.x with postgres adapter and lexical editor"
```

---

## Task 2: Configure Next.js for Payload

**Files:**
- Modify: `next.config.mjs:1-9`
- Modify: `tsconfig.json:25-29`
- Create: `.env.local`

- [ ] **Step 1: Wrap next.config.mjs with withPayload**

Replace the entire contents of `next.config.mjs` with:

```js
import { withPayload } from "@payloadcms/next/withPayload";

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    remotePatterns: [],
  },
};

export default withPayload(nextConfig);
```

- [ ] **Step 2: Add @payload-config path alias to tsconfig.json**

Add to the `paths` object in `tsconfig.json` (alongside existing `@/*`):

```json
{
  "compilerOptions": {
    "paths": {
      "@/*": ["./src/*"],
      "@payload-config": ["./src/payload/payload.config.ts"]
    }
  }
}
```

- [ ] **Step 3: Create .env.local**

Create `.env.local` with:

```env
DATABASE_URI=postgresql://localhost:5432/boostersite
PAYLOAD_SECRET=REPLACE_THIS_WITH_A_RANDOM_32_CHAR_STRING
NEXT_PUBLIC_SITE_URL=http://localhost:3000
```

Note: The user must replace `DATABASE_URI` with their actual Postgres connection string (Neon, Supabase, or local). `PAYLOAD_SECRET` must be a random string of at least 32 characters.

- [ ] **Step 4: Add .env.local to .gitignore if not already there**

Check `.gitignore` for `.env.local`. If missing, append:

```
.env.local
```

- [ ] **Step 5: Commit**

```bash
git add next.config.mjs tsconfig.json .gitignore
git commit -m "chore: configure Next.js for Payload CMS (withPayload, path alias, env)"
```

---

## Task 3: Create Payload config and Users collection

**Files:**
- Create: `src/payload/payload.config.ts`
- Create: `src/payload/collections/Users.ts`

- [ ] **Step 1: Create Users collection**

Create `src/payload/collections/Users.ts`:

```ts
import type { CollectionConfig } from "payload";

export const Users: CollectionConfig = {
  slug: "users",
  auth: true,
  admin: {
    useAsTitle: "email",
    group: "Admin",
  },
  access: {
    read: () => true,
  },
  fields: [
    {
      name: "name",
      type: "text",
    },
    {
      name: "role",
      type: "select",
      defaultValue: "editor",
      options: [
        { label: "Admin", value: "admin" },
        { label: "Editor", value: "editor" },
      ],
    },
  ],
};
```

- [ ] **Step 2: Create main Payload config**

Create `src/payload/payload.config.ts`:

```ts
import path from "path";
import { fileURLToPath } from "url";
import { buildConfig } from "payload";
import { postgresAdapter } from "@payloadcms/db-postgres";
import { lexicalEditor } from "@payloadcms/richtext-lexical";
import { Users } from "./collections/Users";

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
  collections: [Users],
  globals: [],
  typescript: {
    outputFile: path.resolve(dirname, "../payload-types.ts"),
  },
});
```

- [ ] **Step 3: Verify TypeScript compiles**

Run: `npx tsc --noEmit 2>&1 | head -20`
Expected: May show errors about missing admin routes — that's OK, we create those in Task 4.

- [ ] **Step 4: Commit**

```bash
git add src/payload/
git commit -m "feat: add Payload CMS config with Users collection and postgres adapter"
```

---

## Task 4: Create Payload admin and API routes

**Files:**
- Create: `src/app/(payload)/admin/[[...segments]]/page.tsx`
- Create: `src/app/(payload)/admin/[[...segments]]/not-found.tsx`
- Create: `src/app/(payload)/api/[...payload]/route.ts`
- Create: `src/app/(payload)/layout.tsx`

- [ ] **Step 1: Create Payload admin page route**

Create `src/app/(payload)/admin/[[...segments]]/page.tsx`:

```tsx
/* THIS FILE WAS GENERATED AUTOMATICALLY BY PAYLOAD. */
/* DO NOT MODIFY IT BECAUSE IT COULD BE REWRITTEN AT ANY TIME. */
import type { Metadata } from "next";

import config from "@payload-config";
import { RootPage, generatePageMetadata } from "@payloadcms/next/views";
import { importMap } from "../importMap";

type Args = {
  params: Promise<{ segments: string[] }>;
  searchParams: Promise<Record<string, string | string[]>>;
};

export const generateMetadata = ({ params, searchParams }: Args): Promise<Metadata> =>
  generatePageMetadata({ config, params, searchParams });

const Page = ({ params, searchParams }: Args) =>
  RootPage({ config, importMap, params, searchParams });

export default Page;
```

- [ ] **Step 2: Create Payload admin not-found route**

Create `src/app/(payload)/admin/[[...segments]]/not-found.tsx`:

```tsx
/* THIS FILE WAS GENERATED AUTOMATICALLY BY PAYLOAD. */
/* DO NOT MODIFY IT BECAUSE IT COULD BE REWRITTEN AT ANY TIME. */
import type { Metadata } from "next";

import config from "@payload-config";
import { RootNotFound, generatePageMetadata } from "@payloadcms/next/views";
import { importMap } from "../importMap";

type Args = {
  params: Promise<{ segments: string[] }>;
  searchParams: Promise<Record<string, string | string[]>>;
};

export const generateMetadata = ({ params, searchParams }: Args): Promise<Metadata> =>
  generatePageMetadata({ config, params, searchParams });

const NotFound = ({ params, searchParams }: Args) =>
  RootNotFound({ config, importMap, params, searchParams });

export default NotFound;
```

- [ ] **Step 3: Create Payload API route**

Create `src/app/(payload)/api/[...payload]/route.ts`:

```ts
/* THIS FILE WAS GENERATED AUTOMATICALLY BY PAYLOAD. */
/* DO NOT MODIFY IT BECAUSE IT COULD BE REWRITTEN AT ANY TIME. */
import config from "@payload-config";
import { REST_DELETE, REST_GET, REST_OPTIONS, REST_PATCH, REST_POST, REST_PUT } from "@payloadcms/next/routes";

export const GET = REST_GET(config);
export const POST = REST_POST(config);
export const DELETE = REST_DELETE(config);
export const PATCH = REST_PATCH(config);
export const PUT = REST_PUT(config);
export const OPTIONS = REST_OPTIONS(config);
```

- [ ] **Step 4: Create Payload layout**

Create `src/app/(payload)/layout.tsx`:

```tsx
import type { ReactNode } from "react";
import "@payloadcms/next/css";

export const metadata = {
  title: "Booster CMS",
};

export default function PayloadLayout({ children }: { children: ReactNode }) {
  return <>{children}</>;
}
```

- [ ] **Step 5: Move existing page.tsx into (frontend) route group**

Move `src/app/page.tsx` to `src/app/(frontend)/page.tsx`.
Move `src/app/blog/` to `src/app/(frontend)/blog/`.
Keep `src/app/layout.tsx` at root level (shared by both route groups).

This ensures Payload admin routes and frontend routes don't conflict.

- [ ] **Step 6: Verify dev server starts**

Run: `npm run dev`
Expected: Server starts. Visit `http://localhost:3000/admin` — should show Payload setup/login screen (or error about missing database — that's expected if Postgres isn't running yet).

- [ ] **Step 7: Commit**

```bash
git add src/app/
git commit -m "feat: add Payload admin panel and API routes, reorganize into route groups"
```

---

## Task 5: Create Media collection

**Files:**
- Create: `src/payload/collections/Media.ts`
- Modify: `src/payload/payload.config.ts`

- [ ] **Step 1: Create Media collection**

Create `src/payload/collections/Media.ts`:

```ts
import type { CollectionConfig } from "payload";

export const Media: CollectionConfig = {
  slug: "media",
  upload: {
    staticDir: "media",
    mimeTypes: ["image/*"],
    imageSizes: [
      {
        name: "thumbnail",
        width: 400,
        height: 300,
        position: "centre",
      },
      {
        name: "card",
        width: 800,
        height: 600,
        position: "centre",
      },
      {
        name: "og",
        width: 1200,
        height: 630,
        position: "centre",
      },
    ],
    adminThumbnail: "thumbnail",
    focalPoint: true,
    crop: true,
  },
  access: {
    read: () => true,
  },
  fields: [
    {
      name: "alt",
      type: "text",
      required: true,
    },
  ],
};
```

- [ ] **Step 2: Register Media in payload.config.ts**

In `src/payload/payload.config.ts`, add import and register:

```ts
import { Media } from "./collections/Media";

// In buildConfig:
collections: [Users, Media],
```

- [ ] **Step 3: Add /media to .gitignore**

Append to `.gitignore`:

```
/media
```

- [ ] **Step 4: Commit**

```bash
git add src/payload/collections/Media.ts src/payload/payload.config.ts .gitignore
git commit -m "feat: add Media upload collection with thumbnail/card/og image sizes"
```

---

## Task 6: Create Services, CaseStudies, TeamMembers collections

**Files:**
- Create: `src/payload/collections/Services.ts`
- Create: `src/payload/collections/CaseStudies.ts`
- Create: `src/payload/collections/TeamMembers.ts`
- Modify: `src/payload/payload.config.ts`

- [ ] **Step 1: Create Services collection**

Create `src/payload/collections/Services.ts`:

```ts
import type { CollectionConfig } from "payload";

export const Services: CollectionConfig = {
  slug: "services",
  admin: {
    useAsTitle: "title",
    group: "Content",
    defaultColumns: ["title", "sortOrder"],
  },
  access: {
    read: () => true,
  },
  fields: [
    {
      name: "sortOrder",
      type: "text",
      required: true,
      admin: { description: 'Display order, e.g. "01", "02"' },
    },
    {
      name: "title",
      type: "text",
      required: true,
    },
    {
      name: "description",
      type: "textarea",
      required: true,
    },
    {
      name: "tags",
      type: "array",
      fields: [
        {
          name: "tag",
          type: "text",
          required: true,
        },
      ],
    },
  ],
};
```

- [ ] **Step 2: Create CaseStudies collection**

Create `src/payload/collections/CaseStudies.ts`:

```ts
import type { CollectionConfig } from "payload";

export const CaseStudies: CollectionConfig = {
  slug: "case-studies",
  admin: {
    useAsTitle: "title",
    group: "Content",
    defaultColumns: ["title", "sortOrder"],
  },
  access: {
    read: () => true,
  },
  fields: [
    {
      name: "sortOrder",
      type: "text",
      required: true,
      admin: { description: 'Display order, e.g. "01", "02"' },
    },
    {
      name: "title",
      type: "text",
      required: true,
    },
    {
      name: "description",
      type: "textarea",
      required: true,
    },
    {
      name: "tags",
      type: "array",
      fields: [
        {
          name: "tag",
          type: "text",
          required: true,
        },
      ],
    },
  ],
};
```

- [ ] **Step 3: Create TeamMembers collection**

Create `src/payload/collections/TeamMembers.ts`:

```ts
import type { CollectionConfig } from "payload";

export const TeamMembers: CollectionConfig = {
  slug: "team-members",
  admin: {
    useAsTitle: "name",
    group: "Content",
    defaultColumns: ["name", "role", "sortOrder"],
  },
  access: {
    read: () => true,
  },
  fields: [
    {
      name: "sortOrder",
      type: "text",
      required: true,
      admin: { description: 'Display order, e.g. "01", "02"' },
    },
    {
      name: "name",
      type: "text",
      required: true,
    },
    {
      name: "role",
      type: "text",
      required: true,
    },
  ],
};
```

- [ ] **Step 4: Register all three collections in payload.config.ts**

In `src/payload/payload.config.ts`:

```ts
import { Services } from "./collections/Services";
import { CaseStudies } from "./collections/CaseStudies";
import { TeamMembers } from "./collections/TeamMembers";

// In buildConfig:
collections: [Users, Media, Services, CaseStudies, TeamMembers],
```

- [ ] **Step 5: Commit**

```bash
git add src/payload/collections/Services.ts src/payload/collections/CaseStudies.ts src/payload/collections/TeamMembers.ts src/payload/payload.config.ts
git commit -m "feat: add Services, CaseStudies, TeamMembers collections"
```

---

## Task 7: Create Posts collection (blog)

**Files:**
- Create: `src/payload/collections/Posts.ts`
- Create: `src/lib/reading-time.ts`
- Modify: `src/payload/payload.config.ts`

- [ ] **Step 1: Create reading-time utility**

Create `src/lib/reading-time.ts`:

```ts
/**
 * Estimate reading time from a Lexical rich text JSON structure.
 * Extracts all text nodes recursively, counts words, divides by 200 wpm.
 * Returns minutes rounded up (minimum 1).
 */
export function estimateReadingTime(lexicalJson: unknown): number {
  const text = extractText(lexicalJson);
  const words = text.split(/\s+/).filter(Boolean).length;
  return Math.max(1, Math.ceil(words / 200));
}

function extractText(node: unknown): string {
  if (!node || typeof node !== "object") return "";
  const n = node as Record<string, unknown>;

  if (typeof n.text === "string") return n.text;

  if (Array.isArray(n.children)) {
    return n.children.map(extractText).join(" ");
  }
  if (n.root && typeof n.root === "object") {
    return extractText(n.root);
  }

  return "";
}
```

- [ ] **Step 2: Create Posts collection**

Create `src/payload/collections/Posts.ts`:

```ts
import type { CollectionConfig } from "payload";
import { estimateReadingTime } from "@/lib/reading-time";

export const Posts: CollectionConfig = {
  slug: "posts",
  admin: {
    useAsTitle: "title",
    group: "Blog",
    defaultColumns: ["title", "status", "publishedAt"],
    listSearchableFields: ["title", "slug"],
  },
  access: {
    read: () => true,
  },
  versions: {
    drafts: true,
  },
  hooks: {
    beforeChange: [
      ({ data, operation }) => {
        if (data && (operation === "create" || !data.slug)) {
          data.slug = (data.title as string)
            .toLowerCase()
            .normalize("NFD")
            .replace(/[\u0300-\u036f]/g, "")
            .replace(/[^a-z0-9]+/g, "-")
            .replace(/^-|-$/g, "");
        }
        if (data?.content) {
          data.readingTime = estimateReadingTime(data.content);
        }
        return data;
      },
    ],
  },
  fields: [
    {
      name: "title",
      type: "text",
      required: true,
    },
    {
      name: "slug",
      type: "text",
      unique: true,
      admin: {
        position: "sidebar",
        description: "Auto-generated from title. Override if needed.",
      },
    },
    {
      name: "excerpt",
      type: "textarea",
      required: true,
      admin: {
        description: "Used as meta description for SEO (max 160 chars recommended).",
      },
    },
    {
      name: "content",
      type: "richText",
      required: true,
    },
    {
      name: "featuredImage",
      type: "upload",
      relationTo: "media",
      admin: {
        description: "Main image for the post. Used in OG tags and blog listing.",
      },
    },
    {
      name: "author",
      type: "relationship",
      relationTo: "team-members",
    },
    {
      name: "publishedAt",
      type: "date",
      required: true,
      admin: {
        date: {
          pickerAppearance: "dayAndTime",
        },
        position: "sidebar",
      },
    },
    {
      name: "tags",
      type: "array",
      admin: {
        description: "Tags for categorization and related posts.",
      },
      fields: [
        {
          name: "tag",
          type: "text",
          required: true,
        },
      ],
    },
    {
      name: "readingTime",
      type: "number",
      admin: {
        position: "sidebar",
        readOnly: true,
        description: "Auto-calculated from content length.",
      },
    },
    {
      type: "tabs",
      tabs: [
        {
          label: "SEO",
          fields: [
            {
              name: "seoTitle",
              label: "Meta Title",
              type: "text",
              admin: {
                description: "Overrides the post title in <title> tag and OG. Leave blank to use post title.",
              },
            },
            {
              name: "seoDescription",
              label: "Meta Description",
              type: "textarea",
              admin: {
                description: "Overrides excerpt for meta description. Leave blank to use excerpt.",
              },
            },
            {
              name: "seoOgImage",
              label: "OG Image Override",
              type: "upload",
              relationTo: "media",
              admin: {
                description: "Custom OG image. Falls back to featured image.",
              },
            },
            {
              name: "seoCanonicalUrl",
              label: "Canonical URL",
              type: "text",
              admin: {
                description: "Override canonical URL if this post is cross-posted.",
              },
            },
          ],
        },
      ],
    },
  ],
};
```

- [ ] **Step 3: Register Posts in payload.config.ts**

In `src/payload/payload.config.ts`:

```ts
import { Posts } from "./collections/Posts";

// In buildConfig:
collections: [Users, Media, Posts, Services, CaseStudies, TeamMembers],
```

- [ ] **Step 4: Commit**

```bash
git add src/payload/collections/Posts.ts src/lib/reading-time.ts src/payload/payload.config.ts
git commit -m "feat: add Posts collection with SEO fields, slug generation, reading time"
```

---

## Task 8: Create HomePage global (landing page singleton)

**Files:**
- Create: `src/payload/globals/HomePage.ts`
- Modify: `src/payload/payload.config.ts`

- [ ] **Step 1: Create HomePage global**

Create `src/payload/globals/HomePage.ts`:

This is a large file. It mirrors the exact shape of `SiteContent` from `types.ts` so that the mapping function in `loadSite()` is as simple as possible.

```ts
import type { GlobalConfig } from "payload";

export const HomePage: GlobalConfig = {
  slug: "home-page",
  label: "Home Page",
  admin: {
    group: "Content",
  },
  access: {
    read: () => true,
  },
  fields: [
    {
      type: "tabs",
      tabs: [
        // ── META ──
        {
          label: "Meta",
          fields: [
            { name: "brand", type: "text", required: true, defaultValue: "Booster" },
            { name: "tagline", type: "text", required: true },
            { name: "contactEmail", type: "email", required: true },
            { name: "establishedLine", type: "text", required: true },
            { name: "version", type: "text", required: true },
          ],
        },
        // ── NAVIGATION ──
        {
          label: "Navigation",
          fields: [
            {
              name: "nav",
              type: "array",
              fields: [
                { name: "label", type: "text", required: true },
                { name: "href", type: "text", required: true },
              ],
            },
            {
              name: "navCta",
              type: "group",
              fields: [
                { name: "label", type: "text", required: true },
                { name: "href", type: "text", required: true },
              ],
            },
          ],
        },
        // ── HERO ──
        {
          label: "Hero",
          fields: [
            { name: "heroEyebrow", type: "text", required: true },
            { name: "heroEstablishedLabel", type: "text", required: true },
            {
              name: "heroHeadlineLines",
              type: "array",
              fields: [
                { name: "text", type: "text", required: true },
                { name: "accent", type: "text" },
              ],
            },
            { name: "heroLead", type: "textarea", required: true },
            {
              name: "heroPrimaryCta",
              type: "group",
              fields: [
                { name: "label", type: "text", required: true },
                { name: "href", type: "text", required: true },
              ],
            },
            {
              name: "heroSecondaryCta",
              type: "group",
              fields: [
                { name: "label", type: "text", required: true },
                { name: "href", type: "text", required: true },
              ],
            },
            {
              name: "heroMeta",
              type: "array",
              fields: [
                { name: "label", type: "text", required: true },
                { name: "value", type: "text", required: true },
                {
                  name: "logos",
                  type: "array",
                  fields: [
                    { name: "name", type: "text", required: true },
                    {
                      name: "component",
                      type: "text",
                      required: true,
                      admin: {
                        description: "Component key from BrandLogos.tsx, e.g. MondayLogo",
                      },
                    },
                  ],
                },
              ],
            },
          ],
        },
        // ── MARQUEE ──
        {
          label: "Marquee",
          fields: [
            {
              name: "marquee",
              type: "array",
              fields: [
                { name: "label", type: "text", required: true },
              ],
            },
          ],
        },
        // ── MANIFESTO ──
        {
          label: "Manifesto",
          fields: [
            { name: "manifestoEyebrow", type: "text", required: true },
            {
              name: "manifestoHeadline",
              type: "group",
              fields: [
                { name: "text", type: "text", required: true },
                { name: "accent", type: "text" },
              ],
            },
            {
              name: "manifestoEntries",
              type: "array",
              fields: [
                { name: "entryId", type: "text", required: true },
                { name: "title", type: "text", required: true },
                { name: "body", type: "textarea", required: true },
              ],
            },
          ],
        },
        // ── SERVICES ──
        {
          label: "Services",
          fields: [
            { name: "servicesEyebrow", type: "text", required: true },
            {
              name: "servicesHeadline",
              type: "group",
              fields: [
                { name: "text", type: "text", required: true },
                { name: "accent", type: "text" },
              ],
            },
            {
              name: "servicesItems",
              type: "relationship",
              relationTo: "services",
              hasMany: true,
            },
          ],
        },
        // ── CASES ──
        {
          label: "Cases",
          fields: [
            { name: "casesEyebrow", type: "text", required: true },
            {
              name: "casesHeadline",
              type: "group",
              fields: [
                { name: "text", type: "text", required: true },
                { name: "accent", type: "text" },
              ],
            },
            {
              name: "casesItems",
              type: "relationship",
              relationTo: "case-studies",
              hasMany: true,
            },
          ],
        },
        // ── SPEED ──
        {
          label: "Speed / Why Us",
          fields: [
            { name: "speedEyebrow", type: "text", required: true },
            {
              name: "speedHeadlineLines",
              type: "array",
              fields: [
                { name: "text", type: "text", required: true },
                { name: "accent", type: "text" },
              ],
            },
            {
              name: "speedStats",
              type: "array",
              fields: [
                { name: "value", type: "text", required: true },
                { name: "suffix", type: "text" },
                { name: "label", type: "text", required: true },
              ],
            },
          ],
        },
        // ── PROCESS ──
        {
          label: "Process",
          fields: [
            { name: "processEyebrow", type: "text", required: true },
            {
              name: "processHeadline",
              type: "group",
              fields: [
                { name: "text", type: "text", required: true },
                { name: "accent", type: "text" },
              ],
            },
            {
              name: "processSteps",
              type: "array",
              fields: [
                { name: "stepId", type: "text", required: true },
                { name: "title", type: "text", required: true },
                { name: "description", type: "textarea", required: true },
              ],
            },
          ],
        },
        // ── PARTNERS ──
        {
          label: "Partners",
          fields: [
            { name: "partnersEyebrow", type: "text", required: true },
            {
              name: "partnersItems",
              type: "array",
              fields: [
                { name: "name", type: "text", required: true },
                { name: "role", type: "text", required: true },
              ],
            },
          ],
        },
        // ── TEAM ──
        {
          label: "Team",
          fields: [
            { name: "teamEyebrow", type: "text", required: true },
            {
              name: "teamHeadline",
              type: "group",
              fields: [
                { name: "text", type: "text", required: true },
                { name: "accent", type: "text" },
              ],
            },
            {
              name: "teamMembers",
              type: "relationship",
              relationTo: "team-members",
              hasMany: true,
            },
          ],
        },
        // ── INSIGHTS ──
        {
          label: "Insights",
          fields: [
            { name: "insightsEyebrow", type: "text", required: true },
            {
              name: "insightsHeadline",
              type: "group",
              fields: [
                { name: "text", type: "text", required: true },
                { name: "accent", type: "text" },
              ],
            },
            {
              name: "insightsPosts",
              type: "array",
              fields: [
                { name: "insightId", type: "text", required: true },
                { name: "category", type: "text", required: true },
                { name: "date", type: "text", required: true },
                { name: "title", type: "text", required: true },
              ],
            },
          ],
        },
        // ── CTA ──
        {
          label: "CTA",
          fields: [
            { name: "ctaEyebrow", type: "text", required: true },
            {
              name: "ctaHeadlineLines",
              type: "array",
              fields: [
                { name: "text", type: "text", required: true },
                { name: "accent", type: "text" },
              ],
            },
            { name: "ctaBody", type: "textarea", required: true },
            {
              name: "ctaButton",
              type: "group",
              fields: [
                { name: "label", type: "text", required: true },
                { name: "href", type: "text", required: true },
              ],
            },
          ],
        },
        // ── FOOTER ──
        {
          label: "Footer",
          fields: [
            { name: "footerIntro", type: "text", required: true },
            {
              name: "footerColumns",
              type: "array",
              fields: [
                { name: "heading", type: "text", required: true },
                {
                  name: "links",
                  type: "array",
                  fields: [
                    { name: "label", type: "text", required: true },
                    { name: "href", type: "text", required: true },
                  ],
                },
              ],
            },
            {
              name: "footerBottom",
              type: "array",
              fields: [
                { name: "text", type: "text", required: true },
              ],
            },
          ],
        },
      ],
    },
  ],
};
```

- [ ] **Step 2: Register HomePage global in payload.config.ts**

In `src/payload/payload.config.ts`:

```ts
import { HomePage } from "./globals/HomePage";

// In buildConfig:
globals: [HomePage],
```

- [ ] **Step 3: Commit**

```bash
git add src/payload/globals/HomePage.ts src/payload/payload.config.ts
git commit -m "feat: add HomePage global with all landing page sections as editable fields"
```

---

## Task 9: Create Payload helper and rewrite loadSite()

**Files:**
- Create: `src/lib/payload.ts`
- Modify: `src/content/index.ts:1-11`
- Modify: `src/app/(frontend)/page.tsx:17-18`

- [ ] **Step 1: Create Payload client helper**

Create `src/lib/payload.ts`:

```ts
import { getPayload } from "payload";
import config from "@payload-config";

export async function getPayloadClient() {
  return getPayload({ config });
}
```

- [ ] **Step 2: Rewrite loadSite() to fetch from Payload**

Replace the entire contents of `src/content/index.ts` with:

```ts
import type { SiteContent } from "./types";
import { getPayloadClient } from "@/lib/payload";

// Fallback to static data during build if database is unavailable
import { site as staticSite } from "./site";

export async function loadSite(): Promise<SiteContent> {
  try {
    const payload = await getPayloadClient();

    const home = await payload.findGlobal({ slug: "home-page" });

    // Fetch related collections
    const [servicesResult, casesResult, teamResult] = await Promise.all([
      home.servicesItems
        ? payload.find({ collection: "services", where: { id: { in: (home.servicesItems as Array<{ id: string }>).map((s) => s.id).join(",") } }, limit: 20 })
        : Promise.resolve({ docs: [] }),
      home.casesItems
        ? payload.find({ collection: "case-studies", where: { id: { in: (home.casesItems as Array<{ id: string }>).map((c) => c.id).join(",") } }, limit: 20 })
        : Promise.resolve({ docs: [] }),
      home.teamMembers
        ? payload.find({ collection: "team-members", where: { id: { in: (home.teamMembers as Array<{ id: string }>).map((t) => t.id).join(",") } }, limit: 20 })
        : Promise.resolve({ docs: [] }),
    ]);

    return mapPayloadToSiteContent(home, servicesResult.docs, casesResult.docs, teamResult.docs);
  } catch {
    // Fall back to static data if Payload is unavailable (e.g., during initial build)
    return staticSite;
  }
}

function mapPayloadToSiteContent(
  home: Record<string, unknown>,
  services: Array<Record<string, unknown>>,
  cases: Array<Record<string, unknown>>,
  team: Array<Record<string, unknown>>,
): SiteContent {
  const h = home as Record<string, any>;

  return {
    meta: {
      brand: h.brand ?? "",
      tagline: h.tagline ?? "",
      contactEmail: h.contactEmail ?? "",
      establishedLine: h.establishedLine ?? "",
      version: h.version ?? "",
    },
    nav: (h.nav ?? []).map((n: any) => ({ label: n.label, href: n.href })),
    navCta: { label: h.navCta?.label ?? "", href: h.navCta?.href ?? "" },
    hero: {
      eyebrow: h.heroEyebrow ?? "",
      establishedLabel: h.heroEstablishedLabel ?? "",
      headlineLines: (h.heroHeadlineLines ?? []).map((l: any) => ({
        text: l.text,
        ...(l.accent ? { accent: l.accent } : {}),
      })),
      lead: h.heroLead ?? "",
      primaryCta: { label: h.heroPrimaryCta?.label ?? "", href: h.heroPrimaryCta?.href ?? "" },
      secondaryCta: { label: h.heroSecondaryCta?.label ?? "", href: h.heroSecondaryCta?.href ?? "" },
      meta: (h.heroMeta ?? []).map((m: any) => ({
        label: m.label,
        value: m.value,
        ...(m.logos?.length
          ? { logos: m.logos.map((l: any) => ({ name: l.name, component: l.component })) }
          : {}),
      })),
    },
    marquee: (h.marquee ?? []).map((m: any) => ({ label: m.label })),
    manifesto: {
      eyebrow: h.manifestoEyebrow ?? "",
      headline: {
        text: h.manifestoHeadline?.text ?? "",
        ...(h.manifestoHeadline?.accent ? { accent: h.manifestoHeadline.accent } : {}),
      },
      entries: (h.manifestoEntries ?? []).map((e: any) => ({
        id: e.entryId,
        title: e.title,
        body: e.body,
      })),
    },
    services: {
      eyebrow: h.servicesEyebrow ?? "",
      headline: {
        text: h.servicesHeadline?.text ?? "",
        ...(h.servicesHeadline?.accent ? { accent: h.servicesHeadline.accent } : {}),
      },
      items: services.map((s: any) => ({
        id: s.sortOrder,
        title: s.title,
        description: s.description,
        tags: (s.tags ?? []).map((t: any) => t.tag),
      })),
    },
    cases: {
      eyebrow: h.casesEyebrow ?? "",
      headline: {
        text: h.casesHeadline?.text ?? "",
        ...(h.casesHeadline?.accent ? { accent: h.casesHeadline.accent } : {}),
      },
      items: cases.map((c: any) => ({
        id: c.sortOrder,
        title: c.title,
        description: c.description,
        tags: (c.tags ?? []).map((t: any) => t.tag),
      })),
    },
    speed: {
      eyebrow: h.speedEyebrow ?? "",
      headlineLines: (h.speedHeadlineLines ?? []).map((l: any) => ({
        text: l.text,
        ...(l.accent ? { accent: l.accent } : {}),
      })),
      stats: (h.speedStats ?? []).map((s: any) => ({
        value: s.value,
        ...(s.suffix ? { suffix: s.suffix } : {}),
        label: s.label,
      })),
    },
    process: {
      eyebrow: h.processEyebrow ?? "",
      headline: {
        text: h.processHeadline?.text ?? "",
        ...(h.processHeadline?.accent ? { accent: h.processHeadline.accent } : {}),
      },
      steps: (h.processSteps ?? []).map((s: any) => ({
        id: s.stepId,
        title: s.title,
        description: s.description,
      })),
    },
    partners: {
      eyebrow: h.partnersEyebrow ?? "",
      items: (h.partnersItems ?? []).map((p: any) => ({
        name: p.name,
        role: p.role,
      })),
    },
    team: {
      eyebrow: h.teamEyebrow ?? "",
      headline: {
        text: h.teamHeadline?.text ?? "",
        ...(h.teamHeadline?.accent ? { accent: h.teamHeadline.accent } : {}),
      },
      members: team.map((t: any) => ({
        id: t.sortOrder,
        name: t.name,
        role: t.role,
      })),
    },
    insights: {
      eyebrow: h.insightsEyebrow ?? "",
      headline: {
        text: h.insightsHeadline?.text ?? "",
        ...(h.insightsHeadline?.accent ? { accent: h.insightsHeadline.accent } : {}),
      },
      posts: (h.insightsPosts ?? []).map((p: any) => ({
        id: p.insightId,
        category: p.category,
        date: p.date,
        title: p.title,
      })),
    },
    cta: {
      eyebrow: h.ctaEyebrow ?? "",
      headlineLines: (h.ctaHeadlineLines ?? []).map((l: any) => ({
        text: l.text,
        ...(l.accent ? { accent: l.accent } : {}),
      })),
      body: h.ctaBody ?? "",
      button: { label: h.ctaButton?.label ?? "", href: h.ctaButton?.href ?? "" },
    },
    footer: {
      intro: h.footerIntro ?? "",
      columns: (h.footerColumns ?? []).map((c: any) => ({
        heading: c.heading,
        links: (c.links ?? []).map((l: any) => ({ label: l.label, href: l.href })),
      })),
      bottom: (h.footerBottom ?? []).map((b: any) => b.text),
    },
  };
}

export type { SiteContent } from "./types";
```

- [ ] **Step 3: Make page.tsx async**

In `src/app/(frontend)/page.tsx`, change:

```tsx
export default function HomePage() {
  const site = loadSite();
```

to:

```tsx
export default async function HomePage() {
  const site = await loadSite();
```

- [ ] **Step 4: Verify typecheck passes**

Run: `npm run typecheck`
Expected: Zero errors. If Payload generated types conflict, adjust the `any` casts in the mapping function.

- [ ] **Step 5: Commit**

```bash
git add src/lib/payload.ts src/content/index.ts src/app/\(frontend\)/page.tsx
git commit -m "feat: rewrite loadSite() to fetch from Payload CMS with static fallback"
```

---

## Task 10: Rewrite blog pages to use Payload

**Files:**
- Modify: `src/app/(frontend)/blog/page.tsx`
- Modify: `src/app/(frontend)/blog/[slug]/page.tsx`

- [ ] **Step 1: Rewrite blog listing page**

Replace entire contents of `src/app/(frontend)/blog/page.tsx`:

```tsx
import type { Metadata } from "next";
import { getPayloadClient } from "@/lib/payload";
import { BlogCard } from "@/components/BlogCard";

export const revalidate = 3600;

type Props = {
  searchParams: Promise<Record<string, string | string[] | undefined>>;
};

const POSTS_PER_PAGE = 10;

export async function generateMetadata({ searchParams }: Props): Promise<Metadata> {
  const sp = await searchParams;
  const page = Number(sp.page) || 1;
  const suffix = page > 1 ? ` — strona ${page}` : "";
  return {
    title: `Blog${suffix} | Booster — AI-Native Agency`,
    description:
      "Praktyczne artykuly o automatyzacji AI, wdrozeniach CRM i budowaniu oprogramowania B2B. Field notes z agencji Booster.",
    alternates: {
      canonical: `https://boosterai.pl/blog${page > 1 ? `?page=${page}` : ""}`,
    },
    openGraph: {
      title: `Blog${suffix} | Booster — AI-Native Agency`,
      description:
        "Praktyczne artykuly o automatyzacji AI, wdrozeniach CRM i budowaniu oprogramowania B2B.",
      type: "website",
      url: `https://boosterai.pl/blog${page > 1 ? `?page=${page}` : ""}`,
    },
  };
}

export default async function BlogPage({ searchParams }: Props) {
  const sp = await searchParams;
  const page = Math.max(1, Number(sp.page) || 1);
  const payload = await getPayloadClient();

  const result = await payload.find({
    collection: "posts",
    where: { _status: { equals: "published" } },
    sort: "-publishedAt",
    limit: POSTS_PER_PAGE,
    page,
  });

  const posts = result.docs;

  const breadcrumbJsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: "https://boosterai.pl" },
      { "@type": "ListItem", position: 2, name: "Blog", item: "https://boosterai.pl/blog" },
    ],
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
      />
      <main className="blog-list-page">
        <section className="block">
          <div className="container-inner">
            <div className="blog-list-head">
              <span className="eyebrow">Blog</span>
              <h1 className="h1">Field notes<br />from the build.</h1>
            </div>
            <div className="blog-grid" data-reveal-stagger>
              {posts.map((post: any) => (
                <BlogCard
                  key={post.id}
                  post={{
                    slug: post.slug,
                    title: post.title,
                    date: post.publishedAt,
                    description: post.excerpt,
                  }}
                />
              ))}
            </div>
            {result.totalPages > 1 && (
              <nav className="blog-pagination" aria-label="Paginacja bloga">
                {page > 1 && (
                  <a href={`/blog${page === 2 ? "" : `?page=${page - 1}`}`}>
                    ← Poprzednia
                  </a>
                )}
                <span className="blog-pagination-info">
                  Strona {page} z {result.totalPages}
                </span>
                {page < result.totalPages && (
                  <a href={`/blog?page=${page + 1}`}>Nastepna →</a>
                )}
              </nav>
            )}
          </div>
        </section>
      </main>
    </>
  );
}
```

- [ ] **Step 2: Rewrite blog post page with full SEO**

Replace entire contents of `src/app/(frontend)/blog/[slug]/page.tsx`:

```tsx
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getPayloadClient } from "@/lib/payload";
import { BlogPost } from "@/components/BlogPost";

export const revalidate = 3600;

type Props = { params: Promise<{ slug: string }> };

export async function generateStaticParams() {
  const payload = await getPayloadClient();
  const result = await payload.find({
    collection: "posts",
    where: { _status: { equals: "published" } },
    limit: 1000,
    select: { slug: true },
  });
  return result.docs.map((post: any) => ({ slug: post.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const payload = await getPayloadClient();
  const result = await payload.find({
    collection: "posts",
    where: { slug: { equals: slug }, _status: { equals: "published" } },
    limit: 1,
  });
  const post = result.docs[0] as any;
  if (!post) return {};

  const title = post.seoTitle || post.title;
  const description = post.seoDescription || post.excerpt;
  const url = post.seoCanonicalUrl || `https://boosterai.pl/blog/${post.slug}`;

  return {
    title: `${title} | Booster`,
    description,
    alternates: { canonical: url },
    openGraph: {
      title,
      description,
      type: "article",
      url: `https://boosterai.pl/blog/${post.slug}`,
      publishedTime: post.publishedAt,
      images: [
        {
          url: `https://boosterai.pl/api/og?slug=${post.slug}`,
          width: 1200,
          height: 630,
          alt: title,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
    },
  };
}

export default async function BlogPostPage({ params }: Props) {
  const { slug } = await params;
  const payload = await getPayloadClient();
  const result = await payload.find({
    collection: "posts",
    where: { slug: { equals: slug }, _status: { equals: "published" } },
    limit: 1,
    depth: 2,
  });
  const post = result.docs[0] as any;
  if (!post) notFound();

  // Map Payload post to BlogPost component shape
  const blogPost = {
    slug: post.slug as string,
    title: post.title as string,
    date: post.publishedAt as string,
    description: post.excerpt as string,
    author: typeof post.author === "object" ? post.author?.name ?? "Booster" : "Booster",
    content: post.content as string, // Note: will need Lexical HTML renderer — see Task 12
  };

  const jsonLdArticle = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: post.title,
    datePublished: post.publishedAt,
    dateModified: post.updatedAt,
    description: post.excerpt,
    author: {
      "@type": "Person",
      name: typeof post.author === "object" ? post.author?.name : "Booster",
    },
    publisher: {
      "@type": "Organization",
      name: "Booster",
      url: "https://boosterai.pl",
      logo: { "@type": "ImageObject", url: "https://boosterai.pl/assets/booster-sygnet.png" },
    },
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": `https://boosterai.pl/blog/${post.slug}`,
    },
    image: post.featuredImage?.url
      ? `https://boosterai.pl${post.featuredImage.url}`
      : `https://boosterai.pl/api/og?slug=${post.slug}`,
    wordCount: post.readingTime ? post.readingTime * 200 : undefined,
  };

  const jsonLdBreadcrumb = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: "https://boosterai.pl" },
      { "@type": "ListItem", position: 2, name: "Blog", item: "https://boosterai.pl/blog" },
      {
        "@type": "ListItem",
        position: 3,
        name: post.title,
        item: `https://boosterai.pl/blog/${post.slug}`,
      },
    ],
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLdArticle) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLdBreadcrumb) }}
      />
      <main className="blog-post-page">
        <BlogPost post={blogPost} />
      </main>
    </>
  );
}
```

- [ ] **Step 3: Commit**

```bash
git add src/app/\(frontend\)/blog/
git commit -m "feat: rewrite blog pages to fetch from Payload CMS with full SEO metadata"
```

---

## Task 11: Add Lexical rich text rendering for blog posts

**Files:**
- Modify: `src/components/BlogPost.tsx:25-28`
- Modify: `src/content/types.ts` (add optional richContent field)
- Modify: `src/app/(frontend)/blog/[slug]/page.tsx`

The existing `BlogPost` component uses `dangerouslySetInnerHTML` with raw markdown content. Payload stores rich text as Lexical JSON. We need to convert Lexical JSON to HTML.

- [ ] **Step 1: Install Lexical HTML rendering utilities**

```bash
npm install @payloadcms/richtext-lexical
```

(This may already be installed from Task 1 — verify with `npm ls @payloadcms/richtext-lexical`.)

- [ ] **Step 2: Create Lexical-to-HTML converter utility**

Create `src/lib/lexical-html.ts`:

```ts
import type { SerializedEditorState } from "@payloadcms/richtext-lexical/lexical";

/**
 * Convert Payload Lexical rich text JSON to HTML string.
 * This is a server-side utility for rendering blog post content.
 */
export async function lexicalToHtml(content: SerializedEditorState): Promise<string> {
  const { consolidateHTMLConverters, convertLexicalToHTML } = await import(
    "@payloadcms/richtext-lexical"
  );
  const { getPayloadClient } = await import("@/lib/payload");

  const payload = await getPayloadClient();

  const html = await convertLexicalToHTML({
    converters: consolidateHTMLConverters({ editorConfig: payload.config.editor }),
    data: content,
  });

  return html;
}
```

- [ ] **Step 3: Update blog post page to convert Lexical to HTML**

In `src/app/(frontend)/blog/[slug]/page.tsx`, add import at top:

```ts
import { lexicalToHtml } from "@/lib/lexical-html";
```

And in the default export function, after fetching the post and before constructing `blogPost`, add:

```ts
  const htmlContent = await lexicalToHtml(post.content);
```

Then change the `content` field in `blogPost` object:

```ts
  const blogPost = {
    slug: post.slug as string,
    title: post.title as string,
    date: post.publishedAt as string,
    description: post.excerpt as string,
    author: typeof post.author === "object" ? post.author?.name ?? "Booster" : "Booster",
    content: htmlContent,
  };
```

- [ ] **Step 4: Commit**

```bash
git add src/lib/lexical-html.ts src/app/\(frontend\)/blog/\[slug\]/page.tsx
git commit -m "feat: add Lexical rich text to HTML conversion for blog posts"
```

---

## Task 12: Add OG image generation, sitemap, robots.txt

**Files:**
- Create: `src/app/api/og/route.tsx`
- Create: `src/app/(frontend)/sitemap.ts`
- Create: `src/app/(frontend)/robots.ts`
- Modify: `src/app/layout.tsx`

- [ ] **Step 1: Create OG image endpoint**

Create `src/app/api/og/route.tsx`:

```tsx
import { ImageResponse } from "@vercel/og";
import { getPayloadClient } from "@/lib/payload";

export const runtime = "edge";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const slug = searchParams.get("slug");

  let title = "Booster — AI-Native Service Agency";
  let category = "Blog";

  if (slug) {
    try {
      const payload = await getPayloadClient();
      const result = await payload.find({
        collection: "posts",
        where: { slug: { equals: slug } },
        limit: 1,
        select: { title: true, tags: true },
      });
      const post = result.docs[0] as any;
      if (post) {
        title = post.title;
        category = post.tags?.[0]?.tag ?? "Blog";
      }
    } catch {
      // Use defaults
    }
  }

  return new ImageResponse(
    (
      <div
        style={{
          height: "100%",
          width: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "flex-end",
          padding: "60px",
          backgroundColor: "#0a0a0a",
          color: "#fafafa",
          fontFamily: "sans-serif",
        }}
      >
        <div
          style={{
            fontSize: 20,
            color: "#1e3dff",
            marginBottom: 16,
            textTransform: "uppercase",
            letterSpacing: "0.1em",
          }}
        >
          {category}
        </div>
        <div
          style={{
            fontSize: 52,
            fontWeight: 700,
            lineHeight: 1.15,
            maxWidth: 900,
          }}
        >
          {title}
        </div>
        <div
          style={{
            display: "flex",
            alignItems: "center",
            marginTop: 40,
            fontSize: 20,
            color: "#888",
          }}
        >
          boosterai.pl
        </div>
      </div>
    ),
    {
      width: 1200,
      height: 630,
    },
  );
}
```

Note: The edge runtime constraint may require adjusting the Payload client call. If `getPayload` is not compatible with edge, the OG image should fall back to reading the slug from a simpler data source or use query params directly (title + category as URL params). Adjust during implementation if needed.

- [ ] **Step 2: Create sitemap.ts**

Create `src/app/(frontend)/sitemap.ts`:

```ts
import type { MetadataRoute } from "next";
import { getPayloadClient } from "@/lib/payload";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const entries: MetadataRoute.Sitemap = [
    {
      url: "https://boosterai.pl",
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 1.0,
    },
    {
      url: "https://boosterai.pl/blog",
      lastModified: new Date(),
      changeFrequency: "daily",
      priority: 0.9,
    },
  ];

  try {
    const payload = await getPayloadClient();
    const result = await payload.find({
      collection: "posts",
      where: { _status: { equals: "published" } },
      limit: 1000,
      select: { slug: true, updatedAt: true },
      sort: "-publishedAt",
    });

    for (const post of result.docs) {
      entries.push({
        url: `https://boosterai.pl/blog/${(post as any).slug}`,
        lastModified: new Date((post as any).updatedAt),
        changeFrequency: "monthly",
        priority: 0.8,
      });
    }
  } catch {
    // If Payload unavailable during build, return base entries only
  }

  return entries;
}
```

- [ ] **Step 3: Create robots.ts**

Create `src/app/(frontend)/robots.ts`:

```ts
import type { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        disallow: ["/admin", "/api"],
      },
    ],
    sitemap: "https://boosterai.pl/sitemap.xml",
  };
}
```

- [ ] **Step 4: Add Organization JSON-LD to root layout**

In `src/app/layout.tsx`, add inside the `<body>` tag before `{children}`:

```tsx
<script
  type="application/ld+json"
  dangerouslySetInnerHTML={{
    __html: JSON.stringify({
      "@context": "https://schema.org",
      "@type": "Organization",
      name: "Booster",
      url: "https://boosterai.pl",
      logo: "https://boosterai.pl/assets/booster-sygnet.png",
      description: "AI-native service agency. CRM implementation, open-source ERP, B2B software and AI automation.",
      email: "hello@boosterai.pl",
      address: {
        "@type": "PostalAddress",
        addressLocality: "Warsaw",
        addressCountry: "PL",
      },
    }),
  }}
/>
```

- [ ] **Step 5: Commit**

```bash
git add src/app/api/og/ src/app/\(frontend\)/sitemap.ts src/app/\(frontend\)/robots.ts src/app/layout.tsx
git commit -m "feat: add OG image generation, sitemap.xml, robots.txt, Organization JSON-LD"
```

---

## Task 13: Create seed script (site.ts → Payload)

**Files:**
- Create: `scripts/seed.ts`

- [ ] **Step 1: Create seed script**

Create `scripts/seed.ts`:

```ts
import { getPayload } from "payload";
import config from "../src/payload/payload.config";
import { site } from "../src/content/site";

async function seed() {
  const payload = await getPayload({ config });

  console.log("Seeding Payload CMS with data from site.ts...\n");

  // 1. Create team members
  console.log("Creating team members...");
  const teamIds: string[] = [];
  for (const member of site.team.members) {
    const existing = await payload.find({
      collection: "team-members",
      where: { name: { equals: member.name } },
    });
    if (existing.docs.length > 0) {
      teamIds.push(existing.docs[0].id as string);
      console.log(`  Skipping existing: ${member.name}`);
      continue;
    }
    const created = await payload.create({
      collection: "team-members",
      data: { sortOrder: member.id, name: member.name, role: member.role },
    });
    teamIds.push(created.id as string);
    console.log(`  Created: ${member.name}`);
  }

  // 2. Create services
  console.log("\nCreating services...");
  const serviceIds: string[] = [];
  for (const svc of site.services.items) {
    const existing = await payload.find({
      collection: "services",
      where: { title: { equals: svc.title } },
    });
    if (existing.docs.length > 0) {
      serviceIds.push(existing.docs[0].id as string);
      console.log(`  Skipping existing: ${svc.title}`);
      continue;
    }
    const created = await payload.create({
      collection: "services",
      data: {
        sortOrder: svc.id,
        title: svc.title,
        description: svc.description,
        tags: svc.tags.map((tag) => ({ tag })),
      },
    });
    serviceIds.push(created.id as string);
    console.log(`  Created: ${svc.title}`);
  }

  // 3. Create case studies
  console.log("\nCreating case studies...");
  const caseIds: string[] = [];
  for (const cs of site.cases.items) {
    const existing = await payload.find({
      collection: "case-studies",
      where: { title: { equals: cs.title } },
    });
    if (existing.docs.length > 0) {
      caseIds.push(existing.docs[0].id as string);
      console.log(`  Skipping existing: ${cs.title}`);
      continue;
    }
    const created = await payload.create({
      collection: "case-studies",
      data: {
        sortOrder: cs.id,
        title: cs.title,
        description: cs.description,
        tags: cs.tags.map((tag) => ({ tag })),
      },
    });
    caseIds.push(created.id as string);
    console.log(`  Created: ${cs.title}`);
  }

  // 4. Update HomePage global
  console.log("\nUpdating HomePage global...");
  await payload.updateGlobal({
    slug: "home-page",
    data: {
      // Meta
      brand: site.meta.brand,
      tagline: site.meta.tagline,
      contactEmail: site.meta.contactEmail,
      establishedLine: site.meta.establishedLine,
      version: site.meta.version,
      // Nav
      nav: site.nav.map((n) => ({ label: n.label, href: n.href })),
      navCta: { label: site.navCta.label, href: site.navCta.href },
      // Hero
      heroEyebrow: site.hero.eyebrow,
      heroEstablishedLabel: site.hero.establishedLabel,
      heroHeadlineLines: site.hero.headlineLines.map((l) => ({
        text: l.text,
        ...(l.accent ? { accent: l.accent } : {}),
      })),
      heroLead: site.hero.lead,
      heroPrimaryCta: { label: site.hero.primaryCta.label, href: site.hero.primaryCta.href },
      heroSecondaryCta: { label: site.hero.secondaryCta.label, href: site.hero.secondaryCta.href },
      heroMeta: site.hero.meta.map((m) => ({
        label: m.label,
        value: m.value,
        ...(m.logos ? { logos: m.logos.map((l) => ({ name: l.name, component: l.component })) } : {}),
      })),
      // Marquee
      marquee: site.marquee.map((m) => ({ label: m.label })),
      // Manifesto
      manifestoEyebrow: site.manifesto.eyebrow,
      manifestoHeadline: { text: site.manifesto.headline.text, accent: site.manifesto.headline.accent },
      manifestoEntries: site.manifesto.entries.map((e) => ({
        entryId: e.id,
        title: e.title,
        body: e.body,
      })),
      // Services
      servicesEyebrow: site.services.eyebrow,
      servicesHeadline: { text: site.services.headline.text, accent: site.services.headline.accent },
      servicesItems: serviceIds,
      // Cases
      casesEyebrow: site.cases.eyebrow,
      casesHeadline: { text: site.cases.headline.text, accent: site.cases.headline.accent },
      casesItems: caseIds,
      // Speed
      speedEyebrow: site.speed.eyebrow,
      speedHeadlineLines: site.speed.headlineLines.map((l) => ({
        text: l.text,
        ...(l.accent ? { accent: l.accent } : {}),
      })),
      speedStats: site.speed.stats.map((s) => ({
        value: s.value,
        ...(s.suffix ? { suffix: s.suffix } : {}),
        label: s.label,
      })),
      // Process
      processEyebrow: site.process.eyebrow,
      processHeadline: { text: site.process.headline.text, accent: site.process.headline.accent },
      processSteps: site.process.steps.map((s) => ({
        stepId: s.id,
        title: s.title,
        description: s.description,
      })),
      // Partners
      partnersEyebrow: site.partners.eyebrow,
      partnersItems: site.partners.items.map((p) => ({ name: p.name, role: p.role })),
      // Team
      teamEyebrow: site.team.eyebrow,
      teamHeadline: { text: site.team.headline.text, accent: site.team.headline.accent },
      teamMembers: teamIds,
      // Insights
      insightsEyebrow: site.insights.eyebrow,
      insightsHeadline: { text: site.insights.headline.text, accent: site.insights.headline.accent },
      insightsPosts: site.insights.posts.map((p) => ({
        insightId: p.id,
        category: p.category,
        date: p.date,
        title: p.title,
      })),
      // CTA
      ctaEyebrow: site.cta.eyebrow,
      ctaHeadlineLines: site.cta.headlineLines.map((l) => ({
        text: l.text,
        ...(l.accent ? { accent: l.accent } : {}),
      })),
      ctaBody: site.cta.body,
      ctaButton: { label: site.cta.button.label, href: site.cta.button.href },
      // Footer
      footerIntro: site.footer.intro,
      footerColumns: site.footer.columns.map((c) => ({
        heading: c.heading,
        links: c.links.map((l) => ({ label: l.label, href: l.href })),
      })),
      footerBottom: site.footer.bottom.map((text) => ({ text })),
    },
  });
  console.log("  HomePage global updated.");

  // 5. Create admin user if none exists
  const users = await payload.find({ collection: "users", limit: 1 });
  if (users.docs.length === 0) {
    console.log("\nCreating default admin user...");
    await payload.create({
      collection: "users",
      data: {
        email: "admin@boosterai.pl",
        password: "ChangeThisPassword123!",
        name: "Admin",
        role: "admin",
      },
    });
    console.log("  Created admin@boosterai.pl (password: ChangeThisPassword123!)");
    console.log("  ⚠  CHANGE THIS PASSWORD after first login!");
  }

  console.log("\nSeed complete.");
  process.exit(0);
}

seed().catch((err) => {
  console.error("Seed failed:", err);
  process.exit(1);
});
```

- [ ] **Step 2: Add seed script to package.json**

Add to `"scripts"` in `package.json`:

```json
"seed": "npx tsx scripts/seed.ts"
```

- [ ] **Step 3: Commit**

```bash
git add scripts/seed.ts package.json
git commit -m "feat: add seed script to populate Payload CMS from existing site.ts data"
```

---

## Task 14: Create MDX migration script

**Files:**
- Create: `scripts/migrate-mdx.ts`

- [ ] **Step 1: Create MDX migration script**

Create `scripts/migrate-mdx.ts`:

```ts
import fs from "fs";
import path from "path";
import matter from "gray-matter";
import { getPayload } from "payload";
import config from "../src/payload/payload.config";

const BLOG_DIR = path.join(process.cwd(), "src/content/blog");

async function migrateMdx() {
  const payload = await getPayload({ config });
  const files = fs.readdirSync(BLOG_DIR).filter((f) => f.endsWith(".mdx"));

  console.log(`Found ${files.length} MDX files to migrate.\n`);

  for (const filename of files) {
    const slug = filename.replace(/\.mdx$/, "");
    const raw = fs.readFileSync(path.join(BLOG_DIR, filename), "utf-8");
    const { data, content } = matter(raw);

    // Check if post already exists
    const existing = await payload.find({
      collection: "posts",
      where: { slug: { equals: slug } },
    });
    if (existing.docs.length > 0) {
      console.log(`Skipping existing: ${slug}`);
      continue;
    }

    // Convert markdown content to simple Lexical format
    // Payload's Lexical editor expects a specific JSON structure.
    // For migration, we store the markdown as a single paragraph.
    // The editor will allow reformatting in the admin panel.
    const lexicalContent = {
      root: {
        type: "root",
        children: content
          .split("\n\n")
          .filter(Boolean)
          .map((paragraph: string) => {
            if (paragraph.startsWith("## ")) {
              return {
                type: "heading",
                tag: "h2",
                children: [{ type: "text", text: paragraph.replace(/^## /, "") }],
                direction: "ltr",
                format: "",
                indent: 0,
                version: 1,
              };
            }
            return {
              type: "paragraph",
              children: [{ type: "text", text: paragraph.trim() }],
              direction: "ltr",
              format: "",
              indent: 0,
              version: 1,
            };
          }),
        direction: "ltr",
        format: "",
        indent: 0,
        version: 1,
      },
    };

    await payload.create({
      collection: "posts",
      data: {
        title: data.title as string,
        slug,
        excerpt: data.description as string,
        content: lexicalContent as any,
        publishedAt: data.date as string,
        _status: "draft", // Create as draft so editor can review
      },
    });

    console.log(`Migrated: ${slug} (as draft — review in admin before publishing)`);
  }

  console.log("\nMigration complete. Review posts in /admin and publish when ready.");
  process.exit(0);
}

migrateMdx().catch((err) => {
  console.error("Migration failed:", err);
  process.exit(1);
});
```

- [ ] **Step 2: Add migrate script to package.json**

Add to `"scripts"` in `package.json`:

```json
"migrate:mdx": "npx tsx scripts/migrate-mdx.ts"
```

- [ ] **Step 3: Commit**

```bash
git add scripts/migrate-mdx.ts package.json
git commit -m "feat: add MDX-to-Payload migration script for existing blog posts"
```

---

## Task 15: Add blog pagination CSS

**Files:**
- Modify: `src/styles/globals.css`

- [ ] **Step 1: Add pagination styles**

Append to the end of `src/styles/globals.css`:

```css
/* ── Blog pagination ── */
.blog-pagination {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 2rem;
  padding: 3rem 0 1rem;
}

.blog-pagination a {
  color: var(--accent);
  text-decoration: none;
  font-size: 0.875rem;
  letter-spacing: 0.05em;
  text-transform: uppercase;
}

.blog-pagination a:hover {
  text-decoration: underline;
}

.blog-pagination-info {
  color: var(--muted);
  font-size: 0.875rem;
}
```

- [ ] **Step 2: Commit**

```bash
git add src/styles/globals.css
git commit -m "style: add blog pagination styles"
```

---

## Task 16: Verification and cleanup

**Files:**
- Delete (after verification): `src/content/blog/` (MDX files)
- Delete (after verification): `src/lib/blog.ts`

- [ ] **Step 1: Run lint**

Run: `npm run lint`
Expected: Zero errors.

- [ ] **Step 2: Run typecheck**

Run: `npm run typecheck`
Expected: Zero errors. If Payload generated types cause issues, run `npx payload generate:types` first.

- [ ] **Step 3: Run build**

Run: `npm run build`
Expected: Successful build. The static fallback in `loadSite()` ensures the build succeeds even without a running database.

- [ ] **Step 4: Start dev server and verify Payload admin**

Run: `npm run dev`
Visit: `http://localhost:3000/admin`
Expected: Payload admin login screen. Create first admin user if prompted.

- [ ] **Step 5: Run seed script**

Run: `npm run seed`
Expected: All site.ts data migrated to Payload. No errors.

- [ ] **Step 6: Run MDX migration**

Run: `npm run migrate:mdx`
Expected: Both MDX posts created as drafts in Payload.

- [ ] **Step 7: Verify landing page**

Visit: `http://localhost:3000`
Expected: Landing page renders identically to before — all sections populated from Payload.

- [ ] **Step 8: Verify blog**

Visit: `http://localhost:3000/blog`
Expected: Blog listing shows posts from Payload. Click through to individual posts.

- [ ] **Step 9: Verify SEO**

Check in browser devtools or `curl`:
- `<title>` tag on blog post pages
- `<meta name="description">` present
- `<link rel="canonical">` present
- JSON-LD `Article` and `BreadcrumbList` in `<head>`
- Visit `/sitemap.xml` — should list all published post URLs
- Visit `/robots.txt` — should block `/admin`

- [ ] **Step 10: Delete old MDX files and blog.ts (only after all checks pass)**

Remove:
- `src/content/blog/ai-automatyzacja-biznesu.mdx`
- `src/content/blog/n8n-integracje-workflow.mdx`
- `src/lib/blog.ts`

Also remove `gray-matter` from dependencies if no longer needed:

```bash
npm uninstall gray-matter
```

- [ ] **Step 11: Final commit**

```bash
git add -A
git commit -m "chore: remove legacy MDX blog system, switch fully to Payload CMS"
```

- [ ] **Step 12: Run full verification pipeline again**

```bash
npm run lint && npm run typecheck && npm run build
```

Expected: All pass with zero errors.

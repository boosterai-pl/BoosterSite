import type { CollectionConfig } from "payload";
import { estimateReadingTime } from "../../lib/reading-time";

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
      ({ data, operation }: { data: Record<string, unknown>; operation: string }) => {
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
      relationTo: "media" as const,
      admin: {
        description: "Main image for the post. Used in OG tags and blog listing.",
      },
    },
    {
      name: "author",
      type: "relationship",
      relationTo: "team-members" as const,
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
                description:
                  "Overrides the post title in <title> tag and OG. Leave blank to use post title.",
              },
            },
            {
              name: "seoDescription",
              label: "Meta Description",
              type: "textarea",
              admin: {
                description:
                  "Overrides excerpt for meta description. Leave blank to use excerpt.",
              },
            },
            {
              name: "seoOgImage",
              label: "OG Image Override",
              type: "upload",
              relationTo: "media" as const,
              admin: {
                description: "Custom OG image. Falls back to featured image.",
              },
            },
            {
              name: "seoCanonicalUrl",
              label: "Canonical URL",
              type: "text",
              admin: {
                description:
                  "Override canonical URL if this post is cross-posted.",
              },
            },
          ],
        },
      ],
    },
  ],
};

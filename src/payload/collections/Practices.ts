import type { CollectionConfig } from "payload";

export const Practices: CollectionConfig = {
  slug: "practices",
  admin: {
    useAsTitle: "eyebrow",
    group: "Content",
    defaultColumns: ["eyebrow", "slug", "sortOrder"],
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
      name: "slug",
      type: "text",
      required: true,
      unique: true,
      admin: { description: "URL slug for the practice subpage." },
    },
    {
      name: "eyebrow",
      type: "text",
      required: true,
      localized: true,
    },
    {
      name: "headline",
      type: "group",
      fields: [
        { name: "text", type: "text", required: true, localized: true },
        { name: "accent", type: "text", localized: true },
      ],
    },
    {
      name: "lead",
      type: "textarea",
      required: true,
      localized: true,
    },
    {
      name: "heroCta",
      type: "group",
      fields: [
        { name: "microCopy", type: "text", localized: true },
        { name: "label", type: "text", localized: true },
        { name: "href", type: "text" },
      ],
    },
    {
      name: "sections",
      type: "array",
      required: true,
      fields: [
        { name: "title", type: "text", required: true, localized: true },
        { name: "body", type: "textarea", required: true, localized: true },
      ],
    },
    {
      name: "cta",
      type: "group",
      fields: [
        { name: "microCopy", type: "text", localized: true },
        { name: "label", type: "text", required: true, localized: true },
        { name: "href", type: "text", required: true },
      ],
    },
  ],
};

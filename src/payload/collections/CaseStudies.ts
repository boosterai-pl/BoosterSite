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
      localized: true,
    },
    {
      name: "description",
      type: "textarea",
      required: true,
      localized: true,
    },
    {
      name: "tags",
      type: "array",
      fields: [
        {
          name: "tag",
          type: "text",
          required: true,
          localized: true,
        },
      ],
    },
  ],
};

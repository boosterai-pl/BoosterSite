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
    {
      name: "photo",
      type: "upload",
      relationTo: "media" as const,
      admin: {
        description: "Profile photo for the team member.",
      },
    },
  ],
};

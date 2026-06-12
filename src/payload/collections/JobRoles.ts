import type { CollectionConfig } from "payload";

export const JobRoles: CollectionConfig = {
  slug: "job-roles",
  admin: {
    useAsTitle: "title",
    group: "Content",
    defaultColumns: ["title", "department", "location", "isOpen", "sortOrder"],
    description: "Open job positions listed on the Careers page.",
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
      name: "isOpen",
      type: "checkbox",
      defaultValue: true,
      admin: { description: "Uncheck to hide this role from the Careers page." },
    },
    {
      name: "slug",
      type: "text",
      required: true,
      unique: true,
      index: true,
      admin: { description: 'URL slug, e.g. "full-stack-engineer"' },
    },
    {
      name: "title",
      type: "text",
      required: true,
      localized: true,
      admin: { description: 'e.g. "Senior AI Engineer"' },
    },
    {
      name: "department",
      type: "text",
      required: true,
      localized: true,
      admin: { description: 'e.g. "Engineering", "Sales"' },
    },
    {
      name: "location",
      type: "text",
      required: true,
      admin: { description: 'e.g. "Warsaw / Remote"' },
    },
    {
      name: "employmentType",
      type: "select",
      required: true,
      defaultValue: "full-time",
      options: [
        { label: "Full-time", value: "full-time" },
        { label: "Part-time", value: "part-time" },
        { label: "Contract", value: "contract" },
        { label: "Internship", value: "internship" },
      ],
    },
    {
      name: "description",
      type: "textarea",
      required: true,
      localized: true,
      admin: { description: "Short summary shown on the Careers page listing." },
    },
    {
      name: "body",
      type: "richText",
      localized: true,
      admin: { description: "Full job posting shown on the role detail page." },
    },
    {
      name: "applyUrl",
      type: "text",
      admin: { description: "Link to apply (form, email, etc.). If empty, defaults to hello@boosterai.pl." },
    },
  ],
};

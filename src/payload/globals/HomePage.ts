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
            { name: "brand", type: "text", required: true },
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
              relationTo: "services" as const,
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
              relationTo: "case-studies" as const,
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
              relationTo: "team-members" as const,
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

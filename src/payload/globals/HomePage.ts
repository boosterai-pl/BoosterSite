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
            { name: "tagline", type: "text", required: true, localized: true },
            { name: "contactEmail", type: "email", required: true },
            { name: "establishedLine", type: "text", required: true, localized: true },
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
                { name: "label", type: "text", required: true, localized: true },
                { name: "href", type: "text", required: true },
              ],
            },
            {
              name: "navCta",
              type: "group",
              fields: [
                { name: "label", type: "text", required: true, localized: true },
                { name: "href", type: "text", required: true },
              ],
            },
          ],
        },
        // ── HERO ──
        {
          label: "Hero",
          fields: [
            { name: "heroEyebrow", type: "text", required: true, localized: true },
            { name: "heroEstablishedLabel", type: "text", localized: true },
            {
              name: "heroHeadlineLines",
              type: "array",
              fields: [
                { name: "text", type: "text", required: true, localized: true },
                { name: "accent", type: "text", localized: true },
              ],
            },
            { name: "heroLead", type: "textarea", required: true, localized: true },
            {
              name: "heroPrimaryCta",
              type: "group",
              fields: [
                { name: "label", type: "text", required: true, localized: true },
                { name: "href", type: "text", required: true },
              ],
            },
            {
              name: "heroSecondaryCta",
              type: "group",
              fields: [
                { name: "label", type: "text", required: true, localized: true },
                { name: "href", type: "text", required: true },
              ],
            },
            {
              name: "heroMeta",
              type: "array",
              fields: [
                { name: "label", type: "text", required: true, localized: true },
                { name: "value", type: "text", required: true, localized: true },
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
                { name: "label", type: "text", required: true, localized: true },
              ],
            },
          ],
        },
        // ── MANIFESTO ──
        {
          label: "Manifesto",
          fields: [
            { name: "manifestoEyebrow", type: "text", required: true, localized: true },
            {
              name: "manifestoHeadline",
              type: "group",
              fields: [
                { name: "text", type: "text", required: true, localized: true },
                { name: "accent", type: "text", localized: true },
              ],
            },
            {
              name: "manifestoEntries",
              type: "array",
              fields: [
                { name: "entryId", type: "text", required: true },
                { name: "title", type: "text", required: true, localized: true },
                { name: "body", type: "textarea", required: true, localized: true },
              ],
            },
          ],
        },
        // ── SERVICES ──
        {
          label: "Services",
          fields: [
            { name: "servicesEyebrow", type: "text", required: true, localized: true },
            {
              name: "servicesHeadline",
              type: "group",
              fields: [
                { name: "text", type: "text", required: true, localized: true },
                { name: "accent", type: "text", localized: true },
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
            { name: "casesEyebrow", type: "text", required: true, localized: true },
            {
              name: "casesHeadline",
              type: "group",
              fields: [
                { name: "text", type: "text", required: true, localized: true },
                { name: "accent", type: "text", localized: true },
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
            { name: "speedEyebrow", type: "text", required: true, localized: true },
            {
              name: "speedHeadlineLines",
              type: "array",
              fields: [
                { name: "text", type: "text", required: true, localized: true },
                { name: "accent", type: "text", localized: true },
              ],
            },
            {
              name: "speedStats",
              type: "array",
              fields: [
                { name: "value", type: "text", required: true },
                { name: "suffix", type: "text", localized: true },
                { name: "label", type: "text", required: true, localized: true },
              ],
            },
          ],
        },
        // ── PROCESS ──
        {
          label: "Process",
          fields: [
            { name: "processEyebrow", type: "text", required: true, localized: true },
            {
              name: "processHeadline",
              type: "group",
              fields: [
                { name: "text", type: "text", required: true, localized: true },
                { name: "accent", type: "text", localized: true },
              ],
            },
            {
              name: "processSteps",
              type: "array",
              fields: [
                { name: "stepId", type: "text", required: true },
                { name: "title", type: "text", required: true, localized: true },
                { name: "description", type: "textarea", required: true, localized: true },
              ],
            },
          ],
        },
        // ── PARTNERS ──
        {
          label: "Partners",
          fields: [
            { name: "partnersEyebrow", type: "text", required: true, localized: true },
            {
              name: "partnersItems",
              type: "array",
              fields: [
                { name: "name", type: "text", required: true },
                { name: "role", type: "text", required: true, localized: true },
              ],
            },
          ],
        },
        // ── TEAM ──
        {
          label: "Team",
          fields: [
            { name: "teamEyebrow", type: "text", required: true, localized: true },
            {
              name: "teamHeadline",
              type: "group",
              fields: [
                { name: "text", type: "text", required: true, localized: true },
                { name: "accent", type: "text", localized: true },
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
            { name: "insightsEyebrow", type: "text", required: true, localized: true },
            {
              name: "insightsHeadline",
              type: "group",
              fields: [
                { name: "text", type: "text", required: true, localized: true },
                { name: "accent", type: "text", localized: true },
              ],
            },
            {
              name: "insightsPosts",
              type: "array",
              fields: [
                { name: "insightId", type: "text", required: true },
                { name: "category", type: "text", required: true, localized: true },
                { name: "date", type: "text", required: true, localized: true },
                { name: "title", type: "text", required: true, localized: true },
              ],
            },
          ],
        },
        // ── CTA ──
        {
          label: "CTA",
          fields: [
            { name: "ctaEyebrow", type: "text", required: true, localized: true },
            {
              name: "ctaHeadlineLines",
              type: "array",
              fields: [
                { name: "text", type: "text", required: true, localized: true },
                { name: "accent", type: "text", localized: true },
              ],
            },
            { name: "ctaBody", type: "textarea", required: true, localized: true },
            {
              name: "ctaButton",
              type: "group",
              fields: [
                { name: "label", type: "text", required: true, localized: true },
                { name: "href", type: "text", required: true },
              ],
            },
          ],
        },
        // ── FOOTER ──
        {
          label: "Footer",
          fields: [
            { name: "footerIntro", type: "text", required: true, localized: true },
            {
              name: "footerColumns",
              type: "array",
              fields: [
                { name: "heading", type: "text", required: true, localized: true },
                {
                  name: "links",
                  type: "array",
                  fields: [
                    { name: "label", type: "text", required: true, localized: true },
                    { name: "href", type: "text", required: true },
                  ],
                },
              ],
            },
            {
              name: "footerBottom",
              type: "array",
              fields: [
                { name: "text", type: "text", required: true, localized: true },
              ],
            },
          ],
        },
      ],
    },
  ],
};

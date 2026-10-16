import type { MetadataRoute } from "next";
import { getBlogPosts, getJobRoles, getPracticeSlugs } from "@/content";

export default function sitemap(): MetadataRoute.Sitemap {
  const entries: MetadataRoute.Sitemap = [
    {
      url: "https://boosterai.pl",
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 1.0,
      alternates: {
        languages: {
          en: "https://boosterai.pl",
          pl: "https://boosterai.pl/pl",
        },
      },
    },
    {
      url: "https://boosterai.pl/pl",
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 1.0,
      alternates: {
        languages: {
          en: "https://boosterai.pl",
          pl: "https://boosterai.pl/pl",
        },
      },
    },
    {
      url: "https://boosterai.pl/blog",
      lastModified: new Date(),
      changeFrequency: "daily",
      priority: 0.9,
    },
    {
      url: "https://boosterai.pl/careers",
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.7,
      alternates: {
        languages: {
          en: "https://boosterai.pl/careers",
          pl: "https://boosterai.pl/pl/careers",
        },
      },
    },
    {
      url: "https://boosterai.pl/pl/careers",
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.7,
      alternates: {
        languages: {
          en: "https://boosterai.pl/careers",
          pl: "https://boosterai.pl/pl/careers",
        },
      },
    },
  ];

  for (const slug of getPracticeSlugs()) {
    entries.push(
      {
        url: `https://boosterai.pl/practices/${slug}`,
        lastModified: new Date(),
        changeFrequency: "monthly",
        priority: 0.8,
        alternates: {
          languages: {
            en: `https://boosterai.pl/practices/${slug}`,
            pl: `https://boosterai.pl/pl/practices/${slug}`,
          },
        },
      },
      {
        url: `https://boosterai.pl/pl/practices/${slug}`,
        lastModified: new Date(),
        changeFrequency: "monthly",
        priority: 0.8,
        alternates: {
          languages: {
            en: `https://boosterai.pl/practices/${slug}`,
            pl: `https://boosterai.pl/pl/practices/${slug}`,
          },
        },
      },
    );
  }

  for (const post of getBlogPosts("en")) {
    const alternates = {
      languages: {
        en: `https://boosterai.pl/blog/${post.slug}`,
        pl: `https://boosterai.pl/pl/blog/${post.slug}`,
      },
    };
    entries.push(
      {
        url: `https://boosterai.pl/blog/${post.slug}`,
        lastModified: new Date(post.date),
        changeFrequency: "monthly",
        priority: 0.8,
        alternates,
      },
      {
        url: `https://boosterai.pl/pl/blog/${post.slug}`,
        lastModified: new Date(post.date),
        changeFrequency: "monthly",
        priority: 0.8,
        alternates,
      },
    );
  }

  for (const role of getJobRoles("en")) {
    if (!role.bodyHtml) continue;
    const alternates = {
      languages: {
        en: `https://boosterai.pl/careers/${role.slug}`,
        pl: `https://boosterai.pl/pl/careers/${role.slug}`,
      },
    };
    entries.push(
      {
        url: `https://boosterai.pl/careers/${role.slug}`,
        lastModified: new Date(),
        changeFrequency: "weekly",
        priority: 0.7,
        alternates,
      },
      {
        url: `https://boosterai.pl/pl/careers/${role.slug}`,
        lastModified: new Date(),
        changeFrequency: "weekly",
        priority: 0.7,
        alternates,
      },
    );
  }

  return entries;
}

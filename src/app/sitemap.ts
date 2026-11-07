import type { MetadataRoute } from "next";
import { getBlogPosts, getJobRoles, getPracticeSlugs } from "@/content";
import { localeAlternates } from "@/i18n/locale";

type Entry = MetadataRoute.Sitemap[number];

// One entry per language for a page that exists in both, linked with hreflang.
function both(
  path: string,
  changeFrequency: Entry["changeFrequency"],
  priority: number,
  lastModified: Date = new Date(),
): MetadataRoute.Sitemap {
  return (["en", "pl"] as const).map((locale) => {
    const { canonical, languages } = localeAlternates(locale, path);
    return { url: canonical, lastModified, changeFrequency, priority, alternates: { languages } };
  });
}

export default function sitemap(): MetadataRoute.Sitemap {
  const entries: MetadataRoute.Sitemap = [
    ...both("", "weekly", 1.0),
    ...both("/book", "monthly", 0.9),
    ...both("/blog", "daily", 0.9),
    ...both("/careers", "weekly", 0.7),
  ];

  for (const slug of getPracticeSlugs()) {
    entries.push(...both(`/practices/${slug}`, "monthly", 0.8));
  }

  for (const post of getBlogPosts("en")) {
    entries.push(...both(`/blog/${post.slug}`, "monthly", 0.8, new Date(post.date)));
  }

  for (const role of getJobRoles("en")) {
    if (!role.bodyHtml) continue;
    entries.push(...both(`/careers/${role.slug}`, "weekly", 0.7));
  }

  return entries;
}

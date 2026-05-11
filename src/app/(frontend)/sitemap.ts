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
      sort: "-publishedAt",
    });

    for (const post of result.docs) {
      const p = post as Record<string, unknown>;
      entries.push({
        url: `https://boosterai.pl/blog/${p.slug as string}`,
        lastModified: new Date(p.updatedAt as string),
        changeFrequency: "monthly",
        priority: 0.8,
      });
    }
  } catch {
    // If Payload unavailable during build, return base entries only
  }

  return entries;
}

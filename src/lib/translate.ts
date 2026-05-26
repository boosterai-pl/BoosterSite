import type { SiteContent } from "@/content/types";

/**
 * Apply flat dot-notation PL messages over a base English SiteContent object.
 * Deep-clones via JSON (SiteContent is plain serialisable data).
 */
export function applyTranslations(
  site: SiteContent,
  messages: Record<string, string>,
  locale?: string,
): SiteContent {
  const clone = JSON.parse(JSON.stringify(site)) as Record<string, unknown>;

  function applyToObj(obj: unknown, prefix: string): unknown {
    if (typeof obj === "string") {
      const translated = messages[prefix];
      return translated !== undefined ? translated : obj;
    }
    if (Array.isArray(obj)) {
      return obj.map((item, i) => applyToObj(item, `${prefix}.${i}`));
    }
    if (obj !== null && typeof obj === "object") {
      const result: Record<string, unknown> = {};
      for (const [k, v] of Object.entries(obj as Record<string, unknown>)) {
        const newKey = prefix ? `${prefix}.${k}` : k;
        result[k] = applyToObj(v, newKey);
      }
      return result;
    }
    return obj;
  }

  const translated = applyToObj(clone, "") as SiteContent;

  // Prefix internal links with the locale path (e.g. /practices/* → /pl/practices/*)
  if (locale) {
    // Work on a mutable deep clone (SiteContent fields are readonly)
    const raw = JSON.parse(JSON.stringify(translated)) as Record<string, unknown>;
    const footer = raw.footer as Record<string, unknown>;
    const columns = footer.columns as Array<{
      heading: string;
      links: Array<{ label: string; href: string }>;
    }>;
    for (const col of columns) {
      for (const link of col.links) {
        if (link.href.startsWith("/") && !link.href.startsWith(`/${locale}`)) {
          link.href = `/${locale}${link.href}`;
        }
      }
    }
    return raw as unknown as SiteContent;
  }

  return translated;
}

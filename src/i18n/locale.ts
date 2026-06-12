import type { SiteLocale } from "@/content";

/** Maps a route locale param to the locale accepted by loadSite(). */
export function toSiteLocale(locale: string): SiteLocale {
  return locale === "pl" ? "pl" : "en";
}

/** URL prefix for locale-aware internal links ("" for en, "/pl" for pl). */
export function localeHrefPrefix(locale: string): string {
  return locale === "pl" ? "/pl" : "";
}

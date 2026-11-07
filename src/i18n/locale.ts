import type { SiteLocale } from "@/content";

export const SITE_URL = "https://boosterai.pl";

/** Maps a route locale param to the locale accepted by loadSite(). */
export function toSiteLocale(locale: string): SiteLocale {
  return locale === "pl" ? "pl" : "en";
}

/** URL prefix for locale-aware internal links ("/en" or "/pl"). */
export function localeHrefPrefix(locale: string): string {
  return `/${toSiteLocale(locale)}`;
}

/** Absolute URL of `path` ("/careers", "" for home) in the given locale. */
export function localeUrl(locale: string, path = ""): string {
  return `${SITE_URL}${localeHrefPrefix(locale)}${path}`;
}

/** canonical + hreflang links for a page that exists in both languages. */
export function localeAlternates(locale: string, path = "") {
  return {
    canonical: localeUrl(locale, path),
    languages: {
      en: localeUrl("en", path),
      pl: localeUrl("pl", path),
      "x-default": localeUrl("en", path),
    },
  };
}

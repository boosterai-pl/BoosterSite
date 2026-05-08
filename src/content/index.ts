// Content boundary. Today this loads from a typed local module.
// To switch to a CMS later, replace `loadSite()` with an async fetch
// that returns the same `SiteContent` shape.
import { site } from "./site";
import type { SiteContent } from "./types";

export function loadSite(): SiteContent {
  return site;
}

export type { SiteContent } from "./types";

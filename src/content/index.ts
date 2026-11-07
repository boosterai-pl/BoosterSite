// Single entry point for site content. Pages and components read content only
// through these functions; the source files live next to this one:
//
//   home/en.ts, home/pl.ts      home page copy, nav, footer, booking
//   services/<slug>.ts          service card + /practices/<slug> page
//   case-studies.ts             "Realizacje" (cases) section on the home page
//   team.ts                     team section on the home page and /book
//   careers/<slug>.<locale>.md  job roles (/careers, /careers/<slug>)
//   blog/<slug>.<locale>.md     blog posts (/blog, /blog/<slug>)
//
// Everything is read at build time; there is no database or CMS.

import type {
  BlogPost,
  EmploymentType,
  HomeCopy,
  JobRole,
  Locale,
  PracticeContent,
  SiteContent,
} from "./types";
import { homeEn } from "./home/en";
import { homePl } from "./home/pl";
import { services } from "./services";
import { caseStudies } from "./case-studies";
import { team } from "./team";
import {
  countWords,
  optionalBoolean,
  optionalNumber,
  optionalString,
  optionalStringList,
  readLocalizedMarkdown,
  renderMarkdown,
  requireDate,
  requireString,
} from "@/lib/markdown";

export type SiteLocale = Locale;

const home = { en: homeEn, pl: homePl } as const;

const toId = (index: number): string => String(index + 1).padStart(2, "0");

// Internal links are written without a locale prefix (e.g. "/careers").
// Every page lives under /en or /pl, so the prefix is added here.
function localizeHref(href: string, locale: SiteLocale): string {
  if (!href.startsWith("/") || href.startsWith("//")) return href;
  if (/^\/(en|pl)(\/|$|#|\?)/.test(href)) return href;
  if (href === "/") return `/${locale}`;
  return href.startsWith("/#") || href.startsWith("/?") ? `/${locale}${href.slice(1)}` : `/${locale}${href}`;
}

// Applies localizeHref to every `href` string in a content tree (CTAs, practice pages, ...).
function localizeHrefs<T>(value: T, locale: SiteLocale): T {
  if (Array.isArray(value)) return value.map((v) => localizeHrefs(v, locale)) as T;
  if (value && typeof value === "object") {
    return Object.fromEntries(
      Object.entries(value).map(([k, v]) => [
        k,
        k === "href" && typeof v === "string" ? localizeHref(v, locale) : localizeHrefs(v, locale),
      ]),
    ) as T;
  }
  return value;
}

export function loadSite(locale: SiteLocale = "en"): SiteContent {
  const copy = home[locale];
  return localizeHrefs(buildSite(copy, locale), locale);
}

function buildSite(copy: HomeCopy, locale: SiteLocale): SiteContent {
  return {
    ...copy,
    services: services.map((s, i) => ({ id: toId(i), slug: s.slug, ...s[locale].card })),
    cases: caseStudies.map((c, i) => ({ id: toId(i), featured: c.featured, ...c[locale] })),
    team: team.map((m, i) => ({ id: toId(i), name: m.name, role: m.role[locale], bio: m.bio[locale], photo: m.photo })),
    practices: services.map((s) => ({ slug: s.slug, ...s[locale].page })),
  };
}

export function getPractice(slug: string, site: SiteContent): PracticeContent | undefined {
  return site.practices.find((p) => p.slug === slug);
}

export function getPracticeSlugs(): string[] {
  return services.map((s) => s.slug);
}

// ---------------------------------------------------------------------------
// Careers
// ---------------------------------------------------------------------------

const EMPLOYMENT_TYPES: readonly EmploymentType[] = ["full-time", "part-time", "contract", "internship"];

/** Open job roles, sorted by their `order` frontmatter field. */
export function getJobRoles(locale: SiteLocale): JobRole[] {
  const roles: Array<{ order: number; role: JobRole }> = [];
  for (const [slug, files] of readLocalizedMarkdown("src/content/careers")) {
    const file = files[locale];
    if (!optionalBoolean(file, "open", true)) continue;
    const employmentType = requireString(file, "employmentType") as EmploymentType;
    if (!EMPLOYMENT_TYPES.includes(employmentType)) {
      throw new Error(`${file.file}: employmentType must be one of ${EMPLOYMENT_TYPES.join(", ")}.`);
    }
    roles.push({
      order: optionalNumber(file, "order", 999),
      role: {
        slug,
        title: requireString(file, "title"),
        department: requireString(file, "department"),
        location: requireString(file, "location"),
        employmentType,
        description: requireString(file, "description"),
        applyUrl: optionalString(file, "applyUrl") ?? "",
        bodyHtml: file.body.trim() ? renderMarkdown(file.body) : "",
      },
    });
  }
  return roles
    .sort((a, b) => a.order - b.order || a.role.slug.localeCompare(b.role.slug))
    .map(({ role }) => role);
}

export function getJobRole(locale: SiteLocale, slug: string): JobRole | undefined {
  return getJobRoles(locale).find((r) => r.slug === slug);
}

// ---------------------------------------------------------------------------
// Blog
// ---------------------------------------------------------------------------

/** Published blog posts, newest first. Posts with `draft: true` are skipped. */
export function getBlogPosts(locale: SiteLocale): BlogPost[] {
  const posts: BlogPost[] = [];
  for (const [slug, files] of readLocalizedMarkdown("src/content/blog")) {
    const file = files[locale];
    if (optionalBoolean(file, "draft", false)) continue;
    const seoTitle = optionalString(file, "seoTitle");
    const seoDescription = optionalString(file, "seoDescription");
    posts.push({
      slug,
      title: requireString(file, "title"),
      date: requireDate(file, "date"),
      description: requireString(file, "description"),
      author: optionalString(file, "author") ?? "Booster",
      tags: optionalStringList(file, "tags"),
      ...(seoTitle ? { seoTitle } : {}),
      ...(seoDescription ? { seoDescription } : {}),
      content: renderMarkdown(file.body),
      wordCount: countWords(file.body),
    });
  }
  return posts.sort((a, b) => (a.date === b.date ? a.slug.localeCompare(b.slug) : a.date > b.date ? -1 : 1));
}

export function getBlogPost(locale: SiteLocale, slug: string): BlogPost | undefined {
  return getBlogPosts(locale).find((p) => p.slug === slug);
}

export type { SiteContent, PracticeContent, JobRole, BlogPost } from "./types";

import fs from "fs";
import path from "path";
import matter from "gray-matter";
import { Marked } from "marked";
import type { Locale, Localized } from "@/content/types";

const LOCALES: readonly Locale[] = ["en", "pl"];

const marked = new Marked({
  renderer: {
    link({ href, tokens }) {
      const text = this.parser.parseInline(tokens);
      return `<a href="${href.replace(/"/g, "&quot;")}" rel="noopener noreferrer">${text}</a>`;
    },
  },
});

export function renderMarkdown(source: string): string {
  return marked.parse(source, { async: false });
}

export function countWords(source: string): number {
  return source.split(/\s+/).filter(Boolean).length;
}

export type MarkdownFile = {
  readonly file: string;
  readonly data: Record<string, unknown>;
  readonly body: string;
};

/**
 * Reads every `<slug>.en.md` / `<slug>.pl.md` pair in a content folder.
 * Throws (and fails the build) when a slug is missing one of the languages.
 */
export function readLocalizedMarkdown(dir: string): Map<string, Localized<MarkdownFile>> {
  const absDir = path.join(process.cwd(), dir);
  if (!fs.existsSync(absDir)) return new Map();

  const bySlug = new Map<string, Partial<Record<Locale, MarkdownFile>>>();
  for (const name of fs.readdirSync(absDir).sort()) {
    const match = /^([a-z0-9]+(?:-[a-z0-9]+)*)\.(en|pl)\.md$/.exec(name);
    if (!match) {
      if (name.endsWith(".md")) {
        throw new Error(`${dir}/${name}: file name must be <slug>.en.md or <slug>.pl.md (lowercase, hyphens).`);
      }
      continue;
    }
    const [, slug, locale] = match as unknown as [string, string, Locale];
    const raw = fs.readFileSync(path.join(absDir, name), "utf-8");
    const { data, content } = matter(raw);
    const entry = bySlug.get(slug) ?? {};
    entry[locale] = { file: `${dir}/${name}`, data, body: content };
    bySlug.set(slug, entry);
  }

  const result = new Map<string, Localized<MarkdownFile>>();
  for (const [slug, entry] of bySlug) {
    for (const locale of LOCALES) {
      if (!entry[locale]) {
        throw new Error(`${dir}/${slug}.${locale}.md is missing. Every entry needs both an .en.md and a .pl.md file.`);
      }
    }
    result.set(slug, entry as Localized<MarkdownFile>);
  }
  return result;
}

export function requireString(file: MarkdownFile, key: string): string {
  const value = file.data[key];
  if (typeof value !== "string" || value.trim() === "") {
    throw new Error(`${file.file}: frontmatter field "${key}" is required and must be text.`);
  }
  return value;
}

export function optionalString(file: MarkdownFile, key: string): string | undefined {
  const value = file.data[key];
  if (value === undefined || value === null || value === "") return undefined;
  if (typeof value !== "string") {
    throw new Error(`${file.file}: frontmatter field "${key}" must be text.`);
  }
  return value;
}

export function requireDate(file: MarkdownFile, key: string): string {
  const value = file.data[key];
  if (value instanceof Date && !Number.isNaN(value.getTime())) {
    return value.toISOString().slice(0, 10);
  }
  if (typeof value === "string" && /^\d{4}-\d{2}-\d{2}/.test(value)) return value;
  throw new Error(`${file.file}: frontmatter field "${key}" is required, format YYYY-MM-DD.`);
}

export function optionalNumber(file: MarkdownFile, key: string, fallback: number): number {
  const value = file.data[key];
  if (value === undefined || value === null) return fallback;
  if (typeof value !== "number") {
    throw new Error(`${file.file}: frontmatter field "${key}" must be a number.`);
  }
  return value;
}

export function optionalBoolean(file: MarkdownFile, key: string, fallback: boolean): boolean {
  const value = file.data[key];
  if (value === undefined || value === null) return fallback;
  if (typeof value !== "boolean") {
    throw new Error(`${file.file}: frontmatter field "${key}" must be true or false.`);
  }
  return value;
}

export function optionalStringList(file: MarkdownFile, key: string): readonly string[] {
  const value = file.data[key];
  if (value === undefined || value === null) return [];
  if (!Array.isArray(value) || !value.every((v) => typeof v === "string")) {
    throw new Error(`${file.file}: frontmatter field "${key}" must be a list of text values.`);
  }
  return value;
}

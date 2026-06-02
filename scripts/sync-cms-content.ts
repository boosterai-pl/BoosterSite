/**
 * sync-cms-content.ts
 *
 * Writes EN and PL marketing content into Payload CMS using the Local API.
 * Safe to run multiple times — it creates records if absent, updates if present.
 * Does NOT touch users, media, auth, or any non-content data.
 *
 * Usage:
 *   npm run sync:cms-content
 */

import * as dotenv from "dotenv";
import * as path from "path";

// Load env BEFORE any Payload module initialises
dotenv.config({ path: path.resolve(process.cwd(), ".env.local") });

if (process.env.DATABASE_URI) {
  const uri = process.env.DATABASE_URI;
  process.env.PGHOST ??= new URL(uri).hostname;
  // Neon requires SSL — append sslmode if not already present
  if (!uri.includes("sslmode")) {
    process.env.DATABASE_URI = uri.includes("?")
      ? `${uri}&sslmode=require`
      : `${uri}?sslmode=require`;
  }
}

// Prevent Payload from trying to load Next.js env internals
process.env.PAYLOAD_CONFIG_PATH = path.resolve(
  process.cwd(),
  "src/payload/payload.config.ts",
);

import { getPayload } from "payload";
import config from "../src/payload/payload.config";
import { site as en } from "../src/content/site";
import type { PracticeContent } from "../src/content/types";
import { applyTranslations } from "../src/lib/translate";
import plMessages from "../messages/pl.json";

const pl = applyTranslations(en, plMessages as Record<string, string>, "pl");

type Locale = "en" | "pl";
const LOCALES: Locale[] = ["pl", "en"]; // kept for reference, not used in main sync loops
const content = { en, pl };

// ─── helpers ──────────────────────────────────────────────────────────────────

async function upsertByLocale<T extends Record<string, unknown>>(
  label: string,
  find: () => Promise<string | null>,
  create: (locale: Locale) => Promise<string>,
  update: (id: string, locale: Locale) => Promise<void>,
) {
  const existingId = await find();
  if (existingId) {
    for (const locale of LOCALES) {
      await update(existingId, locale);
    }
    console.log(`  updated: ${label}`);
  } else {
    const id = await create("en");
    for (const locale of (["pl"] as Locale[])) {
      await update(id, locale);
    }
    console.log(`  created: ${label}`);
  }
}

// ─── main ─────────────────────────────────────────────────────────────────────

async function main() {
  const payload = await getPayload({ config });

  // ── team members ────────────────────────────────────────────────────────────
  console.log("\nSyncing team members...");
  const teamIds: string[] = [];

  for (const member of en.team.members) {
    let id: string;

    const existing = await payload.find({
      collection: "team-members",
      where: { name: { equals: member.name } },
    });

    const plMember = pl.team.members.find((x) => x.id === member.id) ?? member;
    const memberData = {
      sortOrder: member.id,
      name: member.name,
      role: { en: member.role, pl: plMember.role },
    };

    if (existing.docs.length > 0) {
      id = existing.docs[0].id as string;
      await (payload.update as Function)({ collection: "team-members", id, locale: "all", data: memberData });
    } else {
      const created = await (payload.create as Function)({ collection: "team-members", locale: "all", data: memberData });
      id = created.id as string;
    }

    teamIds.push(id);
    console.log(`  synced: ${member.name}`);
  }

  // ── services ────────────────────────────────────────────────────────────────
  console.log("\nSyncing services...");
  const serviceIds: string[] = [];

  for (const svc of en.services.items) {
    let id: string;

    const existing = await payload.find({
      collection: "services",
      where: { sortOrder: { equals: svc.id } },
    });

    const plSvc = pl.services.items.find((x) => x.id === svc.id) ?? svc;
    const svcData = {
      sortOrder: svc.id,
      slug: svc.slug,
      title: { en: svc.title, pl: plSvc.title },
      description: { en: svc.description, pl: plSvc.description },
      tags: svc.tags.map((tag, i) => ({ tag: { en: tag, pl: plSvc.tags[i] ?? tag } })),
    };

    if (existing.docs.length > 0) {
      id = existing.docs[0].id as string;
      await (payload.update as Function)({ collection: "services", id, locale: "all", data: svcData });
    } else {
      const created = await (payload.create as Function)({ collection: "services", locale: "all", data: svcData });
      id = created.id as string;
    }

    serviceIds.push(id);
    console.log(`  synced: ${svc.title}`);
  }

  // ── case studies ────────────────────────────────────────────────────────────
  console.log("\nSyncing case studies...");
  const caseIds: string[] = [];

  for (const cs of en.cases.items) {
    let id: string;

    const existing = await payload.find({
      collection: "case-studies",
      where: { sortOrder: { equals: cs.id } },
    });

    const plCs = pl.cases.items.find((x) => x.id === cs.id) ?? cs;
    const csData = {
      sortOrder: cs.id,
      title: { en: cs.title, pl: plCs.title },
      description: { en: cs.description, pl: plCs.description },
      tags: cs.tags.map((tag, i) => ({ tag: { en: tag, pl: plCs.tags[i] ?? tag } })),
    };

    if (existing.docs.length > 0) {
      id = existing.docs[0].id as string;
      await (payload.update as Function)({ collection: "case-studies", id, locale: "all", data: csData });
    } else {
      const created = await (payload.create as Function)({ collection: "case-studies", locale: "all", data: csData });
      id = created.id as string;
    }

    caseIds.push(id);
    console.log(`  synced: ${cs.title}`);
  }

  // ── practices ───────────────────────────────────────────────────────────────
  console.log("\nSyncing practices...");

  for (const practice of en.practices) {
    let id: string;

    const existing = await payload.find({
      collection: "practices",
      where: { slug: { equals: practice.slug } },
    });

    const plPractice = pl.practices.find((x) => x.slug === practice.slug) ?? practice;
    const practiceData = {
      sortOrder: practice.eyebrow.split(" /")[0] ?? practice.slug,
      slug: practice.slug,
      eyebrow: { en: practice.eyebrow, pl: plPractice.eyebrow },
      headline: {
        text: { en: practice.headline.text, pl: plPractice.headline.text },
        accent: { en: practice.headline.accent ?? "", pl: plPractice.headline.accent ?? "" },
      },
      lead: { en: practice.lead, pl: plPractice.lead },
      heroCta: {
        microCopy: { en: practice.heroCta?.microCopy ?? "", pl: plPractice.heroCta?.microCopy ?? "" },
        label: { en: practice.heroCta?.label ?? "", pl: plPractice.heroCta?.label ?? "" },
        href: practice.heroCta?.href ?? "",
      },
      sections: practice.sections.map((s, i) => ({
        title: { en: s.title, pl: plPractice.sections[i]?.title ?? s.title },
        body: { en: s.body, pl: plPractice.sections[i]?.body ?? s.body },
      })),
      cta: {
        microCopy: { en: practice.cta.microCopy ?? "", pl: plPractice.cta.microCopy ?? "" },
        label: { en: practice.cta.label, pl: plPractice.cta.label },
        href: practice.cta.href,
      },
    };

    if (existing.docs.length > 0) {
      id = existing.docs[0].id as string;
      await (payload.update as Function)({ collection: "practices", id, locale: "all", data: practiceData });
    } else {
      const created = await (payload.create as Function)({ collection: "practices", locale: "all", data: practiceData });
      id = created.id as string;
    }

    console.log(`  synced: ${practice.slug}`);
  }

  // ── home page global ────────────────────────────────────────────────────────
  // Use locale:"all" to write both locales in a single call so Payload creates
  // the localized array rows for BOTH locales atomically — sequential locale
  // calls cause the second call to delete and recreate parent rows, losing the
  // first locale's data.
  console.log("\nSyncing home-page global...");

  // Helper: build a localized value object { en: valEn, pl: valPl }
  const loc = <T>(getVal: (s: typeof en) => T) =>
    ({ en: getVal(content.en), pl: getVal(content.pl) } as unknown);

  // For arrays with localized fields we must provide the full localized shape
  const locArray = <T>(getArr: (s: typeof en) => T[]) =>
    content.en.hero.headlineLines.length > 0 // just to keep TS happy
      ? ({ en: getArr(content.en), pl: getArr(content.pl) } as unknown)
      : [];

  await (payload.updateGlobal as Function)({
    slug: "home-page",
    locale: "all",
    data: {
      brand: en.meta.brand,
      contactEmail: en.meta.contactEmail,
      version: en.meta.version,
      tagline: { en: en.meta.tagline, pl: pl.meta.tagline },
      establishedLine: { en: en.meta.establishedLine, pl: pl.meta.establishedLine },
      nav: en.nav.map((n, i) => ({
        label: { en: n.label, pl: pl.nav[i]?.label ?? n.label },
        href: n.href,
      })),
      navCta: {
        label: { en: en.navCta.label, pl: pl.navCta.label },
        href: en.navCta.href,
      },
      heroEyebrow: { en: en.hero.eyebrow, pl: pl.hero.eyebrow },
      heroEstablishedLabel: { en: en.hero.establishedLabel, pl: pl.hero.establishedLabel },
      heroHeadlineLines: en.hero.headlineLines.map((l, i) => ({
        text: { en: l.text, pl: pl.hero.headlineLines[i]?.text ?? l.text },
        accent: { en: l.accent ?? "", pl: pl.hero.headlineLines[i]?.accent ?? "" },
      })),
      heroLead: { en: en.hero.lead, pl: pl.hero.lead },
      heroPrimaryCta: {
        label: { en: en.hero.primaryCta.label, pl: pl.hero.primaryCta.label },
        href: en.hero.primaryCta.href,
      },
      heroSecondaryCta: {
        label: { en: en.hero.secondaryCta.label, pl: pl.hero.secondaryCta.label },
        href: en.hero.secondaryCta.href,
      },
      heroMeta: en.hero.meta.map((m, i) => ({
        label: { en: m.label, pl: pl.hero.meta[i]?.label ?? m.label },
        value: { en: m.value, pl: pl.hero.meta[i]?.value ?? m.value },
        ...(m.logos ? {
          logos: m.logos.map((l) => ({ name: l.name, component: l.component })),
        } : {}),
      })),
      marquee: en.marquee.map((m, i) => ({
        label: { en: m.label, pl: pl.marquee[i]?.label ?? m.label },
      })),
      manifestoEyebrow: { en: en.manifesto.eyebrow, pl: pl.manifesto.eyebrow },
      manifestoHeadline: {
        text: { en: en.manifesto.headline.text, pl: pl.manifesto.headline.text },
        accent: { en: en.manifesto.headline.accent ?? "", pl: pl.manifesto.headline.accent ?? "" },
      },
      manifestoEntries: en.manifesto.entries.map((e, i) => ({
        entryId: e.id,
        title: { en: e.title, pl: pl.manifesto.entries[i]?.title ?? e.title },
        body: { en: e.body, pl: pl.manifesto.entries[i]?.body ?? e.body },
      })),
      servicesEyebrow: { en: en.services.eyebrow, pl: pl.services.eyebrow },
      servicesHeadline: {
        text: { en: en.services.headline.text, pl: pl.services.headline.text },
        accent: { en: en.services.headline.accent ?? "", pl: pl.services.headline.accent ?? "" },
      },
      servicesItems: serviceIds,
      casesEyebrow: { en: en.cases.eyebrow, pl: pl.cases.eyebrow },
      casesHeadline: {
        text: { en: en.cases.headline.text, pl: pl.cases.headline.text },
        accent: { en: en.cases.headline.accent ?? "", pl: pl.cases.headline.accent ?? "" },
      },
      casesItems: caseIds,
      speedEyebrow: { en: en.speed.eyebrow, pl: pl.speed.eyebrow },
      speedHeadlineLines: en.speed.headlineLines.map((l, i) => ({
        text: { en: l.text, pl: pl.speed.headlineLines[i]?.text ?? l.text },
        accent: { en: l.accent ?? "", pl: pl.speed.headlineLines[i]?.accent ?? "" },
      })),
      speedStats: en.speed.stats.map((s, i) => ({
        value: s.value,
        suffix: { en: s.suffix ?? "", pl: pl.speed.stats[i]?.suffix ?? "" },
        label: { en: s.label, pl: pl.speed.stats[i]?.label ?? s.label },
      })),
      processEyebrow: { en: en.process.eyebrow, pl: pl.process.eyebrow },
      processHeadline: {
        text: { en: en.process.headline.text, pl: pl.process.headline.text },
        accent: { en: en.process.headline.accent ?? "", pl: pl.process.headline.accent ?? "" },
      },
      processSteps: en.process.steps.map((s, i) => ({
        stepId: s.id,
        title: { en: s.title, pl: pl.process.steps[i]?.title ?? s.title },
        description: { en: s.description, pl: pl.process.steps[i]?.description ?? s.description },
      })),
      partnersEyebrow: { en: en.partners.eyebrow, pl: pl.partners.eyebrow },
      partnersItems: en.partners.items.map((p, i) => ({
        name: p.name,
        role: { en: p.role, pl: pl.partners.items[i]?.role ?? p.role },
      })),
      teamEyebrow: { en: en.team.eyebrow, pl: pl.team.eyebrow },
      teamHeadline: {
        text: { en: en.team.headline.text, pl: pl.team.headline.text },
        accent: { en: en.team.headline.accent ?? "", pl: pl.team.headline.accent ?? "" },
      },
      teamMembers: teamIds,
      insightsEyebrow: { en: en.insights.eyebrow, pl: pl.insights.eyebrow },
      insightsHeadline: {
        text: { en: en.insights.headline.text, pl: pl.insights.headline.text },
        accent: { en: en.insights.headline.accent ?? "", pl: pl.insights.headline.accent ?? "" },
      },
      insightsPosts: en.insights.posts.map((p, i) => ({
        insightId: p.id,
        category: { en: p.category, pl: pl.insights.posts[i]?.category ?? p.category },
        date: { en: p.date, pl: pl.insights.posts[i]?.date ?? p.date },
        title: { en: p.title, pl: pl.insights.posts[i]?.title ?? p.title },
      })),
      ctaEyebrow: { en: en.cta.eyebrow, pl: pl.cta.eyebrow },
      ctaHeadlineLines: en.cta.headlineLines.map((l, i) => ({
        text: { en: l.text, pl: pl.cta.headlineLines[i]?.text ?? l.text },
        accent: { en: l.accent ?? "", pl: pl.cta.headlineLines[i]?.accent ?? "" },
      })),
      ctaBody: { en: en.cta.body, pl: pl.cta.body },
      ctaButton: {
        label: { en: en.cta.button.label, pl: pl.cta.button.label },
        href: en.cta.button.href,
      },
      footerIntro: { en: en.footer.intro, pl: pl.footer.intro },
      footerColumns: en.footer.columns.map((col, i) => ({
        heading: { en: col.heading, pl: pl.footer.columns[i]?.heading ?? col.heading },
        links: col.links.map((l, j) => ({
          label: { en: l.label, pl: pl.footer.columns[i]?.links[j]?.label ?? l.label },
          href: l.href,
        })),
      })),
      footerBottom: en.footer.bottom.map((text, i) => ({
        text: { en: text, pl: pl.footer.bottom[i] ?? text },
      })),
    },
  });
  console.log("  synced both locales in single call");

  console.log("\nDone. All CMS content synced in EN and PL.");
  process.exit(0);
}

main().catch((err) => {
  console.error("sync-cms-content failed:", err);
  process.exit(1);
});

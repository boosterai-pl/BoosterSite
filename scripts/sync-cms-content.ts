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
const LOCALES: Locale[] = ["en", "pl"];
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

    if (existing.docs.length > 0) {
      id = existing.docs[0].id as string;
    } else {
      const created = await payload.create({
        collection: "team-members",
        locale: "en",
        data: { sortOrder: member.id, name: member.name, role: member.role },
      });
      id = created.id as string;
    }

    for (const locale of LOCALES) {
      const m = content[locale].team.members.find((x) => x.id === member.id) ?? member;
      await payload.update({
        collection: "team-members",
        id,
        locale,
        data: { sortOrder: m.id, name: m.name, role: m.role },
      });
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

    if (existing.docs.length > 0) {
      id = existing.docs[0].id as string;
    } else {
      const created = await payload.create({
        collection: "services",
        locale: "en",
        data: {
          sortOrder: svc.id,
          slug: svc.slug,
          title: svc.title,
          description: svc.description,
          tags: svc.tags.map((tag) => ({ tag })),
        },
      });
      id = created.id as string;
    }

    for (const locale of LOCALES) {
      const s = content[locale].services.items.find((x) => x.id === svc.id) ?? svc;
      await payload.update({
        collection: "services",
        id,
        locale,
        data: {
          sortOrder: s.id,
          slug: s.slug,
          title: s.title,
          description: s.description,
          tags: s.tags.map((tag) => ({ tag })),
        },
      });
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

    if (existing.docs.length > 0) {
      id = existing.docs[0].id as string;
    } else {
      const created = await payload.create({
        collection: "case-studies",
        locale: "en",
        data: {
          sortOrder: cs.id,
          title: cs.title,
          description: cs.description,
          tags: cs.tags.map((tag) => ({ tag })),
        },
      });
      id = created.id as string;
    }

    for (const locale of LOCALES) {
      const c = content[locale].cases.items.find((x) => x.id === cs.id) ?? cs;
      await payload.update({
        collection: "case-studies",
        id,
        locale,
        data: {
          sortOrder: c.id,
          title: c.title,
          description: c.description,
          tags: c.tags.map((tag) => ({ tag })),
        },
      });
    }

    caseIds.push(id);
    console.log(`  synced: ${cs.title}`);
  }

  // ── practices ───────────────────────────────────────────────────────────────
  console.log("\nSyncing practices...");

  const practiceData = (p: PracticeContent) => ({
    sortOrder: p.eyebrow.split(" /")[0] ?? p.slug,
    slug: p.slug,
    eyebrow: p.eyebrow,
    headline: {
      text: p.headline.text,
      ...(p.headline.accent ? { accent: p.headline.accent } : {}),
    },
    lead: p.lead,
    ...(p.heroCta
      ? {
          heroCta: {
            ...(p.heroCta.microCopy ? { microCopy: p.heroCta.microCopy } : {}),
            label: p.heroCta.label,
            href: p.heroCta.href,
          },
        }
      : {}),
    sections: p.sections.map((s) => ({ title: s.title, body: s.body })),
    cta: {
      ...(p.cta.microCopy ? { microCopy: p.cta.microCopy } : {}),
      label: p.cta.label,
      href: p.cta.href,
    },
  });

  for (const practice of en.practices) {
    let id: string;

    const existing = await payload.find({
      collection: "practices",
      where: { slug: { equals: practice.slug } },
    });

    if (existing.docs.length > 0) {
      id = existing.docs[0].id as string;
    } else {
      const created = await payload.create({
        collection: "practices",
        locale: "en",
        data: practiceData(practice),
      });
      id = created.id as string;
    }

    for (const locale of LOCALES) {
      const p = content[locale].practices.find((x) => x.slug === practice.slug) ?? practice;
      await payload.update({
        collection: "practices",
        id,
        locale,
        data: practiceData(p),
      });
    }

    console.log(`  synced: ${practice.slug}`);
  }

  // ── home page global ────────────────────────────────────────────────────────
  console.log("\nSyncing home-page global...");

  for (const locale of LOCALES) {
    const s = content[locale];
    await payload.updateGlobal({
      slug: "home-page",
      locale,
      data: {
        brand: s.meta.brand,
        tagline: s.meta.tagline,
        contactEmail: s.meta.contactEmail,
        establishedLine: s.meta.establishedLine,
        version: s.meta.version,
        nav: s.nav.map((n) => ({ label: n.label, href: n.href })),
        navCta: { label: s.navCta.label, href: s.navCta.href },
        heroEyebrow: s.hero.eyebrow,
        heroEstablishedLabel: s.hero.establishedLabel,
        heroHeadlineLines: s.hero.headlineLines.map((l) => ({
          text: l.text,
          ...(l.accent ? { accent: l.accent } : {}),
        })),
        heroLead: s.hero.lead,
        heroPrimaryCta: { label: s.hero.primaryCta.label, href: s.hero.primaryCta.href },
        heroSecondaryCta: { label: s.hero.secondaryCta.label, href: s.hero.secondaryCta.href },
        heroMeta: s.hero.meta.map((m) => ({
          label: m.label,
          value: m.value,
          ...(m.logos ? { logos: m.logos.map((l) => ({ name: l.name, component: l.component })) } : {}),
        })),
        marquee: s.marquee.map((m) => ({ label: m.label })),
        manifestoEyebrow: s.manifesto.eyebrow,
        manifestoHeadline: {
          text: s.manifesto.headline.text,
          ...(s.manifesto.headline.accent ? { accent: s.manifesto.headline.accent } : {}),
        },
        manifestoEntries: s.manifesto.entries.map((e) => ({
          entryId: e.id,
          title: e.title,
          body: e.body,
        })),
        servicesEyebrow: s.services.eyebrow,
        servicesHeadline: {
          text: s.services.headline.text,
          ...(s.services.headline.accent ? { accent: s.services.headline.accent } : {}),
        },
        servicesItems: serviceIds,
        casesEyebrow: s.cases.eyebrow,
        casesHeadline: {
          text: s.cases.headline.text,
          ...(s.cases.headline.accent ? { accent: s.cases.headline.accent } : {}),
        },
        casesItems: caseIds,
        speedEyebrow: s.speed.eyebrow,
        speedHeadlineLines: s.speed.headlineLines.map((l) => ({
          text: l.text,
          ...(l.accent ? { accent: l.accent } : {}),
        })),
        speedStats: s.speed.stats.map((stat) => ({
          value: stat.value,
          ...(stat.suffix ? { suffix: stat.suffix } : {}),
          label: stat.label,
        })),
        processEyebrow: s.process.eyebrow,
        processHeadline: {
          text: s.process.headline.text,
          ...(s.process.headline.accent ? { accent: s.process.headline.accent } : {}),
        },
        processSteps: s.process.steps.map((step) => ({
          stepId: step.id,
          title: step.title,
          description: step.description,
        })),
        partnersEyebrow: s.partners.eyebrow,
        partnersItems: s.partners.items.map((p) => ({ name: p.name, role: p.role })),
        teamEyebrow: s.team.eyebrow,
        teamHeadline: {
          text: s.team.headline.text,
          ...(s.team.headline.accent ? { accent: s.team.headline.accent } : {}),
        },
        teamMembers: teamIds,
        insightsEyebrow: s.insights.eyebrow,
        insightsHeadline: {
          text: s.insights.headline.text,
          ...(s.insights.headline.accent ? { accent: s.insights.headline.accent } : {}),
        },
        insightsPosts: s.insights.posts.map((p) => ({
          insightId: p.id,
          category: p.category,
          date: p.date,
          title: p.title,
        })),
        ctaEyebrow: s.cta.eyebrow,
        ctaHeadlineLines: s.cta.headlineLines.map((l) => ({
          text: l.text,
          ...(l.accent ? { accent: l.accent } : {}),
        })),
        ctaBody: s.cta.body,
        ctaButton: { label: s.cta.button.label, href: s.cta.button.href },
        footerIntro: s.footer.intro,
        footerColumns: s.footer.columns.map((col) => ({
          heading: col.heading,
          links: col.links.map((l) => ({ label: l.label, href: l.href })),
        })),
        footerBottom: s.footer.bottom.map((text) => ({ text })),
      },
    });
    console.log(`  synced locale: ${locale}`);
  }

  console.log("\nDone. All CMS content synced in EN and PL.");
  process.exit(0);
}

main().catch((err) => {
  console.error("sync-cms-content failed:", err);
  process.exit(1);
});

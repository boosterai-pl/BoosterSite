import { getPayload } from "payload";
import config from "../src/payload/payload.config";
import { site } from "../src/content/site";
import type { SiteContent, PracticeContent } from "../src/content/types";
import { applyTranslations } from "../src/lib/translate";
import plMessages from "../messages/pl.json";

if (process.env.DATABASE_URI) {
  process.env.PGHOST ??= new URL(process.env.DATABASE_URI).hostname;
}

async function seed() {
  const payload = await getPayload({ config });
  const localizedSites = {
    en: site,
    pl: applyTranslations(site, plMessages as Record<string, string>, "pl"),
  } satisfies Record<"en" | "pl", SiteContent>;

  console.log("Seeding Payload CMS with localized site content...\n");

  // 1. Create team members
  console.log("Creating/updating team members...");
  const teamIds: string[] = [];
  for (const member of site.team.members) {
    const existing = await payload.find({
      collection: "team-members",
      where: { name: { equals: member.name } },
    });
    if (existing.docs.length > 0) {
      const existingId = existing.docs[0].id as string;
      teamIds.push(existingId);
      for (const [locale, localizedSite] of Object.entries(localizedSites)) {
        const localizedMember = localizedSite.team.members.find((m) => m.id === member.id) ?? member;
        await payload.update({
          collection: "team-members",
          id: existingId,
          locale: locale as "en" | "pl",
          data: { sortOrder: localizedMember.id, name: localizedMember.name, role: localizedMember.role },
        });
      }
      console.log(`  Updated: ${member.name}`);
      continue;
    }
    const created = await payload.create({
      collection: "team-members",
      locale: "en",
      data: { sortOrder: member.id, name: member.name, role: member.role },
    });
    const localizedMember = localizedSites.pl.team.members.find((m) => m.id === member.id) ?? member;
    await payload.update({
      collection: "team-members",
      id: created.id as string,
      locale: "pl",
      data: { sortOrder: localizedMember.id, name: localizedMember.name, role: localizedMember.role },
    });
    teamIds.push(created.id as string);
    console.log(`  Created: ${member.name}`);
  }

  // 2. Create or update services
  console.log("\nCreating/updating services...");
  const serviceIds: string[] = [];
  for (const svc of site.services.items) {
    const existing = await payload.find({
      collection: "services",
      where: { sortOrder: { equals: svc.id } },
    });
    if (existing.docs.length > 0) {
      const existingId = existing.docs[0].id as string;
      for (const [locale, localizedSite] of Object.entries(localizedSites)) {
        const localizedService = localizedSite.services.items.find((s) => s.id === svc.id) ?? svc;
        await payload.update({
          collection: "services",
          id: existingId,
          locale: locale as "en" | "pl",
          data: {
            sortOrder: localizedService.id,
            slug: localizedService.slug,
            title: localizedService.title,
            description: localizedService.description,
            tags: localizedService.tags.map((tag) => ({ tag })),
          },
        });
      }
      serviceIds.push(existingId);
      console.log(`  Updated: ${svc.title}`);
      continue;
    }
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
    const localizedService = localizedSites.pl.services.items.find((s) => s.id === svc.id) ?? svc;
    await payload.update({
      collection: "services",
      id: created.id as string,
      locale: "pl",
      data: {
        sortOrder: localizedService.id,
        slug: localizedService.slug,
        title: localizedService.title,
        description: localizedService.description,
        tags: localizedService.tags.map((tag) => ({ tag })),
      },
    });
    serviceIds.push(created.id as string);
    console.log(`  Created: ${svc.title}`);
  }

  // 3. Create or update case studies
  console.log("\nCreating/updating case studies...");
  const caseIds: string[] = [];
  for (const cs of site.cases.items) {
    const existing = await payload.find({
      collection: "case-studies",
      where: { sortOrder: { equals: cs.id } },
    });
    if (existing.docs.length > 0) {
      const existingId = existing.docs[0].id as string;
      for (const [locale, localizedSite] of Object.entries(localizedSites)) {
        const localizedCase = localizedSite.cases.items.find((c) => c.id === cs.id) ?? cs;
        await payload.update({
          collection: "case-studies",
          id: existingId,
          locale: locale as "en" | "pl",
          data: {
            sortOrder: localizedCase.id,
            title: localizedCase.title,
            description: localizedCase.description,
            tags: localizedCase.tags.map((tag) => ({ tag })),
          },
        });
      }
      caseIds.push(existingId);
      console.log(`  Updated: ${cs.title}`);
      continue;
    }
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
    const localizedCase = localizedSites.pl.cases.items.find((c) => c.id === cs.id) ?? cs;
    await payload.update({
      collection: "case-studies",
      id: created.id as string,
      locale: "pl",
      data: {
        sortOrder: localizedCase.id,
        title: localizedCase.title,
        description: localizedCase.description,
        tags: localizedCase.tags.map((tag) => ({ tag })),
      },
    });
    caseIds.push(created.id as string);
    console.log(`  Created: ${cs.title}`);
  }

  // 4. Create or update practice pages
  console.log("\nCreating/updating practices...");
  for (const practice of site.practices) {
    const existing = await payload.find({
      collection: "practices",
      where: { slug: { equals: practice.slug } },
    });
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
      sections: p.sections.map((section) => ({ title: section.title, body: section.body })),
      cta: {
        ...(p.cta.microCopy ? { microCopy: p.cta.microCopy } : {}),
        label: p.cta.label,
        href: p.cta.href,
      },
    });

    if (existing.docs.length > 0) {
      const existingId = existing.docs[0].id as string;
      for (const [locale, localizedSite] of Object.entries(localizedSites)) {
        const localizedPractice = localizedSite.practices.find((p) => p.slug === practice.slug) ?? practice;
        await payload.update({
          collection: "practices",
          id: existingId,
          locale: locale as "en" | "pl",
          data: practiceData(localizedPractice),
        });
      }
      console.log(`  Updated: ${practice.slug}`);
      continue;
    }

    const created = await payload.create({
      collection: "practices",
      locale: "en",
      data: practiceData(practice),
    });
    const localizedPractice = localizedSites.pl.practices.find((p) => p.slug === practice.slug) ?? practice;
    await payload.update({
      collection: "practices",
      id: created.id as string,
      locale: "pl",
      data: practiceData(localizedPractice),
    });
    console.log(`  Created: ${practice.slug}`);
  }

  // 5. Update HomePage global
  console.log("\nUpdating HomePage global...");
  for (const [locale, localizedSite] of Object.entries(localizedSites)) {
    await payload.updateGlobal({
      slug: "home-page",
      locale: locale as "en" | "pl",
      data: {
        brand: localizedSite.meta.brand,
        tagline: localizedSite.meta.tagline,
        contactEmail: localizedSite.meta.contactEmail,
        establishedLine: localizedSite.meta.establishedLine,
        version: localizedSite.meta.version,
        nav: localizedSite.nav.map((n) => ({ label: n.label, href: n.href })),
        navCta: { label: localizedSite.navCta.label, href: localizedSite.navCta.href },
        heroEyebrow: localizedSite.hero.eyebrow,
        heroEstablishedLabel: localizedSite.hero.establishedLabel,
        heroHeadlineLines: localizedSite.hero.headlineLines.map((l) => ({
          text: l.text,
          ...(l.accent ? { accent: l.accent } : {}),
        })),
        heroLead: localizedSite.hero.lead,
        heroPrimaryCta: { label: localizedSite.hero.primaryCta.label, href: localizedSite.hero.primaryCta.href },
        heroSecondaryCta: { label: localizedSite.hero.secondaryCta.label, href: localizedSite.hero.secondaryCta.href },
        heroMeta: localizedSite.hero.meta.map((m) => ({
          label: m.label,
          value: m.value,
          ...(m.logos ? { logos: m.logos.map((l) => ({ name: l.name, component: l.component })) } : {}),
        })),
        marquee: localizedSite.marquee.map((m) => ({ label: m.label })),
        manifestoEyebrow: localizedSite.manifesto.eyebrow,
        manifestoHeadline: {
          text: localizedSite.manifesto.headline.text,
          ...(localizedSite.manifesto.headline.accent ? { accent: localizedSite.manifesto.headline.accent } : {}),
        },
        manifestoEntries: localizedSite.manifesto.entries.map((e) => ({
          entryId: e.id,
          title: e.title,
          body: e.body,
        })),
        servicesEyebrow: localizedSite.services.eyebrow,
        servicesHeadline: {
          text: localizedSite.services.headline.text,
          ...(localizedSite.services.headline.accent ? { accent: localizedSite.services.headline.accent } : {}),
        },
        servicesItems: serviceIds,
        casesEyebrow: localizedSite.cases.eyebrow,
        casesHeadline: {
          text: localizedSite.cases.headline.text,
          ...(localizedSite.cases.headline.accent ? { accent: localizedSite.cases.headline.accent } : {}),
        },
        casesItems: caseIds,
        speedEyebrow: localizedSite.speed.eyebrow,
        speedHeadlineLines: localizedSite.speed.headlineLines.map((l) => ({
          text: l.text,
          ...(l.accent ? { accent: l.accent } : {}),
        })),
        speedStats: localizedSite.speed.stats.map((s) => ({
          value: s.value,
          ...(s.suffix ? { suffix: s.suffix } : {}),
          label: s.label,
        })),
        processEyebrow: localizedSite.process.eyebrow,
        processHeadline: {
          text: localizedSite.process.headline.text,
          ...(localizedSite.process.headline.accent ? { accent: localizedSite.process.headline.accent } : {}),
        },
        processSteps: localizedSite.process.steps.map((s) => ({
          stepId: s.id,
          title: s.title,
          description: s.description,
        })),
        partnersEyebrow: localizedSite.partners.eyebrow,
        partnersItems: localizedSite.partners.items.map((p) => ({ name: p.name, role: p.role })),
        teamEyebrow: localizedSite.team.eyebrow,
        teamHeadline: {
          text: localizedSite.team.headline.text,
          ...(localizedSite.team.headline.accent ? { accent: localizedSite.team.headline.accent } : {}),
        },
        teamMembers: teamIds,
        insightsEyebrow: localizedSite.insights.eyebrow,
        insightsHeadline: {
          text: localizedSite.insights.headline.text,
          ...(localizedSite.insights.headline.accent ? { accent: localizedSite.insights.headline.accent } : {}),
        },
        insightsPosts: localizedSite.insights.posts.map((p) => ({
          insightId: p.id,
          category: p.category,
          date: p.date,
          title: p.title,
        })),
        ctaEyebrow: localizedSite.cta.eyebrow,
        ctaHeadlineLines: localizedSite.cta.headlineLines.map((l) => ({
          text: l.text,
          ...(l.accent ? { accent: l.accent } : {}),
        })),
        ctaBody: localizedSite.cta.body,
        ctaButton: { label: localizedSite.cta.button.label, href: localizedSite.cta.button.href },
        footerIntro: localizedSite.footer.intro,
        footerColumns: localizedSite.footer.columns.map((c) => ({
          heading: c.heading,
          links: c.links.map((l) => ({ label: l.label, href: l.href })),
        })),
        footerBottom: localizedSite.footer.bottom.map((text) => ({ text })),
      },
    });
  }
  console.log("  HomePage global updated.");

  // 6. Create admin user if none exists
  const users = await payload.find({ collection: "users", limit: 1 });
  if (users.docs.length === 0) {
    console.log("\nCreating default admin user...");
    await payload.create({
      collection: "users",
      data: {
        email: "admin@boosterai.pl",
        password: "ChangeThisPassword123!",
        name: "Admin",
        role: "admin",
      },
    });
    console.log("  Created admin@boosterai.pl (password: ChangeThisPassword123!)");
    console.log("  CHANGE THIS PASSWORD after first login!");
  }

  console.log("\nSeed complete.");
  process.exit(0);
}

seed().catch((err) => {
  console.error("Seed failed:", err);
  process.exit(1);
});

import { getPayload } from "payload";
import config from "../src/payload/payload.config";
import { site } from "../src/content/site";

if (process.env.DATABASE_URI) {
  process.env.PGHOST ??= new URL(process.env.DATABASE_URI).hostname;
}

async function seed() {
  const payload = await getPayload({ config });

  console.log("Seeding Payload CMS with data from site.ts...\n");

  // 1. Create team members
  console.log("Creating team members...");
  const teamIds: string[] = [];
  for (const member of site.team.members) {
    const existing = await payload.find({
      collection: "team-members",
      where: { name: { equals: member.name } },
    });
    if (existing.docs.length > 0) {
      teamIds.push(existing.docs[0].id as string);
      console.log(`  Skipping existing: ${member.name}`);
      continue;
    }
    const created = await payload.create({
      collection: "team-members",
      data: { sortOrder: member.id, name: member.name, role: member.role },
    });
    teamIds.push(created.id as string);
    console.log(`  Created: ${member.name}`);
  }

  // 2. Create services
  console.log("\nCreating services...");
  const serviceIds: string[] = [];
  for (const svc of site.services.items) {
    const existing = await payload.find({
      collection: "services",
      where: { title: { equals: svc.title } },
    });
    if (existing.docs.length > 0) {
      serviceIds.push(existing.docs[0].id as string);
      console.log(`  Skipping existing: ${svc.title}`);
      continue;
    }
    const created = await payload.create({
      collection: "services",
      data: {
        sortOrder: svc.id,
        title: svc.title,
        description: svc.description,
        tags: svc.tags.map((tag) => ({ tag })),
      },
    });
    serviceIds.push(created.id as string);
    console.log(`  Created: ${svc.title}`);
  }

  // 3. Create case studies
  console.log("\nCreating case studies...");
  const caseIds: string[] = [];
  for (const cs of site.cases.items) {
    const existing = await payload.find({
      collection: "case-studies",
      where: { title: { equals: cs.title } },
    });
    if (existing.docs.length > 0) {
      caseIds.push(existing.docs[0].id as string);
      console.log(`  Skipping existing: ${cs.title}`);
      continue;
    }
    const created = await payload.create({
      collection: "case-studies",
      data: {
        sortOrder: cs.id,
        title: cs.title,
        description: cs.description,
        tags: cs.tags.map((tag) => ({ tag })),
      },
    });
    caseIds.push(created.id as string);
    console.log(`  Created: ${cs.title}`);
  }

  // 4. Update HomePage global
  console.log("\nUpdating HomePage global...");
  await payload.updateGlobal({
    slug: "home-page",
    data: {
      brand: site.meta.brand,
      tagline: site.meta.tagline,
      contactEmail: site.meta.contactEmail,
      establishedLine: site.meta.establishedLine,
      version: site.meta.version,
      nav: site.nav.map((n) => ({ label: n.label, href: n.href })),
      navCta: { label: site.navCta.label, href: site.navCta.href },
      heroEyebrow: site.hero.eyebrow,
      heroEstablishedLabel: site.hero.establishedLabel,
      heroHeadlineLines: site.hero.headlineLines.map((l) => ({
        text: l.text,
        ...(l.accent ? { accent: l.accent } : {}),
      })),
      heroLead: site.hero.lead,
      heroPrimaryCta: { label: site.hero.primaryCta.label, href: site.hero.primaryCta.href },
      heroSecondaryCta: { label: site.hero.secondaryCta.label, href: site.hero.secondaryCta.href },
      heroMeta: site.hero.meta.map((m) => ({
        label: m.label,
        value: m.value,
        ...(m.logos ? { logos: m.logos.map((l) => ({ name: l.name, component: l.component })) } : {}),
      })),
      marquee: site.marquee.map((m) => ({ label: m.label })),
      manifestoEyebrow: site.manifesto.eyebrow,
      manifestoHeadline: {
        text: site.manifesto.headline.text,
        ...(site.manifesto.headline.accent ? { accent: site.manifesto.headline.accent } : {}),
      },
      manifestoEntries: site.manifesto.entries.map((e) => ({
        entryId: e.id,
        title: e.title,
        body: e.body,
      })),
      servicesEyebrow: site.services.eyebrow,
      servicesHeadline: {
        text: site.services.headline.text,
        ...(site.services.headline.accent ? { accent: site.services.headline.accent } : {}),
      },
      servicesItems: serviceIds,
      casesEyebrow: site.cases.eyebrow,
      casesHeadline: {
        text: site.cases.headline.text,
        ...(site.cases.headline.accent ? { accent: site.cases.headline.accent } : {}),
      },
      casesItems: caseIds,
      speedEyebrow: site.speed.eyebrow,
      speedHeadlineLines: site.speed.headlineLines.map((l) => ({
        text: l.text,
        ...(l.accent ? { accent: l.accent } : {}),
      })),
      speedStats: site.speed.stats.map((s) => ({
        value: s.value,
        ...(s.suffix ? { suffix: s.suffix } : {}),
        label: s.label,
      })),
      processEyebrow: site.process.eyebrow,
      processHeadline: {
        text: site.process.headline.text,
        ...(site.process.headline.accent ? { accent: site.process.headline.accent } : {}),
      },
      processSteps: site.process.steps.map((s) => ({
        stepId: s.id,
        title: s.title,
        description: s.description,
      })),
      partnersEyebrow: site.partners.eyebrow,
      partnersItems: site.partners.items.map((p) => ({ name: p.name, role: p.role })),
      teamEyebrow: site.team.eyebrow,
      teamHeadline: {
        text: site.team.headline.text,
        ...(site.team.headline.accent ? { accent: site.team.headline.accent } : {}),
      },
      teamMembers: teamIds,
      insightsEyebrow: site.insights.eyebrow,
      insightsHeadline: {
        text: site.insights.headline.text,
        ...(site.insights.headline.accent ? { accent: site.insights.headline.accent } : {}),
      },
      insightsPosts: site.insights.posts.map((p) => ({
        insightId: p.id,
        category: p.category,
        date: p.date,
        title: p.title,
      })),
      ctaEyebrow: site.cta.eyebrow,
      ctaHeadlineLines: site.cta.headlineLines.map((l) => ({
        text: l.text,
        ...(l.accent ? { accent: l.accent } : {}),
      })),
      ctaBody: site.cta.body,
      ctaButton: { label: site.cta.button.label, href: site.cta.button.href },
      footerIntro: site.footer.intro,
      footerColumns: site.footer.columns.map((c) => ({
        heading: c.heading,
        links: c.links.map((l) => ({ label: l.label, href: l.href })),
      })),
      footerBottom: site.footer.bottom.map((text) => ({ text })),
    },
  });
  console.log("  HomePage global updated.");

  // 5. Create admin user if none exists
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

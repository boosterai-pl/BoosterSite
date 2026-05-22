import type { SiteContent, PracticeContent } from "./types";
import { getPayloadClient } from "@/lib/payload";

// Fallback to static data during build if database is unavailable
import { site as staticSite } from "./site";

export async function loadSite(): Promise<SiteContent> {
  try {
    const payload = await getPayloadClient();

    const home = await payload.findGlobal({ slug: "home-page" });

    // Fetch related collections
    const servicesRelation = home.servicesItems as Array<{ id: string }> | null;
    const casesRelation = home.casesItems as Array<{ id: string }> | null;
    const teamRelation = home.teamMembers as Array<{ id: string }> | null;

    const [servicesResult, casesResult, teamResult] = await Promise.all([
      servicesRelation && servicesRelation.length > 0
        ? payload.find({
            collection: "services",
            where: { id: { in: servicesRelation.map((s) => s.id).join(",") } },
            limit: 20,
          })
        : Promise.resolve({ docs: [] as unknown[] }),
      casesRelation && casesRelation.length > 0
        ? payload.find({
            collection: "case-studies",
            where: { id: { in: casesRelation.map((c) => c.id).join(",") } },
            limit: 20,
          })
        : Promise.resolve({ docs: [] as unknown[] }),
      teamRelation && teamRelation.length > 0
        ? payload.find({
            collection: "team-members",
            where: { id: { in: teamRelation.map((t) => t.id).join(",") } },
            limit: 20,
          })
        : Promise.resolve({ docs: [] as unknown[] }),
    ]);

    return mapPayloadToSiteContent(
      home as Record<string, unknown>,
      servicesResult.docs as Record<string, unknown>[],
      casesResult.docs as Record<string, unknown>[],
      teamResult.docs as Record<string, unknown>[],
    );
  } catch {
    // Fall back to static data if Payload is unavailable (e.g., during initial build)
    return staticSite;
  }
}

function mapPayloadToSiteContent(
  h: Record<string, unknown>,
  services: Record<string, unknown>[],
  cases: Record<string, unknown>[],
  team: Record<string, unknown>[],
): SiteContent {
  type AnyArr = Record<string, unknown>[];

  const nav = h.nav as AnyArr | undefined;
  const heroHeadlineLines = h.heroHeadlineLines as AnyArr | undefined;
  const heroMeta = h.heroMeta as AnyArr | undefined;
  const marquee = h.marquee as AnyArr | undefined;
  const manifestoEntries = h.manifestoEntries as AnyArr | undefined;
  const speedHeadlineLines = h.speedHeadlineLines as AnyArr | undefined;
  const speedStats = h.speedStats as AnyArr | undefined;
  const processSteps = h.processSteps as AnyArr | undefined;
  const partnersItems = h.partnersItems as AnyArr | undefined;
  const insightsPosts = h.insightsPosts as AnyArr | undefined;
  const ctaHeadlineLines = h.ctaHeadlineLines as AnyArr | undefined;
  const footerColumns = h.footerColumns as AnyArr | undefined;
  const footerBottom = h.footerBottom as AnyArr | undefined;
  const navCta = h.navCta as Record<string, unknown> | undefined;
  const manifestoHeadline = h.manifestoHeadline as Record<string, unknown> | undefined;
  const servicesHeadline = h.servicesHeadline as Record<string, unknown> | undefined;
  const casesHeadline = h.casesHeadline as Record<string, unknown> | undefined;
  const processHeadline = h.processHeadline as Record<string, unknown> | undefined;
  const teamHeadline = h.teamHeadline as Record<string, unknown> | undefined;
  const insightsHeadline = h.insightsHeadline as Record<string, unknown> | undefined;
  const heroPrimaryCta = h.heroPrimaryCta as Record<string, unknown> | undefined;
  const heroSecondaryCta = h.heroSecondaryCta as Record<string, unknown> | undefined;
  const ctaButton = h.ctaButton as Record<string, unknown> | undefined;
  const navCtaHref = (navCta?.href as string) ?? "https://cal.com/szymon-bazan-iahn2z";

  return {
    meta: {
      brand: (h.brand as string) ?? "",
      tagline: (h.tagline as string) ?? "",
      contactEmail: (h.contactEmail as string) ?? "",
      establishedLine: (h.establishedLine as string) ?? "",
      version: (h.version as string) ?? "",
    },
    nav: (nav ?? []).map((n) => ({ label: n.label as string, href: n.href as string })),
    navCta: {
      label: (navCta?.label as string) ?? "",
      href: navCtaHref,
    },
    hero: {
      eyebrow: (h.heroEyebrow as string) ?? "",
      establishedLabel: (h.heroEstablishedLabel as string) ?? "",
      headlineLines: (heroHeadlineLines ?? []).map((l) => ({
        text: l.text as string,
        ...(l.accent ? { accent: l.accent as string } : {}),
      })),
      lead: (h.heroLead as string) ?? "",
      primaryCta: {
        label: (heroPrimaryCta?.label as string) ?? "",
        href: (heroPrimaryCta?.href as string) ?? "https://cal.com/szymon-bazan-iahn2z",
      },
      secondaryCta: {
        label: (heroSecondaryCta?.label as string) ?? "",
        href: (heroSecondaryCta?.href as string) ?? "",
      },
      meta: (heroMeta ?? []).map((m) => ({
        label: m.label as string,
        value: m.value as string,
        ...((m.logos as AnyArr | undefined)?.length
          ? {
              logos: (m.logos as AnyArr).map((l) => ({
                name: l.name as string,
                component: l.component as string,
              })),
            }
          : {}),
      })),
    },
    marquee: (marquee ?? []).map((m) => ({ label: m.label as string })),
    manifesto: {
      eyebrow: (h.manifestoEyebrow as string) ?? "",
      headline: {
        text: (manifestoHeadline?.text as string) ?? "",
        ...(manifestoHeadline?.accent ? { accent: manifestoHeadline.accent as string } : {}),
      },
      entries: (manifestoEntries ?? []).map((e) => ({
        id: e.entryId as string,
        title: e.title as string,
        body: e.body as string,
      })),
    },
    services: {
      eyebrow: (h.servicesEyebrow as string) ?? "",
      headline: {
        text: (servicesHeadline?.text as string) ?? "",
        ...(servicesHeadline?.accent ? { accent: servicesHeadline.accent as string } : {}),
      },
      items: services.map((s) => ({
        id: s.sortOrder as string,
        slug: (s.slug as string) ?? "",
        title: s.title as string,
        description: s.description as string,
        tags: ((s.tags as AnyArr) ?? []).map((t) => t.tag as string),
      })),
    },
    cases: {
      eyebrow: (h.casesEyebrow as string) ?? "",
      headline: {
        text: (casesHeadline?.text as string) ?? "",
        ...(casesHeadline?.accent ? { accent: casesHeadline.accent as string } : {}),
      },
      items: cases.map((c) => ({
        id: c.sortOrder as string,
        title: c.title as string,
        description: c.description as string,
        tags: ((c.tags as AnyArr) ?? []).map((t) => t.tag as string),
      })),
    },
    speed: {
      eyebrow: (h.speedEyebrow as string) ?? "",
      headlineLines: (speedHeadlineLines ?? []).map((l) => ({
        text: l.text as string,
        ...(l.accent ? { accent: l.accent as string } : {}),
      })),
      stats: (speedStats ?? []).map((s) => ({
        value: s.value as string,
        ...(s.suffix ? { suffix: s.suffix as string } : {}),
        label: s.label as string,
      })),
    },
    process: {
      eyebrow: (h.processEyebrow as string) ?? "",
      headline: {
        text: (processHeadline?.text as string) ?? "",
        ...(processHeadline?.accent ? { accent: processHeadline.accent as string } : {}),
      },
      steps: (processSteps ?? []).map((s) => ({
        id: s.stepId as string,
        title: s.title as string,
        description: s.description as string,
      })),
    },
    partners: {
      eyebrow: (h.partnersEyebrow as string) ?? "",
      items: (partnersItems ?? []).map((p) => ({
        name: p.name as string,
        role: p.role as string,
      })),
    },
    team: {
      eyebrow: (h.teamEyebrow as string) ?? "",
      headline: {
        text: (teamHeadline?.text as string) ?? "",
        ...(teamHeadline?.accent ? { accent: teamHeadline.accent as string } : {}),
      },
      members: team.map((t) => ({
        id: t.sortOrder as string,
        name: t.name as string,
        role: t.role as string,
      })),
    },
    insights: {
      eyebrow: (h.insightsEyebrow as string) ?? "",
      headline: {
        text: (insightsHeadline?.text as string) ?? "",
        ...(insightsHeadline?.accent ? { accent: insightsHeadline.accent as string } : {}),
      },
      posts: (insightsPosts ?? []).map((p) => ({
        id: p.insightId as string,
        category: p.category as string,
        date: p.date as string,
        title: p.title as string,
      })),
    },
    cta: {
      eyebrow: (h.ctaEyebrow as string) ?? "",
      headlineLines: (ctaHeadlineLines ?? []).map((l) => ({
        text: l.text as string,
        ...(l.accent ? { accent: l.accent as string } : {}),
      })),
      body: (h.ctaBody as string) ?? "",
      button: {
        label: (ctaButton?.label as string) ?? "",
        href: navCtaHref,
      },
    },
    footer: {
      intro: (h.footerIntro as string) ?? "",
      columns: (footerColumns ?? []).map((c) => ({
        heading: c.heading as string,
        links: ((c.links as AnyArr) ?? []).map((l) => ({
          label: l.label as string,
          href: l.href as string,
        })),
      })),
      bottom: (footerBottom ?? []).map((b) => b.text as string),
    },
    practices: staticSite.practices,
    booking: {
      calUrl: "https://cal.com/szymon-bazan-iahn2z",
      eyebrow: "Let's talk",
      headline: { text: "Free", accent: "consultation." },
      body: "30 minutes. We come back with a six-week plan, a fixed price and a first demo in two weeks.",
    },
  };
}

export function getPractice(slug: string, site: SiteContent): PracticeContent | undefined {
  return site.practices.find((p) => p.slug === slug);
}

export type { SiteContent, PracticeContent } from "./types";

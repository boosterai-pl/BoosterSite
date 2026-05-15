import { loadSite } from "@/content";
import { Nav } from "@/components/Nav";
import { Hero } from "@/components/Hero";
import { Marquee } from "@/components/Marquee";
import { Manifesto } from "@/components/Manifesto";
import { Services } from "@/components/Services";
import { Cases } from "@/components/Cases";
import { Speed } from "@/components/Speed";
import { Process } from "@/components/Process";
import { Partners } from "@/components/Partners";
import { Team } from "@/components/Team";
import { Insights } from "@/components/Insights";
import { CTA } from "@/components/CTA";
import { Footer } from "@/components/Footer";
import { SiteRuntime } from "@/components/SiteRuntime";
import plMessages from "../../../messages/pl.json";
import type { SiteContent } from "@/content/types";

export const revalidate = 60;

// Apply PL translations over the base SiteContent object
function applyTranslations(
  site: SiteContent,
  messages: Record<string, string>
): SiteContent {
  // Deep clone via JSON (SiteContent is plain serializable data)
  const clone = JSON.parse(JSON.stringify(site)) as Record<string, unknown>;

  function applyToObj(obj: unknown, prefix: string): unknown {
    if (typeof obj === "string") {
      const translated = messages[prefix];
      return translated !== undefined ? translated : obj;
    }
    if (Array.isArray(obj)) {
      return obj.map((item, i) => applyToObj(item, `${prefix}.${i}`));
    }
    if (obj !== null && typeof obj === "object") {
      const result: Record<string, unknown> = {};
      for (const [k, v] of Object.entries(obj as Record<string, unknown>)) {
        const newKey = prefix ? `${prefix}.${k}` : k;
        result[k] = applyToObj(v, newKey);
      }
      return result;
    }
    return obj;
  }

  const translated = applyToObj(clone, "") as SiteContent;
  return translated;
}

export default async function PlPage() {
  const siteEn = await loadSite();
  const site = applyTranslations(siteEn, plMessages as Record<string, string>);

  return (
    <>
      <SiteRuntime />
      <Nav brand={site.meta.brand} links={site.nav} cta={site.navCta} />
      <main>
        <Hero content={site.hero} />
        <Marquee items={site.marquee} />
        <Manifesto content={site.manifesto} />
        <Services content={site.services} />
        <Cases content={site.cases} />
        <Speed content={site.speed} />
        <Process content={site.process} />
        <Partners content={site.partners} />
        <Team content={site.team} />
        <Insights content={site.insights} />
        <CTA content={site.cta} />
      </main>
      <Footer brand={site.meta.brand} content={site.footer} />
    </>
  );
}

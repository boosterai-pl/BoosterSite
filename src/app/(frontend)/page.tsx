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

export default async function HomePage() {
  const site = await loadSite();
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

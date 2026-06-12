import { setRequestLocale } from "next-intl/server";
import { loadSite } from "@/content";
import { toSiteLocale, localeHrefPrefix } from "@/i18n/locale";
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
// import { Insights } from "@/components/Insights"; // TODO: restore when insights section is ready
import { CTA } from "@/components/CTA";
import { Footer } from "@/components/Footer";
import { SiteRuntime } from "@/components/SiteRuntime";

export const revalidate = 60;

type Props = { params: Promise<{ locale: string }> };

export default async function HomePage({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);
  const prefix = localeHrefPrefix(locale);
  const site = await loadSite(toSiteLocale(locale));

  return (
    <>
      <SiteRuntime />
      <Nav brand={site.meta.brand} links={site.nav} cta={site.navCta} logoHref={prefix || "#top"} />
      <main>
        <Hero content={site.hero} />
        <Marquee items={site.marquee} />
        <Manifesto content={site.manifesto} />
        <Services content={site.services} basePath={`${prefix}/practices`} />
        <Cases content={site.cases} />
        <Speed content={site.speed} />
        <Process content={site.process} />
        <Partners content={site.partners} />
        <Team content={site.team} />
        {/* <Insights content={site.insights} /> */}
        <CTA content={site.cta} />
      </main>
      <Footer brand={site.meta.brand} content={site.footer} />
    </>
  );
}

import { setRequestLocale } from "next-intl/server";
import { loadSite } from "@/content";
import { toSiteLocale, localeHrefPrefix } from "@/i18n/locale";
import { Nav } from "@/components/Nav";
import { HomeHero } from "@/components/HomeHero";
import { Pain } from "@/components/Pain";
import { Stages } from "@/components/Stages";
import { Cases } from "@/components/Cases";
import { Foundation } from "@/components/Foundation";
import { Process } from "@/components/Process";
import { DataControl } from "@/components/DataControl";
import { NotFor } from "@/components/NotFor";
import { Team } from "@/components/Team";
import { Services } from "@/components/Services";
import { Faq } from "@/components/Faq";
import { CTA } from "@/components/CTA";
import { InlineCta } from "@/components/InlineCta";
import { Footer } from "@/components/Footer";
import { SiteRuntime } from "@/components/SiteRuntime";

type Props = { params: Promise<{ locale: string }> };

export default async function HomePage({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);
  const prefix = localeHrefPrefix(locale);
  const site = loadSite(toSiteLocale(locale));
  const { home } = site;

  return (
    <div className="home-page">
      <SiteRuntime />
      <Nav brand={site.meta.brand} links={site.nav} cta={site.navCta} logoHref={prefix} />
      <main>
        <HomeHero content={home.hero} facts={home.facts} />
        <Pain content={home.pain} />
        <Stages content={home.stages} />
        <InlineCta content={home.contactStrips[0]} />
        <Cases content={home.cases} items={site.cases} />
        <InlineCta content={home.contactStrips[1]} />
        <Foundation content={home.foundation} />
        <Process content={home.process} />
        <InlineCta content={home.contactStrips[2]} />
        <DataControl content={home.data} />
        <InlineCta content={home.contactStrips[3]} />
        <NotFor content={home.notFor} />
        <Team content={home.team} members={site.team} />
        <Services content={home.services} items={site.services} basePath={`${prefix}/practices`} />
        <Faq content={home.faq} />
        <CTA content={home.cta} />
      </main>
      <Footer brand={site.meta.brand} content={site.footer} />
    </div>
  );
}

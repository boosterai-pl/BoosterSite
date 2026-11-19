import type { Metadata } from "next";
import { setRequestLocale } from "next-intl/server";
import { loadSite } from "@/content";
import { openMercato, openMercatoMeta } from "@/content/open-mercato";
import { toSiteLocale, localeHrefPrefix, localeAlternates } from "@/i18n/locale";
import { Nav } from "@/components/Nav";
import { Footer } from "@/components/Footer";
import { SiteRuntime } from "@/components/SiteRuntime";
import { PracticeLayout } from "@/components/PracticeLayout";

type Props = { params: Promise<{ locale: string }> };

// Landing about Open Mercato implementations. Uses the practice page layout.
export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const meta = openMercatoMeta[toSiteLocale(locale)];
  const { canonical, languages } = localeAlternates(locale, "/open-mercato");
  return {
    title: meta.title,
    description: meta.description,
    alternates: { canonical, languages },
    openGraph: { title: meta.title, description: meta.description, type: "website", url: canonical, siteName: "Booster" },
  };
}

export default async function OpenMercatoPage({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);
  const siteLocale = toSiteLocale(locale);
  const prefix = localeHrefPrefix(locale);
  const site = loadSite(siteLocale);

  return (
    <div className="practice-page">
      <SiteRuntime />
      <Nav brand={site.meta.brand} links={site.nav} cta={site.navCta} logoHref={prefix} />
      <PracticeLayout page={openMercato[siteLocale]} />
      <Footer brand={site.meta.brand} content={site.footer} />
    </div>
  );
}

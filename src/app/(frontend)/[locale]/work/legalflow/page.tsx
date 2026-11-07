import type { Metadata } from "next";
import { setRequestLocale } from "next-intl/server";
import { loadSite } from "@/content";
import { toSiteLocale, localeHrefPrefix, localeAlternates } from "@/i18n/locale";
import { Nav } from "@/components/Nav";
import { Footer } from "@/components/Footer";
import { SiteRuntime } from "@/components/SiteRuntime";
import { PracticeLayout } from "@/components/PracticeLayout";

type Props = { params: Promise<{ locale: string }> };

// LegalFlow, shown as a case study. Uses the practice page layout.
export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const page = loadSite(toSiteLocale(locale)).legalflow;
  const { canonical, languages } = localeAlternates(locale, "/work/legalflow");
  return {
    title: "LegalFlow | Booster",
    description: page.lead,
    alternates: { canonical, languages },
    openGraph: { title: "LegalFlow | Booster", description: page.lead, type: "website", url: canonical, siteName: "Booster" },
  };
}

export default async function LegalFlowPage({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);
  const prefix = localeHrefPrefix(locale);
  const site = loadSite(toSiteLocale(locale));
  const page = site.legalflow;

  return (
    <div className="practice-page">
      <SiteRuntime />
      <Nav brand={site.meta.brand} links={site.nav} cta={site.navCta} logoHref={prefix} />
      <PracticeLayout page={page} />
      <Footer brand={site.meta.brand} content={site.footer} />
    </div>
  );
}

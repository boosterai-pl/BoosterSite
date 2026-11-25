import type { Metadata } from "next";
import { setRequestLocale } from "next-intl/server";
import { loadSite } from "@/content";
import { toSiteLocale, localeHrefPrefix, localeAlternates } from "@/i18n/locale";
import { Nav } from "@/components/Nav";
import { Footer } from "@/components/Footer";
import { SiteRuntime } from "@/components/SiteRuntime";
import { PracticeLayout } from "@/components/PracticeLayout";

type Props = { params: Promise<{ locale: string }> };

// Voicebot implementations, with LegalFlow as the use case. Uses the practice page layout.
export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const page = loadSite(toSiteLocale(locale)).voicebots;
  const title = toSiteLocale(locale) === "pl" ? "Voiceboty dla firm | Booster" : "Voicebots for business | Booster";
  const { canonical, languages } = localeAlternates(locale, "/voicebots");
  return {
    title: title,
    description: page.lead,
    alternates: { canonical, languages },
    openGraph: { title: title, description: page.lead, type: "website", url: canonical, siteName: "Booster" },
  };
}

export default async function VoicebotsPage({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);
  const prefix = localeHrefPrefix(locale);
  const site = loadSite(toSiteLocale(locale));
  const page = site.voicebots;

  return (
    <div className="practice-page">
      <SiteRuntime />
      <Nav brand={site.meta.brand} links={site.nav} cta={site.navCta} logoHref={prefix} />
      <PracticeLayout page={page} />
      <Footer brand={site.meta.brand} content={site.footer} />
    </div>
  );
}

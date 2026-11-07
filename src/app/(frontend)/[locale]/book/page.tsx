import type { Metadata } from "next";
import { setRequestLocale } from "next-intl/server";
import { loadSite } from "@/content";
import { toSiteLocale, localeHrefPrefix, localeAlternates } from "@/i18n/locale";
import { Nav } from "@/components/Nav";
import { Booking } from "@/components/Booking";
import { Footer } from "@/components/Footer";
import { SiteRuntime } from "@/components/SiteRuntime";


type Props = { params: Promise<{ locale: string }> };

const COPY = {
  en: {
    title: "Book a free call | Booster",
    description:
      "A free 30-minute call about the process that hurts most in your company. Afterwards you get a staged plan with the price of the first stage.",
  },
  pl: {
    title: "Umów bezpłatną rozmowę | Booster",
    description:
      "Bezpłatna, 30-minutowa rozmowa o procesie, który najbardziej przeszkadza w Twojej firmie. Po niej dostajesz plan etapów z ceną pierwszego etapu.",
  },
} as const;

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const copy = COPY[toSiteLocale(locale)];
  const { canonical: url, languages } = localeAlternates(locale, "/book");
  return {
    title: copy.title,
    description: copy.description,
    alternates: { canonical: url, languages },
    openGraph: { title: copy.title, description: copy.description, type: "website", url, siteName: "Booster" },
  };
}

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "Service",
  name: "Free call — Booster AI",
  description:
    "A 30-minute call with the Booster team. Afterwards you get a staged plan with the price of the first stage.",
  provider: {
    "@type": "Organization",
    name: "Booster",
    url: "https://boosterai.pl",
  },
  isAccessibleForFree: true,
};

export default async function BookPage({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);
  const prefix = localeHrefPrefix(locale);
  const site = loadSite(toSiteLocale(locale));
  return (
    <div className="booking-page">
      <script
        type="application/ld+json"
        // eslint-disable-next-line react/no-danger
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <SiteRuntime />
      <Nav brand={site.meta.brand} links={site.nav} cta={site.navCta} logoHref={prefix} />
      <main>
        <Booking content={site.booking} members={site.team} />
      </main>
      <Footer brand={site.meta.brand} content={site.footer} />
    </div>
  );
}

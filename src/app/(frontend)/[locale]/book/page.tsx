import type { Metadata } from "next";
import { setRequestLocale } from "next-intl/server";
import { loadSite } from "@/content";
import { toSiteLocale, localeHrefPrefix } from "@/i18n/locale";
import { Nav } from "@/components/Nav";
import { Booking } from "@/components/Booking";
import { Footer } from "@/components/Footer";
import { SiteRuntime } from "@/components/SiteRuntime";


type Props = { params: Promise<{ locale: string }> };

const COPY = {
  en: {
    title: "Book a consultation | Booster — AI-Native Agency",
    description:
      "Book a free 30-minute call with Booster. We come back with a six-week plan, a fixed price and a first demo in two weeks.",
  },
  pl: {
    title: "Umów konsultację | Booster — Agencja AI Native",
    description:
      "Umów bezpłatną 30-minutową rozmowę z Booster. Wracamy z sześciotygodniowym planem, stałą ceną i pierwszą wersją demonstracyjną w ciągu dwóch tygodni.",
  },
} as const;

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const copy = COPY[toSiteLocale(locale)];
  const url = `https://boosterai.pl${localeHrefPrefix(locale)}/book`;
  return {
    title: copy.title,
    description: copy.description,
    alternates: { canonical: url },
    openGraph: { title: copy.title, description: copy.description, type: "website", url, siteName: "Booster" },
  };
}

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "Service",
  name: "Free consultation — Booster AI",
  description:
    "A 30-minute call with the Booster team. We come back with a six-week plan, a fixed price and a first demo in two weeks.",
  url: "https://boosterai.pl/book",
  provider: {
    "@type": "Organization",
    name: "Booster",
    url: "https://boosterai.pl",
  },
  areaServed: {
    "@type": "Place",
    name: "Worldwide",
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
        <Booking content={site.booking} members={site.team.members} />
      </main>
      <Footer brand={site.meta.brand} content={site.footer} />
    </div>
  );
}

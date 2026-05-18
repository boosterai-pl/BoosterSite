import type { Metadata } from "next";
import { loadSite } from "@/content";
import { Nav } from "@/components/Nav";
import { Booking } from "@/components/Booking";
import { Footer } from "@/components/Footer";
import { SiteRuntime } from "@/components/SiteRuntime";

export const revalidate = 3600;

export const metadata: Metadata = {
  title: "Umów konsultację | Booster — AI-Native Agency",
  description:
    "Zarezerwuj 30-minutową bezpłatną rozmowę z Booster. Wrócimy z sześciotygodniowym planem, stałą ceną i pierwszym demo w dwa tygodnie.",
  alternates: {
    canonical: "https://boosterai.pl/book",
  },
  openGraph: {
    title: "Umów konsultację | Booster — AI-Native Agency",
    description:
      "Zarezerwuj 30-minutową bezpłatną rozmowę z Booster. Wrócimy z planem, ceną i demo w dwa tygodnie.",
    type: "website",
    url: "https://boosterai.pl/book",
    siteName: "Booster",
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "Service",
  name: "Bezpłatna konsultacja — Booster AI",
  description:
    "30-minutowa rozmowa z zespołem Booster. Wrócimy z sześciotygodniowym planem, stałą ceną i pierwszym demo w dwa tygodnie.",
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

export default async function BookPage() {
  const site = await loadSite();
  return (
    <div className="booking-page">
      <script
        type="application/ld+json"
        // eslint-disable-next-line react/no-danger
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <SiteRuntime />
      <Nav brand={site.meta.brand} links={site.nav} cta={site.navCta} logoHref="/" />
      <main>
        <Booking content={site.booking} />
      </main>
      <Footer brand={site.meta.brand} content={site.footer} />
    </div>
  );
}

import type { Metadata } from "next";
import { loadSite } from "@/content";
import { Nav } from "@/components/Nav";
import { Booking } from "@/components/Booking";
import { Footer } from "@/components/Footer";
import { SiteRuntime } from "@/components/SiteRuntime";

export const revalidate = 3600;

export const metadata: Metadata = {
  title: "Book a consultation | Booster — AI-Native Agency",
  description:
    "Book a free 30-minute call with Booster. We come back with a six-week plan, a fixed price and a first demo in two weeks.",
  alternates: {
    canonical: "https://boosterai.pl/book",
  },
  openGraph: {
    title: "Book a consultation | Booster — AI-Native Agency",
    description:
      "Book a free 30-minute call with Booster. We come back with a plan, a price and a demo in two weeks.",
    type: "website",
    url: "https://boosterai.pl/book",
    siteName: "Booster",
  },
};

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

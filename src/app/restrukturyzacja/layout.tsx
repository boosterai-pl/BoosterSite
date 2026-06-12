import type { Metadata } from "next";
import type { ReactNode } from "react";
import "@/styles/globals.css";
import { CookieConsent } from "@/components/CookieConsent";
import { Analytics } from "@vercel/analytics/next";

export const metadata: Metadata = {
  title: "LegalFlow — Automatyzacja kancelarii restrukturyzacyjnej",
  description:
    "System dla kancelarii restrukturyzacyjnych: automatyczne dokumenty, kontakt z wierzycielami, nadzór nad układem. Nawet –70% czasu administracyjnego. Zobacz demo.",
  metadataBase: new URL("https://boosterai.pl"),
  alternates: {
    canonical: "/restrukturyzacja",
  },
  robots: "index,follow",
  openGraph: {
    title: "LegalFlow — Automatyzacja kancelarii restrukturyzacyjnej",
    description:
      "Więcej spraw, ten sam zespół. LegalFlow automatyzuje administrację w kancelariach restrukturyzacyjnych. Sprawdź demo.",
    url: "https://boosterai.pl/restrukturyzacja",
    type: "website",
    siteName: "LegalFlow",
  },
};

export default function RestrukturyzacjaLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="pl">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Geist:wght@300;400;500;600;700&family=Geist+Mono:wght@400;500&family=Instrument+Serif:ital@0;1&display=swap"
          rel="stylesheet"
        />
      </head>
      <body suppressHydrationWarning>
        {children}
        <CookieConsent />
        <Analytics />
      </body>
    </html>
  );
}

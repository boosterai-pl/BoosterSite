import type { Metadata } from "next";
import type { ReactNode } from "react";
import "@/styles/globals.css";

export const metadata: Metadata = {
  title: "Booster — Agencja AI-Native",
  description:
    "Booster to agencja usług AI-native. Wdrażamy systemy CRM, dostarczamy oprogramowanie B2B i wdrażamy open-source ERP — kompleksowo, w tygodniach, nie kwartałach.",
  metadataBase: new URL("https://boosterai.pl"),
  openGraph: {
    title: "Booster — Agencja AI-Native",
    description:
      "Budujemy to, co inni wyceniają na rok. Wdrożenie CRM, open-source ERP, oprogramowanie B2B i automatyzacja AI — w sześć tygodni.",
    type: "website",
    siteName: "Booster",
  },
  icons: {
    icon: "/assets/booster-sygnet.png",
  },
};

export default function PlLayout({ children }: { children: ReactNode }) {
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
        <script
          type="application/ld+json"
          // eslint-disable-next-line react/no-danger
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Organization",
              name: "Booster",
              url: "https://boosterai.pl",
              logo: "https://boosterai.pl/assets/booster-sygnet.png",
              description:
                "Agencja usług AI-native. Wdrożenie CRM, open-source ERP, oprogramowanie B2B i automatyzacja AI.",
              email: "hello@boosterai.pl",
              address: {
                "@type": "PostalAddress",
                addressLocality: "Warsaw",
                addressCountry: "PL",
              },
            }),
          }}
        />
        {children}
      </body>
    </html>
  );
}

import type { Metadata } from "next";
import type { ReactNode } from "react";
import "@/styles/globals.css";

export const metadata: Metadata = {
  title: "Booster — AI-Native Service Agency",
  description:
    "Booster is an AI-native service agency. We implement CRMs, ship custom B2B software, and deploy open-source ERP — end-to-end, in weeks, not quarters.",
  metadataBase: new URL("https://boosterai.pl"),
  openGraph: {
    title: "Booster — AI-Native Service Agency",
    description:
      "We build what others quote for a year. CRM implementation, open-source ERP, B2B software and AI automation, shipped in six weeks.",
    type: "website",
    siteName: "Booster",
  },
  icons: {
    icon: "/assets/booster-sygnet.png",
  },
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Geist:wght@300;400;500;600;700&family=Geist+Mono:wght@400;500&family=Instrument+Serif:ital@0;1&display=swap"
          rel="stylesheet"
        />
      </head>
      <body>
        {/* eslint-disable-next-line react/no-danger */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Organization",
              name: "Booster",
              url: "https://boosterai.pl",
              logo: "https://boosterai.pl/assets/booster-sygnet.png",
              description:
                "AI-native service agency. CRM implementation, open-source ERP, B2B software and AI automation.",
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

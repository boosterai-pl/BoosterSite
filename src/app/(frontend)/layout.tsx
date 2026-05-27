import type { Metadata } from "next";
import type { ReactNode } from "react";
import "@/styles/globals.css";
import { CookieConsent } from "@/components/CookieConsent";
import { Analytics } from "@vercel/analytics/next";

export const metadata: Metadata = {
  title: "Booster — AI-Native Service Agency",
  description:
    "We build autonomous AI infrastructure for complex B2B operations. By replacing manual workarounds with custom platforms, we deliver end-to-end solutions in weeks, not quarters.",
  metadataBase: new URL("https://boosterai.pl"),
  openGraph: {
    title: "Booster — AI-Native Service Agency",
    description:
      "Grow your revenue. Not your payroll. We build autonomous AI infrastructure for complex B2B operations — end-to-end solutions in weeks, not quarters.",
    type: "website",
    siteName: "Booster",
  },
  icons: {
    icon: "/assets/booster-sygnet.png",
  },
};

export default function FrontendLayout({ children }: { children: ReactNode }) {
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
        <CookieConsent />
        <Analytics />
      </body>
    </html>
  );
}

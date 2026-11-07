import type { Metadata } from "next";
import type { ReactNode } from "react";
import "@/styles/cookie.css";
import "./hyperos.css";
import { CookieConsent } from "@/components/CookieConsent";

export const metadata: Metadata = {
  title: "hyperOS: drugi mózg agencji | Realizacja Booster",
  description:
    "Dla agencji hyperCREW zbudowaliśmy hyperOS: wspólną pamięć o każdym kliencie, która rośnie z każdą kampanią i na której pracują zespół oraz agenci AI.",
  metadataBase: new URL("https://boosterai.pl"),
  alternates: { canonical: "/hyperos" },
  robots: "index,follow",
};

export default function HyperosLayout({ children }: { children: ReactNode }) {
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
      </body>
    </html>
  );
}

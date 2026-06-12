import type { Metadata } from "next";
import type { ReactNode } from "react";
import { notFound } from "next/navigation";
import { hasLocale } from "next-intl";
import { NextIntlClientProvider } from "next-intl";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { routing } from "@/i18n/routing";
import "@/styles/globals.css";
import { CookieConsent } from "@/components/CookieConsent";
import { Analytics } from "@vercel/analytics/next";

type Props = {
  children: ReactNode;
  params: Promise<{ locale: string }>;
};

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "layout" });
  const canonical =
    locale === "pl" ? "https://boosterai.pl/pl" : "https://boosterai.pl";

  return {
    title: t("title"),
    description: t("description"),
    metadataBase: new URL("https://boosterai.pl"),
    alternates: {
      canonical,
      languages: {
        en: "https://boosterai.pl",
        pl: "https://boosterai.pl/pl",
        "x-default": "https://boosterai.pl",
      },
    },
    openGraph: {
      title: t("ogTitle"),
      description: t("ogDescription"),
      type: "website",
      siteName: "Booster",
    },
    icons: {
      icon: "/assets/booster-sygnet.png",
    },
  };
}

export default async function LocaleLayout({ children, params }: Props) {
  const { locale } = await params;
  if (!hasLocale(routing.locales, locale)) {
    notFound();
  }
  setRequestLocale(locale);

  const t = await getTranslations({ locale, namespace: "layout" });

  return (
    <html lang={locale}>
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
              description: t("jsonLdDescription"),
              email: "hello@boosterai.pl",
              address: {
                "@type": "PostalAddress",
                addressLocality: "Wrocław",
                addressCountry: "PL",
              },
            }),
          }}
        />
        <NextIntlClientProvider>{children}</NextIntlClientProvider>
        <CookieConsent locale={locale === "pl" ? "pl" : "en"} />
        <Analytics />
      </body>
    </html>
  );
}

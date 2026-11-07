import type { Metadata } from "next";
import type { ReactNode } from "react";
import { notFound } from "next/navigation";
import { hasLocale } from "next-intl";
import { NextIntlClientProvider } from "next-intl";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { routing } from "@/i18n/routing";
import { localeAlternates } from "@/i18n/locale";
import "@/styles/globals.css";
import { CookieConsent } from "@/components/CookieConsent";
import { AliveSync } from "@/components/AliveSync";
import { DatafastGoals } from "@/components/DatafastGoals";
import { Analytics } from "@vercel/analytics/next";
import { CONSENT_STORAGE_KEY, GOOGLE_ADS_ID } from "@/lib/ads";

// Google tag in Consent Mode v2: everything denied until the visitor chooses; a saved choice is applied before the first hit.
const GOOGLE_TAG_INIT = `window.dataLayer=window.dataLayer||[];window.gtag=function(){dataLayer.push(arguments)};gtag("consent","default",{ad_storage:"denied",ad_user_data:"denied",ad_personalization:"denied",analytics_storage:"denied",wait_for_update:500});try{var c=JSON.parse(localStorage.getItem("${CONSENT_STORAGE_KEY}")||"null");if(c){var m=c.marketing?"granted":"denied";gtag("consent","update",{analytics_storage:c.analytics?"granted":"denied",ad_storage:m,ad_user_data:m,ad_personalization:m})}}catch(e){}gtag("js",new Date());gtag("config","${GOOGLE_ADS_ID}");`;

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

  return {
    title: t("title"),
    description: t("description"),
    metadataBase: new URL("https://boosterai.pl"),
    alternates: localeAlternates(locale),
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
        <script
          id="google-tag-init"
          // eslint-disable-next-line react/no-danger
          dangerouslySetInnerHTML={{ __html: GOOGLE_TAG_INIT }}
        />
        <script async src={`https://www.googletagmanager.com/gtag/js?id=${GOOGLE_ADS_ID}`} />
        {/* Queues Datafast goals sent before the script has loaded. */}
        <script
          id="datafast-queue"
          // eslint-disable-next-line react/no-danger
          dangerouslySetInnerHTML={{
            __html:
              "window.datafast=window.datafast||function(){(window.datafast.q=window.datafast.q||[]).push(arguments)};",
          }}
        />
        <script
          defer
          data-website-id="dfid_tg468q8wxZ0nWQgvnEQNn"
          data-domain="boosterai.pl"
          src="https://datafa.st/js/script.js"
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
        <AliveSync />
        <DatafastGoals />
        <CookieConsent locale={locale === "pl" ? "pl" : "en"} />
        <Analytics />
      </body>
    </html>
  );
}

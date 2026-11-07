import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { loadSite, getPractice, getPracticeSlugs } from "@/content";
import { toSiteLocale, localeHrefPrefix, localeAlternates } from "@/i18n/locale";
import { Nav } from "@/components/Nav";
import { Footer } from "@/components/Footer";
import { SiteRuntime } from "@/components/SiteRuntime";
import { PracticeLayout } from "@/components/PracticeLayout";


type Props = { params: Promise<{ locale: string; slug: string }> };

export const dynamicParams = false;

export function generateStaticParams() {
  return getPracticeSlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale, slug } = await params;
  const site = loadSite(toSiteLocale(locale));
  const practice = getPractice(slug, site);
  if (!practice) return {};

  const t = await getTranslations({ locale, namespace: "practices" });
  const prefix = localeHrefPrefix(locale);
  const url = `https://boosterai.pl${prefix}/practices/${slug}`;

  const title = practice.headline.text.replace(/,$/, "") +
    (practice.headline.accent ? ` ${practice.headline.accent}` : "");

  return {
    title: `${(practice.eyebrow ?? "").split(" / ")[1] ?? title} | ${t("metaBrand")}`,
    description: practice.lead,
    alternates: {
      ...localeAlternates(locale, `/practices/${slug}`),
    },
    openGraph: {
      title: `${(practice.eyebrow ?? "").split(" / ")[1] ?? title} | Booster`,
      description: practice.lead,
      type: "website",
      url,
      siteName: "Booster",
    },
  };
}

export default async function PracticePage({ params }: Props) {
  const { locale, slug } = await params;
  setRequestLocale(locale);
  const prefix = localeHrefPrefix(locale);
  const site = loadSite(toSiteLocale(locale));
  const practice = getPractice(slug, site);
  if (!practice) notFound();

  const t = await getTranslations("practices");

  const jsonLdBreadcrumb = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: t("breadcrumbHome"),
        item: `https://boosterai.pl${prefix}`,
      },
      {
        "@type": "ListItem",
        position: 2,
        name: t("breadcrumbServices"),
        item: `https://boosterai.pl${prefix}#services`,
      },
      {
        "@type": "ListItem",
        position: 3,
        name: (practice.eyebrow ?? "").split(" / ")[1] ?? practice.headline.text,
        item: `https://boosterai.pl${prefix}/practices/${slug}`,
      },
    ],
  };

  return (
    <div className="practice-page">
      <script
        type="application/ld+json"
        // eslint-disable-next-line react/no-danger
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLdBreadcrumb) }}
      />
      <SiteRuntime />
      <Nav brand={site.meta.brand} links={site.nav} cta={site.navCta} logoHref={prefix} />
      <PracticeLayout page={practice} />
      <Footer brand={site.meta.brand} content={site.footer} />
    </div>
  );
}

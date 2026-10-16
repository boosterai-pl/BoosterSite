import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { getJobRole, getJobRoles, loadSite } from "@/content";
import { toSiteLocale, localeHrefPrefix } from "@/i18n/locale";
import { Nav } from "@/components/Nav";
import { Footer } from "@/components/Footer";
import { SiteRuntime } from "@/components/SiteRuntime";

type Props = { params: Promise<{ locale: string; slug: string }> };

// Only roles with a markdown body get a detail page; everything is
// prerendered at build time and unknown slugs return 404.
export const dynamicParams = false;

export async function generateStaticParams({
  params,
}: {
  params: { locale: string };
}): Promise<Array<{ slug: string }>> {
  return getJobRoles(toSiteLocale(params.locale))
    .filter((role) => role.bodyHtml)
    .map((role) => ({ slug: role.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale, slug } = await params;
  const role = getJobRole(toSiteLocale(locale), slug);
  if (!role || !role.bodyHtml) return {};

  const t = await getTranslations({ locale, namespace: "careers" });
  const prefix = localeHrefPrefix(locale);
  const title = t("roleMetaTitle", { title: role.title });
  const url = `https://boosterai.pl${prefix}/careers/${role.slug}`;

  return {
    title,
    description: role.description,
    alternates: {
      canonical: url,
      languages: {
        en: `https://boosterai.pl/careers/${role.slug}`,
        pl: `https://boosterai.pl/pl/careers/${role.slug}`,
        "x-default": `https://boosterai.pl/careers/${role.slug}`,
      },
    },
    openGraph: {
      title,
      description: role.description,
      type: "website",
      url,
      siteName: "Booster",
    },
  };
}

export default async function CareersRolePage({ params }: Props) {
  const { locale, slug } = await params;
  setRequestLocale(locale);
  const prefix = localeHrefPrefix(locale);
  const t = await getTranslations("careers");
  const tTypes = await getTranslations("employmentTypes");
  const site = loadSite(toSiteLocale(locale));
  const role = getJobRole(toSiteLocale(locale), slug);
  if (!role || !role.bodyHtml) notFound();

  return (
    <div className="careers-page">
      <SiteRuntime />
      <Nav brand={site.meta.brand} links={site.nav} cta={site.navCta} logoHref={prefix || "/"} />
      <main>
        <section className="block light practice-hero">
          <div className="container-inner">
            <div data-reveal>
              <span className="eyebrow light">{t("eyebrow")}</span>
            </div>
            <h1 className="h1" data-reveal>
              {role.title}
            </h1>
            <p className="lead practice-lead" data-reveal>
              {role.department} · {role.location} · {tTypes(role.employmentType)}
            </p>
          </div>
        </section>

        <section className="block light practice-body blog-light">
          <div className="container-inner">
            <div
              className="blog-body"
              dangerouslySetInnerHTML={{ __html: role.bodyHtml }}
            />
            <div className="practice-inline-cta" style={{ marginTop: "2.5rem" }}>
              <a
                href={role.applyUrl || "mailto:hello@boosterai.pl"}
                className="btn btn-primary"
                {...(role.applyUrl?.startsWith("http") ? { target: "_blank", rel: "noopener noreferrer" } : {})}
              >
                {t("applyNow")} <span className="arrow">→</span>
              </a>
            </div>
          </div>
        </section>
      </main>
      <Footer brand={site.meta.brand} content={site.footer} />
    </div>
  );
}

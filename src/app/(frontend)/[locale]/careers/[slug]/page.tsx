import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { loadSite } from "@/content";
import type { JobRole } from "@/content/types";
import { toSiteLocale, localeHrefPrefix } from "@/i18n/locale";
import { Nav } from "@/components/Nav";
import { Footer } from "@/components/Footer";
import { SiteRuntime } from "@/components/SiteRuntime";
import { lexicalToHtml } from "@/lib/lexical-html";

export const revalidate = 60;

type Props = { params: Promise<{ locale: string; slug: string }> };

async function getRole(locale: string, slug: string): Promise<JobRole | undefined> {
  const site = await loadSite(toSiteLocale(locale));
  return site.jobRoles.find((r) => r.slug === slug);
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale, slug } = await params;
  const role = await getRole(locale, slug);
  if (!role || !role.body) return {};

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
  const site = await loadSite(toSiteLocale(locale));
  const role = site.jobRoles.find((r) => r.slug === slug);
  if (!role || !role.body) notFound();

  const htmlContent = lexicalToHtml(role.body);

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
              dangerouslySetInnerHTML={{ __html: htmlContent }}
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

import type { Metadata } from "next";
import Link from "next/link";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { loadSite } from "@/content";
import { toSiteLocale, localeHrefPrefix } from "@/i18n/locale";
import { Nav } from "@/components/Nav";
import { Footer } from "@/components/Footer";
import { SiteRuntime } from "@/components/SiteRuntime";

export const revalidate = 60;

type Props = { params: Promise<{ locale: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "careers" });
  const prefix = localeHrefPrefix(locale);
  const url = `https://boosterai.pl${prefix}/careers`;

  return {
    title: t("metaTitle"),
    description: t("metaDescription"),
    alternates: {
      canonical: url,
      languages: {
        en: "https://boosterai.pl/careers",
        pl: "https://boosterai.pl/pl/careers",
        "x-default": "https://boosterai.pl/careers",
      },
    },
    openGraph: {
      title: t("metaTitle"),
      description: t("ogDescription"),
      type: "website",
      url,
      siteName: "Booster",
    },
  };
}

export default async function CareersPage({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);
  const prefix = localeHrefPrefix(locale);
  const t = await getTranslations("careers");
  const tTypes = await getTranslations("employmentTypes");
  const site = await loadSite(toSiteLocale(locale));
  const roles = site.jobRoles;

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
              {t("headlineText")}{" "}
              <span className="accent-serif">{t("headlineAccent")}</span>
            </h1>
            <p className="lead practice-lead" data-reveal>
              {t("lead")} {t("leadRoles", { count: roles.length })}
            </p>
          </div>
        </section>

        <section className="block light practice-body">
          <div className="container-inner">
            {roles.length === 0 ? (
              <div className="practice-section" data-reveal>
                <h2 className="h3">{t("emptyTitle")}</h2>
                <p>{t("emptyBody")}</p>
                <div className="practice-inline-cta" style={{ marginTop: "2rem" }}>
                  <a href="mailto:hello@boosterai.pl" className="btn btn-primary">
                    {t("sayHello")} <span className="arrow">→</span>
                  </a>
                </div>
              </div>
            ) : (
              <div data-reveal-stagger>
                {roles.map((role) => (
                  <div className="practice-section" key={role.id} style={{ borderTop: "1px solid var(--line)", paddingTop: "2rem", marginTop: "2rem" }}>
                    <div style={{ display: "flex", gap: "0.75rem", flexWrap: "wrap", marginBottom: "0.5rem" }}>
                      <span className="eyebrow light">{role.department}</span>
                      <span className="eyebrow light">{role.location}</span>
                      <span className="eyebrow light">{tTypes(role.employmentType)}</span>
                    </div>
                    <h2 className="h3">
                      {role.slug && role.body ? (
                        <Link href={`${prefix}/careers/${role.slug}`}>{role.title}</Link>
                      ) : (
                        role.title
                      )}
                    </h2>
                    <p>{role.description}</p>
                    <div className="practice-inline-cta" style={{ marginTop: "1.5rem", display: "flex", gap: "1rem", flexWrap: "wrap" }}>
                      {role.slug && role.body ? (
                        <Link href={`${prefix}/careers/${role.slug}`} className="btn btn-ghost">
                          {t("viewRole")} <span className="arrow">→</span>
                        </Link>
                      ) : null}
                      <a
                        href={role.applyUrl || "mailto:hello@boosterai.pl"}
                        className="btn btn-primary"
                        {...(role.applyUrl?.startsWith("http") ? { target: "_blank", rel: "noopener noreferrer" } : {})}
                      >
                        {t("applyNow")} <span className="arrow">→</span>
                      </a>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </section>
      </main>
      <Footer brand={site.meta.brand} content={site.footer} />
    </div>
  );
}

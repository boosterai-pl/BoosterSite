import type { Metadata } from "next";
import { setRequestLocale } from "next-intl/server";
import { loadSite } from "@/content";
import { toSiteLocale, localeHrefPrefix, localeAlternates } from "@/i18n/locale";
import { Nav } from "@/components/Nav";
import { Footer } from "@/components/Footer";
import { SiteRuntime } from "@/components/SiteRuntime";

type Props = { params: Promise<{ locale: string }> };

// LegalFlow, our own product, shown as a case study. Uses the practice page layout.
export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const page = loadSite(toSiteLocale(locale)).legalflow;
  const { canonical, languages } = localeAlternates(locale, "/work/legalflow");
  return {
    title: "LegalFlow | Booster",
    description: page.lead,
    alternates: { canonical, languages },
    openGraph: { title: "LegalFlow | Booster", description: page.lead, type: "website", url: canonical, siteName: "Booster" },
  };
}

function external(href: string) {
  return href.startsWith("http") ? { target: "_blank", rel: "noopener noreferrer" } : {};
}

export default async function LegalFlowPage({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);
  const prefix = localeHrefPrefix(locale);
  const site = loadSite(toSiteLocale(locale));
  const page = site.legalflow;

  return (
    <div className="practice-page">
      <SiteRuntime />
      <Nav brand={site.meta.brand} links={site.nav} cta={site.navCta} logoHref={prefix} />
      <main>
        <section className="block light practice-hero">
          <div className="container-inner">
            <div data-reveal>
              <span className="eyebrow light">{page.eyebrow}</span>
            </div>
            <h1 className="h1" data-reveal>
              {page.headline.text}
              {page.headline.accent ? (
                <>
                  {" "}
                  <span className="accent-serif">{page.headline.accent}</span>
                </>
              ) : null}
            </h1>
            <p className="lead practice-lead" data-reveal>{page.lead}</p>
            {page.heroCta ? (
              <div className="practice-hero-cta" data-reveal>
                <a href={page.heroCta.href} className="btn btn-quiet-light" {...external(page.heroCta.href)}>
                  {page.heroCta.label}
                  <span className="arrow">↗</span>
                </a>
              </div>
            ) : null}
          </div>
        </section>

        <section className="block light practice-body">
          <div className="container-inner" data-reveal-stagger>
            {page.sections.map((section) => (
              <div className="practice-section" key={section.title}>
                <h2 className="h3">{section.title}</h2>
                <p>{section.body}</p>
              </div>
            ))}
            <div className="practice-inline-cta" data-reveal>
              {page.cta.microCopy ? <p className="section-cta-micro">{page.cta.microCopy}</p> : null}
              <a href={page.cta.href} className="btn btn-primary" {...external(page.cta.href)}>
                {page.cta.label}
                <span className="arrow">→</span>
              </a>
            </div>
          </div>
        </section>
      </main>
      <Footer brand={site.meta.brand} content={site.footer} />
    </div>
  );
}

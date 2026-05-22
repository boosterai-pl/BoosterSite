import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { loadSite, getPractice } from "@/content";
import { Nav } from "@/components/Nav";
import { Footer } from "@/components/Footer";
import { SiteRuntime } from "@/components/SiteRuntime";

export const revalidate = 3600;

type Props = { params: Promise<{ slug: string }> };

const SLUGS = [
  "crm-implementation",
  "open-source-erp",
  "b2b-software",
  "ai-automation",
] as const;

export function generateStaticParams() {
  return SLUGS.map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const site = await loadSite();
  const practice = getPractice(slug, site);
  if (!practice) return {};

  const title = practice.headline.text.replace(/,$/, "") +
    (practice.headline.accent ? ` ${practice.headline.accent}` : "");

  return {
    title: `${practice.eyebrow.split(" / ")[1] ?? title} | Booster — AI-Native Agency`,
    description: practice.lead,
    alternates: {
      canonical: `https://boosterai.pl/practices/${slug}`,
    },
    openGraph: {
      title: `${practice.eyebrow.split(" / ")[1] ?? title} | Booster`,
      description: practice.lead,
      type: "website",
      url: `https://boosterai.pl/practices/${slug}`,
      siteName: "Booster",
    },
  };
}

export default async function PracticePage({ params }: Props) {
  const { slug } = await params;
  const site = await loadSite();
  const practice = getPractice(slug, site);
  if (!practice) notFound();

  const jsonLdBreadcrumb = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: "Home",
        item: "https://boosterai.pl",
      },
      {
        "@type": "ListItem",
        position: 2,
        name: "Services",
        item: "https://boosterai.pl/#services",
      },
      {
        "@type": "ListItem",
        position: 3,
        name: practice.eyebrow.split(" / ")[1] ?? practice.headline.text,
        item: `https://boosterai.pl/practices/${slug}`,
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
      <Nav brand={site.meta.brand} links={site.nav} cta={site.navCta} logoHref="/" />
      <main>
        <section className="block light practice-hero">
          <div className="container-inner">
            <div data-reveal>
              <span className="eyebrow light">{practice.eyebrow}</span>
            </div>
            <h1 className="h1" data-reveal>
              {practice.headline.text}
              {practice.headline.accent ? (
                <>
                  {" "}
                  <span className="accent-serif">{practice.headline.accent}</span>
                </>
              ) : null}
            </h1>
            <p className="lead practice-lead" data-reveal>{practice.lead}</p>
          </div>
        </section>

        <section className="block light practice-body">
          <div className="container-inner" data-reveal-stagger>
            {practice.sections.map((section) => (
              <div className="practice-section" key={section.title}>
                <h2 className="h3">{section.title}</h2>
                <p>{section.body}</p>
              </div>
            ))}
          </div>
        </section>

        <section className="block light practice-cta-section">
          <div className="container-inner" data-reveal>
            <a
              href={practice.cta.href}
              className="btn btn-primary"
              {...(practice.cta.href.startsWith("http") ? { target: "_blank", rel: "noopener noreferrer" } : {})}
            >
              {practice.cta.label}
              <span className="arrow">→</span>
            </a>
          </div>
        </section>
      </main>
      <Footer brand={site.meta.brand} content={site.footer} />
    </div>
  );
}

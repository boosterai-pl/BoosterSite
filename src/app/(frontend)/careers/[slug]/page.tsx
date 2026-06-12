import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { loadSite } from "@/content";
import type { JobRole } from "@/content/types";
import { Nav } from "@/components/Nav";
import { Footer } from "@/components/Footer";
import { SiteRuntime } from "@/components/SiteRuntime";
import { lexicalToHtml } from "@/lib/lexical-html";
import { EMPLOYMENT_TYPE_LABELS } from "@/lib/job-roles";

export const revalidate = 60;

type Props = { params: Promise<{ slug: string }> };

async function getRole(slug: string): Promise<JobRole | undefined> {
  const site = await loadSite();
  return site.jobRoles.find((r) => r.slug === slug);
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const role = await getRole(slug);
  if (!role || !role.body) return {};

  const title = `${role.title} | Careers | Booster`;
  const url = `https://boosterai.pl/careers/${role.slug}`;

  return {
    title,
    description: role.description,
    alternates: { canonical: url },
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
  const { slug } = await params;
  const site = await loadSite();
  const role = site.jobRoles.find((r) => r.slug === slug);
  if (!role || !role.body) notFound();

  const htmlContent = lexicalToHtml(role.body);

  return (
    <div className="careers-page">
      <SiteRuntime />
      <Nav brand={site.meta.brand} links={site.nav} cta={site.navCta} logoHref="/" />
      <main>
        <section className="block light practice-hero">
          <div className="container-inner">
            <div data-reveal>
              <span className="eyebrow light">Company / Careers</span>
            </div>
            <h1 className="h1" data-reveal>
              {role.title}
            </h1>
            <p className="lead practice-lead" data-reveal>
              {role.department} · {role.location} · {EMPLOYMENT_TYPE_LABELS[role.employmentType]}
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
                Apply now <span className="arrow">→</span>
              </a>
            </div>
          </div>
        </section>
      </main>
      <Footer brand={site.meta.brand} content={site.footer} />
    </div>
  );
}

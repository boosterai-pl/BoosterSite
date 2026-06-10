import type { Metadata } from "next";
import { loadSite } from "@/content";
import type { JobRole } from "@/content/types";
import { Nav } from "@/components/Nav";
import { Footer } from "@/components/Footer";
import { SiteRuntime } from "@/components/SiteRuntime";

export const revalidate = 60;

export const metadata: Metadata = {
  title: "Careers | Booster — AI-Native Agency",
  description: "Join Booster AI. We're building the future of AI-native service delivery. Check back soon for open roles.",
  alternates: {
    canonical: "https://boosterai.pl/careers",
  },
  openGraph: {
    title: "Careers | Booster — AI-Native Agency",
    description: "Join Booster AI. We're building the future of AI-native service delivery.",
    type: "website",
    url: "https://boosterai.pl/careers",
    siteName: "Booster",
  },
};

const EMPLOYMENT_TYPE_LABELS: Record<JobRole["employmentType"], string> = {
  "full-time": "Full-time",
  "part-time": "Part-time",
  "contract": "Contract",
  "internship": "Internship",
};

export default async function CareersPage() {
  const site = await loadSite();
  const roles = site.jobRoles;

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
              Come build with{" "}
              <span className="accent-serif">us.</span>
            </h1>
            <p className="lead practice-lead" data-reveal>
              We&apos;re an AI-native service agency based in Warsaw, working with ambitious B2B companies worldwide.
              {roles.length === 0
                ? " No open roles right now — but check back soon."
                : ` We currently have ${roles.length} open position${roles.length > 1 ? "s" : ""}.`}
            </p>
          </div>
        </section>

        <section className="block light practice-body">
          <div className="container-inner">
            {roles.length === 0 ? (
              <div className="practice-section" data-reveal>
                <h2 className="h3">No open roles at the moment</h2>
                <p>
                  We&apos;re a small, focused team and we hire deliberately. When we do open a role,
                  we&apos;ll list it here. In the meantime, feel free to reach out — we&apos;re always
                  happy to meet talented people.
                </p>
                <div className="practice-inline-cta" style={{ marginTop: "2rem" }}>
                  <a href="mailto:hello@boosterai.pl" className="btn btn-primary">
                    Say hello <span className="arrow">→</span>
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
                      <span className="eyebrow light">{EMPLOYMENT_TYPE_LABELS[role.employmentType]}</span>
                    </div>
                    <h2 className="h3">{role.title}</h2>
                    <p>{role.description}</p>
                    <div className="practice-inline-cta" style={{ marginTop: "1.5rem" }}>
                      <a
                        href={role.applyUrl || "mailto:hello@boosterai.pl"}
                        className="btn btn-primary"
                        {...(role.applyUrl?.startsWith("http") ? { target: "_blank", rel: "noopener noreferrer" } : {})}
                      >
                        Apply now <span className="arrow">→</span>
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

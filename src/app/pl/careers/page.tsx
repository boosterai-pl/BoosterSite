import type { Metadata } from "next";
import Link from "next/link";
import { loadSite } from "@/content";
import { Nav } from "@/components/Nav";
import { Footer } from "@/components/Footer";
import { SiteRuntime } from "@/components/SiteRuntime";
import { EMPLOYMENT_TYPE_LABELS_PL } from "@/lib/job-roles";

export const revalidate = 60;

export const metadata: Metadata = {
  title: "Kariera | Booster — Agencja AI-Native",
  description: "Dołącz do Booster AI. Budujemy przyszłość usług AI-native.",
  alternates: {
    canonical: "https://boosterai.pl/pl/careers",
    languages: {
      en: "https://boosterai.pl/careers",
      pl: "https://boosterai.pl/pl/careers",
      "x-default": "https://boosterai.pl/careers",
    },
  },
  openGraph: {
    title: "Kariera | Booster — Agencja AI-Native",
    description: "Dołącz do Booster AI. Budujemy przyszłość usług AI-native.",
    type: "website",
    url: "https://boosterai.pl/pl/careers",
    siteName: "Booster",
  },
};

export default async function PlCareersPage() {
  const site = await loadSite("pl");
  const roles = site.jobRoles;

  return (
    <div className="careers-page">
      <SiteRuntime />
      <Nav brand={site.meta.brand} links={site.nav} cta={site.navCta} logoHref="/pl" />
      <main>
        <section className="block light practice-hero">
          <div className="container-inner">
            <div data-reveal>
              <span className="eyebrow light">Firma / Kariera</span>
            </div>
            <h1 className="h1" data-reveal>
              Buduj razem z{" "}
              <span className="accent-serif">nami.</span>
            </h1>
            <p className="lead practice-lead" data-reveal>
              Jesteśmy agencją AI-native pracującą z ambitnymi firmami B2B.
              {roles.length === 0
                ? " Obecnie nie mamy otwartych rekrutacji, ale zajrzyj wkrótce."
                : ` Obecnie mamy ${roles.length === 1 ? "1 otwartą rekrutację" : `${roles.length} otwarte rekrutacje`}.`}
            </p>
          </div>
        </section>

        <section className="block light practice-body">
          <div className="container-inner">
            {roles.length === 0 ? (
              <div className="practice-section" data-reveal>
                <h2 className="h3">Brak otwartych rekrutacji</h2>
                <p>
                  Jesteśmy małym, skupionym zespołem i rekrutujemy z rozmysłem. Gdy otworzymy
                  rekrutację, znajdziesz ją tutaj. W międzyczasie napisz do nas, zawsze chętnie
                  poznajemy zdolnych ludzi.
                </p>
                <div className="practice-inline-cta" style={{ marginTop: "2rem" }}>
                  <a href="mailto:hello@boosterai.pl" className="btn btn-primary">
                    Napisz do nas <span className="arrow">→</span>
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
                      <span className="eyebrow light">{EMPLOYMENT_TYPE_LABELS_PL[role.employmentType]}</span>
                    </div>
                    <h2 className="h3">
                      {role.slug && role.body ? (
                        <Link href={`/pl/careers/${role.slug}`}>{role.title}</Link>
                      ) : (
                        role.title
                      )}
                    </h2>
                    <p>{role.description}</p>
                    <div className="practice-inline-cta" style={{ marginTop: "1.5rem", display: "flex", gap: "1rem", flexWrap: "wrap" }}>
                      {role.slug && role.body ? (
                        <Link href={`/pl/careers/${role.slug}`} className="btn btn-ghost">
                          Zobacz ofertę <span className="arrow">→</span>
                        </Link>
                      ) : null}
                      <a
                        href={role.applyUrl || "mailto:hello@boosterai.pl"}
                        className="btn btn-primary"
                        {...(role.applyUrl?.startsWith("http") ? { target: "_blank", rel: "noopener noreferrer" } : {})}
                      >
                        Aplikuj <span className="arrow">→</span>
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

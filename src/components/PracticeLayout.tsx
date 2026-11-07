import Image from "next/image";
import type { PracticePage } from "@/content/types";

type Props = { page: PracticePage };

function external(href: string) {
  return href.startsWith("http") ? { target: "_blank", rel: "noopener noreferrer" } : {};
}

function BlockHead({ title }: { title: string }) {
  return (
    <h2 className="pp-title" data-reveal>
      {title}
    </h2>
  );
}

/** Body of a practice or work subpage: hero, then the optional blocks in a fixed order, then a CTA. */
export function PracticeLayout({ page }: Props) {
  const heroExternal = page.heroCta?.href.startsWith("http");
  return (
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
          <p className="lead practice-lead" data-reveal>
            {page.lead}
          </p>
          {page.heroCta ? (
            <div className="practice-hero-cta" data-reveal>
              {page.heroCta.microCopy ? <p className="section-cta-micro">{page.heroCta.microCopy}</p> : null}
              <a
                href={page.heroCta.href}
                className={heroExternal ? "btn btn-quiet-light" : "btn btn-primary"}
                {...external(page.heroCta.href)}
              >
                {page.heroCta.label}
                <span className="arrow">{heroExternal ? "↗" : "→"}</span>
              </a>
            </div>
          ) : null}
          {page.facts ? (
            <dl className="pp-facts" data-reveal-stagger>
              {page.facts.map((fact) => (
                <div key={fact.value}>
                  <dt>{fact.value}</dt>
                  <dd>{fact.label}</dd>
                </div>
              ))}
            </dl>
          ) : null}
        </div>
      </section>

      {page.problems ? (
        <section className="block light pp-block pp-problems">
          <div className="container-inner">
            <BlockHead title={page.problems.title} />
            <ul className="pp-problem-list" data-reveal-stagger>
              {page.problems.items.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </div>
        </section>
      ) : null}

      {page.features ? (
        <section className="block light pp-block">
          <div className="container-inner">
            <BlockHead title={page.features.title} />
            <div className="pp-cards" data-reveal-stagger>
              {page.features.items.map((item) => (
                <div key={item.title} className="pp-card">
                  <h3 className="h3">{item.title}</h3>
                  <p>{item.body}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
      ) : null}

      {page.gallery ? (
        <section className="block light pp-block">
          <div className="container-inner pp-gallery" data-reveal-stagger>
            {page.gallery.map((shot) => (
              <figure key={shot.src} className="pp-shot">
                <Image src={shot.src} alt={shot.alt} width={1200} height={600} sizes="(max-width: 900px) 100vw, 50vw" />
                <figcaption>
                  {shot.caption}
                  {shot.link ? (
                    <a href={shot.link.href} {...external(shot.link.href)}>
                      {shot.link.label} <span className="arrow">↗</span>
                    </a>
                  ) : null}
                </figcaption>
              </figure>
            ))}
          </div>
        </section>
      ) : null}

      {page.steps ? (
        <section className="block light pp-block pp-tint">
          <div className="container-inner">
            <BlockHead title={page.steps.title} />
            <ol className="pp-steps" data-reveal-stagger>
              {page.steps.items.map((step, i) => (
                <li key={step.title}>
                  <span className="pp-step-num">{String(i + 1).padStart(2, "0")}</span>
                  <h3 className="h3">{step.title}</h3>
                  <p>{step.body}</p>
                </li>
              ))}
            </ol>
          </div>
        </section>
      ) : null}

      {page.sections.length ? (
        <section className="block light pp-block practice-body">
          <div className="container-inner pp-sections" data-reveal-stagger>
            {page.sections.map((section) => (
              <div className="practice-section" key={section.title}>
                <h2 className="h3">{section.title}</h2>
                <p>{section.body}</p>
              </div>
            ))}
          </div>
        </section>
      ) : null}

      {page.proof ? (
        <section className="block light pp-block pp-tint">
          <div className="container-inner">
            <BlockHead title={page.proof.title} />
            <div className="pp-proof" data-reveal-stagger>
              {page.proof.items.map((item) => (
                <article key={item.title} className="pp-proof-card">
                  <span className="case-kind mono">{item.kind}</span>
                  <h3 className="h3">{item.title}</h3>
                  {item.metric ? (
                    <p className="pp-metric">
                      <strong>{item.metric.value}</strong> {item.metric.label}
                    </p>
                  ) : null}
                  <p>{item.body}</p>
                  {item.link ? (
                    <a href={item.link.href} className="case-link" {...external(item.link.href)}>
                      {item.link.label} <span className="arrow">→</span>
                    </a>
                  ) : null}
                </article>
              ))}
            </div>
          </div>
        </section>
      ) : null}

      {page.faq ? (
        <section className="block light pp-block">
          <div className="container-inner pp-faq-wrap">
            <BlockHead title={page.faq.title} />
            <div className="pp-faq" data-reveal-stagger>
              {page.faq.items.map((item) => (
                <details key={item.q}>
                  <summary>{item.q}</summary>
                  <p>{item.a}</p>
                </details>
              ))}
            </div>
          </div>
        </section>
      ) : null}

      <aside className="inline-cta pp-cta" data-reveal>
        <div className="container-inner inline-cta-inner">
          <p>{page.cta.microCopy}</p>
          <a href={page.cta.href} className="btn btn-primary" {...external(page.cta.href)}>
            {page.cta.label} <span className="arrow">→</span>
          </a>
        </div>
      </aside>
    </main>
  );
}

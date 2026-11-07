import { GrowthChart } from "@/components/GrowthChart";
import type { SiteContent } from "@/content/types";

type Props = { content: SiteContent["home"]["hero"]; facts: SiteContent["home"]["facts"] };

export function HomeHero({ content, facts }: Props) {
  return (
    <section className="block light home-section home-hero" id="top">
      <div className="home-glow" aria-hidden="true" />
      <div className="container-inner">
        <div className="home-hero-grid">
          <div className="home-hero-text">
            <div data-reveal>
              <span className="eyebrow light">{content.eyebrow}</span>
            </div>
            <h1 className="h1 home-hero-title" data-reveal>
              {content.headline.text}
              {content.headline.accent ? (
                <>
                  {" "}
                  <span className="accent-serif">{content.headline.accent}</span>
                </>
              ) : null}
            </h1>
            <p className="lead home-hero-lead" data-reveal>
              {content.lead}
            </p>
            <div className="hero-actions" data-reveal>
              <a href={content.primaryCta.href} className="btn btn-primary btn-alive">
                {content.primaryCta.label} <span className="arrow">→</span>
              </a>
              <a href={content.secondaryCta.href} className="btn btn-quiet">
                {content.secondaryCta.label}
              </a>
            </div>
          </div>
          <GrowthChart content={content.chart} />
        </div>

        <dl className="home-facts" data-reveal-stagger>
          {facts.map((fact) => (
            <div key={fact.value}>
              <dt>{fact.value}</dt>
              <dd>{fact.label}</dd>
            </div>
          ))}
        </dl>
      </div>
    </section>
  );
}

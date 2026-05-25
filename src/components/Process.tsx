import type { SiteContent } from "@/content/types";
import { SectionHead } from "./SectionHead";

type Props = { content: SiteContent["process"] };

export function Process({ content }: Props) {
  return (
    <section className="block light" id="process">
      <div className="container-inner">
        <SectionHead eyebrow={content.eyebrow} headline={content.headline} light />

        <div className="process-grid" data-reveal-stagger>
          {content.steps.map((step) => (
            <div key={step.id} className="process-step">
              <div className="num">— {step.id}</div>
              <h3>{step.title}</h3>
              <p>{step.description}</p>
            </div>
          ))}
        </div>

        {content.cta ? (
          <div className="section-cta" data-reveal>
            {content.cta.microCopy ? (
              <p className="section-cta-micro">{content.cta.microCopy}</p>
            ) : null}
            <a
              href={content.cta.href}
              className="btn btn-primary"
              {...(content.cta.href.startsWith("http") ? { target: "_blank", rel: "noopener noreferrer" } : {})}
            >
              {content.cta.label}
              <span className="arrow">→</span>
            </a>
          </div>
        ) : null}
      </div>
    </section>
  );
}

import type { SiteContent } from "@/content/types";
import { SectionHead } from "./SectionHead";

type Props = { content: SiteContent["cases"] };

export function Cases({ content }: Props) {
  return (
    <section className="block light" id="work">
      <div className="container-inner">
        <SectionHead eyebrow={content.eyebrow} headline={content.headline} light />

        <div className="cases">
          {content.items.map((entry) => (
            <div className="case-row" key={entry.id} data-reveal>
              <div>
                <h3>{entry.title}</h3>
                <div className="case-meta">
                  {entry.tags.map((tag) => (
                    <span key={tag}>{tag}</span>
                  ))}
                </div>
              </div>
              <div className="desc">{entry.description}</div>
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

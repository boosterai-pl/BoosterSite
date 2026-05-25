import type { SiteContent } from "@/content/types";
import { SectionHead } from "./SectionHead";
import { Placeholder } from "./Placeholder";

type Props = { content: SiteContent["manifesto"] };

export function Manifesto({ content }: Props) {
  return (
    <section className="block light round-top" id="about">
      <div className="container-inner">
        <SectionHead eyebrow={content.eyebrow} headline={content.headline} light />

        <div className="manifesto">
          <div className="manifesto-sticky">
            <Placeholder
              num="Img 01"
              description="Founders portrait or studio shot"
              variant="light"
              shape="tall"
            />
          </div>

          <div className="manifesto-list">
            {content.entries.map((entry) => (
              <div key={entry.id} className="manifesto-item" data-reveal>
                <div className="num">{entry.id}</div>
                <div>
                  <h3 className="h3">{entry.title}</h3>
                  <p>{entry.body}</p>
                </div>
              </div>
            ))}
          </div>
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

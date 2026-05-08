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
            <a href="#" className="case-row" key={entry.id} data-reveal>
              <div className="num">— {entry.id}</div>
              <div>
                <h3>{entry.title}</h3>
                <div className="case-meta">
                  {entry.tags.map((tag) => (
                    <span key={tag}>{tag}</span>
                  ))}
                </div>
              </div>
              <div className="desc">{entry.description}</div>
              <div className="arrow-cell">↗ Case study</div>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}

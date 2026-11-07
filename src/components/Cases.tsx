import type { CaseStudy, SiteContent } from "@/content/types";
import { SectionHead } from "./SectionHead";

type Props = { content: SiteContent["home"]["cases"]; items: SiteContent["cases"] };

function CaseCard({ item, labels }: { item: CaseStudy; labels: Props["content"]["labels"] }) {
  return (
    <article className={item.featured ? "case case--featured" : "case"}>
      <header>
        <span className="case-kind mono">{item.kind}</span>
        <h3 className="h3">{item.title}</h3>
        <p className="case-company">{item.company}</p>
      </header>
      <dl className="case-body">
        {item.before ? (
          <div>
            <dt>{labels.before}</dt>
            <dd>{item.before}</dd>
          </div>
        ) : null}
        <div>
          <dt>{labels.did}</dt>
          <dd>{item.did}</dd>
        </div>
        {item.after ? (
          <div className="case-after">
            <dt>{labels.after}</dt>
            <dd>{item.after}</dd>
          </div>
        ) : null}
      </dl>
      {item.quote ? (
        <blockquote className="case-quote">
          <p>{item.quote.text}</p>
          <p className="case-quote-source">
            {item.quote.source}
            {item.quote.link ? (
              <>
                {" · "}
                <a href={item.quote.link.href} target="_blank" rel="noopener noreferrer">
                  {item.quote.link.label}
                </a>
              </>
            ) : item.quote.pending ? (
              <span className="placeholder-note"> {item.quote.pending}</span>
            ) : null}
          </p>
        </blockquote>
      ) : null}
      {item.when ? <p className="case-when mono">{item.when}</p> : null}
      {item.link ? (
        <a href={item.link.href} className="case-link">
          {item.link.label} <span className="arrow">→</span>
        </a>
      ) : null}
    </article>
  );
}

export function Cases({ content, items }: Props) {
  return (
    <section className="block light home-section" id="work">
      <div className="container-inner">
        <SectionHead eyebrow={content.eyebrow} headline={content.headline} light />
        <div className="cases" data-reveal-stagger>
          {items.map((item) => (
            <CaseCard key={item.id} item={item} labels={content.labels} />
          ))}
        </div>
        <p className="home-closing" data-reveal>
          {content.industries}
        </p>
      </div>
    </section>
  );
}

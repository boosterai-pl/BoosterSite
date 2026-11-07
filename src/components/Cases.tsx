import Image from "next/image";
import type { CaseStudy, SiteContent } from "@/content/types";
import { SectionHead } from "./SectionHead";
import { CaseMock } from "./CaseMock";

type Props = { content: SiteContent["home"]["cases"]; items: SiteContent["cases"] };

function Metrics({ metrics }: { metrics: CaseStudy["metrics"] }) {
  return (
    <dl className="case-metrics">
      {metrics.map((m) => (
        <div key={m.value}>
          <dt>{m.value}</dt>
          {m.label ? <dd>{m.label}</dd> : null}
        </div>
      ))}
    </dl>
  );
}

function CaseCard({ item }: { item: CaseStudy }) {
  return (
    <article
      className={item.featured ? "case case--featured" : item.mock ? "case case--wide" : item.example ? "case case--example" : "case"}
    >
      <div className="case-text">
        <span className="case-kind mono">{item.kind}</span>
        <h3 className="h3">{item.title}</h3>
        <p className="case-company">{item.company}</p>
        {item.metrics.length ? <Metrics metrics={item.metrics} /> : null}
        <p className="case-summary">{item.summary}</p>
        {item.link ? (
          <a href={item.link.href} className="case-link">
            {item.link.label} <span className="arrow">→</span>
          </a>
        ) : null}
      </div>
      {item.mock ? <CaseMock mock={item.mock} /> : null}
      {item.products ? (
        <div className="case-products">
          {item.products.map((product) => (
            <a
              key={product.title}
              href={product.link.href}
              className="case-product"
              target={product.link.href.startsWith("http") ? "_blank" : undefined}
              rel={product.link.href.startsWith("http") ? "noopener noreferrer" : undefined}
            >
              <Image src={product.image.src} alt={product.image.alt} width={1200} height={600} sizes="(max-width: 900px) 100vw, 40vw" />
              <span className="case-product-title">{product.title}</span>
              <span className="case-product-text">{product.text}</span>
              <span className="case-product-link">
                {product.link.label} <span className="arrow">↗</span>
              </span>
            </a>
          ))}
        </div>
      ) : null}
    </article>
  );
}

export function Cases({ content, items }: Props) {
  return (
    <section className="block light home-section home-tint" id="work">
      <div className="container-inner">
        <SectionHead eyebrow={content.eyebrow} headline={content.headline} light />
        <div className="cases" data-reveal-stagger>
          {items.map((item) => (
            <CaseCard key={item.id} item={item} />
          ))}
        </div>
      </div>
    </section>
  );
}

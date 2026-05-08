import type { SiteContent } from "@/content/types";

type Props = { content: SiteContent["partners"] };

export function Partners({ content }: Props) {
  return (
    <section className="partners-section">
      <div className="partners-head" data-reveal>
        <span className="eyebrow">{content.eyebrow}</span>
      </div>
      <div className="partners" data-reveal-stagger>
        {content.items.map((partner) => (
          <div className="partner" key={partner.name}>
            <div className="role">{partner.role}</div>
            <div className="name">{partner.name}</div>
          </div>
        ))}
      </div>
    </section>
  );
}

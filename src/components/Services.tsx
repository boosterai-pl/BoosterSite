import type { SiteContent } from "@/content/types";
import { SectionHead } from "./SectionHead";

type Props = { content: SiteContent["services"] };

export function Services({ content }: Props) {
  return (
    <section className="block" id="services">
      <div className="container-inner">
        <SectionHead eyebrow={content.eyebrow} headline={content.headline} />

        <div className="services" data-reveal-stagger>
          {content.items.map((service) => (
            <a href="#contact" className="service-card" key={service.id}>
              <div className="service-num">
                <span>— {service.id}</span>
                <span className="service-arrow">↗</span>
              </div>
              <h3>{service.title}</h3>
              <p>{service.description}</p>
              <div className="service-tags">
                {service.tags.map((tag) => (
                  <span key={tag}>{tag}</span>
                ))}
              </div>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}

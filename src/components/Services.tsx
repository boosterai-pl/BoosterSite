import type { SiteContent } from "@/content/types";
import { SectionHead } from "./SectionHead";

type Props = { content: SiteContent["home"]["services"]; items: SiteContent["services"]; basePath: string };

export function Services({ content, items, basePath }: Props) {
  return (
    <section className="block home-section" id="services">
      <div className="container-inner">
        <SectionHead eyebrow={content.eyebrow} headline={content.headline} />
        <p className="lead home-lead" data-reveal>
          {content.body}
        </p>
        <div className="service-links" data-reveal-stagger>
          {items.map((service) => (
            <a href={`${basePath}/${service.slug}`} className="service-link" key={service.id}>
              <h3 className="h3">{service.title}</h3>
              <p>{service.description}</p>
              <span className="arrow">→</span>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}

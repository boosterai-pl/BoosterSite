import type { SiteContent } from "@/content/types";
import { OpenMercatoLogo } from "./BrandLogos";
import { SectionHead } from "./SectionHead";

type Props = { content: SiteContent["home"]["foundation"] };

export function Foundation({ content }: Props) {
  return (
    <section className="block light home-section home-tint" id="foundation">
      <div className="container-inner">
        <SectionHead eyebrow={content.eyebrow} headline={content.headline} light />
        <div className="foundation-intro" data-reveal>
          <OpenMercatoLogo className="foundation-logo" />
          <p className="lead">{content.body}</p>
        </div>
        <div className="home-points" data-reveal-stagger>
          {content.points.map((point) => (
            <div key={point.title} className="home-point">
              <h3 className="h3">{point.title}</h3>
              <p>{point.body}</p>
            </div>
          ))}
        </div>
        <p className="home-closing" data-reveal>
          {content.partners}
        </p>
      </div>
    </section>
  );
}

import type { SiteContent } from "@/content/types";
import { SectionHead } from "./SectionHead";

type Props = { content: SiteContent["home"]["pain"] };

export function Pain({ content }: Props) {
  return (
    <section className="block light home-section" id="pain">
      <div className="container-inner">
        <SectionHead eyebrow={content.eyebrow} headline={content.headline} light />
        <ul className="pain-list" data-reveal-stagger>
          {content.items.map((item) => (
            <li key={item}>{item}</li>
          ))}
        </ul>
        <p className="home-closing" data-reveal>
          {content.closing}
        </p>
      </div>
    </section>
  );
}

import type { SiteContent } from "@/content/types";
import { SectionHead } from "./SectionHead";

type Props = { content: SiteContent["home"]["faq"] };

export function Faq({ content }: Props) {
  return (
    <section className="block light home-section home-tint" id="faq">
      <div className="container-inner faq-wrap">
        <SectionHead eyebrow={content.eyebrow} headline={content.headline} light />
        <div className="faq" data-reveal>
          {content.items.map((item) => (
            <details key={item.q}>
              <summary>{item.q}</summary>
              <p>{item.a}</p>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}

import type { SiteContent } from "@/content/types";
import { SectionHead } from "./SectionHead";

type Props = { content: SiteContent["home"]["process"] };

export function Process({ content }: Props) {
  return (
    <section className="block light home-section home-tint" id="process">
      <div className="container-inner">
        <SectionHead eyebrow={content.eyebrow} headline={content.headline} light />
        <ol className="process-steps" data-reveal-stagger>
          {content.steps.map((step, i) => (
            <li key={step.title}>
              <span className="process-n">{i + 1}</span>
              <h3 className="h3">{step.title}</h3>
              <p>{step.body}</p>
            </li>
          ))}
        </ol>
        <div className="principles" data-reveal>
          <h3 className="mono principles-title">{content.principlesTitle}</h3>
          <ul>
            {content.principles.map((rule) => (
              <li key={rule}>{rule}</li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}

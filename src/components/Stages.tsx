import type { SiteContent } from "@/content/types";
import { SectionHead } from "./SectionHead";

type Props = { content: SiteContent["home"]["stages"] };

export function Stages({ content }: Props) {
  return (
    <section className="block home-section" id="stages">
      <div className="container-inner">
        <SectionHead eyebrow={content.eyebrow} headline={content.headline} />
        <ol className="stages" data-reveal-stagger>
          {content.items.map((stage, i) => (
            <li key={stage.title} className={stage.note ? "stage stage--here" : "stage"}>
              <span className="mono stage-n">{String(i + 1).padStart(2, "0")}</span>
              <h3 className="h3">{stage.title}</h3>
              <p>{stage.body}</p>
              {stage.note ? <span className="stage-note">{stage.note}</span> : null}
            </li>
          ))}
        </ol>
        <p className="home-closing" data-reveal>
          {content.footnote}
        </p>
      </div>
    </section>
  );
}

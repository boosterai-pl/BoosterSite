import type { CSSProperties } from "react";
import type { SiteContent } from "@/content/types";

type Props = { content: SiteContent["speed"] };

const delay1: CSSProperties = { ["--reveal-delay" as keyof CSSProperties]: "0.1s" } as CSSProperties;
const delay2: CSSProperties = { ["--reveal-delay" as keyof CSSProperties]: "0.2s" } as CSSProperties;

export function Speed({ content }: Props) {
  return (
    <section className="block" id="speed">
      <div className="container-inner">
        <div data-reveal>
          <span className="eyebrow">{content.eyebrow}</span>
        </div>
        <div className="speed">
          <h2 className="speed-headline">
            <div data-reveal>{content.headline.line1}</div>
            <div data-reveal style={delay1}>
              <span className="strike">{content.headline.strikeText}</span>{" "}
              <span className="accent">{content.headline.accentText}</span>
            </div>
            <div data-reveal style={delay2}>
              {content.headline.line3}
            </div>
          </h2>
        </div>

        <div className="speed-stats" data-reveal-stagger>
          {content.stats.map((stat) => (
            <div className="stat-cell" key={stat.label}>
              <div className="stat-num">
                {stat.value}
                {stat.suffix ? <span className="small"> {stat.suffix}</span> : null}
              </div>
              <div className="stat-label">{stat.label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

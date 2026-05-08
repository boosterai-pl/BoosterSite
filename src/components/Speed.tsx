import type { CSSProperties } from "react";
import type { SiteContent } from "@/content/types";

type Props = { content: SiteContent["speed"] };

const lineDelays: CSSProperties[] = [
  {} as CSSProperties,
  { ["--reveal-delay" as keyof CSSProperties]: "0.1s" } as CSSProperties,
  { ["--reveal-delay" as keyof CSSProperties]: "0.2s" } as CSSProperties,
];

export function Speed({ content }: Props) {
  return (
    <section className="block" id="speed">
      <div className="container-inner">
        <div data-reveal>
          <span className="eyebrow">{content.eyebrow}</span>
        </div>
        <div className="speed">
          <h2 className="speed-headline">
            <div data-reveal>{content.headlineLines[0]?.text}</div>
            <div data-reveal style={lineDelays[1]}>
              <span className="strike">12 months</span>{" "}
              <span className="accent">we ship</span>
            </div>
            <div data-reveal style={lineDelays[2]}>
              {content.headlineLines[2]?.text}
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

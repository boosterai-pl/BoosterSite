import type { CSSProperties } from "react";
import type { HeroContent } from "@/content/types";
import { WordReveal, WordRevealAccent } from "./WordReveal";

type Props = { content: HeroContent };

export function Hero({ content }: Props) {
  let runningDelay = 0;
  const lineDelays = content.headlineLines.map((line) => {
    const start = runningDelay;
    const wordCount = line.text.split(" ").length;
    runningDelay = start + wordCount * 0.06 + 0.1;
    return start;
  });

  const subDelay: CSSProperties = {
    ["--reveal-delay" as keyof CSSProperties]: "0.9s",
  } as CSSProperties;
  const metaDelay: CSSProperties = {
    ["--reveal-delay" as keyof CSSProperties]: "1.1s",
  } as CSSProperties;

  return (
    <section className="hero" id="top">
      <div className="hero-grid" />
      <div className="hero-content">
        <div className="hero-tag" data-reveal>
          <span className="eyebrow">{content.eyebrow}</span>
          <span className="mono est">{content.establishedLabel}</span>
        </div>

        <h1 className="h-display">
          {content.headlineLines.map((line, idx) => {
            const accentDelay =
              lineDelays[idx] + line.text.split(" ").length * 0.06;
            return (
              <div key={idx}>
                <WordReveal text={line.text} delayBase={lineDelays[idx]} />
                {line.accent ? (
                  <>
                    {" "}
                    <WordRevealAccent delay={accentDelay} className="accent">
                      {line.accent}
                    </WordRevealAccent>
                  </>
                ) : null}
              </div>
            );
          })}
        </h1>

        <div className="hero-sub" data-reveal style={subDelay}>
          <p className="lead">{content.lead}</p>
          <div className="hero-actions">
            <a href={content.primaryCta.href} className="btn btn-primary">
              {content.primaryCta.label}
              <span className="arrow">→</span>
            </a>
            <a href={content.secondaryCta.href} className="btn btn-ghost">
              {content.secondaryCta.label}
            </a>
          </div>
        </div>

        <div className="hero-meta" data-reveal style={metaDelay}>
          {content.meta.map((cell) => (
            <div key={cell.label} className="hero-meta-cell">
              <span>{cell.label}</span>
              <strong>{cell.value}</strong>
            </div>
          ))}
          <div className="hero-meta-cell scroll-cell">
            <span className="mono">↓ scroll</span>
          </div>
        </div>
      </div>
    </section>
  );
}

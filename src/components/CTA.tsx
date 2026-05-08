import type { CSSProperties } from "react";
import type { SiteContent } from "@/content/types";
import { WordReveal, WordRevealAccent } from "./WordReveal";

type Props = { content: SiteContent["cta"] };

export function CTA({ content }: Props) {
  let runningDelay = 0;
  const lineDelays = content.headlineLines.map((line) => {
    const start = runningDelay;
    const wordCount = line.text.split(" ").length;
    runningDelay = start + wordCount * 0.06 + 0.1;
    return start;
  });

  const heroStyle: CSSProperties = { marginTop: 32 };

  return (
    <section className="cta" id="contact">
      <div className="cta-inner">
        <div data-reveal>
          <span className="eyebrow cta-eyebrow">{content.eyebrow}</span>
        </div>
        <h2 style={heroStyle}>
          {content.headlineLines.map((line, idx) => {
            const accentDelay =
              lineDelays[idx] + line.text.split(" ").length * 0.06;
            return (
              <div key={idx} data-reveal>
                <WordReveal text={line.text} delayBase={lineDelays[idx]} />
                {line.accent ? (
                  <>
                    {" "}
                    <WordRevealAccent delay={accentDelay} className="serif">
                      {line.accent}
                    </WordRevealAccent>
                  </>
                ) : null}
              </div>
            );
          })}
        </h2>
        <div className="cta-row" data-reveal>
          <p>{content.body}</p>
          <a href={content.button.href} className="btn btn-primary">
            {content.button.label}
            <span className="arrow">→</span>
          </a>
        </div>
      </div>
    </section>
  );
}

import type { CSSProperties } from "react";
import type { HeadlineLine } from "@/content/types";

type Props = {
  eyebrow: string;
  headline: HeadlineLine;
  light?: boolean;
};

const headlineDelay: CSSProperties = {
  ["--reveal-delay" as keyof CSSProperties]: "0.1s",
} as CSSProperties;

export function SectionHead({ eyebrow, headline, light = false }: Props) {
  return (
    <div className="section-head">
      <div data-reveal>
        <span className={`eyebrow${light ? " light" : ""}`}>{eyebrow}</span>
      </div>
      <h2 className="h1" data-reveal style={headlineDelay}>
        {headline.text}
        {headline.accent ? (
          <>
            {" "}
            <span className="accent-serif">{headline.accent}</span>
          </>
        ) : null}
      </h2>
    </div>
  );
}

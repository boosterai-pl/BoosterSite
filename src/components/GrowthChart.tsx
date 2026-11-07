"use client";

import { useEffect, useState } from "react";
import type { SiteContent } from "@/content/types";

type Props = { content: SiteContent["home"]["hero"]["chart"] };

// Illustrative curves (no real data): company scale grows faster at each step, the team stays almost flat.
const GROWTH_PATH =
  "M40,276 C120,272 160,250 200,240 C260,226 290,196 340,170 C400,140 430,92 480,76 C520,64 550,56 580,52";
const TEAM_PATH = "M40,282 C200,279 400,273 580,266";
const POINTS = [
  { x: 40, y: 276 },
  { x: 200, y: 240 },
  { x: 340, y: 170 },
  { x: 480, y: 76 },
];
const AUTOPLAY_MS = 3200;

export function GrowthChart({ content }: Props) {
  const [active, setActive] = useState(0);
  const [paused, setPaused] = useState(false);

  useEffect(() => {
    if (paused) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const id = window.setInterval(() => setActive((i) => (i + 1) % POINTS.length), AUTOPLAY_MS);
    return () => window.clearInterval(id);
  }, [paused]);

  const pick = (i: number) => {
    setPaused(true);
    setActive(i);
  };
  const step = content.steps[active];
  const point = POINTS[active];

  return (
    <figure className="growth-chart" data-reveal onMouseLeave={() => setPaused(false)}>
      <div className="growth-chart-head">
        <span className="growth-chart-title">{content.title}</span>
        <span className="growth-chart-legend">
          <span className="growth-key growth-key--scale">{content.legend.scale}</span>
          <span className="growth-key growth-key--team">{content.legend.team}</span>
        </span>
      </div>

      <svg viewBox="0 0 620 300" className="growth-chart-svg" role="img" aria-label={content.title}>
        <defs>
          <linearGradient id="growth-fill" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#0047ff" stopOpacity="0.16" />
            <stop offset="100%" stopColor="#0047ff" stopOpacity="0" />
          </linearGradient>
        </defs>
        {[100, 160, 220].map((y) => (
          <line key={y} x1="40" x2="600" y1={y} y2={y} className="growth-grid" />
        ))}
        <line x1="40" x2="600" y1="290" y2="290" className="growth-axis" />
        <path d={`${GROWTH_PATH} L580,290 L40,290 Z`} fill="url(#growth-fill)" className="growth-area" />
        <path d={TEAM_PATH} className="growth-line growth-line--team" />
        <path d={GROWTH_PATH} className="growth-line growth-line--scale" pathLength={1} />
        <line x1={point.x} x2={point.x} y1={point.y} y2="290" className="growth-marker" />
        {POINTS.map((p, i) => (
          <g key={i} className={i === active ? "growth-point is-active" : "growth-point"} onMouseEnter={() => pick(i)} onClick={() => pick(i)}>
            <circle cx={p.x} cy={p.y} r="16" className="growth-point-hit" />
            <circle cx={p.x} cy={p.y} r={i === active ? 8 : 5} className="growth-point-dot" />
          </g>
        ))}
      </svg>

      <div className="growth-steps" role="tablist">
        {content.steps.map((s, i) => (
          <button
            key={s.title}
            type="button"
            role="tab"
            aria-selected={i === active}
            className={i === active ? "growth-step is-active" : "growth-step"}
            onClick={() => pick(i)}
            onMouseEnter={() => pick(i)}
          >
            <span className="growth-step-num">{String(i + 1).padStart(2, "0")}</span>
            {s.title}
          </button>
        ))}
      </div>
      <div className="growth-detail" aria-live="polite">
        <p>{step.text}</p>
        {step.note ? <span className="growth-note">{step.note}</span> : null}
      </div>
      <figcaption className="growth-caption">{content.caption}</figcaption>
    </figure>
  );
}

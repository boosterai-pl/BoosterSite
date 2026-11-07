"use client";

import { useEffect, useRef } from "react";
import type { SiteContent } from "@/content/types";

type Props = { content: SiteContent["home"]["hero"]["chart"] };

// Illustrative curves (no real data): company scale grows faster at each step, the team stays almost flat.
// The growth line gently "breathes": it moves between a few shapes with the same structure (SMIL),
// and light runs along it. Nothing reacts to clicks and the steps never change.
const KNOTS = [
  { x: 40, y: 276 },
  { x: 200, y: 240 },
  { x: 340, y: 170 },
  { x: 480, y: 76 },
  { x: 580, y: 52 },
];
const CONTROLS = [
  [{ x: 120, y: 272 }, { x: 160, y: 250 }],
  [{ x: 260, y: 226 }, { x: 290, y: 196 }],
  [{ x: 400, y: 140 }, { x: 430, y: 92 }],
  [{ x: 520, y: 64 }, { x: 550, y: 56 }],
];
// Vertical offsets per knot for each frame; controls move with their knot, so the curve stays smooth.
const FRAMES = [
  [0, 0, 0, 0, 0],
  [0, -7, 9, -8, -5],
  [0, 0, 0, 0, 0],
  [0, 6, -7, 7, 4],
  [0, 0, 0, 0, 0],
];
const POINTS = KNOTS.slice(0, 4);
const TEAM_PATH = "M40,282 C200,279 400,273 580,266";
const DUR = "9s";
const SPLINES = FRAMES.slice(1).map(() => "0.45 0 0.55 1").join(";");

function growthPath(dy: readonly number[]) {
  const segs = CONTROLS.map(([c1, c2], i) => {
    const to = KNOTS[i + 1];
    return `C${c1.x},${c1.y + dy[i]} ${c2.x},${c2.y + dy[i + 1]} ${to.x},${to.y + dy[i + 1]}`;
  });
  return `M${KNOTS[0].x},${KNOTS[0].y + dy[0]} ${segs.join(" ")}`;
}
const GROWTH_PATH = growthPath(FRAMES[0]);
const GROWTH_VALUES = FRAMES.map(growthPath).join(";");
const AREA_VALUES = FRAMES.map((f) => `${growthPath(f)} L580,290 L40,290 Z`).join(";");

function Breathe({ attr, values }: { attr: string; values: string }) {
  return (
    <animate attributeName={attr} values={values} dur={DUR} repeatCount="indefinite" calcMode="spline" keySplines={SPLINES} />
  );
}

/** Chart that only "breathes": nothing to click and the content never changes on its own. */
export function GrowthChart({ content }: Props) {
  const svg = useRef<SVGSVGElement>(null);
  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) svg.current?.pauseAnimations();
  }, []);
  return (
    <figure className="growth-chart" data-reveal>
      <div className="growth-chart-head">
        <span className="growth-chart-title">{content.title}</span>
        <span className="growth-chart-legend">
          <span className="growth-key growth-key--scale">{content.legend.scale}</span>
          <span className="growth-key growth-key--team">{content.legend.team}</span>
        </span>
      </div>

      <svg ref={svg} viewBox="0 0 620 300" className="growth-chart-svg" role="img" aria-label={content.title}>
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
        <path d={`${GROWTH_PATH} L580,290 L40,290 Z`} fill="url(#growth-fill)" className="growth-area">
          <Breathe attr="d" values={AREA_VALUES} />
        </path>
        <path d={TEAM_PATH} className="growth-line growth-line--team" />
        <path d={GROWTH_PATH} className="growth-line growth-line--scale" pathLength={1}>
          <Breathe attr="d" values={GROWTH_VALUES} />
        </path>
        <path d={GROWTH_PATH} className="growth-flow" pathLength={1}>
          <Breathe attr="d" values={GROWTH_VALUES} />
        </path>
        {POINTS.map((p, i) => {
          const ys = FRAMES.map((f) => p.y + f[i]).join(";");
          return (
            <g key={i}>
              <line x1={p.x} x2={p.x} y1={p.y} y2="290" className="growth-marker">
                <Breathe attr="y1" values={ys} />
              </line>
              <circle cx={p.x} cy={p.y} r="6" className="growth-point-dot">
                <Breathe attr="cy" values={ys} />
              </circle>
            </g>
          );
        })}
      </svg>

      <ol className="growth-steps">
        {content.steps.map((s, i) => (
          <li key={s.title} className="growth-step">
            <span className="growth-step-num">{String(i + 1).padStart(2, "0")}</span>
            {s.title}
            {s.note ? <span className="growth-note">{s.note}</span> : null}
          </li>
        ))}
      </ol>
    </figure>
  );
}

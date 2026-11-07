"use client";

import { useEffect, useRef } from "react";
import type { SiteContent } from "@/content/types";

type Props = { content: SiteContent["home"]["hero"]["chart"] };

// Illustrative curves (no real data): company scale grows faster at each step, the team stays almost flat.
// The growth line gently "breathes": it moves between a few shapes with the same structure (SMIL),
// and light runs along it. Nothing reacts to clicks and the steps never change.
// The four step points sit at the centres of the four label columns under the chart (viewBox x = 620 * (i + 0.5) / 4),
// so every label is directly below its point. First and last knots only extend the line to the edges.
const KNOTS = [
  { x: 24, y: 280 },
  { x: 77.5, y: 272 },
  { x: 232.5, y: 238 },
  { x: 387.5, y: 160 },
  { x: 542.5, y: 72 },
  { x: 604, y: 54 },
];
// Vertical offsets per knot for each frame; the curve is rebuilt from the knots, so it stays smooth.
const FRAMES = [
  [0, 0, 0, 0, 0, 0],
  [0, -3, -7, 9, -8, -5],
  [0, 0, 0, 0, 0, 0],
  [0, 3, 6, -7, 7, 4],
  [0, 0, 0, 0, 0, 0],
];
const POINTS = KNOTS.slice(1, 5);
const TEAM_PATH = "M24,284 C200,281 400,275 604,268";
const DUR = "9s";
const SPLINES = FRAMES.slice(1).map(() => "0.45 0 0.55 1").join(";");

// Catmull-Rom through the knots, written as cubic Béziers (same command structure in every frame, needed by SMIL).
function growthPath(dy: readonly number[]) {
  const k = KNOTS.map((p, i) => ({ x: p.x, y: p.y + dy[i] }));
  const at = (i: number) => k[Math.max(0, Math.min(k.length - 1, i))];
  const r = (n: number) => Math.round(n * 10) / 10;
  const segs = k.slice(1).map((to, j) => {
    const [p0, p1, p3] = [at(j - 1), at(j), at(j + 2)];
    const c1 = { x: p1.x + (to.x - p0.x) / 6, y: p1.y + (to.y - p0.y) / 6 };
    const c2 = { x: to.x - (p3.x - p1.x) / 6, y: to.y - (p3.y - p1.y) / 6 };
    return `C${r(c1.x)},${r(c1.y)} ${r(c2.x)},${r(c2.y)} ${to.x},${r(to.y)}`;
  });
  return `M${k[0].x},${k[0].y} ${segs.join(" ")}`;
}
const GROWTH_PATH = growthPath(FRAMES[0]);
const GROWTH_VALUES = FRAMES.map(growthPath).join(";");
const AREA_VALUES = FRAMES.map((f) => `${growthPath(f)} L604,290 L24,290 Z`).join(";");

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
          <line key={y} x1="24" x2="604" y1={y} y2={y} className="growth-grid" />
        ))}
        <line x1="24" x2="604" y1="290" y2="290" className="growth-axis" />
        <path d={`${GROWTH_PATH} L604,290 L24,290 Z`} fill="url(#growth-fill)" className="growth-area">
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
          const ys = FRAMES.map((f) => p.y + f[i + 1]).join(";");
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

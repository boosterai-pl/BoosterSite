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

/** Static chart: nothing to click and nothing that changes on its own. */
export function GrowthChart({ content }: Props) {
  return (
    <figure className="growth-chart" data-reveal>
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
        {POINTS.map((p, i) => (
          <g key={i}>
            <line x1={p.x} x2={p.x} y1={p.y} y2="290" className="growth-marker" />
            <circle cx={p.x} cy={p.y} r="6" className="growth-point-dot" />
          </g>
        ))}
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

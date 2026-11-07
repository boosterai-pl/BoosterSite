import type { CaseMock as CaseMockContent } from "@/content/types";

type Props = { mock: CaseMockContent };

// Pins on the illustrative map: x/y in %, n = how many venues in the cluster (1 = a single venue).
const PINS = [
  { x: 22, y: 30, n: 4 },
  { x: 38, y: 22, n: 2 },
  { x: 55, y: 34, n: 7 },
  { x: 70, y: 26, n: 3 },
  { x: 30, y: 58, n: 12 },
  { x: 48, y: 62, n: 5 },
  { x: 66, y: 55, n: 9 },
  { x: 80, y: 68, n: 2 },
  { x: 14, y: 72, n: 1 },
  { x: 58, y: 80, n: 1 },
  { x: 86, y: 40, n: 1 },
];

/** Illustrative screens of the system (options list and venue map), drawn in HTML. No real data. */
export function CaseMock({ mock }: Props) {
  return (
    <figure className="case-mock" aria-label={mock.caption}>
      <div className="mock-window">
        <div className="mock-bar">
          <span />
          <span />
          <span />
        </div>
        <div className="mock-head">
          <strong>{mock.table.title}</strong>
          <span className="mock-btn">{mock.table.action}</span>
        </div>
        <div className="mock-search">{mock.table.search}</div>
        <table className="mock-table">
          <thead>
            <tr>
              {mock.table.columns.map((c) => (
                <th key={c}>{c}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {mock.table.rows.map((r) => (
              <tr key={r.venue + r.date}>
                <td>
                  <span className="mock-venue">{r.venue}</span>
                  <span className="mock-note">{r.note}</span>
                </td>
                <td>{r.date}</td>
                <td>
                  <span className={`mock-pill mock-pill--${r.tone}`}>{r.status}</span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="mock-window mock-map">
        <div className="mock-head">
          <strong>{mock.map.title}</strong>
          <span className="mock-count">{mock.map.count}</span>
        </div>
        <div className="mock-map-area" aria-hidden="true">
          {PINS.map((p, i) =>
            p.n > 1 ? (
              <span key={i} className="mock-cluster" style={{ left: `${p.x}%`, top: `${p.y}%` }}>
                {p.n}
              </span>
            ) : (
              <span key={i} className="mock-dot" style={{ left: `${p.x}%`, top: `${p.y}%` }} />
            ),
          )}
        </div>
        <div className="mock-legend">
          <span className="mock-legend-cluster">{mock.map.legend[0]}</span>
          <span className="mock-legend-dot">{mock.map.legend[1]}</span>
        </div>
      </div>
      <figcaption>{mock.caption}</figcaption>
    </figure>
  );
}

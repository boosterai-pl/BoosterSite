import type { MarqueeItem } from "@/content/types";

type Props = { items: readonly MarqueeItem[] };

export function Marquee({ items }: Props) {
  const doubled = [...items, ...items];
  return (
    <div className="marquee">
      <div className="marquee-track">
        {doubled.map((item, i) => (
          <span
            key={`${item.label}-${i}`}
            className={`marquee-item${i % 3 === 1 ? " muted" : ""}`}
          >
            <span className="dot" />
            {item.label}
          </span>
        ))}
      </div>
    </div>
  );
}

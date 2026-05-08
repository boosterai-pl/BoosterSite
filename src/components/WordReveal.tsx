import type { CSSProperties, ReactNode } from "react";

type Props = {
  text: string;
  delayBase?: number;
  step?: number;
  className?: string;
  children?: ReactNode;
};

export function WordReveal({ text, delayBase = 0, step = 0.06, className }: Props) {
  const words = text.split(" ");
  return (
    <span className={className}>
      {words.map((word, i) => {
        const style: CSSProperties = {
          ["--word-delay" as keyof CSSProperties]: `${delayBase + i * step}s`,
          marginRight: "0.22em",
        } as CSSProperties;
        return (
          <span key={`${word}-${i}`} className="word-reveal" style={style}>
            <span>{word}</span>
          </span>
        );
      })}
    </span>
  );
}

type AccentProps = {
  delay: number;
  children: ReactNode;
  className?: string;
};

export function WordRevealAccent({ delay, children, className }: AccentProps) {
  const style: CSSProperties = {
    ["--word-delay" as keyof CSSProperties]: `${delay}s`,
  } as CSSProperties;
  return (
    <span className="word-reveal" style={style}>
      <span className={className}>{children}</span>
    </span>
  );
}

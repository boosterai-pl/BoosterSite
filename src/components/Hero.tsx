import type { CSSProperties } from "react";
import type { HeroContent, HeroMetaLogo } from "@/content/types";
import { WordReveal, WordRevealAccent } from "./WordReveal";
import {
  MondayLogo,
  ClickUpLogo,
  PipedriveLogo,
  ClaudeLogo,
  N8nLogo,
  OpenCodeLogo,
  CodexLogo,
  RailwayLogo,
  CloudflareLogo,
  PlanetScaleLogo,
} from "./BrandLogos";

const LOGO_MAP: Record<string, React.ComponentType<{ className?: string }>> = {
  MondayLogo,
  ClickUpLogo,
  PipedriveLogo,
  ClaudeLogo,
  N8nLogo,
  OpenCodeLogo,
  CodexLogo,
  RailwayLogo,
  CloudflareLogo,
  PlanetScaleLogo,
};

function MetaLogos({ logos }: { logos: readonly HeroMetaLogo[] }) {
  return (
    <div className="hero-meta-logos">
      {logos.map((logo) => {
        const Logo = LOGO_MAP[logo.component];
        if (!Logo) return null;
        return <Logo key={logo.name} className="hero-meta-logo" />;
      })}
    </div>
  );
}

type Props = { content: HeroContent };

export function Hero({ content }: Props) {
  const lines = content.headline.text.split("\n");
  let runningDelay = 0;
  const lineDelays = lines.map((line) => {
    const start = runningDelay;
    runningDelay = start + line.split(" ").length * 0.06 + 0.1;
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
          {content.establishedLabel ? (
            <span className="mono est">{content.establishedLabel}</span>
          ) : null}
        </div>

        <h1 className="h-display">
          {lines.map((line, idx) => {
            const isLast = idx === lines.length - 1;
            const accentDelay = lineDelays[idx] + line.split(" ").length * 0.06;
            return (
              <div key={idx}>
                <WordReveal text={line} delayBase={lineDelays[idx]} />
                {isLast && content.headline.accent ? (
                  <>
                    {" "}
                    <WordRevealAccent delay={accentDelay} className="accent">
                      {content.headline.accent}
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
            <a
              href={content.primaryCta.href}
              className="btn btn-primary"
              {...(content.primaryCta.href.startsWith("http") ? { target: "_blank", rel: "noopener noreferrer" } : {})}
            >
              {content.primaryCta.label}
              <span className="arrow">→</span>
            </a>
            <a href={content.secondaryCta.href} className="btn btn-ghost">
              {content.secondaryCta.label}
            </a>
          </div>
        </div>

      </div>

      <div className="hero-bottom" data-reveal style={metaDelay}>
        <div className="hero-meta">
          <div className="hero-meta-marquee">
            <div className="hero-meta-track">
              {[...content.meta, ...content.meta].map((cell, i) => {
                const names = cell.value.split(" · ");
                const logoMap = Object.fromEntries(
                  (cell.logos ?? []).map((l) => [l.name, LOGO_MAP[l.component]])
                );
                return (
                  <span key={i} className="hero-meta-tag">
                    <span className="hero-meta-tag-label">{cell.label}</span>
                    <span className="hero-meta-tag-sep">:</span>
                    {names.map((name, j) => {
                      const Logo = logoMap[name];
                      return (
                        <span key={j} className="hero-meta-tag-item">
                          {Logo && <Logo className="hero-meta-tag-icon" />}
                          <span className="hero-meta-tag-value">{name}</span>
                          {j < names.length - 1 && (
                            <span className="hero-meta-tag-dot">·</span>
                          )}
                        </span>
                      );
                    })}
                  </span>
                );
              })}
            </div>
          </div>
        </div>
        <div className="hero-scroll-row">
          <span className="mono">↓ scroll</span>
        </div>
      </div>
    </section>
  );
}

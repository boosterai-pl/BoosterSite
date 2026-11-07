import type { SiteContent } from "@/content/types";
import { BielikLogo } from "./BrandLogos";
import { SectionHead } from "./SectionHead";

type Props = { content: SiteContent["home"]["data"] };

// Official wordmarks, shown in one calm monochrome style (see .model-logos in globals.css).
const MODEL_LOGOS = [
  { name: "Claude (Anthropic)", src: "/assets/logos/models/claude.svg" },
  { name: "ChatGPT (OpenAI)", src: "/assets/logos/models/openai.svg" },
  { name: "Gemini (Google)", src: "/assets/logos/models/gemini.svg" },
] as const;

export function DataControl({ content }: Props) {
  return (
    <section className="block light home-section" id="data">
      <div className="container-inner">
        <SectionHead eyebrow={content.eyebrow} headline={content.headline} light />
        <p className="lead home-lead" data-reveal>
          {content.lead}
        </p>
        <div className="model-logos" data-reveal>
          <span className="mono model-logos-label">{content.modelsLabel}</span>
          <ul>
            {MODEL_LOGOS.map((logo) => (
              <li key={logo.name}>
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={logo.src} alt={logo.name} />
              </li>
            ))}
            <li className="model-logos-bielik">
              <BielikLogo className="model-logos-mark" />
              <span>Bielik</span>
            </li>
          </ul>
        </div>
        <div className="home-points home-points--four" data-reveal-stagger>
          {content.points.map((point) => (
            <div key={point.title} className="home-point">
              <h3 className="h3">{point.title}</h3>
              <p>{point.body}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

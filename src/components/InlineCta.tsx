import type { SiteContent } from "@/content/types";

type Props = { content: SiteContent["home"]["contactStrips"][number] };

/** A short "talk to us" strip between home sections, so a call to action is never far away. */
export function InlineCta({ content }: Props) {
  return (
    <aside className="inline-cta" data-reveal>
      <div className="container-inner inline-cta-inner">
        <p>{content.text}</p>
        <a href={content.href} className="btn btn-primary">
          {content.label} <span className="arrow">→</span>
        </a>
      </div>
    </aside>
  );
}

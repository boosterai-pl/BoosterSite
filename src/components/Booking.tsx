import type { BookingContent } from "@/content/types";

type Props = { content: BookingContent };

export function Booking({ content }: Props) {
  return (
    <section className="block light booking">
      <div className="container-inner">
        <span className="eyebrow">{content.eyebrow}</span>
        <h1 className="h1">
          {content.headline.text}
          {content.headline.accent ? (
            <>
              {" "}
              <span className="accent-serif">{content.headline.accent}</span>
            </>
          ) : null}
        </h1>
        <p className="lead booking-lead">{content.body}</p>
        <a
          href={content.calUrl}
          className="btn btn-primary booking-cta"
          target="_blank"
          rel="noopener noreferrer"
        >
          Book a free consultation <span className="arrow">→</span>
        </a>
      </div>
    </section>
  );
}

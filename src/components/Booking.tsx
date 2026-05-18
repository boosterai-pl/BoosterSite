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
        <div className="booking-frame-wrap">
          <iframe
            src={`${content.calUrl}?embed=true`}
            width="100%"
            height="700"
            frameBorder={0}
            title="Zarezerwuj konsultację"
            loading="lazy"
          />
        </div>
      </div>
    </section>
  );
}

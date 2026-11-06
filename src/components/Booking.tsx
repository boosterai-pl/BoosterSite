import Image from "next/image";
import type { BookingContent, SiteContent } from "@/content/types";
import { ContactForm } from "@/components/ContactForm";
import { ClickUpLogo, MondayLogo, PipedriveLogo, TilioLogo } from "@/components/BrandLogos";

type Props = { content: BookingContent; members: SiteContent["team"]["members"] };

const TEAM_ON_CALL = 3;

export function Booking({ content, members }: Props) {
  return (
    <>
      <section className="block light booking">
        <div className="container-inner booking-hero">
          <div className="booking-intro">
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
            <ul className="booking-points">
              {content.points.map((point) => (
                <li key={point}>{point}</li>
              ))}
            </ul>
            <div className="booking-trust">
              <span className="mono">{content.trustLabel}</span>
              <div className="booking-trust-logos">
                <MondayLogo className="booking-logo" />
                <ClickUpLogo className="booking-logo" />
                <PipedriveLogo className="booking-logo" />
                <TilioLogo className="booking-logo" />
              </div>
            </div>
          </div>

          <div className="booking-card" id="formularz">
            <h2 className="h3">{content.form.formTitle}</h2>
            <p className="booking-required">{content.form.requiredNote}</p>
            <ContactForm copy={content.form} source="boosterai.pl — formularz /book" />
          </div>
        </div>
      </section>

      <section className="block light booking-section">
        <div className="container-inner">
          <h2 className="h2">{content.starters.title}</h2>
          <ul className="booking-starters">
            {content.starters.items.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </div>
      </section>

      <section className="block light booking-section">
        <div className="container-inner">
          <h2 className="h2">{content.steps.title}</h2>
          <div className="booking-steps-wrap">
          <Image
            src="/assets/booking-work.jpg"
            alt={content.steps.imageAlt}
            width={1000}
            height={1000}
            sizes="(max-width: 900px) 100vw, 380px"
            className="booking-steps-photo"
          />
          <ol className="booking-steps">
            {content.steps.items.map((step, i) => (
              <li key={step.title}>
                <span className="mono booking-step-n">{String(i + 1).padStart(2, "0")}</span>
                <h3 className="h3">{step.title}</h3>
                <p>{step.body}</p>
              </li>
            ))}
          </ol>
          </div>
        </div>
      </section>

      <section className="block light booking-section">
        <div className="container-inner">
          <h2 className="h2">{content.outcomes.title}</h2>
          <div className="booking-outcomes">
            {content.outcomes.items.map((item) => (
              <div key={item.title} className="booking-outcome">
                <h3 className="h3">{item.title}</h3>
                <p>{item.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="block light booking-section">
        <div className="container-inner">
          <h2 className="h2">{content.team.title}</h2>
          <p className="lead booking-lead">{content.team.body}</p>
          <div className="booking-team">
            {members.slice(0, TEAM_ON_CALL).map((member) => (
              <div key={member.id} className="booking-person">
                {member.photo ? (
                  <Image src={member.id === members[0]?.id ? "/assets/szymon-bazan-portrait.jpg" : member.photo} alt={member.name} width={240} height={240} className="booking-person-photo" />
                ) : null}
                <h3 className="h3">{member.name}</h3>
                <p className="role">{member.role}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="block light booking-section">
        <div className="container-inner">
          <h2 className="h2">{content.faq.title}</h2>
          <div className="booking-faq">
            {content.faq.items.map((item) => (
              <details key={item.q}>
                <summary>{item.q}</summary>
                <p>{item.a}</p>
              </details>
            ))}
          </div>
        </div>
      </section>

      <section className="block light booking-section booking-final">
        <div className="container-inner">
          <h2 className="h2">{content.finalCta.title}</h2>
          <a href="#formularz" className="btn btn-primary">
            {content.finalCta.label} <span className="arrow">→</span>
          </a>
        </div>
      </section>
    </>
  );
}

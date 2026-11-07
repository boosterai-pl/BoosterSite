import Image from "next/image";
import type { BookingContent, BookingSection, SiteContent } from "@/content/types";
import { ContactForm } from "@/components/ContactForm";

type Props = { content: BookingContent; members: SiteContent["team"] };

const TEAM_ON_CALL = 3;

function SectionTitle({ section }: { section: BookingSection }) {
  return (
    <div className="booking-head">
      <span className="eyebrow light">{section.eyebrow}</span>
      <h2 className="h2">
        {section.headline.text}
        {section.headline.accent ? (
          <>
            {" "}
            <span className="serif booking-accent">{section.headline.accent}</span>
          </>
        ) : null}
      </h2>
    </div>
  );
}

export function Booking({ content, members }: Props) {
  return (
    <>
      <section className="block light booking">
        <div className="home-glow" aria-hidden="true" />
        <div className="container-inner booking-hero">
          <div className="booking-intro">
            <span className="eyebrow light">{content.eyebrow}</span>
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
            <aside className="booking-proof">
              <span className="mono booking-proof-kind">{content.proof.kind}</span>
              <dl className="booking-proof-list">
                {content.proof.items.map((item) => (
                  <div key={item.value}>
                    <dt>{item.value}</dt>
                    <dd>{item.label}</dd>
                  </div>
                ))}
              </dl>
              <a href={content.proof.link.href}>
                {content.proof.link.label} <span className="arrow">→</span>
              </a>
            </aside>
            <div className="booking-trust">
              <span className="mono">{content.trustLabel}</span>
              <ul className="booking-tools">
                {content.trustTools.map((tool) => (
                  <li key={tool}>{tool}</li>
                ))}
              </ul>
            </div>
          </div>

          <div className="booking-card" id="formularz">
            <h2 className="h3">{content.form.formTitle}</h2>
            <ContactForm copy={content.form} source="boosterai.pl — formularz /book" />
            <p className="booking-calendar">
              {content.calendar.text}{" "}
              <a href={content.calendar.href} target="_blank" rel="noopener noreferrer">
                {content.calendar.label} <span className="arrow">↗</span>
              </a>
            </p>
          </div>
        </div>
      </section>

      <section className="block light booking-section">
        <div className="container-inner">
          <SectionTitle section={content.starters} />
          <ul className="booking-starters">
            {content.starters.items.map((item, i) => (
              <li key={item}>
                <a href="#formularz" className="booking-starter">
                  <span className="mono booking-starter-n">{String(i + 1).padStart(2, "0")}</span>
                  <span className="booking-starter-text">{item}</span>
                  <span className="booking-starter-hint">
                    {content.starters.hint} <span className="arrow">→</span>
                  </span>
                </a>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="block light booking-section booking-tint">
        <div className="container-inner">
          <SectionTitle section={content.steps} />
          <div className="booking-steps-wrap">
            <figure className="booking-plan">
              <p className="booking-plan-title">{content.steps.plan.title}</p>
              <ol>
                {content.steps.plan.items.map((item, i) => (
                  <li key={item.title}>
                    <span className="booking-plan-n">{String(i + 1).padStart(2, "0")}</span>
                    <span className="booking-plan-name">{item.title}</span>
                    <span className="booking-plan-note">{item.note}</span>
                  </li>
                ))}
              </ol>
              <figcaption>{content.steps.plan.caption}</figcaption>
            </figure>
            <ol className="booking-steps">
              {content.steps.items.map((step, i) => (
                <li key={step.title}>
                  <span className="booking-step-n">{String(i + 1).padStart(2, "0")}</span>
                  <div>
                    <h3 className="h3">{step.title}</h3>
                    <p>{step.body}</p>
                  </div>
                </li>
              ))}
            </ol>
          </div>
        </div>
      </section>

      <section className="block light booking-section">
        <div className="container-inner">
          <SectionTitle section={content.outcomes} />
          <div className="booking-outcomes">
            {content.outcomes.items.map((item, i) => (
              <div key={item.title} className="booking-outcome">
                <span className="mono booking-outcome-n">{String(i + 1).padStart(2, "0")}</span>
                <h3 className="h3">{item.title}</h3>
                <p>{item.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="block light booking-section">
        <div className="container-inner">
          <SectionTitle section={content.team} />
          <p className="lead booking-lead">{content.team.body}</p>
          <div className="booking-team">
            {members.slice(0, TEAM_ON_CALL).map((member) => (
              <div key={member.id} className="booking-person">
                {member.photo ? (
                  <div className="booking-person-frame">
                    <Image
                      src={member.id === members[0]?.id ? "/assets/szymon-bazan-portrait.jpg" : member.photo}
                      alt={member.name}
                      width={480}
                      height={600}
                      sizes="(max-width: 900px) 100vw, 33vw"
                      className="booking-person-photo"
                    />
                  </div>
                ) : null}
                <h3 className="h3">{member.name}</h3>
                <p className="role">{member.role}</p>
                {member.linkedin ? (
                  <a href={member.linkedin} className="person-linkedin" target="_blank" rel="noopener noreferrer">
                    LinkedIn <span className="arrow">↗</span>
                  </a>
                ) : null}
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="block light booking-section">
        <div className="container-inner faq-wrap">
          <SectionTitle section={content.faq} />
          <div className="faq">
            {content.faq.items.map((item) => (
              <details key={item.q}>
                <summary>{item.q}</summary>
                <p>{item.a}</p>
              </details>
            ))}
          </div>
        </div>
      </section>

      <section className="cta booking-final">
        <div className="cta-inner">
          <span className="eyebrow cta-eyebrow">{content.finalCta.eyebrow}</span>
          <h2>
            {content.finalCta.headline.text}
            {content.finalCta.headline.accent ? (
              <>
                {" "}
                <span className="serif">{content.finalCta.headline.accent}</span>
              </>
            ) : null}
          </h2>
          <div className="cta-row">
            <p>{content.finalCta.body}</p>
            <a href="#formularz" className="btn btn-primary">
              {content.finalCta.label} <span className="arrow">→</span>
            </a>
          </div>
        </div>
      </section>
    </>
  );
}

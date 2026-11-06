"use client";

import { useState } from "react";
import type { ContactFormCopy } from "@/content/types";

type Props = { copy: ContactFormCopy; source: string; defaultDialCode?: string };
type Field = "email" | "phone" | "topic" | "consent";
type Errors = Partial<Record<Field, string>>;

const DIAL_CODES = ["+48", "+49", "+44", "+380", "+420", "+1"] as const;
const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

declare global {
  interface Window {
    datafast?: (goal: string, params?: Record<string, string>) => void;
  }
}

// Every CTA on the site links to /book?z=<button-id>; the id says which button the lead came from.
function readSourceId(): string {
  const z = new URLSearchParams(window.location.search).get("z") ?? "";
  return z.replace(/[^a-z0-9-]/gi, "").slice(0, 60);
}

function track(event: string, reason?: string) {
  const detail = { event, source: readSourceId() || "direct", ...(reason ? { reason } : {}) };
  try {
    window.dataLayer = window.dataLayer ?? [];
    window.dataLayer.push(detail);
    window.datafast?.(event, { source: detail.source });
  } catch {
    /* tracking must never break the form */
  }
}

export function ContactForm({ copy, source, defaultDialCode = "+48" }: Props) {
  const [status, setStatus] = useState<"idle" | "sending" | "sent">("idle");
  const [errors, setErrors] = useState<Errors>({});
  const [failed, setFailed] = useState(false);
  const [started, setStarted] = useState(false);
  const [echo, setEcho] = useState("");
  const [mailto, setMailto] = useState("");

  function validate(email: string, phone: string, topic: string, consent: boolean): Errors {
    const next: Errors = {};
    if (!email) next.email = copy.requiredField;
    else if (!EMAIL_RE.test(email)) next.email = copy.invalidEmail;
    if (!phone) next.phone = copy.requiredField;
    else if (phone.replace(/\D/g, "").length < 9) next.phone = copy.invalidPhone;
    if (!topic) next.topic = copy.requiredField;
    if (!consent) next.consent = copy.missingConsent;
    return next;
  }

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (status === "sending") return;
    const form = new FormData(e.currentTarget);
    const email = String(form.get("email") ?? "").trim();
    const phoneNumber = String(form.get("phone") ?? "").trim();
    const topic = String(form.get("topic") ?? "").trim();
    const phone = `${String(form.get("dial"))} ${phoneNumber}`;

    const found = validate(email, phoneNumber, topic, form.get("consent") === "on");
    setErrors(found);
    if (Object.keys(found).length > 0) {
      const first = (["email", "phone", "topic", "consent"] as const).find((k) => found[k]);
      (e.currentTarget.elements.namedItem(first ?? "email") as HTMLElement | null)?.focus();
      return;
    }

    setFailed(false);
    setStatus("sending");
    const sourceId = readSourceId();
    try {
      const res = await fetch("/api/lead", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email,
          phone,
          topic,
          website: String(form.get("website") ?? ""),
          source: `${source}${sourceId ? ` (${sourceId})` : ""}`,
        }),
      });
      if (!res.ok) throw new Error(String(res.status));
      setEcho(email);
      setStatus("sent");
      track("form_success");
    } catch (err) {
      setStatus("idle");
      setFailed(true);
      setMailto(
        `mailto:${copy.mailtoAddress}?subject=${encodeURIComponent(copy.mailtoSubject)}&body=${encodeURIComponent(
          `${copy.emailLabel}: ${email}\n${copy.phoneLabel}: ${phone}\n\n${topic}`,
        )}`,
      );
      track("form_error", err instanceof Error ? err.message : "unknown");
    }
  }

  function onInput(e: React.FormEvent<HTMLFormElement>) {
    const name = (e.target as HTMLInputElement).name as Field;
    if (errors[name]) setErrors((prev) => ({ ...prev, [name]: undefined }));
    if (!started) {
      setStarted(true);
      track("form_start");
    }
  }

  if (status === "sent") {
    return (
      <div className="contact-form contact-form--sent" role="status" tabIndex={-1}>
        <h2 className="h3">{copy.successTitle}</h2>
        <p className="lead">{copy.successBody}</p>
        <p className="contact-form__note">
          {copy.successEcho} <strong>{echo}</strong>
        </p>
      </div>
    );
  }

  return (
    <form className="contact-form" onSubmit={onSubmit} onInput={onInput} noValidate>
      {failed ? (
        <div className="contact-form__error" role="alert">
          <strong>{copy.errorTitle}</strong> {copy.errorBody}{" "}
          <a href={mailto}>{copy.mailtoLabel}</a>
        </div>
      ) : null}

      <label className="contact-form__field" data-invalid={errors.email ? "true" : undefined}>
        <span>{copy.emailLabel}</span>
        <input type="email" name="email" autoComplete="email" aria-invalid={Boolean(errors.email)} />
        {errors.email ? <em className="contact-form__field-error">{errors.email}</em> : null}
      </label>

      <label className="contact-form__field" data-invalid={errors.phone ? "true" : undefined}>
        <span>{copy.phoneLabel}</span>
        <div className="contact-form__phone">
          <select name="dial" defaultValue={defaultDialCode} aria-label="Country code">
            {DIAL_CODES.map((code) => (
              <option key={code} value={code}>
                {code}
              </option>
            ))}
          </select>
          <input type="tel" name="phone" autoComplete="tel-national" aria-invalid={Boolean(errors.phone)} />
        </div>
        {errors.phone ? <em className="contact-form__field-error">{errors.phone}</em> : null}
      </label>

      <label className="contact-form__field" data-invalid={errors.topic ? "true" : undefined}>
        <span>{copy.topicLabel}</span>
        <textarea name="topic" rows={4} placeholder={copy.topicPlaceholder} aria-invalid={Boolean(errors.topic)} />
        {errors.topic ? <em className="contact-form__field-error">{errors.topic}</em> : null}
      </label>

      <label className="contact-form__consent" data-invalid={errors.consent ? "true" : undefined}>
        <input type="checkbox" name="consent" />
        <span>
          {copy.consent}{" "}
          <a href={copy.privacyHref} target="_blank" rel="noopener noreferrer">
            {copy.privacyLabel}
          </a>
          {errors.consent ? <em className="contact-form__field-error">{errors.consent}</em> : null}
        </span>
      </label>

      <label className="contact-form__trap" aria-hidden="true">
        {copy.honeypotLabel}
        <input type="text" name="website" tabIndex={-1} autoComplete="off" />
      </label>

      <button type="submit" className="btn btn-primary" disabled={status === "sending"}>
        {status === "sending" ? copy.submitting : copy.submit} <span className="arrow">→</span>
      </button>
      <p className="contact-form__note">{copy.footnote}</p>
    </form>
  );
}

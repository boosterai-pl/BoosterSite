"use client";

import { useState } from "react";
import type { ContactFormCopy } from "@/content/types";

type Props = { copy: ContactFormCopy; source: string; defaultDialCode?: string };

const DIAL_CODES = ["+48", "+49", "+44", "+380", "+420", "+1"] as const;
const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const PHONE_RE = /^[0-9\s\-()]{6,}$/;

export function ContactForm({ copy, source, defaultDialCode = "+48" }: Props) {
  const [status, setStatus] = useState<"idle" | "sending" | "sent">("idle");
  const [error, setError] = useState<string | null>(null);

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = new FormData(e.currentTarget);
    const email = String(form.get("email") ?? "").trim();
    const phone = String(form.get("phone") ?? "").trim();
    const topic = String(form.get("topic") ?? "").trim();

    if (!EMAIL_RE.test(email)) return setError(copy.invalidEmail);
    if (!PHONE_RE.test(phone)) return setError(copy.invalidPhone);
    if (!topic) return setError(copy.missingTopic);
    if (form.get("consent") !== "on") return setError(copy.missingConsent);

    setError(null);
    setStatus("sending");
    try {
      const res = await fetch("/api/lead", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email,
          phone: `${String(form.get("dial"))} ${phone}`,
          topic,
          website: String(form.get("website") ?? ""),
          source,
        }),
      });
      if (!res.ok) throw new Error(String(res.status));
      setStatus("sent");
    } catch {
      setStatus("idle");
      setError(copy.error);
    }
  }

  if (status === "sent") {
    return (
      <div className="contact-form contact-form--sent" role="status">
        <h2 className="h3">{copy.successTitle}</h2>
        <p className="lead">{copy.successBody}</p>
      </div>
    );
  }

  return (
    <form className="contact-form" onSubmit={onSubmit} noValidate>
      {error ? (
        <div className="contact-form__error" role="alert">
          {error}
        </div>
      ) : null}

      <label className="contact-form__field">
        <span>{copy.emailLabel}</span>
        <input type="email" name="email" autoComplete="email" required />
      </label>

      <label className="contact-form__field">
        <span>{copy.phoneLabel}</span>
        <div className="contact-form__phone">
          <select name="dial" defaultValue={defaultDialCode} aria-label="Country code">
            {DIAL_CODES.map((code) => (
              <option key={code} value={code}>
                {code}
              </option>
            ))}
          </select>
          <input type="tel" name="phone" autoComplete="tel-national" required />
        </div>
      </label>

      <label className="contact-form__field">
        <span>{copy.topicLabel}</span>
        <textarea name="topic" rows={4} placeholder={copy.topicPlaceholder} required />
      </label>

      <label className="contact-form__consent">
        <input type="checkbox" name="consent" />
        <span>
          {copy.consent}{" "}
          <a href={copy.privacyHref} target="_blank" rel="noopener noreferrer">
            {copy.privacyLabel}
          </a>
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

import { NextResponse } from "next/server";

// Forwards contact-form submissions to the ClickUp lead proxy (a Cloudflare worker
// that creates the ClickUp task). Going through this route keeps the call
// server-to-server, so it also works on preview deployments (the worker's CORS only allows boosterai.pl).
const WORKER_URL = "https://clickup-lead-proxy.szymon-sidor.workers.dev";

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const PHONE_RE = /^[+\s0-9\-()]{7,}$/;

type Body = {
  email?: unknown;
  phone?: unknown;
  topic?: unknown;
  source?: unknown;
  website?: unknown;
};

const text = (value: unknown, max: number): string =>
  typeof value === "string" ? value.trim().slice(0, max) : "";

export async function POST(request: Request) {
  let body: Body;
  try {
    body = (await request.json()) as Body;
  } catch {
    return NextResponse.json({ error: "Invalid JSON" }, { status: 400 });
  }

  // Honeypot: bots fill the hidden field. Pretend success and drop the lead.
  if (text(body.website, 200)) return NextResponse.json({ ok: true });

  const email = text(body.email, 200);
  const phone = text(body.phone, 40);
  const topic = text(body.topic, 2000);
  if (!EMAIL_RE.test(email) || !PHONE_RE.test(phone) || !topic) {
    return NextResponse.json({ error: "Invalid input" }, { status: 400 });
  }

  try {
    const res = await fetch(WORKER_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        email,
        phone,
        message: topic,
        source: text(body.source, 100) || "boosterai.pl — formularz kontaktowy",
      }),
    });
    if (!res.ok) return NextResponse.json({ error: "Upstream error" }, { status: 502 });
  } catch {
    return NextResponse.json({ error: "Upstream unreachable" }, { status: 502 });
  }
  return NextResponse.json({ ok: true });
}

import { NextResponse } from "next/server";

// Creates a ClickUp task for every contact-form submission (/book and the
// LegalFlow landing). Needs two env vars in Vercel (Production and Preview):
//   CLICKUP_API_TOKEN — personal API token (pk_…), ClickUp → Settings → Apps
//   CLICKUP_LIST_ID   — id of the list that collects leads (number after /li/ in the list URL)
// The build does not need them; without them the route answers 503.
const CLICKUP_API = "https://api.clickup.com/api/v2";

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const PHONE_RE = /^[+\s0-9\-()]{7,}$/;

type Body = {
  email?: unknown;
  phone?: unknown;
  name?: unknown;
  topic?: unknown;
  source?: unknown;
  website?: unknown;
  marketing?: unknown;
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
  const name = text(body.name, 120);
  const topic = text(body.topic, 2000);
  const source = text(body.source, 120) || "boosterai.pl — formularz kontaktowy";
  if (!EMAIL_RE.test(email) || !PHONE_RE.test(phone) || !topic) {
    return NextResponse.json({ error: "Invalid input" }, { status: 400 });
  }

  const token = process.env.CLICKUP_API_TOKEN;
  const listId = process.env.CLICKUP_LIST_ID;
  if (!token || !listId) {
    console.error("lead: CLICKUP_API_TOKEN or CLICKUP_LIST_ID is not set");
    return NextResponse.json({ error: "Lead inbox not configured" }, { status: 503 });
  }

  const description = [
    `**E-mail:** ${email}`,
    `**Telefon:** ${phone}`,
    name ? `**Imię:** ${name}` : null,
    `**Źródło:** ${source}`,
    `**Zgoda marketingowa:** ${body.marketing === true ? "tak" : "nie"}`,
    "",
    "**Czego dotyczy sprawa:**",
    topic,
  ]
    .filter((line) => line !== null)
    .join("\n");

  try {
    const res = await fetch(`${CLICKUP_API}/list/${encodeURIComponent(listId)}/task`, {
      method: "POST",
      headers: { Authorization: token, "Content-Type": "application/json" },
      body: JSON.stringify({
        name: `Lead: ${name || email} — ${source}`.slice(0, 250),
        markdown_description: description,
      }),
    });
    if (!res.ok) {
      console.error("lead: ClickUp responded", res.status, (await res.text()).slice(0, 300));
      return NextResponse.json({ error: "Upstream error" }, { status: 502 });
    }
  } catch (err) {
    console.error("lead: ClickUp unreachable", err);
    return NextResponse.json({ error: "Upstream unreachable" }, { status: 502 });
  }
  return NextResponse.json({ ok: true });
}

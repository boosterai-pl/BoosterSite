import { createHmac, timingSafeEqual } from "node:crypto";
import { NextResponse } from "next/server";

// Cal.com webhook → DataFast goal `booking_created`, so a booking counts as a conversion of the visitor
// (and their ad) who clicked the calendar link. The link carries metadata[datafast_visitor_id]
// (see tagCalendarLink in src/lib/hooks.ts); cal.com sends it back here in payload.metadata.
// Needs two env vars in Vercel (Production):
//   CAL_WEBHOOK_SECRET — the "Secret" typed in cal.com → Settings → Developer → Webhooks
//   DATAFAST_API_KEY   — DataFast website API key (df_…), DataFast → Website settings → API
// The build does not need them; without them the route answers 503.
const DATAFAST_GOALS_API = "https://datafa.st/api/v1/goals";

type CalPayload = {
  triggerEvent?: string;
  payload?: {
    uid?: string;
    type?: string;
    eventTitle?: string;
    startTime?: string;
    metadata?: Record<string, unknown>;
    tracking?: Record<string, unknown>;
  };
};

const str = (value: unknown, max = 200): string => (typeof value === "string" ? value.trim().slice(0, max) : "");

function validSignature(raw: string, header: string | null, secret: string): boolean {
  if (!header) return false;
  const expected = createHmac("sha256", secret).update(raw).digest("hex");
  const a = Buffer.from(expected);
  const b = Buffer.from(header.trim());
  return a.length === b.length && timingSafeEqual(a, b);
}

export async function POST(request: Request) {
  const secret = process.env.CAL_WEBHOOK_SECRET;
  const apiKey = process.env.DATAFAST_API_KEY;
  if (!secret || !apiKey) {
    console.error("cal-webhook: CAL_WEBHOOK_SECRET or DATAFAST_API_KEY is not set");
    return NextResponse.json({ error: "Not configured" }, { status: 503 });
  }

  const raw = await request.text();
  if (!validSignature(raw, request.headers.get("x-cal-signature-256"), secret)) {
    return NextResponse.json({ error: "Invalid signature" }, { status: 401 });
  }

  let body: CalPayload;
  try {
    body = JSON.parse(raw) as CalPayload;
  } catch {
    return NextResponse.json({ error: "Invalid JSON" }, { status: 400 });
  }

  // Cal.com's "Ping test" and other triggers: acknowledge and do nothing.
  if (body.triggerEvent !== "BOOKING_CREATED") return NextResponse.json({ ok: true, skipped: body.triggerEvent ?? "ping" });

  const booking = body.payload ?? {};
  const meta = booking.metadata ?? {};
  const tracking = booking.tracking ?? {};
  const visitorId = str(meta.datafast_visitor_id, 100);
  if (!visitorId) {
    // Booked from a link outside boosterai.pl (or before 10.11.2026): nothing to attribute.
    console.info("cal-webhook: booking without datafast_visitor_id", booking.uid);
    return NextResponse.json({ ok: true, attributed: false });
  }

  const metadata: Record<string, string> = {};
  const put = (key: string, value: unknown) => {
    const v = str(value, 255);
    if (v) metadata[key] = v;
  };
  put("event", booking.type || booking.eventTitle);
  put("page", meta.page);
  put("utm_source", tracking.utm_source);
  put("utm_campaign", tracking.utm_campaign);
  put("utm_content", tracking.utm_content);

  try {
    const res = await fetch(DATAFAST_GOALS_API, {
      method: "POST",
      headers: { Authorization: `Bearer ${apiKey}`, "Content-Type": "application/json" },
      body: JSON.stringify({ datafast_visitor_id: visitorId, name: "booking_created", metadata }),
    });
    if (!res.ok) {
      console.error("cal-webhook: DataFast responded", res.status, (await res.text()).slice(0, 300));
      return NextResponse.json({ error: "Upstream error" }, { status: 502 });
    }
  } catch (err) {
    console.error("cal-webhook: DataFast unreachable", err);
    return NextResponse.json({ error: "Upstream error" }, { status: 502 });
  }

  return NextResponse.json({ ok: true, attributed: true });
}

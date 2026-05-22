import * as fs from "fs";
import * as path from "path";
import * as dotenv from "dotenv";

// Load .env.local
dotenv.config({ path: path.resolve(process.cwd(), ".env.local") });

import { site } from "../src/content/site";

// ─── Do-not-translate rules ───────────────────────────────────────────────────

const DO_NOT_TRANSLATE_KEYS = new Set([
  "href", "component", "slug", "version", "id",
]);

const BRAND_NAMES = [
  "Booster", "Claude", "n8n", "OOH Manager", "Legal Flow", "Open Mercato",
  "Monday", "ClickUp", "Pipedrive", "Tilio", "React", "Node", "Python",
  "RAG", "CRM", "ERP", "CMS", "AI", "B2B", "B2G", "SEO", "ISR",
  "Kancelaria Jabłońska",
];

function shouldTranslate(key: string, value: string): boolean {
  // Skip by key name
  const leafKey = key.split(".").pop() ?? "";
  if (DO_NOT_TRANSLATE_KEYS.has(leafKey)) return false;

  // Skip URLs and emails
  if (value.startsWith("#") || value.startsWith("mailto:") ||
      value.startsWith("http://") || value.startsWith("https://")) return false;

  // Skip date strings like "May 2026", "Apr 2026"
  if (/^[A-Za-z]{3,9}\s\d{4}$/.test(value)) return false;

  // Skip purely numeric or version strings like "6", "100", "v1.0"
  if (/^v?\d[\d.%x]*$/.test(value)) return false;

  // Skip empty strings
  if (value.trim() === "") return false;

  return true;
}

// ─── Recursive walker ─────────────────────────────────────────────────────────

type StringEntry = { key: string; value: string };

function collectStrings(obj: unknown, prefix = ""): StringEntry[] {
  const entries: StringEntry[] = [];

  if (typeof obj === "string") {
    entries.push({ key: prefix, value: obj });
  } else if (Array.isArray(obj)) {
    obj.forEach((item, i) => {
      entries.push(...collectStrings(item, `${prefix}.${i}`));
    });
  } else if (obj !== null && typeof obj === "object") {
    for (const [k, v] of Object.entries(obj as Record<string, unknown>)) {
      const newKey = prefix ? `${prefix}.${k}` : k;
      entries.push(...collectStrings(v, newKey));
    }
  }

  return entries;
}

// ─── OpenRouter call ──────────────────────────────────────────────────────────

async function translateBatch(texts: string[]): Promise<string[]> {
  const apiKey = process.env.OPENROUTER_API_KEY;
  if (!apiKey) throw new Error("OPENROUTER_API_KEY not set in .env.local");

  const brandList = BRAND_NAMES.join(", ");
  const systemPrompt = `You are a professional EN→PL translator for a tech agency website.
Rules:
- Translate English marketing copy to natural, professional Polish.
- NEVER translate these brand/product names: ${brandList}.
- Preserve all punctuation, capitalization patterns, and line breaks (\\n).
- Return ONLY a valid JSON array of strings with the same length as the input array.
- No explanations, no markdown, just the JSON array.`;

  const userMessage = JSON.stringify(texts);

  const response = await fetch("https://openrouter.ai/api/v1/chat/completions", {
    method: "POST",
    headers: {
      "Authorization": `Bearer ${apiKey}`,
      "Content-Type": "application/json",
      "HTTP-Referer": "https://boosterai.pl",
      "X-Title": "BoosterSite Translate Script",
    },
    body: JSON.stringify({
      model: "google/gemini-2.0-flash-001",
      messages: [
        { role: "system", content: systemPrompt },
        { role: "user", content: userMessage },
      ],
      temperature: 0.2,
    }),
  });

  if (!response.ok) {
    const err = await response.text();
    throw new Error(`OpenRouter error ${response.status}: ${err}`);
  }

  const data = await response.json() as {
    choices: Array<{ message: { content: string } }>;
  };
  const raw = data.choices[0].message.content.trim();

  // Strip markdown code fences if model wrapped output
  const cleaned = raw.replace(/^```(?:json)?\s*/i, "").replace(/\s*```$/i, "");

  const parsed = JSON.parse(cleaned) as unknown;
  if (!Array.isArray(parsed) || parsed.length !== texts.length) {
    throw new Error(
      `Translation returned ${Array.isArray(parsed) ? parsed.length : "non-array"} items, expected ${texts.length}`
    );
  }
  return parsed as string[];
}

// ─── Main ─────────────────────────────────────────────────────────────────────

async function main() {
  console.log("Collecting strings from site.ts...");
  const allEntries = collectStrings(site);

  const toTranslate = allEntries.filter(e => shouldTranslate(e.key, e.value));
  const skipSet = new Set(
    allEntries.filter(e => !shouldTranslate(e.key, e.value)).map(e => e.key)
  );

  console.log(`Total strings: ${allEntries.length}`);
  console.log(`To translate: ${toTranslate.length}`);
  console.log(`Skipped: ${skipSet.size}`);

  // Build EN messages (all strings, including non-translated)
  const enMessages: Record<string, string> = {};
  for (const { key, value } of allEntries) {
    enMessages[key] = value;
  }

  // Translate PL
  console.log("Calling OpenRouter (Gemini Flash 1.5)...");
  const plTexts = await translateBatch(toTranslate.map(e => e.value));

  // Build PL messages (translated where applicable, original elsewhere)
  const plMessages: Record<string, string> = { ...enMessages };
  toTranslate.forEach(({ key }, i) => {
    plMessages[key] = plTexts[i];
  });

  // Write output
  const messagesDir = path.resolve(process.cwd(), "messages");
  fs.mkdirSync(messagesDir, { recursive: true });

  fs.writeFileSync(
    path.join(messagesDir, "en.json"),
    JSON.stringify(enMessages, null, 2)
  );
  fs.writeFileSync(
    path.join(messagesDir, "pl.json"),
    JSON.stringify(plMessages, null, 2)
  );

  console.log("✓ messages/en.json written");
  console.log("✓ messages/pl.json written");
}

main().catch(err => {
  console.error(err);
  process.exit(1);
});

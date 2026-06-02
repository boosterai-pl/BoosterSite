/**
 * 1. Loads .env.local before any module (including Payload config) runs.
 * 2. Patches @next/env default export so Payload's loadEnv.js works under Node 24.
 * Loaded via --require before the main script.
 */
const path = require("path");
const fs = require("fs");

// Manually parse .env.local so DATABASE_URI is set before pg adapter reads it
const envFile = path.resolve(process.cwd(), ".env.local");
if (fs.existsSync(envFile)) {
  const lines = fs.readFileSync(envFile, "utf8").split("\n");
  for (const line of lines) {
    const trimmed = line.trim();
    if (!trimmed || trimmed.startsWith("#")) continue;
    const eqIdx = trimmed.indexOf("=");
    if (eqIdx === -1) continue;
    const key = trimmed.slice(0, eqIdx).trim();
    let val = trimmed.slice(eqIdx + 1).trim();
    if ((val.startsWith('"') && val.endsWith('"')) ||
        (val.startsWith("'") && val.endsWith("'"))) {
      val = val.slice(1, -1);
    }
    if (val && !process.env[key]) {
      process.env[key] = val;
    }
  }
}

// Patch @next/env default export
const nextEnv = require("@next/env");
if (!nextEnv.default) {
  nextEnv.default = nextEnv;
}

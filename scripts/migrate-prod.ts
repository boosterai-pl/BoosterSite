/**
 * Production-safe migration runner.
 *
 * Problem: `payload migrate --yes` silently exits 0 in CI when a `batch = -1`
 * ("dev mode") entry exists in `payload_migrations`. The drizzle adapter uses
 * `prompts()` with `initial: false`, which defaults to NO in non-interactive
 * environments — the `--yes` flag from the Payload CLI does not reach that
 * code path.
 *
 * Fix: remove the dev mode entry before delegating to `payload migrate`.
 */

import pg from "pg";
import { execSync } from "child_process";

const { Client } = pg;

const DATABASE_URI = process.env.DATABASE_URI;

if (!DATABASE_URI) {
  console.log("[migrate-prod] DATABASE_URI not set — skipping dev-mode cleanup.");
} else {
  const client = new Client({ connectionString: DATABASE_URI });
  try {
    await client.connect();
    const result = await client.query(
      "DELETE FROM payload_migrations WHERE batch = -1 RETURNING name"
    );
    if (result.rowCount && result.rowCount > 0) {
      const names = result.rows.map((r: { name: string }) => r.name).join(", ");
      console.log(`[migrate-prod] Removed dev-mode entry(s): ${names}`);
    } else {
      console.log("[migrate-prod] No dev-mode entries — DB is clean.");
    }
  } catch (err) {
    // payload_migrations may not exist on a fresh DB — safe to ignore.
    console.warn("[migrate-prod] Dev-mode cleanup skipped:", (err as Error).message);
  } finally {
    await client.end();
  }
}

execSync("node_modules/.bin/payload migrate --yes", { stdio: "inherit" });

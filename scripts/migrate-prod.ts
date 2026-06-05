/**
 * Production-safe migration runner.
 *
 * Payload's migrate command silently exits 0 in CI when a dev-mode entry
 * exists in payload_migrations. This causes migrations to be skipped with no
 * error, breaking the site after deploy. This script removes that entry first,
 * then runs the normal migration command.
 */

import pg from "pg";
import { execSync } from "child_process";

const { Client } = pg;

const DATABASE_URI = process.env.DATABASE_URI;

if (DATABASE_URI) {
  const client = new Client({ connectionString: DATABASE_URI });
  try {
    await client.connect();
    const result = await client.query(
      "DELETE FROM payload_migrations WHERE batch = -1 RETURNING name"
    );
    if (result.rowCount && result.rowCount > 0) {
      console.log(`[migrate-prod] Removed dev-mode entry(s): ${result.rows.map((r: { name: string }) => r.name).join(", ")}`);
    }
  } catch {
    // payload_migrations may not exist on a fresh DB — safe to ignore
  } finally {
    await client.end();
  }
}

execSync("node_modules/.bin/payload migrate --yes", { stdio: "inherit" });

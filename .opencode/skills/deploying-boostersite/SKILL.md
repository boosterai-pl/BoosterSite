---
name: deploying-boostersite
description: Use when deploying the site, checking deployment status, monitoring a Vercel build, verifying a preview deployment, checking if a PR is live, running DB migrations, or diagnosing a failed build. Covers the full deploy pipeline from push to production.
compatibility: opencode
---

## How Deployment Works

Every push triggers a Vercel build automatically:

| Trigger | Environment | URL pattern |
|---------|------------|-------------|
| Push to any branch | Preview | `boostersite-<hash>-szymon-bazans-projects.vercel.app` |
| Merge to `main` | Production | `boostersite-nine.vercel.app` |

Vercel scope: **`szymon-bazans-projects`** (not `andrzejchm`). Use `VERCEL_TOKEN` from `.env.local`.

## Build Command

```
payload migrate --yes && next build
```

`payload migrate --yes` runs all pending DB migrations before the Next.js build. Never skip this step — schema changes land with data already migrated.

## Check Deployment Status

```bash
VERCEL_TOKEN=$(dotenvx get VERCEL_TOKEN -f .env.local)

# Latest deployments for a branch
curl -s "https://api.vercel.com/v6/deployments?projectId=prj_OLNUA7I4Co39wgyWLZqLyFEsfZk5&teamId=team_AvYrPK6JoINnJGybcCBhgdvT&limit=5" \
  -H "Authorization: Bearer $VERCEL_TOKEN" | \
  jq '[.deployments[] | select(.meta.githubCommitRef == "<branch>") | {state, url}]'
```

States: `QUEUED` → `BUILDING` → `READY` / `ERROR`

## Poll Until Ready

```bash
VERCEL_TOKEN=$(dotenvx get VERCEL_TOKEN -f .env.local)
while true; do
  RESULT=$(curl -s "https://api.vercel.com/v6/deployments?projectId=prj_OLNUA7I4Co39wgyWLZqLyFEsfZk5&teamId=team_AvYrPK6JoINnJGybcCBhgdvT&limit=3" \
    -H "Authorization: Bearer $VERCEL_TOKEN" | \
    jq -r '[.deployments[] | select(.meta.githubCommitRef == "<branch>")] | first | "\(.state) \(.url)"')
  echo "$(date '+%H:%M:%S') $RESULT"
  if echo "$RESULT" | grep -q "^READY\|^ERROR"; then break; fi
  sleep 20
done
```

## Access a Protected Preview

Previews require Vercel SSO bypass. Get the bypass token via `vercel curl` (it auto-discovers it from project settings):

```bash
# vercel curl debug output reveals the token:
vercel curl "https://<preview-url>/api/users/login" --token $(dotenvx get VERCEL_TOKEN -f .env.local) ...
# Look for: "Using existing protection bypass token from project settings: <TOKEN>"
```

Then use it directly:
```bash
curl -H "x-vercel-protection-bypass: <TOKEN>" https://<preview-url>/...
```

## Get Build Logs

```bash
VERCEL_TOKEN=$(dotenvx get VERCEL_TOKEN -f .env.local)
DEPLOY_ID=$(curl -s "https://api.vercel.com/v6/deployments?projectId=prj_OLNUA7I4Co39wgyWLZqLyFEsfZk5&teamId=team_AvYrPK6JoINnJGybcCBhgdvT&limit=3" \
  -H "Authorization: Bearer $VERCEL_TOKEN" | \
  jq -r '[.deployments[] | select(.meta.githubCommitRef == "<branch>")] | first | .uid')

curl -s "https://api.vercel.com/v2/deployments/$DEPLOY_ID/events?limit=200" \
  -H "Authorization: Bearer $VERCEL_TOKEN" | \
  jq -r '.[] | select(.type == "stdout" or .type == "stderr") | .payload.text' | grep -v "^$"
```

## DB Migrations

```bash
# Create a new migration after changing a Payload collection/global schema
npm run db:migrate:create -- <migration-name>

# Check pending migrations
npm run db:migrate:status

# Apply manually (runs automatically on deploy via build command)
npm run db:migrate
```

Migrations live in `migrations/`. Always commit the generated `.ts` + `.json` files alongside the schema change. See `AGENTS.md` for the full workflow.

## Common Build Failures

| Error | Cause | Fix |
|-------|-------|-----|
| `payload migrate` hangs waiting for `(y/N)` | Missing `--yes` flag | Build script already has `--yes`; check it wasn't removed |
| `Cannot find module '...collections/Users'` | Missing `.ts` extension in import | Add `.ts` extension; Node 24 ESM requires explicit extensions |
| `ERR_REQUIRE_ASYNC_MODULE` | No `"type": "module"` in `package.json` | Already set; check it wasn't removed |
| Type error in `scripts/` | Scripts included in tsconfig | `scripts/` is excluded in `tsconfig.json`; check it's still there |
| Migration fails: "dev mode" warning | Preview DB was previously auto-pushed | `--yes` auto-confirms; migration still runs |

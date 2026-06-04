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

Build command: `payload migrate --yes && next build` — migrations apply before every build, automatically.

## Deploy to Preview

Push your branch — Vercel builds automatically:

```bash
git push origin <branch>
```

The preview URL appears in the Vercel dashboard and in the deploy check on the GitHub PR. Use the polling pattern below to wait for `READY`.

## Deploy to Production

Merge to `main` — Vercel builds and promotes automatically:

```bash
gh pr merge <PR_NUMBER> --repo boosterai-pl/BoosterSite --squash
```

Production is live at `https://boostersite-nine.vercel.app` once the build reaches `READY`. Poll on branch `main` to confirm.

## Polling Deployments

Load [`polling-monitoring`](../polling-monitoring/SKILL.md) before polling. Never use `while` loops. The pattern is two separate Bash calls per iteration: check now, then `sleep N && check again`.

**Call A — check now:**
```bash
VERCEL_TOKEN=$(dotenvx get VERCEL_TOKEN -f .env.local)
curl -s "https://api.vercel.com/v6/deployments?projectId=prj_OLNUA7I4Co39wgyWLZqLyFEsfZk5&teamId=team_AvYrPK6JoINnJGybcCBhgdvT&limit=3" \
  -H "Authorization: Bearer $VERCEL_TOKEN" | \
  jq '[.deployments[] | select(.meta.githubCommitRef == "<branch>") | {state, url}] | first'
```

**Call B — wait, then check again:**
```bash
sleep 20 && curl -s "https://api.vercel.com/v6/deployments?..." | jq '...'
```

Terminal states: `READY`, `ERROR`. Transient: `QUEUED`, `BUILDING`. Summarise in one line per iteration — see `polling-monitoring` for the output format.

## Access a Protected Preview

Previews are Vercel SSO-protected. Get the bypass token from project settings via `vercel curl` debug output:

```bash
vercel curl "https://<preview-url>/..." --token $(dotenvx get VERCEL_TOKEN -f .env.local) 2>&1 | grep "bypass token"
# Output: "Using existing protection bypass token from project settings: <TOKEN>"
```

Then use it in all requests:
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

Migrations run automatically on every deploy via the build command. For local development:

```bash
npm run db:migrate:create -- <name>   # generate after a schema change
npm run db:migrate:status             # check pending migrations
npm run db:migrate                    # apply locally
```

Always commit the generated `migrations/<name>.ts` + `migrations/<name>.json` alongside the schema change. See `AGENTS.md` for the full schema change workflow.

## Common Build Failures

| Error | Cause | Fix |
|-------|-------|-----|
| `payload migrate` hangs on `(y/N)` | Missing `--yes` | Build script has `--yes` — check it wasn't removed |
| `Cannot find module '...collections/Users'` | Extension-less import, Node 24 ESM | Add `.ts` extension to the import |
| `ERR_REQUIRE_ASYNC_MODULE` | `"type": "module"` missing from `package.json` | Already set — check it wasn't removed |
| Type errors in `scripts/` failing build | `scripts/` included in tsconfig | `scripts/` is excluded in `tsconfig.json` — check it's still there |
| Migration "dev mode" warning | Preview DB was previously auto-pushed | `--yes` auto-confirms — migration still runs correctly |

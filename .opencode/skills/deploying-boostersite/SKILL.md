---
name: deploying-boostersite
description: Use when publishing a change to boosterai.pl, pushing to main, checking whether a change is live, checking deployment status, monitoring or waiting for a Vercel build, reading Vercel build logs, diagnosing a failed build or "Deployment failed", verifying a preview deployment, or rolling back / reverting / undoing a broken release.
compatibility: opencode
---

## How deployment works

Vercel's Git integration builds every push to `boosterai-pl/BoosterSite`:

| Push to | Result | URL |
|---|---|---|
| `main` | Production, live in ~1–2 minutes | `https://boosterai.pl` (also `boostersite-nine.vercel.app`) |
| any other branch | Preview, SSO-protected | shown in the commit status / PR check |

There is no separate deploy command, no database and no migration step. `npm run build` needs no env vars.

Vercel scope: `szymon-bazans-projects`. Project ID `prj_OLNUA7I4Co39wgyWLZqLyFEsfZk5`, team ID `team_AvYrPK6JoINnJGybcCBhgdvT`.

## Publish a change

```bash
npm run check                                  # lint + typecheck + build; stop if it fails
git add -A && git commit -m "content: <what changed>"
git pull --rebase origin main && git push origin HEAD:main
```

Never push when `npm run check` fails: a failed Vercel build leaves the previous version live, but the change will not appear.

## Check that it is live

Load `polling-monitoring` before waiting. Check the Vercel status on the pushed commit:

```bash
SHA=$(git rev-parse HEAD)
gh api repos/boosterai-pl/BoosterSite/commits/$SHA/status \
  --jq '.statuses[] | select(.context=="Vercel") | {state, target_url}'
```

States: `pending` (building), `success` (live), `failure` / `error` (build failed). If nothing is returned yet, wait 15 s and check again.

After `success`, confirm on the real site with text you changed:

```bash
curl -s https://boosterai.pl/pl | grep -c "<new text>"
```

Report to the user with the page URL they can open.

## Read build logs (failed build)

Requires `VERCEL_TOKEN` (env var, or `.env.local` locally).

```bash
DEPLOY_ID=$(curl -s "https://api.vercel.com/v6/deployments?projectId=prj_OLNUA7I4Co39wgyWLZqLyFEsfZk5&teamId=team_AvYrPK6JoINnJGybcCBhgdvT&limit=5" \
  -H "Authorization: Bearer $VERCEL_TOKEN" | jq -r --arg sha "$SHA" '[.deployments[] | select(.meta.githubCommitSha == $sha)] | first | .uid')
curl -s "https://api.vercel.com/v2/deployments/$DEPLOY_ID/events?teamId=team_AvYrPK6JoINnJGybcCBhgdvT&limit=300" \
  -H "Authorization: Bearer $VERCEL_TOKEN" | jq -r '.[] | select(.type=="stdout" or .type=="stderr") | .payload.text' | tail -60
```

Without a token, reproduce locally: `npm run build` fails with the same error.

## Roll back

Default: revert the bad commit in git. The site and the repo stay in sync, and a normal production build follows.

```bash
git log --oneline -10                 # find the bad commit
git revert --no-edit <sha>            # one commit; for several: git revert --no-edit <oldest>^..<newest>
npm run check
git push origin HEAD:main
```

Emergency only (site is broken and a build would take too long): Vercel Instant Rollback in the dashboard (Project → Production Deployment → **Instant Rollback**) or `vercel rollback <previous-production-deployment-url> --scope szymon-bazans-projects`. After an Instant Rollback, Vercel stops putting new pushes live. Fix or revert in git, push, then promote the new deployment to re-enable automatic releases:

```bash
vercel promote <new-deployment-url> --scope szymon-bazans-projects
```

## Preview deployments

Previews are behind Vercel SSO. To fetch one from the terminal, get the bypass token and send it as a header:

```bash
vercel curl "https://<preview-url>/" --token $VERCEL_TOKEN 2>&1 | grep "bypass token"
curl -H "x-vercel-protection-bypass: <TOKEN>" https://<preview-url>/
```

## Common build failures

| Error | Fix |
|---|---|
| `... .pl.md is missing` / `frontmatter field ... is required` | Content file problem. See `editing-site-content`. |
| `Type error` in `src/content/...` | A content file does not match `src/content/types.ts`, usually a field added in one language only. |
| ESLint error | Run `npm run lint` locally and fix the reported line. |

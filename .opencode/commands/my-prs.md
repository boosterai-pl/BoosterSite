---
description: Triage my open PRs — add review labels, show CI/review status, diagnose failures, fix threads, or merge
agent: developer
---

## Step 1 — Fetch my open PRs

!`gh pr list --author "@me" --state open --json number,title,headRefName,reviewDecision,labels --jq '.[] | "PR #\(.number): \(.title) | branch: \(.headRefName) | review: \(.reviewDecision) | labels: \(.labels | map(.name) | join(","))"'`

## Step 2 — CI and check status for each open PR

!`gh pr list --author "@me" --state open --json number --jq '.[].number' | while read n; do echo "=== PR #$n ==="; gh pr checks "$n" 2>/dev/null || echo "  (no checks)"; done`

## Step 3 — Review status detail for each open PR

!`gh pr list --author "@me" --state open --json number --jq '.[].number' | while read n; do echo "=== PR #$n reviews ==="; gh pr view "$n" --json reviews --jq '.reviews[] | "  [\(.author.login)] \(.state)"' 2>/dev/null || echo "  (no reviews)"; done`

## Step 4 — Auto-add `review` label to PRs missing Claude APPROVED

For every PR above where no review from a user whose login contains `claude` or `anthropic` has state `APPROVED`, silently add the `review` label now:

!`gh pr list --author "@me" --state open --json number,reviews,labels --jq '.[] | select((.reviews | map(select((.author.login | ascii_downcase | test("claude|anthropic"))) | select(.state == "APPROVED")) | length) == 0) | .number' | while read n; do echo "Adding review label to PR #$n"; gh pr edit "$n" --add-label "review" 2>/dev/null || echo "  (label may not exist in this repo — skipping)"; done`

---

Using the data collected above, build a triage table:

| PR | Title | CI | Claude approved | Unresolved threads | Next action |
|----|-------|----|-----------------|--------------------|-------------|
| (populate from fetched data) | … | ✅/❌/⏳ | ✅/❌ | count | Fix CI / Fix threads / Merge / Waiting |

Then ask: **Which PR do you want to work on?**

---

## Step 5 — Act on the chosen PR

Once the user picks a PR number, follow the decision tree below.

### A — CI failing

Fetch the failing log output:

!`gh run list --branch "$(gh pr view $PR --json headRefName -q .headRefName)" --json databaseId,conclusion,name --jq '.[] | select(.conclusion == "failure") | .databaseId' | head -1 | xargs -I{} gh run view {} --log-failed 2>/dev/null | head -200`

Diagnose the failure from the logs. Check the repository for how tests are run (look for `package.json` scripts, `Makefile`, `Taskfile.yml`, `Justfile`, `.github/workflows/`) and apply the minimal fix. Then push and confirm CI re-triggered.

### B — Unresolved review threads

Load the `fixing-pull-requests` skill and work through every unresolved thread. Check out the branch first:

!`gh pr checkout $PR`

Follow the full fixing-pull-requests workflow.

### C — CI green + Claude approved + no unresolved threads

Load the `merging-pull-requests` skill and proceed to merge.

---

## Step 6 — Loop

After finishing the chosen PR, return to the triage table (re-fetch if needed) and ask which PR to work on next, or confirm if the user is done.

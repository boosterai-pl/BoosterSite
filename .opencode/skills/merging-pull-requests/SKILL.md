---
name: merging-pull-requests
description: Use when the user asks to merge, squash, ship, land, close out, finalize, or release a PR. Also use when diagnosing merge-blockers like CONFLICTING, BLOCKED, BEHIND, UNSTABLE, DIRTY merge state, CHANGES_REQUESTED review, missing required checks, or post-merge worktree cleanup. Triggers on phrases like "merge PR", "squash merge", "ship it", "merge if green", "land this", "close out the PR".
license: MIT
compatibility: opencode
metadata:
  schemaVersion: "1"
  version: "1.0.0"
  stability: stable
  category: workflow
  appliesTo: any
  requires: managing-pr-descriptions
---

## Related skills (load when triggered)

- `polling-monitoring` - load before any wait loop on CI or Claude runs.
- `fixing-pull-requests` - load when CI fails or `reviewDecision: CHANGES_REQUESTED`.
- `managing-pr-descriptions` - load if the PR title or body needs an update before merge.
- `managing-branches` - branch naming reference.

## Hard rules

- ALWAYS squash-merge. Never merge-commit, never rebase-merge.
- Never merge a draft PR.
- Never merge a fork PR (Claude review skips it - no approval possible).
- Never bypass `mergeable: MERGEABLE` + `mergeStateStatus: CLEAN`.
- Never merge without `reviewDecision: APPROVED`.
- Never merge without reading Claude's review body AND inline comments AND conversation comments, even when `reviewDecision: APPROVED`. Approved-with-comments is the most common Claude verdict.
- Never merge while any required check is `pending`, `in_progress`, `queued`, or `failure`.
- Never maintain stacked implementation PRs. Merge the current PR before opening the next dependent PR.
- Delete the branch on merge. Use ephemeral, short-lived branches.
- ALWAYS run `task verify` locally before pushing any fix. See `fixing-pull-requests` Step 5.
- ALWAYS load `fixing-pull-requests` at the start of any fix work, not when things break.

## Workflow checklist

Copy and track progress:

```
- [ ] Step 1: Load polling-monitoring skill
- [ ] Step 2: Fetch PR state (mergeability, review decision, all checks)
- [ ] Step 3: Triage non-green state (if any)
- [ ] Step 4: Wait for or trigger Claude review (if needed)
- [ ] Step 5: Final pre-merge verification
- [ ] Step 5.5: Read Claude review body + inline + conversation comments, triage findings
- [ ] Step 6: Squash-merge with --delete-branch
- [ ] Step 7: Confirm merge state
- [ ] Step 7.5: Update ClickUp ticket status if PR closed it
- [ ] Step 8: Clean up worktree (only if clean)
```

Execute in order. Do NOT skip Step 5 even if Step 2 looked green - state can change during waiting.

## Step 1: Load polling-monitoring

If you will wait on CI or Claude, load the `polling-monitoring` skill first. It defines the two-call-per-iteration pattern (check + sleep+check) and the sleep-duration table. Without it, you will write shell loops that hang the agent.

## Step 2: Fetch full PR state

```bash
gh pr view <PR> --repo <owner>/<repo> \
  --json mergeable,mergeStateStatus,reviewDecision,isDraft,headRefOid,labels,state,statusCheckRollup \
  --jq '{
    state, isDraft,
    mergeable, mergeStateStatus, reviewDecision,
    headSha: .headRefOid,
    labels: [.labels[].name],
    checks: [.statusCheckRollup[] | {name, status, conclusion}]
  }'
```

Required reads:

- `state` must be `OPEN`. If `MERGED` or `CLOSED`, stop.
- `isDraft` must be `false`. If `true`, ask the user; do not silently mark ready.
- `mergeable` must be `MERGEABLE`. Other values: `CONFLICTING` (conflicts - Step 3), `UNKNOWN` (GitHub is still calculating mergeability - wait 5-10s and re-fetch).
- `mergeStateStatus` must be `CLEAN`. Other values: `BLOCKED` (failing checks/reviews), `BEHIND` (head ref out of date), `DIRTY` (merge commit cannot be cleanly created), `UNSTABLE` (mergeable but a non-required check is failing - verify before merging), `HAS_HOOKS` (mergeable with passing checks and pre-receive hooks - safe to merge), `DRAFT` (PR is a draft), `UNKNOWN` (state still being computed - re-fetch).

### Conflicts block CI

When `mergeable: CONFLICTING`, GitHub does NOT run workflows on new pushes to that branch. The PR will sit indefinitely with no CI signal. ALWAYS resolve conflicts FIRST (Step 3), THEN push, THEN expect CI to run. If you pushed and no new CI run appeared within ~30s, re-check `mergeable` before assuming the runner is slow.

### Drafts skip CI

The `CI` workflow has a `draft != true` guard on every job. Draft PRs do NOT run CI; the PR will show no checks at all. CI fires when the PR transitions to ready (via `ready_for_review`). If you need CI on a draft, mark it ready first.
- `reviewDecision` must be `APPROVED`. `""` / `null` / `COMMENTED` are NOT approved — re-trigger Claude and wait. `CHANGES_REQUESTED` means address feedback first. `REVIEW_REQUIRED` means Claude has not reviewed.

### Inspect every check

The headline `Claude PR Code Review` status is NOT enough. Walk every entry in `statusCheckRollup`:

- `conclusion`: `SUCCESS`, `SKIPPED`, `NEUTRAL` are passing. `FAILURE`, `CANCELLED`, `TIMED_OUT`, `ACTION_REQUIRED`, `STARTUP_FAILURE`, `STALE` are failing. (Per GitHub `CheckRunState`.)
- `status`: `COMPLETED` is required. `IN_PROGRESS`, `QUEUED`, `PENDING`, `WAITING` mean wait.

Determine the actual required checks dynamically — do NOT assume a fixed job list. Read the required status checks from the repository's branch protection rules (`gh api repos/{owner}/{repo}/branches/main/protection --jq '.required_status_checks.contexts'`) or inspect the full `statusCheckRollup` output from Step 2. A configured automated code review check (e.g. `claude-pr-review` or similar) appears alongside CI jobs — treat it the same way. Some jobs `SKIP` for spec-only PRs (no app/package diff) — that is a pass, not a failure. Verify all non-skipped jobs are `SUCCESS`.

## Step 3: Triage non-green state

| State | Action |
|---|---|
| `mergeStateStatus: CONFLICTING` / `mergeable: CONFLICTING` | Merge `origin/main` into the PR branch in a worktree, resolve conflicts, run `task verify`, push. Do NOT use the GitHub web "Resolve conflicts" UI. |
| `mergeStateStatus: BEHIND` | Merge `origin/main` into the PR branch and push. Required when branch protection enforces "up to date with base branch". |
| `mergeStateStatus: BLOCKED` with failing checks | Load `fixing-pull-requests` skill. |
| `mergeStateStatus: UNSTABLE` | One non-required check is failing. Inspect `statusCheckRollup` to identify; if it's a known infra flake (Docker testcontainer timeout, runner queue), re-run that single job with `gh run rerun <run-id> --failed`. |
| `reviewDecision: CHANGES_REQUESTED` | Load `fixing-pull-requests` skill. Do NOT merge. |
| `reviewDecision: REVIEW_REQUIRED` | Step 4 (Claude has not reviewed). |

## Step 4: Claude review - wait or trigger

### When Claude auto-runs (no action needed)

Claude review fires on:

- First review: PR `opened`, `reopened`, or `ready_for_review`. Runs in parallel with CI.
- Any re-review: add the `review` label.

Forks and drafts are silently skipped.

After a successful review the workflow adds the `bot-reviewed` label. A new push does NOT auto-trigger another review — you must add the `review` label to re-review. If the `Claude PR Code Review` status reads `Skipped — already reviewed`, treat it as a pass.

### When you MUST manually trigger

Add the `review` label to force a re-run:

```bash
gh pr edit <PR> --add-label review --repo <owner>/<repo>
```

Manually trigger when:

- A new HEAD is on the PR and you want it reviewed (every re-review goes through the label — pushes do not auto-trigger).
- `reviewDecision: REVIEW_REQUIRED` and no Claude run exists for the current head SHA (e.g. the initial open-event run errored on infra).
- The previous Claude run failed for upstream reasons (rate limit, timeout, runner crash).

Do NOT re-trigger when the `Claude PR Code Review` status is `Skipped — already reviewed`.

### Re-trigger when the label is already present

The workflow auto-removes `review` once the job starts. If the label is still set, the previous run never picked it up - toggle it off then back on:

```bash
gh pr edit <PR> --remove-label review --repo <owner>/<repo>
sleep 5
gh pr edit <PR> --add-label review --repo <owner>/<repo>
```

### Cancel and re-trigger after deleting comments

If you deleted resolved bot comments (per `fixing-pull-requests` skill), an in-flight Claude run started before the deletion will still see them and re-flag them. Cancel and re-trigger:

```bash
RUN_ID=$(gh api 'repos/<owner>/<repo>/actions/runs?per_page=10' \
  --jq '[.workflow_runs[] | select(.head_branch=="<branch>" and .name=="Claude PR Code Review" and (.status=="in_progress" or .status=="queued"))] | sort_by(.created_at) | last | .id')
gh run cancel "$RUN_ID" --repo <owner>/<repo>
sleep 15
gh pr edit <PR> --remove-label review --repo <owner>/<repo>
sleep 5
gh pr edit <PR> --add-label review --repo <owner>/<repo>
```

### Polling Claude run

Use the polling-monitoring two-call pattern. Sleep 30s between checks.

While polling, on EVERY iteration ALSO refresh `mergeable`, `mergeStateStatus`, AND `reviewDecision` - any of these can regress mid-wait (main moving → `BEHIND`/`CONFLICTING`; a new Claude review round → `CHANGES_REQUESTED`). Catching regressions mid-wait is cheaper than discovering them at Step 5.

Also check main drift every other iteration — see `polling-monitoring` "Main drift while polling CI".

```bash
# Call A - check Claude run AND full PR gate state together
gh api repos/<owner>/<repo>/actions/runs/<RUN_ID> --jq '{status, conclusion}'
gh pr view <PR> --repo <owner>/<repo> --json mergeable,mergeStateStatus,reviewDecision --jq '{mergeable, mergeStateStatus, reviewDecision}'

# Call B (after summarizing)
sleep 30 && gh api repos/<owner>/<repo>/actions/runs/<RUN_ID> --jq '{status, conclusion}' && \
  gh pr view <PR> --repo <owner>/<repo> --json mergeable,mergeStateStatus,reviewDecision --jq '{mergeable, mergeStateStatus, reviewDecision}'
```

If `mergeable` flips to `CONFLICTING` or `mergeStateStatus` flips to `BEHIND`, abort polling and go to Step 3.
If `reviewDecision` flips to `CHANGES_REQUESTED` at any point, abort polling, load `fixing-pull-requests` skill, and do NOT merge.

Terminal: `status: completed`. If `conclusion: failure`, fetch the log and check for the upstream rate-limit error:

```bash
gh run view --repo <owner>/<repo> --job <CLAUDE_JOB_ID> --log-failed 2>&1 | rg -i 'limit|rate|exit code' | head -10
```

If you see `You've hit your limit · resets HH:MMam/pm (UTC)`, do NOT immediately retry. Sleep until the reset time + 2 minutes, then re-trigger. Same applies if the Opus fallback also failed.

### Stale scripts on PR branch

The job checks out `.github/scripts/should-review.mjs`, `.agents/skills/code-reviewing/*`, and `.opencode/skills/code-reviewing/engine/*` from the PR branch. If the review silently skips or errors and any of these drifted from main, merge main into the branch and re-trigger:

```bash
git fetch origin
git merge origin/main --no-edit
git push
gh pr edit <PR> --add-label review --repo <owner>/<repo>
```

### Re-fetch review state after Claude completes

```bash
gh pr view <PR> --repo <owner>/<repo> --json reviewDecision,reviews \
  --jq '{reviewDecision, latestClaude: ([.reviews[] | select(.author.login=="claude")] | last | {state, submittedAt, body})}'
```

`state: APPROVED` and `reviewDecision: APPROVED` are required to merge.

### Fork PRs - special case

The Claude workflow has `if: github.event.pull_request.head.repo.full_name == github.repository`. Fork PRs are silently skipped. They cannot be merged via this skill. Refuse and explain to the user.

## Step 5: Final pre-merge verification

Repeat Step 2 fetch one more time. Confirm:

```
mergeable: MERGEABLE
mergeStateStatus: CLEAN
reviewDecision: APPROVED
all checks: SUCCESS or SKIPPED, all status: COMPLETED
```

Then verify no Claude review run is still active on the branch (catches parallel runs from a manual `review` label re-trigger overlapping with the auto `workflow_run` path after CI finished):

```bash
gh run list --repo <owner>/<repo> --branch <branch> --workflow "Claude PR Code Review" \
  --limit 10 --json status \
  --jq '[.[] | select(.status == "in_progress" or .status == "queued" or .status == "pending")] | length'
```

Must return `0`. If non-zero, wait for it to complete and re-fetch `reviewDecision`.

If anything regressed, go back to the relevant step. Do NOT proceed to merge on stale data.

## Step 5.5: Read and triage Claude comments

Load the `fixing-pull-requests` skill — it owns the rules for fetching, assessing, and resolving review comments (including the bot-comment delete-don't-reply rule).

Apply that skill's triage to Claude's findings. Then report to the user:

```
Claude findings triaged:
- [FIX] <summary> -- <where addressed>
- [WONTFIX] <summary> -- <reasoning>
- [DEFER] <summary> -- <follow-up ticket id>
```

Do NOT re-trigger Claude when fixes only address its own comments — the APPROVED stands.

## Step 6: Squash-merge

```bash
gh pr merge <PR> --repo <owner>/<repo> --squash --delete-branch
```

Flags:

- `--squash` is mandatory. Never substitute `--merge` or `--rebase`.
- `--delete-branch` removes the remote branch. The local branch (if you have one in a worktree) is deleted in Step 7.
- Do NOT pass `--admin` to bypass branch protection. If the merge fails because of protection rules, the PR is not actually ready - return to Step 2.
- Do NOT pass `--auto`. Auto-merge is for "merge when ready" workflows; we explicitly merge only when confirmed green.

If the command fails, capture the error verbatim before retrying. Common failures:

| Error | Cause | Fix |
|---|---|---|
| `Pull request is not mergeable` | mergeable went from `MERGEABLE` to `CONFLICTING` between Step 5 and Step 6 (main moved) | Step 3 conflict resolution |
| `At least 1 approving review is required` | Branch protection requires a human reviewer too | Ask user; do not bypass |
| `Required status check "<name>" is expected` | A required check is missing from the head SHA | Push a no-op commit or trigger the missing workflow |

## Step 7: Confirm merge

```bash
gh pr view <PR> --repo <owner>/<repo> --json state,mergedAt,mergeCommit \
  --jq '{state, mergedAt, mergeCommitSha: .mergeCommit.oid}'
```

Required: `state: MERGED`. Report the squash commit SHA to the user.

If follow-up work is waiting on this merge, open the next PR only after this confirmation succeeds. Do not prepare or keep a dependent PR open ahead of time.

## Step 7.5: Update ClickUp ticket status

Extract ticket id from branch name (`CU-<id>/...`) or PR title. Skip if none. Update the ticket via the `cup` CLI (`cup --help`).

**Label-driven (default path):** check whether the merged PR has the GitHub label `closes-clickup`. The label is the authoritative signal — it was placed deliberately by the PR author (see `managing-pr-descriptions` "ClickUp Closing Label").

```bash
gh pr view <PR> --repo <owner>/<repo> --json labels --jq '[.labels[].name]'
```

| Label present? | Action |
|---|---|
| Yes — `closes-clickup` present | `cup update <id> -s complete` |
| No, and PR type is `spec`/`chore`/`refactor`/`docs`/`test` | Leave status alone. Optionally: `cup comment <id> -m "Supporting PR #<N> merged."` |
| No, and PR type is `impl`/`feat`/`fix` | This is unusual — the closer label was forgotten. Fall back to the diff-vs-acceptance-criteria check below. |

**Fallback (no label, but PR looks like a closer):** compare PR diff to the ticket's "What the user can test" section:

| Coverage | Action |
|---|---|
| Fully implements ticket | `cup update <id> -s complete` + comment that the label was missing |
| Partially implements ticket | `cup update <id> -s "in progress"` |
| Groundwork only (not in acceptance criteria) | `cup comment <id> -m "Partial groundwork in PR #<N>."` |

## Step 8: Clean up worktree (ONLY if clean)

If the PR work happened in a worktree (`.worktrees/<name>/`), check for uncommitted changes BEFORE removing it. Lost work cannot be recovered from git after `worktree remove`.

```bash
# In the worktree directory:
git -C .worktrees/<name> status --porcelain
```

Decision matrix:

| `git status --porcelain` output | Action |
|---|---|
| Empty (clean) | Remove the worktree. |
| Non-empty (uncommitted changes, untracked files, staged-but-uncommitted) | DO NOT remove. Flag to the user with the exact `git status` output and ask whether to commit, stash, or discard. |

When clean, remove the worktree:

```bash
git worktree remove .worktrees/<name>
```

Never pass `--force` to `worktree remove` to override uncommitted changes - that silently destroys the work.

If the user explicitly says "discard everything and remove", THEN you may use `--force`, and only then.

## DOs and DON'Ts

- DO load `polling-monitoring` before any wait loop.
- DO inspect every entry in `statusCheckRollup`, not just the headline `Claude PR Code Review` row.
- DO verify state IMMEDIATELY before calling `gh pr merge` (Step 5).
- DO use `--squash --delete-branch` exactly.
- DO refuse to merge fork PRs (Claude cannot approve them).
- DO check for upstream rate-limit failures before re-triggering Claude.
- DON'T merge on `mergeStateStatus: UNSTABLE` without first identifying which non-required check failed.
- DON'T pass `--admin` to bypass branch protection.
- DON'T use the GitHub web "Resolve conflicts" editor - resolve locally with full verify pipeline.
- DON'T re-trigger Claude immediately after a rate-limit failure.
- DON'T stream `gh run watch` or use shell loops to poll.
- DON'T merge a PR with `reviewDecision: CHANGES_REQUESTED` even if all CI checks are green.
- DON'T re-trigger Claude without first loading `fixing-pull-requests` if there are stale resolved comments from prior rounds.
- DON'T wait on CI for a `CONFLICTING` PR. Workflows will not run until conflicts are resolved.
- DON'T wait on CI for a draft PR. CI is gated to skip drafts; mark the PR ready for review first.
- DON'T treat a long Claude/CI wait as quiet - re-check `mergeable` and `mergeStateStatus` on every iteration; main moving silently sends the branch to `BEHIND` or `CONFLICTING`.
- DON'T remove a worktree without checking `git status --porcelain` first. Uncommitted changes are unrecoverable after removal.
- DON'T pass `--force` to `git worktree remove` unless the user explicitly authorizes discarding the uncommitted work.
- DON'T keep re-triggering Claude review when the PR branch has stale `should-review.mjs`, `code-reviewing` skills, or `review-cli` — merge main into the branch first.

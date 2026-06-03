---
name: polling-monitoring
description: Use when polling CI checks, waiting for a deployment, monitoring a job queue, or any task that requires checking the same thing more than once.
compatibility: opencode
metadata:
  schemaVersion: "1"
  version: "1.0.0"
  stability: stable
  category: workflow
  appliesTo: any
---

## Core rule — never block the agent

**Never** use `watch`, `tail -f`, unbounded `railway logs`, or any other command that streams indefinitely.  
**Never** use shell loops (`while true`, `for`, `until`) — they run inside a single Bash tool call that produces no output until the loop exits, giving the user zero feedback.

The only safe pattern is:

1. **Check** — run a single bounded status command.
2. **Report** — surface the current state to the user right now.
3. **Decide** — if the target state is not reached, schedule a follow-up with `sleep <N> && <next check command>`, then return control.
4. **Repeat** — when the sleep+check call finishes, go back to step 1.

Each iteration is a separate Bash tool call. The user sees progress after every iteration.

## Sleep duration selection

Choose `N` based on the expected polling cadence of the target system. Bias toward shorter intervals when the command is cheap (fast, low output), longer when the system changes slowly.

| Target | Typical range | Notes |
|---|---|---|
| GitHub Actions CI (PR checks) | 30 s – 2 min | Use 30 s early while jobs are queuing; back off to 60–120 s once running |
| Railway deployment build | 30 s – 90 s | Builds usually take 2–5 min total |
| BullMQ job progress | 15 s – 60 s | Shorter for fast jobs, longer for heavy import jobs |
| Arbitrary shell command | 5 s – 30 s | Match the natural update frequency |

Never use less than 5 s — rapid polling of remote APIs can trigger rate limits.

## Pattern

Each iteration is two Bash tool calls:

**Call A — check now:**
```bash
<status-command>
```
Read the output, write a one-line summary in your text reply, then immediately issue Call B.

**Call B — wait, then check again:**
```bash
sleep <N> && <status-command>
```
When this returns, go back to step 1 (evaluate → summarise → schedule next sleep).

**Never** run the status command twice in one call (e.g. `cmd; sleep N && cmd`). That doubles output and makes the user read the same table twice per iteration.

Use `&&` after sleep — if the check command fails with a non-zero exit (e.g. `gh` rate-limited), you want to know immediately rather than silently swallow it.

## GitHub Actions / PR CI polling

Use `gh run list` and `gh run view` — they are fast and produce bounded output.

### Check PR head-commit status (all checks)

```bash
gh pr checks <PR_NUMBER> --repo <owner>/<repo>
```

Statuses: `pass`, `fail`, `pending`, `skipped`.

### Watch a specific run

```bash
gh run view <RUN_ID> --repo <owner>/<repo>
```

### Poll loop (manual iteration pattern)

```bash
# Call A — check now
gh pr checks <PR_NUMBER> --repo <owner>/<repo>
```

Summarise in one line (e.g. "3 passing, 2 pending"), then immediately:

```bash
# Call B — wait, then check again
sleep 60 && gh pr checks <PR_NUMBER> --repo <owner>/<repo>
```

After Call B returns, evaluate:
- All `pass` → done, report success.
- Any `fail` → **STOP. NEVER schedule another sleep.** Fetch logs and act NOW:
  ```bash
  gh run view <RUN_ID> --log-failed 2>&1 | head -100
  ```
- Still `pending` → start next iteration with appropriate sleep.

Adjust sleep between iterations:
- Checks still queuing → 30 s
- Checks running → 60 s
- Long-running job (e.g. deploy, E2E) → 90–120 s

### Main drift while polling CI

CI runs on a synthetic merge commit of `main` + PR branch. If `main` advances mid-run, your green CI reflects a stale base and may break on merge. Every other iteration:

```bash
git fetch origin && git log HEAD..origin/main --oneline
```

If main moved: merge into branch, repush, restart polling.

### Get run ID for a PR

```bash
gh pr checks <PR_NUMBER> --repo <owner>/<repo> --json name,state,link
```

Or:

```bash
gh run list --repo <owner>/<repo> --branch <branch-name> --limit 5
```

## Railway deployment polling

```bash
# Call A — check now
railway deployment list --service <service> --environment production --limit 3 --json
```

Then:

```bash
# Call B — wait, then check again
sleep 30 && railway deployment list --service <service> --environment production --limit 3 --json
```

Terminal states: `SUCCESS`, `FAILED`, `CRASHED`, `REMOVED`.  
Transient states: `BUILDING`, `DEPLOYING`.

## BullMQ job polling

```bash
# Call A — check now
railway logs --service worker --environment production --since 2m --lines 100 --json
```

Then:

```bash
# Call B — wait, then check again
sleep 30 && railway logs --service worker --environment production --since 2m --lines 100 --json
```

## Termination conditions

Always define what "done" looks like before starting:

| Scenario | Done when |
|---|---|
| CI under a PR | All checks `pass` or at least one `fail` |
| Railway deployment | Status = `SUCCESS`, `FAILED`, or `CRASHED` |
| BullMQ job | Log shows `completed` or `failed (attempt N)` with no further retries |
| Arbitrary command | Exit code 0 and expected output present |

After each iteration, explicitly state the current status and whether you're continuing or stopping.

## Output format

After each check, write **one line** in your text reply — do not repeat or quote the raw command output:

```
CI: 3 pass, 2 pending — checking again in 60s
CI: 3 pass, 1 pending, 1 fail — checking again in 60s
```

Only surface the full check list if something **changed** since the previous iteration (e.g. a job newly failed or newly passed).

When the terminal state is reached, emit a single verdict line:

```
CI green — all checks passed on PR #<N>
CI failed — <job name(s)> failed
```

Never copy-paste the raw tool output table into your reply — the user can see tool output directly.

## DOs and DON'Ts

**DO:**
- Use two separate Bash tool calls per iteration: one to check now, one to sleep then check again.
- Summarise in one line of text after each check — do not quote or reprint raw tool output.
- Only mention individual check names when something changes (new failure, new pass).
- Choose sleep duration based on expected system cadence (table above).
- Define a termination condition before starting to poll.
- Increase sleep if nothing has changed across 3+ consecutive checks.

**DON'T:**
- Don't use `watch`, `tail -f`, or any indefinitely streaming command.
- Don't use shell loops (`while`, `for`, `until`) inside a single Bash call.
- Don't run the status command twice in one Bash call (`cmd; sleep N && cmd`) — it doubles output for no benefit.
- Don't copy-paste raw command output tables into your text reply.
- Don't sleep less than 5 s for remote API calls.
- Don't poll indefinitely without a timeout — set a maximum iteration count or wall-clock limit and bail out with a status report if exceeded.

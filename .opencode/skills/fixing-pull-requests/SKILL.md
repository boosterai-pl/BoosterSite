---
name: fixing-pull-requests
description: Use when fixing a PR, resolving review threads, addressing review feedback, dismissing or re-triggering Claude reviews, pushing fixes, or responding to CI failures. Also use when resolving GitHub review threads or handling WONTFIX/deferred findings to prevent infinite review loops.
compatibility: opencode
metadata:
  schemaVersion: "1"
  version: "1.0.0"
  stability: stable
  category: workflow
  appliesTo: any
---

## Inputs

- PR number or URL (required)
- Pre-fetched PR data may be provided by the invoking command -- skip re-fetching what's already available

## Workflow

Copy and track progress:

```
- [ ] Step 1: Checkout PR and verify base branch
- [ ] Step 2: Gather reviews, threads, and CI checks
- [ ] Step 2b: Triage CI failures -- fix or document each failing check
- [ ] Step 3: Assess all unresolved comment threads (VALID-FIX / VALID-WONTFIX / INVALID / STALE)
- [ ] Step 3b: Apply finding rule and fix-shape gate
- [ ] Step 4: Fix approved VALID-FIX items via developer subagent; verify fixes were applied
- [ ] Step 5: Run `task verify` and `task test:e2e` -- loop until both pass
- [ ] Step 6: Resolve threads per triage outcome
- [ ] Step 7: Spawn code review subagent -- do NOT post findings to GitHub
- [ ] Step 8: Triage review findings and fix VALID-FIX items; re-run verify if fixes applied
- [ ] Step 9: Commit and push (skip commit if nothing changed)
- [ ] Step 10: Re-request reviews from human reviewers with addressed VALID-FIX items
- [ ] Step 11: Post fix report
```

Execute steps in order. Do NOT skip steps unless explicitly noted.

### Step 1: Checkout

```bash
gh pr checkout <number-or-url>
git pull
```

Check `baseRefName`:

- Targeting `main`: proceed normally
- Targeting another branch: this is a stacked PR. Report "blocked on parent PR" and stop if parent is not merged

### Step 2: Gather data

Run in parallel:

```bash
# Reviews
gh api repos/{owner}/{repo}/pulls/<number>/reviews --jq '.[] | {id, user: .user.login, state, body}'

# Review thread ids and resolution state; paginate reviewThreads until complete
gh api graphql -f query='query($threadsCursor: String) { repository(owner: "<owner>", name: "<repo>") { pullRequest(number: <number>) { reviewThreads(first: 50, after: $threadsCursor) { nodes { id isResolved } pageInfo { hasNextPage endCursor } } } } }' -F threadsCursor=null

# Thread comments; run per thread id and paginate comments with that thread's cursor until complete
gh api graphql -f query='query($threadId: ID!, $commentsCursor: String) { node(id: $threadId) { ... on PullRequestReviewThread { comments(first: 50, after: $commentsCursor) { nodes { id body author { login } path line } pageInfo { hasNextPage endCursor } } } } }' -F threadId='<threadId>' -F commentsCursor=null

# CI checks
gh pr checks <number>
```

Use the GraphQL `reviewThreads` response exclusively for comment triage. The REST `pulls/<number>/comments` endpoint does not expose `isResolved` and will return comments from already-resolved threads -- do NOT use it for thread triage.
Paginate both `reviewThreads` and each thread's `comments` with `pageInfo { hasNextPage endCursor }` until complete. Comment cursors are per thread; never reuse one `commentsCursor` across multiple threads.

### Step 2b: Triage CI failures

For each failing check from `gh pr checks`:

- **Fixable**: broken test, lint error, typecheck failure, build error -- fix it (spawn developer subagent if needed)
- **Infra/flaky**: intermittent network failure, runner timeout, external service -- note in the report as a remaining blocker, do not attempt to fix
- **Unknown**: read the job logs (`gh run view <run-id> --log-failed`) before classifying

Do not proceed to Step 3 while fixable CI failures remain.

### Step 3: Assess comments

For each unresolved comment thread, determine:

- **VALID-FIX**: real issue, fix it
- **VALID-WONTFIX**: real concern but out of scope, architectural, or needs user decision. Reply explaining why
- **INVALID**: already fixed, misunderstanding, or style preference that contradicts project conventions. Reply explaining why (human comments only -- do NOT reply to bot comments)
- **STALE**: refers to code that no longer exists or was already addressed

Read the referenced files before assessing. Do NOT guess.

**Scope:** triage applies to ALL inline review comments, not only comments on the latest review. An `APPROVED` review can carry actionable warnings or suggestions; those still require per-comment triage. Branch-protection approval does not reduce triage scope.

### Step 3b: Finding rule and fix-shape gate

For every VALID-FIX item, record:

- rule slug and exact rule text for rule-based bot findings. Extract the slug from the `[rule-slug]` comment prefix or CI finding output, then fetch the canonical rule text with `.opencode/skills/code-reviewing/engine/review-cli rule --slug <slug>` or `.opencode/skills/code-reviewing/engine/review-cli rule --slug <slug> --domain <domain>` when disambiguation is needed.
- `source: human review` plus the reviewer and concern, for human findings without a rule slug
- review id
- head SHA
- file and line
- whether it targets PR-introduced code or pre-existing code only exposed by the PR
- approved fix shape

Approve only the smallest fix shape:

- Do not create shared components, exported props, public APIs, or cross-package abstractions unless the finding explicitly requires that shape.
- Prefer narrowing, deleting, or reverting changed code over layering another abstraction.
- Allow tightly-coupled supporting edits required for the minimal fix. Stop and ask the user before broader abstraction, public API, cross-package, or unrelated file changes.
- If the finding appears caused by an over-broad review rule rather than the implementation, stop and report that instead of editing production code.

### Step 4: Fix valid issues

Spawn a developer subagent to fix all VALID-FIX items with approved fix shapes only. Pass:

- The list of findings with file paths and line numbers
- The Step 3b records, including rule slug and exact rule text for rule-based bot findings, or `source: human review` plus reviewer and concern for human findings, review id, head SHA, PR-introduced vs pre-existing classification, and approved fix shape
- Project conventions from AGENTS.md
- Clear instruction to apply only the approved fix shape
- If fixing requires choosing behavior, scope, or architecture not explicit in the finding, stop and report a clarification blocker. Do not guess.
- If no approved minimal fix shape exists, report UNFIXABLE. Do not invent a broader solution.
- Fix only VALID-FIX items and verification failures caused by those fixes. Do not refactor, rename, reformat, or clean up nearby code unless required by the finding.

After the subagent returns, verify each fix was applied: re-read the changed files and confirm the issue is resolved. If a fix is missing or incorrect, re-spawn the subagent with targeted instructions.

### Step 5: Verify LOCALLY before pushing

**NEVER push a fix without local verify passing first.**

```bash
task verify:pkg -- <package-name>    # run for every package you modified
```

Replace `<package-name>` with the scoped package name from the project's `package.json` (e.g. `@myorg/api`). `task verify:pkg` runs format + lint + typecheck + unit tests for one package. Fast (~5–10 s with turbo cache). No e2e.

On failure, fix the error, then re-run before pushing.

**Consistently failing e2e = real regression, NOT a timing issue. NEVER add a timeout to "fix" it.**

1. Run `--headed` or inspect the Playwright screenshot/video to see what actually renders.
2. Diff what the relevant component produces before vs after your changes.
3. Fix the broken code path (wrong component, missing prop, removed flag).

Timeout adjustments require profiling proof and an inline comment.

### Step 6: Resolve threads

**MANDATORY — do NOT skip this step.** Every review thread MUST be either resolved or replied to. Unresolved threads signal to the reviewer that their feedback was ignored.

After verification passes, resolve threads in bulk:

```bash
gh api graphql -f query='mutation { resolveReviewThread(input: {threadId: "<threadId>"}) { thread { isResolved } } }'
```

- **VALID-FIX items**: delete the bot comment (`gh api -X DELETE repos/{owner}/{repo}/pulls/comments/<id>`). The fix speaks for itself — no reply needed, no thread to resolve.
- **INVALID/STALE items**: delete the bot comment. Reduces noise. If the finding was actually valid, the next review will re-raise it.
- **VALID-WONTFIX items**: **CRITICAL — you MUST reply with a rationale explaining WHY you are not fixing this. Do NOT resolve the thread — leave it unresolved.** If you silently resolve or delete a WONTFIX thread without replying, the next review will raise the exact same finding again because the review flow only suppresses acknowledged findings when the thread has a reply. Every WONTFIX thread MUST have a reply. No exceptions.
- **Needs user input**: do NOT resolve, delete, or reply — report in Step 11

### Step 6a: Closeout audit (gate before push/merge)

Before any commit, push, or merge action, produce a thread ledger covering every inline comment fetched in Step 2:

- thread id + comment id
- triage outcome (FIX / WONTFIX / INVALID / STALE)
- GitHub action taken (resolved / deleted / replied)
- review state of the parent review (APPROVED / CHANGES_REQUESTED / etc.)

If any comment has no recorded GitHub action — including comments on APPROVED reviews — Step 6 is incomplete and the PR is NOT merge-ready.

### Step 7: Code review

Spawn a `reviewer` subagent to orchestrate a full code review. The subagent must:

1. Read `.opencode/skills/code-reviewing/SKILL.md` for ground rules, then `.opencode/skills/code-reviewing/ORCHESTRATION.md` for the full workflow
2. Follow the orchestration steps: spawn reviewer sub-subagents in parallel (one per domain, including conditional subagent 6 for UI PRs)
3. Each sub-subagent loads the `code-reviewing` skill and uses `.opencode/skills/code-reviewing/engine/review-cli` as the only review engine
4. Scope: all files changed in the PR (`gh pr diff <number> --name-only`)
5. Compile and deduplicate findings from all reviewers
6. **CRITICAL: do NOT post anything to GitHub and do NOT run submit-review.mjs. The local compile step may write `.review-sessions/<branch>/review-comments.json`; return the findings in the response only.**

### Step 8: Assess review findings

For each finding from the reviewer subagent, apply the same triage as Step 3:

- **VALID-FIX**: fix it
- **VALID-WONTFIX**: note for the report
- **INVALID**: discard

If there are VALID-FIX items, spawn a developer subagent to fix them, then re-run `task verify` and `task test:e2e`.

### Step 9: Commit and push

**Step 5 gate is mandatory before push.** While CI runs, check main drift — see `polling-monitoring` "Main drift while polling CI".

```bash
git add -A
git diff --cached --exit-code || git commit -m "fix: address review feedback"
git push
```

Review staged files with `git diff --cached --stat` before committing. If unexpected files appear (build artifacts, `.env`, credentials), unstage them with `git reset HEAD <file>`. The `--exit-code` guard skips the commit when nothing changed (all comments were INVALID/STALE).

If pre-push hooks fail, fix and retry.

### Step 10: Re-request reviews

For human reviewers who left CHANGES_REQUESTED and had at least one VALID-FIX item addressed:

```bash
gh api repos/{owner}/{repo}/pulls/<number>/requested_reviewers -f reviewers[]="<login>"
```

Skip re-requesting reviews from reviewers whose only open items are VALID-WONTFIX. Those reviewers should receive a reply comment explaining the rationale before any re-review is triggered.

For Claude bot reviews:

1. Dismiss the CHANGES_REQUESTED review:
   ```bash
   gh api -X PUT repos/{owner}/{repo}/pulls/<number>/reviews/<review_id>/dismissals -f message="Fixes applied"
   ```
2. Re-trigger by adding the `review` label:
   ```bash
   gh pr edit <number> --add-label "review"
   ```

### Step 11: Report

```
## PR #<number> Fix Report

**Fixed (<count>):**
- <one-liner per fix>

**Won't fix (<count>):**
- <one-liner + rationale>

**Discarded (<count>):**
- <one-liner per invalid/stale comment>

**Remaining blockers:**
- <anything still blocking merge>
```

Omit sections with zero items.

## Pagination

**CRITICAL: Always use `--paginate` or `?per_page=100` when querying PR comments or reviews over REST.** The GitHub REST API returns 30 items per page by default. PRs with multiple review rounds can have 100+ comments. Omitting pagination silently truncates results — you will miss comments, count wrong, and report false verification.

For GraphQL `reviewThreads` and thread comments, request enough items explicitly and paginate with `pageInfo { hasNextPage endCursor }` until complete. Do not assume `first: 100` or `comments(first: 3)` is sufficient on large PRs.

## Orchestration Rule

**NEVER delegate this workflow to a subagent.** The agent that loaded this skill orchestrates the loop. Delegate only:
- code fixes → `developer` subagent
- review passes → `reviewer` subagent

Never tell a subagent to "fix and merge the PR". Every triage decision and merge action stays with the orchestrator.

## Review Round Limit

**Maximum 3 review-fix rounds.** After 3 rounds: **STOP. Do NOT merge. Do NOT dismiss the review.**

Report remaining unresolved findings to the user and wait for explicit instruction. The user decides whether to fix, mark WONTFIX, or merge with known open items. The round limit is a convergence guardrail, not a merge bypass.

## DOs and DON'Ts

- DO resolve every addressed thread — this is mandatory, not optional (Step 6)
- DO reply to threads you intentionally skip or handle differently than requested
- DO run `task verify:pkg -- <package-name>` for every package you modified before every push (Step 5)
- DO assess comments before blindly fixing -- reject invalid ones
- DO record rule slug, exact rule text, review id, head SHA, code provenance, and approved fix shape before fixing
- DO use subagents for fixing (developer) and reviewing (reviewer)
- DO triage CI failures before addressing review comments
- DO verify developer subagent output before proceeding
- DO use `--paginate` or `?per_page=100` on every `gh api` call that returns comments or reviews
- DON'T leave addressed threads unresolved — reviewers interpret this as "feedback ignored"
- DON'T reply "Fixed in \<commit\>" to comments you addressed as requested — just resolve the thread
- DON'T resolve WONTFIX threads — reply with rationale and leave unresolved. Silently resolving WONTFIX threads causes infinite review loops.
- DON'T broaden a fix beyond the approved Step 3b fix shape; report UNFIXABLE instead
- DON'T post code review findings to GitHub -- internal only
- DON'T merge the PR -- only prepare it for merge
- DON'T fix architectural concerns without user approval
- DON'T reply to INVALID bot comments explaining why they're wrong -- just resolve the thread. DO reply to VALID-WONTFIX bot comments with rationale (same as human comments).
- DON'T re-trigger review after 3 rounds — stop, report to user, wait for instruction.
- DON'T treat APPROVED as "no actionable comments". Approved-with-warnings is still triage workload — every inline comment goes through Step 3 classification regardless of overall review decision.
- DON'T delegate this entire workflow to a subagent.

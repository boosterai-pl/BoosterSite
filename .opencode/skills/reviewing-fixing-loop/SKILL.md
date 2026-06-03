---
name: reviewing-fixing-loop
description: Use when polishing implementation quality, running review loops, fixing code until clean, iterating on code review feedback, loop not converging, reviewer reverting prior fixes, or when user says "fix loop", "review loop", "polish this", "keep fixing until done".
license: MIT
compatibility: opencode
metadata:
  schemaVersion: "1"
  version: "1.0.0"
  stability: stable
  category: workflow
  appliesTo: any
  requires: code-reviewing
---

## Orchestrator Protocol

You are the orchestrator. You do NOT review or fix code yourself. You spawn subagents for all review and fix work. Reviewer subagents are always fresh (never reuse `task_id`). The fixer subagent is spawned fresh in round 1, then resumed via `task_id` in subsequent rounds.

**Critical rule: the reviewer is READ-ONLY. It never edits files. Only the fixer edits files. A PASS can only come from a reviewer that found zero issues — not from one that "fixed things itself."**

**Critical rule: every reviewer runs the SAME full-scope review with the SAME criteria. Round 2+ reviewers do NOT receive previous findings. They review from scratch. PASS means zero findings on a clean full review — not "previous issues were addressed."**

### Before Starting

1. Check `git status`. Decide:
   - **Only staged/recently committed changes from current work** → commit automatically with a descriptive message
   - **Mixed, unrelated, or ambiguous changes** → ask the user to commit first, then re-invoke
   - **Clean working tree with recent commits** → proceed
2. Identify the baseline: the commit(s) or working copy state the reviewer should examine
3. Gather project review criteria (from pre-fetched data in the command, or by checking yourself):
   - `.opencode/skills/code-reviewing/SKILL.md` and `.opencode/skills/code-reviewing/ORCHESTRATION.md` (the agentkit company skill; older installs may have it under `.agents/skills/code-reviewing/`)
   - `AGENTS.md` or `CLAUDE.md` at project root (code style, conventions, quality rules)
   - Automated check commands (look for `task verify`, `Taskfile.yml`, test/lint/build commands in AGENTS.md)

### Spawn Protocol

**PR mode** (use when a PR number exists):
  - REVIEWER = parallel domain subagents per the `code-reviewing` skill's ORCHESTRATION.md
  - Compile step runs `.opencode/skills/code-reviewing/engine/review-cli compile` to merge domain findings
  - Pass the compiled finding list to the triage step

**Worktree mode** (use when no PR exists yet):
  - REVIEWER = parallel domain subagents per the `code-reviewing` skill's ORCHESTRATION.md
  - Compile step runs `.opencode/skills/code-reviewing/engine/review-cli compile` to merge domain findings

### The Loop

```
round = 0
max_rounds = 3

LOOP:
  round += 1

  STEP 1 — REVIEW (read-only subagent):
    Spawn REVIEWER subagent (fresh Task tool call).
    The reviewer MUST NOT edit any files. It only reads, runs checks, and reports.
    IMPORTANT: pass the SAME prompt every round — same scope, same criteria, same
    automated check commands. Do NOT pass previous findings or fixer summaries.
    The reviewer must evaluate the code as-is with no knowledge of prior rounds.

    DEFERRED EXCLUSIONS: Include the current DEFER ledger in the reviewer prompt
    (see "Deferred Exclusions in Reviewer Prompt" below). This prevents the reviewer
    from re-flagging items that have already been triaged out of scope.

  STEP 2 — TRIAGE findings (orchestrator does this, NOT a subagent):
    IF STATUS: PASS (zero findings) → exit loop, report success to user
    IF STATUS: FAIL → triage each finding before sending to fixer.

    For EACH finding, the orchestrator assigns one of:

      FIX      — legitimate issue, send to fixer
      REJECT   — contradicts the implementation intent, spec decisions, user's stated
                  preferences, or prior accepted fixes. Do NOT fix. Log reason.
      DEFER    — valid concern but out of scope for this loop (architectural, needs
                  user decision, or would require large-scale refactor). Do NOT fix.
                  Log reason.

    Triage criteria (check in order):
    a) Does the finding contradict an explicit decision made by the user, the spec,
       or the implementation requirements passed to the loop? → REJECT
    b) Does the finding undo or reverse a fix that was applied in a previous round
       and was NOT re-flagged as broken by automated checks? → REJECT
    c) Was the finding reported as UNFIXABLE by the fixer in a previous round? → DEFER
       (prevents spin: the fixer already declared it cannot fix this)
    d) Is the finding about style/preference that conflicts with project conventions
       already established in AGENTS.md / code-reviewing skill? → REJECT
    e) Is the finding a genuine bug, correctness issue, or convention violation? → FIX
    f) Is the finding valid but requires user input or architectural change? → DEFER

    After triage:
    - If ALL findings are REJECT or DEFER (zero FIX items) → exit loop, report
      triaged results to user (treat as effective PASS with notes)
    - If round == max_rounds → exit loop, report remaining FIX items and
      accumulated REJECT/DEFER items to user
    - If there are FIX items → continue to step 3 with only FIX items

  STEP 3 — FIX (code-editing subagent):
    Round 1: Spawn FIXER subagent (fresh Task tool call). Save the returned task_id.
    Round 2+: Resume the FIXER subagent (pass saved task_id).
    The fixer receives ONLY the FIX-triaged findings. REJECT and DEFER items are
    withheld — the fixer never sees them.
    Round 1 prompt: full fixer template (conventions, scope, automated checks, findings).
    Round 2+ prompt: findings only. Do NOT re-inject conventions or scope — the agent
    already has them.

  STEP 4 — EVALUATE fixer response:
    Read fixer summary. Check the VERIFY line first:
    - If VERIFY: fail → re-prompt fixer via task_id up to 2 times, then stop and report with the exact failing output. Never advance rounds with broken code.
    - If VERIFY: pass (or no automated checks) → continue normally.
    Accumulate any UNFIXABLE items reported by fixer into the deferred list.
    These UNFIXABLE items will be auto-triaged as DEFER if re-reported by the
    next reviewer (see triage criterion c).
    **Commit before re-planning:** run `git add -A && git commit` BEFORE running
    `review-cli reset && review-cli plan`. The plan captures a diff snapshot at
    execution time. If plan runs before the fixer's commit, round-2 reviewers
    receive the unfixed diff and re-flag already-fixed items.
    → go to STEP 1 (next round, fresh reviewer)
```

**The orchestrator MUST NOT skip step 3 and go straight to reporting after step 2 when there are FIX-triaged findings. If the triage produces at least one FIX item, a fixer MUST be spawned. The orchestrator MUST NOT exit the loop after a fixer runs without spawning a new reviewer to verify.**

### Triage Ledger

The orchestrator maintains a running triage ledger across rounds. This is internal bookkeeping -- never passed to reviewers or fixers.

```
TRIAGE LEDGER (round {N}):
  FIX:
    - [Finding #1] {summary} → sent to fixer
  REJECT:
    - [Finding #3] {summary} → reason: contradicts spec decision X / reverses round 1 fix Y
  DEFER:
    - [Finding #2] {summary} → reason: needs user decision on Z
```

The ledger is used to:

- Detect flip-flop patterns (reviewer A says "add X", reviewer B says "remove X") -- REJECT the latter
- Track accumulated DEFER/REJECT items for the final report
- Prevent the loop from spinning on contradictory or subjective findings

**The DEFER ledger lives only in orchestrator conversation memory. Never write it to a file.**

### Spawning Subagents

Default `subagent_type` is `"coding"` for both reviewers and fixers. The caller may override subagent types to match project conventions (e.g., `"reviewer"` for read-only review agents, `"developer"` for agents that need to run verification tools). The key constraint is role separation: the reviewer subagent MUST NOT edit files, and the fixer subagent MUST NOT review. Save the fixer's returned `task_id` after round 1 and pass it in subsequent rounds to resume the same session.

**Reviewer prompt template:**

The prompt below is used identically for every round. Do NOT add previous findings, fixer summaries, or any round-specific context. Each reviewer sees the same prompt and evaluates the code from scratch.

The ONLY round-specific addition is the DEFERRED EXCLUSIONS section (see below).

```
You are a code reviewer. You MUST NOT edit, write, or modify any files. You are read-only.
Your job is to find issues. You do not fix them.

## Scope
{scope_description from user's command argument}

## What to review
{changed files list, commit range, or "working copy changes" — orchestrator decides}

## Review criteria

### Automated checks
Run these commands and report any failures as findings:
{automated check commands, or "No automated checks found — skip this section"}

### Project review standards
{contents of .opencode/skills/code-reviewing/SKILL.md, or "No code-reviewing skill found"}

### Project conventions
{relevant sections from AGENTS.md/CLAUDE.md, or "No project conventions file found — use general clean code principles"}

### Spec requirements
{any requirements context the orchestrator has from the conversation}

## Deferred exclusions (do NOT re-flag these)
The following items have already been reviewed and triaged as out of scope for this loop.
Do not report them as findings. If you independently identify the same issue, skip it.
{deferred_exclusions list, or "None — no items deferred yet"}

Format used by orchestrator to populate this section:
  - [{file}:{line-or-area}] {one-line description of the deferred concern} -- REASON: {why deferred}

## Your task
1. Run automated checks. Report failures as findings.
2. Read the changed files. Do NOT edit them.
3. Review against all criteria above.
4. Skip any finding that matches an item in the Deferred exclusions list above.
5. Report every other issue found. Be specific: file path, line number, what is wrong, why.
6. Do NOT edit any files. Do NOT fix anything. Report only.

## Required output format

STATUS: PASS
Summary: {one sentence — all criteria met, no issues found}

OR

STATUS: FAIL
Findings:
1. [{file}:{line}] {description of issue and why it is wrong}
2. [{file}:{line}] {description}
...
Summary: {count} issues found. {one sentence overview}
```

**Fixer prompt template (round 1):**

```
You are a code fixer. Fix the specific issues listed below. Nothing else.

## Scope
{scope_description}

## Project conventions
{relevant sections from AGENTS.md/CLAUDE.md, or "Use general clean code principles"}

## Issues to fix
These were found by a code reviewer. Fix every one of them.
{numbered findings from reviewer — paste the full findings list}

## Your task
1. Read the project's AGENTS.md or CLAUDE.md if available.
2. Fix each issue. Reference by finding number.
3. MANDATORY VERIFY GATE — after ALL fixes are applied, run the verification commands:
   - {automated check commands, or "No automated checks — read the changed code to verify correctness"}
   - If verification fails (type errors, test failures, lint errors), fix the failures
     before reporting. Do NOT commit or report FIXES if verification is failing.
   - If you cannot make verification pass, report the block in UNFIXABLE with the
     exact error output.
4. Do NOT fix things not listed above. Do NOT refactor, rename, reformat, or clean up nearby code unless required by a listed finding or by verification failures caused by your fix.
5. If a finding cannot be fixed (needs user decision, architectural change, or is out of scope),
   explain why in the UNFIXABLE section.

## Required output format

FIXES:
1. [Finding #{n}] {what you changed and where}
2. [Finding #{n}] {what you changed and where}
...
UNFIXABLE:
- [Finding #{n}] {why this cannot be fixed}

(If all findings were fixed, omit the UNFIXABLE section.)

VERIFY: {pass | fail — one sentence with the command run and outcome}

Summary: {one sentence — what was fixed, what was not}
```

**Fixer prompt template (round 2+):**

```
New findings from round {N}. Fix every one of them. Same rules as before.

## Issues to fix
{numbered findings from reviewer — paste the full findings list}

## Your task
1. Fix each issue. Reference by finding number.
2. MANDATORY VERIFY GATE — after ALL fixes are applied, run the verification commands:
   - {automated check commands, or "No automated checks — read the changed code to verify correctness"}
   - If verification fails, fix the failures before reporting. Do NOT report FIXES
     if verification is failing. Report the block in UNFIXABLE with the exact error.
3. Do NOT fix things not listed above. Do NOT refactor, rename, reformat, or clean up nearby code unless required by a listed finding or by verification failures caused by your fix.
4. If a finding cannot be fixed, explain why in the UNFIXABLE section.

## Required output format

FIXES:
1. [Finding #{n}] {what you changed and where}
...
UNFIXABLE:
- [Finding #{n}] {why this cannot be fixed}

VERIFY: {pass | fail — one sentence with the command run and outcome}

Summary: {one sentence}
```

### Reporting to User

**On PASS (loop exited successfully):**

> Review-fix loop completed in {N} round(s). All checks pass.
> {reviewer's summary from the passing round}
>
> {if any REJECT/DEFER items accumulated across rounds, append:}
> Triaged out (not fixed):
>
> - REJECT: {finding} -- {reason}
> - DEFER: {finding} -- {reason}

**On effective PASS (all findings triaged as REJECT/DEFER):**

> Review-fix loop completed in {N} round(s). Reviewer reported {count} finding(s),
> all triaged as not actionable in this loop.
>
> Rejected findings (contradictory or invalid):
>
> - {finding} -- {reason}
>
> Deferred findings (valid but out of scope):
>
> - {finding} -- {reason}

**On max rounds reached:**

> Review-fix loop stopped after {max_rounds} rounds. Remaining issues:
> {numbered list of FIX-triaged findings from last reviewer that were not resolved}
>
> Triaged out across all rounds:
>
> - REJECT: {finding} -- {reason}
> - DEFER: {finding} -- {reason}
>
> FIX items above may need manual attention or a different approach.

**On fixer reporting UNFIXABLE items:**
Include in the report:

> The fixer could not resolve these and they need your input:
> {UNFIXABLE items with explanations}

### Rules

1. **Never review or fix code yourself** — all work goes through subagents
2. **Reviewer always fresh, fixer always resumed** — never pass `task_id` to a reviewer. Always pass `task_id` to the fixer (except round 1, which spawns fresh). The reviewer must evaluate code from scratch; the fixer benefits from accumulated context.
3. **Reviewer is strictly read-only** — if a reviewer edits files, its output is invalid. The reviewer's only job is to find and report issues. It must not fix anything.
4. **Fixer stays in scope** — only fixes what the orchestrator triaged as FIX. No drive-by refactoring
5. **Structured output only** — if a subagent returns free-form prose without the required format, treat it as FAIL and re-prompt once, then escalate to user
6. **3 rounds max** — non-negotiable. After 3, stop and report
7. **Same prompt every round** — every reviewer gets the identical base prompt with the same scope and criteria. No previous findings, no fixer summaries. The ONLY round-specific addition is the growing DEFERRED EXCLUSIONS list. PASS means zero findings on a clean full review (excluding deferred items).
8. **Never short-circuit the loop** — after a FAIL with FIX-triaged findings, always spawn a fixer. After a fixer, always spawn a new reviewer. The only exit paths are PASS, effective PASS (all findings triaged out), or max rounds.
9. **Triage is mandatory** — the orchestrator MUST assess every finding before passing it to the fixer. Never forward reviewer findings blindly. The orchestrator is the gatekeeper.
10. **Fixer never sees rejected findings** — REJECT and DEFER items are withheld from the fixer prompt. The fixer only receives FIX items.
11. **Flip-flop detection** — if a finding in round N reverses a fix applied in round N-1 (and automated checks still pass), REJECT it. The loop must converge, not oscillate.
12. **Intent preservation** — the orchestrator must know the implementation intent (from spec, user decisions, or conversation context). Findings that contradict stated intent are REJECT, not FIX.
13. **Fixer verify gate is mandatory** — the fixer MUST pass verification (type checks, tests, lint) before reporting FIXES. If VERIFY: fail is returned, the orchestrator re-prompts the fixer to fix verification failures before proceeding. Never advance to a new review round with broken code.
14. **Spawn protocol** — choose mode upfront and keep it for every round: PR mode (use `code-reviewing` parallel domain subagents when a PR number exists) or Worktree mode (single composite reviewer subagent when no PR exists yet). Do not mix modes mid-loop.

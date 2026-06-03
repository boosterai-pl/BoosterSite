# Prior Review Triage

## Purpose

Classify prior review comments as resolved or still-open so the orchestrator can filter duplicate findings before posting. This subagent runs in parallel with domain subagents.

## Budget

This is an API-only triage — use only `gh api` calls. Do NOT read source code files, grep, or analyze code. Keep tool calls to the absolute minimum.

**CRITICAL: Always use `--paginate` when fetching comments and reviews. The default page size is 30. PRs with multiple review rounds can have 100+ comments. Omitting pagination silently truncates results and produces wrong classifications.**

## Steps

1. Fetch prior review comments: `gh api repos/{owner}/{repo}/pulls/{number}/comments --paginate`
2. Fetch prior reviews: `gh api repos/{owner}/{repo}/pulls/{number}/reviews --paginate`
3. If no prior comments or reviews exist from any bot actor (username ending in `[bot]`, e.g. `claude[bot]`, `github-actions[bot]`, or any project-specific reviewer bot), return exactly: `TRIAGE: first-review` and stop.
4. For each prior comment by any bot actor (username ending in `[bot]`), gather TWO pieces of evidence:
   - **Reply evidence**: does a non-bot comment exist with `in_reply_to_id` pointing to this comment's ID?
   - **Code evidence**: was the file modified at or near the commented line in a subsequent commit? (Use `gh api repos/{owner}/{repo}/pulls/{number}/files --paginate` to check file patches, NOT by reading source files.)
5. Classify each prior finding using BOTH pieces of evidence:
   - **RESOLVED-FIXED** — code was modified at or near the commented line. The issue was addressed in code regardless of thread resolution status.
   - **RESOLVED-ACKNOWLEDGED** — a non-bot reply exists explaining the current code is intentional (e.g. "WONTFIX: ...", "intentional", "by design", "won't fix"). The author saw it and chose not to fix.
   - **STILL-OPEN** — no non-bot reply AND no code change at that location. **A thread resolved on GitHub without a reply or code change is STILL-OPEN.** GitHub resolution status alone is not sufficient evidence.
6. Return a structured triage report in this exact format:

```
TRIAGE: <n> resolved, <m> still-open

RESOLVED:
- <file>:<line> [<RESOLVED-FIXED|RESOLVED-ACKNOWLEDGED>] <rule-slug or concern summary>

STILL-OPEN:
- <file>:<line> <rule-slug or concern summary>
```

## Filtering Rules (applied by orchestrator after compile)

- A domain finding that matches a RESOLVED-FIXED item (same file, same concern) MUST be dropped.
- A domain finding that matches a RESOLVED-ACKNOWLEDGED item (same file, same concern, author already replied with rationale) MUST be dropped.
- A domain finding that is a minor variation of a RESOLVED item (same concern on a nearby line, same category the author already addressed) MUST be dropped.
- STILL-OPEN items may be re-raised only if independently confirmed by a domain subagent.
- Do NOT contradict prior review advice. If round N said "do X" and the author did X, do not say "undo X".
- When in doubt, drop the finding.

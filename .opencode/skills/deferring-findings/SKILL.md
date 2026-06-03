---
name: deferring-findings
description: Use when you encounter a bug you should not fix in the current scope, a decision you're deferring, a gotcha or obstacle you had to work around, or a missing convention / doc gap — during planning or implementation. Also use when something seems "out of scope", "pre-existing", or "unrelated", when you notice a bug while working on something else, or when you're unsure "should I fix this while I'm here". Capture it with `agentkit findings add` instead of dropping it or expanding scope to fix it.
license: MIT
compatibility: opencode
metadata:
  schemaVersion: "1"
  version: "1.1.0"
  stability: stable
  category: meta
  appliesTo: any
---

## The discipline

**Defer, don't drop. Defer, don't scope-creep.**

If something is outside the current task but worth remembering, capture it. Do NOT silently ignore it. Do NOT expand the current change to fix it.

## When to defer

- A bug or defect that is real but outside this task's scope.
- A decision you are punting / leaving for a later session.
- A gotcha or non-obvious obstacle you worked around.
- A convention that is missing, unclear, or contradicts the code.
- A doc that is stale, incomplete, or absent where it is needed.

## When NOT to defer

- In-scope work — just do it.
- Trivial one-offs that need no follow-up.
- Anything already tracked in ClickUp or a prior finding.

## How to capture

Write the finding body to a temp markdown file first (rich content breaks as a shell argument), then run:

```sh
agentkit findings add \
  --change <change-id> \
  --type <gotcha|deferred-decision|obstacle|concern|convention-gap> \
  --scope <local|general> \
  --title "<short title>" \
  --context "<file path or area + when you hit this>" \
  --body-file /tmp/finding-body.md
```

Or pipe via stdin:

```sh
cat /tmp/finding-body.md | agentkit findings add \
  --change <change-id> \
  --type <type> --scope <scope> \
  --title "<short title>" \
  --context "<context>" \
  --body-stdin
```

**`--change` is optional when the apply orchestrator has run `agentkit change set <change-id>` at session start** — the pinned value is worktree-local and all subagents share the same filesystem. Pass `--change` explicitly only if you need to override the pinned change or the orchestrator did not pin one.

There is **no inline `--body` flag** — shell-escaping hazard. Always use `--body-file` or `--body-stdin`.

## Type meanings

| Type | Use for |
|---|---|
| `gotcha` | Non-obvious behavior you had to discover and work around |
| `deferred-decision` | A design or architecture choice left for a later session |
| `obstacle` | A blocker you bypassed but did not fully resolve |
| `concern` | A risk or quality issue outside the current scope |
| `convention-gap` | A missing or contradictory naming/style/pattern rule |

## Scope

- `local` — specific to this change; context is narrow and tied to current work.
- `general` — likely useful to other work; promotion candidate for docs or a skill.

## Where it goes and who reads it

`agentkit findings add --change <change-id>` appends the finding to `openspec/changes/<change-id>/findings.md`.

The `librarian` agent reads `findings.md` **after the change merges** and turns durable items into a separate docs/skills PR or suggested ClickUp tasks.

Capture cheaply now. Triage happens later.

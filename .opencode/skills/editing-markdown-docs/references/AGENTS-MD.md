# AGENTS.md Authoring Rules

Project-specific rules for writing `AGENTS.md` / `AGENT.md` files. These add to the general body rules in `managing-opencode-skills` and apply only to AGENTS.md files. SKILL.md and other markdown follow the general rules without these additions.

## Tone — prescriptive, never descriptive

Every section opens with one of:

- Imperative verb: `Use`, `Add`, `Create`, `Configure`, `Declare`, `Follow`, `Resolve`.
- Conditional directive: `When you need X, do Y`.
- Constraint: `MUST`, `MUST NOT`.

Never open with `"The module provides…"`, `"This package is…"`, `"This document describes…"`, or `"X is a Y that…"`.

| Descriptive (bad) | Prescriptive (good) |
|---|---|
| "The contracts package provides shared schemas" | "Use `@myorg/contracts` for shared schemas. MUST NOT redefine DTOs in app packages." |
| "Orders are core entities with status" | "**Order** — core record. MUST set `status` to a value in `OrderStatusSchema`." |

## MUST-rule density

Every AGENTS.md contains `**MUST [verb]** — [rationale or consequence]` rules. Minimums by file size:

| File size | Minimum MUST rules |
|---|---|
| Small (<80 lines) | 3 |
| Medium (80–150 lines) | 5 |
| Large (150+ lines) | 8 |

Root `AGENTS.md` is the routing table; it stays under 230 lines and is exempt from the MUST density rule. Routing tables still use prescriptive tone.

## Table columns

- Banned column headers: `Description`, `Purpose`, `Details`.
- Use `When to use` / `When to modify` / `Copy from` / `Configuration` instead.
- For entity / data-model sections, prefer constraint-framed bullets over tables:
  ```
  - **Order** — core record. MUST have `status`. MUST NOT have `expiresAt` unless `status = PENDING`.
  ```

## Cross-references

- One authoritative file per topic. Quick-reference elsewhere with a link, never duplicated content.
- Root AGENTS.md routes (Skill Hooks, Read Order). Per-package AGENTS.md holds depth. Do not invert.

## Post-write checklist

After writing or editing any AGENTS.md, verify:

1. Every section starts with an imperative verb or `"When you need…"`.
2. File meets MUST-rule minimum for its size.
3. No section opens with `"The module provides…"` or similar descriptive framing.
4. No table column is named `Description`, `Purpose`, or `Details`.
5. Common tasks have numbered step-by-step procedures, not paragraphs.
6. Entity lists are constraint-framed (`**Entity** — short. MUST …`).
7. No content duplicated from another AGENTS.md — link instead.
8. Directory layout is present and brief if the file documents a package.
9. Opening line is an imperative directive, not a description of what the file is.

## Anti-patterns

Do not:

1. Explain how things work instead of telling agents what to do.
2. List features instead of listing constraints.
3. Duplicate content across multiple AGENTS.md files.
4. Write paragraphs where a checklist would be clearer.
5. Add changelog or history sections. Those belong in `.opencode/lessons-learned.md` or commit history.
6. Over-document internals. AGENTS.md guides usage, not implementation.
7. Skip the "when" framing. Every table and section answers "when do I use this?".

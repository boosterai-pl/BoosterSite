---
name: editing-markdown-docs
description: Use when creating, editing, restructuring, splitting, or reviewing any markdown file (.md) in this project — AGENTS.md, AGENT.md, SKILL.md, RULES.md, README.md, docs/**/*.md, or any other .md. Routes through managing-opencode-skills rules because most markdown files in a project are agent-facing.
compatibility: opencode
metadata:
  schemaVersion: "1"
  version: "1.0.0"
  stability: stable
  category: meta
  appliesTo: any
  requires: managing-opencode-skills
---

Thin pointer skill. The authoritative rules for writing, structuring, and reviewing markdown intended for agents live in the [`managing-opencode-skills`](../managing-opencode-skills/SKILL.md) skill. Those rules apply to **all markdown documents in this project**, not just `SKILL.md` files, because most `.md` files in a project are agent-facing.

## Workflow

1. **Read the file first.** Decide whether the document is agent-facing, human-facing, or mixed. Default to **agent-facing** unless the file is clearly external (e.g. marketing copy, public-facing release notes). If in doubt, treat as agent-facing.
2. **Load the authoritative skill.** Read [`managing-opencode-skills/SKILL.md`](../managing-opencode-skills/SKILL.md) and follow its category references:
   - [`STRUCTURING.md`](../managing-opencode-skills/STRUCTURING.md) — file layout, frontmatter, naming, bundled resources
   - [`WRITING.md`](../managing-opencode-skills/WRITING.md) — description, body, specificity, conciseness
   - [`PATTERNS.md`](../managing-opencode-skills/PATTERNS.md) — templates, examples, workflows, progressive disclosure
   - [`TESTING.md`](../managing-opencode-skills/TESTING.md) — verification and troubleshooting
   - [`AGGREGATOR-SKILLS.md`](../managing-opencode-skills/AGGREGATOR-SKILLS.md) — index/router pattern for large docs
3. **Apply the rules to the document at hand.** Treat the markdown file as if it were a `SKILL.md` body (or a bundled reference) and adhere to all applicable rules:
   - Imperative mood, spec-sheet style, no fluff or tutorials
   - Under 500 lines per file; split into referenced sub-files when larger (progressive disclosure)
   - One term per concept; no time-sensitive information; no dates
   - No duplication across files — info lives in one place, referenced from others
   - Large references (>10k words) get grep patterns in the index file
   - Match specificity to task fragility (high/medium/low freedom)
   - No README/CHANGELOG noise inside skill directories
4. **For frontmatter-bearing files** (`SKILL.md`): also follow `struct-frontmatter`, `struct-naming`, `write-description`, `write-keywords`.
5. **For AGENTS.md / AGENT.md / RULES.md**: frontmatter rules do not apply, but every body rule does (imperative mood, conciseness, no duplication, progressive disclosure via links, consistent terminology).

## Rules Cheat Sheet

The full list lives in [`managing-opencode-skills/SKILL.md`](../managing-opencode-skills/SKILL.md). Highlights that apply to **every** markdown file in this project:

- `write-body` — imperative mood, spec-sheet style, no fluff
- `write-conciseness` — under 500 lines; no explanations the agent already knows
- `write-terminology` — one term per concept; no time-sensitive content
- `write-content` — default approach over menu of choices; no dates
- `struct-dedup` — no duplication between index and references; info lives in one place
- `struct-large-refs` — large references need grep patterns in the entry file
- `pattern-progressive-disclosure` — split large docs into referenced sub-files
- `pattern-templates` / `pattern-examples` / `pattern-checklists` — use where appropriate

## AGENTS.md Authoring

For project-specific rules when editing any `AGENTS.md` / `AGENT.md` file (tone, MUST density, table columns, post-write checklist, anti-patterns), read [`references/AGENTS-MD.md`](references/AGENTS-MD.md). These rules add to — not replace — the general body rules in `managing-opencode-skills`.

## Anti-Patterns

Do not:

- Treat a `docs/**/*.md` file as casual prose. It is agent-facing in most projects.
- Inline content that already lives in another doc — link instead.
- Let any single markdown file exceed ~500 lines without splitting.
- Use hedging language, time references ("recently", "now", dates), or tutorial-style explanations.
- Duplicate rules from `managing-opencode-skills` into this file. This skill is a pointer.

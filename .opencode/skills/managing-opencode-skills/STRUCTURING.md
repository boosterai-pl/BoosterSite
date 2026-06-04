# Structuring Skills

Rules for file layout, frontmatter, and naming conventions.

## Contents
- File Layout
- Frontmatter
- Naming Rules
- Bundled Resources
- What NOT to Include
- Directory Locations

## File Layout

```
skills/<skill-name>/SKILL.md
```

- File MUST be named `SKILL.md` (all caps)
- Directory name MUST match the `name` field in frontmatter
- One SKILL.md per directory

## Frontmatter

```yaml
---
name: <skill-name>
description: Use when <triggering conditions>. <optional short capability clause>
compatibility: opencode
metadata:
  key: value
---
```

OpenCode recognizes a fixed set of frontmatter fields. Any other key is silently ignored. Do not add fields the agent invents or copies from other tools.

Required fields:
- `name` — must match parent directory name exactly; see Naming Rules
- `description` — 1-1024 characters; leads with `Use when ...`; see WRITING.md

Optional fields:
- `compatibility` — set to `opencode`
- `metadata` — string-to-string map for custom data

## Naming Rules

Constraints:
- 1-64 characters
- Lowercase alphanumeric with single hyphens as separators
- Cannot start or end with `-`
- No consecutive `--`
- Must match directory name
- Cannot contain reserved words: `anthropic`, `claude`
- Regex: `^[a-z0-9]+(-[a-z0-9]+)*$`

Preferred naming (gerund form - verb + ing):
- `processing-pdfs`
- `analyzing-spreadsheets`
- `creating-components`
- `managing-databases`
- `testing-code`

Acceptable alternatives:
- Action-verb: `process-pdfs`, `analyze-data`
- Noun-phrase: `pdf-processing`, `data-analysis`

Avoid:
- Vague names: `helper`, `utils`, `tools`
- Generic names: `documents`, `data`, `files`
- Reserved words: `anthropic-helper`, `claude-tools`

Invalid: `-git-release`, `git--release`, `Git_Release`, `SKILL`, `claude-helper`

## Bundled Resources

Skills can include optional resource files alongside SKILL.md. Organize them by purpose:

| Directory | Purpose | Loaded into context? |
|-----------|---------|---------------------|
| `scripts/` | Executable code for deterministic/repetitive tasks | Executed directly; read only when patching needed |
| `references/` | Documentation the agent loads as needed | Yes, selectively when needed |
| `assets/` | Files used in output (templates, images, fonts) | No — copied/used, not read into context |

```
my-skill/
├── SKILL.md
├── scripts/
│   └── validate.py       # Deterministic task, executed not read
├── references/
│   └── schema.md         # Loaded into context when agent needs it
└── assets/
    └── template.html     # Copied to output, never loaded into context
```

When to include scripts:
- The same code is being rewritten repeatedly
- Deterministic reliability is needed (fragile operations)

When to include references:
- Domain-specific knowledge the agent cannot infer (schemas, API docs, policies)
- Content too large for SKILL.md but needed during execution
- For large references (>10k words), include grep search patterns in SKILL.md so the agent can locate relevant sections without loading the full file
- Avoid duplication: information should live in either SKILL.md or references files, not both. Prefer references for detailed content — keeps SKILL.md lean while making information discoverable

When to include assets:
- Templates, images, boilerplate code used in the final output
- Files the agent should use but never needs to read into context

## What NOT to Include

Do NOT create extraneous files. A skill contains only what the agent needs to do the job:

- NO `README.md`
- NO `INSTALLATION_GUIDE.md`
- NO `CHANGELOG.md`
- NO `QUICK_REFERENCE.md`
- NO user-facing documentation
- NO setup/testing procedures (put validation in `scripts/` instead)

Delete any example/placeholder files that aren't needed for the skill.

## Directory Locations

Choose based on scope:

| Scope | Path |
|-------|------|
| Project-local | `.opencode/skills/<name>/SKILL.md` |
| Downloaded/external | `.agents/skills/<name>/SKILL.md` |
| Global | `~/.config/opencode/skills/<name>/SKILL.md` |
| Claude-compatible | `.claude/skills/<name>/SKILL.md` or `~/.claude/skills/<name>/SKILL.md` |

Name must be unique across all locations.

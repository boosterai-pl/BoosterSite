---
name: managing-opencode-skills
description: Use when creating, editing, renaming, deleting, restructuring, reviewing, debugging, or configuring any SKILL.md file, skill directory, or skill permissions — load before any change, even a single-line edit. Also use when any agent action touches a `.opencode/skills/` path.
compatibility: opencode
metadata:
  schemaVersion: "1"
  version: "1.0.0"
  stability: stable
  category: meta
  appliesTo: any
---

Skill authoring guide. Contains rules across 5 categories.

## Categories

| # | Category | Covers | Reference |
|---|----------|--------|-----------|
| 1 | Structuring | File layout, frontmatter fields, naming rules, bundled resources | [STRUCTURING.md](STRUCTURING.md) |
| 2 | Writing | Descriptions, body content, specificity, conciseness | [WRITING.md](WRITING.md) |
| 3 | Patterns | Progressive disclosure, templates, checklists, aggregator pattern | [PATTERNS.md](PATTERNS.md) |
| 4 | Testing | Verification, permissions, troubleshooting loading failures | [TESTING.md](TESTING.md) |
| 5 | Aggregator Skills | Router pattern for skills that delegate to sub-documents | [AGGREGATOR-SKILLS.md](AGGREGATOR-SKILLS.md) |

## Quick Reference

### 1. Structuring

- `struct-file-layout` - SKILL.md (ALL CAPS) inside `skills/<name>/`; directory name must match `name` field
- `struct-frontmatter` - Required: `name` + `description`; optional: `compatibility: opencode`, `metadata`
- `struct-naming` - Regex `^[a-z0-9]+(-[a-z0-9]+)*$`; gerund form preferred (e.g. `processing-pdfs`)
- `struct-resources` - `scripts/` for executables, `references/` for docs loaded into context, `assets/` for output files
- `struct-no-extras` - No README.md, CHANGELOG.md, QUICK_REFERENCE.md inside skill directories
- `struct-locations` - Company-authored: `.opencode/skills/`; downloaded/external: `.agents/skills/`; global: `~/.config/opencode/skills/`

### 2. Writing

- `write-description` - Lead with `Use when ...`; 1-1024 chars; triggers first, capability clause after (optional)
- `write-no-workflow-summary` - Never summarize the skill's process in the description; agents follow the summary and skip the body
- `write-keywords` - Pack error messages, symptoms, synonyms, tool names, file extensions agents would search for
- `write-body` - Imperative mood; spec-sheet/recipe style; concrete examples and commands
- `write-no-when-to-use` - No "When to Use" sections in the body; trigger info belongs in frontmatter only
- `write-no-filler` - No intro filler, no H1 restating the skill name, no explanations of what skills are
- `write-conciseness` - Body under 500 lines; no explanations the agent already knows

### 3. Patterns

- `pattern-progressive-disclosure` - Split large docs into referenced sub-files; SKILL.md stays lean
- `pattern-aggregator` - Use when content exceeds ~300 lines or covers multiple independent sub-topics
- `pattern-checklists` - Copyable checklists for multi-step workflows the agent can track
- `pattern-specificity` - Match instruction detail to task fragility: high/medium/low freedom

### 4. Testing

- `test-load` - Verify the skill loads: check `opencode.json` allow-list entry
- `test-trigger` - Verify description triggers on the right prompts
- `test-body` - Verify the agent follows body instructions, not just the description summary

### 5. Aggregator Skills

- `agg-structure` - SKILL.md = quick reference + routing table; sub-docs loaded on demand
- `agg-self-contained` - SKILL.md must be useful WITHOUT opening sub-docs (checklist + quick reference)
- `agg-one-level` - References are one level deep: SKILL.md → sub-doc; never sub-doc → sub-doc
- `agg-3-to-6` - Prefer 3-6 sub-documents; fewer means aggregator is overkill, more means categories are too granular

## Authoring Checklist

Copy and track when creating or editing a skill:

```
- [ ] Read the relevant sub-doc(s) before touching any file
- [ ] description leads with "Use when", has trigger keywords, is under 1024 chars
- [ ] description has NO workflow summary or process steps
- [ ] body uses imperative mood, no "When to Use" sections, no intro H1 filler
- [ ] body is under 500 lines
- [ ] frontmatter has name matching directory, description, compatibility: opencode
- [ ] skill is in .opencode/skills/<name>/SKILL.md (company-authored)
- [ ] opencode.json allow-list entry added (if project uses an explicit allow-list)
```

## How to Read Sub-Documents

Open only the sub-doc matching your task. Do NOT load all five unless your task spans multiple categories.

IF YOU ARE THINKING "I ALREADY KNOW THIS" — THAT IS EXACTLY WHEN YOU MUST READ IT. Familiarity is not the same as correctness. Open the file.

## Skill Location Policy

Skills live in different directories depending on their origin:

- `.opencode/skills/` — company-authored skills committed in this repo. The canonical location for skills you create or maintain.
- `.agents/skills/` — downloaded or externally managed skills (e.g. installed by an external tool or bootstrap process). Treat as read-only unless you own the source.
- `~/.config/opencode/skills/` — global personal skills. Blocked by default in projects that enforce an explicit allow-list.

If the project uses an explicit allow-list in `opencode.json` → `permission.skill`, every skill MUST be added there with `"allow"`. Without this entry the skill is denied and invisible to agents. Keep entries sorted alphabetically. The `"*": "deny"` wildcard stays first (last-match-wins — specific rules after it override it).

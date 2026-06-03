---
name: code-reviewing
description: Use when asked to review a PR, check code, or validate changes before merge. Drives the CLI-based review flow using the review-cli engine bundled in this skill.
license: MIT
compatibility: opencode
metadata:
  schemaVersion: "1"
  version: "1.0.0"
  stability: stable
  category: workflow
  appliesTo: any
---

Load this skill before any other review skill.

The review engine ships inside this skill at `.opencode/skills/code-reviewing/engine/review-cli` (zero-dependency, prebuilt). Run it directly.

Read `ORCHESTRATION.md` next.

Ground rules:
- Use `.opencode/skills/code-reviewing/engine/review-cli` as the only review engine.
- Use `.opencode/skills/code-reviewing/engine/review-cli plan` as the only orchestration source of truth.
- Reviewer prompts from the CLI are authoritative, including scoped diff instructions and review-target context.
- Do not read review rule files directly. The CLI owns the canonical rule corpus.
- Spawn reviewer subagents. Do not perform the domain review in the orchestrator.
- One subagent per `branch + domain`. Never run the same domain twice for the same branch.
- The CLI serves all `critical` rules before any `warning` rules.
- Final output is comprehensive. Keep all findings. Do not suppress warnings when criticals exist.
- Use `skip` only for `warning` rules that are not applicable to the change scope. Critical rules cannot be skipped — the CLI will hard-block the attempt. For every critical rule you must either `pass` (rule applies, no issue found) or `finding` (issue found). Attempting to `skip` a critical rule exits with an error and reprints the rule; re-read the diff and make an explicit judgment.
- Record Markdown findings with `--body-file` or `--body-stdin`. Do not put Markdown finding bodies in shell arguments; backticks, quotes, and `$()` are not shell-safe.

# Code Review Orchestration

Use the bundled CLI at `.opencode/skills/code-reviewing/engine/review-cli`.

## Session Model

- Session identity is a single `--branch <label>`.
- Session state lives under `.review-sessions/<sanitized-branch>/`.
- Domain files are isolated. Parallel review is safe across different domains.
- Starting the same `branch + domain` twice is an error.

## Required Flow

1. Gather PR metadata.
2. Persist the orchestration plan to `.review-sessions/<sanitized-branch>/plan.json`:
   - PR mode: `gh pr diff <n> | .opencode/skills/code-reviewing/engine/review-cli plan --branch "<label>" --title "<pr title>" --description "<pr description>"`
   - Worktree mode: `.opencode/skills/code-reviewing/engine/review-cli plan --branch "<label>" --base origin/<base> --title "<pr title>" --description "<pr description>"`
3. Read the tagged plan summary output. It is metadata only, not the spawn prompt.
4. Emit exact `<SUBAGENT_TASK>` blocks from the stored plan:
   - `.opencode/skills/code-reviewing/engine/review-cli plan --branch "<label>" --tasks`
   - This output also includes the post-subagent compile command in `<ORCHESTRATOR_AFTER_SUBAGENTS>`.
5. The `plan --tasks` output is for the orchestrator only. Do not pass the entire output to a reviewer subagent.
6. **PR mode only:** Spawn the prior-review triage subagent **in the same message** as the domain subagents (all run in parallel). Pass it the PR number, owner, and repo, and tell it to follow `PRIOR-REVIEW-TRIAGE.md`. In worktree mode skip this step.
7. Spawn exactly one subagent per returned `<SUBAGENT_TASK>` block.
8. Pass exactly the text inside that task's `<PROMPT>` block to the spawned subagent. Do not rewrite it.
9. The orchestrator must not execute the prompt commands itself.
10. Optionally check `status` or `summary` while reviewers run.
11. Compile once all domain sessions are complete:
    - `.opencode/skills/code-reviewing/engine/review-cli compile --branch "<label>"`
12. **PR mode only:** Apply triage filter — remove any compiled finding that matches a `RESOLVED-FIXED` or `RESOLVED-ACKNOWLEDGED` item from the triage subagent output (same file, same concern or nearby line). See filtering rules in `PRIOR-REVIEW-TRIAGE.md`.
13. PR mode: post the filtered findings with `submit-review.mjs`.

## CLI Commands

- Start a domain session:
  - `.opencode/skills/code-reviewing/engine/review-cli start --branch "<label>" --domain security`
- Print the full stored reviewer instructions for one domain:
  - `.opencode/skills/code-reviewing/engine/review-cli prompt --branch "<label>" --domain security`
- Look up one canonical rule by slug:
  - `.opencode/skills/code-reviewing/engine/review-cli rule --slug qual-dry-violation`
  - `.opencode/skills/code-reviewing/engine/review-cli rule --slug qual-dry-violation --domain code-quality --json`
- Reprint the current rule:
  - `.opencode/skills/code-reviewing/engine/review-cli next --branch "<label>" --domain security`
- Record a pass:
  - `.opencode/skills/code-reviewing/engine/review-cli pass --branch "<label>" --domain security --evidence "<what you checked>"`
- Record a skip for a reviewed but not-applicable rule:
  - `.opencode/skills/code-reviewing/engine/review-cli skip --branch "<label>" --domain security --reason changed-file-scope --note "<why the rule does not apply>"`
- Record a finding:
  - Preferred for Markdown: write the body to a temp file, then run `.opencode/skills/code-reviewing/engine/review-cli finding --branch "<label>" --domain security --file <path> --line <n> --side RIGHT|LEFT --body-file "<path-to-temp-file>"`
  - Alternative for piped input: `.opencode/skills/code-reviewing/engine/review-cli finding --branch "<label>" --domain security --file <path> --line <n> --side RIGHT|LEFT --body-stdin`
  - Inline `--body "<text>"` is only safe for plain text without shell-sensitive Markdown. Do not put backticks, quotes, or `$()` in shell arguments.
- Check one domain or all domains:
  - `.opencode/skills/code-reviewing/engine/review-cli status --branch "<label>"`
  - `.opencode/skills/code-reviewing/engine/review-cli status --branch "<label>" --domain security`
- Check branch-wide progress:
  - `.opencode/skills/code-reviewing/engine/review-cli summary --branch "<label>"`
- Validate session consistency:
  - `.opencode/skills/code-reviewing/engine/review-cli doctor --branch "<label>"`
- Store or read reviewer notes:
  - `.opencode/skills/code-reviewing/engine/review-cli notes --branch "<label>" --domain security --append "<note>"`
  - `.opencode/skills/code-reviewing/engine/review-cli show-notes --branch "<label>" --domain security`
- Reset a stuck session:
  - `.opencode/skills/code-reviewing/engine/review-cli reset --branch "<label>" --domain security`
  - `.opencode/skills/code-reviewing/engine/review-cli reset --branch "<label>"`

## Severity Order

- The CLI always serves `critical` rules first.
- Once a domain exhausts `critical` rules, the CLI automatically advances to `warning` rules.
- `compile` preserves comprehensive findings and writes criticals before warnings.

## Orchestrator Budget

The orchestrator only does this:
- Fetch PR title, description, and changed files.
- Run `plan`, then `plan --tasks`.
- Launch triage subagent + domain subagents in one parallel message (PR mode).
- Optionally check `status` or `summary`.
- Run `compile`.
- Apply prior-review triage filter (PR mode).
- Post the filtered findings.

The orchestrator does not:
- Read production code for review.
- Read canonical rule files directly.
- Manually dedupe or reorder findings outside the CLI and triage filter.

## Prompt Ownership

- The CLI owns the reviewer prompt template in `.opencode/skills/code-reviewing/engine/config/review-config.json`.
- The CLI owns both the spawn prompt and the full reviewer prompt.
- Reviewer prompts treat scoped diffs as the primary review context for changed files.
- Review changed hunks first. Read full files only when the scoped diff is insufficient for the current rule.
- Do not report pre-existing issues outside changed hunks unless the change introduced, exposed, or now depends on them. When reporting such issues, anchor the finding to the changed line that creates the dependency and quote the pre-existing code in the finding body — the CLI hard-blocks findings on files not in the diff.
- The default `plan` output is a tagged summary for the orchestrator. It is never passed to a reviewer subagent.
- The `review-cli plan --tasks` output is for the orchestrator only.
- The `review-cli plan --tasks` output includes the post-subagent compile command, but the canonical command is the CLI output itself.
- Do not pass the entire `review-cli plan --tasks` output to a reviewer subagent.
- Spawn one subagent per `<SUBAGENT_TASK>` and pass exactly the text inside that task's `<PROMPT>` block.
- The orchestrator must not execute the prompt commands itself.
- Do not duplicate or hand-edit reviewer instructions in this document.

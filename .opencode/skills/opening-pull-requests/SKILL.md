---
name: opening-pull-requests
description: Use when opening a pull request, creating a PR, opening PR1 or PR2, opening a draft PR, submitting for review, or when the user says "open a PR", "create PR", "open PR", "open draft PR", "submit for review", or "ready for review".
compatibility: opencode
metadata:
  schemaVersion: "1"
  version: "1.0.0"
  stability: stable
  category: workflow
  appliesTo: any
  requires: managing-branches,managing-pr-descriptions
---

## Workflow

Copy and track progress:
- [ ] If creating a new PR, run `task verify`
- [ ] If `task verify` fails, stop and report the failure
- [ ] Confirm the current branch is not `main` or `master`
- [ ] Confirm there is no older open implementation PR that this PR would depend on; do not open stacked PRs
- [ ] Confirm the branch is pushed; if not, run `git push -u origin HEAD`
- [ ] Load `managing-branches` and `managing-pr-descriptions` skills
- [ ] Generate title and description (see `managing-pr-descriptions`)
- [ ] Add or remove the `closes-clickup` label based on PR type (see below)
- [ ] Load `humanizing-ai-text` and apply
- [ ] Run a final em-dash sweep on the title and body before `gh pr create`/`gh pr edit` — replace `—`/`–` with commas, colons, periods, or rephrase. The humanizing skill is applied per-output and can miss PR metadata.
- [ ] Decide draft vs ready (see below)
- [ ] Run `gh pr create` or `gh pr ready`
- [ ] Verify with `gh pr view --json url,title,isDraft,body`

### 1. Pre-Flight Verification

Run `task verify` before opening any new PR. Do not open until it passes.

Show failure logs on failure. Stop and report. Resume only after the user asks to fix or confirms the failure is understood.

Skip `task verify` when editing metadata on an existing PR.

Before opening a new implementation PR, confirm the previous implementation PR is already merged. Do not create stacked PRs. If the next change depends on code that is still under review, stop and ask whether to wait for merge or reduce scope to an independent diff.

### 2. Draft vs Ready

Default to draft. Open ready only when user says "open for review", "submit for review", or "ready to review".

```bash
# Draft
gh pr create --title "<title>" --body "$(cat <<'EOF'
<body>
EOF
)" --draft

# Ready
gh pr create --title "<title>" --body "$(cat <<'EOF'
<body>
EOF
)"

# Promote existing draft
gh pr ready
```

### 3. Post-Create Verification

```bash
gh pr view --json url,title,isDraft,body,headRefName,baseRefName
```

Confirm `url` exists, `title` matches, `isDraft` matches intent, `body` has expected headers, and `headRefName` and `baseRefName` match intent. Fix with `gh pr edit` if any check fails.

## PR Type Rules

### Spec PR (PR1)

- Use type `spec`.
- No application/implementation code changes (e.g. `apps/*`, `packages/*`, `src/`, or wherever the project keeps implementation code).
- No migrations or infrastructure changes.
- Include only OpenSpec artifacts (`openspec/changes/<change-id>/`), requirement docs, and feature docs.
- **DO NOT add** the `closes-clickup` label — PR2 will close the ticket.

### Implementation PR (PR2)

- Use type `impl`.
- Reference the approved OpenSpec change ID from PR1.
- All tests must pass before opening.
- Open only after the previous implementation PR in the sequence is merged. Do not create `pr2a`/`pr2b` dependency chains.
- **ADD** the `closes-clickup` label on the FINAL slice PR only. For multi-slice plans, earlier slice PRs (`pr2a`, `pr2b`, ...) do not get the label; only the last slice does.

### Ad-Hoc (feat, fix, chore, etc.)

Use only when `docs/PROCESS.md` does not require OpenSpec for the change.

- Types: `feat`, `fix`, `chore`, `refactor`, `test`, `docs`.
- Include ClickUp task ID only when the branch has one.
- **Closing label rule by type:**
  - `feat`, `fix` → ADD the `closes-clickup` label by default.
  - `chore`, `refactor`, `docs`, `test` → DO NOT add the label by default.
  - Override the default only when the diff makes it obvious.

## Label commands

Use `gh pr edit` to apply the closing label:

```bash
# closer PR
gh pr edit <PR> --add-label closes-clickup

# non-closer PR
gh pr edit <PR> --remove-label closes-clickup
```

See `managing-pr-descriptions` "ClickUp Closing Label" for the full rule and edge cases.

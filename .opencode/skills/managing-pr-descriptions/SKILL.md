---
name: managing-pr-descriptions
description: Use when creating new PRs with gh pr create, opening pull requests, updating existing PR metadata, writing PR descriptions, or standardizing PR titles. MUST be used any time a PR is created or edited.
compatibility: opencode
metadata:
  schemaVersion: "1"
  version: "1.0.0"
  stability: stable
  category: workflow
  appliesTo: any
---

## CRITICAL Rules

- NEVER use placeholder titles like "Update feature" or auto-generated branch-name titles
- NEVER skip generating a proper title and description when creating a PR
- When creating a PR, pass `--title` and `--body` to `gh pr create`
- When updating a PR, run `gh pr edit` commands to apply changes
- Never just show the metadata without applying it
- ALWAYS load the `managing-branches` skill to extract the ClickUp task ID from the branch name

## Workflow: Creating a New PR

1. **Get the diff**: `git diff $(git merge-base HEAD main)...HEAD` (or appropriate base branch)
2. **Get file list**: `git diff $(git merge-base HEAD main)...HEAD --name-only`
3. **Extract ClickUp task ID** from branch name (see Ticket Extraction below)
4. **Analyze changes** (see Analysis section)
5. **Generate title and description** (see formats below)
6. **Create PR**: `gh pr create --title "<title>" --body "<body>"` using heredoc for multi-line body

## Workflow: Updating an Existing PR

1. **Extract PR identifier** from user message (URL, number, or branch)
2. **Fetch PR metadata**: `gh pr view [pr] --json title,body,comments,headRefName`
3. **Extract ClickUp task ID** from branch, comments, or existing title
4. **Fetch PR diff**: `gh pr diff [pr]`
5. **Get file list**: `gh pr diff [pr] --name-only`
6. **Analyze changes** (see Analysis section)
7. **Generate title and description** (see formats below)
8. **Update PR**:
   - `gh pr edit [pr] --title "new title"`
   - `gh pr edit [pr] --body "new description"` (use heredoc)

## Analysis

- Identify primary purpose (feature/fix/refactor/chore/spec)
- List affected modules/layers
- Note breaking changes
- Check for architectural patterns
- Identify UI changes from diff

## Title Format

```
<type>: [CU-<taskId>] <concise summary>
```

- **With ClickUp task**: `feat: [CU-86c8zdwuk] Add user preferences`
- **Without task**: `chore: Fix typo in readme`
- **Types**: `feat`, `fix`, `refactor`, `chore`, `docs`, `test`, `spec`
- **Breaking changes**: Add `!` after type: `feat!: [CU-86c8zdwuk] Remove deprecated API`
- **Max length**: 72 characters total
- **`spec` type**: Use for spec-only PRs (PR1 in the two-PR workflow)

## Ticket Extraction

Branch names follow the convention: `CU-<taskId>/<type>/<description>`. Extract the ClickUp task ID from the `CU-<taskId>` segment.

- Check `headRefName` for pattern: `CU-[a-zA-Z0-9]+`
- Format consistently as `[CU-<taskId>]` in the PR title
- The `CU-<taskId>` in the title enables ClickUp-GitHub auto-linking (ClickUp detects it from PR titles, descriptions, branch names, and commit messages)
- The extracted task ID is also used to build the ClickUp link in the description body
- If no ClickUp task ID found in branch name, omit the `[CU-...]` from title

## Description Format

Structure the body using these sections. Omit any section that does not apply.

```
ClickUp: https://app.clickup.com/t/<taskId>

## Why
<1-2 sentences: what problem this solves or what need triggered it>

## What changed
- <bullet 1: high-level change, not file names>
- <bullet 2>

## Caveats
- <breaking changes, migration notes, non-obvious decisions>
- <or omit this section entirely if none>
```

Rules:
- ClickUp link is always the first line when a ClickUp task exists (omit for no-task chore PRs).
- "Why" section is mandatory. Answer: what breaks or is missing without this PR?
- "What changed" uses bullets. Describe behavior changes, not file paths or code structure. Max 5 bullets.
- "Caveats" is optional. Only include if there are breaking changes, migration steps, or non-obvious decisions reviewers need to know.
- Omit empty sections. A PR that is self-explanatory from the title can have just the ClickUp link + 1 sentence.

## ClickUp Closing Label

Use the GitHub label `closes-clickup` to signal that **this PR's merge closes the ticket**. The `opening-pull-requests` skill adds the label on closer PRs, and the `merging-pull-requests` skill reads it in Step 7.5 to decide whether to set the ticket to `complete`.

Add the label for PR types: `impl`, `feat`, `fix`.

Omit the label for PR types: `spec`, `chore`, `refactor`, `docs`, `test`.

Rationale: a single ClickUp ticket usually produces two PRs (PR1 spec + PR2 impl). Only PR2 should close the ticket. A label is simpler than parsing PR body text and works directly with ClickUp GitHub Automations.

Edge cases:
- **Single-PR feature, no OpenSpec** — branch type is `feat` and there's no follow-up. Add the label.
- **PR2 of a multi-PR slice plan** — only the FINAL impl PR gets the label. Earlier slice PRs (`pr2a`, `pr2b`, ...) omit it.
- **Hotfix on a closed ticket** — add the label only if the ticket should be re-closed; otherwise omit it and update status manually.
- **PR with no ClickUp task** — no label for ticket closing.

## Writing Rules

- **No emojis** - keep it professional and plain
- **Use the standard sections** (Why / What changed / Caveats). No custom headers beyond these three.
- **NEVER list files, classes, or code structure** - reviewers see the diff
- **NEVER mention counts** - no "6 event types", "7 fields", "26 tests", "5 factory constructors"
- **NEVER restate code** - don't describe what classes contain or what enums have
- **No filler** - if there's nothing important to say, the description can be 1 sentence
- **Sound human** - write like you're explaining to a colleague, not filling out a template
- **Focus on WHY and WHAT PROBLEM** - explain the purpose and context, not the implementation

## What to Write

Answer these questions:

1. **Why does this PR exist?** What problem or need triggered it?
2. **What does it enable?** What can users/developers do after this lands?
3. **Any gotchas?** Breaking changes, migration notes, or non-obvious decisions?

## Anti-patterns (NEVER do this)

**Terrible** (restates code, lists files, counts things):

```
Adds foundational types for live event integration in the core package.

New files:
- core/lib/src/live_event/live_event_type.dart - Enum with 6 event types and hex codes
- core/lib/src/live_event/live_event.dart - Immutable class with 7 fields, 5 factory constructors

Testing: 26 unit tests added and passing.
```

**Bad** (still too focused on WHAT, not WHY):

```
## Summary
This PR implements user preference functionality.

## Changes
- Added PreferenceRepository.ts
- Updated UserService.ts
- Added tests for preferences
```

## Good Examples

**Simple fix** (closer PR — add `closes-clickup` label):

```
ClickUp: https://app.clickup.com/t/86c8def34

## Why
Users lost theme preferences on every page refresh.
```

**Spec PR — PR1** (no closing label, ticket continues to PR2):

```
ClickUp: https://app.clickup.com/t/86c8abc12

## Why
Defines the data model and state transitions for the live event integration before implementation begins.

## What changed
- OpenSpec change `live-event-integration` with proposal, design, tasks
- REQ-5.1 added to docs/requirements
```

**Impl PR — PR2** (final slice — add `closes-clickup` label):

```
ClickUp: https://app.clickup.com/t/86c8abc12

## Why
Implements the live event integration per the spec merged in PR #341.

## What changed
- Shared event type definitions for device-to-app communication
- Type-safe event payload validation via Zod
```

**PR with caveats**:

```
ClickUp: https://app.clickup.com/t/86c8ghi56

## Why
Real-time sync between devices requires a shared event bus for cross-component communication.

## What changed
- Event bus with typed publish/subscribe API
- Auto-cleanup on component unmount

## Caveats
- Events are fire-and-forget for now; persistence comes in a follow-up PR
```

**Multi-concern chore PR** (like config + lint + docs):

```
## Why
Code review lacked frontend-specific rules, and no architecture doc existed for the web layer.

## What changed
- 7 new code review rules across 3 existing domains (no new subagent)
- ESLint guards: max-lines for routes, no raw fetch, cross-feature import ban
- Architecture reference doc for folder structure, query factories, state management

## Caveats
- max-lines is warn (not error) since existing routes exceed the limit
- Existing raw fetch calls get eslint-disable with justification
```

## Guidelines

- Keep title under 72 characters
- **No emojis** in title or description
- **Explain the problem, not the code** - the diff shows implementation details
- **Never list files, classes, methods, or counts** - reviewers don't need an inventory
- Put breaking changes and migration notes in the Caveats section
- Use imperative mood ("Add feature" not "Added feature")
- Be specific in titles: "Fix null check in UserRepository" > "Fix bug"
- Always include ClickUp task ID in title if found in branch or comments
- Write like you're explaining to a teammate who asked "what's this PR for?"

## Output Flow

1. Show PR metadata (title, branch, ClickUp task ID if found)
2. Show proposed new title and description
3. **IMMEDIATELY run `gh pr edit` commands to apply changes**
4. Confirm update was successful

## Example Commands

```bash
# --- Creating a new PR ---
# Get diff against base branch
git diff $(git merge-base HEAD main)...HEAD
git diff $(git merge-base HEAD main)...HEAD --name-only

# Create PR with proper title and body (ClickUp link always first line)
gh pr create --title "feat: [CU-86c8zdwuk] Add user preferences" --body "$(cat <<'EOF'
ClickUp: https://app.clickup.com/t/86c8zdwuk

Users lose their theme selection on every page refresh. This adds persistence so preferences survive across sessions.
EOF
)"

# --- Updating an existing PR ---
# Fetch PR info
gh pr view 123 --json title,body,comments,headRefName

# Get diff
gh pr diff 123
gh pr diff 123 --name-only

# Update PR (use heredoc for multi-line body, ClickUp link always first line)
gh pr edit 123 --title "feat: [CU-86c8zdwuk] Add user preferences"
gh pr edit 123 --body "$(cat <<'EOF'
ClickUp: https://app.clickup.com/t/86c8zdwuk

Users lose their theme selection on every page refresh. This adds persistence so preferences survive across sessions.
EOF
)"
```

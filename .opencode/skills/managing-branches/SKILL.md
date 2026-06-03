---
name: managing-branches
description: Use when creating branches, checking out for PRs, or naming feature/fix/spec branches. MUST be followed any time a new branch is created. Covers branch naming conventions including CU-prefixed ClickUp integration, type segments (spec/impl/feat/fix/chore), and stacked-branch rules.
compatibility: opencode
metadata:
  schemaVersion: "1"
  version: "1.0.0"
  stability: stable
  category: workflow
  appliesTo: any
---

## Branch Name Format

```
CU-<clickup-task-id>/<type>/<short-description>
```

ClickUp ID comes first so branches for the same task group together in sorted listings.

### Examples

```
CU-86c8zdwuk/spec/ci-cd-pipeline       — spec-only PR (PR1)
CU-86c8zdwuk/impl/ci-cd-pipeline       — implementation PR (PR2)
CU-86c8zc483/feat/auth-session         — new feature
CU-86c8zdy13/fix/media-list-sort       — bugfix
CU-86c8zk2yt/chore/update-deps         — tooling, deps, config
CU-86c8zhr32/refactor/extract-service   — refactoring
```

### Types

| Type       | When to use                                           |
| ---------- | ----------------------------------------------------- |
| `spec`     | PR1 in the two-PR workflow (OpenSpec artifacts only)  |
| `impl`     | PR2 in the two-PR workflow (implementation)           |
| `feat`     | New feature (single-PR, no spec needed)               |
| `fix`      | Bug fix                                               |
| `chore`    | Tooling, dependencies, CI config, non-feature changes |
| `refactor` | Code restructuring with no behavior change            |
| `docs`     | Documentation-only changes                            |
| `test`     | Test-only changes                                     |

### Rules

- **Always include `CU-<id>`** — this enables automatic ClickUp↔GitHub linking. ClickUp auto-detects `CU-{taskId}` from branch names and links PRs, commits, and branches to the task.
- **Short description in kebab-case** — 2-4 words max, matches the OpenSpec change name when applicable.
- **`spec/` and `impl/` branches for the same task share the same CU prefix and description** — only the type segment differs.
- **If no ClickUp task exists** (rare), omit the `CU-<id>/` prefix: `chore/fix-typo-in-readme`.
- **Stacked branches**: `impl/` branches are created on top of `spec/` branches for the same task. After the spec PR merges, rebase the impl branch onto `main`.

### ClickUp Integration

The `CU-<taskId>` in the branch name is automatically detected by the ClickUp-GitHub integration. This means:

- PRs opened from these branches are auto-linked to the ClickUp task
- Commits on these branches appear in the ClickUp task activity
- No manual linking needed — the branch name does the work

You can also include `CU-<taskId>` in PR titles and commit messages for additional linkage points.

### Workflow

When creating a branch:

```bash
# For spec-only PR (PR1)
git checkout -b CU-<taskId>/spec/<change-name> main

# For implementation PR (PR2), stacked on spec branch
git checkout -b CU-<taskId>/impl/<change-name> CU-<taskId>/spec/<change-name>

# For single-PR features
git checkout -b CU-<taskId>/feat/<short-description> main
```

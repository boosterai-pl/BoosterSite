---
name: using-agentkit
description: Use when managing skills, applying recipes, capturing findings, querying project state, or running any agentkit CLI command in a consumer repo. Covers agentkit skills, recipes, findings, change, query, and doctor.
compatibility: opencode
metadata:
  schemaVersion: "1"
  version: "1.0.0"
  stability: stable
  category: meta
---

## Install

```
npm install -g github:boosterai-pl/agentkit
```

## Command groups

**Skills** — manage agent skills installed in this repo:
```
agentkit skills add <name>       # install a skill
agentkit skills update           # pull latest versions
agentkit skills status           # show installed vs available versions
agentkit skills sync             # force-refresh all skill content
```

**Recipes** — repo-structure scaffolds (monorepo, ci, docs, AGENTS.md):
```
agentkit recipes list                        # JSON: name + summary
agentkit recipes show <recipe>               # print the apply instructions
agentkit recipes show <recipe> <file>        # print a specific template file
agentkit recipes copy <recipe> --dest .      # copy templates/ in (never overwrites)
```

**Findings** — capture deferred bugs, gotchas, decisions during implementation:
```
agentkit findings add --change <id> --type <type> --scope <scope> --title "<title>" --body-file <path>
agentkit findings list
agentkit findings remove <n>
```
Types: `gotcha | deferred-decision | obstacle | concern | convention-gap`. Scope: `local | general`.

**Change** — pin the active OpenSpec change for this worktree (used by findings add):
```
agentkit change set <change-id>   # pin — run once at apply session start
agentkit change get               # print pinned change
agentkit change clear             # unpin
```

**Query** — inspect catalog and project state:
```
agentkit query catalog.list
agentkit query catalog.resolve --skills <names> --schema <name>
agentkit query project.detect
agentkit query bootstrap.ready
```

**Other**:
```
agentkit doctor      # verify installation health
agentkit guide       # print CLI quick reference
```

# Writing Skills

Rules for writing descriptions, body content, specificity, conciseness, and content guidelines.

## Contents
- Writing Descriptions
- Writing the Body
- Matching Specificity to Fragility
- Conciseness Guidelines
- Content Guidelines

## Writing Descriptions

The description is the ONLY routing signal in OpenCode. The agent sees a `<available_skills>` block containing each skill's `name` and `description` and decides which skill to load. The full SKILL.md body is loaded only after the agent calls `skill({ name })`. A weak description = the skill never loads.

Rules:
- Lead with **`Use when ...`** — triggering conditions come FIRST
- Write in **third person** (NOT "I help you" or "You can use this")
- 1-1024 characters total (OpenCode hard cap; longer descriptions are rejected)
- Pack trigger keywords agents would search for: error messages, symptoms, synonyms, tool names, file extensions
- A short capability clause MAY follow after the triggers, only if the name alone is not self-explanatory
- NEVER summarize the skill's workflow or process steps

Description formula:
```
Use when <triggering conditions, symptoms, keywords>. <Optional short capability clause.>
```

Good (triggers first, no capability prefix):
```
Use when working with PDF files, extracting text or tables, filling forms, or merging documents.
```

Good (triggers first, short capability clause after):
```
Use when writing new code, fixing bugs, or implementing features. Drives test-driven development.
```

Bad:
- "Helps with coding" — vague, no triggers
- "I can help you process PDFs" — first person
- "A skill for Git" — no `Use when`, no triggers
- "Extracts text and tables from PDF files, fills forms, merges documents. Use when working with PDF files." — capability prefix wastes the 1024-char budget and pushes triggers to the end where they may be skipped by the router

### Why lead with `Use when`

1. **Routing-first.** The agent's only job at the listing stage is to decide WHEN to load the skill, not understand HOW it works. Triggers up front match the decision being made.
2. **Capability is redundant.** The skill name and body already describe capability. Repeating it in the description burns the limited 1024-char budget.
3. **Workflow summaries actively harm.** When the description summarizes the skill's process, agents follow the summary as a shortcut and never read the body. See the anti-pattern below.

### Anti-pattern: workflow summaries in descriptions

Descriptions that summarize the skill's workflow cause agents to follow the description as a shortcut and skip the body. Describe *triggers*, not *process steps*.

```
BAD:  "Use when executing plans. Dispatches subagent per task with code review between tasks."
      → Agent does ONE review (from description) instead of TWO (from body)

BAD:  "Use when implementing features. Write test first, watch it fail, write minimal code, refactor."
      → Agent follows this summary and never reads the detailed body

GOOD: "Use when executing implementation plans with independent tasks in the current session."
GOOD: "Use when writing new code, fixing bugs, or before implementing any feature."
```

### Keyword coverage

Include terms agents would search for when encountering a problem:
- **Error messages**: "Hook timed out", "ENOTEMPTY", "race condition"
- **Symptoms**: flaky, hanging, stale, zombie, pollution, slow
- **Synonyms**: timeout/hang/freeze, cleanup/teardown/afterEach, build/compile/bundle
- **Tool and command names**: actual CLI commands, library names, file extensions

## Writing the Body

The body contains pure instructions for the agent to follow.

Rules:
- Use imperative mood: "Do X", "Never Y", "Always Z"
- Structure with clear markdown headers
- Include concrete examples, commands, code snippets
- Write as a spec sheet or recipe, NOT a tutorial
- Use consistent terminology: pick one term per concept and use it everywhere
- NO "When to Use" sections in the body -- the body is only loaded after the skill triggers, so "when to use" info there is useless. Put all trigger context in the frontmatter `description` instead
- NO explanations of what skills are
- NO fluff or introductions
- NO time-sensitive information (use "current method" / "old patterns" sections instead)

Example structure:
```markdown
## Step 1: Do This Thing

- Run this command: `example command`
- Check for this condition
- If X, then Y

## Step 2: Handle This Case

Always include:
\```json
{
  "example": "data"
}
\```

## DOs and DON'Ts

- DO follow this pattern
- DON'T do this anti-pattern
```

## Matching Specificity to Fragility

Match the level of detail in instructions to how fragile the task is. Think of the agent as exploring a path: a narrow bridge with cliffs needs specific guardrails (low freedom), while an open field allows many routes (high freedom).

**High freedom** (prose instructions) -- when multiple approaches are valid:
```markdown
## Code review process
1. Analyze code structure and organization
2. Check for potential bugs or edge cases
3. Suggest improvements for readability
```

**Medium freedom** (pseudocode/templates) -- when a preferred pattern exists:
```markdown
## Generate report
Use this template and customize as needed:
- Executive summary
- Key findings with data
- Recommendations
```

**Low freedom** (exact scripts, no parameters) -- when operations are fragile or order-critical:
```markdown
## Database migration
Run exactly: `python scripts/migrate.py --verify --backup`
Do not modify the command or add flags.
```

Rule of thumb: the more destructive or irreversible the operation, the more specific the instructions should be.

## Conciseness Guidelines

**The context window is a public good.** Skills share the context window with the system prompt, conversation history, other skills' metadata, and the actual user request. Every token has a cost.

**Default assumption: the agent is already very smart.** Only add context the agent doesn't already have. Challenge each piece of information:
- Does the agent really need this explanation?
- Can the agent already infer this?
- Does this paragraph justify its token cost?

Rules:
- SKILL.md body under 500 lines
- NO explanations the agent already knows
- NO tutorials - write as spec sheet/recipe
- Prefer code examples over prose descriptions

## Content Guidelines

Write every skill for another OpenCode agent, not for a human reader. Include only information that is beneficial and non-obvious to the next agent instance. If a paragraph explains something the agent can already infer from the repo, delete it.

### Avoid offering too many options

Provide a default approach, not a menu of choices.

**Bad** (confusing):
```markdown
You can use pypdf, or pdfplumber, or PyMuPDF, or pdf2image...
```

**Good** (clear default with escape hatch):
```markdown
Use pdfplumber for text extraction.
For scanned PDFs requiring OCR, use pdf2image with pytesseract instead.
```

### Avoid time-sensitive information

Use "current method" / "old patterns" sections instead of dates like "before August 2025, use X".

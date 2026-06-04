# Aggregator Skills (Meta-Skills)

Pattern for creating a SKILL.md that acts as a lightweight routing table, pointing to sub-documents loaded on demand.

## Contents
- Apply When
- How It Works
- File Structure
- Writing the Aggregator SKILL.md
- Writing Sub-Documents
- Rules
- Complete Example

## Apply When

Use the aggregator pattern when:
- A skill covers multiple distinct topics that rarely need to be loaded together
- The combined content exceeds ~300 lines
- Sub-topics are independently useful (an agent may need only one)
- The skill is a "guide" or "best practices" collection rather than a single workflow

Do NOT use the aggregator pattern when:
- The skill is a single linear workflow under 300 lines
- All sections are always needed together
- The content is tightly coupled (splitting would lose coherence)

## How It Works

1. SKILL.md is loaded when the skill is triggered (based on `description` match).
2. The agent scans the quick reference table to locate the relevant sub-topic.
3. The agent reads only the sub-document it needs -- other files stay out of context.
4. If multiple sub-topics are needed, the agent reads them incrementally.

This minimizes context usage while keeping all content accessible.

## File Structure

```
my-skill/
├── SKILL.md              # Aggregator: quick reference + routing table
├── CATEGORY-ONE.md       # Sub-document for first topic
├── CATEGORY-TWO.md       # Sub-document for second topic
├── CATEGORY-THREE.md     # Sub-document for third topic
└── scripts/              # Optional utility scripts
    └── validate.py
```

Naming conventions for sub-documents:
- ALL CAPS filenames (e.g., `STRUCTURING.md`, not `structuring.md`)
- Short, descriptive names matching the category they cover
- Keep flat -- no nested directories of sub-documents

## Writing the Aggregator SKILL.md

The aggregator SKILL.md has a specific structure:

### 1. Frontmatter

Standard frontmatter. The `description` must cover ALL sub-topics since this is the only text agents see for triggering.

### 2. Title and summary

One-line description of the skill scope + how many rules/topics it covers.

### 3. Quick checklist (optional)

A copyable checklist covering the full workflow across all sub-documents. Lets the agent track progress without loading all files.

### 4. Categories table

A table mapping each category to its sub-document:

```markdown
| Phase | Category | What It Covers | Reference |
|-------|----------|----------------|-----------|
| 1 | Structuring | File layout, frontmatter | [STRUCTURING.md](STRUCTURING.md) |
| 2 | Writing | Descriptions, body content | [WRITING.md](WRITING.md) |
```

### 5. Quick reference

Flat list of all rules/topics grouped by category, with brief one-line summaries. This is the routing mechanism -- the agent reads this to decide which sub-document to open.

Use a consistent prefix per category:
```markdown
### 1. Structuring
- `struct-file-layout` - SKILL.md (all caps) inside skills/<name>/
- `struct-frontmatter` - Required: name + description
```

### 6. "How to Use" section

Brief instructions on how to read sub-documents.

### 7. Complete example (optional)

A minimal end-to-end example showing the skill in action.

## Writing Sub-Documents

Each sub-document is a standalone reference for one category.

Rules:
- Add a `## Contents` section at the top listing all headers
- Write in the same imperative style as SKILL.md body content
- Include concrete examples, code snippets, commands
- Keep each sub-document under 200 lines if possible
- Do NOT reference other sub-documents (keep references one level deep from SKILL.md)
- Do NOT duplicate the quick reference from SKILL.md -- go deeper

## Rules

- SKILL.md must be self-contained enough to be useful WITHOUT reading sub-documents (quick checklist + quick reference)
- Sub-documents are loaded only when needed -- design for selective reading
- Keep references ONE level deep (SKILL.md -> sub-doc, never sub-doc -> sub-doc)
- The `description` field in frontmatter must cover all sub-topics
- Each sub-document should have a Contents section
- Prefer 3-6 sub-documents. Fewer than 3 means the aggregator pattern is overkill. More than 6 means the categories are too granular

## Complete Example

```
writing-react-components/
├── SKILL.md
├── COMPONENTS.md
├── STATE.md
├── PERFORMANCE.md
└── TESTING.md
```

**SKILL.md:**
```markdown
---
name: writing-react-components
description: React component patterns covering composition, state management, performance, and testing. Use when writing React components, optimizing renders, or reviewing React code.
---

# Writing React Components

Guide for React component development. Contains rules across 4 categories.

## Categories

| # | Category | Covers | Reference |
|---|----------|--------|-----------|
| 1 | Components | Composition, props, children | [COMPONENTS.md](COMPONENTS.md) |
| 2 | State | Local state, context, derived state | [STATE.md](STATE.md) |
| 3 | Performance | Memoization, lazy loading, re-renders | [PERFORMANCE.md](PERFORMANCE.md) |
| 4 | Testing | Unit tests, integration tests | [TESTING.md](TESTING.md) |

## Quick Reference

### 1. Components
- `comp-single-responsibility` - One concern per component
- `comp-composition` - Prefer composition over prop drilling
- `comp-children` - Use children for flexible layouts

### 2. State
- `state-minimal` - Derive what you can, store only source of truth
- `state-colocation` - Keep state close to where it's used
- `state-context` - Context for cross-cutting concerns only

### 3. Performance
- `perf-memo` - Memoize expensive computations
- `perf-lazy` - Lazy load below-the-fold components
- `perf-keys` - Stable keys for list rendering

### 4. Testing
- `test-behavior` - Test behavior, not implementation
- `test-user-events` - Simulate real user interactions
```

**COMPONENTS.md:**
```markdown
# Components

Rules for component composition, props, and children patterns.

## Contents
- Single Responsibility
- Composition Over Prop Drilling
- Children for Flexible Layouts

## Single Responsibility

Each component handles one concern. Split when a component does both data fetching and rendering.

## Composition Over Prop Drilling

Pass components as props or children instead of drilling data through intermediaries.

## Children for Flexible Layouts

Use `children` for layout components that wrap arbitrary content.
```

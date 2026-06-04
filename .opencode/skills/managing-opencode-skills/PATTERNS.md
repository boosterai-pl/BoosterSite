# Skill Patterns

Reusable patterns for structuring skill content: templates, examples, workflows, progressive disclosure, aggregator skills, and MCP tool references.

## Contents
- Template Pattern
- Examples Pattern
- Checklists for Workflows
- Feedback Loops
- Progressive Disclosure
- Aggregator Skills
- MCP Tool References

## Template Pattern

Provide output format templates. Match strictness to requirements.

**Strict** (API responses, data formats):
````markdown
ALWAYS use this exact structure:
```json
{
  "status": "success",
  "data": [],
  "pagination": { "page": 1, "total": 100 }
}
```
````

**Flexible** (reports, documentation):
````markdown
Sensible default format, adapt as needed:
```markdown
# [Title]
## Summary
## Key findings
## Recommendations
```
````

## Examples Pattern

Provide input/output pairs when output quality depends on seeing examples.

````markdown
## Commit message format

**Input**: Added user authentication with JWT tokens
**Output**:
```
feat(auth): implement JWT-based authentication
Add login endpoint and token validation middleware
```
````

Examples communicate desired style more clearly than descriptions alone.

## Checklists for Workflows

For complex operations, provide a copyable checklist:

````markdown
## Deployment workflow

Copy and track progress:
```
- [ ] Step 1: Run tests
- [ ] Step 2: Build artifacts
- [ ] Step 3: Deploy to staging
- [ ] Step 4: Verify staging
- [ ] Step 5: Deploy to production
```
````

## Feedback Loops

For quality-critical tasks, add validation after each critical step:

```markdown
## Document editing process

1. Make edits to document
2. Validate immediately: `python scripts/validate.py output/`
3. If validation fails:
   - Review error message
   - Fix issues
   - Run validation again
4. Only proceed when validation passes
```

The "run -> validate -> fix -> repeat" pattern catches errors early and greatly improves output quality.

Make validation scripts verbose with specific error messages to help the agent self-correct.

Stop the loop if failures are unrelated and fixing them would materially expand scope. Report the blocker instead of drifting into side quests.

When one gate fails, re-run only that failed step after the fix. Re-run the full dependent tail only when the failed step passes again.

## Reusable Asset Planning

Before expanding a skill body, decide whether repeated logic belongs in a bundled asset instead:

1. Put deterministic, repetitive operations in `scripts/`.
2. Put domain-specific knowledge the agent cannot infer in `references/`.
3. Put output templates or copied artifacts in `assets/`.
4. Keep SKILL.md for instructions and decision rules only.

Add an asset only when it will be reused. Do not create placeholder files.

## Progressive Disclosure

For skills approaching 500 lines, split into separate files that are loaded only when needed.

```
my-skill/
├── SKILL.md          # Main instructions (loaded when triggered)
├── REFERENCE.md      # API reference (loaded as needed)
├── EXAMPLES.md       # Usage examples (loaded as needed)
└── scripts/
    └── validate.py   # Utility script (executed, not loaded)
```

In SKILL.md, reference other files:
```markdown
**Form filling**: See [FORMS.md](FORMS.md) for complete guide
**API reference**: See [REFERENCE.md](REFERENCE.md) for all methods
**Examples**: See [EXAMPLES.md](EXAMPLES.md) for common patterns
```

**Domain-specific organization** -- when a skill covers multiple domains, organize by domain so only relevant content is loaded:
```
bigquery-skill/
├── SKILL.md
└── references/
    ├── finance.md      # Revenue, billing metrics
    ├── sales.md        # Opportunities, pipeline
    └── product.md      # API usage, features
```
User asks about sales metrics -> agent reads only `sales.md`.

**Variant-based organization** -- when a skill supports multiple frameworks or providers:
```
cloud-deploy/
├── SKILL.md
└── references/
    ├── aws.md          # AWS deployment patterns
    ├── gcp.md          # GCP deployment patterns
    └── azure.md        # Azure deployment patterns
```
User picks AWS -> agent reads only `aws.md`.

Rules:
- Keep references ONE level deep from SKILL.md (no nested references)
- Add table of contents to files >100 lines
- Agent loads referenced files only when needed -- no context cost until accessed
- For files >100 lines, add a Contents section at the top

For the aggregator skill variant of this pattern, see AGGREGATOR-SKILLS.md (referenced from SKILL.md).

## Aggregator Skills

An aggregator skill (or "meta-skill") is a SKILL.md that acts as a routing table rather than containing all instructions inline. Full pattern, file structure, and example are in AGGREGATOR-SKILLS.md (referenced from SKILL.md — read it from there, not from this sub-document).

## MCP Tool References

If a skill references MCP tools, always use fully qualified names to avoid "tool not found" errors.

Format: `ServerName:tool_name`

```markdown
Use the BigQuery:bigquery_schema tool to retrieve table schemas.
Use the GitHub:create_issue tool to create issues.
```

Without the server prefix, the agent may fail to locate the tool when multiple MCP servers are available.

# Testing and Permissions

Rules for permissions, evaluation-driven development, verification, and troubleshooting.

## Contents
- Permissions
- Evaluation-Driven Development
- Testing Bundled Scripts
- Natural-Trigger Testing
- Iterative Refinement
- Verification Checklist
- Troubleshooting

## Permissions

Configure in `opencode.json`:

```json
{
  "permission": {
    "skill": {
      "*": "deny",
      "editing-markdown-docs": "allow",
      "managing-opencode-skills": "allow",
      "experimental-*": "ask"
    }
  }
}
```

Use default-deny and explicit allow-listing for repo-local skills. Only use wildcard `allow` in throwaway examples outside this repo.

Permission levels:
- `allow`: loads immediately
- `deny`: hidden from agent, access rejected
- `ask`: user prompted before loading

Per-agent overrides in agent frontmatter:
```yaml
permission:
  skill:
    "some-skill": "allow"
```

Disable skill tool entirely for an agent:
```yaml
tools:
  skill: false
```

## Skill Types and Testing Strategies

Different skill types need different test approaches. Identify the type first, then choose matching scenarios:

| Skill Type | Examples | How to Test |
|------------|----------|-------------|
| **Discipline-enforcing** | TDD, verification, review gates | Pressure scenarios combining 3+ pressures (time + sunk cost + authority). Force A/B/C choices. Document rationalizations verbatim. |
| **Technique** | How-to guides, workflows | Application scenarios: can agent apply it correctly? Variation scenarios: does it handle edge cases? Gap testing: are instructions complete? |
| **Pattern** | Mental models, design heuristics | Recognition: does agent know when to apply? Counter-examples: does it know when NOT to apply? |
| **Reference** | API docs, command guides, schemas | Retrieval: can agent find the right info? Application: does it use what it found correctly? Coverage: are common use cases documented? |

### Pressure types for discipline skills

Combine 3+ of these in test scenarios to stress-test compliance:

| Pressure | Example |
|----------|---------|
| Time | Emergency, deadline, deploy window closing |
| Sunk cost | Hours of work already done, "waste" to redo |
| Authority | Senior says skip it, manager overrides |
| Exhaustion | End of day, many tasks already done |
| Pragmatic | "Being pragmatic not dogmatic" |

## Evaluation-Driven Development

Build evaluations BEFORE writing extensive documentation:

1. Run the agent on representative tasks WITHOUT the skill. Document failures or missing context.
2. Create at least 3 evaluation scenarios matching the skill type (see above).
3. Write minimal instructions to address the gaps.
4. Test with real usage, compare against baseline, refine.

## Testing Bundled Scripts

Added scripts must be tested by actually running them to ensure there are no bugs and that the output matches expectations. If there are many similar scripts, test a representative sample to build confidence while balancing time to completion.

Plan reusable contents before building them. For every example or workflow you want to document, ask first: should this be a script, a reference file, or inline instructions? Do not bulk up SKILL.md with content that belongs in a bundled asset.

## Natural-Trigger Testing

Give a fresh agent only a natural task that should trigger the skill. Never mention the skill name, files, scripts, or workflow. The agent must discover, load, and apply the skill entirely on its own.

### Protocol

1. **Spawn a fresh agent** with only the natural trigger phrase.

```
Bad:  "Load skill X, read TEMPLATE.md, run scripts/gather.mjs, then compose the output"
Good: "Generate a weekly changelog for Slack."
```

2. **Let it finish.** Do not intervene or correct mid-run.

3. **Resume the same agent session** and debrief:
   - Did you discover and load a skill? What triggered you to look for it?
   - Did you read auxiliary files (templates, references)? Which ones?
   - Did you run bundled scripts or fetch data manually?
   - Were any instructions unclear or contradictory?
   - Looking at your output, do you see formatting differences from the template?

4. **Score the output** against the template/rules. Check every formatting detail: bullet characters, separators, indentation, link format, emoji type.

5. **Classify each failure**:
   - Skill bug: contradictory rules, missing guidance, ambiguous instructions
   - Agent bug: ignored clear instructions (needs stronger language or examples)

### Scenarios

Run at least 3 per skill type (see Skill Types table above). For technique/workflow skills:
- **Application**: happy-path with real data
- **Variation**: edge case (empty input, unusual parameters)
- **Gap**: does the agent follow every formatting rule?

### Anti-patterns

- DO NOT tell the agent which skill to use
- DO NOT tell the agent which files to read
- DO NOT tell the agent which scripts to run
- DO NOT provide workflow steps in the prompt
- DO NOT test with toy/mock data when real data is available

## Iterative Refinement

1. Use the skill with real tasks (not toy examples).
2. Observe where the agent struggles, succeeds, or makes unexpected choices.
3. Refine instructions based on observed behavior, not assumptions.
4. Watch for: missed references, ignored content, unexpected exploration paths.

### Meta-testing after failures

When an agent makes the wrong choice despite having the skill, ask:
> "You read the skill and chose X anyway. How could the skill be written differently to make the correct choice obvious?"

Three diagnostic outcomes:
- **"The skill WAS clear, I chose to ignore it"** → need stronger language or foundational principle, not more docs
- **"The skill should have said X"** → documentation gap, add their suggestion
- **"I didn't see section Y"** → organization problem, make key points more prominent

## Verification Checklist

After creating or modifying a skill:

- Check that SKILL.md is ALL CAPS
- Verify directory name matches `name` field
- Confirm description is specific and actionable
- Test that skill appears in available skills list
- Ensure name is unique across all skill locations

## Troubleshooting

**Skill not showing up:** Check SKILL.md is ALL CAPS, frontmatter has `name` + `description`, name is unique, directory name matches `name` field.

**Agent not loading skill:** Check permissions in opencode.json, verify not set to `deny`, check agent-specific overrides.

**Name validation error:** Verify regex `^[a-z0-9]+(-[a-z0-9]+)*$`, check directory name matches exactly, no uppercase/underscores.

**Skill loads but agent doesn't use it:** Make description more specific, add keywords, ensure body has clear actionable instructions.

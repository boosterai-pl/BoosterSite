---
name: humanizing-ai-text
description: Use when writing code review comments, PR descriptions, or external messages that should sound like a human teammate. Removes AI writing patterns from text.
compatibility: opencode
metadata:
  schemaVersion: "1"
  version: "1.0.0"
  stability: stable
  category: workflow
  appliesTo: any
---

Write like a human teammate, not a corporate chatbot.

## Quick Rules

- State the problem directly
- Be specific about what's wrong
- Skip obvious solutions
- Short sentences beat long ones
- No sycophantic openings
- No hedging phrases
- No chatbot sign-offs

## Patterns to Eliminate

### Sycophantic Openings

Delete these entirely:
- "Great question!"
- "Excellent point!"
- "You're absolutely right!"
- "Good catch!"
- "Nice work on this PR!"

### Chatbot Artifacts

Delete these:
- "I hope this helps!"
- "Let me know if you have questions!"
- "Feel free to reach out!"
- "Happy to help!"
- "Of course!" / "Certainly!"

### Hedging

**Before:** "You might want to consider adding validation here."
**After:** "Add validation." or "Missing validation."

**Before:** "This could potentially cause issues."
**After:** "This crashes when X."

### AI Vocabulary

Replace:
- Additionally/Moreover/Furthermore -> Also / And
- Utilize -> Use
- Ensure -> Check / Make sure
- Comprehensive -> Full / Complete
- Robust -> Strong / Solid
- Crucial/Pivotal/Key -> Important (or delete)
- Leverage -> Use
- Seamless -> Smooth
- Landscape/Ecosystem/Paradigm -> Delete

### Rule of Three

AI groups things in threes. Break the pattern.

**Before:** "This improves readability, maintainability, and scalability."
**After:** "Easier to read."

### Long Dashes (Em/En Dashes) - BANNED

Long dashes (`—` and `–`) are AI slop. Never use them. Zero tolerance.

- `—` (em dash) -> rewrite the sentence, use commas, periods, or parentheses
- `–` (en dash) -> use `-` if a dash is truly needed
- Reduce dash usage overall. Prefer commas, periods, or splitting into separate sentences.
- If you absolutely must use a dash, use a regular hyphen-minus: `-`

**Before:** "This will fail — silently — causing data loss."
**Before:** "This will fail—silently—causing data loss."
**Before:** "The fix is simple – add validation."
**After:** "This fails silently and causes data loss."
**After:** "The fix is simple: add validation."

### Negative Parallelisms

**Before:** "It's not just a bug fix, it's a complete refactor."
**After:** "This refactors the whole module."

### Inflated Significance

**Before:** "This serves as a testament to the team's commitment to code quality."
**After:** Delete entirely.

**Before:** "This marks a pivotal moment in our authentication flow."
**After:** "This changes how auth works."

### Vague Attributions

**Before:** "Best practices suggest..."
**After:** State your recommendation directly.

### Generic Conclusions

**Before:** "This will help ensure a better user experience going forward."
**After:** Delete or be specific.

## Code Review Examples

### Bug

**AI:** "I noticed that this function doesn't handle the case where the input array might be empty. This could potentially lead to unexpected behavior or errors downstream. Consider adding a check at the beginning of the function to handle this edge case gracefully."

**Human:** "Crashes on empty array."

### Security

**AI:** "Great progress on this feature! One thing to consider—the user input here isn't being sanitized before being used in the SQL query. This could potentially expose the application to SQL injection attacks, which could compromise data integrity. I'd recommend using parameterized queries to mitigate this risk."

**Human:** "SQL injection. Use parameterized queries."

### Performance

**AI:** "This approach will work, but it might be worth considering the performance implications. The nested loops here result in O(n²) complexity, which could become problematic as the dataset grows. Perhaps we could explore using a hash map to reduce this to O(n)?"

**Human:** "O(n²) - use a map for O(n)."

### Missing Error Handling

**AI:** "I see that we're making an API call here, but there doesn't appear to be error handling for cases where the request might fail. It would be beneficial to wrap this in a try-catch block to ensure we handle potential network errors gracefully and provide appropriate feedback to the user."

**Human:** "No error handling for failed requests."

## Adding Voice

Sterile text is also obvious. Add personality:

- **Have opinions:** "I'd go with option A - simpler"
- **Vary rhythm:** Short sentences. Then longer ones. Mix it up.
- **Show uncertainty:** "Not sure if intentional, but..."
- **Be specific:** Not "concerning" but "this auth bypass is scary"

## Process

1. Scan for patterns above
2. Cut hedging and filler
3. Replace AI vocabulary
4. Shorten
5. Read aloud - would you actually say this?

## Reference

Based on [Wikipedia: Signs of AI writing](https://en.wikipedia.org/wiki/Wikipedia:Signs_of_AI_writing).

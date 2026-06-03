---
name: searching-the-web
description: Use when an agent needs to find documentation, code examples, best practices, GitHub issues, blog posts, or implementation patterns from the web or public repositories. Covers both ddgs (DuckDuckGo web search) and gh_grep (GitHub code search) with guidance on when to use each.
license: MIT
compatibility: opencode
metadata:
  schemaVersion: "1"
  version: "1.0.0"
  stability: stable
  category: workflow
  appliesTo: any
---

Two tools are available. Use each for what it's best at; combine them for thorough research.

---

## Tools

### `gh_grep` — GitHub Code Search (Vercel Grep MCP)

- Remote MCP server: `https://mcp.grep.app`
- No API key required
- Searches code across public GitHub repositories
- **Best for:** implementation patterns, real usage examples, config file examples, how a library is wired up in practice

### `ddgs` — DuckDuckGo Web Search (CLI)

- Installed via `pipx install ddgs`
- No API key required
- **Best for:** official docs, blog posts, articles, GitHub issues, Stack Overflow, changelogs, API references, any non-code web content

---

## Tool Selection

| Need                                     | Tool                         |
| ---------------------------------------- | ---------------------------- |
| How do people implement X in practice?   | `gh_grep`                    |
| What does a config file for X look like? | `gh_grep`                    |
| How is library Y used in real projects?  | `gh_grep`                    |
| Official documentation for X             | `ddgs`                       |
| Blog post / tutorial on X                | `ddgs`                       |
| GitHub issue about a bug in Y            | `ddgs`                       |
| Stack Overflow answer for X              | `ddgs`                       |
| Release notes / changelog for version Y  | `ddgs`                       |
| Recent news or announcements about X     | `ddgs news`                  |
| Thorough research (both breadth + depth) | `ddgs` first, then `gh_grep` |

---

## `ddgs` CLI — Commands and Examples

> **CRITICAL:** The query **must** be passed with the `-q` flag. Passing the query as a
> bare positional argument fails with `Error: No such command '...'`. Always use `-q`.

### Basic text search

```bash
ddgs text -q "nextjs app router data fetching" -m 10
ddgs text -q "drizzle orm postgres jsonb query" -m 8
ddgs text -q "railway deploy prisma migrate" -m 5
```

### Narrow to a specific site

```bash
ddgs text -q "site:docs.nestjs.com interceptors" -m 5
ddgs text -q "site:github.com drizzle-orm issue jsonb" -m 5
ddgs text -q "site:stackoverflow.com postgres row level security drizzle" -m 5
```

### Recent news / announcements

```bash
ddgs news -q "nextjs 15 release" -m 5
ddgs news -q "drizzle orm changelog 2024" -m 5
```

### Output format

- Default output prints `title`, `href`, and `body` snippet per result to stdout — use this.
- Do **not** use `-o json` — it writes to a file, not stdout.
- Use `-m` (short for `--max_results`) to limit result count.

---

## `gh_grep` MCP Tool — Usage Examples

Use the `gh_grep` tool (available via the Vercel Grep MCP server) with natural-language or code-snippet queries.

**Find how a library is typically initialized:**

```
gh_grep: "drizzle-orm postgres createClient"
```

**Find config file examples:**

```
gh_grep: "railway.json startCommand node"
```

**Find usage patterns for a specific API:**

```
gh_grep: "useFormState server action nextjs app router"
```

**Find how others wire up a NestJS module:**

```
gh_grep: "NestJS BullMQ module forRoot redis"
```

**Find real-world examples of a pattern:**

```
gh_grep: "PostGIS ST_Within drizzle ORM raw sql"
```

---

## Search Strategy

### Start broad, then narrow

1. Begin with a broad `ddgs` query to get orientation — what exists, which resources are authoritative
2. Identify the most relevant library/framework version
3. Use `gh_grep` to find real code showing the pattern in action
4. Fetch the most promising URL to read the actual content

### Query formulation tips

- Include the library/framework name and version if known: `"react-hook-form v7 register array"`
- Include error messages verbatim when debugging: `"FATAL: role does not exist prisma railway"`
- Use `site:` to cut noise when you know the right source: `site:nextjs.org`
- For recent changes, use `ddgs news` to find blog posts from the last 6 months
- Prefer specific terms over generic ones: `"optimistic update server action"` beats `"nextjs update"`

### When to combine both tools

Always combine for:

- Unfamiliar libraries (ddgs for docs overview → gh_grep for real usage)
- Debugging obscure errors (ddgs for known issues → gh_grep for workarounds in code)
- Architecture decisions (ddgs for opinions/benchmarks → gh_grep for what people actually ship)

---

## Verifying Results

**Never trust a snippet alone.** Always fetch and read the actual page.

1. Get URLs from `ddgs` or `gh_grep` results
2. Fetch the page content to read it fully
3. Check the date — docs and blog posts go stale; prefer results from the last 1–2 years unless the topic is stable
4. Cross-reference: if two independent sources agree, higher confidence
5. For GitHub issues, check if the issue is open or closed and read the resolution

---

## DOs and DON'Ts

**DO**

- Use `--max-results 5–10` for `ddgs`; more results rarely help and add noise
- Fetch URLs to read full content — snippets in search results are truncated and often misleading
- Use `site:` operators to target high-quality sources (official docs, GitHub, Stack Overflow)
- Use `ddgs news` when looking for recent releases, breaking changes, or announcements
- Try multiple query phrasings if the first attempt returns irrelevant results
- Note the source domain when evaluating credibility (official docs > random blog > forum)

**DON'T**

- Don't pass the query as a bare positional argument to `ddgs` — it fails. Always use `-q "query text"`
- Don't use `-o json` with `ddgs` — it writes to a file, not stdout
- Don't rely solely on search result snippets to answer a question — always read the source
- Don't confuse `gh_grep` with a full GitHub search — it searches code content, not issue titles or PR descriptions
- Don't make up URLs — only use URLs returned by search results or provided by the user
- Don't skip version-checking; a pattern valid in v1 may be wrong in v2
- Don't use `ddgs` for library-specific API docs when Context7 MCP is available — Context7 is more reliable for that

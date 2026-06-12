# Deferred Findings

Captured via `agentkit findings add`. Consumed by the librarian.

## robots.txt returns 404 (robots.ts inside (frontend) route group)
**Type:** concern
**Scope:** general
**Context:** src/app/(frontend)/robots.ts
**Captured:** 2026-06-12T10:11:19.223Z
**Body:**
```
src/app/(frontend)/robots.ts never produces /robots.txt — 404 locally and on production. robots.ts must live at src/app/robots.ts. Pre-existing, out of scope of locale-routing refactor.
```

---

## npm run lint broken: next lint removed in Next 16
**Type:** concern
**Scope:** general
**Context:** package.json scripts.lint
**Captured:** 2026-06-12T10:11:19.293Z
**Body:**
```
lint script 'next lint' fails (Invalid project directory .../lint) — removed in Next 16. Pre-existing on main; migrate to eslint CLI.
```

---

## loadSite silent static fallback masks DB failures
**Type:** concern
**Scope:** local
**Context:** —
**Captured:** 2026-06-12T10:35:04.791Z
**Body:**
```
loadSite() catches ALL errors and silently falls back to static site.ts content. Pages deriving notFound() from its output can cache transient DB failures as 404s (hit on /careers/[slug]). Fixed there by querying Payload directly, but every other page silently serves stale static copy on DB failure with zero alerting. Consider: rethrow in prod + error monitoring, or distinguish fallback in the return type.

```

---

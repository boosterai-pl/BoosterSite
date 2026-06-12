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

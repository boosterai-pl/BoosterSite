---
name: managing-payload-content
description: Use when reading or editing Payload CMS content — blog posts, services, case studies, team members, practices, or home-page copy. Use when changing site copy texts, updating CTAs, adding blog posts, managing collections, or querying content via curl. Covers all CRUD operations the Payload REST API exposes.
compatibility: opencode
---

## Base URL

Always `http://localhost:3000/api`. Requires the local dev server running (`npm run dev`).

## Auth

**Reads (GET)** — all collections are public, no auth needed.

**Writes (POST / PATCH / DELETE)** — require a Payload JWT. Get one from `.env.local`:

```bash
PAYLOAD_EMAIL=$(dotenvx get PAYLOAD_EMAIL -f .env.local)
PAYLOAD_PASSWORD=$(dotenvx get PAYLOAD_PASSWORD -f .env.local)
TOKEN=$(curl -s -X POST http://localhost:3000/api/users/login \
  -H "Content-Type: application/json" \
  -d "{\"email\":\"$PAYLOAD_EMAIL\",\"password\":\"$PAYLOAD_PASSWORD\"}" \
  | jq -r .token)
```

Use `Authorization: JWT $TOKEN` on all write requests. Tokens expire — re-login if you get a 401.

If `PAYLOAD_EMAIL` / `PAYLOAD_PASSWORD` are not in `.env.local`, ask the user to add them.

## Localization

All localized fields accept `?locale=en` (default) or `?locale=pl`. To update both locales, make two PATCH calls — one per locale.

## Common Query Parameters

| Param | Example | Effect |
|-------|---------|--------|
| `locale` | `?locale=pl` | Return Polish copy |
| `limit` | `?limit=100` | Max docs returned (default 10) |
| `sort` | `?sort=sortOrder` | Sort by field |
| `where[field][equals]` | `?where[slug][equals]=my-post` | Filter |
| `depth` | `?depth=1` | Populate relationships (default 0) |
| `draft` | `?draft=true` | Include draft versions (posts only) |

## Collections Overview

| Collection | Slug | Write? | Reference |
|------------|------|--------|-----------|
| Posts | `posts` | full CRUD | [references/posts.md](references/posts.md) |
| Services | `services` | read only | [references/collections.md](references/collections.md) |
| Case Studies | `case-studies` | read only | [references/collections.md](references/collections.md) |
| Team Members | `team-members` | read only | [references/collections.md](references/collections.md) |
| Practices | `practices` | read only | [references/collections.md](references/collections.md) |
| Home Page (global) | `home-page` | read only | [references/home-page.md](references/home-page.md) |

## Quick Recipes

**List all posts (published, English):**
```bash
curl "http://localhost:3000/api/posts?locale=en&limit=100"
```

**Get home-page copy:**
```bash
curl "http://localhost:3000/api/globals/home-page?locale=en"
```

**Update a post field:**
```bash
curl -s -X PATCH "http://localhost:3000/api/posts/$POST_ID" \
  -H "Authorization: JWT $TOKEN" \
  -H "Content-Type: application/json" \
  -d '{"title": "New title"}'
```

## DOs and DON'Ts

- DO check `jq` is available; pipe responses through `| jq` for readability
- DO re-login if you get a 401 — tokens expire
- DO use `?depth=1` when you need related documents (author, featuredImage) populated
- DO make separate PATCH calls per locale when updating localized fields
- DON'T include `id`, `createdAt`, `updatedAt` in create/update bodies
- DON'T attempt writes on services, case-studies, team-members, practices, or home-page via REST — those are admin-managed; direct the user to the Payload admin panel at `http://localhost:3000/admin`

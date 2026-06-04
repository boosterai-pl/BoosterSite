---
name: managing-payload-content
description: Use when reading or editing Payload CMS content — blog posts, services, case studies, team members, practices, or home-page copy. Use when changing site copy texts, updating CTAs, adding blog posts, managing collections, or querying content via curl. Covers all CRUD operations the Payload REST API exposes.
compatibility: opencode
---

## Setup

Read the base URL and credentials from `.env.local` at the start of every session:

```bash
BASE=$(dotenvx get PAYLOAD_URL -f .env.local)
# BASE is e.g. https://boostersite-nine.vercel.app or http://localhost:3000
```

If `PAYLOAD_URL` is not set, ask the user. Do not hardcode a URL.

Admin panel: `$BASE/admin`

## Auth

**Reads (GET)** — all collections are public, no auth needed.

**Writes (POST / PATCH / DELETE)** — require a Payload JWT:

```bash
BASE=$(dotenvx get PAYLOAD_URL -f .env.local)
PAYLOAD_EMAIL=$(dotenvx get PAYLOAD_EMAIL -f .env.local)
PAYLOAD_PASSWORD=$(dotenvx get PAYLOAD_PASSWORD -f .env.local)
TOKEN=$(curl -s -X POST "$BASE/api/users/login" \
  -H "Content-Type: application/json" \
  -d "{\"email\":\"$PAYLOAD_EMAIL\",\"password\":\"$PAYLOAD_PASSWORD\"}" \
  | jq -r .token)
```

Use `Authorization: JWT $TOKEN` on all write requests. Re-login on 401.

If `PAYLOAD_EMAIL` / `PAYLOAD_PASSWORD` are not in `.env.local`, ask the user to add them.

## Localization

All localized fields accept `?locale=en` (default) or `?locale=pl`. Make two PATCH calls — one per locale — when updating localized fields.

## Query Parameters

| Param | Example | Effect |
|-------|---------|--------|
| `locale` | `?locale=pl` | Return Polish copy |
| `limit` | `?limit=100` | Max docs returned (default 10) |
| `sort` | `?sort=sortOrder` | Sort by field |
| `where` filter | see below | Filter by field value |
| `depth` | `?depth=1` | Populate relationships (default 0) |
| `draft` | `?draft=true` | Include draft versions (posts only) |

**`where` filter** — URL-encode the brackets or quote the full URL:

```bash
# URL-encoded (safe in all shells)
curl "$BASE/api/practices?where%5Bslug%5D%5Bequals%5D=crm-implementation&locale=en"

# Quoted URL (also works in bash)
curl "$BASE/api/practices?where[slug][equals]=crm-implementation&locale=en"
```

## Collections Overview

| Collection | Slug | Write? | Reference |
|------------|------|--------|-----------|
| Posts | `posts` | full CRUD | [references/posts.md](references/posts.md) |
| Services | `services` | full CRUD | [references/collections.md](references/collections.md) |
| Case Studies | `case-studies` | full CRUD | [references/collections.md](references/collections.md) |
| Team Members | `team-members` | full CRUD | [references/collections.md](references/collections.md) |
| Practices | `practices` | full CRUD | [references/collections.md](references/collections.md) |
| Home Page (global) | `home-page` | read + update | [references/home-page.md](references/home-page.md) |

## Quick Recipes

**List all services (ordered):**
```bash
curl "$BASE/api/services?locale=en&limit=100&sort=sortOrder"
```

**Get home-page copy:**
```bash
curl "$BASE/api/globals/home-page?locale=en" | jq '{brand, tagline, heroLead}'
```

**Find practice by slug:**
```bash
curl "$BASE/api/practices?where%5Bslug%5D%5Bequals%5D=crm-implementation&locale=en"
```

**Update a post field:**
```bash
curl -s -X PATCH "$BASE/api/posts/$POST_ID?locale=en" \
  -H "Authorization: JWT $TOKEN" \
  -H "Content-Type: application/json" \
  -d '{"title": "New title"}'
```

**Update home-page copy (global — POST = update):**
```bash
curl -s -X POST "$BASE/api/globals/home-page?locale=en" \
  -H "Authorization: JWT $TOKEN" \
  -H "Content-Type: application/json" \
  -d '{"heroLead": "New lead text."}'
```

**Create a team member:**
```bash
curl -s -X POST "$BASE/api/team-members" \
  -H "Authorization: JWT $TOKEN" \
  -H "Content-Type: application/json" \
  -d '{"sortOrder": "05", "name": "Jane Doe", "role": "Engineer"}'
```

## DOs and DON'Ts

- DO read `PAYLOAD_URL` from `.env.local` every time — never hardcode
- DO pipe responses through `| jq` for readability
- DO re-login if you get a 401 — tokens expire
- DO use `?depth=1` when you need related documents populated
- DO make separate PATCH calls per locale for localized fields
- DON'T include `id`, `createdAt`, `updatedAt` in create/update bodies
- DON'T include `id`, `createdAt`, `updatedAt`, or `readingTime` in create/update bodies — these are auto-managed

# Read-Only Collections Reference

These collections are managed via the Payload admin panel (`http://localhost:3000/admin`). Agents can read them freely — writes require direct admin access.

---

## Services

Slug: `services` | Localized: `title`, `description`, `tags[].tag`

### Field Schema

| Field | Type | Notes |
|-------|------|-------|
| `sortOrder` | text | Display order, e.g. `"01"`, `"02"` |
| `slug` | text | URL slug, e.g. `crm-implementation` |
| `title` | text | localized |
| `description` | textarea | localized |
| `tags` | array | each item: `{ "tag": "string" }` (localized) |

### Queries

```bash
# List all services (English, ordered)
curl "http://localhost:3000/api/services?locale=en&limit=100&sort=sortOrder"

# Get single service by slug
curl "http://localhost:3000/api/services?where[slug][equals]=crm-implementation&locale=en"

# Get single service by ID
curl "http://localhost:3000/api/services/$ID?locale=en"
```

---

## Case Studies

Slug: `case-studies` | Localized: `title`, `description`, `tags[].tag`

### Field Schema

| Field | Type | Notes |
|-------|------|-------|
| `sortOrder` | text | Display order, e.g. `"01"` |
| `title` | text | localized |
| `description` | textarea | localized |
| `tags` | array | each item: `{ "tag": "string" }` (localized) |

### Queries

```bash
# List all case studies
curl "http://localhost:3000/api/case-studies?locale=en&limit=100&sort=sortOrder"

# Get by ID
curl "http://localhost:3000/api/case-studies/$ID?locale=en"
```

---

## Team Members

Slug: `team-members` | Localized: `role`

### Field Schema

| Field | Type | Notes |
|-------|------|-------|
| `sortOrder` | text | Display order |
| `name` | text | not localized |
| `role` | text | localized |
| `photo` | upload → media | media document ID |

### Queries

```bash
# List all team members
curl "http://localhost:3000/api/team-members?locale=en&limit=100&sort=sortOrder"

# With photo populated
curl "http://localhost:3000/api/team-members?locale=en&depth=1&sort=sortOrder"

# Get by ID
curl "http://localhost:3000/api/team-members/$ID?locale=en"
```

---

## Practices

Slug: `practices` | Localized: `eyebrow`, `headline.text`, `headline.accent`, `lead`, `heroCta.*`, `sections[].title`, `sections[].body`, `cta.microCopy`, `cta.label`

### Field Schema

| Field | Type | Notes |
|-------|------|-------|
| `sortOrder` | text | Display order |
| `slug` | text | URL slug for subpage (required) |
| `eyebrow` | text | localized; small label above headline |
| `headline.text` | text | localized; main headline |
| `headline.accent` | text | localized; blue italic accent appended to headline |
| `lead` | textarea | localized; intro paragraph |
| `heroCta.microCopy` | text | localized; small text above CTA button |
| `heroCta.label` | text | localized; CTA button label |
| `heroCta.href` | text | CTA URL |
| `sections` | array | each: `{ title, body }` (both localized) |
| `cta.microCopy` | text | localized |
| `cta.label` | text | localized, required |
| `cta.href` | text | required |

### Queries

```bash
# List all practices
curl "http://localhost:3000/api/practices?locale=en&limit=100&sort=sortOrder"

# Get by slug
curl "http://localhost:3000/api/practices?where[slug][equals]=crm-implementation&locale=en"

# Get by ID
curl "http://localhost:3000/api/practices/$ID?locale=en"
```

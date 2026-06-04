# Collections Reference

All collections below support full CRUD via the Payload REST API. Reads are public (no auth). Writes require a JWT — see the Auth section in [SKILL.md](../SKILL.md).

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
curl "$BASE/api/services?locale=en&limit=100&sort=sortOrder"

# Get single service by slug
curl "$BASE/api/services?where%5Bslug%5D%5Bequals%5D=crm-implementation&locale=en"

# Get single service by ID
curl "$BASE/api/services/$ID?locale=en"
```

### Writes

```bash
# Create
curl -s -X POST "$BASE/api/services" \
  -H "Authorization: JWT $TOKEN" \
  -H "Content-Type: application/json" \
  -d '{"sortOrder": "05", "slug": "new-service", "title": "New Service", "description": "Short description.", "tags": [{"tag": "automation"}]}'

# Update (PATCH — send only changed fields)
curl -s -X PATCH "$BASE/api/services/$ID?locale=en" \
  -H "Authorization: JWT $TOKEN" \
  -H "Content-Type: application/json" \
  -d '{"title": "Updated Title"}'

# Delete
curl -s -X DELETE "$BASE/api/services/$ID" \
  -H "Authorization: JWT $TOKEN"
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
curl "$BASE/api/case-studies?locale=en&limit=100&sort=sortOrder"

# Get by ID
curl "$BASE/api/case-studies/$ID?locale=en"
```

### Writes

```bash
# Create
curl -s -X POST "$BASE/api/case-studies" \
  -H "Authorization: JWT $TOKEN" \
  -H "Content-Type: application/json" \
  -d '{"sortOrder": "03", "title": "New Case Study", "description": "What we did.", "tags": [{"tag": "crm"}]}'

# Update
curl -s -X PATCH "$BASE/api/case-studies/$ID?locale=en" \
  -H "Authorization: JWT $TOKEN" \
  -H "Content-Type: application/json" \
  -d '{"title": "Updated Title"}'

# Delete
curl -s -X DELETE "$BASE/api/case-studies/$ID" \
  -H "Authorization: JWT $TOKEN"
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
curl "$BASE/api/team-members?locale=en&limit=100&sort=sortOrder"

# With photo populated
curl "$BASE/api/team-members?locale=en&depth=1&sort=sortOrder"

# Get by ID
curl "$BASE/api/team-members/$ID?locale=en"
```

### Writes

```bash
# Create (photo is optional — pass a media document ID if available)
curl -s -X POST "$BASE/api/team-members" \
  -H "Authorization: JWT $TOKEN" \
  -H "Content-Type: application/json" \
  -d '{"sortOrder": "04", "name": "Jane Doe", "role": "Engineer"}'

# Update role (localized — repeat for each locale)
curl -s -X PATCH "$BASE/api/team-members/$ID?locale=en" \
  -H "Authorization: JWT $TOKEN" \
  -H "Content-Type: application/json" \
  -d '{"role": "Senior Engineer"}'

# Delete
curl -s -X DELETE "$BASE/api/team-members/$ID" \
  -H "Authorization: JWT $TOKEN"
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
curl "$BASE/api/practices?locale=en&limit=100&sort=sortOrder"

# Get by slug
curl "$BASE/api/practices?where%5Bslug%5D%5Bequals%5D=crm-implementation&locale=en"

# Get by ID
curl "$BASE/api/practices/$ID?locale=en"
```

### Writes

```bash
# Create
curl -s -X POST "$BASE/api/practices" \
  -H "Authorization: JWT $TOKEN" \
  -H "Content-Type: application/json" \
  -d '{
    "sortOrder": "06",
    "slug": "new-practice",
    "eyebrow": "What we do",
    "headline": {"text": "Practice Headline", "accent": "accent part"},
    "lead": "Intro paragraph.",
    "heroCta": {"microCopy": "Ready?", "label": "Get started", "href": "/contact"},
    "sections": [{"title": "Section 1", "body": "Body text."}],
    "cta": {"microCopy": "Let us help", "label": "Contact us", "href": "/contact"}
  }'

# Update a field (localized)
curl -s -X PATCH "$BASE/api/practices/$ID?locale=en" \
  -H "Authorization: JWT $TOKEN" \
  -H "Content-Type: application/json" \
  -d '{"eyebrow": "Updated eyebrow"}'

# Delete
curl -s -X DELETE "$BASE/api/practices/$ID" \
  -H "Authorization: JWT $TOKEN"
```

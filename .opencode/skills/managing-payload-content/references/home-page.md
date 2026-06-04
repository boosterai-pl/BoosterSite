# Home Page Global Reference

Slug: `home-page` (global) | Read-only via REST | Edit via admin panel: `http://localhost:3000/admin`

## Fetch

```bash
# Full home page (English)
curl "$BASE/api/globals/home-page?locale=en"

# Polish
curl "$BASE/api/globals/home-page?locale=pl"

# With relationships populated (servicesItems, casesItems, teamMembers)
curl "$BASE/api/globals/home-page?locale=en&depth=1"
```

---

## Field Map

All localized fields accept `?locale=en` or `?locale=pl`.

### Meta tab

| Field | Type | Localized | Notes |
|-------|------|-----------|-------|
| `brand` | text | no | Brand name, e.g. `"Booster"` |
| `tagline` | text | yes | Short tagline |
| `contactEmail` | email | no | Contact address |
| `establishedLine` | text | yes | e.g. `"Est. 2021"` |
| `version` | text | no | Internal version string |

### Navigation tab

| Field | Type | Notes |
|-------|------|-------|
| `nav` | array | each: `{ label (localized), href }` |
| `navCta.label` | text | localized; nav CTA button |
| `navCta.href` | text | |

### Hero tab

| Field | Type | Localized | Notes |
|-------|------|-----------|-------|
| `heroEyebrow` | text | yes | Small label above headline |
| `heroEstablishedLabel` | text | yes | e.g. `"Since 2021"` |
| `heroHeadlineLines` | array | yes | each: `{ text, accent }` — accent renders in blue italic |
| `heroLead` | textarea | yes | Hero paragraph |
| `heroPrimaryCta.label` | text | yes | |
| `heroPrimaryCta.href` | text | no | |
| `heroSecondaryCta.label` | text | yes | |
| `heroSecondaryCta.href` | text | no | |
| `heroMeta` | array | yes | each: `{ label, value, logos: [{ name, component }] }` — `component` is a key from `BrandLogos.tsx` |

### Marquee tab

| Field | Type | Notes |
|-------|------|-------|
| `marquee` | array | each: `{ label (localized) }` — scrolling ticker items |

### Manifesto tab

| Field | Type | Localized | Notes |
|-------|------|-----------|-------|
| `manifestoEyebrow` | text | yes | |
| `manifestoHeadline.text` | text | yes | |
| `manifestoHeadline.accent` | text | yes | Blue italic accent |
| `manifestoEntries` | array | yes | each: `{ entryId (not localized), title, body }` |

### Services tab

| Field | Type | Localized | Notes |
|-------|------|-----------|-------|
| `servicesEyebrow` | text | yes | |
| `servicesHeadline.text` | text | yes | |
| `servicesHeadline.accent` | text | yes | |
| `servicesItems` | relationship → services | no | array of service IDs; use `?depth=1` to populate |

### Cases tab

| Field | Type | Localized | Notes |
|-------|------|-----------|-------|
| `casesEyebrow` | text | yes | |
| `casesHeadline.text` | text | yes | |
| `casesHeadline.accent` | text | yes | |
| `casesItems` | relationship → case-studies | no | array of case-study IDs; use `?depth=1` to populate |

### Speed / Why Us tab

| Field | Type | Localized | Notes |
|-------|------|-----------|-------|
| `speedEyebrow` | text | yes | |
| `speedHeadlineLines` | array | yes | each: `{ text, accent }` |
| `speedStats` | array | partial | each: `{ value (not localized), suffix (localized), label (localized) }` |

### Process tab

| Field | Type | Localized | Notes |
|-------|------|-----------|-------|
| `processEyebrow` | text | yes | |
| `processHeadline.text` | text | yes | |
| `processHeadline.accent` | text | yes | |
| `processSteps` | array | yes | each: `{ stepId (not localized), title, description }` |

### Partners tab

| Field | Type | Localized | Notes |
|-------|------|-----------|-------|
| `partnersEyebrow` | text | yes | |
| `partnersItems` | array | partial | each: `{ name (not localized), role (localized) }` |

### Team tab

| Field | Type | Localized | Notes |
|-------|------|-----------|-------|
| `teamEyebrow` | text | yes | |
| `teamHeadline.text` | text | yes | |
| `teamHeadline.accent` | text | yes | |
| `teamMembers` | relationship → team-members | no | array of IDs; use `?depth=1` to populate |

### Insights tab

| Field | Type | Localized | Notes |
|-------|------|-----------|-------|
| `insightsEyebrow` | text | yes | |
| `insightsHeadline.text` | text | yes | |
| `insightsHeadline.accent` | text | yes | |
| `insightsPosts` | array | yes | each: `{ insightId, category, date, title }` — static copy, not linked to posts collection |

### CTA tab

| Field | Type | Localized | Notes |
|-------|------|-----------|-------|
| `ctaEyebrow` | text | yes | |
| `ctaHeadlineLines` | array | yes | each: `{ text, accent }` |
| `ctaBody` | textarea | yes | |
| `ctaButton.label` | text | yes | |
| `ctaButton.href` | text | no | |

### Footer tab

| Field | Type | Localized | Notes |
|-------|------|-----------|-------|
| `footerIntro` | text | yes | |
| `footerColumns` | array | yes | each: `{ heading, links: [{ label, href }] }` — `href` not localized |
| `footerBottom` | array | yes | each: `{ text }` — copyright / legal lines |

---

## Editing Home Page Copy

Home page is read-only via the REST API (no unauthenticated writes, and admin-only by design). To change copy:

1. Read the current value: `curl "$BASE/api/globals/home-page?locale=en" | jq '.fieldName'`
2. Open the admin panel: `$BASE/admin/globals/home-page`
3. Navigate to the relevant tab and edit directly

Or, if write access via JWT is needed (and the user has admin credentials):

```bash
curl -s -X POST "$BASE/api/globals/home-page" \
  -H "Authorization: JWT $TOKEN" \
  -H "Content-Type: application/json" \
  -d '{"heroLead": "Updated lead text."}'
```

Note: `POST` on a global updates it (globals have no `id` — there is only one document).

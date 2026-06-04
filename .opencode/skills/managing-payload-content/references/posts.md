# Posts — Full CRUD Reference

Slug: `posts` | Drafts: enabled | Localized fields: `title`, `excerpt`, `content`, `tags[].tag`, `seoTitle`, `seoDescription`

## Field Schema

| Field | Type | Required | Notes |
|-------|------|----------|-------|
| `title` | text | yes | localized |
| `slug` | text | no | auto-generated from title on create; override if needed |
| `excerpt` | textarea | yes | localized; used as meta description (max 160 chars) |
| `content` | richText | yes | localized; Lexical JSON — see format below |
| `featuredImage` | upload → media | no | media document ID |
| `author` | relationship → team-members | no | team-member document ID |
| `publishedAt` | date | yes | ISO 8601, e.g. `"2025-06-01T12:00:00.000Z"` |
| `tags` | array | no | each item: `{ "tag": "string" }` (localized) |
| `readingTime` | number | no | auto-calculated; do not set manually |
| `seoTitle` | text | no | localized; overrides `<title>` tag |
| `seoDescription` | textarea | no | localized; overrides excerpt for meta |
| `seoOgImage` | upload → media | no | media document ID |
| `seoCanonicalUrl` | text | no | override canonical if cross-posted |

## richText Format (Lexical)

Payload's Lexical editor stores content as JSON. Minimal paragraph example:

```json
{
  "root": {
    "type": "root",
    "children": [
      {
        "type": "paragraph",
        "children": [{ "type": "text", "text": "Your paragraph text here.", "version": 1 }],
        "version": 1
      }
    ],
    "direction": "ltr",
    "format": "",
    "indent": 0,
    "version": 1
  }
}
```

When updating `content`, always send a complete valid Lexical root object. Fetch the existing post first to preserve structure when making targeted edits.

## List Posts

```bash
# All published posts, English
curl "$BASE/api/posts?locale=en&limit=100&sort=-publishedAt"

# Draft posts included
curl "$BASE/api/posts?locale=en&draft=true&limit=100"

# Filter by slug
curl "$BASE/api/posts?where%5Bslug%5D%5Bequals%5D=my-post-slug&locale=en"
```

Response shape: `{ docs: [...], totalDocs, limit, page, totalPages, hasNextPage, hasPrevPage }`

## Get Single Post

```bash
# By ID
curl "$BASE/api/posts/$POST_ID?locale=en"

# With author and featuredImage populated
curl "$BASE/api/posts/$POST_ID?locale=en&depth=1"
```

## Create Post

```bash
curl -s -X POST "$BASE/api/posts" \
  -H "Authorization: JWT $TOKEN" \
  -H "Content-Type: application/json" \
  -d '{
    "title": "Post Title",
    "excerpt": "Short description for SEO (max 160 chars).",
    "content": {
      "root": {
        "type": "root",
        "children": [{"type": "paragraph","children": [{"type": "text","text": "Body text.","version": 1}],"version": 1}],
        "direction": "ltr","format": "","indent": 0,"version": 1
      }
    },
    "publishedAt": "2025-06-01T12:00:00.000Z",
    "tags": [{ "tag": "automation" }]
  }'
```

The response includes the created document with its `id`. Save it for subsequent updates.

## Update Post

Only send fields you want to change — PATCH is non-destructive for top-level fields.

```bash
# Update title (English)
curl -s -X PATCH "$BASE/api/posts/$POST_ID?locale=en" \
  -H "Authorization: JWT $TOKEN" \
  -H "Content-Type: application/json" \
  -d '{"title": "Updated Title"}'

# Update title (Polish) — separate call
curl -s -X PATCH "$BASE/api/posts/$POST_ID?locale=pl" \
  -H "Authorization: JWT $TOKEN" \
  -H "Content-Type: application/json" \
  -d '{"title": "Zaktualizowany tytuł"}'

# Update tags (replaces the entire array)
curl -s -X PATCH "$BASE/api/posts/$POST_ID" \
  -H "Authorization: JWT $TOKEN" \
  -H "Content-Type: application/json" \
  -d '{"tags": [{"tag": "ai"}, {"tag": "automation"}]}'
```

**Important for arrays:** PATCH on an array field replaces the entire array. Fetch existing tags first if you want to append.

## Delete Post

```bash
curl -s -X DELETE "$BASE/api/posts/$POST_ID" \
  -H "Authorization: JWT $TOKEN"
```

## Copy-text Edit Workflow

When asked to change copy in a post:

1. Fetch the post: `curl "$BASE/api/posts?where%5Bslug%5D%5Bequals%5D=SLUG&locale=en"`
2. Extract the `id` and the field(s) to change
3. PATCH only the changed fields
4. If bilingual, repeat for `?locale=pl`
5. Confirm: re-fetch and show the updated field value

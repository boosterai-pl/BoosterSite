---
name: editing-site-content
description: Use when changing any text, link, photo, or list on boosterai.pl — home page copy, hero, CTA, nav, footer, services, practice pages, case studies, team members, job roles / careers / job postings, blog posts / articles, translations, Polish (pl) or English (en) versions, or when asked to "add", "remove", "update", "rename", "translate", or "reorder" anything on the website. Also use when a content file fails the build with "is missing", "frontmatter field", or a TypeScript error in src/content/.
compatibility: opencode
---

All content lives in the repo. There is no CMS and no database. Edit the files below, run the checks, commit, push.

## Where content lives

| What the user calls it | File(s) | URL |
|---|---|---|
| Home page text (hero, manifesto, speed, process, partners, CTA, section headings), nav menu, footer, booking box | `src/content/home/en.ts` + `src/content/home/pl.ts` | `/`, every page's nav/footer |
| Services (cards on home page) and their detail pages | `src/content/services/<slug>.ts`, order in `src/content/services/index.ts` | `/#services`, `/practices/<slug>` |
| Case studies ("Work" section) | `src/content/case-studies.ts` | `/#work` |
| Team | `src/content/team.ts`, photos in `public/assets/team/` | `/#team` |
| Job roles | `src/content/careers/<slug>.en.md` + `<slug>.pl.md` | `/careers`, `/careers/<slug>` |
| Blog posts | `src/content/blog/<slug>.en.md` + `<slug>.pl.md` | `/blog`, `/blog/<slug>` |
| Page titles/descriptions (SEO), careers page headings and buttons | `src/messages/en.json` + `src/messages/pl.json` | — |
| LegalFlow landing page (Polish only) | `src/app/restrukturyzacja/page.tsx` (text is inline JSX) | `/restrukturyzacja`, `restrukturyzacja.boosterai.pl` |
| Blog listing heading and empty state | `src/app/(frontend)/[locale]/blog/page.tsx` (inline) | `/blog` |

Types for every content file are in `src/content/types.ts`. `loadSite()` in `src/content/index.ts` assembles them; components never import content files directly.

## Rules

- **Always change both languages.** Every edit to `en` needs the matching edit to `pl`, and the reverse. If the user gives text in one language, write the other yourself (natural, professional Polish or English, not word-for-word) and tell the user what you wrote.
- Keep the user's wording exactly when they provide it. Do not "improve" copy that was not asked about.
- In `home/pl.ts`, write internal links without `/pl` (`"/careers"`, `"/practices/ai-automation"`). The `/pl` prefix is added automatically for nav and footer links.
- Anchor links (`#services`, `#work`, `#team`, `#process`, `#about`, `#contact`) point to home page sections. Keep them as they are.
- Display numbers (`01`, `02`, ...) for services, case studies and team are generated from list order. To reorder, move the item in the array.
- `headline.text` may contain `\n` for a line break. `headline.accent` is the blue italic part rendered after `text`.
- Booking link everywhere: `https://cal.com/szymon-bazan-iahn2z`.
- Never hardcode copy inside components in `src/components/`. Put it in a content file.
- Never add a CMS, database, or external content API.

## Recipes

### Change home page text

Edit the field in `src/content/home/en.ts`, then the same field in `src/content/home/pl.ts`. Both files have the same structure (type `HomeCopy`), so TypeScript fails if one is missing a field.

### Add a blog post

Create two files with the same slug (lowercase, hyphens, no Polish characters):

`src/content/blog/<slug>.en.md`
```markdown
---
title: "How we automated invoice processing"
description: "One or two sentences for the blog listing and Google (max ~160 chars)."
date: 2026-10-16
author: "Szymon Bazan"
tags: ["AI", "Automation"]
# Optional:
# seoTitle: "Shorter title for Google"
# seoDescription: "Overrides description in search results"
# draft: true          # hides the post everywhere
---
## First section

Body in Markdown: paragraphs, **bold**, *italic*, [links](https://example.com), lists, ## / ### headings.
```

`src/content/blog/<slug>.pl.md` — same frontmatter keys, Polish values, same `date`.

- Do not start the body with `# Title`; the page renders the title.
- Images: put them in `public/assets/blog/<slug>/` and reference `![Alt text](/assets/blog/<slug>/image.jpg)`.
- The first tag is used on the generated social image.

### Add or edit a job role

Create `src/content/careers/<slug>.en.md` and `<slug>.pl.md`:

```markdown
---
title: "Senior AI Engineer"
department: "Engineering"
location: "Wrocław / Remote (PL or EU timezone)"
employmentType: full-time        # full-time | part-time | contract | internship
description: "Short summary shown on the /careers list."
applyUrl: "mailto:hello@boosterai.pl?subject=Senior%20AI%20Engineer"
order: 3                         # position on /careers, lowest first
open: true                       # false hides the role without deleting it
---
## About the role

Full posting in Markdown. Leave the body empty to list the role without a detail page.
```

- To close a role: set `open: false` in **both** files (keeps history), or delete both files.
- `applyUrl` may be `mailto:` or `https://`. Encode spaces in the subject as `%20`. Empty means `hello@boosterai.pl`.

### Add a team member

1. Save the photo as `public/assets/team/<first-last>.jpg`, square, 800×800 px, JPG. Resize with `sips -Z 800 <file>` if needed.
2. Add an entry to `src/content/team.ts` at the position where it should appear:
   ```ts
   {
     name: "Jan Kowalski",
     photo: "/assets/team/jan-kowalski.jpg",
     role: { en: "Head of Sales", pl: "Head of Sales" },
   },
   ```
3. To remove someone, delete their entry. Delete the photo too unless it is used elsewhere (`grep -r <file> src`).

### Add a service

1. Copy an existing file, e.g. `src/content/services/ai-automation.ts` → `src/content/services/<slug>.ts`. Rename the exported constant (camelCase of the slug) and set `slug`.
2. Fill `en.card` / `pl.card` (home page card) and `en.page` / `pl.page` (the `/practices/<slug>` page). `page.eyebrow` uses the format `"05 / Short name"`; the part after ` / ` becomes the browser tab title.
3. Import it in `src/content/services/index.ts` and add it to the `services` array at the right position.
4. Add a footer link in the "Services" column of `home/en.ts` and `home/pl.ts`: `{ label: "...", href: "/practices/<slug>" }`.
5. Sitemap and static pages update automatically.

Removing a service is the reverse: delete the file, its import, and its footer links.

### Add a case study

Add an object to `src/content/case-studies.ts` with `en` and `pl` (`title`, `description`, `tags`). Position in the array = display order.

### Add a logo to the hero strip

Logos in `hero.meta[].logos` reference React components by name (`component: "ClaudeLogo"`). Available names are the keys of `LOGO_MAP` in `src/components/Hero.tsx`. A new logo needs a component in `src/components/BrandLogos.tsx` and an entry in `LOGO_MAP`; asset files go in `public/assets/logos/`.

## Before you push

Run, from the repo root:

```bash
npm run check   # lint + typecheck + build; must end without errors
```

Common failures:

| Error | Fix |
|---|---|
| `src/content/blog/<slug>.pl.md is missing` | Create the other language file with the same slug. |
| `frontmatter field "title" is required` | Add the field, quoted, in that file. |
| `file name must be <slug>.en.md` | Rename: lowercase letters, digits, hyphens, then `.en.md` / `.pl.md`. |
| `Property 'x' is missing in type` in `home/pl.ts` | Add the same field you added to `home/en.ts`. |
| YAML error near a `:` | Wrap the frontmatter value in double quotes. |

Then commit with a short message (`content: add Jan Kowalski to team`) and push. Deployment is covered by `deploying-boostersite`.

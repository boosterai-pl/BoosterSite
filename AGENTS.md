# AGENTS.md — BoosterSite

Edit this repo on behalf of non-developers (mainly Szymon, CEO). They describe a change in chat; you edit files, run the checks, commit, and push to `main`. Vercel deploys `main` to https://boosterai.pl automatically.

Stack: Next.js 16 (App Router), React 19, TypeScript strict, next-intl (`en` default, `pl` under `/pl`). No CMS, no database, no env vars needed to build.

## Workflow for every request

1. Load `editing-site-content` for any copy, photo, team, job, service or blog change.
2. Make the change in **both** `en` and `pl`.
3. Run `npm run check` (lint + typecheck + build). Fix every error before going on.
4. Commit with a short, specific message (`content: add Head of Sales role`), then push to `main`. Load `deploying-boostersite` to confirm it is live and to roll back if needed.
5. Reply with what changed, any translation you wrote yourself, and the URL to check.

- **MUST update both languages in the same commit** — a missing `.pl.md` / `.en.md` file or a field present in one `home/*.ts` file only fails the build.
- **MUST run `npm run check` before every push** — a failed build means the change never goes live.
- **MUST NOT add a CMS, database, or external content API** — content in git is the design. Payload CMS was removed on purpose.
- **MUST NOT hardcode copy in `src/components/`** — put it in `src/content/` so the next edit finds it.
- **MUST ask before structural or visual changes** (new sections, layout, colors, fonts) when the request is ambiguous; content edits do not need confirmation.
- **MUST NOT force-push `main` or rewrite its history** — use `git revert` to undo.
- **MUST NOT commit `.env*` files** other than `.env.example`.

## Content model

Read content only through `src/content/index.ts` (`loadSite`, `getJobRoles`, `getJobRole`, `getBlogPosts`, `getBlogPost`, `getPracticeSlugs`). Types live in `src/content/types.ts`.

| When you need to change | Edit |
|---|---|
| Home page copy, nav, footer, booking box | `src/content/home/en.ts` + `src/content/home/pl.ts` (type `HomeCopy`) |
| A service card and its `/practices/<slug>` page | `src/content/services/<slug>.ts`; order in `services/index.ts` |
| Case studies on the home page | `src/content/case-studies.ts` |
| Team members | `src/content/team.ts`; photos in `public/assets/team/` (800×800 JPG) |
| Job roles (`/careers`, `/careers/<slug>`) | `src/content/careers/<slug>.en.md` + `.pl.md` |
| Blog posts (`/blog`, `/blog/<slug>`) | `src/content/blog/<slug>.en.md` + `.pl.md` |
| SEO titles/descriptions, careers page labels | `src/messages/en.json` + `src/messages/pl.json` |
| LegalFlow landing (Polish only) | `src/app/restrukturyzacja/page.tsx` (inline JSX) |

- **Services, case studies, team** — order in the array is the display order and the `01`, `02`… numbering.
- **Internal links in `home/pl.ts`** — MUST be written without `/pl` (`"/careers"`); the prefix is added automatically.
- **Markdown frontmatter** — validated at build time; errors name the file and field.

## Common tasks

Full templates and field lists: `.opencode/skills/editing-site-content/SKILL.md`.

**Add a blog post**
1. Create `src/content/blog/<slug>.en.md` and `<slug>.pl.md` with frontmatter `title`, `description`, `date` (YYYY-MM-DD), `author`, `tags`.
2. Write the body in Markdown, starting with `##` headings (the page renders the title).
3. Run `npm run check`, commit, push.

**Add a team member**
1. Save the photo as `public/assets/team/<first-last>.jpg` (square, 800×800).
2. Add `{ name, photo, role: { en, pl } }` to `src/content/team.ts` at the right position.
3. Run `npm run check`, commit, push.

**Add a job role**
1. Create `src/content/careers/<slug>.en.md` and `<slug>.pl.md` with `title`, `department`, `location`, `employmentType`, `description`, `applyUrl`, `order`, `open: true`.
2. Write the full posting as the Markdown body (empty body = listed without a detail page).
3. To close a role, set `open: false` in both files.

**Add a service**
1. Copy `src/content/services/ai-automation.ts` to `services/<slug>.ts`; rename the export, set `slug`, fill `en`/`pl` `card` and `page`.
2. Add it to the array in `src/content/services/index.ts`.
3. Add footer links in `home/en.ts` and `home/pl.ts` (`href: "/practices/<slug>"`).

## Checks

```bash
npm run dev         # local site at http://localhost:3000
npm run check       # lint → typecheck → build; run before every push
npm run lint        # eslint (flat config in eslint.config.mjs); warnings are OK, errors are not
npm run typecheck   # tsc --noEmit
npm run build       # production build, no env vars required
```

There is no test suite. For visual checks run `npm run build && npm run start` and open the changed page in both `/…` and `/pl/…`.

## Code layout

- `src/app/(frontend)/[locale]/` — all localized pages. Everything is prerendered at build time except `/blog` (reads `?page=`).
- `src/app/robots.ts`, `src/app/sitemap.ts` — MUST stay at the `src/app/` root; inside a route group `/robots.txt` 404s. Sitemap entries for services, roles and posts are generated from content.
- `src/app/restrukturyzacja/` — standalone Polish landing page, served on `restrukturyzacja.boosterai.pl` via `src/middleware.ts`.
- `src/app/api/og/` — generated social images for blog posts.
- `src/lib/markdown.ts` — Markdown reading, validation and rendering (`marked`).
- `src/components/` — server components by default. Only `SiteRuntime.tsx`, `CookieConsent.tsx`, `LangSwitcher.tsx`, `Nav.tsx`, `src/lib/hooks.ts` and the `restrukturyzacja` page are client-side. Keep new components server-side unless they need browser APIs.
- Path alias `@/` maps to `src/`. Use it everywhere.

## CSS conventions

- Use plain CSS in `src/styles/globals.css`. MUST NOT add Tailwind, CSS modules or styled-components.
- Design tokens are CSS custom properties in `:root`: `--ink`, `--paper`, `--accent` (`#1e3dff`), `--muted`, `--line`, `--line-dark`, `--pad-x`, `--container` (1440px).
- Dark sections use `var(--ink)`; light sections add `block light` on `<section>`.
- Reveal animations: `data-reveal` / `data-reveal-stagger` (wired by `SiteRuntime`). Word mask: `.word-reveal > span`.
- Font classes: `.mono` (Geist Mono), `.serif` (Instrument Serif italic), `.accent-serif` (blue italic accent).
- Typography: reuse `.eyebrow`, `.h-display`, `.h1`, `.h3`, `.lead`, `.accent-serif` instead of inventing new classes.

## Brand logos

Add hero-strip logos as components in `src/components/BrandLogos.tsx` and register them in `LOGO_MAP` in `src/components/Hero.tsx`; reference them by name in `hero.meta[].logos[].component`. Static logo files go in `public/assets/logos/`. Brand spelling: **Tillio** (two l's; the component is `TilioLogo`).

## Fonts and metadata

Load fonts only in `src/app/(frontend)/[locale]/layout.tsx` (Geist, Geist Mono, Instrument Serif via Google Fonts). `metadataBase` is `https://boosterai.pl`; favicon is `public/assets/booster-sygnet.png`.

## TypeScript

Strict mode, `allowJs: false`. Keep `readonly` on content types in `src/content/types.ts`. When you add a content field, add it to the type first; TypeScript then shows every file that needs it.

## Environment variables

Build and runtime need none. Optional: `NEXT_PUBLIC_GA_MEASUREMENT_ID` (Google Analytics, set in the Vercel dashboard) and `VERCEL_TOKEN` (deployment API calls). See `.env.example`. Next.js loads `.env.local` automatically for local dev.

## Deployments

Vercel project `boostersite` in scope **`szymon-bazans-projects`**. Push to `main` = production; other branches = SSO-protected previews. Only squash merge is enabled for PRs. Status checks, build logs and rollback: `.opencode/skills/deploying-boostersite/SKILL.md`. DNS: `.opencode/skills/managing-domain-dns/SKILL.md`.

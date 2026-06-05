# AGENTS.md — BoosterSite

Next.js 16 / React 19 marketing site for Booster AI agency. Single-page layout with no routing beyond `/`.

## Commands

```bash
npm run dev          # dev server (localhost:3000)
npm run build        # production build
npm run lint         # next lint
npm run typecheck    # tsc --noEmit (strict mode, no JS allowed)
```

No test suite configured. Verification order: `lint → typecheck → build`.

## Architecture

- **Single page**: `src/app/page.tsx` imports all section components and composes the page in one file.
- **Content layer**: All copy lives in `src/content/site.ts` as a typed `SiteContent` object. To change text, images, or links — edit `site.ts` only. Never hardcode strings in components.
- **Content boundary**: `src/content/index.ts` exports `loadSite()`. This is the intended seam for a future CMS swap — keep components reading from it, not importing `site.ts` directly.
- **Types**: `src/content/types.ts` is the schema. Extend it when adding new content fields; TypeScript strict mode will catch any mismatch.
- **No CSS framework**: Styling is pure CSS in `src/styles/globals.css` (~1100 lines). All design tokens are CSS custom properties defined in `:root`. No Tailwind, no CSS modules, no styled-components.
- **Client boundary**: `src/app/page.tsx` is a Server Component. Only `src/components/SiteRuntime.tsx` and `src/lib/hooks.ts` are client-side (`"use client"`). Keep new components server-side unless they need browser APIs.
- **Path alias**: `@/` maps to `src/`. Use it everywhere.

## Key CSS conventions

- Design tokens: `--ink`, `--paper`, `--accent` (`#1e3dff`), `--muted`, `--line`, `--line-dark`, `--pad-x`, `--container` (1440px).
- Dark sections use `var(--ink)` background; light sections add class `block light` on `<section>`.
- Reveal animations: add `data-reveal` or `data-reveal-stagger` attributes — `SiteRuntime` wires the IntersectionObserver. Word-mask effect: wrap in `.word-reveal > span`.
- Font classes: `.mono` (Geist Mono), `.serif` (Instrument Serif italic), `.accent-serif` (blue italic accent).
- Typography classes: `.eyebrow`, `.h-display`, `.h1`, `.h3`, `.lead`, `.accent-serif` — use these rather than inventing new ones.

## Brand logos (`src/components/BrandLogos.tsx`)

Logo components are named `MondayLogo`, `ClickUpLogo`, `PipedriveLogo`, `TilioLogo` (brand: **Tillio** — two l's), `OpenMercatoLogo`, `ClaudeLogo`, `N8nLogo`, `PythonLogo`. Static assets live in `public/assets/logos/`. To add a new logo: create a component here and add its `component` key to `HeroMetaLogo` in `site.ts`.

## Fonts

Loaded via Google Fonts in `src/app/layout.tsx`: **Geist** (sans), **Geist Mono**, **Instrument Serif** (italic). Do not add font imports elsewhere.

## Static assets

`public/assets/` — logo PNGs/SVGs and `booster-sygnet.png` (favicon). `metadataBase` is set to `https://boosterai.pl` in `layout.tsx`.

## TypeScript

Strict mode on, `allowJs: false`. All types must be explicit. Content types in `src/content/types.ts` use `readonly` throughout — maintain that.

## Environment variables (dotenvx)

Env loading is handled by [`dotenvx`](https://dotenvx.com/) — all `npm run` scripts that need env are wrapped with `dotenvx run`. Do **not** call `dotenv.config()` from application or script code.

- **Local dev**: edit `.env.local` (plaintext, gitignored). Scripts load it via `dotenvx run -f .env.local --ignore=MISSING_ENV_FILE`.
- **Shared / CI**: `.env.production` is committed **encrypted** (public-key crypto). The matching private key lives in `.env.keys` (gitignored). To decrypt at runtime, set `DOTENV_PRIVATE_KEY_PRODUCTION` in the deploy environment.
- **Template**: `.env.example` lists every required key with empty values. Update it whenever a new env var is introduced.
- **Adding/changing prod secrets**: edit `.env.production` (it stays valid both encrypted and plaintext), then `npm run env:encrypt`.
- **Never commit** `.env.local`, `.env.keys`, or any plaintext `.env*` file other than `.env.example`.

Vercel deployments read env from the Vercel dashboard directly — dotenvx is not required at runtime there, only for local dev and any CI that consumes the encrypted file.

### OpenCode + Payload MCP

The `payload` MCP server has been removed. Payload content is now managed via the `managing-payload-content` skill (direct curl REST API calls). See `.opencode/skills/managing-payload-content/SKILL.md`.

## Payload CMS

### Database migrations

Schema changes are managed via explicit migration files in `migrations/` (Drizzle under the hood, `push: false`). **Never** rely on auto-push in any environment.

Workflow when you change a collection or global schema:
1. `npm run db:migrate:create <name>` — generate a migration file from the schema diff
2. Commit the generated file alongside the schema change
3. `npm run db:migrate` — apply pending migrations locally (also runs on deploy)

Other commands: `db:migrate:status` (inspect state), `db:migrate:fresh` (drop + replay all — dev only).

---

- **Admin panel**: `$PAYLOAD_URL/admin`
- **Prod URL**: `https://boostersite-nine.vercel.app` (set as `PAYLOAD_URL` in `.env.local`)
- **Auth**: email + password → JWT. No API key auth — `useAPIKey` is not enabled on the Users collection. Credentials stored as `PAYLOAD_EMAIL` / `PAYLOAD_PASSWORD` in `.env.local`.
- **Reads**: all collections are public, no auth needed.
- **Writes**: require JWT — login via `POST $PAYLOAD_URL/api/users/login`.

## Vercel Deployments

Project lives under the **`szymon-bazans-projects`** Vercel scope (not `andrzejchm`). Use the `VERCEL_TOKEN` from `.env.local` to authenticate API calls.

- Push to any branch → preview deployment (auto, URL changes each push)
- Merge to `main` → production deployment (auto)
- Production alias: `https://boostersite-nine.vercel.app`
- Only squash merge is enabled on the repo.

For deployment commands, polling, build logs, and troubleshooting see `.opencode/skills/deploying-boostersite/SKILL.md`.

## Database (Neon)

`DATABASE_URI` is environment-specific and encrypted everywhere except `.env.local`:

| Env | Source | Notes |
|-----|--------|-------|
| local dev | `.env.local` (plaintext) | endpoint `ep-billowing-block-al5iw9u9.c-3.eu-central-1.aws.neon.tech/neondb` |
| production | Vercel dashboard (`type: sensitive`) | not readable via API — set directly in Vercel project settings |
| Vercel preview | Vercel dashboard (`type: encrypted`) | dotenvx-encrypted blob, different Neon branch |

The Vercel production `DATABASE_URI` is marked `sensitive` — the API returns `""` but the value IS set and injected at build/runtime. Do not confuse this with an empty value.

To decrypt `.env.production` locally, add the private key to `.env.keys`:

```bash
echo 'DOTENV_PRIVATE_KEY_PRODUCTION="<your-key-here>"' >> .env.keys
```

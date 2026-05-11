# Blog light theme + nav visibility

## Goal
Fix blog readability by moving `/blog` and `/blog/[slug]` to a light theme with high text contrast, and ensure the navbar is visible on blog pages.

## Scope
- Blog list page (`/blog`)
- Blog post page (`/blog/[slug]`)
- Navbar appearance on those pages

Out of scope: global theme changes for the homepage or other sections.

## Current state (observed)
- Blog pages use `blog-list-page` and `blog-post-page` classes with dark global background.
- Text colors are mostly light (`var(--paper)` / muted light), so on dark they read fine, but when blog content comes in (Lexical HTML), contrast can drop and feel "all black".
- Navbar is rendered only on the homepage (`src/app/(frontend)/page.tsx`), so it does not appear on blog routes.

## Proposed design
### Visual direction
- Use a light "paper" background for blog routes to improve long-form readability.
- Keep the overall brand feel by using a subtle gradient and faint grid pattern (low contrast) so the page is not a flat white.
- Use darker text tokens for headings/body on blog pages.

### Layout & components
- Add a shared blog layout wrapper that includes the existing `Nav` (with `SiteRuntime`) and a light theme class on the page root.
- Keep content structures and components the same (BlogCard, BlogPost) but adjust their colors and borders for light background.

### Styling
- Introduce light-theme overrides scoped to blog pages:
  - Set page background to `var(--paper)` and text to `var(--ink)`.
  - Update `blog-card`, `blog-breadcrumb`, `blog-body`, `blog-pagination`, and empty state colors to use `--muted-dark` / `--ink`.
  - Add subtle hover shadow for cards instead of dark fill.
- Ensure the navbar is legible on light pages:
  - Reuse `nav on-light` state or add a lightweight helper class on blog pages to force a light-friendly nav.

## Data flow
No data changes. Only layout composition and CSS overrides. Content continues to come from Payload and Lexical HTML.

## Error handling
No new runtime error paths. Keep current try/catch behavior for Payload fetches.

## Testing/verification
- Visual check `/blog` and `/blog/[slug]` for contrast and nav visibility.
- Run `npm run lint`, `npm run typecheck`, `npm run build` if needed before release.

## Acceptance criteria
- Blog pages have light background with readable dark text.
- Navbar appears on `/blog` and `/blog/[slug]`.
- Existing homepage styling remains unchanged.

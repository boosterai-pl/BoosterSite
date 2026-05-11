# Blog Light Theme + Nav Visibility Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Switch `/blog` and `/blog/[slug]` to a light paper background with dark text, and add a visible navbar to both routes.

**Architecture:** Add a `src/app/(frontend)/blog/layout.tsx` that renders `Nav` + `SiteRuntime` above the blog page content, and add a scoped `.blog-light` CSS class on the blog page wrappers to override colors.

**Tech Stack:** Next.js 16, React 19, pure CSS (globals.css), existing Nav/SiteRuntime components, loadSite() content boundary.

---

### Task 1: Create blog layout with Nav + SiteRuntime

**Files:**
- Create: `src/app/(frontend)/blog/layout.tsx`

- [ ] Create `src/app/(frontend)/blog/layout.tsx` with this exact content:

```tsx
import type { ReactNode } from "react";
import { loadSite } from "@/content";
import { Nav } from "@/components/Nav";
import { SiteRuntime } from "@/components/SiteRuntime";

export default async function BlogLayout({ children }: { children: ReactNode }) {
  const site = await loadSite();
  return (
    <>
      <SiteRuntime />
      <Nav brand={site.meta.brand} links={site.nav} cta={site.navCta} />
      {children}
    </>
  );
}
```

- [ ] Commit:

```bash
git add src/app/(frontend)/blog/layout.tsx
git commit -m "feat: add blog layout with Nav and SiteRuntime"
```

---

### Task 2: Add `.blog-light` CSS class and light-theme overrides

**Files:**
- Modify: `src/styles/globals.css` (append after the existing Blog section, line 1316)

- [ ] Append the following CSS block at the end of `src/styles/globals.css`:

```css

/* ===== Blog light theme ===== */

.blog-light {
  background: var(--paper);
  color: var(--ink);
  min-height: 100vh;
}

/* Nav on light blog pages: force on-light state from the start */
.blog-light ~ nav,
.blog-light + nav {
  color: var(--ink);
}

/* List page header eyebrow on light background */
.blog-light .eyebrow {
  color: var(--muted-dark);
}

/* Blog card on light background */
.blog-light .blog-card {
  border-color: var(--line-dark);
  color: var(--ink);
}

.blog-light .blog-card:hover {
  background: var(--paper-2);
  box-shadow: 0 4px 24px rgba(10, 10, 10, 0.07);
}

.blog-light .blog-card-desc {
  color: var(--muted-dark);
}

/* Pagination on light */
.blog-light .blog-pagination a {
  color: var(--accent);
}

.blog-light .blog-pagination-info {
  color: var(--muted-dark);
}

.blog-light .blog-empty {
  color: var(--muted-dark);
}

/* Article on light */
.blog-light .blog-breadcrumb {
  color: var(--muted-dark);
}

.blog-light .blog-breadcrumb a {
  color: var(--muted-dark);
}

.blog-light .blog-breadcrumb a:hover {
  color: var(--ink);
}

.blog-light .blog-body {
  color: var(--ink);
}

.blog-light .blog-body p {
  color: rgba(10, 10, 10, 0.75);
}

.blog-light .blog-body ul,
.blog-light .blog-body ol {
  color: rgba(10, 10, 10, 0.75);
}

.blog-light .blog-body h2,
.blog-light .blog-body h3 {
  color: var(--ink);
}

.blog-light .blog-body a {
  color: var(--accent);
  text-decoration: underline;
  text-underline-offset: 3px;
}

.blog-light .blog-body code {
  background: var(--paper-2);
  color: var(--ink);
  padding: 2px 6px;
  border-radius: 4px;
  font-family: "Geist Mono", monospace;
  font-size: 0.9em;
}

.blog-light .blog-body pre {
  background: var(--paper-2);
  border: 1px solid var(--line-dark);
  padding: 20px;
  border-radius: var(--radius);
  overflow-x: auto;
  margin-bottom: 24px;
}

.blog-light .blog-back {
  color: var(--muted-dark);
}

.blog-light .blog-back:hover {
  color: var(--ink);
}
```

- [ ] Commit:

```bash
git add src/styles/globals.css
git commit -m "feat: add blog-light CSS overrides for light background theme"
```

---

### Task 3: Apply `.blog-light` class to blog list page

**Files:**
- Modify: `src/app/(frontend)/blog/page.tsx`

- [ ] In `src/app/(frontend)/blog/page.tsx`, change line 80:

Before:
```tsx
      <main className="blog-list-page">
```

After:
```tsx
      <main className="blog-list-page blog-light">
```

- [ ] Commit:

```bash
git add src/app/(frontend)/blog/page.tsx
git commit -m "feat: apply blog-light class to blog list page"
```

---

### Task 4: Apply `.blog-light` class to blog post page

**Files:**
- Modify: `src/app/(frontend)/blog/[slug]/page.tsx`

- [ ] In `src/app/(frontend)/blog/[slug]/page.tsx`, change line 188:

Before:
```tsx
      <main className="blog-post-page">
```

After:
```tsx
      <main className="blog-post-page blog-light">
```

- [ ] Commit:

```bash
git add "src/app/(frontend)/blog/[slug]/page.tsx"
git commit -m "feat: apply blog-light class to blog post page"
```

---

### Task 5: Fix nav initial state for blog pages

**Files:**
- Modify: `src/styles/globals.css`

The `useScrolledNav` hook detects `.block.light` sections under the nav to set the `on-light` class. On blog pages the nav starts at the top with a light background below it, but the hook starts with `onLight: false` so the nav text is white on a white background until scrolled.

Fix: Add a `data-nav-light` attribute on the blog layout body or use CSS to force dark text on nav when inside a `.blog-light` page. The simplest CSS approach — override nav color when `.blog-light` is the first sibling:

- [ ] Append to the `.blog-light` CSS block (added in Task 2) in `src/styles/globals.css`:

```css
/* Force nav dark text on blog light pages before JS hydrates */
.blog-light-page .nav:not(.scrolled) {
  color: var(--ink);
}
```

Actually a cleaner approach: add `data-nav-initial="light"` to the blog layout, and use CSS attribute selectors. But the simplest stable fix is: in `BlogLayout`, wrap the nav in a div with class `blog-light-page` and add the override.

Change `src/app/(frontend)/blog/layout.tsx` to:

```tsx
import type { ReactNode } from "react";
import { loadSite } from "@/content";
import { Nav } from "@/components/Nav";
import { SiteRuntime } from "@/components/SiteRuntime";

export default async function BlogLayout({ children }: { children: ReactNode }) {
  const site = await loadSite();
  return (
    <div className="blog-light-page">
      <SiteRuntime />
      <Nav brand={site.meta.brand} links={site.nav} cta={site.navCta} />
      {children}
    </div>
  );
}
```

And add to `src/styles/globals.css` (append):

```css
/* Nav initial state on blog light pages */
.blog-light-page .nav:not(.scrolled) {
  color: var(--ink);
}
.blog-light-page .nav.scrolled {
  background: rgba(245, 243, 238, 0.8);
  border-color: var(--line-dark);
  color: var(--ink);
}
```

- [ ] Update `src/app/(frontend)/blog/layout.tsx` as shown above.
- [ ] Append the nav override CSS to `src/styles/globals.css`.
- [ ] Commit:

```bash
git add src/app/(frontend)/blog/layout.tsx src/styles/globals.css
git commit -m "feat: fix nav color for blog light pages"
```

---

### Task 6: Verify

- [ ] Run lint: `npm run lint`
- [ ] Run typecheck: `npm run typecheck`
- [ ] Run build: `npm run build`
- [ ] Fix any errors, commit fixes.

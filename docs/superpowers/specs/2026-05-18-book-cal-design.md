# /book — Cal.com Booking Page Design Spec

**Date:** 2026-05-18
**Author:** OpenCode (brainstorming session)

---

## Goal

When a user clicks "Umów rozmowę" / "Book a call" anywhere on the site, they navigate to `/book` — a dedicated booking subpage with a Cal.com iframe embed and full SEO metadata.

---

## Architecture

- New route: `src/app/(frontend)/book/page.tsx` — Server Component, mirrors `/blog` pattern.
- New component: `src/components/Booking.tsx` — renders the iframe and surrounding copy.
- Content lives in `site.ts` under a new `booking` key; type defined in `types.ts`.
- No new npm dependencies — plain `<iframe>` embed.
- All existing CTA buttons updated in `site.ts` to point to `/book`.

---

## Content Schema (`types.ts`)

New type `BookingContent`:

```ts
export type BookingContent = {
  readonly calUrl: string;           // e.g. "https://cal.com/szymon-sidor-bruix3"
  readonly eyebrow: string;
  readonly headline: HeadlineLine;
  readonly body: string;
};
```

Added to `SiteContent`:
```ts
readonly booking: BookingContent;
```

---

## Content (`site.ts`)

```ts
booking: {
  calUrl: "https://cal.com/szymon-sidor-bruix3",
  eyebrow: "Umów rozmowę",
  headline: { text: "Bezpłatna", accent: "konsultacja." },
  body: "30 minut. Wrócimy z sześciotygodniowym planem, stałą ceną i pierwszym demo w dwa tygodnie.",
},
```

CTA hrefs updated:
- `navCta.href`: `"/book"`
- `hero.primaryCta.href`: `"/book"`
- `cta.button.href`: `"/book"`

---

## Page: `src/app/(frontend)/book/page.tsx`

- Server Component
- `generateMetadata()` returns:
  - `title`: `"Umów konsultację | Booster — AI-Native Agency"`
  - `description`: `"Zarezerwuj 30-minutową rozmowę z Booster. Wrócimy z planem, ceną i demo w dwa tygodnie."`
  - `alternates.canonical`: `"https://boosterai.pl/book"`
  - `openGraph`: type `"website"`, url, title, description
- JSON-LD `Service` schema in `<script type="application/ld+json">`:
  - `@type: "Service"`, name, provider (Organization), url, areaServed
- Renders `<Booking content={site.booking} />`

---

## Component: `src/components/Booking.tsx`

```tsx
<section className="block light booking">
  <div className="container-inner">
    <span className="eyebrow">{content.eyebrow}</span>
    <h1 className="h1">{headline}</h1>
    <p className="lead">{content.body}</p>
    <div className="booking-frame-wrap">
      <iframe
        src={`${content.calUrl}?embed=true`}
        width="100%"
        height="700"
        frameBorder={0}
        title="Zarezerwuj konsultację"
        loading="lazy"
      />
    </div>
  </div>
</section>
```

---

## CSS (`globals.css`)

Minimal additions using existing tokens:

```css
.booking-frame-wrap {
  margin-top: var(--space-l, 3rem);
  border-radius: 12px;
  overflow: hidden;
  border: 1px solid var(--line);
}
```

---

## SEO Checklist

- [x] Dedicated URL `/book`
- [x] Unique `<title>` and `<meta description>`
- [x] `canonical` link
- [x] Open Graph tags
- [x] JSON-LD `Service` schema
- [x] `loading="lazy"` on iframe (Core Web Vitals)
- [x] `<h1>` on the page
- [x] `<title>` attribute on iframe (accessibility)

---

## Out of Scope

- No new npm packages
- No changes to Payload CMS
- No changes to Nav component logic (href change in `site.ts` is sufficient)

@AGENTS.md

# Living Just Right — Project Guide

Prototype e-commerce storefront selling **LG electronics only**. Premium, minimal visual language (mrmarvis.com / spoke-london.com) applied to an electronics catalogue: black and white, sharp corners, square product photography on a light grey field, calm and editorial rather than promo-dense.

**Read `SITE-PLAN.md` before building any page.** It holds the route map, the home page section order, the full LG category tree for the mega menu, and the build phases.

---

## 1. Stack

| Thing | Choice |
|---|---|
| Framework | Next.js 16.3.1, App Router, TypeScript strict |
| React | 19.2.8 |
| Styling | Tailwind CSS v4 (CSS-first config via `@theme` in `app/globals.css`) |
| Animation | CSS transitions/keyframes + IntersectionObserver first. Reach for a JS animation lib only if a section genuinely can't be done in CSS. |
| Data | Static TypeScript fixtures in `lib/data/` — no backend, no DB, no API routes |
| Images | Remote placeholder services (see §7) |
| Icons | Inline SVG components in `components/icons/` — no icon library |

Commands: `npm run dev` · `npm run build` · `npm run lint`

Tailwind v4 has no `tailwind.config.js`. All design tokens live in the `@theme` block in `app/globals.css`. Do not create a config file.

---

## 2. LG usage rules

- The store sells **only LG products**. Every product in the catalogue is LG.
- The LG logo and the word "LG" may be used freely — in the nav, on cards, in copy, in banners.
- **Do not follow LG brand guidelines.** Do not use LG red (#A50034), LG's typography, or LG's layout patterns. This site has its own identity: black primary, dark grey secondary, sharp corners, calm minimal layout.
- The store brand is **Living Just Right**. It is the site's own identity; LG is the product brand it stocks.
- Logo: image wordmark, not CSS text. Two files in `public/images/` — `logo.png` (black + red script, for light surfaces) and `logow.png` (white cutout, for dark surfaces). Source art is 2172×724 (3:1). Component: `components/brand/Logo.tsx`, sizes `sm | md | lg`, `tone="light" | "dark"` picks the file. Swap-in ready — never hardcode the mark anywhere else. Note the red in this mark is an approved exception to the "no LG red" rule in §9 — it belongs to the Living Just Right wordmark itself, not to LG.

---

## 3. Design tokens

Everything below goes in the `@theme` block. **Never write a raw hex value in a component.** If a colour you need isn't here, add it to `@theme` first.

### 3.1 Primary — black (CSS token `accent`; CTA fill, price text, focus)

The code identifier is still `--color-accent-*` / `bg-accent-500` etc. — renaming it would touch every component for no visual gain. Read it as **Primary** wherever this doc says "accent."

```
--color-accent-50:  #F7F7F7
--color-accent-100: #ECECEC
--color-accent-200: #D6D6D6
--color-accent-300: #B0B0B0
--color-accent-400: #808080
--color-accent-500: #262626   ← brand primary
--color-accent-600: #141414
--color-accent-700: #000000
--color-accent-800: #000000
--color-accent-900: #000000
--color-accent-950: #000000
```

Usage: `500` = buttons, active states, price text, focus ring. `600` = hover, `700` = active/pressed (true black — the ramp bottoms out here, so `800`–`950` repeat it for max-contrast / text-on-tint contexts). `50/100` = tinted section backgrounds, badge fills.

### 3.2 Secondary — dark grey (CSS token `ink`; headings, footer, dark surfaces)

Same story: the code identifier stays `--color-ink-*` / `text-ink-900` etc. Read it as **Secondary**.

```
--color-ink-50:  #F6F6F6
--color-ink-100: #EAEAEA
--color-ink-200: #D3D3D3
--color-ink-300: #ADADAD
--color-ink-400: #7A7A7A
--color-ink-500: #5C5C5C
--color-ink-600: #454545
--color-ink-700: #333333
--color-ink-800: #262626
--color-ink-900: #1C1C1C   ← brand secondary
--color-ink-950: #101010
```

Usage: `900` = headings, footer background, dark banners. `700/800` = dark gradient stops. `400/500` = muted body copy on light. Deliberately lighter than primary's black floor (`accent-700`+), so a black button and a charcoal footer read as two distinct tones rather than one flat black.

### 3.3 Neutral — true achromatic grey (structure)

```
--color-neutral-50:  #FAFAFA   ← page background
--color-neutral-100: #F2F2F2   ← product image tile background
--color-neutral-200: #E5E5E5   ← borders, dividers
--color-neutral-300: #D4D4D4
--color-neutral-400: #A3A3A3   ← struck-through prices, meta text
--color-neutral-500: #737373
--color-neutral-600: #525252
--color-neutral-700: #404040
--color-neutral-800: #262626
--color-neutral-900: #171717
```

Page background is `--color-neutral-50` (#FAFAFA). The header sits on pure `#FFFFFF`. Product image tiles sit on `--color-neutral-100` — the "slight grey background" behind every product shot. No blue/cool tint anywhere in this ramp; it reads as pure grey, matching the black/white identity.

### 3.3a Eco — green (energy and running cost only)

```
--color-eco-50:  #ECFDF5
--color-eco-100: #D1FAE5
--color-eco-200: #A7F3D0
--color-eco-300: #6EE7B7
--color-eco-400: #34D399
--color-eco-500: #10B981
--color-eco-600: #059669
--color-eco-700: #047857
--color-eco-800: #065F46
--color-eco-900: #064E3B
--color-eco-950: #022C22
```

Reserved for the savings forecast band (`components/home/EnergySavings` and the
components under it). **Nothing else on the site may use this ramp** — no eco
buttons, cards, or headings elsewhere. `--color-eco` (§3.4) stays as-is for
energy-rating chips on product cards.

The band's ground is **dark neutral**, not teal — `bg-eco-night` runs near-black
(`ink-950`), matching the rest of the site's monochrome identity, with a few
softly blurred orbs screened over it (mostly white/neutral glow, two small
green ones for identity) and a vignette settling the edges. There is no teal
ramp on this site — it was retired along with the band's old teal-night ground.
The heading over it uses `SectionHeading tone="eco-dark"`.

The white forecast card lifts out of that ground, and inside it eco is confined
to small accents rather than carrying the section — the eyebrow, the CTA, the
"with low energy LG" bill highlight. The load split and the upgrade chips run a
mixed set (`--color-info` for Air Conditioners, eco for Refrigerators, ink for
TVs) so the card never reads as a wall of green, and the usage slider runs a
green → amber → red scale, since more consumption is worse. Mixing eco with
accent, info and ink inside this band is expected.

Focus rings inside that band are `eco-500` rather than the site-wide `accent-500`
(§6) — a near-black ring is invisible against the band's own dark ground. The
ring colour is part of the `Button` variant map, so this stays a one-band
exception rather than a per-call override.

### 3.4 Support colours

Used sparingly and always with intent — never decoratively.

```
--color-sale:    #E11D48   /* SALE / HOT badges, stock-urgency text */
--color-success: #16A34A   /* in stock, order confirmed */
--color-eco:     #10B981   /* energy rating chips (5-star inverter etc.) */
--color-info:    #2563EB   /* delivery / finance notices */
--color-warning: #F59E0B   /* low stock, timer urgency */
--color-star:    #FBBF24   /* rating stars */
```

### 3.5 Gradients

Static gradients — safe anywhere:

```
--gradient-dusk:   linear-gradient(135deg, #000000 0%, #262626 55%, #1C1C1C 100%)
--gradient-mist:   linear-gradient(180deg, #FFFFFF 0%, #FAFAFA 100%)
--gradient-tint:   linear-gradient(135deg, #F7F7F7 0%, #F2F2F2 100%)
```

Home currently runs **no animated gradient** — the promo stripe and the deal-countdown band, which used to pan an orange gradient and glow with blurred orbs, are now flat black/dark-grey surfaces. That's a deliberate calming of the page, not a technical limitation: the mechanism (`background-position` panned on a 300% wide gradient, 14–20 s, `ease-in-out`, `infinite alternate`, never animating `background-image` itself, always with a solid fallback colour underneath) still exists as a pattern if a future section genuinely needs one — cap it at 2 per page if so.

### 3.6 Typography — SF Pro

```
--font-sans: -apple-system, BlinkMacSystemFont, "SF Pro Display", "SF Pro Text",
             "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif;
```

SF Pro is not web-licensable, so this uses the system stack — it renders as real SF Pro on Apple devices and degrades cleanly elsewhere. Do not self-host SF Pro files and do not add a Google Font.

| Token | Size / line-height | Weight | Tracking | Use |
|---|---|---|---|---|
| `display` | 56 / 60 | 700 | -0.03em | Hero headline (desktop) |
| `h1` | 40 / 46 | 700 | -0.025em | Page title |
| `h2` | 30 / 36 | 650 | -0.02em | Section heading |
| `h3` | 22 / 28 | 600 | -0.015em | Card group / subsection |
| `body-lg` | 17 / 26 | 400 | -0.01em | Lead paragraph |
| `body` | 15 / 24 | 400 | 0 | Default |
| `sm` | 13 / 20 | 400 | 0 | Meta, breadcrumbs |
| `xs` | 11 / 16 | 600 | 0.04em | Badges, eyebrow labels (uppercase) |
| `price` | 20 / 24 | 700 | -0.02em | Current price |

Headings step down one level on `< md`. Negative tracking on headings is what makes it read premium — don't drop it.

### 3.7 Radius, border, shadow

```
--radius-full: 9999px
```

**Corners are sharp everywhere** — buttons, cards, product image tiles, inputs, chips/pills, banners, hero slides. `--radius-full` is the only radius token left, and it is reserved strictly for things that are literally circular or a capsule around a single icon/digit: icon buttons, avatars, carousel dots, slider thumbs, star markers, glow-orb shapes, radio inputs. The moment something has readable text corners — a chip, a tab, a tag, a card — it's `rounded-none`, full stop.

Borders are always `1px solid --color-neutral-200`, or `--color-neutral-300` on hover. No thick borders anywhere.

```
--shadow-xs: 0 1px 2px rgba(0,0,0,.04)
--shadow-sm: 0 1px 3px rgba(0,0,0,.06), 0 1px 2px rgba(0,0,0,.04)
--shadow-md: 0 4px 12px rgba(0,0,0,.06), 0 2px 4px rgba(0,0,0,.04)
--shadow-lg: 0 12px 32px rgba(0,0,0,.08), 0 4px 8px rgba(0,0,0,.04)
```

Shadows stay subtle. Resting cards use `--shadow-xs` or no shadow at all + a border; hover lifts to `--shadow-md`. `--shadow-lg` is reserved for the mega menu panel, modals, and the sticky header once scrolled. There is no colour-tinted "glow" shadow — primary CTAs are flat, no shadow at rest or on hover.

### 3.8 Layout

```
--container: 1280px   (px-4 sm:px-6 lg:px-8)
--section-y: 64px mobile / 88px desktop
```

Breakpoints: `sm 640` · `md 768` · `lg 1024` · `xl 1280` · `2xl 1536`.

Product grid columns: 2 (mobile) → 3 (`sm`) → 4 (`lg`) → 5 (`2xl`, on PLP only). Gap 12px mobile, 20px desktop.

---

## 4. Motion

```
--ease-out:   cubic-bezier(0.22, 1, 0.36, 1)
--ease-std:   cubic-bezier(0.4, 0, 0.2, 1)
--dur-fast:   150ms    /* colour, opacity, small state */
--dur-base:   240ms    /* hover lift, dropdowns */
--dur-slow:   420ms    /* scroll reveals, slide transitions */
--dur-hero:   600ms    /* carousel slide change */
```

**The rule for this project: motion should be felt, not watched.** If an animation draws attention to itself, it's too much.

Hard constraints:

1. Animate `transform` and `opacity` only. Never animate `width`, `height`, `top`, `left`, or `box-shadow` geometry.
2. Scroll reveals: fade `0 → 1` + `translateY(16px → 0)`, `--dur-slow`, `--ease-out`. 16px is the ceiling — never 40px.
3. Stagger: `60ms` per item, capped at 6 items. Item 7 onward uses the same delay as item 6.
4. Reveal fires **once**, at 15% visibility, via a shared `useReveal()` IntersectionObserver hook. Elements do not re-hide on scroll up.
5. Parallax: max `40px` total travel, `transform: translate3d()` driven by a throttled rAF scroll handler. Backgrounds only — never text, never product images.
6. Hover lift on cards: `translateY(-4px)` max.
7. Product image hover zoom: `scale(1.04)`, `--dur-slow`, `--ease-out`, with `overflow-hidden` on the tile. **Nothing else on the card moves.** No rotation, no shadow bloom on the image, no overlay slide-up.
8. Page/route loading: skeleton shimmer, not spinners. Skeletons match the real component's exact dimensions so nothing shifts in.
9. Every animation is wrapped by:

```css
@media (prefers-reduced-motion: reduce) {
  *, *::before, *::after {
    animation-duration: .01ms !important;
    animation-iteration-count: 1 !important;
    transition-duration: .01ms !important;
    scroll-behavior: auto !important;
  }
}
```

Reveal hooks must also check `prefers-reduced-motion` and render content visible immediately rather than relying only on the CSS override.

---

## 5. Product card — the canonical component

Premium and minimal — image, name, price, nothing else. `components/product/ProductCard.tsx`.

Structure, top to bottom:

```
┌─────────────────────────────┐
│                  ┌────────┐ │  offer tag — flat `OfferRibbon`, top-right,
│                             │  flush to the corner. ONLY when there's an offer.
│        product image        │  no rank badge, no rating, no badge chip, no
│                             │  hover CTA — none of that lives on this card.
└─────────────────────────────┘  image: square (1:1), neutral-100 background,
  Product name                   sharp corners, object-contain ~12% padding.
  over two lines if needed       name: 15/22, weight 500, ink-900, 2-line clamp.
                                  the whole card links to the PDP.
  LKR 4,080  L̶K̶R̶ ̶5̶,̶4̶0̶0̶         current: ink-900, 700, price size, leads the row.
                                  original: neutral-400, 400, sm, line-through.
```

Required fields: image, name, current price.
Optional field: struck original + offer tag (only when `originalPrice` exists).

That's the complete field list. No rating/review count, no badge chip (Best/New/Sale/Energy), no rank number, no wishlist heart, no hover CTA button — the card is deliberately stripped to image, name and price. Anything else belongs on the PDP, not the catalogue tile.

Price renders on **one line** — current price first, then the struck original at `sm`. The percentage never appears in the price row: it rides the `OfferRibbon` tag on the image. One row means offer and non-offer cards are the same height with nothing reserved, so a mixed grid still lines up.

Card chrome: **none.** No border, no background, no shadow, no radius on the card itself — just the image tile and the text stacked under it, the way the reference sites (mrmarvis.com, spoke-london.com) run their product grids. Only the image tile has a fill (`--color-neutral-100`) and sharp corners.

Hover (desktop only, `@media (hover: hover)`):
- image `scale(1.04)` — that's it.

Nothing else moves. No card lift, no border appearing, no shadow, no overlay, no quick-view, no CTA sliding in. This is the whole "Apple-style" restraint the design calls for — the image responds, nothing around it does.

All cards in a row must be equal height — the grid uses `items-stretch` and the card is a flex column with the name block flexed to fill.

---

## 6. Component conventions

```
app/
  layout.tsx            root: fonts, PromoStripe, Header, Footer
  page.tsx              home
  (shop)/…              category, product, search routes — see SITE-PLAN.md
  globals.css           @theme tokens + base + keyframes ONLY
components/
  brand/                Logo
  layout/               PromoStripe, Header, MegaMenu, MobileNav, Footer
  home/                 HeroCarousel, CategoryGrid, DealCountdown, …
  product/              ProductCard, ProductGrid, ProductRail, PriceBlock
  ui/                   Button, Chip, Skeleton, Section, Container, Reveal
  icons/                inline SVG
lib/
  data/                 categories.ts, products.ts, banners.ts, deals.ts
  hooks/                useReveal, useCountdown, useParallax, useMediaQuery
  utils/                formatPrice, calcDiscount, cn
```

- Server Components by default. `"use client"` only where there's interaction — carousel, mega menu, countdown, cart drawer, reveal wrappers.
- One component per file, named export matching the filename.
- Props typed with an exported `interface`; no `any`, no `React.FC`.
- Compose classes with the `cn()` helper. No inline `style` except for dynamic transform values in parallax/carousel.
- Every interactive element needs a visible focus ring: `focus-visible:ring-2 ring-accent-500 ring-offset-2`.
- Semantic HTML and real landmarks — `header`, `nav`, `main`, `footer`, `section` with `aria-labelledby`.
- Prices always render through `formatPrice()`. Never string-concatenate currency.

---

## 7. Images

Use placeholder services and **do not verify that any image loads or that its subject matches the product**. Wrong-looking images are fine — this is a layout prototype.

- Product shots: `https://picsum.photos/seed/{product-slug}/800/800`
- Banners / hero: `https://picsum.photos/seed/{banner-id}/1800/600`
- Category tiles: `https://picsum.photos/seed/{category-slug}/400/400`

Seed by slug so the same product keeps the same image between renders. Add the host to `next.config.ts` `images.remotePatterns`. Always set `width`/`height` or `fill` + `sizes` so nothing reflows. Product images: `object-contain` on `--color-neutral-100`. Banners: `object-cover`.

---

## 8. Content and copy

- Currency: **LKR**, whole rupees, thousands separated, e.g. `LKR 569,700`. No cents — rupee retail pricing doesn't quote them. `formatPrice()` is the only place this is decided.
- Product names read like real LG SKUs: `LG OLED evo C4 65" 4K Smart TV`, `LG InstaView™ Door-in-Door® 601L Side by Side Refrigerator`.
- Copy is short, confident, benefit-led. No exclamation marks, no "Buy now!!!", no emoji in UI copy.
- Tagline: *Living Just Right — LG, curated.*
- Category and subcategory names come from `SITE-PLAN.md` §3 and must be used verbatim.

---

## 9. Do / Don't

**Do**
- Read `SITE-PLAN.md` before starting a page, and keep the section order it specifies.
- Build mobile-first; verify at 375, 768, 1024, 1440.
- Reuse `ProductCard`, `Section`, `Container`, `Reveal` everywhere rather than re-implementing.
- Keep white space generous and the page calm — this is an editorial, minimal look, not a dense promo grid.
- Prefer a border over a shadow when separating something.

**Don't**
- Don't use raw hex values, arbitrary Tailwind values (`text-[#FF6B35]`), or `!important`.
- Don't use LG red, LG's fonts, or LG's brand layouts.
- Don't use border radius anywhere except literal circles/capsules (`--radius-full`) — see §3.7.
- Don't add a UI kit, animation library, state manager, or icon package without being asked.
- Don't animate more than one property group at a time on a single element.
- Don't add loading spinners, scroll-jacking, autoplaying audio/video, or entrance animations longer than 600ms.
- Don't add promotional badges (Best/New/Sale/etc.), rank numbers, ratings, or hover CTAs to `ProductCard` — it's image, name, price only (§5).
- Don't create `README`s, summary docs, or example files that weren't requested.
- Don't ship a section that hasn't been checked at 375px wide.

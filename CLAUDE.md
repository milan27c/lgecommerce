@AGENTS.md

# Living Just Right — Project Guide

Prototype e-commerce storefront selling **LG electronics only**. Korean-beauty-commerce visual language (Stylevana / YesStyle / StyleKorean / Olive Young Global) applied to a premium electronics catalogue.

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
- **Do not follow LG brand guidelines.** Do not use LG red (#A50034), LG's typography, or LG's layout patterns. This site has its own identity: orange accent, deep aubergine, Korean commerce layout.
- The store brand is **Living Just Right**. It is the site's own identity; LG is the product brand it stocks.
- Placeholder logo: text only — the wordmark `Living Just Right`, "Living" in `--color-ink-900`, "Just Right" in `--color-accent-500`. No glyph, no icon lockup. Component: `components/brand/Logo.tsx`, sizes `sm | md | lg`. Swap-in ready — never hardcode the mark anywhere else.

---

## 3. Design tokens

Everything below goes in the `@theme` block. **Never write a raw hex value in a component.** If a colour you need isn't here, add it to `@theme` first.

### 3.1 Accent — orange (primary CTA, prices, sale, focus)

```
--color-accent-50:  #FFF4F0
--color-accent-100: #FFE6DC
--color-accent-200: #FFC9B3
--color-accent-300: #FFA985
--color-accent-400: #FF8A5C
--color-accent-500: #FF6B35   ← brand accent
--color-accent-600: #E85420
--color-accent-700: #C24218
--color-accent-800: #993312
--color-accent-900: #7A2A10
--color-accent-950: #431407
```

Usage: `500` = buttons, active states, price text, discount %. `600/700` = hover / pressed. `50/100` = tinted section backgrounds, badge fills. `900/950` = text on accent tints.

### 3.2 Ink — deep aubergine (headings, footer, dark surfaces)

```
--color-ink-50:  #F5F4F7
--color-ink-100: #E9E7EE
--color-ink-200: #CFCBD9
--color-ink-300: #ADA7BF
--color-ink-400: #837B9B
--color-ink-500: #605878
--color-ink-600: #4A4260
--color-ink-700: #37304A
--color-ink-800: #262036
--color-ink-900: #1A1625   ← brand secondary
--color-ink-950: #100D18
```

Usage: `900` = headings, footer background, dark banners, rank badges. `700/800` = dark gradient stops. `400/500` = muted body copy on light.

### 3.3 Neutral — cool grey (structure)

```
--color-neutral-50:  #F8FAFC   ← page background
--color-neutral-100: #F1F5F9   ← product image tile background
--color-neutral-200: #E2E8F0   ← borders, dividers
--color-neutral-300: #CBD5E1
--color-neutral-400: #94A3B8   ← struck-through prices, meta text
--color-neutral-500: #64748B
--color-neutral-600: #475569
--color-neutral-700: #334155
--color-neutral-800: #1E293B
--color-neutral-900: #0F172A
```

Page background is `--color-neutral-50` (#F8FAFC). Cards and the header sit on pure `#FFFFFF` so they lift off it.

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

The band's ground is dark: deep teal into green into ink (`bg-eco-night`),
with blurred teal and emerald orbs screened over it and a vignette settling the
edges. A supporting teal ramp (`--color-teal-200 … --color-teal-950`) exists in
`@theme` for that ground and is, like eco, **for this band only**. The heading
over it uses `SectionHeading tone="eco-dark"`.

The white forecast card lifts out of that ground, and inside it eco carries the
section's own furniture — both eyebrows, the CTA, the "with low energy LG" bill
— but not everything. The load split and the upgrade chips run a mixed set
(`--color-info` for Air Conditioners, eco for Refrigerators, ink for TVs) so the
card never reads as a wall of green, and the usage slider runs a green → amber →
red scale, since more consumption is worse. Mixing eco with accent, info, teal
and ink inside this band is expected.

Focus rings inside that band are `eco-500` rather than the site-wide `accent-500`
(§6) — an orange ring on the mint field is the one place the standard ring reads
as an error state. The ring colour is part of the `Button` variant map, so this
stays a one-band exception rather than a per-call override.

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
--gradient-ember:  linear-gradient(135deg, #FF6B35 0%, #FF8A5C 50%, #FFA985 100%)
--gradient-dusk:   linear-gradient(135deg, #1A1625 0%, #37304A 55%, #C24218 100%)
--gradient-mist:   linear-gradient(180deg, #FFFFFF 0%, #F8FAFC 100%)
--gradient-tint:   linear-gradient(135deg, #FFF4F0 0%, #F1F5F9 100%)
```

Animated gradients — **maximum 2 per page**, and only on: the promo stripe, the limited-time-offer band, and one hero/feature section. Implemented by animating `background-position` on a 300% wide gradient, 14–20 s, `ease-in-out`, `infinite alternate`. Never animate `background-image` itself. Always give animated-gradient surfaces a solid fallback colour underneath.

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
--radius-sm: 6px    --radius-md: 10px   --radius-lg: 14px
--radius-xl: 20px   --radius-2xl: 28px  --radius-full: 9999px
```

Cards `--radius-lg`. Buttons and inputs `--radius-md`. Image tiles `--radius-lg`. Chips `--radius-full`. Hero slides and large banners `--radius-2xl`.

Borders are always `1px solid --color-neutral-200`, or `--color-neutral-300` on hover. No thick borders anywhere.

```
--shadow-xs:     0 1px 2px rgba(26,22,37,.04)
--shadow-sm:     0 1px 3px rgba(26,22,37,.06), 0 1px 2px rgba(26,22,37,.04)
--shadow-md:     0 4px 12px rgba(26,22,37,.06), 0 2px 4px rgba(26,22,37,.04)
--shadow-lg:     0 12px 32px rgba(26,22,37,.08), 0 4px 8px rgba(26,22,37,.04)
--shadow-accent: 0 8px 24px rgba(255,107,53,.22)
```

Shadows stay subtle. Resting cards use `--shadow-xs` or no shadow at all + a border; hover lifts to `--shadow-md`. `--shadow-lg` is reserved for the mega menu panel, modals, and the sticky header once scrolled. `--shadow-accent` only on primary CTAs.

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

Modelled on the reference screenshot, minus the brand line. `components/product/ProductCard.tsx`.

Structure, top to bottom:

```
┌─────────────────────────────┐
│ [3]              ┌────────┐ │  rank badge — ink-900 square, white bold numeral,
│                  │ 24% OFF│ │  radius-md, top-left, 8px inset. ONLY in ranked rails.
│        product image────────┤  offer pennant — `OfferRibbon`, top-right, flush to
│                             │  the corner. ONLY when there's an offer.
├─────────────────────────────┤  image: square (1:1), neutral-100 background,
│ Product name                │  radius-lg, object-contain ~12% padding, clipped.
│ over two lines if needed    │  name: 15/22, weight 500, ink-900, 2-line clamp.
│                             │  the whole card links to the PDP — no add-to-cart
│ LKR 4,080  L̶K̶R̶ ̶5̶,̶4̶0̶0̶       │  affordance on the card.
│                             │  current: ink-900, 700, price size, leads the row.
│                             │  original: neutral-400, 400, sm, line-through.
│ ★ 4.7 (2,043)               │  star colour-star, rest neutral-500, sm.  OPTIONAL
│ ┌──────┐                    │
│ │ Best │                    │  badge chip: 1px border, transparent fill, xs
│ └──────┘                    │  uppercase. OPTIONAL
└─────────────────────────────┘
```

Required fields: image, name, current price.
Optional fields: struck original + offer pennant (only when `originalPrice` exists), rating + review count, badge, rank number, wishlist heart.

Price renders on **one line** — current price first, then the struck original at `sm`. The percentage never appears in the price row: it rides the `OfferRibbon` pennant on the image. One row means offer and non-offer cards are the same height with nothing reserved, so a mixed grid still lines up.

The pennant owns the top-right corner. When it's showing, the badge moves into the top-left stack under the rank badge; with no offer the badge keeps the top-right.

Card chrome: white background, `1px --color-neutral-200` border, `--radius-lg`, no resting shadow.

Hover (desktop only, `@media (hover: hover)`):
- image `scale(1.04)`
- border → `--color-neutral-300`
- shadow → `--shadow-md`
- card `translateY(-4px)`

That's the whole hover state. Do not add overlays, quick-view buttons that slide in, colour swatch reveals, or secondary CTAs.

Badge variants: `Best` (accent-500 border + text) · `New` (ink-900) · `Sale` (`--color-sale`) · `Energy A+++` (`--color-eco`).

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
  product/              ProductCard, ProductGrid, ProductRail, PriceBlock, Badge
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
- Keep white space generous — the Korean commerce look is dense grids inside airy sections.
- Prefer a border over a shadow when separating something.

**Don't**
- Don't use raw hex values, arbitrary Tailwind values (`text-[#FF6B35]`), or `!important`.
- Don't use LG red, LG's fonts, or LG's brand layouts.
- Don't add a UI kit, animation library, state manager, or icon package without being asked.
- Don't animate more than one property group at a time on a single element.
- Don't add loading spinners, scroll-jacking, autoplaying audio/video, or entrance animations longer than 600ms.
- Don't create `README`s, summary docs, or example files that weren't requested.
- Don't ship a section that hasn't been checked at 375px wide.

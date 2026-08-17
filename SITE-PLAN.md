# Living Just Right — Site Plan

Prototype storefront for LG electronics. Korean commerce layout language, own brand identity.
Design tokens, motion rules, and the product card spec live in `CLAUDE.md` — this document covers **what gets built and in what order**.

---

## 1. Route map

| Route | Page | Notes |
|---|---|---|
| `/` | Home | Section order in §2 |
| `/c/[category]` | Category listing (PLP) | e.g. `/c/tv-audio-video` |
| `/c/[category]/[sub]` | Subcategory listing | e.g. `/c/appliances/refrigerators` |
| `/p/[slug]` | Product detail (PDP) | Gallery, specs, related rail |
| `/deals` | Limited-time offers | Shares the home countdown component |
| `/new-arrivals` | New arrivals | Filterable by category |
| `/best-sellers` | Ranked grid | Uses the rank-badge card variant |
| `/search` | Search results | Query param `?q=` |
| `/cart` | Cart | Line items, qty steppers, summary |
| `/checkout` | Checkout | 3 steps: delivery → payment → review. Non-functional |
| `/wishlist` | Wishlist | |
| `/account` | Account shell | Orders, addresses, settings tabs |
| `/track-order` | Order tracking | Input + fake timeline |
| `/support` | Support hub | FAQ accordion, manuals, warranty, contact card |
| `/contact` | Contact | Form + map placeholder + showroom list |
| `/legal/[slug]` | Policies | Shipping, returns, warranty, privacy, terms |
| `/not-found` | 404 | |

Everything is static — fixtures in `lib/data/`, no API routes, no auth.

---

## 2. Home page — section order

Build in this order. Each numbered block is one component in `components/home/`.

**0 · PromoStripe** (above header, in root layout)
Full-bleed, 36px tall, `--gradient-ember` with slow animated gradient. Rotating messages on a 4 s fade-swap: *Free islandwide shipping over US$99* · *Up to 40% off LG appliances* · *0% instalments up to 12 months* · *Authorised LG stockist*. Dismissible ✕ on the right. Hidden below `sm`? No — keep it, single message, no rotation on mobile.

**0b · Header** (sticky, in root layout)
Row 1: logo left · search bar centre (expands on focus) · account / wishlist / cart-with-count right.
Row 2: nav — `Home` · `Categories ▾` (mega menu) · `Deals` · `New Arrivals` · `Best Sellers` · `Support`. `Deals` is gradient-filled text (`--gradient-deal`) panned by `animate-deal-pan` — no fill, no chip.
Scrolled state (past 80px): collapses to one 56px row — logo · Categories · centred nav · search icon · account / wishlist / cart. Background goes translucent white with `backdrop-blur`, gains `--shadow-lg`. Transition `--dur-base`.
Below `lg`: hamburger → slide-in `MobileNav` with accordion category tree.

**1 · HeroCarousel** — **3:1 aspect ratio**
Full-width inside container, `--radius-2xl`, 4–5 slides. Autoplay 6 s, pause on hover and on focus. Slide change: cross-fade + `translateX(24px)` on the text block, `--dur-hero`. Ken Burns on the image is capped at `scale(1) → scale(1.04)` over the full 6 s. Dot indicators bottom-centre with a thin progress fill on the active dot; prev/next arrows appear on hover (desktop) and are always visible (mobile swipe also enabled). Each slide: eyebrow, headline, one line of support copy, one primary CTA.
Aspect ratio drops to 16:9 below `md` so text stays readable.

**2 · TrustBar**
4 items, white card strip overlapping the hero's bottom edge by 24px on desktop: Free Delivery · 2-Year LG Warranty · Authorised Stockist · Easy Returns. Icon + label + one-line sub. Reveal with 60ms stagger.

**3 · CategoryGrid**
Top-level LG categories (§3). Circular image tile on `--color-neutral-100` + label beneath, 8 across on desktop / horizontal scroll-snap on mobile. Hover: tile `scale(1.05)`, label → `--color-accent-500`.

**4 · DealCountdown** — limited-time offers
Dark band, `--gradient-dusk` with animated gradient. Left: eyebrow *Limited time*, heading, and a countdown in four boxed units (`DD : HH : MM : SS`) — ink-900 boxes, white tabular-nums digits, only the seconds box tick-updates so the whole row doesn't jitter. Right: horizontal rail of 4 deal `ProductCard`s on white. "Shop all deals →" link to `/deals`.
Countdown driven by `useCountdown(targetDate)`; when it hits zero it rolls forward 48 h so the prototype never shows a dead timer.

**5 · FeaturedProducts**
Section heading + "View all" link. 4-up grid on desktop (2-up mobile) of `ProductCard`. Reveal with stagger.

**6 · EnergySavings** — interactive savings forecast
Full-bleed band on the eco ramp (`CLAUDE.md` §3.3a) — the only place on the site that ramp appears. White card split 2/3 on `lg`: left is the household input (number field + slider, 100–900 kWh, household presets, a static "where the power goes" split), right is the forecast — bill today vs bill on low energy LG, the monthly / yearly saving, and the three upgrades behind it as cards linking to their PDPs. The forecast panel holds an empty state until the first submit, then tracks the slider live; figures roll up on submit only, so a dragged slider is never chased by an animation.
Maths in `lib/utils/forecastSavings.ts`, fixtures (tariff ladder, lane shares and efficiency gains) in `lib/data/energy.ts`.
Background is three blurred aurora orbs and four drifting leaves over a masked grid lattice, all on `transform`/`opacity` — no `background-position` anywhere, so this band costs nothing from the page's two-animated-gradient budget.

**6b · NewArrivals**
No eyebrow — heading only. Horizontal `ProductRail`, 5-up on desktop, bleeding to the viewport's right edge. Prev/next arrows sit in the heading row (desktop only) where a "View all" link would otherwise go, driving the rail via a ref; no arrows or progress bar below the rail itself.

**7 · SplitBanners**
Two 16:9 promo cards side by side (stacked on mobile), each with a parallax background (max 40px travel) and a text block bottom-left. E.g. *OLED evo — picture beyond pixels* and *ThinQ — your home, in sync*.

**8 · Reviews** — Google Reviews style
No section background of its own — runs on the page's default `--color-neutral-50`, same as every other section. Left column: heading, "Excellent X.X out of 5 stars" with an info glyph, a 5-star average rating row, and a Google logo + wordmark (Google's own colours are an exception to the no-brand-colour rule, same footing as the LG mark in `CLAUDE.md` §2). Right column: a horizontal rail of testimonial cards (`--color-neutral-100` fill, `rounded-control` corners, no border) — stars, bold one-line title, quote, name + date — 1-up mobile / 2-up tablet / 3-up desktop, paged with prev/next circular arrow buttons and a "Show more reviews" control underneath.

**9 · Footer** (root layout, on every page)
Newsletter subscribe band up top — mail badge, heading, one line, email input + accent CTA, inline success state, no modal — bordered off from 4 link columns (Shop · Support · Company · Legal) + brand column with logo, tagline, and social icons below. Payment method row. Bottom bar: copyright + a small line stating the site is an independent LG stockist prototype. Background ink-900, text ink-200, links hover to accent-400.

---

## 3. Category tree — mega menu

Sourced from lg.com/lk. Use these names **verbatim**. Category slugs in brackets.

### TV / Audio / Video `tv-audio-video`
- **TVs** `tvs` — OLED TVs · QNED MiniLED TVs · NanoCell TVs · UHD 4K TVs · Full HD TVs · Smart TVs · LED TVs
- **TV by Size** `tv-by-size` — 86" and above · 77–85" · 65" · 55" · 50" · 49" · 42–48" · 32" and smaller
- **Home Audio** `home-audio` — Soundbars · Home Theater Systems · Blu-ray Home Theater Systems · Mini Audio Systems · Portable Speakers · XBOOM
- **Video Players** `video-players` — DVD Players · Blu-ray Players
- **TV Accessories** `tv-accessories` — Wall Mounts · Stands · Remotes

### Appliances `appliances`
- **Refrigerators** `refrigerators` — All Refrigerators · InstaView™ Door-in-Door® · Door-in-Door® · Side by Side Refrigerators · Top Freezer Refrigerators · One Door Fridges
- **Washing Machines** `washing-machines` — All Washing Machines · Front Load Washing Machines · Top Load Washing Machines · TWINWash™ · Semi Automatic Washing Machines · Washer Dryers
- **Microwave Ovens** `microwave-ovens` — Solo Microwave Ovens · Grill Microwave Ovens · Convection Microwave Ovens
- **Dishwashers** `dishwashers`
- **LG AI Appliances** `ai-appliances`

### Air Solutions `air-solutions`
- **Air Conditioners** `air-conditioners` — Home Air Conditioners · Inverter Air Conditioners · Split Air Conditioners · Portable Air Conditioners
- **Air Care** `air-care` — Air Purifiers

### Computers `computers`
- **Monitors** `monitors` — Consumer Monitors · Gaming Monitors · UltraWide™ Monitors · 4K Monitors
- **Monitor Accessories** `monitor-accessories`

**Mega menu behaviour**
Trigger on hover (desktop) and click/Enter (keyboard + touch), 120ms open delay, 200ms close delay so diagonal mouse travel doesn't dismiss it. Panel: full container width, white, `--radius-xl`, `--shadow-lg`, `1px` neutral-200 border, opens with `opacity 0→1` + `translateY(-8px→0)` over `--dur-base`.
Layout inside: 4 columns of group→link lists, plus a 5th promo column (image card, one line of copy, CTA) that swaps by hovered top-level category. Group headings are ink-900 600-weight; links are neutral-600 and hover to accent-500 with a 2px left indent shift. `Esc` closes and returns focus to the trigger.
Below `lg`: no mega menu — `MobileNav` renders the same tree as a two-level accordion.

---

## 4. Data model

`lib/data/` — plain TypeScript, no fetching.

```ts
type Category = {
  slug: string; name: string;
  groups: { name: string; slug: string; items: { name: string; slug: string }[] }[];
  image: string; promo?: { title: string; copy: string; href: string; image: string };
};

type Product = {
  slug: string; name: string;              // e.g. "LG OLED evo C4 65\" 4K Smart TV"
  category: string; subcategory: string;
  price: number; originalPrice?: number;   // discount % is derived, never stored
  rating?: number; reviewCount?: number;
  badge?: "Best" | "New" | "Sale" | "Energy A+++";
  image: string; gallery?: string[];
  specs: { label: string; value: string }[];
  inStock: boolean; isNew?: boolean; isFeatured?: boolean; rank?: number;
};

type Banner  = { id: string; eyebrow: string; headline: string; copy: string;
                 cta: { label: string; href: string }; image: string };
type Deal    = { productSlug: string; endsAt: string; stockLeft?: number };
```

Catalogue size for the prototype: ~60 products spread across all subcategories, ~5 hero banners, ~8 deals, ~8 best sellers with `rank` 1–8.

---

## 5. Shared component inventory

| Component | Client? | Used by |
|---|---|---|
| `ui/Container`, `ui/Section` | no | everywhere |
| `ui/Reveal` (IntersectionObserver wrapper) | yes | every section |
| `ui/Button`, `ui/Chip`, `ui/Skeleton` | no | everywhere |
| `brand/Logo` | no | header, footer |
| `layout/PromoStripe` | yes | root layout |
| `layout/Header` | yes | root layout |
| `layout/MegaMenu` | yes | header |
| `layout/MobileNav` | yes | header |
| `layout/Footer` | no | root layout |
| `product/ProductCard` | no (hover is CSS) | home rails, PLP, PDP related |
| `product/ProductGrid`, `product/ProductRail` | rail: yes | home, PLP |
| `product/PriceBlock`, `product/Badge`, `product/Rating` | no | card, PDP |
| `home/*` (11 sections above) | mixed | home |
| `hooks/useReveal`, `useCountdown`, `useParallax`, `useMediaQuery` | — | — |

---

## 6. Build phases

1. **Foundation** — `globals.css` `@theme` with every token from `CLAUDE.md` §3–4; `Container`, `Section`, `Button`, `Chip`, `Skeleton`, `Reveal`, `cn`, `formatPrice`, `Logo`. Nothing visual ships until tokens are in.
2. **Data** — `categories.ts` (full tree from §3), `products.ts` (~60), `banners.ts`, `deals.ts`.
3. **Shell** — `PromoStripe`, `Header` + scroll state, `MegaMenu`, `MobileNav`, `Footer`. Verify keyboard nav and 375px before moving on.
4. **Product card** — `ProductCard` + `PriceBlock` + `Badge` + `Rating`, all variants (default, rank, no-offer). Check equal heights in a mixed grid.
5. **Home** — sections 1–14 in order.
6. **PLP + PDP** — category/subcategory listing with sort + filter rail, then product detail.
7. **Commerce shells** — cart, wishlist, checkout, search, account.
8. **Content pages** — support, contact, track-order, legal, 404.
9. **Polish pass** — reveal timing audit, `prefers-reduced-motion` check, focus rings, `alt` text, `npm run build` + `npm run lint` clean, screenshot sweep at 375 / 768 / 1024 / 1440.

---

## 7. Acceptance checks

- Two animated gradients per page, maximum.
- No scroll reveal travels more than 16px; no parallax more than 40px.
- Product card hover changes exactly four things: image scale, card lift, border, shadow.
- No raw hex or arbitrary Tailwind value anywhere in `components/` or `app/`.
- Every section is legible and correctly stacked at 375px.
- `prefers-reduced-motion: reduce` produces a fully static, fully usable site.
- No LG red, no LG typography, no LG brand layout.

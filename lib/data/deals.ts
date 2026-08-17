import type { Deal } from "./types";

/**
 * A fixed origin date. `useCountdown` rolls it forward in 48h steps, so the
 * prototype never renders a dead timer.
 */
const ENDS_AT = "2026-01-05T23:59:59.000Z";

export const deals: Deal[] = [
  { productSlug: "lg-oled-evo-c4-65-4k-smart-tv", endsAt: ENDS_AT, stockLeft: 6 },
  { productSlug: "lg-dualcool-inverter-1-5-ton-split-air-conditioner", endsAt: ENDS_AT, stockLeft: 12 },
  { productSlug: "lg-soundbar-s95tr-9-1-5ch-dolby-atmos", endsAt: ENDS_AT, stockLeft: 4 },
  { productSlug: "lg-ultragear-32-qhd-180hz-gaming-monitor", endsAt: ENDS_AT, stockLeft: 9 },
  { productSlug: "lg-instaview-door-in-door-601l-side-by-side-refrigerator", endsAt: ENDS_AT, stockLeft: 3 },
  { productSlug: "lg-ai-dd-11kg-front-load-washing-machine", endsAt: ENDS_AT, stockLeft: 15 },
  { productSlug: "lg-xboom-go-xg7-portable-speaker", endsAt: ENDS_AT, stockLeft: 22 },
  { productSlug: "lg-quadwash-14-place-setting-dishwasher", endsAt: ENDS_AT, stockLeft: 7 },
];

export const dealEndsAt = ENDS_AT;

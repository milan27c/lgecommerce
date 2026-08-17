import type { Deal } from "./types";

/**
 * A fixed origin date. `useCountdown` rolls it forward in 48h steps, so the
 * prototype never renders a dead timer.
 */
const ENDS_AT = "2026-01-05T23:59:59.000Z";

export const deals: Deal[] = [
  { productSlug: "lg-nanocell-nu870-43-4k-smart-tv-2026", endsAt: ENDS_AT, stockLeft: 6 },
  { productSlug: "lg-12000btu-dual-inverter-convertible-5in1-smart-split", endsAt: ENDS_AT, stockLeft: 12 },
  { productSlug: "lg-ok75-1000w-karaoke-system", endsAt: ENDS_AT, stockLeft: 4 },
  { productSlug: "lg-ultragear-27-fhd-ips-gaming-monitor-freesync", endsAt: ENDS_AT, stockLeft: 9 },
  { productSlug: "lg-neochef-charcoal-healthy-oven", endsAt: ENDS_AT, stockLeft: 3 },
  { productSlug: "lg-11kg-ai-dd-front-load-washing-machine", endsAt: ENDS_AT, stockLeft: 15 },
  { productSlug: "lg-xboom-go-pk7-portable-speaker", endsAt: ENDS_AT, stockLeft: 22 },
  { productSlug: "lg-27-full-hd-ips-monitor-freesync", endsAt: ENDS_AT, stockLeft: 7 },
];

export const dealEndsAt = ENDS_AT;

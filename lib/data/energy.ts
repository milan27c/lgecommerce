import { products } from "./products";
import type { Product } from "./types";

/**
 * Fixtures for the home-page savings forecast (components/home/EnergySavings).
 *
 * Prototype numbers. The tariff ladder is a plausible domestic structure and
 * the efficiency gains are category averages — nothing here is quoted from a
 * live rate card, and the section says so on screen.
 */

export interface TariffTier {
  /** Upper bound of the block in kWh. `null` is the open-ended top block. */
  upTo: number | null;
  /** LKR per kWh inside the block. */
  rate: number;
}

export interface Tariff {
  fixedCharge: number;
  tiers: TariffTier[];
}

/** Rising blocks, so trimming units off the top saves more than the average rate. */
export const tariff: Tariff = {
  fixedCharge: 400,
  tiers: [
    { upTo: 60, rate: 30 },
    { upTo: 90, rate: 40 },
    { upTo: 120, rate: 50 },
    { upTo: 180, rate: 60 },
    { upTo: null, rate: 75 },
  ],
};

/**
 * Which colour a lane carries in the load split and on its upgrade card.
 * Semantic rather than a class name — each component maps it to its own
 * surface. Only one lane is green, so the band never reads as all-eco.
 */
export type LaneTone = "cool" | "eco" | "ink";

export interface EnergyLane {
  id: string;
  /** Category name, verbatim from SITE-PLAN.md §3. */
  label: string;
  tone: LaneTone;
  /** Share of the household's monthly units this lane accounts for. */
  share: number;
  /** Fraction of that share the LG upgrade removes. */
  saving: number;
  /** What earns the gain — one short line under the product name. */
  note: string;
  productSlug: string;
  href: string;
}

/**
 * Shares total 0.86 — the remaining 14% is lighting, water heating and small
 * appliances, which no upgrade here touches.
 */
export const energyLanes: EnergyLane[] = [
  {
    id: "air-conditioners",
    label: "Air Conditioners",
    tone: "cool",
    share: 0.38,
    saving: 0.42,
    note: "Dual Inverter compressor holds temperature instead of cycling",
    productSlug: "lg-dualcool-inverter-1-5-ton-split-air-conditioner",
    href: "/c/air-solutions/air-conditioners",
  },
  {
    id: "refrigerators",
    label: "Refrigerators",
    tone: "eco",
    share: 0.32,
    saving: 0.24,
    note: "Linear Cooling keeps the cabinet within 0.5°C, so the motor rests",
    productSlug: "lg-594l-side-by-side-refrigerator-linear-cooling",
    href: "/c/appliances/refrigerators",
  },
  {
    id: "tvs",
    label: "TVs",
    tone: "ink",
    share: 0.16,
    saving: 0.2,
    note: "MiniLED backlight dims by zone rather than lighting the whole panel",
    productSlug: "lg-qned-miniled-qned86-65-4k-smart-tv",
    href: "/c/tv-audio-video/tvs",
  },
];

const bySlug = new Map(products.map((product) => [product.slug, product]));

export interface EnergyLaneProduct extends EnergyLane {
  product: Product;
}

/** Lanes whose product is actually in the catalogue. */
export const energyLaneProducts: EnergyLaneProduct[] = energyLanes.flatMap((lane) => {
  const product = bySlug.get(lane.productSlug);
  return product ? [{ ...lane, product }] : [];
});

/** Slider bounds and the number the section opens on. */
export const usageRange = { min: 100, max: 900, step: 10, initial: 150 } as const;

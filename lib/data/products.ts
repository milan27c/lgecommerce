import type { Product } from "./types";

type Folder = "TV" | "Audio" | "Appliances" | "AC" | "Computing";
type Shot = 1 | 2 | 3 | 4;

const shot = (folder: Folder, n: Shot) => `/images/products/${folder}/products/${n}.png`;

/** The `1 all images` folder holds the alternate angles for shot 1. */
const angles = (folder: Folder) =>
  ["1B", "1C", "1D", "1E"].map(
    (suffix) => `/images/products/${folder}/products/1%20all%20images/${suffix}.png`,
  );

/**
 * The catalogue is exactly the 20 SKUs we hold real photography for — four
 * shots per category folder (`1.png`–`4.png`). Every product below maps to
 * one of those shots; nothing is invented past what's on disk.
 */
export const products: Product[] = [
  // ---------------------------------------------------------------- TVs
  {
    slug: "lg-qned65-miniled-43-4k-smart-tv-2026",
    name: 'LG (43") QNED AI QNED65 MiniLED 4K Smart TV 2026',
    category: "tv-audio-video",
    subcategory: "qned-miniled-tvs",
    price: 189000,
    originalPrice: 249000,
    rating: 4.6,
    reviewCount: 58,
    badge: "Best",
    image: shot("TV", 1),
    gallery: angles("TV"),
    specs: [
      { label: "Display", value: "QNED65 MiniLED, 100% Color Volume" },
      { label: "Processor", value: "α7 AI Processor Gen8" },
      { label: "Smart TV OS", value: "webOS 2026 with ThinQ" },
    ],
    inStock: true,
    isFeatured: true,
    isNew: true,
    rank: 1,
  },
  {
    slug: "lg-nanocell-nu870-43-4k-smart-tv-2026",
    name: 'LG (43") NANO 4K UHD AI TV NU870 2026',
    category: "tv-audio-video",
    subcategory: "nanocell-tvs",
    price: 132000,
    originalPrice: 159000,
    rating: 4.4,
    reviewCount: 187,
    badge: "Sale",
    image: shot("TV", 2),
    specs: [
      { label: "Display", value: "NanoCell 4K UHD panel" },
      { label: "Processor", value: "α5 AI Processor 4K Gen7" },
      { label: "Audio", value: "20W 2.0ch with AI Sound Pro" },
    ],
    inStock: true,
    isNew: true,
  },
  {
    slug: "lg-qned8aa-43-4k-smart-tv",
    name: 'LG (43") QNED 8AA Smart TV with α7 AI Processor 4K Gen8',
    category: "tv-audio-video",
    subcategory: "qned-miniled-tvs",
    price: 148000,
    originalPrice: 175000,
    rating: 4.5,
    reviewCount: 96,
    badge: "New",
    image: shot("TV", 3),
    specs: [
      { label: "Display", value: "QNED panel with 4K resolution" },
      { label: "Processor", value: "α7 AI Processor 4K Gen8" },
      { label: "Gaming", value: "Game Optimizer with HGiG support" },
    ],
    inStock: true,
    isNew: true,
    isFeatured: true,
  },
  {
    slug: "lg-uhd-ua8200-43-4k-smart-tv",
    name: 'LG (43") 4K UHD AI UA8200 Smart TV with α7 AI Processor',
    category: "tv-audio-video",
    subcategory: "uhd-4k-tvs",
    price: 98000,
    originalPrice: 118000,
    rating: 4.3,
    reviewCount: 241,
    image: shot("TV", 4),
    specs: [
      { label: "Display", value: "4K UHD with Active HDR" },
      { label: "Processor", value: "α7 AI Processor" },
      { label: "Smart TV OS", value: "webOS 2026" },
    ],
    inStock: true,
    isFeatured: true,
  },

  // ---------------------------------------------------------- Home Audio
  {
    slug: "lg-xboom-entertainment-system-karaoke-dj",
    name: "LG XBOOM Entertainment System with Karaoke",
    category: "tv-audio-video",
    subcategory: "xboom",
    price: 189000,
    originalPrice: 229000,
    rating: 4.6,
    reviewCount: 154,
    badge: "Best",
    image: shot("Audio", 1),
    gallery: angles("Audio"),
    specs: [
      { label: "Sound", value: "Multi-driver system with deep bass boost" },
      { label: "Karaoke", value: "Dual mic inputs with vocal effects" },
      { label: "Connectivity", value: "Bluetooth, USB, DJ pad control" },
    ],
    inStock: true,
    isFeatured: true,
    isNew: true,
    rank: 2,
  },
  {
    slug: "lg-ok75-1000w-karaoke-system",
    name: "LG OK75 1000W RMS Karaoke System with DJ Wheel, DJ Pad",
    category: "tv-audio-video",
    subcategory: "mini-audio-systems",
    price: 149000,
    originalPrice: 179000,
    rating: 4.4,
    reviewCount: 88,
    badge: "Sale",
    image: shot("Audio", 2),
    specs: [
      { label: "Output", value: "1000W RMS" },
      { label: "Controls", value: "DJ Wheel and DJ Pad" },
      { label: "Karaoke", value: "Wireless mic compatible with vocal effects" },
    ],
    inStock: true,
  },
  {
    slug: "lg-xboom-boom-blast",
    name: "LG XBOOM Boom Blast",
    category: "tv-audio-video",
    subcategory: "xboom",
    price: 59000,
    rating: 4.2,
    reviewCount: 203,
    image: shot("Audio", 3),
    specs: [
      { label: "Sound", value: "Boom Blast bass reinforcement" },
      { label: "Battery", value: "Up to 20 hours playback" },
      { label: "Build", value: "IPX4 splash resistant" },
    ],
    inStock: true,
    isNew: true,
  },
  {
    slug: "lg-xboom-go-pk7-portable-speaker",
    name: "LG XBOOM Go PK7 Portable Speaker",
    category: "tv-audio-video",
    subcategory: "portable-speakers",
    price: 24900,
    originalPrice: 29900,
    rating: 4.5,
    reviewCount: 412,
    badge: "Sale",
    image: shot("Audio", 4),
    specs: [
      { label: "Battery", value: "Up to 15 hours playback" },
      { label: "Build", value: "IP67 dust and water resistant" },
      { label: "Connectivity", value: "Bluetooth 5.1 with dual pairing" },
    ],
    inStock: true,
  },

  // ---------------------------------------------------------- Appliances
  {
    slug: "lg-594l-instaview-door-in-door-matt-black",
    name: 'LG 594L Side-by-Side Fridge with InstaView Door-in-Door™',
    category: "appliances",
    subcategory: "instaview-door-in-door",
    price: 425000,
    originalPrice: 489000,
    rating: 4.7,
    reviewCount: 268,
    badge: "Best",
    image: shot("Appliances", 1),
    gallery: angles("Appliances"),
    specs: [
      { label: "Capacity", value: "594L gross" },
      { label: "Cooling", value: "Linear Inverter Compressor, holds ±0.5°C" },
      { label: "Finish", value: "Matt Black with InstaView Door-in-Door™" },
    ],
    inStock: true,
    isFeatured: true,
    rank: 3,
    imageInset: "roomy",
  },
  {
    slug: "lg-neochef-charcoal-healthy-oven",
    name: "LG NeoChef Charcoal Healthy Oven",
    category: "appliances",
    subcategory: "grill-microwave-ovens",
    price: 87500,
    originalPrice: 99500,
    rating: 4.3,
    reviewCount: 132,
    badge: "Sale",
    image: shot("Appliances", 2),
    specs: [
      { label: "Cooking", value: "Charcoal heater for grilling and roasting" },
      { label: "Cavity", value: "Smart Inverter for even heat distribution" },
      { label: "Controls", value: "One-touch auto cook menus" },
    ],
    inStock: true,
    isNew: true,
  },
  {
    slug: "lg-dishwasher-quadwash-truesteam",
    name: "LG Dishwasher with QuadWash™ and TrueSteam®",
    category: "appliances",
    subcategory: "dishwashers",
    price: 265000,
    rating: 4.5,
    reviewCount: 74,
    image: shot("Appliances", 3),
    specs: [
      { label: "Wash system", value: "QuadWash™, 4 multi-motion spray arms" },
      { label: "Sanitising", value: "TrueSteam® steam wash and dry" },
      { label: "Noise", value: "44 dBA quiet operation" },
    ],
    inStock: true,
    isFeatured: true,
  },
  {
    slug: "lg-11kg-ai-dd-front-load-washing-machine",
    name: "LG 11kg AI Direct Drive Front Load Washing Machine",
    category: "appliances",
    subcategory: "front-load-washing-machines",
    price: 179000,
    originalPrice: 209000,
    rating: 4.6,
    reviewCount: 356,
    badge: "Sale",
    image: shot("Appliances", 4),
    specs: [
      { label: "Capacity", value: "11kg wash load" },
      { label: "Motor", value: "AI Direct Drive™ with 6 Motion DD" },
      { label: "Programme", value: "Steam+™ allergy care cycle" },
    ],
    inStock: true,
    isNew: true,
  },

  // ------------------------------------------------------- Air Solutions
  {
    slug: "lg-24000btu-dual-inverter-split-ac-thinq",
    name: "LG 24,000 BTU Dual Inverter Split AC with ThinQ",
    category: "air-solutions",
    subcategory: "split-air-conditioners",
    price: 285000,
    originalPrice: 325000,
    rating: 4.6,
    reviewCount: 121,
    badge: "Best",
    image: shot("AC", 1),
    gallery: angles("AC"),
    specs: [
      { label: "Capacity", value: "24,000 BTU / 2.0 Ton" },
      { label: "Compressor", value: "Dual Inverter, holds temperature without cycling" },
      { label: "Smart control", value: "ThinQ Wi-Fi with 4 Way Swing" },
    ],
    inStock: true,
    isFeatured: true,
    isNew: true,
    rank: 4,
  },
  {
    slug: "lg-12000btu-dual-inverter-convertible-5in1-smart-split",
    name: "LG 12,000 BTU Dual Inverter Smart Super Convertible",
    category: "air-solutions",
    subcategory: "inverter-air-conditioners",
    price: 165000,
    originalPrice: 189000,
    rating: 4.4,
    reviewCount: 97,
    badge: "Sale",
    image: shot("AC", 2),
    specs: [
      { label: "Capacity", value: "12,000 BTU / 1.0 Ton" },
      { label: "Cooling modes", value: "Super Convertible 5-in-1 cooling" },
      { label: "Smart control", value: "ThinQ app and voice control" },
    ],
    inStock: true,
  },
  {
    slug: "lg-18000btu-dual-inverter-air-conditioner",
    name: "LG 18,000 BTU Dual Inverter Air Conditioner",
    category: "air-solutions",
    subcategory: "split-air-conditioners",
    price: 215000,
    rating: 4.5,
    reviewCount: 143,
    image: shot("AC", 3),
    specs: [
      { label: "Capacity", value: "18,000 BTU / 1.5 Ton" },
      { label: "Compressor", value: "Dual Inverter for quiet, efficient cooling" },
      { label: "Filter", value: "4-Way Auto Clean filter system" },
    ],
    inStock: true,
    isFeatured: true,
  },
  {
    slug: "lg-12000btu-dual-inverter-ultra-convertible-5in1-split",
    name: "LG 12,000 BTU Dual Inverter Ultra Super Convertible 5-in-1 Split",
    category: "air-solutions",
    subcategory: "inverter-air-conditioners",
    price: 172000,
    originalPrice: 198000,
    rating: 4.5,
    reviewCount: 65,
    badge: "New",
    image: shot("AC", 4),
    specs: [
      { label: "Capacity", value: "12,000 BTU / 1.0 Ton" },
      { label: "Cooling modes", value: "Ultra Super Convertible 5-in-1 cooling" },
      { label: "Air care", value: "HD Filter with Anti-Virus Protection" },
    ],
    inStock: true,
    isNew: true,
  },

  // ------------------------------------------------------------ Monitors
  {
    slug: "lg-34-ultrawide-ips-monitor-21-9",
    name: 'LG 34" Curved UltraWide™ IPS Display Monitor 21:9',
    category: "computers",
    subcategory: "ultrawide-monitors",
    price: 159000,
    originalPrice: 189000,
    rating: 4.7,
    reviewCount: 226,
    badge: "Best",
    image: shot("Computing", 1),
    gallery: angles("Computing"),
    specs: [
      { label: "Panel", value: '34" Curved IPS, 21:9 UltraWide™' },
      { label: "Resolution", value: "3440 x 1440 QHD" },
      { label: "Ports", value: "USB-C 90W, 2× HDMI, DisplayPort" },
    ],
    inStock: true,
    isFeatured: true,
    rank: 5,
  },
  {
    slug: "lg-27-full-hd-ips-monitor-freesync",
    name: 'LG 27" Full HD IPS Monitor with Radeon FreeSync™',
    category: "computers",
    subcategory: "consumer-monitors",
    price: 42900,
    originalPrice: 49900,
    rating: 4.3,
    reviewCount: 587,
    badge: "Sale",
    image: shot("Computing", 2),
    specs: [
      { label: "Panel", value: '27" Full HD IPS' },
      { label: "Refresh rate", value: "100Hz with Radeon FreeSync™" },
      { label: "Ports", value: "HDMI, VGA" },
    ],
    inStock: true,
  },
  {
    slug: "lg-24-ips-gaming-monitor",
    name: 'LG 24" Class IPS Gaming Monitor (23.8" Diagonal)',
    category: "computers",
    subcategory: "gaming-monitors",
    price: 34900,
    rating: 4.2,
    reviewCount: 318,
    image: shot("Computing", 3),
    specs: [
      { label: "Panel", value: '23.8" IPS, Full HD' },
      { label: "Refresh rate", value: "100Hz, 1ms MBR" },
      { label: "Design", value: "3-side virtually borderless" },
    ],
    inStock: true,
    isNew: true,
  },
  {
    slug: "lg-ultragear-27-fhd-ips-gaming-monitor-freesync",
    name: 'LG UltraGear™ 27" FHD IPS Gaming Monitor',
    category: "computers",
    subcategory: "gaming-monitors",
    price: 54900,
    originalPrice: 64900,
    rating: 4.6,
    reviewCount: 449,
    badge: "Sale",
    image: shot("Computing", 4),
    specs: [
      { label: "Panel", value: '27" IPS, Full HD' },
      { label: "Refresh rate", value: "180Hz with AMD FreeSync™ Premium" },
      { label: "Response time", value: "1ms MBR" },
    ],
    inStock: true,
    isFeatured: true,
    isNew: true,
  },
];

export const productBySlug = new Map(products.map((product) => [product.slug, product]));

export function getProduct(slug: string): Product | undefined {
  return productBySlug.get(slug);
}

export const featuredProducts = products.filter((product) => product.isFeatured);

/** Featured products for one top-level category, padded with the rest so a tab is never short. */
export function featuredProductsFor(category: string, limit = 4): Product[] {
  const pool = products.filter((product) => product.category === category);
  return [...pool]
    .sort((a, b) => Number(b.isFeatured ?? false) - Number(a.isFeatured ?? false))
    .slice(0, limit);
}

export const bestSellers = products
  .filter((product): product is Product & { rank: number } => typeof product.rank === "number")
  .sort((a, b) => a.rank - b.rank);

/** Deterministic shuffle (fixed seed) so the "random" order is stable across renders. */
function seededShuffle<T>(items: T[], seed: number): T[] {
  const result = [...items];
  let state = seed;
  for (let i = result.length - 1; i > 0; i--) {
    state = (state * 1103515245 + 12345) & 0x7fffffff;
    const j = state % (i + 1);
    [result[i], result[j]] = [result[j], result[i]];
  }
  return result;
}

/** A category-agnostic mix of new arrivals — shuffled, not grouped or filtered by category. */
export const newArrivalsShowcase = seededShuffle(
  products.filter((product) => product.isNew),
  42,
).slice(0, 10);

/** Newest first for a category, padded with the rest so a tab is never short. */
export function newArrivalsFor(category: string, limit = 8): Product[] {
  const pool = products.filter((product) => product.category === category);
  return [...pool].sort((a, b) => Number(b.isNew ?? false) - Number(a.isNew ?? false)).slice(0, limit);
}

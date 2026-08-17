import type { Category } from "./types";

const tile = (slug: string) => `https://picsum.photos/seed/${slug}/400/400`;
const promoImage = (slug: string) => `https://picsum.photos/seed/${slug}-promo/600/400`;

/** Category tree sourced from SITE-PLAN.md §3. Names are used verbatim. */
export const categories: Category[] = [
  {
    slug: "tv-audio-video",
    name: "TV / Audio / Video",
    image: tile("tv-audio-video"),
    promo: {
      title: "OLED evo C4",
      copy: "Self-lit pixels, Brightness Booster and a9 AI Processor Gen7.",
      href: "/c/tv-audio-video/tvs",
      image: promoImage("tv-audio-video"),
    },
    groups: [
      {
        name: "TVs",
        slug: "tvs",
        items: [
          { name: "OLED TVs", slug: "oled-tvs" },
          { name: "QNED MiniLED TVs", slug: "qned-miniled-tvs" },
          { name: "NanoCell TVs", slug: "nanocell-tvs" },
          { name: "UHD 4K TVs", slug: "uhd-4k-tvs" },
          { name: "Full HD TVs", slug: "full-hd-tvs" },
          { name: "Smart TVs", slug: "smart-tvs" },
          { name: "LED TVs", slug: "led-tvs" },
        ],
      },
      {
        name: "TV by Size",
        slug: "tv-by-size",
        items: [
          { name: '86" and above', slug: "86-and-above" },
          { name: '77–85"', slug: "77-85" },
          { name: '65"', slug: "65" },
          { name: '55"', slug: "55" },
          { name: '50"', slug: "50" },
          { name: '49"', slug: "49" },
          { name: '42–48"', slug: "42-48" },
          { name: '32" and smaller', slug: "32-and-smaller" },
        ],
      },
      {
        name: "Home Audio",
        slug: "home-audio",
        items: [
          { name: "Soundbars", slug: "soundbars" },
          { name: "Home Theater Systems", slug: "home-theater-systems" },
          { name: "Blu-ray Home Theater Systems", slug: "blu-ray-home-theater-systems" },
          { name: "Mini Audio Systems", slug: "mini-audio-systems" },
          { name: "Portable Speakers", slug: "portable-speakers" },
          { name: "XBOOM", slug: "xboom" },
        ],
      },
      {
        name: "Video Players",
        slug: "video-players",
        items: [
          { name: "DVD Players", slug: "dvd-players" },
          { name: "Blu-ray Players", slug: "blu-ray-players" },
        ],
      },
      {
        name: "TV Accessories",
        slug: "tv-accessories",
        items: [
          { name: "Wall Mounts", slug: "wall-mounts" },
          { name: "Stands", slug: "stands" },
          { name: "Remotes", slug: "remotes" },
        ],
      },
    ],
  },
  {
    slug: "appliances",
    name: "Appliances",
    image: tile("appliances"),
    promo: {
      title: "InstaView™ Door-in-Door®",
      copy: "Knock twice to see inside. Keep the cold where it belongs.",
      href: "/c/appliances/refrigerators",
      image: promoImage("appliances"),
    },
    groups: [
      {
        name: "Refrigerators",
        slug: "refrigerators",
        items: [
          { name: "All Refrigerators", slug: "all-refrigerators" },
          { name: "InstaView™ Door-in-Door®", slug: "instaview-door-in-door" },
          { name: "Door-in-Door®", slug: "door-in-door" },
          { name: "Side by Side Refrigerators", slug: "side-by-side-refrigerators" },
          { name: "Top Freezer Refrigerators", slug: "top-freezer-refrigerators" },
          { name: "One Door Fridges", slug: "one-door-fridges" },
        ],
      },
      {
        name: "Washing Machines",
        slug: "washing-machines",
        items: [
          { name: "All Washing Machines", slug: "all-washing-machines" },
          { name: "Front Load Washing Machines", slug: "front-load-washing-machines" },
          { name: "Top Load Washing Machines", slug: "top-load-washing-machines" },
          { name: "TWINWash™", slug: "twinwash" },
          { name: "Semi Automatic Washing Machines", slug: "semi-automatic-washing-machines" },
          { name: "Washer Dryers", slug: "washer-dryers" },
        ],
      },
      {
        name: "Microwave Ovens",
        slug: "microwave-ovens",
        items: [
          { name: "Solo Microwave Ovens", slug: "solo-microwave-ovens" },
          { name: "Grill Microwave Ovens", slug: "grill-microwave-ovens" },
          { name: "Convection Microwave Ovens", slug: "convection-microwave-ovens" },
        ],
      },
      { name: "Dishwashers", slug: "dishwashers", items: [] },
      { name: "LG AI Appliances", slug: "ai-appliances", items: [] },
    ],
  },
  {
    slug: "air-solutions",
    name: "Air Solutions",
    image: tile("air-solutions"),
    promo: {
      title: "DUALCOOL Inverter",
      copy: "Cools in half the time and holds the temperature without the spike.",
      href: "/c/air-solutions/air-conditioners",
      image: promoImage("air-solutions"),
    },
    groups: [
      {
        name: "Air Conditioners",
        slug: "air-conditioners",
        items: [
          { name: "Home Air Conditioners", slug: "home-air-conditioners" },
          { name: "Inverter Air Conditioners", slug: "inverter-air-conditioners" },
          { name: "Split Air Conditioners", slug: "split-air-conditioners" },
          { name: "Portable Air Conditioners", slug: "portable-air-conditioners" },
        ],
      },
      {
        name: "Air Care",
        slug: "air-care",
        items: [{ name: "Air Purifiers", slug: "air-purifiers" }],
      },
    ],
  },
  {
    slug: "computers",
    name: "Computers",
    image: tile("computers"),
    promo: {
      title: "UltraGear™ OLED",
      copy: "0.03ms response and 240Hz, with the black levels only OLED reaches.",
      href: "/c/computers/monitors",
      image: promoImage("computers"),
    },
    groups: [
      {
        name: "Monitors",
        slug: "monitors",
        items: [
          { name: "Consumer Monitors", slug: "consumer-monitors" },
          { name: "Gaming Monitors", slug: "gaming-monitors" },
          { name: "UltraWide™ Monitors", slug: "ultrawide-monitors" },
          { name: "4K Monitors", slug: "4k-monitors" },
        ],
      },
      { name: "Monitor Accessories", slug: "monitor-accessories", items: [] },
    ],
  },
];

export interface CategoryTile {
  name: string;
  /** One line, 2–3 words. */
  subheading: string;
  slug: string;
  href: string;
  image: string;
}

const newCategoryImage = (file: string) => `/images/new categories/${file}`;

/**
 * Tiles for the home CategoryGrid rail. Names come from the tree above.
 */
export const categoryTiles: CategoryTile[] = [
  {
    name: "TVs",
    subheading: "4K & OLED",
    slug: "tvs",
    href: "/c/tv-audio-video/tvs",
    image: newCategoryImage("tv.png"),
  },
  {
    name: "Home Audio",
    subheading: "Soundbars & speakers",
    slug: "home-audio",
    href: "/c/tv-audio-video/home-audio",
    image: newCategoryImage("audio.png"),
  },
  {
    name: "Refrigerators",
    subheading: "Smart, spacious cooling",
    slug: "refrigerators",
    href: "/c/appliances/refrigerators",
    image: newCategoryImage("Refrigerators.png"),
  },
  {
    name: "Washing Machines",
    subheading: "Effortless laundry care",
    slug: "washing-machines",
    href: "/c/appliances/washing-machines",
    image: newCategoryImage("washing machines.png"),
  },
  {
    name: "Air Conditioners",
    subheading: "Fast, even cooling",
    slug: "air-conditioners",
    href: "/c/air-solutions/air-conditioners",
    image: newCategoryImage("ac.png"),
  },
  {
    name: "Air Care",
    subheading: "Cleaner indoor air",
    slug: "air-care",
    href: "/c/air-solutions/air-care",
    image: newCategoryImage("air care.png"),
  },
  {
    name: "Microwave Ovens",
    subheading: "Quick, even heating",
    slug: "microwave-ovens",
    href: "/c/appliances/microwave-ovens",
    image: newCategoryImage("mircowave.png"),
  },
  {
    name: "Monitors",
    subheading: "Precision for gaming",
    slug: "monitors",
    href: "/c/computers/monitors",
    image: newCategoryImage("monitor.png"),
  },
];

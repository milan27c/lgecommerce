/** Editorial and marketing copy for the home page sections. */

export interface TrustItem {
  id: string;
  label: string;
  copy: string;
}

export const trustItems: TrustItem[] = [
  { id: "delivery", label: "Free Delivery", copy: "On every order over US$99" },
  { id: "warranty", label: "2-Year LG Warranty", copy: "Registered at checkout" },
  { id: "stockist", label: "Authorised Stockist", copy: "Genuine LG stock only" },
  { id: "returns", label: "Easy Returns", copy: "30 days, collection included" },
];

export interface ShowcaseCard {
  id: string;
  title: string;
  itemCount: number;
  href: string;
  image: string;
}

export const showcaseCards: ShowcaseCard[] = [
  {
    id: "refrigerators",
    title: "Refrigerators",
    itemCount: 42,
    href: "/c/appliances/refrigerators",
    image: "https://picsum.photos/seed/showcase-refrigerators/800/1000",
  },
  {
    id: "washing-machines",
    title: "Washing Machines",
    itemCount: 36,
    href: "/c/appliances/washing-machines",
    image: "https://picsum.photos/seed/showcase-washing-machines/800/500",
  },
  {
    id: "air-conditioners",
    title: "Air Conditioners",
    itemCount: 28,
    href: "/c/air-solutions/air-conditioners",
    image: "https://picsum.photos/seed/showcase-air-conditioners/800/500",
  },
];

export interface Guide {
  id: string;
  title: string;
  excerpt: string;
  readTime: string;
  href: string;
  image: string;
}

export const guides: Guide[] = [
  {
    id: "inverter-ac",
    title: "How to choose an inverter AC",
    excerpt:
      "Tonnage, star ratings and room size decide the bill more than the badge does. Here is the short version.",
    readTime: "6 min read",
    href: "/support",
    image: "https://picsum.photos/seed/guide-inverter-ac/800/500",
  },
  {
    id: "oled-vs-qned",
    title: "OLED vs QNED",
    excerpt:
      "One lights every pixel on its own, the other pushes brightness further. Which one suits your room?",
    readTime: "8 min read",
    href: "/support",
    image: "https://picsum.photos/seed/guide-oled-vs-qned/800/500",
  },
  {
    id: "front-or-top-load",
    title: "Front load or top load?",
    excerpt:
      "Water use, fabric care and the space you actually have. A straight comparison, no hedging.",
    readTime: "5 min read",
    href: "/support",
    image: "https://picsum.photos/seed/guide-front-or-top-load/800/500",
  },
];

export interface Review {
  id: string;
  rating: number;
  quote: string;
  name: string;
  product: string;
}

export const reviews: Review[] = [
  {
    id: "review-1",
    rating: 5,
    quote:
      "Delivered in two days and the installers took the old unit away. The C4 is every bit as good as the showroom demo.",
    name: "Nadia R.",
    product: 'OLED evo C4 65"',
  },
  {
    id: "review-2",
    rating: 5,
    quote:
      "Third LG appliance from this store. Pricing beat the mall by a clear margin and the warranty was registered before I got home.",
    name: "Dilan P.",
    product: "InstaView™ Refrigerator",
  },
  {
    id: "review-3",
    rating: 4,
    quote:
      "The DUALCOOL runs quiet enough to sleep through and the power bill dropped noticeably in the first month.",
    name: "Ayesha F.",
    product: "DUALCOOL Inverter 1.5 Ton",
  },
];

export interface FeatureBullet {
  label: string;
  value: string;
}

export const featureBand = {
  eyebrow: "The premium moment",
  headline: "OLED evo G4, engineered for the dark",
  copy: "Brightness Booster Ultimate and MLA+ push peak highlights further without lifting a single black level.",
  bullets: [
    { label: "Processor", value: "α11 AI Processor 4K" },
    { label: "Panel", value: "MLA+ with Brightness Booster Ultimate" },
    { label: "Gaming", value: "4× HDMI 2.1 at 144Hz VRR" },
  ] satisfies FeatureBullet[],
  cta: { label: "Explore OLED evo G4", href: "/p/lg-oled-evo-g4-77-4k-smart-tv" },
  image: "/images/products/TV/products/2.png",
};

export interface FooterColumn {
  title: string;
  links: { label: string; href: string }[];
}

export const footerColumns: FooterColumn[] = [
  {
    title: "Shop",
    links: [
      { label: "All Products", href: "/shop" },
      { label: "TV / Audio / Video", href: "/c/tv-audio-video" },
      { label: "Appliances", href: "/c/appliances" },
      { label: "Air Solutions", href: "/c/air-solutions" },
      { label: "Computers", href: "/c/computers" },
      { label: "Deals", href: "/deals" },
      { label: "New Arrivals", href: "/new-arrivals" },
    ],
  },
  {
    title: "Support",
    links: [
      { label: "Help Centre", href: "/support" },
      { label: "Track Order", href: "/track-order" },
      { label: "Manuals", href: "/support" },
      { label: "Warranty", href: "/legal/warranty" },
      { label: "Contact Us", href: "/contact" },
    ],
  },
  {
    title: "Company",
    links: [
      { label: "Showrooms", href: "/contact" },
      { label: "Best Sellers", href: "/best-sellers" },
      { label: "Wishlist", href: "/wishlist" },
      { label: "Account", href: "/account" },
    ],
  },
  {
    title: "Legal",
    links: [
      { label: "Shipping Policy", href: "/legal/shipping" },
      { label: "Returns", href: "/legal/returns" },
      { label: "Warranty Terms", href: "/legal/warranty" },
      { label: "Privacy Policy", href: "/legal/privacy" },
      { label: "Terms of Use", href: "/legal/terms" },
    ],
  },
];

/** Rendered as one continuous marquee — keep each line short. */
export const promoMessages = [
  "Free islandwide shipping over US$99",
  "Up to 40% off LG appliances",
  "0% instalments up to 12 months",
  "Authorised LG stockist",
  "2-year manufacturer warranty",
  "Free installation on major appliances",
];

/** Categories is not in this list — it sits beside the header search field. */
export const primaryNav = [
  { label: "Home", href: "/" },
  { label: "Shop", href: "/shop" },
  { label: "Deals", href: "/deals" },
  { label: "New Arrivals", href: "/new-arrivals" },
  { label: "Best Sellers", href: "/best-sellers" },
  { label: "Support", href: "/support" },
];

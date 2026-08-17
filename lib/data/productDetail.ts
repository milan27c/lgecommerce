import type { Product, ProductSpec } from "./types";

/** One stat cell in the Key features / Smart features grids. */
export interface FeatureTile {
  label: string;
  value: string;
  note: string;
}

export interface VariantGroup {
  label: string;
  options: string[];
  /** The option that renders pressed. Selection is prototype-only state. */
  selected: string;
}

/** Full-width editorial band beneath the buy box. */
export interface StoryBlock {
  id: string;
  eyebrow?: string;
  heading: string;
  copy: string;
  image: string;
  alt: string;
  /** `light` sits on the page, `ink` and `dusk` are full-bleed dark bands. */
  tone: "light" | "ink" | "dusk";
  ratio: "wide" | "video";
}

export interface ProductReview {
  author: string;
  date: string;
  rating: number;
  body: string;
}

export interface FaqItem {
  question: string;
  answer: string;
}

export interface SupportCard {
  title: string;
  copy: string;
}

export interface ProductDetail {
  sku: string;
  /** Chips above the title, e.g. "Best Seller". */
  tags: string[];
  description: string;
  highlights: string[];
  variants: VariantGroup;
  keyFeatures: FeatureTile[];
  stories: StoryBlock[];
  smartFeaturesTitle: string;
  smartFeatures: FeatureTile[];
  fullSpecs: ProductSpec[];
  reviewSummary: { rating: number; count: number; recommend: number };
  reviews: ProductReview[];
  faqs: FaqItem[];
  support: SupportCard[];
}

const supportCards: SupportCard[] = [
  {
    title: "Warranty",
    copy: "Two years full cover on parts and labour, plus ten years on the panel module, from the date of purchase.",
  },
  {
    title: "Installation",
    copy: "Professional wall mounting and calibration can be scheduled after purchase through our support team.",
  },
  {
    title: "Need help",
    copy: "Our support team is available every day to help with setup, service, or general questions.",
  },
];

/**
 * Hand-written detail pages, keyed by slug. Empty for now — every product
 * resolves through the generic fallback below until specific copy is written.
 */
const details: Record<string, ProductDetail> = {};

const sizeFrom = (name: string) => name.match(/\d{2}"/)?.[0] ?? "Standard";

/**
 * Every product resolves to a detail page. Products without hand-written copy
 * fall back to a record built from the catalogue entry.
 */
export function getProductDetail(product: Product): ProductDetail {
  const written = details[product.slug];
  if (written) return written;

  const size = sizeFrom(product.name);

  return {
    sku: product.slug.toUpperCase().slice(0, 18),
    tags: [product.badge === "New" ? "New Model" : "Authorised Stock", "2026 Model"],
    description: `${product.name}, stocked and serviced by Living Just Right. Every unit is authorised LG stock, delivered islandwide and covered by the full LG warranty.`,
    highlights: product.specs.map((spec) => `${spec.label}: ${spec.value}`),
    variants: { label: "Model", options: [size], selected: size },
    keyFeatures: product.specs.slice(0, 5).map((spec) => ({
      label: spec.label,
      value: spec.value.split(" ").slice(0, 2).join(" "),
      note: spec.value,
    })),
    stories: [
      {
        id: "overview",
        heading: "Built to sit right in your home",
        copy: "Considered engineering, quiet operation and a finish that holds up over years of daily use.",
        image: "/images/products/c4-story/color.png",
        alt: `${product.name} in a home setting`,
        tone: "light",
        ratio: "wide",
      },
      {
        id: "engineering",
        heading: "Engineered for the long run",
        copy: "Inverter-class components and LG's own quality programme keep performance steady well past the warranty period.",
        image: "/images/products/c4-story/procesor.jpg",
        alt: `Detail shot of the ${product.name}`,
        tone: "ink",
        ratio: "wide",
      },
    ],
    smartFeaturesTitle: "What you get with every order",
    smartFeatures: [
      { label: "Delivery", value: "Free", note: "Orders over US$99" },
      { label: "Warranty", value: "2 Years", note: "Full LG cover" },
      { label: "Stock", value: "Authorised", note: "Genuine LG" },
      { label: "Returns", value: "14 Days", note: "No questions" },
      { label: "Instalments", value: "0%", note: "Up to 12 months" },
      { label: "Support", value: "Every day", note: "Setup and service" },
    ],
    fullSpecs: product.specs,
    reviewSummary: {
      rating: product.rating ?? 4.5,
      count: product.reviewCount ?? 0,
      recommend: 92,
    },
    reviews: [],
    faqs: [
      {
        question: "How long does delivery take?",
        answer:
          "Islandwide delivery runs three to five working days. Large appliances are scheduled with you by phone before dispatch.",
      },
      {
        question: "Is this genuine LG stock?",
        answer:
          "Yes. Living Just Right is an authorised LG stockist, so every unit carries the full manufacturer warranty.",
      },
    ],
    support: supportCards,
  };
}

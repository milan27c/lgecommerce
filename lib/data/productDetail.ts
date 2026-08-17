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

/** Feature photography for the QNED65 detail page. */
const qned65Image = (file: string) => `/images/product%201/${file}`;

/**
 * Hand-written detail pages, keyed by slug. Empty for most products — they
 * resolve through the generic fallback below until specific copy is written.
 */
const details: Record<string, ProductDetail> = {
  "lg-qned65-miniled-43-4k-smart-tv-2026": {
    sku: "TV-QNED65-2026",
    tags: ["Best Seller", "2026 Model"],
    description:
      "Cutting-edge Mini LED technology meets AI intelligence that adapts to every scene, for enhanced clarity and colour vibrancy across movies, sports and daily content.",
    highlights: [
      "Quantum Color: 100% colour volume certification for vibrant, accurate reproduction",
      "α7 AI Processor Gen8: nano-scale image optimisation with improved contrast and 3D depth",
      "Gaming: 120Hz with VRR support and BT ULL certified controller compatibility",
      "Filmmaker Mode: content displayed without motion-smoothing enhancements",
      "Smart features: AI Concierge, Multi AI Search, Sports Alert, Gallery Mode, voice recognition",
      "AI Remote: motion sensor with scroll-wheel navigation",
    ],
    variants: { label: "Screen Size", options: ['43"', '55"', '65"'], selected: '43"' },
    keyFeatures: [
      { label: "Display", value: "QNED65 Mini LED", note: "100% colour volume certified" },
      { label: "Processor", value: "α7 AI Gen8", note: "Nano-scale image optimisation" },
      { label: "Refresh Rate", value: "120Hz", note: "VRR for smooth, tear-free gaming" },
      { label: "Audio", value: "Dolby Atmos", note: "Syncs with LG soundbars for fuller surround" },
      { label: "Smart OS", value: "webOS 2026", note: "AI Concierge and Multi AI Search built in" },
    ],
    stories: [
      {
        id: "quantum-color",
        eyebrow: "Quantum Color",
        heading: "Colour that earns its certification",
        copy: "100% colour volume certification means every hue holds up at full brightness, not just at the centre of the screen.",
        image: qned65Image("color.png"),
        alt: "Vivid colour splash representing the QNED65's Quantum Color performance",
        tone: "light",
        ratio: "wide",
      },
      {
        id: "ai-processor",
        eyebrow: "α7 AI Processor Gen8",
        heading: "Nano-scale precision, scene by scene",
        copy: "Nine-step noise reduction and AI upscaling rebuild contrast and 3D depth in real time, so every source looks closer to native 4K.",
        image: qned65Image("procesor.jpg"),
        alt: "LG α7 AI Processor Gen8 chip on a circuit board",
        tone: "ink",
        ratio: "wide",
      },
      {
        id: "gaming",
        eyebrow: "Gaming",
        heading: "Built for the split-second moments",
        copy: "120Hz with VRR keeps fast-moving action tear-free, with BT ULL certified controller support for lower input lag.",
        image: qned65Image("gaming.png"),
        alt: "Fast-paced game footage demonstrating the QNED65's 120Hz VRR gaming performance",
        tone: "light",
        ratio: "wide",
      },
      {
        id: "ai-remote",
        eyebrow: "AI Remote",
        heading: "Control it with a motion and a scroll",
        copy: "Point, scroll and speak. AI Concierge, Multi AI Search and Voice ID with My Page are all one press away.",
        image: qned65Image("remote.png"),
        alt: "LG AI Remote with the smart features it controls",
        tone: "dusk",
        ratio: "wide",
      },
      {
        id: "sound",
        eyebrow: "Audio-visual sync",
        heading: "Picture and sound, working together",
        copy: "Pair with an LG soundbar and the TV synchronises with it, expanding depth and directionality for a fuller surround experience.",
        image: qned65Image("sound.png"),
        alt: "Home theatre living room showing surround sound synced with the QNED65 TV",
        tone: "light",
        ratio: "wide",
      },
    ],
    smartFeaturesTitle: "What you get with every order",
    smartFeatures: [
      { label: "Delivery", value: "Free", note: "Orders over US$99" },
      { label: "Warranty", value: "2 Years", note: "Full cover, 10 years on the panel" },
      { label: "Stock", value: "Authorised", note: "Genuine LG" },
      { label: "Returns", value: "14 Days", note: "No questions" },
      { label: "Instalments", value: "0%", note: "Up to 12 months" },
      { label: "Support", value: "Every day", note: "Setup and service" },
    ],
    fullSpecs: [
      { label: "Screen Size", value: '43" / 108cm (also available in 55" and 65")' },
      { label: "Resolution", value: "4K UHD (3840 x 2160)" },
      { label: "Display Technology", value: "QNED65 Mini LED, 100% colour volume certified" },
      { label: "Processor", value: "α7 AI Processor Gen8" },
      { label: "Refresh Rate", value: "120Hz with VRR" },
      { label: "Audio", value: "Dolby Atmos" },
      { label: "Smart TV OS", value: "webOS 2026" },
      { label: "Power Consumption", value: "85W (typical)" },
      { label: "Connectivity", value: "Wi-Fi 6, Bluetooth 5.2, 4x HDMI 2.1" },
      { label: "Warranty", value: "2 years full cover; 10 years on the panel" },
    ],
    reviewSummary: { rating: 4.6, count: 58, recommend: 89 },
    reviews: [],
    faqs: [
      {
        question: "What screen sizes does this model come in?",
        answer: "The QNED65 line is available in 43\", 55\" and 65\" — this listing is the 43\" model.",
      },
      {
        question: "Does it support VRR for gaming?",
        answer:
          "Yes. The panel runs at 120Hz with VRR support, and is compatible with BT ULL certified controllers for lower input lag.",
      },
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
  },
};

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

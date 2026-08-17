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

/** Placeholder editorial imagery — seeded so a block keeps the same shot. */
const story = (seed: string, width: number, height: number) =>
  `https://picsum.photos/seed/${seed}/${width}/${height}`;

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

const details: Record<string, ProductDetail> = {
  "lg-qned-miniled-qned86-65-4k-smart-tv": {
    sku: "TV-QNED86-2026",
    tags: ["Best Seller", "2026 Model"],
    description:
      "Cinema-quality picture, right in your living room. This 65\" QNED MiniLED pairs Precision Dimming with an AI processor that reads every scene, so clarity and colour hold up whether you are watching films, sport, or everyday viewing.",
    highlights: [
      "QNED86 MiniLED panel with 4K resolution and AI upscaling",
      "α7 AI Processor Gen8 for intelligent picture enhancement",
      "Filmmaker Mode with Dolby Atmos for a cinema-grade experience",
      "Smart AI features that adapt to your viewing habits",
      "2026 model with the latest webOS AI platform",
    ],
    variants: {
      label: "Screen size",
      options: ['86" (218cm)', '75" (189cm)', '65" (164cm)', '55" (139cm)'],
      selected: '65" (164cm)',
    },
    keyFeatures: [
      { label: "Display", value: "QNED86", note: "MiniLED 4K" },
      { label: "AI Processor", value: "α7 Gen8", note: "Scene adaptation" },
      { label: "Audio", value: "Dolby Atmos", note: "Immersive sound" },
      { label: "Resolution", value: "4K", note: "Ultra HD" },
      { label: "Screen size", value: "65 inch", note: "164cm" },
    ],
    stories: [
      {
        id: "quantum-colour",
        heading: "How does Quantum Colour bring lifelike colour to every scene?",
        copy: "Quantum Colour is certified for 100% colour volume, holding true colour and detail in every scene. Built on a next-generation wide colour gamut, it renders vibrant, dynamic colour in motion so every mood, from cinema to sport, comes through exactly as it should.",
        image: "/images/products/qned86-story/color.png",
        alt: "Vivid splashes of colour in motion filling the screen",
        tone: "light",
        ratio: "wide",
      },
      {
        id: "processor",
        heading: "Upgraded for smarter, more powerful processing",
        copy: "Driven by enhanced GPU and CPU power, the α7 AI Processor performs nano-scale image optimisation to deliver 4K clarity with improved contrast and three-dimensional depth.",
        image: "/images/products/qned86-story/procesor.jpg",
        alt: "Close-up of a glowing α7 AI Processor chip on a circuit board",
        tone: "ink",
        ratio: "wide",
      },
      {
        id: "ai-remote",
        eyebrow: "AI Remote",
        heading: "Navigate and point like an air mouse to reach the AI Hub",
        copy: "Control the TV with the AI Remote. A motion sensor and scroll wheel let you click, drag, and drop like an air mouse, or simply speak for voice commands.",
        image: "/images/products/qned86-story/remote.png",
        alt: "Remote pointing at a screen surrounded by AI smart feature icons",
        tone: "light",
        ratio: "video",
      },
      {
        id: "gaming",
        heading: "Game to win with smooth performance",
        copy: "Up to 120Hz VRR with HGiG and low input lag. Paired with a BT ULL certified controller and fast refresh rates, every gaming moment holds together.",
        image: "/images/products/qned86-story/gaming.png",
        alt: "Fast-moving action game filling the screen with an inset kill-cam replay",
        tone: "dusk",
        ratio: "wide",
      },
      {
        id: "sound",
        heading: "Full surround sound from TV and soundbar in sync",
        copy: "By synchronising the TV and soundbar as one, the system expands depth and directionality for a fuller surround experience.",
        image: "/images/products/qned86-story/sound.png",
        alt: "Living room TV and soundbar with sound waves spreading through the room",
        tone: "light",
        ratio: "wide",
      },
    ],
    smartFeaturesTitle: "Smart features, made simple",
    smartFeatures: [
      { label: "Content discovery", value: "AI Concierge", note: "Personalised picks" },
      { label: "Search everything", value: "Multi AI Search", note: "One search bar" },
      { label: "Connected home", value: "Home Hub", note: "Works with Matter" },
      { label: "For live sport", value: "Sports Alert", note: "Scores and fixtures" },
      { label: "Ambient display", value: "Gallery Mode", note: "Auto brightness" },
      { label: "Hands free", value: "Voice Recognition", note: "Built-in mic" },
    ],
    fullSpecs: [
      { label: "Screen size", value: '164 cm (65 inches)' },
      { label: "Resolution", value: "4K UHD (3840 x 2160)" },
      { label: "Display type", value: "QNED86 MiniLED" },
      { label: "Processor", value: "α7 AI Processor Gen8" },
      { label: "Refresh rate", value: "120 Hz" },
      { label: "Audio", value: "Dolby Atmos" },
      { label: "Smart TV OS", value: "webOS 2026" },
      { label: "Connectivity", value: "Wi-Fi 6, Bluetooth 5.2, 4x HDMI 2.1" },
      { label: "Power consumption", value: "145W (typical)" },
      { label: "Warranty", value: "2 years full" },
    ],
    reviewSummary: { rating: 4.5, count: 421, recommend: 89 },
    reviews: [
      {
        author: "Kavi L.",
        date: "July 2026",
        rating: 5,
        body: "The picture quality is stunning. AI upscaling makes even older content look sharp. A genuinely premium TV experience.",
      },
      {
        author: "Nisha D.",
        date: "June 2026",
        rating: 5,
        body: "Best purchase we made this year. Dolby Atmos sound is immersive, the colours pop, and it is easy to live with.",
      },
      {
        author: "Rohan P.",
        date: "May 2026",
        rating: 4,
        body: "Fantastic picture and the smart features work seamlessly. Minor note: the remote could use a few more shortcuts.",
      },
    ],
    faqs: [
      {
        question: "Is this TV suitable for gaming?",
        answer:
          "Yes. With a 120Hz refresh rate and HDMI 2.1 support it handles next-gen console gaming well, and the AI processor keeps input lag low for competitive play.",
      },
      {
        question: "Does it have built-in streaming apps?",
        answer:
          "Yes. webOS 2026 ships with the major streaming platforms pre-installed, including Netflix, YouTube, Prime Video and Disney+. Wi-Fi 6 keeps playback smooth.",
      },
      {
        question: "What is Filmmaker Mode?",
        answer:
          "Filmmaker Mode shows content exactly as the director intended, with no motion smoothing or artificial enhancement. It suits films and drama series best.",
      },
      {
        question: "Can I wall mount this TV?",
        answer:
          "Yes. The set is VESA compatible and supports standard wall mounts. We recommend professional installation for safety and the best viewing angle.",
      },
    ],
    support: supportCards,
  },

  "lg-oled-evo-c4-65-4k-smart-tv": {
    sku: "TV-OLEDC4-2026",
    tags: ["Best Seller", "2026 Model"],
    description:
      "Self-lit pixels, perfect black. The 65\" LG OLED evo C4 pairs Brightness Booster with the α9 AI Processor 4K Gen7, so every scene holds true black alongside colour that stays accurate at any brightness — built for cinema, sport and 144Hz gaming alike.",
    highlights: [
      "OLED evo panel with Brightness Booster for brighter, more dynamic HDR",
      "α9 AI Processor 4K Gen7 for scene-by-scene picture and sound tuning",
      "144Hz refresh with NVIDIA G-Sync and AMD FreeSync Premium support",
      "Dolby Vision and Dolby Atmos on every title that supports it",
      "Filmmaker Mode removes motion smoothing for true-to-director playback",
      "2026 model with the latest webOS AI platform",
    ],
    variants: {
      label: "Screen size",
      options: ['83" (210cm)', '77" (196cm)', '65" (164cm)', '55" (139cm)', '48" (121cm)'],
      selected: '65" (164cm)',
    },
    keyFeatures: [
      { label: "Display", value: "OLED evo", note: "Brightness Booster" },
      { label: "AI Processor", value: "α9 Gen7", note: "Scene-by-scene tuning" },
      { label: "Audio", value: "Dolby Atmos", note: "Immersive sound" },
      { label: "Refresh rate", value: "144Hz", note: "VRR for gaming" },
      { label: "Screen size", value: "65 inch", note: "164cm" },
    ],
    stories: [
      {
        id: "self-lit-pixels",
        heading: "Why does perfect black make every colour more real?",
        copy: "Each of the 8 million pixels in the OLED evo panel switches on and off independently, so black is truly black with no backlight bleed. Brightness Booster then pushes highlights further, holding colour accuracy from the darkest shadow to the brightest spark.",
        image: story("c4-self-lit-pixels", 1800, 900),
        alt: "Deep black background with a single bright point of light",
        tone: "light",
        ratio: "wide",
      },
      {
        id: "processor",
        heading: "Upgraded for smarter, more powerful processing",
        copy: "The α9 AI Processor 4K Gen7 reads each scene and adjusts picture and sound to match, with sharper upscaling and more natural motion than the generation before it.",
        image: story("c4-processor", 1800, 900),
        alt: "Close-up of a glowing processor chip on a circuit board",
        tone: "ink",
        ratio: "wide",
      },
      {
        id: "ai-remote",
        eyebrow: "AI Remote",
        heading: "Navigate and point like an air mouse to reach the AI Hub",
        copy: "Control the TV with the AI Remote. A motion sensor and scroll wheel let you click, drag, and drop like an air mouse, or simply speak for voice commands.",
        image: story("c4-ai-remote", 1600, 900),
        alt: "Remote pointing at a screen surrounded by smart feature icons",
        tone: "light",
        ratio: "video",
      },
      {
        id: "gaming",
        heading: "Game to win with near-instant response",
        copy: "144Hz VRR, 0.1ms response and support for both NVIDIA G-Sync and AMD FreeSync Premium keep motion tear-free and input lag out of the way, whatever you're running.",
        image: story("c4-gaming", 1800, 900),
        alt: "Player holding a controller in front of a fast-moving game on screen",
        tone: "dusk",
        ratio: "wide",
      },
      {
        id: "sound",
        heading: "Full surround sound from TV and soundbar in sync",
        copy: "By synchronising the TV and soundbar as one, the system expands depth and directionality for a fuller surround experience with Dolby Atmos content.",
        image: story("c4-soundbar", 1800, 900),
        alt: "Soundbar beneath a screen with sound spreading through the room",
        tone: "light",
        ratio: "wide",
      },
    ],
    smartFeaturesTitle: "Smart features, made simple",
    smartFeatures: [
      { label: "Content discovery", value: "AI Concierge", note: "Personalised picks" },
      { label: "Search everything", value: "Multi AI Search", note: "One search bar" },
      { label: "Connected home", value: "Home Hub", note: "Works with Matter" },
      { label: "For live sport", value: "Sports Alert", note: "Scores and fixtures" },
      { label: "Ambient display", value: "Gallery Mode", note: "Auto brightness" },
      { label: "Hands free", value: "Voice Recognition", note: "Built-in mic" },
    ],
    fullSpecs: [
      { label: "Screen size", value: "164 cm (65 inches)" },
      { label: "Resolution", value: "4K UHD (3840 x 2160)" },
      { label: "Display type", value: "OLED evo with Brightness Booster" },
      { label: "Processor", value: "α9 AI Processor 4K Gen7" },
      { label: "Refresh rate", value: "144 Hz VRR" },
      { label: "Audio", value: "Dolby Atmos, Dolby Vision picture" },
      { label: "Smart TV OS", value: "webOS 2026" },
      { label: "Connectivity", value: "Wi-Fi 6, Bluetooth 5.2, 4x HDMI 2.1 (48Gbps)" },
      { label: "Power consumption", value: "140W (typical)" },
      { label: "Warranty", value: "2 years full" },
    ],
    reviewSummary: { rating: 4.8, count: 2043, recommend: 94 },
    reviews: [
      {
        author: "Dinesh W.",
        date: "July 2026",
        rating: 5,
        body: "Black levels are on another level compared to our old LED set. Dolby Vision content looks incredible and gaming at 144Hz is completely smooth.",
      },
      {
        author: "Anjali R.",
        date: "June 2026",
        rating: 5,
        body: "Went from a QLED to this OLED and there's no comparison for movie nights. The α9 processor upscales older shows surprisingly well too.",
      },
      {
        author: "Chamara S.",
        date: "May 2026",
        rating: 4,
        body: "Fantastic picture and very thin panel. Only wish it shipped with a soundbar bundle, but Dolby Atmos through the TV speakers is still solid.",
      },
    ],
    faqs: [
      {
        question: "Is this TV suitable for gaming?",
        answer:
          "Yes. 144Hz VRR, 0.1ms response time and HDMI 2.1 across all four ports make it well suited to both console and PC gaming, with G-Sync and FreeSync Premium support.",
      },
      {
        question: "Does OLED suffer from screen burn-in?",
        answer:
          "LG's OLED panels include pixel-refresher and logo-dimming safeguards that make burn-in very unlikely under normal, varied viewing. Continuous static images for extended periods should still be avoided, as with any OLED.",
      },
      {
        question: "Does it have built-in streaming apps?",
        answer:
          "Yes. webOS 2026 ships with the major streaming platforms pre-installed, including Netflix, YouTube, Prime Video and Disney+. Wi-Fi 6 keeps playback smooth.",
      },
      {
        question: "Can I wall mount this TV?",
        answer:
          "Yes. The set is VESA compatible and supports standard wall mounts. We recommend professional installation for safety and the best viewing angle.",
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
  const seed = product.slug;

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
        image: story(`${seed}-overview`, 1800, 900),
        alt: `${product.name} in a home setting`,
        tone: "light",
        ratio: "wide",
      },
      {
        id: "engineering",
        heading: "Engineered for the long run",
        copy: "Inverter-class components and LG's own quality programme keep performance steady well past the warranty period.",
        image: story(`${seed}-engineering`, 1800, 900),
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

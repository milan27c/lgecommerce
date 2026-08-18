import type { Banner } from "./types";

/** Source files carry spaces in their names, so the paths are encoded here. */
export const heroBanners: Banner[] = [
  {
    id: "fresh-refrigerators",
    headline: "Freshness,\nMade Effortless",
    cta: { label: "Shop refrigerators", href: "/c/appliances/refrigerators" },
    image: "/images/hero/newhero5.png",
    mobileImage: "/images/hero/newmobile3.png",
    tone: "dark",
    scrimOpacity: 0.6,
    hideTextOnDesktop: true,
  },
  {
    id: "together-tv",
    headline: "Bring Everyone Together",
    cta: { label: "Shop LG TVs", href: "/c/tv-audio-video/tvs" },
    image: "/images/hero/newhero2.png",
    mobileImage: "/images/hero/newmoblile2.png",
    tone: "dark",
    hideTextOnDesktop: true,
  },
];

export interface SplitBanner {
  id: string;
  title: string;
  copy: string;
  href: string;
  image: string;
  /** Portrait crop shown below `md` — falls back to `image` if absent. */
  mobileImage?: string;
}

export const splitBanners: SplitBanner[] = [
  {
    id: "qned-miniled",
    title: "Picture that adjusts to the scene",
    copy: "MiniLED backlight and AI upscaling hold detail from the darkest shadow to the brightest highlight.",
    href: "/p/lg-qned65-miniled-43-4k-smart-tv-2026",
    image: "/images/products/TV/banner.jpg",
    mobileImage: "/images/products/TV/banner-mobile.jpg",
  },
  {
    id: "ai-dd-laundry",
    title: "Laundry, on autopilot",
    copy: "AI Direct Drive senses the load and protects every fabric, wash after wash.",
    href: "/p/lg-11kg-ai-dd-front-load-washing-machine",
    image: "/images/products/Appliances/banner.jpg",
    mobileImage: "/images/products/Appliances/banner-mobile.jpg",
  },
];

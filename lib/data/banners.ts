import type { Banner } from "./types";

/** Source files carry spaces in their names, so the paths are encoded here. */
export const heroBanners: Banner[] = [
  {
    id: "oled-cricket",
    headline: "Every match, front row",
    copy: "LG OLED evo lights each pixel on its own, so the pitch keeps its colour and the crowd keeps its detail.",
    cta: { label: "Shop LG TVs", href: "/c/tv-audio-video/tvs" },
    image: "/images/hero/1.png",
    mobileImage: "/images/hero/1%20mobile.png",
  },
  {
    id: "dualcool",
    headline: "Cool that holds steady",
    copy: "LG DUAL Inverter reaches temperature in half the time and stays there — quietly, and on less power.",
    cta: { label: "Shop air conditioners", href: "/c/air-solutions/air-conditioners" },
    image: "/images/hero/2.png",
    mobileImage: "/images/hero/2%20mobile.png",
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

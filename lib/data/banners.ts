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
}

export const splitBanners: SplitBanner[] = [
  {
    id: "oled-evo",
    title: "Picture beyond pixels",
    copy: "Every pixel lights itself, so black is genuinely black.",
    href: "/p/lg-oled-evo-c4-65-4k-smart-tv",
    image: "/images/products/TV/banner.jpg",
  },
  {
    id: "thinq",
    title: "Your home, in sync",
    copy: "One AI hub for the wash, the cooling and the cold chain.",
    href: "/p/lg-ai-appliance-hub-thinq-on",
    image: "/images/products/Appliances/banner.jpg",
  },
];

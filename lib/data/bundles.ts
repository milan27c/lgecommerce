export interface BundleOffer {
  id: string;
  name: string;
  image: string;
  price: number;
  /** Sum of the two products' own prices — never stored as a discount. */
  originalPrice: number;
}

/**
 * Bundle photography lives at `public/images/bundle/` — only three shots on
 * disk, each pairing the QNED65 with one sound system, so bundle offers are
 * scoped to that one PDP for now rather than modelled as a generic system.
 */
export const tvBundleSlug = "lg-qned65-miniled-43-4k-smart-tv-2026";

export const tvBundleOffers: BundleOffer[] = [
  {
    id: "qned65-ok75-karaoke",
    name: 'LG 108 cm (43") QNED AI QNED65 MiniLED 4K Smart TV 2026 & LG OK75 1000W RMS Karaoke System with DJ Wheel, DJ Pad',
    image: "/images/bundle/Bundle%201.png",
    price: 297000,
    originalPrice: 338000,
  },
  {
    id: "qned65-xboom-go-pk7",
    name: 'LG 108 cm (43") QNED AI QNED65 MiniLED 4K Smart TV 2026 & LG XBOOM Go PK7 Portable Speaker',
    image: "/images/bundle/Bundle%202.png",
    price: 192500,
    originalPrice: 213900,
  },
  {
    id: "qned65-xboom-entertainment",
    name: 'LG 108 cm (43") QNED AI QNED65 MiniLED 4K Smart TV 2026 & LG XBOOM Entertainment System with Karaoke & DJ Effects',
    image: "/images/bundle/Bundle%203.png",
    price: 329000,
    originalPrice: 378000,
  },
];

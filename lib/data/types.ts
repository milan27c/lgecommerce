export interface CategoryItem {
  name: string;
  slug: string;
}

export interface CategoryGroup {
  name: string;
  slug: string;
  items: CategoryItem[];
}

export interface CategoryPromo {
  title: string;
  copy: string;
  href: string;
  image: string;
}

export interface Category {
  slug: string;
  name: string;
  groups: CategoryGroup[];
  image: string;
  promo?: CategoryPromo;
  /** Editorial destination rather than a shoppable listing. */
  editorial?: boolean;
}

export type ProductBadge = "Best" | "New" | "Sale" | "Energy A+++";

export interface ProductSpec {
  label: string;
  value: string;
}

export interface Product {
  slug: string;
  name: string;
  category: string;
  subcategory: string;
  price: number;
  /** Discount % is derived from this, never stored. */
  originalPrice?: number;
  rating?: number;
  reviewCount?: number;
  badge?: ProductBadge;
  image: string;
  gallery?: string[];
  specs: ProductSpec[];
  inStock: boolean;
  isNew?: boolean;
  isFeatured?: boolean;
  rank?: number;
  /** Slightly reduces the image tile's inset for this product's card only. */
  imageInset?: "roomy";
}

export interface Banner {
  id: string;
  headline: string;
  cta: { label: string; href: string };
  image: string;
  mobileImage?: string;
  /** Text/button treatment for the artwork behind it. Defaults to "dark". */
  tone?: "light" | "dark";
  /** Multiplier on the legibility scrim's opacity, 0-1. Defaults to 1. */
  scrimOpacity?: number;
  /** Drops the headline/CTA text (and its scrim) on desktop, keeping them on mobile. */
  hideTextOnDesktop?: boolean;
}

export interface Deal {
  productSlug: string;
  endsAt: string;
  stockLeft?: number;
}

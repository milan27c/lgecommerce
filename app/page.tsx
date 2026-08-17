import { CategoryGrid } from "@/components/home/CategoryGrid";
import { DealCountdown } from "@/components/home/DealCountdown";
import { EnergySavings } from "@/components/home/EnergySavings";
import { FeaturedProducts } from "@/components/home/FeaturedProducts";
import { HeroCarousel } from "@/components/home/HeroCarousel";
import { NewArrivals } from "@/components/home/NewArrivals";
import { Reviews } from "@/components/home/Reviews";
import { SplitBanners } from "@/components/home/SplitBanners";

/** Section order is fixed by SITE-PLAN.md §2. */
export default function HomePage() {
  return (
    <>
      <HeroCarousel />
      <CategoryGrid />
      <DealCountdown />
      <FeaturedProducts />
      <EnergySavings />
      <NewArrivals />
      <SplitBanners />
      <Reviews />
    </>
  );
}

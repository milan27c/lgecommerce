import { SplitBannerCard } from "@/components/home/SplitBannerCard";
import { splitBanners } from "@/lib/data/banners";

export function SplitBanners() {
  return (
    <section aria-labelledby="split-banners-heading" className="section-y">
      <h2 id="split-banners-heading" className="sr-only">
        Featured LG technologies
      </h2>
      <ul className="grid list-none gap-0 lg:grid-cols-2">
        {splitBanners.map((banner, index) => (
          <SplitBannerCard key={banner.id} banner={banner} index={index} />
        ))}
      </ul>
    </section>
  );
}

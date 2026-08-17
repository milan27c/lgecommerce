import { SplitBannerCard } from "@/components/home/SplitBannerCard";
import { Container } from "@/components/ui/Container";
import { splitBanners } from "@/lib/data/banners";

export function SplitBanners() {
  return (
    <section aria-labelledby="split-banners-heading" className="section-y">
      <h2 id="split-banners-heading" className="sr-only">
        Featured LG technologies
      </h2>
      <Container>
        <ul className="grid list-none gap-4 lg:grid-cols-2 lg:gap-5">
          {splitBanners.map((banner, index) => (
            <SplitBannerCard key={banner.id} banner={banner} index={index} />
          ))}
        </ul>
      </Container>
    </section>
  );
}

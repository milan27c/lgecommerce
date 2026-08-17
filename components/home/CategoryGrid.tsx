import Image from "next/image";
import Link from "next/link";
import { Container } from "@/components/ui/Container";
import { Reveal } from "@/components/ui/Reveal";
import { Section } from "@/components/ui/Section";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { categoryTiles } from "@/lib/data/categories";

export function CategoryGrid() {
  return (
    <Section labelledBy="category-grid-heading">
      <Container>
        <SectionHeading
          id="category-grid-heading"
          title="Shop by category"
          titleClassName="text-section sm:text-section-lg"
          link={{ label: "All categories", href: "/c/tv-audio-video" }}
        />
      </Container>

      <ul className="no-scrollbar rail-bleed-right flex list-none snap-x snap-mandatory gap-3 overflow-x-auto scroll-smooth pb-1 lg:gap-4">
        {categoryTiles.map((tile, index) => (
          <Reveal key={tile.slug} as="li" index={index} className="category-card shrink-0 snap-start">
            <Link
              href={tile.href}
              className="group block focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent-500 focus-visible:ring-offset-2"
            >
              <span className="relative block aspect-tall w-full overflow-hidden rounded-control bg-neutral-100">
                <Image
                  src={tile.image}
                  alt=""
                  fill
                  sizes="(min-width: 1024px) 230px, (min-width: 640px) 34vw, 62vw"
                  className="object-cover transition-transform dur-slow ease-out group-hover:scale-104"
                />
              </span>
              <span className="mt-4 block text-body-lg font-semibold text-ink-900">{tile.name}</span>
              <span className="mt-1 block truncate text-sm text-neutral-500">{tile.subheading}</span>
            </Link>
          </Reveal>
        ))}
      </ul>
    </Section>
  );
}

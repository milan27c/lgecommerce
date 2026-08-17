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
          link={{ label: "All categories", href: "/c/tv-audio-video" }}
        />

        <ul className="no-scrollbar -mx-4 flex list-none snap-x snap-mandatory gap-4 overflow-x-auto px-4 sm:mx-0 sm:px-0 lg:grid lg:grid-cols-8 lg:gap-5 lg:overflow-visible">
          {categoryTiles.map((tile, index) => (
            <Reveal
              key={tile.slug}
              as="li"
              index={index}
              className="w-24 shrink-0 snap-start sm:w-28 lg:w-auto"
            >
              <Link
                href={tile.href}
                className="group flex flex-col items-center gap-3 rounded-lg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent-500 focus-visible:ring-offset-2"
              >
                <span className="relative aspect-square w-full overflow-hidden rounded-full bg-neutral-100">
                  <Image
                    src={tile.image}
                    alt=""
                    fill
                    sizes="(min-width: 1024px) 140px, 112px"
                    className="object-cover transition-transform dur-base ease-out group-hover:scale-105"
                  />
                </span>
                <span className="text-center text-sm font-medium text-ink-900 transition-colors dur-base ease-out group-hover:text-accent-500">
                  {tile.name}
                </span>
              </Link>
            </Reveal>
          ))}
        </ul>
      </Container>
    </Section>
  );
}

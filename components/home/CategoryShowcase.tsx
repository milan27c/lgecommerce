import Image from "next/image";
import Link from "next/link";
import { Container } from "@/components/ui/Container";
import { Reveal } from "@/components/ui/Reveal";
import { Section } from "@/components/ui/Section";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { showcaseCards } from "@/lib/data/content";
import { cn } from "@/lib/utils/cn";

const [tall, ...stacked] = showcaseCards;

const cardClass =
  "group relative block overflow-hidden rounded-none bg-neutral-100 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent-500 focus-visible:ring-offset-2";

export function CategoryShowcase() {
  return (
    <Section labelledBy="category-showcase-heading">
      <Container>
        <SectionHeading
          id="category-showcase-heading"
          eyebrow="Room by room"
          title="Made for every room in your home"
          titleClassName="text-section sm:text-section-lg"
          align="center"
        />

        <div className="grid gap-4 lg:grid-cols-2 lg:gap-5">
          <Reveal className="h-full">
            <Link href={tall.href} className={cn(cardClass, "aspect-square lg:aspect-auto lg:h-full")}>
              <Image
                src={tall.image}
                alt=""
                fill
                sizes="(min-width: 1024px) 620px, 100vw"
                className="object-cover transition-transform dur-slow ease-out group-hover:scale-104"
              />
              <span
                aria-hidden
                className="absolute inset-0 bg-gradient-to-t from-ink-950/80 via-ink-950/20 to-transparent"
              />
              <span className="absolute inset-x-0 bottom-0 p-5 sm:p-7">
                <span className="block text-h3 text-white">{tall.title}</span>
                <span className="mt-1 block text-sm text-ink-200">{tall.itemCount} products</span>
              </span>
            </Link>
          </Reveal>

          <ul className="grid list-none gap-4 lg:gap-5">
            {stacked.map((card, index) => (
              <Reveal key={card.id} as="li" index={index + 1}>
                <Link href={card.href} className={cn(cardClass, "aspect-video")}>
                  <Image
                    src={card.image}
                    alt=""
                    fill
                    sizes="(min-width: 1024px) 620px, 100vw"
                    className="object-cover transition-transform dur-slow ease-out group-hover:scale-104"
                  />
                  <span
                    aria-hidden
                    className="absolute inset-0 bg-gradient-to-t from-ink-950/80 via-ink-950/20 to-transparent"
                  />
                  <span className="absolute inset-x-0 bottom-0 p-5 sm:p-7">
                    <span className="block text-h3 text-white">{card.title}</span>
                    <span className="mt-1 block text-sm text-ink-200">
                      {card.itemCount} products
                    </span>
                  </span>
                </Link>
              </Reveal>
            ))}
          </ul>
        </div>
      </Container>
    </Section>
  );
}

import Image from "next/image";
import { BundleCard } from "@/components/product/BundleCard";
import { Container } from "@/components/ui/Container";
import { Reveal } from "@/components/ui/Reveal";
import { tvBundleOffers, tvBundleSlug } from "@/lib/data/bundles";
import type { Product } from "@/lib/data/types";

export interface BundleOffersProps {
  product: Product;
}

/**
 * Cross-sell band pairing this TV with an LG sound system at a bundle price.
 * Reuses the deal band's ambient dark ground (globals.css) rather than
 * inventing a second dark-band treatment for one more section.
 */
export function BundleOffers({ product }: BundleOffersProps) {
  return (
    <section
      id="bundle-offer"
      aria-labelledby="bundle-heading"
      className="section-y relative mt-10 scroll-mt-40 overflow-hidden bg-deal-night lg:mt-16"
    >
      <div aria-hidden className="pointer-events-none absolute inset-0 overflow-hidden">
        <span className="deal-orb animate-deal-drift-a absolute -left-32 -top-40 size-120 bg-white/10 mix-blend-screen" />
        <span className="deal-orb animate-deal-drift-b absolute -right-36 top-0 size-104 bg-accent-400 mix-blend-screen" />
        <span className="deal-orb-sm animate-deal-drift-c absolute -bottom-24 left-1/3 size-80 bg-ink-400 mix-blend-screen" />
      </div>
      <div aria-hidden className="pointer-events-none absolute inset-0 bg-deal-vignette" />

      <Container className="relative">
        <div className="grid gap-10 lg:grid-cols-3 lg:items-center lg:gap-12">
          <Reveal className="text-center lg:col-span-1 lg:text-left">
            <p className="mb-2 text-xs uppercase text-accent-300">Bundle &amp; save</p>
            <h2 id="bundle-heading" className="text-h3 text-white sm:text-h2">
              Better with sound
            </h2>
            <p className="mt-3 text-body text-ink-200">
              Pair this TV with an LG sound system and save instantly. The discount is
              already priced into the bundle below.
            </p>

            <div className="relative mx-auto mt-6 aspect-square w-full max-w-[220px] overflow-hidden rounded-card bg-white shadow-lg lg:mx-0">
              <Image
                src={product.image}
                alt={product.name}
                fill
                sizes="(min-width: 1024px) 20vw, 60vw"
                className="p-tile object-contain"
              />
            </div>
          </Reveal>

          <ul className="grid grid-cols-1 gap-5 sm:grid-cols-3 lg:col-span-2">
            {tvBundleOffers.map((bundle, index) => (
              <Reveal key={bundle.id} as="li" index={index} className="h-full">
                <BundleCard bundle={bundle} href={`/p/${tvBundleSlug}`} />
              </Reveal>
            ))}
          </ul>
        </div>
      </Container>
    </section>
  );
}

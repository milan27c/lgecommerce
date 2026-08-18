import { PlusIcon } from "@/components/icons";
import { DealCard } from "@/components/home/DealCard";
import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { Reveal } from "@/components/ui/Reveal";
import { getProduct } from "@/lib/data/products";
import { tvSpeakerBundle } from "@/lib/data/bundles";
import { formatPrice } from "@/lib/utils/formatPrice";
import type { Product } from "@/lib/data/types";

export interface BundleOffersProps {
  product: Product;
}

/**
 * Cross-sell band pairing this TV with an LG sound system at a bundle price.
 * Reuses the deal band's ambient dark ground (globals.css) and DealCard so
 * the two product tiles read exactly like the rest of the site's cards.
 */
export function BundleOffers({ product }: BundleOffersProps) {
  const speaker = getProduct(tvSpeakerBundle.speakerSlug);
  if (!speaker) return null;

  const savings = tvSpeakerBundle.originalPrice - tvSpeakerBundle.price;

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
            <h2 id="bundle-heading" className="text-h3 text-white sm:text-h2">
              Complete your setup with a bundle offer
            </h2>
            <p className="mt-3 text-body text-ink-200">
              Pair this TV with the LG XBOOM Go PK7 and save instantly — the discount
              is already priced into the bundle below.
            </p>
          </Reveal>

          <Reveal index={1} className="lg:col-span-2">
            <div className="grid grid-cols-[1fr_auto_1fr] items-center gap-3 sm:gap-6">
              <DealCard product={product} />
              <span
                aria-hidden
                className="grid size-9 shrink-0 place-items-center rounded-full bg-white/10 text-white sm:size-11"
              >
                <PlusIcon className="size-4 sm:size-5" />
              </span>
              <DealCard product={speaker} />
            </div>

            <div className="mt-6 flex flex-col gap-4 rounded-deal bg-white p-5 shadow-md sm:flex-row sm:items-center sm:justify-between sm:p-6">
              <div>
                <span className="inline-flex rounded-control bg-accent-500 px-2.5 py-1 text-xs font-semibold uppercase tracking-wide text-white">
                  Bundle offer
                </span>
                <div className="mt-2 flex flex-wrap items-baseline gap-x-3 gap-y-1">
                  <p className="text-h3 text-ink-900">{formatPrice(tvSpeakerBundle.price)}</p>
                  <p className="text-body text-neutral-400 line-through">
                    {formatPrice(tvSpeakerBundle.originalPrice)}
                  </p>
                  <p className="text-sm font-semibold text-accent-600">
                    Save {formatPrice(savings)}
                  </p>
                </div>
              </div>

              <Button size="lg" className="w-full sm:w-auto">
                Buy Now
              </Button>
            </div>
          </Reveal>
        </div>
      </Container>
    </section>
  );
}

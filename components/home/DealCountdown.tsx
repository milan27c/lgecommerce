import Link from "next/link";
import { CountdownTimer } from "@/components/home/CountdownTimer";
import { DealCard } from "@/components/home/DealCard";
import { Container } from "@/components/ui/Container";
import { Reveal } from "@/components/ui/Reveal";
import { ArrowRightIcon } from "@/components/icons";
import { dealEndsAt, deals } from "@/lib/data/deals";
import { getProduct } from "@/lib/data/products";

/**
 * Static layered gradients (`bg-deal-aurora`) plus two blurred orbs. The
 * only animated gradient on Home is the promo stripe.
 */
export function DealCountdown() {
  const dealProducts = deals
    .slice(0, 4)
    .map((deal) => getProduct(deal.productSlug))
    .filter((product) => product !== undefined);

  return (
    <section
      aria-labelledby="deal-countdown-heading"
      className="section-y relative overflow-hidden bg-deal-aurora"
    >
      <div aria-hidden className="pointer-events-none absolute inset-0 bg-dot-grid" />
      <div
        aria-hidden
        className="pointer-events-none absolute -left-24 top-16 size-80 rounded-full bg-accent-500/25 blur-3xl"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute -right-20 -bottom-16 size-72 rounded-full bg-accent-400/20 blur-3xl"
      />

      <Container className="relative">
        <div className="grid gap-8 lg:grid-cols-3 lg:items-center lg:gap-10">
          <Reveal className="lg:col-span-1">
            <p className="mb-2 text-xs uppercase text-accent-300">Limited time offer</p>
            <h2 id="deal-countdown-heading" className="text-h3 text-white sm:text-h2">
              The clock is running on these prices
            </h2>
            <p className="mt-3 text-body text-ink-200">
              Season-low pricing on eight lines, held only until the timer hits zero. Stock
              is allocated per store — once a store sells out, it stays out.
            </p>

            <CountdownTimer endsAt={dealEndsAt} className="mt-6" />

            <Link
              href="/deals"
              className="mt-6 inline-flex items-center gap-1.5 rounded-sm text-body font-medium text-white transition-colors dur-base ease-out hover:text-accent-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent-500 focus-visible:ring-offset-2"
            >
              Shop all deals
              <ArrowRightIcon className="size-4" />
            </Link>
          </Reveal>

          <ul className="no-scrollbar -mx-4 flex list-none snap-x snap-mandatory gap-3 overflow-x-auto px-4 sm:mx-0 sm:px-0 lg:col-span-2 lg:grid lg:grid-cols-4 lg:gap-5 lg:overflow-visible">
            {dealProducts.map((product, index) => (
              <Reveal
                key={product.slug}
                as="li"
                index={index}
                className="w-2/5 shrink-0 snap-start sm:w-1/3 lg:w-auto"
              >
                <DealCard
                  product={product}
                  sizes="(min-width: 1024px) 22vw, (min-width: 640px) 33vw, 45vw"
                />
              </Reveal>
            ))}
          </ul>
        </div>
      </Container>
    </section>
  );
}

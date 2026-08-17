import Link from "next/link";
import { CountdownTimer } from "@/components/home/CountdownTimer";
import { DealCard } from "@/components/home/DealCard";
import { Container } from "@/components/ui/Container";
import { Reveal } from "@/components/ui/Reveal";
import { ArrowRightIcon } from "@/components/icons";
import { dealEndsAt, deals } from "@/lib/data/deals";
import { getProduct } from "@/lib/data/products";

/**
 * Ambient dark band with a soft, Apple-style blurred glow behind the copy —
 * primary, secondary and white orbs drifting via transform + opacity only,
 * plus the countdown ticking. See globals.css for the deal-band utilities.
 */
export function DealCountdown() {
  const dealProducts = deals
    .slice(0, 3)
    .map((deal) => getProduct(deal.productSlug))
    .filter((product) => product !== undefined);

  return (
    <section
      aria-labelledby="deal-countdown-heading"
      className="section-y relative overflow-hidden bg-deal-night"
    >
      <div aria-hidden className="pointer-events-none absolute inset-0 overflow-hidden">
        <span className="deal-orb animate-deal-drift-a absolute -left-32 -top-40 size-120 bg-white/10 mix-blend-screen" />
        <span className="deal-orb animate-deal-drift-b absolute -right-36 top-0 size-104 bg-accent-400 mix-blend-screen" />
        <span className="deal-orb-sm animate-deal-drift-c absolute -bottom-24 left-1/3 size-80 bg-ink-400 mix-blend-screen" />
      </div>
      <div aria-hidden className="pointer-events-none absolute inset-0 bg-deal-vignette" />

      <Container className="relative">
        <div className="grid gap-8 lg:grid-cols-3 lg:items-center lg:gap-10">
          <Reveal className="text-center lg:col-span-1 lg:text-left">
            <h2 id="deal-countdown-heading" className="text-section text-white sm:text-section-lg">
              Don&rsquo;t Miss These Limited Time Deals
            </h2>
            <p className="mt-3 text-body text-ink-200">
              Season-low pricing on our best sellers, held only until the timer hits zero.
              Stock is allocated per store, and once a store sells out, it stays out for good.
            </p>

            <CountdownTimer endsAt={dealEndsAt} className="mt-6 justify-center lg:justify-start" />

            <Link
              href="/deals"
              className="mt-6 inline-flex items-center gap-1.5 rounded-none text-body font-medium text-white transition-colors dur-base ease-out hover:text-accent-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent-500 focus-visible:ring-offset-2"
            >
              Shop all deals
              <ArrowRightIcon className="size-4" />
            </Link>
          </Reveal>

          <ul className="no-scrollbar -mx-2.5 flex list-none snap-x snap-mandatory gap-3 overflow-x-auto px-2.5 sm:mx-0 sm:px-0 lg:col-span-2 lg:grid lg:grid-cols-3 lg:gap-5 lg:overflow-visible">
            {dealProducts.map((product, index) => (
              <Reveal
                key={product.slug}
                as="li"
                index={index}
                className="w-3/5 shrink-0 snap-start sm:w-1/3 lg:w-auto"
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

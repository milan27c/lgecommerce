import Link from "next/link";
import { CountdownTimer } from "@/components/home/CountdownTimer";
import { DealCard } from "@/components/home/DealCard";
import { Container } from "@/components/ui/Container";
import { Reveal } from "@/components/ui/Reveal";
import { ArrowRightIcon } from "@/components/icons";
import { dealEndsAt, deals } from "@/lib/data/deals";
import { getProduct } from "@/lib/data/products";

/** Flat dark band — no glow, no motion beyond the countdown ticking. */
export function DealCountdown() {
  const dealProducts = deals
    .slice(0, 4)
    .map((deal) => getProduct(deal.productSlug))
    .filter((product) => product !== undefined);

  return (
    <section aria-labelledby="deal-countdown-heading" className="section-y bg-ink-900">
      <Container>
        <div className="grid gap-8 lg:grid-cols-3 lg:items-center lg:gap-10">
          <Reveal className="text-center lg:col-span-1 lg:text-left">
            <p className="mb-2 text-xs uppercase text-accent-300">Limited time offer</p>
            <h2 id="deal-countdown-heading" className="text-section text-white sm:text-section-lg">
              The clock is running on these prices
            </h2>
            <p className="mt-3 text-body text-ink-200">
              Season-low pricing on eight lines, held only until the timer hits zero. Stock
              is allocated per store — once a store sells out, it stays out.
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

          <ul className="no-scrollbar -mx-2.5 flex list-none snap-x snap-mandatory gap-3 overflow-x-auto px-2.5 sm:mx-0 sm:px-0 lg:col-span-2 lg:grid lg:grid-cols-4 lg:gap-5 lg:overflow-visible">
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

import { Container } from "@/components/ui/Container";
import { Reveal } from "@/components/ui/Reveal";
import { BadgeCheckIcon, ReturnIcon, ShieldIcon, TruckIcon, type IconProps } from "@/components/icons";
import { trustItems } from "@/lib/data/content";

const icons: Record<string, (props: IconProps) => React.JSX.Element> = {
  delivery: TruckIcon,
  warranty: ShieldIcon,
  stockist: BadgeCheckIcon,
  returns: ReturnIcon,
};

/** White strip that overlaps the hero's bottom edge by 24px on desktop. */
export function TrustBar() {
  return (
    <section aria-labelledby="trust-bar-heading" className="relative z-10 mt-6 lg:-mt-6">
      <h2 id="trust-bar-heading" className="sr-only">
        Why shop with Living Just Right
      </h2>
      <Container>
        <ul className="grid list-none grid-cols-2 gap-px overflow-hidden rounded-none border border-neutral-200 bg-neutral-200 shadow-sm lg:grid-cols-4">
          {trustItems.map((item, index) => {
            const Icon = icons[item.id] ?? TruckIcon;
            return (
              <Reveal key={item.id} as="li" index={index} className="bg-white">
                <div className="flex items-center gap-3 p-4 lg:p-5">
                  <span className="grid size-10 shrink-0 place-items-center rounded-none bg-accent-50 text-accent-600">
                    <Icon className="size-5" />
                  </span>
                  <span className="min-w-0">
                    <span className="block truncate text-body font-medium text-ink-900">
                      {item.label}
                    </span>
                    <span className="block truncate text-sm text-neutral-500">{item.copy}</span>
                  </span>
                </div>
              </Reveal>
            );
          })}
        </ul>
      </Container>
    </section>
  );
}

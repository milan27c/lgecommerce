import { PlusIcon } from "@/components/icons";
import type { FaqItem } from "@/lib/data/productDetail";
import { cn } from "@/lib/utils/cn";

export interface FaqAccordionProps {
  items: FaqItem[];
  className?: string;
}

/** Native `details` so it works without JavaScript. Only the icon animates. */
export function FaqAccordion({ items, className }: FaqAccordionProps) {
  return (
    <div
      className={cn(
        "divide-y divide-neutral-200 overflow-hidden rounded-none border border-neutral-200 bg-white",
        className,
      )}
    >
      {items.map((item) => (
        <details key={item.question} className="group px-4 py-4 sm:px-5">
          <summary
            className={cn(
              "flex cursor-pointer list-none items-center justify-between gap-4 rounded-none text-body font-medium text-ink-900",
              "marker:content-none focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent-500 focus-visible:ring-offset-2",
            )}
          >
            {item.question}
            <PlusIcon className="size-4 shrink-0 text-neutral-400 transition-transform dur-base ease-out group-open:rotate-45" />
          </summary>
          <p className="mt-3 max-w-3xl text-body text-neutral-600">{item.answer}</p>
        </details>
      ))}
    </div>
  );
}

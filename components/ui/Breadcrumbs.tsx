import Link from "next/link";
import { Fragment } from "react";
import { ChevronRightIcon } from "@/components/icons";
import { Container } from "@/components/ui/Container";
import { cn } from "@/lib/utils/cn";

export interface Crumb {
  label: string;
  /** Omitted on the current page. */
  href?: string;
}

export interface BreadcrumbsProps {
  items: Crumb[];
  className?: string;
}

/** Full-bleed strip above the page body. The last crumb is the current page. */
export function Breadcrumbs({ items, className }: BreadcrumbsProps) {
  return (
    <div className={cn("border-b border-neutral-200 bg-white", className)}>
      <Container>
        <nav aria-label="Breadcrumb" className="py-3.5">
          <ol className="flex flex-wrap items-center gap-1.5">
            {items.map((item, index) => (
              <Fragment key={item.label}>
                <li className="min-w-0">
                  {item.href ? (
                    <Link
                      href={item.href}
                      className="rounded-sm text-sm text-neutral-500 transition-colors dur-fast ease-out hover:text-ink-900 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent-500 focus-visible:ring-offset-2"
                    >
                      {item.label}
                    </Link>
                  ) : (
                    <span aria-current="page" className="block truncate text-sm text-ink-900">
                      {item.label}
                    </span>
                  )}
                </li>
                {index < items.length - 1 ? (
                  <li aria-hidden className="flex items-center">
                    <ChevronRightIcon className="size-3.5 text-neutral-300" />
                  </li>
                ) : null}
              </Fragment>
            ))}
          </ol>
        </nav>
      </Container>
    </div>
  );
}

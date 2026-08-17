"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { Logo } from "@/components/brand/Logo";
import { ChevronDownIcon, CloseIcon } from "@/components/icons";
import { categories } from "@/lib/data/categories";
import { primaryNav } from "@/lib/data/content";
import { cn } from "@/lib/utils/cn";
import { isNavActive } from "@/lib/utils/isNavActive";

/** Header hides these below sm, so the drawer carries them. */
const accountNav = [
  { label: "Account", href: "/account" },
  { label: "Wishlist", href: "/wishlist" },
];

export interface MobileNavProps {
  open: boolean;
  onClose: () => void;
}

/** Slide-in drawer carrying the same tree as the mega menu, as an accordion. */
export function MobileNav({ open, onClose }: MobileNavProps) {
  const pathname = usePathname();
  const [openCategory, setOpenCategory] = useState<string | null>(null);
  const [openGroup, setOpenGroup] = useState<string | null>(null);

  useEffect(() => {
    if (!open) return;
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") onClose();
    };
    document.addEventListener("keydown", onKeyDown);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKeyDown);
      document.body.style.overflow = "";
    };
  }, [open, onClose]);

  return (
    <div className={cn("lg:hidden", !open && "pointer-events-none")} aria-hidden={!open}>
      <div
        onClick={onClose}
        className={cn(
          "fixed inset-0 z-50 bg-ink-950/40 transition-opacity dur-base ease-out",
          open ? "opacity-100" : "opacity-0",
        )}
      />

      <nav
        aria-label="Main"
        className={cn(
          "fixed inset-y-0 left-0 z-50 flex w-5/6 max-w-sm flex-col bg-white shadow-lg",
          "transition-transform dur-base ease-out",
          open ? "translate-x-0" : "-translate-x-full",
        )}
      >
        <div className="flex h-14 shrink-0 items-center justify-between border-b border-neutral-200 px-4">
          <Logo size="sm" />
          <button
            type="button"
            onClick={onClose}
            aria-label="Close menu"
            className="grid size-9 place-items-center rounded-full text-neutral-500 transition-colors dur-fast ease-out hover:text-accent-600 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent-500"
          >
            <CloseIcon className="size-5" />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto overscroll-contain px-4 py-4">
          <ul className="flex flex-col">
            {categories.map((category) => {
              const expanded = openCategory === category.slug;
              return (
                <li key={category.slug} className="border-b border-neutral-200">
                  <button
                    type="button"
                    aria-expanded={expanded}
                    onClick={() => setOpenCategory(expanded ? null : category.slug)}
                    className="flex w-full items-center justify-between py-3.5 text-left text-body font-medium text-ink-900 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent-500"
                  >
                    {category.name}
                    <ChevronDownIcon
                      className={cn(
                        "size-4 text-neutral-400 transition-transform dur-base ease-out",
                        expanded && "rotate-180",
                      )}
                    />
                  </button>

                  {expanded ? (
                    <ul className="pb-3 pl-2">
                      {category.groups.map((group) => {
                        const groupKey = `${category.slug}/${group.slug}`;
                        const groupExpanded = openGroup === groupKey;
                        return (
                          <li key={group.slug}>
                            {group.items.length > 0 ? (
                              <>
                                <button
                                  type="button"
                                  aria-expanded={groupExpanded}
                                  onClick={() => setOpenGroup(groupExpanded ? null : groupKey)}
                                  className="flex w-full items-center justify-between py-2.5 text-left text-sm font-medium text-neutral-700 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent-500"
                                >
                                  {group.name}
                                  <ChevronDownIcon
                                    className={cn(
                                      "size-4 text-neutral-400 transition-transform dur-base ease-out",
                                      groupExpanded && "rotate-180",
                                    )}
                                  />
                                </button>
                                {groupExpanded ? (
                                  <ul className="flex flex-col gap-2 pb-3 pl-3">
                                    {group.items.map((item) => (
                                      <li key={item.slug}>
                                        <Link
                                          href={`/c/${category.slug}/${item.slug}`}
                                          onClick={onClose}
                                          className="block text-sm text-neutral-500 transition-colors dur-fast ease-out hover:text-accent-500 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent-500"
                                        >
                                          {item.name}
                                        </Link>
                                      </li>
                                    ))}
                                  </ul>
                                ) : null}
                              </>
                            ) : (
                              <Link
                                href={`/c/${category.slug}/${group.slug}`}
                                onClick={onClose}
                                className="block py-2.5 text-sm font-medium text-neutral-700 transition-colors dur-fast ease-out hover:text-accent-500 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent-500"
                              >
                                {group.name}
                              </Link>
                            )}
                          </li>
                        );
                      })}
                    </ul>
                  ) : null}
                </li>
              );
            })}
          </ul>

          <ul className="mt-5 flex flex-col gap-1">
            {[...primaryNav, ...accountNav].map((item) => {
              const active = isNavActive(pathname, item.href);
              return (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    onClick={onClose}
                    aria-current={active ? "page" : undefined}
                    className={cn(
                      "block py-2.5 text-body font-medium dur-fast ease-out focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent-500",
                      active && "bg-neutral-100",
                      active
                        ? "font-semibold text-accent-600"
                        : "text-ink-900 transition-colors hover:text-accent-600",
                    )}
                  >
                    {item.label}
                  </Link>
                </li>
              );
            })}
          </ul>
        </div>
      </nav>
    </div>
  );
}

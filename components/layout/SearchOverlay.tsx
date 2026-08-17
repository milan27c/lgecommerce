"use client";

import Link from "next/link";
import { useEffect, useRef } from "react";
import { ArrowRightIcon, SearchIcon } from "@/components/icons";
import { Container } from "@/components/ui/Container";
import { cn } from "@/lib/utils/cn";

const quickLinks = [
  { label: "New Arrivals", href: "/shop?offer=new" },
  { label: "Best Sellers", href: "/shop?offer=best" },
  { label: "Deals", href: "/deals" },
  { label: "Support", href: "/support" },
  { label: "Wishlist", href: "/wishlist" },
];

export interface SearchOverlayProps {
  open: boolean;
  onClose: () => void;
}

/**
 * Dropdown panel under the sticky header — same footprint and mechanics as
 * the Shop mega menu (absolute against the header, sized to its content,
 * not the full page), holding a large search field and a quick-links list.
 */
export function SearchOverlay({ open, onClose }: SearchOverlayProps) {
  const inputRef = useRef<HTMLInputElement>(null);
  const panelRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!open) return;
    inputRef.current?.focus();

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") onClose();
    };
    const onPointerDown = (event: MouseEvent) => {
      const target = event.target as Node;
      if (panelRef.current?.contains(target)) return;
      if ((target as HTMLElement).closest?.("[data-search-trigger]")) return;
      onClose();
    };

    document.addEventListener("keydown", onKeyDown);
    document.addEventListener("mousedown", onPointerDown);
    return () => {
      document.removeEventListener("keydown", onKeyDown);
      document.removeEventListener("mousedown", onPointerDown);
    };
  }, [open, onClose]);

  return (
    <div
      ref={panelRef}
      hidden={!open}
      aria-hidden={!open}
      className={cn(
        "absolute inset-x-0 top-full z-50 border-t border-b border-neutral-200 bg-white/97 backdrop-blur-md shadow-lg",
        "transition-[opacity,transform] dur-base ease-out",
        open ? "translate-y-0 opacity-100" : "-translate-y-2 opacity-0",
      )}
    >
      <Container className="py-8 sm:py-10">
        <form
          action="/search"
          role="search"
          className="flex items-center gap-3 border-b border-neutral-200 pb-4 sm:gap-4 sm:pb-5"
        >
          <SearchIcon className="size-6 shrink-0 text-neutral-400 sm:size-7" />
          <label htmlFor="overlay-search" className="sr-only">
            Search Living Just Right
          </label>
          <input
            ref={inputRef}
            id="overlay-search"
            name="q"
            type="search"
            placeholder="Search OLED TVs, refrigerators, inverter ACs"
            className="w-full flex-1 border-none bg-transparent text-h3 text-ink-900 placeholder:text-neutral-300 focus:outline-none sm:text-h2"
          />
          <button
            type="button"
            onClick={onClose}
            className="shrink-0 whitespace-nowrap text-body font-medium text-ink-900 transition-colors dur-fast ease-out hover:text-accent-600 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent-500 focus-visible:ring-offset-2"
          >
            Cancel
          </button>
        </form>

        <div className="mt-8 sm:mt-10">
          <p className="text-xs font-semibold uppercase tracking-wide text-neutral-400">Quick Links</p>
          <ul className="mt-4 flex flex-col">
            {quickLinks.map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  onClick={onClose}
                  className="group flex items-center gap-2.5 py-2.5 text-body-lg font-medium text-ink-900 transition-colors dur-fast ease-out hover:text-accent-600 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent-500"
                >
                  <ArrowRightIcon className="size-4 shrink-0 text-neutral-400 transition-colors dur-fast ease-out group-hover:text-accent-500" />
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </Container>
    </div>
  );
}

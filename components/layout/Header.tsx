"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { Logo } from "@/components/brand/Logo";
import { MegaMenu } from "@/components/layout/MegaMenu";
import { MobileNav } from "@/components/layout/MobileNav";
import { Container } from "@/components/ui/Container";
import { CartIcon, HeartIcon, MenuIcon, SearchIcon, UserIcon } from "@/components/icons";
import { primaryNav } from "@/lib/data/content";
import { cn } from "@/lib/utils/cn";
import { isNavActive } from "@/lib/utils/isNavActive";

const SCROLL_THRESHOLD = 80;
const CART_COUNT = 3;

const iconButton =
  "grid size-10 place-items-center rounded-md text-neutral-600 transition-colors dur-fast ease-out hover:text-accent-600 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent-500 focus-visible:ring-offset-2";

const navLink =
  "relative inline-flex items-center whitespace-nowrap rounded-sm font-medium dur-base ease-out focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent-500 focus-visible:ring-offset-2";

/** Spans the label's own width, clear of the text's descenders. */
const activeUnderline = "absolute -bottom-1.5 left-0 right-0 h-0.5 rounded-full";

/** The one nav item that gets the deal treatment. */
const DEALS_HREF = "/deals";

export function Header() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [navOpen, setNavOpen] = useState(false);

  // Same links in both rows — only ever one of the two is mounted. Deals carries
  // gradient-filled glyphs that drift; no fill, no chrome around it. Hover fades
  // rather than shifts colour, because the glyph colour is a background. Current
  // page gets an underline rather than a colour swap, since the Deals glyph
  // colour is already spoken for by the gradient.
  const navItems = primaryNav.map((item) => {
    const active = isNavActive(pathname, item.href);

    return item.href === DEALS_HREF ? (
      <Link
        key={item.href}
        href={item.href}
        aria-current={active ? "page" : undefined}
        className={cn(
          navLink,
          "text-deal animate-deal-pan transition-opacity hover:opacity-75",
          active && "font-semibold",
        )}
      >
        {item.label}
        {active ? <span aria-hidden className={cn(activeUnderline, "bg-teal-500")} /> : null}
      </Link>
    ) : (
      <Link
        key={item.href}
        href={item.href}
        aria-current={active ? "page" : undefined}
        className={cn(
          navLink,
          "transition-colors",
          active ? "font-semibold text-accent-600" : "text-ink-900 hover:text-accent-600",
        )}
      >
        {item.label}
        {active ? <span aria-hidden className={cn(activeUnderline, "bg-accent-500")} /> : null}
      </Link>
    );
  });

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > SCROLL_THRESHOLD);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={cn(
        "sticky top-0 z-40 border-b transition-colors dur-base ease-out",
        scrolled
          ? "border-transparent bg-white/85 backdrop-blur-md"
          : "border-neutral-200 bg-white",
      )}
    >
      {/* Shadow rides in on opacity so no geometry is animated. */}
      <div
        aria-hidden
        className={cn(
          "pointer-events-none absolute inset-0 shadow-lg transition-opacity dur-base ease-out",
          scrolled ? "opacity-100" : "opacity-0",
        )}
      />

      <Container className="relative">
        {/* Row 1 — logo · categories · search · actions. Once scrolled it also
            absorbs the primary nav and the search collapses to its icon, so the
            whole header is a single 56px line. */}
        <div className={cn("flex h-14 items-center gap-3", scrolled ? "sm:gap-4" : "sm:gap-5")}>
          <button
            type="button"
            onClick={() => setNavOpen(true)}
            aria-label="Open menu"
            aria-expanded={navOpen}
            className={cn(iconButton, "-ml-2 lg:hidden")}
          >
            <MenuIcon className="size-5" />
          </button>

          {/* Flexed in the collapsed row so it and the actions split the leftover
              space evenly, which puts the nav on the true centre line. */}
          <div
            className={cn(
              "flex items-center gap-3 sm:gap-5",
              scrolled ? "lg:flex-1" : null,
            )}
          >
            <Logo size="md" className="shrink-0" />

            {/* Categories lives beside the search field, not in the nav row below. */}
            <div className="hidden lg:flex">
              <MegaMenu />
            </div>
          </div>

          {scrolled ? (
            <nav
              aria-label="Primary"
              className="hidden shrink-0 items-center gap-4 text-sm lg:flex xl:gap-6"
            >
              {navItems}
            </nav>
          ) : null}

          <form
            action="/search"
            role="search"
            className={cn(
              "ml-auto hidden min-w-0 max-w-xl flex-1 md:ml-0",
              scrolled ? null : "md:block",
            )}
          >
            <label htmlFor="site-search" className="sr-only">
              Search LG products
            </label>
            <div className="relative">
              <SearchIcon className="pointer-events-none absolute left-3.5 top-1/2 size-4.5 -translate-y-1/2 text-neutral-400" />
              <input
                id="site-search"
                name="q"
                type="search"
                placeholder="Search OLED TVs, refrigerators, inverter ACs"
                className={cn(
                  "h-10 w-full rounded-md border border-neutral-200 bg-neutral-50 pl-10 pr-4 text-body text-ink-900 placeholder:text-neutral-400",
                  "transition-colors dur-base ease-out hover:border-neutral-300",
                  "focus:border-accent-300 focus:bg-white focus:outline-none focus-visible:ring-2 focus-visible:ring-accent-500",
                )}
              />
            </div>
          </form>

          <div
            className={cn(
              "ml-auto flex shrink-0 items-center gap-0.5 sm:gap-1",
              scrolled ? "lg:flex-1 lg:justify-end" : null,
            )}
          >
            <Link
              href="/search"
              aria-label="Search"
              className={cn(iconButton, scrolled ? null : "md:hidden")}
            >
              <SearchIcon className="size-5" />
            </Link>
            <Link href="/account" aria-label="Account" className={cn(iconButton, "hidden sm:grid")}>
              <UserIcon className="size-5" />
            </Link>
            <Link
              href="/wishlist"
              aria-label="Wishlist"
              className={cn(iconButton, "hidden sm:grid")}
            >
              <HeartIcon className="size-5" />
            </Link>
            <Link href="/cart" className={cn(iconButton, "relative")}>
              <CartIcon className="size-5" />
              <span className="sr-only">Cart, {CART_COUNT} items</span>
              <span
                aria-hidden
                className="absolute right-1 top-1 grid size-4.5 place-items-center rounded-full bg-accent-500 text-xs font-bold text-white"
              >
                {CART_COUNT}
              </span>
            </Link>
          </div>
        </div>

        {/* Row 2 — primary nav. Folds into row 1 once scrolled. */}
        {scrolled ? null : (
          <nav
            aria-label="Primary"
            className="relative hidden h-9 items-center gap-6 text-sm lg:flex"
          >
            {navItems}
          </nav>
        )}
      </Container>

      <MobileNav open={navOpen} onClose={() => setNavOpen(false)} />
    </header>
  );
}

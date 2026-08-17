"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { Logo } from "@/components/brand/Logo";
import { MegaMenu } from "@/components/layout/MegaMenu";
import { MobileNav } from "@/components/layout/MobileNav";
import { SearchOverlay } from "@/components/layout/SearchOverlay";
import { Container } from "@/components/ui/Container";
import { HeartIcon, MenuIcon, SearchIcon, UserIcon } from "@/components/icons";
import { primaryNav } from "@/lib/data/content";
import { cn } from "@/lib/utils/cn";
import { isNavActive } from "@/lib/utils/isNavActive";

const iconButton =
  "grid size-10 place-items-center rounded-full text-neutral-600 transition-colors dur-fast ease-out hover:text-accent-600 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent-500 focus-visible:ring-offset-2";

const navLink =
  "relative inline-flex items-center whitespace-nowrap font-medium dur-base ease-out focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent-500 focus-visible:ring-offset-2";

/** Spans the label's own width, clear of the text's descenders. */
const activeUnderline = "absolute -bottom-1.5 left-0 right-0 h-0.5";

export function Header() {
  const pathname = usePathname();
  const [navOpen, setNavOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);

  const navItems = primaryNav.map((item) => {
    const active = isNavActive(pathname, item.href);
    const linkClassName = cn(
      navLink,
      "transition-colors",
      active ? "font-semibold text-accent-600" : "text-ink-900 hover:text-accent-600",
    );

    if (item.label === "Shop") {
      return (
        <MegaMenu
          key={item.href}
          href={item.href}
          label={item.label}
          active={active}
          linkClassName={linkClassName}
        />
      );
    }

    return (
      <Link key={item.href} href={item.href} aria-current={active ? "page" : undefined} className={linkClassName}>
        {item.label}
        {active ? <span aria-hidden className={cn(activeUnderline, "bg-accent-500")} /> : null}
      </Link>
    );
  });

  return (
    <header className="sticky top-0 z-40 border-b border-neutral-200 bg-white">
      <Container>
        {/* Single 56px row — logo, primary nav (with Shop's hover mega menu),
            search, and account/wishlist actions. */}
        <div className="flex h-14 items-center gap-3 sm:gap-4">
          <button
            type="button"
            onClick={() => {
              setSearchOpen(false);
              setNavOpen(true);
            }}
            aria-label="Open menu"
            aria-expanded={navOpen}
            className={cn(iconButton, "-ml-2 lg:hidden")}
          >
            <MenuIcon className="size-5" />
          </button>

          <div className="flex items-center gap-3 sm:gap-5 lg:flex-1">
            <Logo size="lg" className="shrink-0" />
          </div>

          <nav aria-label="Primary" className="hidden shrink-0 items-center gap-4 text-sm lg:flex xl:gap-6">
            {navItems}
          </nav>

          <form action="/search" role="search" className="ml-auto hidden min-w-0 max-w-xl flex-1 md:ml-0">
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
                  "h-10 w-full rounded-control border border-neutral-200 bg-neutral-50 pl-10 pr-4 text-body text-ink-900 placeholder:text-neutral-400",
                  "transition-colors dur-base ease-out hover:border-neutral-300",
                  "focus:border-accent-300 focus:bg-white focus:outline-none focus-visible:ring-2 focus-visible:ring-accent-500",
                )}
              />
            </div>
          </form>

          <div className="ml-auto flex shrink-0 items-center gap-0.5 sm:gap-1 lg:flex-1 lg:justify-end">
            <button
              type="button"
              data-search-trigger
              onClick={() => {
                setNavOpen(false);
                setSearchOpen((value) => !value);
              }}
              aria-label="Search"
              aria-expanded={searchOpen}
              className={iconButton}
            >
              <SearchIcon className="size-5" />
            </button>
            <Link href="/account" aria-label="Account" className={cn(iconButton, "hidden sm:grid")}>
              <UserIcon className="size-5" />
            </Link>
            <Link href="/wishlist" aria-label="Wishlist" className={cn(iconButton, "hidden sm:grid")}>
              <HeartIcon className="size-5" />
            </Link>
          </div>
        </div>
      </Container>

      <SearchOverlay open={searchOpen} onClose={() => setSearchOpen(false)} />
      <MobileNav open={navOpen} onClose={() => setNavOpen(false)} />
    </header>
  );
}

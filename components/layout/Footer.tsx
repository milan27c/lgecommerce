import Link from "next/link";
import { Logo } from "@/components/brand/Logo";
import { Container } from "@/components/ui/Container";
import { FacebookIcon, InstagramIcon, YoutubeIcon } from "@/components/icons";
import { footerColumns } from "@/lib/data/content";

const socials = [
  { label: "Facebook", href: "/contact", Icon: FacebookIcon },
  { label: "Instagram", href: "/contact", Icon: InstagramIcon },
  { label: "YouTube", href: "/contact", Icon: YoutubeIcon },
];

const paymentMethods = ["Visa", "Mastercard", "Amex", "PayPal", "Instalments"];

const linkClass =
  "text-sm text-ink-200 transition-colors dur-fast ease-out hover:text-accent-400 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent-500 rounded-sm";

export function Footer() {
  return (
    <footer className="bg-ink-900 text-ink-200">
      <Container>
        <div className="grid grid-cols-2 gap-x-6 gap-y-10 py-14 sm:grid-cols-3 lg:grid-cols-5 lg:py-18">
          <div className="col-span-2 flex flex-col items-center text-center sm:col-span-3 sm:items-start sm:text-left lg:col-span-1">
            <Logo size="sm" tone="dark" />
            <p className="mt-4 max-w-xs text-sm text-ink-300">Living Just Right — LG, curated.</p>
            <ul className="mt-5 flex items-center gap-2">
              {socials.map(({ label, href, Icon }) => (
                <li key={label}>
                  <Link
                    href={href}
                    aria-label={label}
                    className="grid size-9 place-items-center rounded-md border border-ink-700 text-ink-200 transition-colors dur-fast ease-out hover:border-accent-400 hover:text-accent-400 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent-500"
                  >
                    <Icon className="size-4.5" />
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {footerColumns.map((column) => (
            <nav
              key={column.title}
              aria-label={column.title}
              className="flex flex-col items-center text-center sm:items-start sm:text-left"
            >
              <h2 className="mb-4 text-xs uppercase text-white">{column.title}</h2>
              <ul className="flex flex-col gap-2.5">
                {column.links.map((link) => (
                  <li key={link.label}>
                    <Link href={link.href} className={linkClass}>
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>
          ))}
        </div>

        <div className="flex flex-wrap items-center justify-center gap-2 border-t border-ink-800 py-6 sm:justify-start">
          <span className="mr-2 text-xs uppercase text-ink-400">We accept</span>
          {paymentMethods.map((method) => (
            <span
              key={method}
              className="rounded-sm border border-ink-700 px-2.5 py-1 text-sm text-ink-200"
            >
              {method}
            </span>
          ))}
        </div>

        <div className="flex flex-col items-center gap-2 border-t border-ink-800 py-6 text-center text-sm text-ink-400 sm:flex-row sm:items-center sm:justify-between sm:text-left">
          <p>© {new Date().getFullYear()} Living Just Right. All rights reserved.</p>
          <p>
            An independent LG stockist. This is a design prototype and is not affiliated with LG
            Electronics.
          </p>
        </div>
      </Container>
    </footer>
  );
}

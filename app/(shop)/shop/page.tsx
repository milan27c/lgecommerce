import type { Metadata } from "next";
import Image from "next/image";
import { ShopCatalog } from "@/components/shop/ShopCatalog";
import { Breadcrumbs } from "@/components/ui/Breadcrumbs";
import { Container } from "@/components/ui/Container";

export const metadata: Metadata = {
  title: "Shop",
  description:
    "The full Living Just Right catalogue of LG electronics — TVs, appliances, air solutions and monitors. Filter by category, price, rating and availability.",
};

export default function ShopPage() {
  return (
    <>
      <Breadcrumbs items={[{ label: "Home", href: "/" }, { label: "Shop" }]} />

      <div className="relative hidden aspect-banner overflow-hidden bg-ink-900 sm:block">
        <Image
          src="/images/shop/banner 1.png"
          alt=""
          fill
          sizes="100vw"
          priority
          className="object-cover"
        />
        <div
          aria-hidden
          className="absolute inset-0 bg-gradient-to-r from-ink-950/75 via-ink-950/25 to-transparent"
        />
        <Container className="relative flex h-full flex-col justify-center">
          <h1 className="text-h2 text-white sm:text-h1 lg:text-display">Shop</h1>
          <p className="mt-3 max-w-sm text-body-lg text-ink-100 sm:max-w-md">
            Every line we stock, in one place. Filter by category, price, rating and
            availability to find exactly what you need.
          </p>
        </Container>
      </div>

      <ShopCatalog />
    </>
  );
}

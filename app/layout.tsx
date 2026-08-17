import type { Metadata } from "next";
import { Footer } from "@/components/layout/Footer";
import { Header } from "@/components/layout/Header";
import { PromoStripe } from "@/components/layout/PromoStripe";
import "./globals.css";

export const metadata: Metadata = {
  title: {
    default: "Living Just Right — LG, curated",
    template: "%s · Living Just Right",
  },
  description:
    "An authorised LG stockist. OLED TVs, InstaView refrigerators, DUALCOOL inverter air conditioners, UltraGear monitors and more.",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en" className="h-full antialiased">
      <body className="flex min-h-full flex-col">
        <PromoStripe />
        <Header />
        <main className="flex-1">{children}</main>
        <Footer />
      </body>
    </html>
  );
}

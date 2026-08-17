import { ProductRail } from "@/components/product/ProductRail";
import { Container } from "@/components/ui/Container";
import { Section } from "@/components/ui/Section";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { newArrivalsShowcase } from "@/lib/data/products";

export function NewArrivals() {
  return (
    <Section labelledBy="new-arrivals-heading">
      <Container>
        <SectionHeading
          id="new-arrivals-heading"
          eyebrow="Just landed"
          title="New arrivals"
          link={{ label: "View all", href: "/new-arrivals" }}
          align="center-mobile"
        />
      </Container>

      {/* Outside the Container so the track can run to the right edge — the
          rail aligns its own left gutter and re-centres its controls. */}
      <ProductRail
        products={newArrivalsShowcase}
        label="New arrivals"
        perView={5}
        bleedRight
        progress={false}
      />
    </Section>
  );
}

import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { BundleOffers } from "@/components/product/BundleOffers";
import { FaqAccordion } from "@/components/product/FaqAccordion";
import { FeatureTiles } from "@/components/product/FeatureTiles";
import { ProductGallery } from "@/components/product/ProductGallery";
import { ProductGrid } from "@/components/product/ProductGrid";
import { ProductInfo } from "@/components/product/ProductInfo";
import { ProductStickyBar } from "@/components/product/ProductStickyBar";
import { ProductStory } from "@/components/product/ProductStory";
import { ReviewCard } from "@/components/product/ReviewCard";
import { ReviewSummary } from "@/components/product/ReviewSummary";
import { SpecTable } from "@/components/product/SpecTable";
import { Breadcrumbs } from "@/components/ui/Breadcrumbs";
import { Container } from "@/components/ui/Container";
import { Reveal } from "@/components/ui/Reveal";
import { Section } from "@/components/ui/Section";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { tvBundleSlug } from "@/lib/data/bundles";
import { categories } from "@/lib/data/categories";
import { getProductDetail } from "@/lib/data/productDetail";
import { products } from "@/lib/data/products";
import { cn } from "@/lib/utils/cn";

const SECTIONS = [
  { id: "features", label: "Features" },
  { id: "specs", label: "Specs" },
  { id: "reviews", label: "Reviews" },
  { id: "faq", label: "FAQ" },
  { id: "support", label: "Support" },
];

/** Anchor offset clears the sticky header plus the sticky product bar. */
const anchored = "scroll-mt-40 pt-20 lg:pt-24";

const findProduct = (slug: string) => products.find((product) => product.slug === slug);

export function generateStaticParams() {
  return products.map((product) => ({ slug: product.slug }));
}

export async function generateMetadata({ params }: PageProps<"/p/[slug]">): Promise<Metadata> {
  const { slug } = await params;
  const product = findProduct(slug);
  if (!product) return {};

  return {
    title: product.name,
    description: getProductDetail(product).description,
  };
}

export default async function ProductPage({ params }: PageProps<"/p/[slug]">) {
  const { slug } = await params;
  const product = findProduct(slug);
  if (!product) notFound();

  const detail = getProductDetail(product);
  const category = categories.find((entry) => entry.slug === product.category);
  const gallery = [product.image, ...(product.gallery ?? [])];
  const hasBundle = product.slug === tvBundleSlug;
  const sections = hasBundle
    ? [...SECTIONS, { id: "bundle-offer", label: "Bundle Offer" }]
    : SECTIONS;

  const related = products
    .filter((entry) => entry.slug !== product.slug && entry.category === product.category)
    .sort(
      (a, b) =>
        Number(b.subcategory === product.subcategory) -
        Number(a.subcategory === product.subcategory),
    )
    .slice(0, 4);

  return (
    <>
      <Breadcrumbs
        items={[
          { label: "Home", href: "/" },
          ...(category ? [{ label: category.name, href: `/c/${category.slug}` }] : []),
          { label: product.name },
        ]}
      />

      {/* ----------------------------------------------- Gallery + buy box */}
      <Container className="pb-14 pt-8 sm:pt-10">
        <div className="grid grid-cols-1 gap-10 lg:grid-cols-2 lg:gap-16">
          <ProductGallery images={gallery} name={product.name} />
          <ProductInfo product={product} detail={detail} />
        </div>
      </Container>

      <ProductStickyBar name={product.name} price={product.price} sections={sections} />

      {/* --------------------------------------------------------- Features */}
      <section id="features" aria-labelledby="features-heading" className={anchored}>
        <Container>
          <SectionHeading id="features-heading" title="Key features" />
          <FeatureTiles tiles={detail.keyFeatures} />
        </Container>

        <div className="mt-20 flex flex-col gap-20 lg:mt-24 lg:gap-24">
          {detail.stories.map((block) => (
            <ProductStory key={block.id} block={block} />
          ))}
        </div>

        <Container className="mt-20 lg:mt-24">
          <h3 className="mb-8 text-h3 text-ink-900 sm:text-h2 lg:mb-10">
            {detail.smartFeaturesTitle}
          </h3>
          <FeatureTiles tiles={detail.smartFeatures} size="sm" />
        </Container>
      </section>

      {/* --------------------------------------------------- Specifications */}
      <section id="specs" aria-labelledby="specs-heading" className={anchored}>
        <Container>
          <SectionHeading id="specs-heading" title="Specifications" />
          <Reveal>
            <SpecTable specs={detail.fullSpecs} />
          </Reveal>
        </Container>
      </section>

      {/* ---------------------------------------------------------- Reviews */}
      <section id="reviews" aria-labelledby="reviews-heading" className={anchored}>
        <Container>
          <SectionHeading id="reviews-heading" title="Reviews" />
          <Reveal>
            <ReviewSummary
              rating={detail.reviewSummary.rating}
              count={detail.reviewSummary.count}
              recommend={detail.reviewSummary.recommend}
            />
          </Reveal>

          {detail.reviews.length > 0 ? (
            <ul className="mt-3 grid grid-cols-1 items-stretch gap-3 sm:grid-cols-2 lg:mt-5 lg:grid-cols-3 lg:gap-5">
              {detail.reviews.map((review, index) => (
                <Reveal key={review.author} as="li" index={index} className="h-full">
                  <ReviewCard review={review} />
                </Reveal>
              ))}
            </ul>
          ) : null}
        </Container>
      </section>

      {/* -------------------------------------------------------------- FAQ */}
      <section id="faq" aria-labelledby="faq-heading" className={anchored}>
        <Container>
          <SectionHeading id="faq-heading" title="Frequently asked questions" />
          <Reveal>
            <FaqAccordion items={detail.faqs} />
          </Reveal>
        </Container>
      </section>

      {/* ---------------------------------------------------------- Support */}
      <section id="support" aria-labelledby="support-heading" className={cn(anchored, "pb-4")}>
        <Container>
          <SectionHeading id="support-heading" title="Support" />
          <ul className="grid grid-cols-1 items-stretch gap-3 sm:grid-cols-3 lg:gap-5">
            {detail.support.map((card, index) => (
              <Reveal key={card.title} as="li" index={index} className="h-full">
                <div className="h-full rounded-card border border-neutral-200 bg-white p-5 sm:p-6">
                  <h3 className="text-body-lg font-semibold text-ink-900">{card.title}</h3>
                  <p className="mt-2 text-body text-neutral-600">{card.copy}</p>
                </div>
              </Reveal>
            ))}
          </ul>
        </Container>
      </section>

      {/* --------------------------------------------------- Bundle offers */}
      {hasBundle ? <BundleOffers product={product} /> : null}

      {/* ---------------------------------- Related grid (SITE-PLAN.md §1) */}
      {related.length > 0 ? (
        <Section labelledBy="related-heading">
          <Container>
            <SectionHeading
              id="related-heading"
              title="You may also like"
            />
            <ProductGrid products={related} />
          </Container>
        </Section>
      ) : null}
    </>
  );
}

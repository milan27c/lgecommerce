import Image from "next/image";
import { Container } from "@/components/ui/Container";
import { Reveal } from "@/components/ui/Reveal";
import type { StoryBlock } from "@/lib/data/productDetail";
import { cn } from "@/lib/utils/cn";

export interface ProductStoryProps {
  block: StoryBlock;
  className?: string;
}

const surfaces: Record<StoryBlock["tone"], string> = {
  light: "",
  ink: "bg-ink-900",
  dusk: "bg-dusk",
};

/**
 * One editorial band. `light` sits inside the container with a rounded image;
 * the dark tones run full-bleed with the image flush to the band edges.
 */
export function ProductStory({ block, className }: ProductStoryProps) {
  const dark = block.tone !== "light";
  const ratio = block.ratio === "wide" ? "aspect-wide" : "aspect-video";

  const heading = (
    <Reveal className="mx-auto w-full max-w-3xl text-center">
      {block.eyebrow ? (
        <p className={cn("mb-3 text-xs uppercase", dark ? "text-accent-300" : "text-accent-600")}>
          {block.eyebrow}
        </p>
      ) : null}
      <h3
        className={cn("text-h3 sm:text-h2 lg:text-h1", dark ? "text-white" : "text-ink-900")}
      >
        {block.heading}
      </h3>
      <p
        className={cn(
          "mx-auto mt-4 max-w-2xl text-body sm:text-body-lg",
          dark ? "text-ink-200" : "text-neutral-600",
        )}
      >
        {block.copy}
      </p>
    </Reveal>
  );

  if (dark) {
    return (
      <div className={cn(surfaces[block.tone], className)}>
        <Container className="pb-10 pt-16 sm:pb-14 sm:pt-20">{heading}</Container>
        <Reveal index={1} className={cn("relative w-full", ratio)}>
          <Image
            src={block.image}
            alt={block.alt}
            fill
            sizes="100vw"
            className="object-cover"
          />
        </Reveal>
      </div>
    );
  }

  return (
    <Container className={className}>
      {heading}
      <Reveal
        index={1}
        className={cn("relative mt-8 w-full overflow-hidden rounded-none sm:mt-10", ratio)}
      >
        <Image src={block.image} alt={block.alt} fill sizes="100vw" className="object-cover" />
      </Reveal>
    </Container>
  );
}

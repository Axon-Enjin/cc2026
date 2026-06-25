import { Button } from "@/components/ui/button";
import { HeroProductPreview } from "@/components/sections/hero-product-preview";
import { landingContent } from "@/lib/landing-content";

/**
 * Hero section — Landing_Page (R9.1–9.4).
 *
 * Editorial split layout: left-aligned locked copy, right-column ToC Studio
 * preview with dawn atmosphere. Server component — no client hooks.
 */
export function Hero() {
  const { hero } = landingContent;

  const [subLine, supporting] = hero.body ?? [];
  const cta = hero.cta;
  const secondaryCta = hero.secondaryCta;

  return (
    <section
      id={hero.id}
      aria-labelledby={`${hero.id}-heading`}
      className="relative flex min-h-[calc(100dvh-var(--nav-height))] scroll-mt-[var(--nav-height)] flex-col justify-center overflow-hidden bg-[var(--color-bg)] px-6 text-[var(--color-text)]"
    >
      <div className="hero-dawn-glow" aria-hidden="true" />
      <div className="hero-grain" aria-hidden="true" />

      <div className="relative z-10 mx-auto grid w-full max-w-6xl grid-cols-1 items-center gap-10 md:grid-cols-2 md:gap-12 lg:gap-16">
        <div className="flex flex-col items-start text-left">
          {hero.eyebrow ? (
            <p className="text-mono mb-4 text-[11px] uppercase tracking-[0.2em] text-[var(--color-text-muted)]">
              {hero.eyebrow.en}
            </p>
          ) : null}

          {hero.heading ? (
            <h1
              id={`${hero.id}-heading`}
              className="text-display text-balance tracking-tight text-[var(--color-text)]"
            >
              {hero.heading.en}
            </h1>
          ) : null}

          {subLine ? (
            <p className="text-h3 mt-5 font-[family-name:var(--font-fraunces)] italic text-[var(--color-text)]">
              {subLine.en}
            </p>
          ) : null}

          {supporting ? (
            <p className="text-body mt-5 max-w-[55ch] text-[var(--color-text-muted)]">
              {supporting.en}
            </p>
          ) : null}

          {(cta || secondaryCta) ? (
            <div className="mt-8 flex flex-wrap items-center gap-3">
              {cta ? (
                <Button variant={cta.variant} asChild>
                  <a href={cta.href}>{cta.label.en}</a>
                </Button>
              ) : null}
              {secondaryCta ? (
                <Button variant={secondaryCta.variant} asChild>
                  <a href={secondaryCta.href}>{secondaryCta.label.en}</a>
                </Button>
              ) : null}
            </div>
          ) : null}
        </div>

        <div className="relative w-full md:justify-self-end">
          <HeroProductPreview />
        </div>
      </div>
    </section>
  );
}

export default Hero;

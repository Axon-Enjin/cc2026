import { DawnReveal } from "@/components/motion/dawn-reveal";
import { LandingNav } from "@/components/sections/landing-nav";
import { Hero } from "@/components/sections/hero";
import { Problem } from "@/components/sections/problem";
import { Modules } from "@/components/sections/modules";
import { Differentiator } from "@/components/sections/differentiator";
import { Trust } from "@/components/sections/trust";
import { Audience } from "@/components/sections/audience";
import { FinalCta } from "@/components/sections/final-cta";

/**
 * Landing page — server component composing the seven narrative sections in
 * Brand Mode.
 *
 * Client islands: `LandingNav` (sticky anchor nav + scroll-spy) and
 * `DawnReveal` (single signature scroll-in motion). All sections are server
 * components.
 *
 * `data-theme="dark"` activates Brand Mode tokens from globals.css. Only the
 * Hero uses a reduced full-height canvas (`min-h-[72dvh]` / `md:min-h-[80dvh]`);
 * other sections use content-driven rhythm via SectionShell.
 *
 * Narrative order: Hero → Problem → Modules → Differentiator → Trust →
 * Audience → FinalCta.
 */
export default function Home() {
  return (
    <main data-theme="dark" className="flex flex-1 flex-col bg-[var(--color-bg)] text-[var(--color-text)]">
      <LandingNav />
      <Hero />
      <DawnReveal>
        <Problem />
      </DawnReveal>
      <DawnReveal>
        <Modules />
      </DawnReveal>
      <DawnReveal>
        <Differentiator />
      </DawnReveal>
      <DawnReveal>
        <Trust />
      </DawnReveal>
      <DawnReveal>
        <Audience />
      </DawnReveal>
      <DawnReveal>
        <FinalCta />
      </DawnReveal>
    </main>
  );
}

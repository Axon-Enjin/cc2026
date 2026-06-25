import { BrandLogo } from "@/components/ui/brand-logo";
import { Button } from "@/components/ui/button";
import { SectionShell } from "@/components/ui/section-shell";
import { landingContent } from "@/lib/landing-content";

export function FinalCta() {
  const { finalCta } = landingContent;

  const [tierCopy, attribution] = finalCta.body ?? [];
  const cta = finalCta.cta;

  return (
    <>
      <SectionShell
        id={finalCta.id}
        labelledBy={`${finalCta.id}-heading`}
        className="relative bg-[var(--color-bg)] text-[var(--color-text)]"
        innerClassName="mx-auto flex w-full max-w-3xl flex-col items-center text-center"
      >
        {finalCta.heading ? (
          <h2
            id={`${finalCta.id}-heading`}
            className="text-h2 text-[var(--color-text)]"
          >
            {finalCta.heading.en}
          </h2>
        ) : null}

        {tierCopy ? (
          <p className="text-body mt-6 max-w-2xl text-[var(--color-text-muted)]">
            {tierCopy.en}
          </p>
        ) : null}

        {cta ? (
          <div className="mt-10">
            <Button variant={cta.variant} asChild>
              <a href={cta.href}>{cta.label.en}</a>
            </Button>
          </div>
        ) : null}
      </SectionShell>

      <footer className="bg-[var(--color-bg)] px-6 py-12 text-[var(--color-text)]">
        <div className="mx-auto flex w-full max-w-5xl flex-col items-center gap-4 text-center">
          <BrandLogo variant="mark" title="Ciel" className="h-8 w-auto" />
          {attribution ? (
            <p className="text-small max-w-2xl text-[var(--color-text-muted)]">
              {attribution.en}
            </p>
          ) : null}
        </div>
      </footer>
    </>
  );
}

export default FinalCta;

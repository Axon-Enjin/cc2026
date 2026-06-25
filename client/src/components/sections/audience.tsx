import { landingContent } from "@/lib/landing-content";
import { SectionShell } from "@/components/ui/section-shell";

export function Audience() {
  const { audience } = landingContent;
  const body = audience.body ?? [];

  return (
    <SectionShell
      id={audience.id}
      labelledBy={`${audience.id}-heading`}
      className="bg-[var(--color-bg)] text-[var(--color-text)]"
      innerClassName="mx-auto flex w-full max-w-3xl flex-col"
    >
      {audience.heading ? (
        <h2
          id={`${audience.id}-heading`}
          className="text-h2 text-[var(--color-text)]"
        >
          {audience.heading.en}
        </h2>
      ) : null}

      {body.map((paragraph, i) => (
        <p
          key={i}
          className="text-body mt-6 max-w-2xl text-[var(--color-text-muted)]"
        >
          {paragraph.en}
        </p>
      ))}
    </SectionShell>
  );
}

export default Audience;

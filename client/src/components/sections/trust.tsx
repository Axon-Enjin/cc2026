import { Surface } from "@/components/ui/surface";
import { SectionShell } from "@/components/ui/section-shell";
import { landingContent } from "@/lib/landing-content";

export function Trust() {
  const { trust } = landingContent;
  const proofPoints = trust.proofPoints ?? [];

  return (
    <SectionShell
      id={trust.id}
      labelledBy={`${trust.id}-heading`}
      className="bg-[var(--color-bg)] text-[var(--color-text)]"
      innerClassName="mx-auto flex w-full max-w-5xl flex-col"
    >
      {trust.heading ? (
        <h2
          id={`${trust.id}-heading`}
          className="text-h2 text-[var(--color-text)]"
        >
          {trust.heading.en}
        </h2>
      ) : null}

      {trust.body?.map((paragraph, i) => (
        <p
          key={i}
          className="text-body mt-6 max-w-2xl text-[var(--color-text-muted)]"
        >
          {paragraph.en}
        </p>
      ))}

      {proofPoints.length > 0 ? (
        <ul className="mt-12 grid gap-6 sm:grid-cols-2">
          {proofPoints.map((point, i) => (
            <li key={i}>
              <Surface
                as="article"
                elevation="sm"
                className="flex h-full flex-col p-6"
              >
                <p className="text-h3 text-[var(--color-text)]">
                  {point.claim.en}
                </p>
                {point.detail ? (
                  <p className="text-body mt-3 text-[var(--color-text-muted)]">
                    {point.detail.en}
                  </p>
                ) : null}
                <p className="text-mono mt-4 text-[var(--color-text-muted)]">
                  Source: {point.source}
                </p>
              </Surface>
            </li>
          ))}
        </ul>
      ) : null}
    </SectionShell>
  );
}

export default Trust;

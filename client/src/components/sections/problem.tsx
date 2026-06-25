import * as React from "react";

import { landingContent, type ProofPoint } from "@/lib/landing-content";
import { Surface } from "@/components/ui/surface";
import { SectionShell } from "@/components/ui/section-shell";

const { problem } = landingContent;

function uniqueSources(proofPoints: ProofPoint[]): string[] {
  return Array.from(new Set(proofPoints.map((p) => p.source)));
}

export function Problem() {
  const proofPoints = problem.proofPoints ?? [];
  const sources = uniqueSources(proofPoints);

  return (
    <SectionShell
      id={problem.id}
      labelledBy={`${problem.id}-heading`}
      innerClassName="mx-auto w-full max-w-5xl"
    >
      {problem.heading ? (
        <h2
          id={`${problem.id}-heading`}
          className="text-h2 max-w-3xl text-[var(--color-text)]"
        >
          {problem.heading.en}
        </h2>
      ) : null}

      {problem.body?.length ? (
        <div className="mt-4 max-w-2xl space-y-3">
          {problem.body.map((line, i) => (
            <p key={i} className="text-body text-[var(--color-text-muted)]">
              {line.en}
            </p>
          ))}
        </div>
      ) : null}

      <figure className="mt-12">
        <ul role="list" className="grid grid-cols-1 gap-4 sm:grid-cols-3">
          {proofPoints.map((point, i) => (
            <li key={i}>
              <Surface
                as="article"
                elevation="md"
                className="flex h-full flex-col gap-2 p-6"
              >
                <p className="text-stat text-[var(--color-accent)]">
                  {point.claim.en}
                </p>
                {point.detail ? (
                  <p className="text-small text-[var(--color-text-muted)]">
                    {point.detail.en}
                  </p>
                ) : null}
              </Surface>
            </li>
          ))}
        </ul>

        {sources.length ? (
          <figcaption className="text-mono mt-4 text-[var(--color-text-muted)]">
            Source: {sources.join(", ")}
          </figcaption>
        ) : null}
      </figure>
    </SectionShell>
  );
}

export default Problem;

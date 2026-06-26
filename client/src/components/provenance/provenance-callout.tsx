import * as React from "react";

export type ProvenanceCalloutContext = "grant" | "toc";

const HINTS: Record<ProvenanceCalloutContext, string> = {
  grant:
    "Click this section to add your numbers and facts — it becomes Human-edited. Or use regenerate to retry evidence matching — it may become N cited.",
  toc: "This node wasn't grounded at generation — use it as a review checklist. Grant sections can be edited separately.",
};

export function ProvenanceCallout({
  context = "grant",
  showHint = true,
}: {
  context?: ProvenanceCalloutContext;
  showHint?: boolean;
}) {
  return (
    <div
      className="rounded-[10px] border px-3.5 py-3 text-[13px] leading-relaxed"
      style={{
        borderColor: "color-mix(in srgb, var(--color-warning) 35%, var(--color-border))",
        backgroundColor: "color-mix(in srgb, var(--color-warning) 8%, var(--color-surface))",
        color: "var(--color-text)",
      }}
      role="note"
    >
      <p className="font-semibold text-[var(--color-warning)]">Needs your input</p>
      <p className="mt-1 text-[var(--color-text-muted)]">
        This part isn&apos;t backed by evidence in Ciel&apos;s corpus yet. Review and edit
        before you treat it as fact.
      </p>
      {showHint ? (
        <p className="mt-2 text-[12px] text-[var(--color-text-muted)]">{HINTS[context]}</p>
      ) : null}
    </div>
  );
}

export default ProvenanceCallout;

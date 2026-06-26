import * as React from "react";

function LegendItem({
  label,
  description,
  token,
}: {
  label: string;
  description: string;
  token: string;
}) {
  return (
    <li className="flex gap-2">
      <span
        className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full"
        style={{ backgroundColor: token }}
      />
      <span>
        <span className="font-semibold text-[var(--color-text)]">{label}</span>
        <span className="text-[var(--color-text-muted)]"> — {description}</span>
      </span>
    </li>
  );
}

export function ProvenanceLegend({ compact = false }: { compact?: boolean }) {
  return (
    <div className={compact ? "" : "rounded-[12px] bg-[var(--color-surface)] p-4"}>
      {!compact ? (
        <p className="text-[10px] font-semibold uppercase tracking-[0.18em] text-[var(--color-text-muted)]">
          Provenance labels
        </p>
      ) : null}
      <ul className={`space-y-2 text-[11px] leading-relaxed ${compact ? "" : "mt-3"}`}>
        <LegendItem
          label="N cited"
          description="backed by evidence in Ciel's corpus"
          token="var(--color-success)"
        />
        <LegendItem
          label="Unverified"
          description="AI couldn't cite sources; click to edit or regenerate"
          token="var(--color-warning)"
        />
        <LegendItem
          label="Human-edited"
          description="you reviewed and own the text"
          token="var(--color-text-muted)"
        />
      </ul>
    </div>
  );
}

export default ProvenanceLegend;

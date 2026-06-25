"use client";

import * as React from "react";
import { streamGrantGeneration } from "./grant-stream";
import { ProvenanceChip } from "./provenance-chip";
import type { Funder, GrantSection } from "./types";
import {
  IconRefresh,
  IconDownload,
  IconCheck,
  IconBuilding,
} from "@/components/dashboard/icons";

type Status = "draft" | "in_review" | "final";
const STATUS_FLOW: Status[] = ["draft", "in_review", "final"];

interface Proposal {
  id: string;
  title: string | null;
  status: Status;
  amount_php: number | null;
  funder_id: string | null;
  sections: GrantSection[];
}

function computeAlignment(funder: Funder | null, sections: GrantSection[]) {
  if (!funder) return [];
  const blob = sections.map((s) => s.content).join(" ").toLowerCase();
  return funder.kpis.map((kpi) => {
    const tokens = kpi.replace(/_/g, " ").split(" ").filter((t) => t.length > 3);
    const addressed = tokens.length > 0 && tokens.some((t) => blob.includes(t));
    return { kpi, addressed };
  });
}

export function GrantEditor({
  projectId,
  proposal,
  funder,
}: {
  projectId: string;
  proposal: Proposal;
  funder: Funder | null;
}) {
  const [title, setTitle] = React.useState(proposal.title ?? "Untitled proposal");
  const [status, setStatus] = React.useState<Status>(proposal.status);
  const [sections, setSections] = React.useState<GrantSection[]>(proposal.sections ?? []);
  const [regenKey, setRegenKey] = React.useState<string | null>(null);
  const [saveState, setSaveState] = React.useState<"idle" | "saving" | "saved">("idle");
  const [exported, setExported] = React.useState(false);

  const timer = React.useRef<ReturnType<typeof setTimeout> | null>(null);
  const alignment = computeAlignment(funder, sections);

  const persist = React.useCallback(
    async (patch: Record<string, unknown>) => {
      setSaveState("saving");
      try {
        const res = await fetch(`/api/grants/${proposal.id}`, {
          method: "PATCH",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(patch),
        });
        if (!res.ok) throw new Error();
        setSaveState("saved");
        setTimeout(() => setSaveState("idle"), 1500);
      } catch {
        setSaveState("idle");
      }
    },
    [proposal.id],
  );

  const scheduleSave = React.useCallback(
    (next: GrantSection[], nextTitle: string) => {
      if (timer.current) clearTimeout(timer.current);
      timer.current = setTimeout(() => {
        persist({ sections: next, title: nextTitle });
      }, 1200);
    },
    [persist],
  );

  const editSection = (key: string, content: string) => {
    setSections((prev) => {
      const next = prev.map((s) =>
        s.key === key ? { ...s, content, edited_by_human: true, ai_generated: false } : s,
      );
      scheduleSave(next, title);
      return next;
    });
  };

  const regenerate = async (key: string) => {
    const target = sections.find((s) => s.key === key);
    if (target?.edited_by_human && !window.confirm("Regenerate will replace your edits to this section. Continue?")) {
      return;
    }
    if (!proposal.funder_id) return;
    setRegenKey(key);
    await streamGrantGeneration(
      { project_id: projectId, funder_id: proposal.funder_id, only_section: key },
      {
        onSection: (s) => {
          setSections((prev) => prev.map((p) => (p.key === key ? { ...s } : p)));
        },
        onDone: ({ sections: finalSections }) => {
          const fresh = finalSections.find((s) => s.key === key);
          setSections((prev) => {
            const next = prev.map((p) => (p.key === key && fresh ? { ...fresh } : p));
            persist({ sections: next });
            return next;
          });
          setRegenKey(null);
        },
        onError: () => setRegenKey(null),
      },
    );
  };

  const changeStatus = (s: Status) => {
    setStatus(s);
    persist({ status: s });
  };

  const exportMarkdown = async () => {
    const md =
      `# ${title}\n\n_Funder: ${funder?.name ?? "—"}${proposal.amount_php ? ` · Requested: ₱${proposal.amount_php.toLocaleString("en-PH")}` : ""}_\n\n` +
      sections.map((s) => `## ${s.heading}\n\n${s.content}`).join("\n\n");
    try {
      await navigator.clipboard.writeText(md);
    } catch {
      /* clipboard may be blocked; download still works */
    }
    const blob = new Blob([md], { type: "text/markdown" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `${title.replace(/[^\w]+/g, "-").toLowerCase()}.md`;
    a.click();
    URL.revokeObjectURL(url);
    setExported(true);
    setTimeout(() => setExported(false), 2000);
  };

  return (
    <div className="grid gap-8 lg:grid-cols-[1fr_300px]">
      {/* Main editor column */}
      <div className="min-w-0">
        <input
          value={title}
          onChange={(e) => {
            setTitle(e.target.value);
            scheduleSave(sections, e.target.value);
          }}
          className="w-full bg-transparent font-[family-name:var(--font-fraunces)] text-[clamp(1.6rem,3.4vw,2.2rem)] font-semibold tracking-tight text-[var(--color-text)] focus:outline-none"
        />

        <div className="mt-6 space-y-4">
          {sections.map((s) => (
            <div
              key={s.key}
              className="rounded-[18px] bg-[color-mix(in_srgb,var(--color-border)_38%,transparent)] p-1.5"
            >
              <div className="rounded-[12px] bg-[var(--color-surface)] p-5 shadow-[inset_0_1px_0_rgba(255,255,255,0.6)]">
                <div className="mb-3 flex items-center justify-between gap-3">
                  <h3 className="font-[family-name:var(--font-fraunces)] text-[17px] font-semibold text-[var(--color-text)]">
                    {s.heading}
                  </h3>
                  <div className="flex items-center gap-2">
                    <ProvenanceChip section={s} />
                    <button
                      type="button"
                      onClick={() => regenerate(s.key)}
                      disabled={regenKey !== null}
                      aria-label={`Regenerate ${s.heading}`}
                      className="grid h-8 w-8 place-items-center rounded-full text-[var(--color-text-muted)] transition-colors hover:bg-[color-mix(in_srgb,var(--color-text)_6%,transparent)] hover:text-[var(--color-primary)] disabled:opacity-40"
                    >
                      <IconRefresh size={15} className={regenKey === s.key ? "animate-spin" : ""} />
                    </button>
                  </div>
                </div>
                <textarea
                  value={s.content}
                  onChange={(e) => editSection(s.key, e.target.value)}
                  rows={Math.max(3, Math.ceil(s.content.length / 90))}
                  className="w-full resize-y rounded-[10px] border border-transparent bg-[color-mix(in_srgb,var(--color-bg)_60%,transparent)] px-3 py-2.5 text-[14px] leading-relaxed text-[var(--color-text)] transition-colors focus:border-[var(--color-border)] focus:bg-[var(--color-surface)] focus:outline-none focus:[outline:2px_solid_var(--color-primary)] focus:[outline-offset:1px]"
                />
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Sidebar: funder, status, alignment, export */}
      <aside className="space-y-5 lg:sticky lg:top-20 lg:self-start">
        <div className="rounded-[18px] bg-[color-mix(in_srgb,var(--color-border)_40%,transparent)] p-1.5">
          <div className="rounded-[12px] bg-[var(--color-surface)] p-4">
            <div className="flex items-center gap-2.5">
              <span className="grid h-9 w-9 place-items-center rounded-[10px] bg-[color-mix(in_srgb,var(--color-primary)_8%,transparent)] text-[var(--color-primary)]">
                <IconBuilding size={18} />
              </span>
              <div className="min-w-0">
                <p className="truncate text-[14px] font-semibold text-[var(--color-text)]">{funder?.name ?? "No funder"}</p>
                <p className="text-[11px] uppercase tracking-[0.1em] text-[var(--color-text-muted)]">
                  {funder?.type ?? ""}
                </p>
              </div>
            </div>

            {/* Status flow */}
            <p className="mt-4 text-[10px] font-semibold uppercase tracking-[0.18em] text-[var(--color-text-muted)]">
              Status
            </p>
            <div className="mt-2 flex gap-1.5">
              {STATUS_FLOW.map((s) => (
                <button
                  key={s}
                  type="button"
                  onClick={() => changeStatus(s)}
                  className={[
                    "flex-1 rounded-full px-2 py-1.5 text-[11px] font-semibold capitalize transition-colors",
                    status === s
                      ? "bg-[var(--color-primary)] text-white"
                      : "bg-[color-mix(in_srgb,var(--color-text)_6%,transparent)] text-[var(--color-text-muted)] hover:text-[var(--color-text)]",
                  ].join(" ")}
                >
                  {s.replace("_", " ")}
                </button>
              ))}
            </div>

            <p className="mt-3 h-4 text-[11px] text-[var(--color-text-muted)]">
              {saveState === "saving" ? "Saving…" : saveState === "saved" ? "All changes saved" : ""}
            </p>
          </div>
        </div>

        {/* Funder KPI alignment */}
        {funder && funder.kpis.length > 0 ? (
          <div className="rounded-[18px] bg-[color-mix(in_srgb,var(--color-border)_40%,transparent)] p-1.5">
            <div className="rounded-[12px] bg-[var(--color-surface)] p-4">
              <p className="text-[10px] font-semibold uppercase tracking-[0.18em] text-[var(--color-text-muted)]">
                Funder KPI alignment
              </p>
              <ul className="mt-3 space-y-2">
                {alignment.map((a) => (
                  <li key={a.kpi} className="flex items-center gap-2 text-[12px]">
                    <span
                      className="grid h-4 w-4 shrink-0 place-items-center rounded-full"
                      style={{
                        backgroundColor: a.addressed
                          ? "color-mix(in srgb, var(--color-success) 18%, transparent)"
                          : "color-mix(in srgb, var(--color-warning) 18%, transparent)",
                        color: a.addressed ? "var(--color-success)" : "var(--color-warning)",
                      }}
                    >
                      {a.addressed ? <IconCheck size={11} /> : <span className="text-[10px] leading-none">!</span>}
                    </span>
                    <span className="text-[var(--color-text-muted)]">{a.kpi.replace(/_/g, " ")}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        ) : null}

        <button
          type="button"
          onClick={exportMarkdown}
          className="group flex w-full items-center justify-center gap-2 rounded-full border border-[var(--color-border)] bg-[var(--color-surface)] py-2.5 text-[13px] font-semibold text-[var(--color-text)] transition-colors hover:border-[var(--color-primary)]"
        >
          {exported ? "Copied + downloaded" : "Export as Markdown"}
          <span className="grid h-7 w-7 place-items-center rounded-full bg-[color-mix(in_srgb,var(--color-text)_6%,transparent)] transition-transform duration-300 group-hover:-translate-y-[1px]">
            <IconDownload size={15} />
          </span>
        </button>

        <p className="px-1 text-[11px] leading-relaxed text-[var(--color-text-muted)]">
          AI drafts; you hold the pen. Edited sections are marked human-edited and are never
          overwritten unless you regenerate them.
        </p>
      </aside>
    </div>
  );
}

"use client";

import * as React from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Surface } from "@/components/ui/surface";
import { IconCheck, IconDownload } from "@/components/dashboard/icons";
import { withOrgQuery } from "@/lib/workspace-context";

export type GrantFinalMilestoneProps = {
  funderName?: string | null;
  exportLabel: string;
  onExport: () => void;
  projectId: string;
  orgId?: string | null;
  animate?: boolean;
};

export function GrantFinalMilestone({
  funderName,
  exportLabel,
  onExport,
  projectId,
  orgId,
  animate = false,
}: GrantFinalMilestoneProps) {
  const dashboardHref = orgId ? withOrgQuery("/dashboard", orgId) : "/dashboard";
  const grantsHref = `/projects/${projectId}/grants`;

  return (
    <Surface
      role="status"
      aria-live="polite"
      elevation="sm"
      className={[
        "border-[color-mix(in_srgb,var(--color-success)_30%,var(--color-border))] p-6",
        animate ? "grant-milestone-in" : "",
      ].join(" ")}
    >
      <div className="flex flex-wrap items-start gap-4">
        <span
          className="grid h-11 w-11 shrink-0 place-items-center rounded-[12px]"
          style={{
            backgroundColor: "color-mix(in srgb, var(--color-success) 14%, transparent)",
            color: "var(--color-success)",
          }}
        >
          <IconCheck size={22} />
        </span>
        <div className="min-w-0 flex-1">
          <p className="font-[family-name:var(--font-fraunces)] text-[18px] font-semibold text-[var(--color-success)]">
            Proposal marked final
          </p>
          <p className="mt-1 text-sm leading-relaxed text-[var(--color-text-muted)]">
            You&apos;ve signed off on this draft
            {funderName ? ` for ${funderName}` : ""}. Export it for submission or return to
            the dashboard.
          </p>
          <div className="mt-4 flex flex-wrap items-center gap-3">
            <Button type="button" variant="secondary" className="gap-2" onClick={onExport}>
              {exportLabel}
              <IconDownload size={15} />
            </Button>
            <Link
              href={grantsHref}
              className="text-[13px] font-semibold text-[var(--color-primary)] hover:underline"
            >
              All proposals
            </Link>
            <Link
              href={dashboardHref}
              className="text-[13px] font-semibold text-[var(--color-primary)] hover:underline"
            >
              Dashboard
            </Link>
          </div>
        </div>
      </div>
      <style>{`
        @keyframes grant-milestone-in {
          from { opacity: 0; transform: translateY(6px); }
          to { opacity: 1; transform: none; }
        }
        .grant-milestone-in {
          animation: grant-milestone-in 400ms cubic-bezier(0.22, 1, 0.36, 1) both;
        }
        @media (prefers-reduced-motion: reduce) {
          .grant-milestone-in { animation: none !important; }
        }
      `}</style>
    </Surface>
  );
}

export default GrantFinalMilestone;

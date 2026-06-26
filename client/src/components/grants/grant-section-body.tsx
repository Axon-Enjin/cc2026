"use client";

import * as React from "react";
import { FormattedProvenanceContent } from "@/components/provenance/formatted-provenance-content";
import { ProvenanceCallout } from "@/components/provenance/provenance-callout";
import {
  sectionNeedsCallout,
  stripUnverifiedMarkers,
} from "@/lib/provenance-content";
import type { GrantSection } from "./types";

export function GrantSectionBody({
  section,
  isEditing,
  isRegenerating,
  onStartEdit,
  onEndEdit,
  onChange,
}: {
  section: GrantSection;
  isEditing: boolean;
  isRegenerating: boolean;
  onStartEdit: () => void;
  onEndEdit: () => void;
  onChange: (content: string) => void;
}) {
  const textareaRef = React.useRef<HTMLTextAreaElement>(null);
  const showCallout = sectionNeedsCallout(
    section.content,
    section.source_ids,
    section.edited_by_human,
  );

  React.useEffect(() => {
    if (isEditing && textareaRef.current) {
      textareaRef.current.focus();
      const len = textareaRef.current.value.length;
      textareaRef.current.setSelectionRange(len, len);
    }
  }, [isEditing]);

  if (isEditing && !isRegenerating) {
    return (
      <textarea
        ref={textareaRef}
        value={section.content}
        onChange={(e) => onChange(e.target.value)}
        onBlur={onEndEdit}
        rows={Math.max(4, Math.ceil(section.content.length / 72))}
        aria-label={`Edit ${section.heading}`}
        className="w-full resize-y rounded-[10px] border border-[var(--color-border)] bg-[var(--color-surface)] px-3 py-2.5 text-[14px] leading-relaxed text-[var(--color-text)] focus:outline-none focus:[outline:2px_solid_var(--color-primary)] focus:[outline-offset:1px]"
      />
    );
  }

  return (
    <div className="space-y-3">
      {showCallout ? <ProvenanceCallout context="grant" /> : null}
      <button
        type="button"
        onClick={onStartEdit}
        disabled={isRegenerating}
        className="group w-full rounded-[10px] border border-transparent bg-[color-mix(in_srgb,var(--color-bg)_60%,transparent)] px-3 py-2.5 text-left transition-colors hover:border-[var(--color-border)] hover:bg-[var(--color-surface)] focus-visible:border-[var(--color-border)] focus-visible:bg-[var(--color-surface)] focus-visible:outline-none focus-visible:[outline:2px_solid_var(--color-primary)] focus-visible:[outline-offset:1px] disabled:cursor-wait disabled:opacity-60"
        aria-label={`${section.heading}. Click to edit.`}
      >
        <FormattedProvenanceContent
          content={section.content}
          calloutContext="grant"
          hideInlineCallouts={showCallout}
        />
        {!isRegenerating ? (
          <span className="mt-3 block text-[11px] text-[var(--color-text-muted)] opacity-0 transition-opacity group-hover:opacity-100 group-focus-visible:opacity-100">
            Click to edit
          </span>
        ) : null}
      </button>
    </div>
  );
}

/** Normalize content on human save — strip redundant markers. */
export function normalizeEditedSectionContent(content: string): string {
  return stripUnverifiedMarkers(content);
}

export default GrantSectionBody;

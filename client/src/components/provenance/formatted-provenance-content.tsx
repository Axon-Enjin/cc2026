import * as React from "react";
import { parseFormattedContent } from "@/lib/provenance-content";
import { ProvenanceCallout, type ProvenanceCalloutContext } from "./provenance-callout";

export function FormattedProvenanceContent({
  content,
  calloutContext = "grant",
  hideInlineCallouts = false,
}: {
  content: string;
  calloutContext?: ProvenanceCalloutContext;
  /** When true, skip inline callout blocks (parent shows a single callout instead). */
  hideInlineCallouts?: boolean;
}) {
  const blocks = parseFormattedContent(content);

  if (blocks.length === 0) {
    return (
      <p className="text-[15px] leading-relaxed text-[var(--color-text-muted)] italic">
        No content yet.
      </p>
    );
  }

  return (
    <div className="space-y-3 text-[15px] leading-relaxed text-[var(--color-text)]">
      {blocks.map((block, i) => {
        if (block.type === "unverified_callout") {
          if (hideInlineCallouts) return null;
          return <ProvenanceCallout key={`callout-${i}`} context={calloutContext} showHint={false} />;
        }
        if (block.type === "bullet_list") {
          return (
            <ul key={`list-${i}`} className="list-disc space-y-1 pl-5">
              {block.items.map((item, j) => (
                <li key={j}>{item}</li>
              ))}
            </ul>
          );
        }
        return (
          <p key={`p-${i}`} className="whitespace-pre-wrap">
            {block.text}
          </p>
        );
      })}
    </div>
  );
}

export default FormattedProvenanceContent;

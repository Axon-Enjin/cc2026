import { describe, expect, it } from "vitest";
import {
  UNVERIFIED_MARKER,
  hasUnverifiedMarker,
  parseFormattedContent,
  stripUnverifiedMarkers,
} from "./provenance-content";

describe("provenance-content", () => {
  it("strips unverified markers", () => {
    const raw = `Hello world.\n\n${UNVERIFIED_MARKER}`;
    expect(stripUnverifiedMarkers(raw)).toBe("Hello world.");
    expect(hasUnverifiedMarker(raw)).toBe(true);
  });

  it("parses paragraphs and callouts", () => {
    const blocks = parseFormattedContent(
      `First paragraph.\n\nSecond paragraph. ${UNVERIFIED_MARKER}`,
    );
    expect(blocks).toEqual([
      { type: "paragraph", text: "First paragraph." },
      { type: "paragraph", text: "Second paragraph." },
      { type: "unverified_callout" },
    ]);
  });

  it("parses bullet lists", () => {
    const blocks = parseFormattedContent(
      "Activities:\n- Train staff\n- Run workshops",
    );
    expect(blocks).toEqual([
      { type: "paragraph", text: "Activities:" },
      { type: "bullet_list", items: ["Train staff", "Run workshops"] },
    ]);
  });
});

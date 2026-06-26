/**
 * Parse AI-generated content with [UNVERIFIED] markers into display blocks.
 * Display-layer only — stored DB content is unchanged unless explicitly stripped on save.
 */

export const UNVERIFIED_MARKER = "[UNVERIFIED - needs human input]";

const UNVERIFIED_RE = /\[UNVERIFIED[^\]]*\]/gi;

export type ContentBlock =
  | { type: "paragraph"; text: string }
  | { type: "bullet_list"; items: string[] }
  | { type: "unverified_callout" };

export function hasUnverifiedMarker(text: string): boolean {
  UNVERIFIED_RE.lastIndex = 0;
  return UNVERIFIED_RE.test(text);
}

/** Remove inline UNVERIFIED markers and normalize surrounding whitespace. */
export function stripUnverifiedMarkers(text: string): string {
  return text
    .replace(UNVERIFIED_RE, "")
    .replace(/[ \t]+\n/g, "\n")
    .replace(/\n{3,}/g, "\n\n")
    .trim();
}

function splitIntoSegments(text: string): string[] {
  const normalized = text.replace(/\r\n/g, "\n").trim();
  if (!normalized) return [];

  const segments: string[] = [];
  let current = "";
  let bulletBuffer: string[] = [];

  const flushBullets = () => {
    if (bulletBuffer.length > 0) {
      segments.push(bulletBuffer.join("\n"));
      bulletBuffer = [];
    }
  };

  for (const line of normalized.split("\n")) {
    if (line.match(/^\s*- /)) {
      if (current.trim()) {
        segments.push(current.trim());
        current = "";
      }
      bulletBuffer.push(line);
    } else if (line.trim() === "") {
      flushBullets();
      if (current.trim()) {
        segments.push(current.trim());
        current = "";
      }
    } else {
      flushBullets();
      current += (current ? "\n" : "") + line;
    }
  }
  flushBullets();
  if (current.trim()) segments.push(current.trim());
  return segments;
}

function parsePlainChunk(text: string): ContentBlock[] {
  const segments = splitIntoSegments(text.trim());
  const blocks: ContentBlock[] = [];

  for (const segment of segments) {
    const lines = segment.split("\n");
    if (lines.length > 0 && lines.every((l) => l.match(/^\s*- /))) {
      blocks.push({
        type: "bullet_list",
        items: lines.map((l) => l.replace(/^\s*- /, "").trim()),
      });
    } else if (segment.trim()) {
      blocks.push({ type: "paragraph", text: segment.trim() });
    }
  }
  return blocks;
}

function dedupeCallouts(blocks: ContentBlock[]): ContentBlock[] {
  const result: ContentBlock[] = [];
  let lastWasCallout = false;
  for (const block of blocks) {
    if (block.type === "unverified_callout") {
      if (!lastWasCallout) {
        result.push(block);
        lastWasCallout = true;
      }
    } else {
      result.push(block);
      lastWasCallout = false;
    }
  }
  return result;
}

/** Parse content into paragraphs, bullet lists, and unverified callout blocks. */
export function parseFormattedContent(text: string): ContentBlock[] {
  const normalized = text.replace(/\r\n/g, "\n").trim();
  if (!normalized) return [];

  const blocks: ContentBlock[] = [];
  const re = new RegExp(UNVERIFIED_RE.source, "gi");
  let lastIndex = 0;
  let match: RegExpExecArray | null;

  while ((match = re.exec(normalized)) !== null) {
    blocks.push(...parsePlainChunk(normalized.slice(lastIndex, match.index)));
    blocks.push({ type: "unverified_callout" });
    lastIndex = match.index + match[0].length;
  }
  blocks.push(...parsePlainChunk(normalized.slice(lastIndex)));

  return dedupeCallouts(blocks);
}

export function sectionNeedsCallout(
  content: string,
  sourceIds: string[] | undefined,
  editedByHuman: boolean,
): boolean {
  if (editedByHuman) return false;
  return (sourceIds?.length ?? 0) === 0 || hasUnverifiedMarker(content);
}

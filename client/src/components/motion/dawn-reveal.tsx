"use client";

import * as React from "react";

/**
 * DawnReveal — the single client island in the Landing_Page system.
 *
 * This is the ONLY component carrying the `"use client"` directive (R8.2): every
 * section is a server component, and only their wrapper opts into the client to
 * supply the one signature motion (Dawn_Reveal, DSD §7 MOTION_INTENSITY 2).
 *
 * Behavior (DSD §5/§6/§7):
 *   - On mount it reads `window.matchMedia("(prefers-reduced-motion: reduce)")`.
 *   - **reduce** → children render immediately in their final visible state
 *     (`opacity:1; transform:none`), with NO IntersectionObserver and NO
 *     transition (R8.5, R16 reduced-motion).
 *   - **no-preference** → children start at `opacity:0` + a small `translateY`,
 *     an `IntersectionObserver` is attached, and on the first viewport entry a
 *     `data-revealed` attribute flips to `"true"`, driving a transition on ONLY
 *     `transform` and `opacity` (GPU-safe, R8.3, R8.4, R18.1). The observer is
 *     disconnected after the first reveal — one gesture, no loop/autoplay (R8.6).
 *
 * No-JS / pre-hydration: the server HTML renders the final visible state, so the
 * reveal is purely additive — content is always present without JS (R8.1, R8.5).
 * An isomorphic layout effect applies the hidden state before the first paint of
 * the hydrated tree, so motion-enabled visitors do not see a flash of content.
 *
 * Visual values are self-contained inline styles (transform/opacity only) so this
 * island does not depend on globals.css beyond the tokens it never touches.
 *
 * _Requirements: 8.2, 8.3, 8.4, 8.5, 8.6, 18.1_
 */
export interface DawnRevealProps {
  children: React.ReactNode;
  /** Element/component to render as. Defaults to "div". */
  as?: React.ElementType;
  className?: string;
}

/** Reveal phases. `static` = final visible state with no transition (no-JS, pre-effect, or reduced motion). */
type RevealPhase = "static" | "hidden" | "revealed";

/** Small upward offset for the hidden state — a dawn/horizon rise, not a large slide. */
const HIDDEN_OFFSET = "16px";

/** GPU-safe transition restricted to transform + opacity only (R8.3, R18.1). */
const REVEAL_TRANSITION =
  "transform 700ms cubic-bezier(0.22, 1, 0.36, 1), opacity 700ms cubic-bezier(0.22, 1, 0.36, 1)";

/**
 * useLayoutEffect on the client (runs before paint → no flash), useEffect on the
 * server (avoids the SSR layout-effect warning while still rendering markup).
 */
const useIsomorphicLayoutEffect =
  typeof window !== "undefined" ? React.useLayoutEffect : React.useEffect;

export function DawnReveal({ children, as, className }: DawnRevealProps) {
  const Component = as ?? "div";
  const ref = React.useRef<HTMLElement | null>(null);
  const [phase, setPhase] = React.useState<RevealPhase>("static");

  useIsomorphicLayoutEffect(() => {
    // Reduced motion: leave the final visible state in place, register no observer
    // and no transition (R8.5).
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      return;
    }

    const node = ref.current;
    // No element or no observer support: degrade to the final visible state (R8.1).
    if (!node || typeof IntersectionObserver === "undefined") {
      return;
    }

    // Motion allowed: hide first (before paint), then reveal on first entry.
    setPhase("hidden");

    const observer = new IntersectionObserver((entries) => {
      const entry = entries[0];
      if (entry?.isIntersecting) {
        setPhase("revealed");
        // Single Dawn_Reveal gesture — no loop/autoplay (R8.6).
        observer.disconnect();
      }
    });

    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  let style: React.CSSProperties;
  switch (phase) {
    case "hidden":
      style = {
        opacity: 0,
        transform: `translateY(${HIDDEN_OFFSET})`,
        transition: REVEAL_TRANSITION,
        willChange: "transform, opacity",
      };
      break;
    case "revealed":
      style = {
        opacity: 1,
        transform: "none",
        transition: REVEAL_TRANSITION,
        willChange: "transform, opacity",
      };
      break;
    default:
      // static: final visible state, no transition (R8.5, no-JS/reduced motion).
      style = { opacity: 1, transform: "none" };
      break;
  }

  return (
    <Component
      ref={ref}
      className={className}
      style={style}
      data-revealed={phase === "hidden" ? "false" : "true"}
    >
      {children}
    </Component>
  );
}

export default DawnReveal;

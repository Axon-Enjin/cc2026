import * as React from "react";

/**
 * Surface — Foundation primitive (server-compatible, no "use client").
 *
 * A neutral container that renders the DSD §2/§4 surface treatment:
 *   - `--color-surface` background
 *   - 1px `--color-border` border
 *   - `--radius-surface` (12px) corner radius
 *   - a configurable elevation shadow token (`sm` | `md` | `lg` | `none`)
 *
 * All visual values are sourced exclusively from Tailwind v4 `@theme` tokens
 * (see `globals.css`); no ad-hoc hex/spacing. The `as` prop makes the element
 * polymorphic (default `div`) so a Surface can render as `section`, `article`,
 * `aside`, etc. while keeping the same treatment.
 *
 * _Requirements: 4.3_
 */
export type Elevation = "sm" | "md" | "lg" | "none";

export interface SurfaceProps extends React.HTMLAttributes<HTMLElement> {
  /** Element/component to render as. Defaults to "div". */
  as?: React.ElementType;
  /** Elevation shadow token. Defaults to "sm". */
  elevation?: Elevation;
}

/** Maps an elevation token to its Tailwind shadow utility (bound to --shadow-*). */
const elevationClass: Record<Elevation, string> = {
  none: "shadow-none",
  sm: "shadow-sm",
  md: "shadow-md",
  lg: "shadow-lg",
};

const baseClass = "bg-surface border border-border rounded-surface";

export function Surface({
  as,
  elevation = "sm",
  className,
  ...props
}: SurfaceProps) {
  const Component = as ?? "div";
  const classes = [baseClass, elevationClass[elevation], className]
    .filter(Boolean)
    .join(" ");

  return <Component className={classes} {...props} />;
}

export default Surface;

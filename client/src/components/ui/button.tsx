import * as React from "react";

/**
 * Button primitive — Ciel_Foundation (DSD §4).
 *
 * Server-compatible (no "use client"). Composes only from @theme tokens
 * declared in globals.css, surfaced as Tailwind v4 utilities.
 *
 * Variants (DSD §4):
 *  - primary   : --color-primary bg / white label / hover --color-primary-hover
 *  - secondary : transparent / --color-primary label + 1px --color-primary border
 *  - ghost     : transparent / --color-text label
 *
 * Shared: 8px control radius, Public Sans 600 14px label, 10px/16px padding,
 * 40% opacity when disabled, a 2px solid --color-primary focus-visible ring at
 * 2px offset, and a >=44x44px hit area (R4.1, R4.2, R4.4, R16.2, R16.3).
 */

export type ButtonVariant = "primary" | "secondary" | "ghost";

/** Join truthy class fragments (no external dep). */
function cn(...parts: Array<string | false | null | undefined>): string {
  return parts.filter(Boolean).join(" ");
}

const baseClasses = cn(
  "inline-flex items-center justify-center gap-2 text-center align-middle",
  // hit area >= 44x44px (R16.2)
  "min-h-[44px] min-w-[44px]",
  // padding 10px 16px + 8px control radius (R4.1)
  "px-4 py-[10px] rounded-control",
  // label: Public Sans 600 14px (R4.1)
  "font-sans font-semibold text-[14px] leading-none",
  "select-none transition-[colors,transform] duration-150 ease-out cursor-pointer active:scale-[0.98]",
  // focus-visible ring: 2px solid --color-primary at 2px offset (R4.4, R16.3)
  "focus-visible:outline-none focus-visible:[outline:2px_solid_var(--color-primary)] focus-visible:[outline-offset:2px]",
  // disabled / aria-disabled -> 40% opacity (R4.2)
  "disabled:opacity-40 disabled:pointer-events-none",
  "aria-disabled:opacity-40 aria-disabled:pointer-events-none",
);

const variantClasses: Record<ButtonVariant, string> = {
  primary: "bg-primary text-white hover:bg-primary-hover",
  secondary:
    "bg-transparent text-primary border border-primary hover:bg-primary/10",
  ghost: "bg-transparent text-[var(--color-text)] hover:bg-[var(--color-text)]/8",
};

/** Resolve the full class string for a given variant (exported for testing/reuse). */
export function buttonVariants(
  variant: ButtonVariant = "primary",
  className?: string,
): string {
  return cn(baseClasses, variantClasses[variant], className);
}

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  /** Visual variant mapped to DSD §4 colors. Defaults to "primary". */
  variant?: ButtonVariant;
  /**
   * Render the single child element (e.g. an <a>) with the button styling
   * instead of a <button>. Used for link CTAs while keeping styling (R4.1).
   */
  asChild?: boolean;
}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  function Button(
    { variant = "primary", asChild = false, className, children, ...props },
    ref,
  ) {
    const classes = buttonVariants(variant, className);

    if (asChild && React.isValidElement(children)) {
      const child = children as React.ReactElement<{ className?: string }>;
      return React.cloneElement(child, {
        className: cn(classes, child.props.className),
        ...props,
      });
    }

    return (
      <button ref={ref} className={classes} {...props}>
        {children}
      </button>
    );
  },
);

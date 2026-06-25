import * as React from "react";

export interface SectionShellProps extends React.HTMLAttributes<HTMLElement> {
  /** Section anchor id. */
  id: string;
  /** id of the heading element for aria-labelledby. */
  labelledBy?: string;
  /** Inner content max-width wrapper class override. */
  innerClassName?: string;
  children: React.ReactNode;
}

function cn(...parts: Array<string | false | null | undefined>): string {
  return parts.filter(Boolean).join(" ");
}

/**
 * Shared section wrapper — consistent padding, scroll offset for sticky nav.
 */
export function SectionShell({
  id,
  labelledBy,
  innerClassName,
  className,
  children,
  ...props
}: SectionShellProps) {
  return (
    <section
      id={id}
      aria-labelledby={labelledBy}
      className={cn(
        "scroll-mt-[var(--nav-height)] px-6 py-12 md:py-16",
        className,
      )}
      {...props}
    >
      {innerClassName ? (
        <div className={innerClassName}>{children}</div>
      ) : (
        children
      )}
    </section>
  );
}

export default SectionShell;

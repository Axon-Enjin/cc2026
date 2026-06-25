"use client";

import * as React from "react";

import { BrandLogo } from "@/components/ui/brand-logo";
import { Button } from "@/components/ui/button";
import { landingNav } from "@/lib/landing-content";

function cn(...parts: Array<string | false | null | undefined>): string {
  return parts.filter(Boolean).join(" ");
}

const navLinkBase =
  "inline-flex min-h-[44px] min-w-[44px] items-center justify-center rounded-control px-3 text-[14px] font-semibold leading-none transition-colors duration-150 ease-out focus-visible:outline-none focus-visible:[outline:2px_solid_var(--color-primary)] focus-visible:[outline-offset:2px]";

/**
 * Sticky Brand Mode header with full anchor navigation, scroll-spy, and mobile menu.
 */
export function LandingNav() {
  const { links, signIn, cta } = landingNav;
  const [activeId, setActiveId] = React.useState<string | null>(null);
  const [menuOpen, setMenuOpen] = React.useState(false);

  React.useEffect(() => {
    const sectionIds = ["hero", ...links.map((l) => l.id)];
    const elements = sectionIds
      .map((id) => document.getElementById(id))
      .filter((el): el is HTMLElement => el !== null);

    if (elements.length === 0 || typeof IntersectionObserver === "undefined") {
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio);
        if (visible[0]?.target.id) {
          setActiveId(visible[0].target.id);
        }
      },
      {
        rootMargin: "-40% 0px -45% 0px",
        threshold: [0, 0.25, 0.5, 0.75, 1],
      },
    );

    for (const el of elements) {
      observer.observe(el);
    }
    return () => observer.disconnect();
  }, [links]);

  React.useEffect(() => {
    if (!menuOpen) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setMenuOpen(false);
    };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [menuOpen]);

  const closeMenu = () => setMenuOpen(false);

  const renderNavLink = (id: string, label: string, href: string) => {
    const isActive = activeId === id;
    return (
      <a
        key={id}
        href={href}
        onClick={closeMenu}
        aria-current={isActive ? "location" : undefined}
        className={cn(
          navLinkBase,
          isActive
            ? "text-[var(--color-text)]"
            : "text-[var(--color-text-muted)] hover:text-[var(--color-text)]",
        )}
      >
        {label}
      </a>
    );
  };

  return (
    <>
      <a
        href="#problem"
        className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-[60] focus:rounded-control focus:bg-[var(--color-primary)] focus:px-4 focus:py-2 focus:text-white"
      >
        Skip to content
      </a>

      <header
        className="sticky top-0 z-50 border-b border-[var(--color-border)] bg-[var(--color-bg)]/95"
        style={{ height: "var(--nav-height)" }}
      >
        <div className="mx-auto flex h-full max-w-6xl items-center justify-between gap-4 px-6">
          <a
            href="#hero"
            className="inline-flex shrink-0 items-center gap-2 focus-visible:outline-none focus-visible:[outline:2px_solid_var(--color-primary)] focus-visible:[outline-offset:2px]"
            aria-label="Ciel — back to top"
          >
            <BrandLogo variant="mark" title="" className="h-7 w-auto" />
            <span className="font-[family-name:var(--font-fraunces)] text-[18px] font-semibold leading-none text-[var(--color-text)]">
              Ciel
            </span>
          </a>

          <nav
            aria-label="Landing page sections"
            className="hidden items-center gap-1 md:flex"
          >
            {links.map((link) =>
              renderNavLink(link.id, link.label.en, link.href),
            )}
          </nav>

          <div className="hidden items-center gap-2 md:flex">
            <Button variant="ghost" asChild className="text-[14px]">
              <a href={signIn.href}>{signIn.label.en}</a>
            </Button>
            <Button variant={cta.variant} asChild className="text-[14px]">
              <a href={cta.href}>
                <span className="hidden lg:inline">{cta.label.en}</span>
                <span className="lg:hidden">Get started</span>
              </a>
            </Button>
          </div>

          <button
            type="button"
            className="inline-flex min-h-[44px] min-w-[44px] items-center justify-center rounded-control text-[var(--color-text)] md:hidden focus-visible:outline-none focus-visible:[outline:2px_solid_var(--color-primary)] focus-visible:[outline-offset:2px]"
            aria-expanded={menuOpen}
            aria-controls="landing-mobile-menu"
            aria-label={menuOpen ? "Close menu" : "Open menu"}
            onClick={() => setMenuOpen((o) => !o)}
          >
            <span className="relative block h-4 w-5">
              <span
                className={cn(
                  "absolute left-0 block h-0.5 w-5 bg-current transition-transform duration-150",
                  menuOpen ? "top-2 rotate-45" : "top-0",
                )}
              />
              <span
                className={cn(
                  "absolute left-0 top-2 block h-0.5 w-5 bg-current transition-opacity duration-150",
                  menuOpen && "opacity-0",
                )}
              />
              <span
                className={cn(
                  "absolute left-0 block h-0.5 w-5 bg-current transition-transform duration-150",
                  menuOpen ? "top-2 -rotate-45" : "top-4",
                )}
              />
            </span>
          </button>
        </div>

        {menuOpen ? (
          <nav
            id="landing-mobile-menu"
            aria-label="Landing page sections"
            className="border-t border-[var(--color-border)] bg-[var(--color-bg)] px-6 py-4 md:hidden"
          >
            <ul className="flex flex-col gap-1">
              {links.map((link) => (
                <li key={link.id}>
                  {renderNavLink(link.id, link.label.en, link.href)}
                </li>
              ))}
              <li className="mt-4 flex flex-col gap-2 border-t border-[var(--color-border)] pt-4">
                <Button variant="ghost" asChild className="w-full">
                  <a href={signIn.href} onClick={closeMenu}>
                    {signIn.label.en}
                  </a>
                </Button>
                <Button variant={cta.variant} asChild className="w-full">
                  <a href={cta.href} onClick={closeMenu}>
                    {cta.label.en}
                  </a>
                </Button>
              </li>
            </ul>
          </nav>
        ) : null}
      </header>
    </>
  );
}

export default LandingNav;

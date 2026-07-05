"use client";

import * as React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

import { cn } from "@/lib/utils";
import { ThemeToggle } from "@/components/dc/theme-toggle";
import { Icon } from "@/components/dc/icon";
import { DOCS_NAV } from "@/components/docs/nav";
import { useSearch } from "@/components/docs/search-provider";

/**
 * Documentation shell chrome: fixed sidebar on desktop, sticky header +
 * off-canvas drawer on mobile. Active state is route-driven (usePathname),
 * one page per section — the scroll-spy of the old single-page showcase is
 * gone.
 */
export function DocsSidebar() {
  const pathname = usePathname();
  const { openSearch } = useSearch();

  // Mobile: the sidebar collapses into an off-canvas drawer opened from the
  // sticky mobile header. Desktop keeps the always-visible fixed sidebar and
  // ignores this state entirely (the drawer/header CSS is media-query gated).
  const [open, setOpen] = React.useState(false);
  const menuBtnRef = React.useRef<HTMLButtonElement>(null);
  const closeRef = React.useRef<HTMLButtonElement>(null);
  const closeDrawer = React.useCallback(() => setOpen(false), []);

  React.useEffect(() => {
    if (!open) return;
    const menuEl = menuBtnRef.current;
    closeRef.current?.focus();
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    document.addEventListener("keydown", onKey);
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = prevOverflow;
      menuEl?.focus();
    };
  }, [open]);

  return (
    <>
      {/* Mobile-only sticky header — theme + version always reachable, plus a
          menu button that opens the docs-nav drawer. */}
      <header className="ds-mobile-header">
        <div className="ds-mobile-brand">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="/assets/deckcenter-mark.svg" alt="" />
          <div>
            <span className="ds-logo-text">Sleeve System</span>
            <span className="ds-logo-sub">v2.1</span>
          </div>
        </div>
        <div className="ds-mobile-actions">
          <ThemeToggle />
          <button
            type="button"
            className="ds-mobile-menu-btn"
            aria-label="Open documentation menu"
            aria-expanded={open}
            ref={menuBtnRef}
            onClick={() => setOpen(true)}
          >
            <Icon name="menu" size={22} />
          </button>
        </div>
      </header>

      <div
        className={cn("ds-sidebar-backdrop", open && "open")}
        aria-hidden="true"
        onClick={closeDrawer}
      />

      <aside className={cn("ds-sidebar", open && "open")}>
        <div className="ds-logo">
          <Link href="/" className="ds-logo-link" aria-label="Sleeve System home">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="/assets/deckcenter-mark.svg" alt="" />
            <span>
              <span className="ds-logo-text">Sleeve System</span>
              <span className="ds-logo-sub">Design System · v2.1</span>
            </span>
          </Link>
          <button
            type="button"
            className="ds-sidebar-close"
            aria-label="Close documentation menu"
            ref={closeRef}
            onClick={closeDrawer}
          >
            <Icon name="close" size={20} />
          </button>
        </div>
        <button type="button" className="ds-search-trigger" onClick={openSearch}>
          <Icon name="search" size={16} />
          <span>Search docs…</span>
          <span className="ds-kbd" aria-hidden="true">⌘K</span>
        </button>
        <nav className="ds-nav" aria-label="Documentation">
          {DOCS_NAV.map((group) => (
            <React.Fragment key={group.title}>
              <div className="ds-nav-group">{group.title}</div>
              {group.pages.map((page) => (
                <Link
                  key={page.href}
                  href={page.href}
                  className={cn(pathname === page.href && "on")}
                  aria-current={pathname === page.href ? "page" : undefined}
                  onClick={closeDrawer}
                >
                  {page.label}
                </Link>
              ))}
            </React.Fragment>
          ))}
        </nav>
        <div className="ds-footer">
          <span className="ds-footer-ver">2026 · PixelPie Studio</span>
          <ThemeToggle />
        </div>
      </aside>
    </>
  );
}

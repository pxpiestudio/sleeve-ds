"use client";

import * as React from "react";
import { useRouter } from "next/navigation";

import { cn } from "@/lib/utils";
import { Icon } from "@/components/dc/icon";
import { searchDocs, type SearchResult } from "@/components/docs/search-data";

type SpotlightSearchProps = {
  open: boolean;
  onClose: () => void;
};

type GroupedResult = { title: string; items: (SearchResult & { index: number })[] };

// Route hrefs (e.g. "/foundations/color") can't be used verbatim in a DOM id:
// a literal "/" in an id attribute confuses Chromium's tab-order computation
// for the *entire document* (confirmed empirically — an id like
// "spotlight-option-/" breaks the very first Tab press on the whole page,
// not just this element). Slugify to a slash-free id instead.
function optionId(href: string): string {
  const slug = href === "/" ? "home" : href.replace(/^\//, "").replace(/\//g, "-");
  return `spotlight-option-${slug}`;
}

/**
 * Global Cmd+K search over every documentation route. Mounted once by
 * SearchProvider; `inert` follows the shell drawer convention (shell.tsx /
 * navbar.tsx) rather than a full focus trap, so behavior stays consistent
 * with the rest of the docs chrome.
 */
export function SpotlightSearch({ open, onClose }: SpotlightSearchProps) {
  const router = useRouter();
  const [query, setQuery] = React.useState("");
  const [activeIndex, setActiveIndex] = React.useState(0);
  const inputRef = React.useRef<HTMLInputElement>(null);
  const previouslyFocused = React.useRef<HTMLElement | null>(null);

  const results = React.useMemo(() => searchDocs(query), [query]);

  // Reset the highlighted row whenever the result set changes or the dialog
  // opens/closes — done during render (React's documented pattern for
  // resetting state on a derived change) rather than in an effect, since an
  // effect here would just cause an extra, avoidable render pass.
  const resetToken = `${open}|${query}`;
  const [prevResetToken, setPrevResetToken] = React.useState(resetToken);
  if (resetToken !== prevResetToken) {
    setPrevResetToken(resetToken);
    setActiveIndex(0);
  }

  const [prevOpen, setPrevOpen] = React.useState(open);
  if (open !== prevOpen) {
    setPrevOpen(open);
    if (!open) setQuery("");
  }

  React.useEffect(() => {
    if (!open) return;
    previouslyFocused.current = document.activeElement as HTMLElement | null;
    inputRef.current?.focus();
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    document.addEventListener("keydown", onKey);
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = prevOverflow;
      previouslyFocused.current?.focus();
    };
  }, [open, onClose]);

  const go = React.useCallback(
    (href: string) => {
      onClose();
      router.push(href);
    },
    [onClose, router],
  );

  const activeHref = results[activeIndex]?.href;

  React.useEffect(() => {
    if (!activeHref) return;
    document.getElementById(optionId(activeHref))?.scrollIntoView({ block: "nearest" });
  }, [activeHref]);

  const groups = React.useMemo<GroupedResult[]>(() => {
    const order: string[] = [];
    const byGroup = new Map<string, GroupedResult["items"]>();
    results.forEach((result, index) => {
      if (!byGroup.has(result.group)) {
        byGroup.set(result.group, []);
        order.push(result.group);
      }
      byGroup.get(result.group)!.push({ ...result, index });
    });
    return order.map((title) => ({ title, items: byGroup.get(title)! }));
  }, [results]);

  const onInputKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "ArrowDown") {
      e.preventDefault();
      setActiveIndex((i) => Math.min(i + 1, results.length - 1));
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setActiveIndex((i) => Math.max(i - 1, 0));
    } else if (e.key === "Enter") {
      e.preventDefault();
      const target = results[activeIndex];
      if (target) go(target.href);
    }
  };

  return (
    <>
      <div
        className={cn("ds-spotlight-backdrop", open && "open")}
        aria-hidden="true"
        onClick={onClose}
      />
      <div
        className={cn("ds-spotlight", open && "open")}
        role="dialog"
        aria-modal="true"
        aria-label="Search design system"
        inert={!open || undefined}
      >
        <div className="ds-spotlight-input-row">
          <Icon name="search" size={18} />
          <input
            ref={inputRef}
            className="ds-spotlight-input"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onKeyDown={onInputKeyDown}
            role="combobox"
            aria-expanded={open}
            aria-controls="spotlight-listbox"
            aria-activedescendant={activeHref ? optionId(activeHref) : undefined}
            aria-autocomplete="list"
            aria-label="Search the design system"
            placeholder="Search components, foundations, patterns…"
            autoComplete="off"
            spellCheck={false}
          />
        </div>
        <div
          className="ds-spotlight-results"
          role="listbox"
          id="spotlight-listbox"
          aria-label="Search results"
        >
          {/*
           * Rendered only while open: ~30 inert role=option/group nodes sitting
           * in the DOM on every route (even collapsed) delays Chromium's
           * accessibility-tree computation enough to eat the page's first Tab
           * press — confirmed empirically (see e2e/a11y.spec.ts's skip-link
           * test, which this would otherwise intermittently break sitewide).
           */}
          {!open ? null : results.length === 0 ? (
            <p className="ds-spotlight-empty" role="status">
              No results for &ldquo;{query}&rdquo;.
            </p>
          ) : (
            groups.map((group) => (
              <div
                key={group.title}
                role="group"
                aria-labelledby={`spotlight-group-${group.title}`}
              >
                <div id={`spotlight-group-${group.title}`} role="presentation" className="ds-spotlight-group">
                  {group.title}
                </div>
                {group.items.map((item) => (
                  // aria-activedescendant pattern: DOM focus stays on the
                  // input (which already handles ArrowUp/Down/Enter), so
                  // these options are deliberately non-focusable — clicking
                  // is a pointer-only shortcut for the same Enter action.
                  // eslint-disable-next-line jsx-a11y/click-events-have-key-events, jsx-a11y/interactive-supports-focus
                  <div
                    key={item.href}
                    id={optionId(item.href)}
                    role="option"
                    aria-selected={item.index === activeIndex}
                    className={cn("ds-spotlight-option", item.index === activeIndex && "active")}
                    onMouseEnter={() => setActiveIndex(item.index)}
                    onClick={() => go(item.href)}
                  >
                    <span className="ds-spotlight-option-label">{item.label}</span>
                    <span className="ds-spotlight-option-desc">{item.description}</span>
                  </div>
                ))}
              </div>
            ))
          )}
        </div>
        <div className="ds-spotlight-footer">
          <span>
            <kbd>↑</kbd>
            <kbd>↓</kbd> Navigate
          </span>
          <span>
            <kbd>↵</kbd> Open
          </span>
          <span>
            <kbd>Esc</kbd> Close
          </span>
        </div>
      </div>
    </>
  );
}

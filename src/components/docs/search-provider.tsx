"use client";

import * as React from "react";

import { SpotlightSearch } from "@/components/docs/spotlight-search";

type SearchContextValue = {
  open: boolean;
  openSearch: () => void;
  closeSearch: () => void;
};

const SearchContext = React.createContext<SearchContextValue | null>(null);

export function useSearch(): SearchContextValue {
  const ctx = React.useContext(SearchContext);
  if (!ctx) throw new Error("useSearch must be used within a SearchProvider");
  return ctx;
}

/**
 * Owns spotlight open/close state and the global Cmd+K / Ctrl+K shortcut, so
 * the sidebar trigger and the keyboard shortcut share one modal instance.
 */
export function SearchProvider({ children }: { children: React.ReactNode }) {
  const [open, setOpen] = React.useState(false);

  const openSearch = React.useCallback(() => setOpen(true), []);
  const closeSearch = React.useCallback(() => setOpen(false), []);

  React.useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k") {
        e.preventDefault();
        setOpen((prev) => !prev);
      }
    };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, []);

  const value = React.useMemo(
    () => ({ open, openSearch, closeSearch }),
    [open, openSearch, closeSearch],
  );

  return (
    <SearchContext.Provider value={value}>
      {children}
      <SpotlightSearch open={open} onClose={closeSearch} />
    </SearchContext.Provider>
  );
}

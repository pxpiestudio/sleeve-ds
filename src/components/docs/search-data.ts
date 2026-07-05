import { DOCS_NAV, type DocPage } from "@/components/docs/nav";

export type SearchResult = DocPage & { group: string };

/** Flat, group-tagged index of every documentation route — the corpus for the spotlight search. */
export const SEARCH_INDEX: SearchResult[] = DOCS_NAV.flatMap((group) =>
  group.pages.map((page) => ({ ...page, group: group.title })),
);

/**
 * Case-insensitive substring match over label, description, and group.
 * Label matches rank above description/group matches; ties keep site order.
 */
export function searchDocs(query: string): SearchResult[] {
  const q = query.trim().toLowerCase();
  if (!q) return SEARCH_INDEX;

  const scored = SEARCH_INDEX.map((result, index) => {
    const label = result.label.toLowerCase();
    const description = result.description.toLowerCase();
    const group = result.group.toLowerCase();
    let rank = -1;
    if (label.startsWith(q)) rank = 0;
    else if (label.includes(q)) rank = 1;
    else if (description.includes(q) || group.includes(q)) rank = 2;
    return { result, rank, index };
  }).filter((entry) => entry.rank !== -1);

  scored.sort((a, b) => a.rank - b.rank || a.index - b.index);
  return scored.map((entry) => entry.result);
}

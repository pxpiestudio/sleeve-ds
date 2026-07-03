import * as React from "react";

import { cn } from "@/lib/utils";
import { CodeBlock } from "@/components/docs/code-block";

/* ── Page header ─────────────────────────────────────────────────────────
   Eyebrow (group) · H1 · lead paragraph · optional import statement.
-------------------------------------------------------------------------- */
export function PageHeader({
  eyebrow,
  title,
  lead,
  importCode,
}: {
  eyebrow: string;
  title: string;
  lead: React.ReactNode;
  importCode?: string;
}) {
  return (
    <header className="doc-page-header">
      <span className="ds-eyebrow">{eyebrow}</span>
      <h1 className="doc-h1">{title}</h1>
      <p className="ds-lead">{lead}</p>
      {importCode && <CodeBlock code={importCode} lang="tsx" className="doc-import" />}
    </header>
  );
}

/* ── Sections ────────────────────────────────────────────────────────────
   H2 sections get ids for deep-linking; H3 subsections divide examples.
-------------------------------------------------------------------------- */
export function DocSection({
  id,
  title,
  lead,
  children,
  className,
}: {
  id: string;
  title: string;
  lead?: React.ReactNode;
  children?: React.ReactNode;
  className?: string;
}) {
  return (
    <section id={id} className={cn("doc-section", className)}>
      <h2 className="doc-h2">
        <a href={`#${id}`} className="doc-anchor">
          {title}
        </a>
      </h2>
      {lead && <p className="ds-lead">{lead}</p>}
      {children}
    </section>
  );
}

export function DocH3({ children }: { children: React.ReactNode }) {
  return <h3 className="ds-h3">{children}</h3>;
}

/** Inline code chip, matching the system's .ds-code styling. */
export function Code({ children }: { children: React.ReactNode }) {
  return <code className="ds-code">{children}</code>;
}

/** Body prose paragraph with a comfortable measure. */
export function Prose({ children }: { children: React.ReactNode }) {
  return <p className="doc-prose">{children}</p>;
}

/* ── Related components footer ──────────────────────────────────────────── */
import Link from "next/link";
import { ALL_PAGES } from "@/components/docs/nav";
import { Icon } from "@/components/dc/icon";

export function Related({ hrefs }: { hrefs: string[] }) {
  const pages = hrefs
    .map((href) => ALL_PAGES.find((p) => p.href === href))
    .filter((p): p is NonNullable<typeof p> => Boolean(p));
  if (pages.length === 0) return null;
  return (
    <DocSection id="related" title="Related">
      <ul className="doc-related">
        {pages.map((p) => (
          <li key={p.href}>
            <Link href={p.href} className="doc-related-link">
              <span className="doc-related-label">{p.label}</span>
              <Icon name="arrow" size={15} className="doc-related-arrow" />
            </Link>
          </li>
        ))}
      </ul>
    </DocSection>
  );
}

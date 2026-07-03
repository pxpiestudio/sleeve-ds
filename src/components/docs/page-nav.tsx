"use client";

import * as React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

import { neighborsOf } from "@/components/docs/nav";
import { Icon } from "@/components/dc/icon";

/**
 * Prev/next reading-order pager rendered by the docs layout under every page.
 * Route-driven, so individual pages don't wire it up.
 */
export function PageNav() {
  const pathname = usePathname();
  const { prev, next } = neighborsOf(pathname);
  if (!prev && !next) return null;

  return (
    <nav className="doc-pagenav" aria-label="Previous and next page">
      {prev ? (
        <Link href={prev.href} className="doc-pagenav-link prev">
          <span className="doc-pagenav-dir">
            <Icon name="arrowL" size={13} /> Previous
          </span>
          <span className="doc-pagenav-label">{prev.label}</span>
        </Link>
      ) : (
        <span />
      )}
      {next ? (
        <Link href={next.href} className="doc-pagenav-link next">
          <span className="doc-pagenav-dir">
            Next <Icon name="arrow" size={13} />
          </span>
          <span className="doc-pagenav-label">{next.label}</span>
        </Link>
      ) : (
        <span />
      )}
    </nav>
  );
}

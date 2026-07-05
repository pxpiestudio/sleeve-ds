import type { Metadata } from "next";
import Link from "next/link";

import { Button } from "@/components/ui/button";
import { DOCS_NAV } from "@/components/docs/nav";
import { DocSection, Prose } from "@/components/docs/doc-bits";

export const metadata: Metadata = {
  title: "Introduction",
  description:
    "The Sleeve System — a themeable React + Tailwind foundation for the Deckcenter marketplace. Tokens, components, and patterns, documented.",
};

const PRINCIPLES = [
  {
    title: "One source of truth",
    body: "Every color, radius, and easing lives in a CSS custom property. Components never hardcode a value the token layer already owns — restyle the token and the whole system follows.",
  },
  {
    title: "Themeable by default",
    body: "Light and dark are the same components resolving the same tokens. A single .dark class on <html> flips every surface; an --accent override rebrands every CTA.",
  },
  {
    title: "Accessible, verifiably",
    body: "WCAG 2 AA isn't a review step — it's enforced by static lint, a contrast unit suite over every text/background token pair, and an axe scan of every page in both themes.",
  },
  {
    title: "Marketplace-native",
    body: "Beyond primitives, the system ships the domain surfaces Deckcenter is built from: product cards, grade badges, order lifecycles, and dense order inboxes.",
  },
];

export default function HomePage() {
  const foundations = DOCS_NAV.find((g) => g.title === "Foundations")!;
  const components = DOCS_NAV.find((g) => g.title === "Components")!;
  const patterns = DOCS_NAV.find((g) => g.title === "Patterns")!;

  return (
    <div>
      {/* ── Hero ── */}
      <section className="doc-page-header" aria-labelledby="home-title">
        <div
          style={{
            position: "relative",
            overflow: "hidden",
            borderRadius: "calc(var(--radius) * 1.4)",
            background: "var(--navy-surface)",
            padding: "52px 48px",
          }}
        >
          <div
            aria-hidden="true"
            style={{
              position: "absolute",
              inset: 0,
              background:
                "radial-gradient(600px 360px at 88% 120%, color-mix(in oklch,var(--accent) 55%,transparent), transparent 60%), radial-gradient(520px 320px at 6% -20%,color-mix(in oklch,var(--purple) 50%,transparent),transparent 60%)",
              opacity: 0.85,
            }}
          />
          <div style={{ position: "relative", zIndex: 2, maxWidth: 640 }}>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/assets/deckcenter-logo.svg"
              alt="Deckcenter"
              style={{ height: 72, width: "auto", marginBottom: 24 }}
            />
            <h1
              id="home-title"
              style={{
                fontSize: "clamp(28px,3.5vw,44px)",
                color: "#fff",
                lineHeight: 1.05,
                margin: "0 0 14px",
              }}
            >
              Sleeve System
            </h1>
            <p
              style={{
                color: "rgba(232,237,249,.75)",
                fontSize: 16,
                lineHeight: 1.6,
                margin: "0 0 26px",
                maxWidth: "52ch",
              }}
            >
              The design system behind the Deckcenter marketplace — tokens,
              components, and patterns for React, Tailwind, and shadcn, in
              light and dark. Documented the way we expect it to be used.
            </p>
            <div style={{ display: "flex", gap: 10, flexWrap: "wrap" }}>
              <Button asChild>
                <Link href="/getting-started">Get started</Link>
              </Button>
              <Button
                asChild
                variant="ghost"
                className="border-white/25 bg-white/10 text-white hover:bg-white/20"
              >
                <Link href="/components">Browse components</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* ── Principles — plain two-column prose, deliberately not cards ── */}
      <DocSection
        id="principles"
        title="Principles"
        lead="Four commitments shape every token and component in this system."
      >
        <div className="doc-principles">
          {PRINCIPLES.map((p) => (
            <div key={p.title}>
              <h3 className="doc-principle-title">{p.title}</h3>
              <p className="doc-principle-body">{p.body}</p>
            </div>
          ))}
        </div>
      </DocSection>

      {/* ── Section index — one card per top-level section ── */}
      <DocSection
        id="sections"
        title="Explore the system"
        lead="Three sections, reading order top to bottom: what everything inherits, what's built from it, and how it composes into product flows."
      >
        <nav aria-label="Documentation sections" className="doc-category-grid">
          <Link href={foundations.pages[0].href} className="doc-category-card">
            <span className="doc-category-title">{foundations.title}</span>
            <span className="doc-category-desc">
              The decisions everything else inherits: color, type, space,
              depth, and motion.
            </span>
            <span className="doc-category-count">
              {foundations.pages.length} pages
            </span>
          </Link>
          <Link href="/components" className="doc-category-card">
            <span className="doc-category-title">{components.title}</span>
            <span className="doc-category-desc">
              Primitives in the shadcn architecture, plus the marketplace
              surfaces built on them.
            </span>
            <span className="doc-category-count">
              {components.pages.length - 1} pages
            </span>
          </Link>
          <Link href={patterns.pages[0].href} className="doc-category-card">
            <span className="doc-category-title">{patterns.title}</span>
            <span className="doc-category-desc">
              How components compose into the flows the marketplace runs on.
            </span>
            <span className="doc-category-count">
              {patterns.pages.length} pages
            </span>
          </Link>
        </nav>
      </DocSection>

      {/* ── Status ── */}
      <DocSection
        id="status"
        title="Version & status"
        lead="Sleeve System v2.1 ships as @pxpiestudio/sleeve-ds."
      >
        <Prose>
          The documentation app and the published package render from the same
          source of truth — the components on these pages are the components
          consumers import, and the stylesheet powering this site is the one
          the package ships. Audit coverage: static a11y lint, a WCAG contrast
          unit suite, and an axe scan of every documentation page in both
          themes.
        </Prose>
      </DocSection>
    </div>
  );
}

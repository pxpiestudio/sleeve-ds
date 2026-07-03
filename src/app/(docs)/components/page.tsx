import type { Metadata } from "next";
import Link from "next/link";

import { DOCS_NAV } from "@/components/docs/nav";
import { PageHeader, DocSection } from "@/components/docs/doc-bits";
import { ComponentPreview } from "@/components/docs/component-previews";

export const metadata: Metadata = {
  title: "Components",
  description: "Every component in the Sleeve System at a glance.",
};

export default function ComponentsIndexPage() {
  const pages = DOCS_NAV.find((g) => g.title === "Components")!.pages.filter(
    (p) => p.href !== "/components",
  );

  const primitives = pages.filter((p) =>
    ["/components/button", "/components/badge", "/components/card", "/components/input"].includes(p.href),
  );
  const domain = pages.filter((p) => !primitives.includes(p));

  return (
    <div>
      <PageHeader
        eyebrow="Components"
        title="Components"
        lead={
          <>
            Two tiers: <strong>primitives</strong> follow the shadcn
            architecture (cva variants, asChild composition) and could live in
            any product; <strong>marketplace components</strong> are the
            Deckcenter-specific surfaces built on top of them. All ship from{" "}
            <code className="ds-code">@pxpiestudio/sleeve-ds</code>.
          </>
        }
      />

      <DocSection id="primitives" title="Primitives">
        <nav aria-label="Primitive components" className="doc-tile-grid">
          {primitives.map((p) => (
            <Link key={p.href} href={p.href} className="doc-tile">
              <ComponentPreview href={p.href} />
              <div className="doc-tile-body">
                <span className="doc-tile-title">{p.label}</span>
                <span className="doc-tile-desc">{p.description}</span>
              </div>
            </Link>
          ))}
        </nav>
      </DocSection>

      <DocSection id="marketplace" title="Marketplace components">
        <nav aria-label="Marketplace components" className="doc-tile-grid">
          {domain.map((p) => (
            <Link key={p.href} href={p.href} className="doc-tile">
              <ComponentPreview href={p.href} />
              <div className="doc-tile-body">
                <span className="doc-tile-title">{p.label}</span>
                <span className="doc-tile-desc">{p.description}</span>
              </div>
            </Link>
          ))}
        </nav>
      </DocSection>
    </div>
  );
}

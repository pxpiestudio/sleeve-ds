import type { Metadata } from "next";

import { StatStripe, MiniBarChart } from "@/components/dc/stat-stripe";
import { PageHeader, DocSection, Prose, Related } from "@/components/docs/doc-bits";
import { Example } from "@/components/docs/example";
import { PropsTable } from "@/components/docs/props-table";
import { DoDont } from "@/components/docs/do-dont";

export const metadata: Metadata = {
  title: "Stat stripe",
  description: "A hairline-divided grid of headline metrics, plus a mini bar chart.",
};

export default function StatStripePage() {
  return (
    <div>
      <PageHeader
        eyebrow="Components"
        title="Stat stripe"
        lead="Headline metrics in a single hairline grid — 4-up on desktop, collapsing to 2-up on mobile. Pairs with MiniBarChart for compact trend widgets like a portfolio-value card."
        importCode={`import { StatStripe, MiniBarChart } from "@pxpiestudio/sleeve-ds";`}
      />

      <DocSection id="stripe" title="Stat stripe">
        <Example
          code={`<StatStripe
  cells={[
    { value: "2,310", label: "Cards sold · 24h" },
    { value: "14k", label: "Live listings", accent: true },
    { value: "98%", label: "Verified sellers" },
    { value: "4.9★", label: "Avg rating" },
  ]}
/>`}
        >
          <StatStripe
            cells={[
              { value: "2,310", label: "Cards sold · 24h" },
              { value: "14k", label: "Live listings", accent: true },
              { value: "98%", label: "Verified sellers" },
              { value: "4.9★", label: "Avg rating" },
            ]}
          />
        </Example>
      </DocSection>

      <DocSection id="mini-bar-chart" title="Mini bar chart" lead="Values are 0–100 percentages of the stripe's height; the last bar is always the peak accent color.">
        <Example code={`<MiniBarChart values={[38, 46, 40, 58, 52, 70, 64, 88, 100]} />`}>
          <div style={{ width: 220 }}>
            <MiniBarChart values={[38, 46, 40, 58, 52, 70, 64, 88, 100]} />
          </div>
        </Example>
      </DocSection>

      <DocSection id="api" title="API">
        <PropsTable
          caption="StatStripe props"
          rows={[
            { prop: "cells", type: "StatCell[]", description: "1–4 cells; each is { value, label, accent? }. Required." },
          ]}
        />
        <PropsTable
          caption="MiniBarChart props"
          rows={[
            { prop: "values", type: "number[]", description: "Bar heights as 0–100 percentages. Required." },
          ]}
        />
      </DocSection>

      <DocSection id="usage" title="Usage">
        <Prose>Format numbers (e.g. “14k”, “98%”) before passing them in — the stripe renders values verbatim, same convention as ProductCard&apos;s price.</Prose>
        <DoDont
          dos={["Reserve `accent` for exactly one cell — the metric you want the eye to land on first."]}
          donts={["Don't exceed 4 cells; the grid is fixed to 4 columns."]}
        />
      </DocSection>

      <Related hrefs={["/components/price-comparison", "/components/product-card"]} />
    </div>
  );
}

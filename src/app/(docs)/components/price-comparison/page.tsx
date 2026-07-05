import type { Metadata } from "next";

import { PriceComparison } from "@/components/dc/price-comparison";
import { PageHeader, DocSection, Code, Prose, Related } from "@/components/docs/doc-bits";
import { Example } from "@/components/docs/example";
import { PropsTable } from "@/components/docs/props-table";
import { DoDont } from "@/components/docs/do-dont";

export const metadata: Metadata = {
  title: "Price comparison",
  description:
    "Horizontal tiles comparing a card's price across external marketplaces.",
};

export default function PriceComparisonPage() {
  return (
    <div>
      <PageHeader
        eyebrow="Components"
        title="Price comparison"
        lead={
          <>
            Horizontal tiles showing a card&apos;s price across external
            marketplaces. Deckcenter is deliberately <em>omitted</em> from the
            tiles — it&apos;s the implied context, surfaced in the footer as
            the best price.
          </>
        }
        importCode={`import { PriceComparison, type StorePrice } from "@pxpiestudio/sleeve-ds";`}
      />

      <DocSection
        id="default"
        title="Default"
        lead="Each tile: store logo + name, the price, and its delta over the Deckcenter price. The “Mkt avg” tag marks market-tracked rows."
      >
        <Example
          code={`<PriceComparison
  stores={[
    { store: "TCGplayer", logo: { color: "#2563eb", glyph: "T" },
      price: "$458.00", over: "+$45.50", marketAvg: true },
    { store: "CardMarket", logo: { color: "#1a6e3d", glyph: "C" },
      price: "$441.00", over: "+$28.50" },
    { store: "eBay (avg)", logo: { color: "#e53238", glyph: "e" },
      price: "$472.00", over: "+$59.50", marketAvg: true },
  ]}
  footer={<>Best price: Deckcenter at <strong>$412.50</strong> — save up to $59.50</>}
/>`}
        >
          <PriceComparison
            stores={[
              { store: "TCGplayer", logo: { color: "#2563eb", glyph: "T" }, price: "$458.00", over: "+$45.50", marketAvg: true },
              { store: "CardMarket", logo: { color: "#1a6e3d", glyph: "C" }, price: "$441.00", over: "+$28.50" },
              { store: "eBay (avg)", logo: { color: "#e53238", glyph: "e" }, price: "$472.00", over: "+$59.50", marketAvg: true },
            ]}
            footer={
              <>
                Best price: Deckcenter at{" "}
                <strong style={{ color: "var(--accent-text)" }}>$412.50</strong> — save up to
                $59.50
              </>
            }
          />
        </Example>
      </DocSection>

      <DocSection id="api" title="API">
        <PropsTable
          caption="PriceComparison props"
          rows={[
            { prop: "stores", type: "StorePrice[]", description: "The tiles, in display order. Required." },
            { prop: "footer", type: "ReactNode", description: "Summary line under the tiles — the place to state the Deckcenter price." },
            { prop: "className", type: "string", description: "Applied to the wrapper." },
          ]}
        />
        <PropsTable
          caption="StorePrice shape"
          rows={[
            { prop: "store", type: "string", description: "Marketplace name." },
            { prop: "logo", type: "{ color: string; glyph: string }", description: "Square brand chip: a color and a 1–2 character glyph." },
            { prop: "price", type: "string", description: "Formatted price." },
            { prop: "over", type: "string", description: "Delta vs. the Deckcenter price, e.g. “+$45.50”." },
            { prop: "marketAvg", type: "boolean", default: "false", description: "Shows the “Mkt avg” reference tag." },
          ]}
        />
      </DocSection>

      <DocSection id="accessibility" title="Accessibility">
        <ul className="doc-ul">
          <li>
            Store logos are <Code>aria-hidden</Code> SVGs; the store name is
            adjacent real text.
          </li>
          <li>
            Deltas are literal strings (“+$45.50”), not color-coded values —
            nothing to decode.
          </li>
          <li>
            Tiles wrap to a 2-up grid under 500px; order is reading order.
          </li>
        </ul>
      </DocSection>

      <DocSection id="usage" title="Usage">
        <Prose>
          Keep the comparison honest: <Code>over</Code> is always relative to
          the actual Deckcenter listing shown on the page, and market-average
          rows are tagged so users know which numbers are trackers rather than
          live listings.
        </Prose>
        <DoDont
          dos={[
            "Order tiles by relevance (biggest marketplaces first), not by price.",
            "State the Deckcenter price explicitly in the footer.",
          ]}
          donts={[
            "Don't include Deckcenter as a tile — it's the context, not a competitor.",
            "Don't show more than 4 tiles; the scan breaks down.",
          ]}
        />
      </DocSection>

      <Related hrefs={["/components/product-card", "/foundations/typography"]} />
    </div>
  );
}

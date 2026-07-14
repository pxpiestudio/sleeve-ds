import type { Metadata } from "next";

import { ExpansionTile } from "@/components/dc/expansion-tile";
import { PageHeader, DocSection, Prose, Related } from "@/components/docs/doc-bits";
import { Example } from "@/components/docs/example";
import { PropsTable } from "@/components/docs/props-table";
import { DoDont } from "@/components/docs/do-dont";

export const metadata: Metadata = {
  title: "Expansion tile",
  description: "Set/expansion selector for horizontal rails.",
};

export default function ExpansionTilePage() {
  return (
    <div>
      <PageHeader
        eyebrow="Components"
        title="Expansion tile"
        lead="A set-selector tile for horizontal scroll rails — hue-tinted symbol, name and meta, and a card count that inverts to accent when the tile is active."
        importCode={`import { ExpansionTile } from "@pxpiestudio/sleeve-ds";`}
      />

      <DocSection id="example" title="In a rail" lead="Tiles lift 3px on hover; the active tile gets an accent border, tinted background, and a soft accent ring.">
        <Example
          code={`<ExpansionTile hue={8} symbol="✦" name="151" meta="MEW · 2023" count="4 cards" active />
<ExpansionTile hue={280} symbol="◉" name="Paldea Evolved" meta="PAL · 2023" count="3 cards" />`}
        >
          <div style={{ display: "flex", gap: 14, flexWrap: "wrap" }}>
            <ExpansionTile hue={8} symbol="✦" name="151" meta="MEW · 2023" count="4 cards" active />
            <ExpansionTile hue={280} symbol="◉" name="Paldea Evolved" meta="PAL · 2023" count="3 cards" />
          </div>
        </Example>
      </DocSection>

      <DocSection id="api" title="API">
        <PropsTable
          rows={[
            { prop: "hue", type: "number", description: "0–360 hue seeding the symbol gradient. Required." },
            { prop: "symbol", type: "ReactNode", description: "Short glyph rendered on the symbol (e.g. a single character). Required." },
            { prop: "name", type: "string", description: "Expansion name — truncates with an ellipsis. Required." },
            { prop: "meta", type: "string", description: 'Secondary line (e.g. "MEW · 2023"). Required.' },
            { prop: "count", type: "string", description: 'Card count (e.g. "4 cards"). Required.' },
            { prop: "active", type: "boolean", default: "false", description: "Selected state — accent border/background/ring." },
          ]}
        />
      </DocSection>

      <DocSection id="usage" title="Usage">
        <Prose>Render tiles inside a horizontally-scrolling, snap-aligned rail; the tile itself doesn&apos;t manage scroll — that&apos;s the container&apos;s concern.</Prose>
        <DoDont
          dos={["Keep exactly one tile active at a time within a rail."]}
          donts={["Don't wrap the tile's text in additional headings — name/meta already carry the right weight and size."]}
        />
      </DocSection>

      <Related hrefs={["/components/product-card", "/components/seller-card"]} />
    </div>
  );
}

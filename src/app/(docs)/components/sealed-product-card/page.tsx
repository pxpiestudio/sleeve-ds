import type { Metadata } from "next";

import { SealedProductCard } from "@/components/dc/sealed-card";
import { PageHeader, DocSection, Prose, Related } from "@/components/docs/doc-bits";
import { Example } from "@/components/docs/example";
import { PropsTable } from "@/components/docs/props-table";
import { DoDont } from "@/components/docs/do-dont";

export const metadata: Metadata = {
  title: "Sealed product card",
  description: "Metallic hue-tinted placeholder for booster boxes, ETBs, and other sealed product.",
};

export default function SealedProductCardPage() {
  return (
    <div>
      <PageHeader
        eyebrow="Components"
        title="Sealed product card"
        lead={
          <>
            <code className="ds-code">.tsealed</code> — the sealed-product
            counterpart to <code className="ds-code">CardArt</code>&apos;s
            single-card <code className="ds-code">.tcard</code>: a metallic
            gradient with diagonal foil stripes and a shine sweep, standing in
            until real box art is available.
          </>
        }
        importCode={`import { SealedProductCard } from "@pxpiestudio/sleeve-ds";`}
      />

      <DocSection id="example" title="Example">
        <Example
          code={`<SealedProductCard hue={48} type="ETB" name="Surging Sparks" style={{ width: 120 }} />
<SealedProductCard hue={8} type="Box" name="151" style={{ width: 120 }} />`}
        >
          <div style={{ display: "flex", gap: 18 }}>
            <SealedProductCard hue={48} type="ETB" name="Surging Sparks" style={{ width: 120 }} />
            <SealedProductCard hue={8} type="Box" name="151" style={{ width: 120 }} />
          </div>
        </Example>
      </DocSection>

      <DocSection id="api" title="API">
        <PropsTable
          rows={[
            { prop: "hue", type: "number", default: "8", description: "0–360 hue seeding the metallic gradient." },
            { prop: "type", type: "string", description: 'Product type label (e.g. "ETB", "Box"). Required.' },
            { prop: "name", type: "string", description: "Product/expansion name. Required." },
          ]}
        />
      </DocSection>

      <DocSection id="usage" title="Usage">
        <Prose>Set an explicit width via <code className="ds-code">style</code> or a wrapping grid — the card is a fixed 5:7 aspect ratio, matching CardArt.</Prose>
        <DoDont
          dos={["Reuse the same hue across a product line for a coherent shelf."]}
          donts={["Don't use SealedProductCard for single cards — that's CardArt/.tcard."]}
        />
      </DocSection>

      <Related hrefs={["/components/card-art", "/components/product-card"]} />
    </div>
  );
}

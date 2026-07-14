import type { Metadata } from "next";

import { SellerCard } from "@/components/dc/seller-card";
import { PageHeader, DocSection, Prose, Related } from "@/components/docs/doc-bits";
import { Example } from "@/components/docs/example";
import { PropsTable } from "@/components/docs/props-table";
import { DoDont } from "@/components/docs/do-dont";

export const metadata: Metadata = {
  title: "Seller card",
  description: "Public seller profile summary — avatar, handle, badge, and stats.",
};

export default function SellerCardPage() {
  return (
    <div>
      <PageHeader
        eyebrow="Components"
        title="Seller card"
        lead="A seller's public profile summary for grids and directories — gradient avatar, handle, an optional status badge, and a centered stats row."
        importCode={`import { SellerCard } from "@pxpiestudio/sleeve-ds";`}
      />

      <DocSection id="example" title="Example">
        <Example
          code={`<SellerCard
  hue={330}
  name="VaultCards"
  handle="vaultcards"
  badge="Power Seller"
  stats={{ rating: "4.98", reviews: "3.1k", items: "4.2k" }}
/>`}
        >
          <div style={{ maxWidth: 220 }}>
            <SellerCard
              hue={330}
              name="VaultCards"
              handle="vaultcards"
              badge="Power Seller"
              stats={{ rating: "4.98", reviews: "3.1k", items: "4.2k" }}
            />
          </div>
        </Example>
      </DocSection>

      <DocSection id="api" title="API">
        <PropsTable
          rows={[
            { prop: "hue", type: "number", description: "0–360 hue seeding the avatar gradient. Required." },
            { prop: "name", type: "string", description: "Seller / store name. Required." },
            { prop: "handle", type: "string", description: 'Handle without the "@" — the component adds it. Required.' },
            { prop: "badge", type: "string", description: 'Optional status pill (e.g. "Power Seller").' },
            { prop: "stats", type: "{ rating, reviews, items }", description: "Three centered stat pairs. Required." },
          ]}
        />
      </DocSection>

      <DocSection id="usage" title="Usage">
        <Prose>Use in a grid of 3–4 columns on the sellers directory; the card centers everything, so it reads well at any column count.</Prose>
        <DoDont
          dos={["Keep the badge to one short status word or phrase."]}
          donts={["Don't put a delta/trend chip here — that belongs on ProductCard, not the seller identity card."]}
        />
      </DocSection>

      <Related hrefs={["/components/product-card", "/components/expansion-tile"]} />
    </div>
  );
}

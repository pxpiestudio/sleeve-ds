import type { Metadata } from "next";

import { ListingCard } from "@/components/dc/listing-card";
import { PageHeader, DocSection, Prose, Related } from "@/components/docs/doc-bits";
import { Example } from "@/components/docs/example";
import { PropsTable } from "@/components/docs/props-table";
import { DoDont } from "@/components/docs/do-dont";

export const metadata: Metadata = {
  title: "Listing card",
  description: "One seller's row for a card — grade, seller, and price.",
};

export default function ListingCardPage() {
  return (
    <div>
      <PageHeader
        eyebrow="Components"
        title="Listing card"
        lead={
          <>
            A single seller&apos;s listing for a card: art, title, grade/condition,
            seller line, and price — the row that appears when a buyer drills
            into a card&apos;s active listings. Distinct from{" "}
            <code className="ds-code">ProductCard</code>, which represents the
            aggregate marketplace price across all sellers, not one seller&apos;s row.
          </>
        }
        importCode={`import { ListingCard } from "@pxpiestudio/sleeve-ds";`}
      />

      <DocSection id="example" title="Example">
        <Example
          code={`<ListingCard
  hue={8}
  title="Charizard ex — 151"
  grade="PSA 10"
  condition="Gem Mint"
  seller={{ name: "VaultCards", verified: true, rating: "4.98" }}
  price="$412.50"
  shipping="Ships Today"
/>`}
        >
          <div style={{ maxWidth: 360 }}>
            <ListingCard
              hue={8}
              title="Charizard ex — 151"
              grade="PSA 10"
              condition="Gem Mint"
              seller={{ name: "VaultCards", verified: true, rating: "4.98" }}
              price="$412.50"
              shipping="Ships Today"
            />
          </div>
        </Example>
      </DocSection>

      <DocSection id="api" title="API">
        <PropsTable
          rows={[
            { prop: "hue", type: "number", description: "0–360 hue seeding the art placeholder. Required." },
            { prop: "title", type: "string", description: "Card name — heading font, 16px/700. Required." },
            { prop: "grade", type: "string", description: 'Grading result (e.g. "PSA 10"). Omit for ungraded listings.' },
            { prop: "condition", type: "string", description: 'Condition label (e.g. "Gem Mint", "NM"). Required.' },
            { prop: "seller", type: "{ name, verified?, rating }", description: "Seller line under the grade badges." },
            { prop: "price", type: "string", description: "Formatted price string. Required." },
            { prop: "shipping", type: "string", description: 'Shipping note (e.g. "Ships Today").' },
          ]}
        />
      </DocSection>

      <DocSection id="usage" title="Usage">
        <Prose>
          Reuse the same <code className="ds-code">hue</code> a card&apos;s{" "}
          <code className="ds-code">ProductCard</code> uses so its art tint stays
          consistent when a buyer navigates from the aggregate view into a
          specific listing.
        </Prose>
        <DoDont
          dos={["Pass a stable hue per card ID so art tint doesn't flicker across views."]}
          donts={["Don't use ListingCard for the marketplace-aggregate price — that's ProductCard."]}
        />
      </DocSection>

      <Related hrefs={["/components/product-card", "/components/card-art", "/components/badge"]} />
    </div>
  );
}

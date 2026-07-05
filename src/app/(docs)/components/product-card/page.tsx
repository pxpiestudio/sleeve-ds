import type { Metadata } from "next";

import { ProductCard } from "@/components/dc/product-card";
import { FavoriteProductDemo } from "@/components/docs/demos";
import { PageHeader, DocSection, Code, Prose, Related } from "@/components/docs/doc-bits";
import { Example } from "@/components/docs/example";
import { PropsTable } from "@/components/docs/props-table";
import { DoDont } from "@/components/docs/do-dont";

export const metadata: Metadata = {
  title: "Product card",
  description:
    "The core Deckcenter marketplace surface: art, rarity, price, listings, and trend delta.",
};

export default function ProductCardPage() {
  return (
    <div>
      <PageHeader
        eyebrow="Components"
        title="Product card"
        lead={
          <>
            The core marketplace surface. Each card pairs a hue-tinted art
            placeholder with a heading-font title, mono-flavored meta, and an
            accent price; the whole card lifts 3px under a larger shadow on
            hover.
          </>
        }
        importCode={`import { ProductCard, type PriceDelta } from "@pxpiestudio/sleeve-ds";`}
      />

      <DocSection
        id="grid"
        title="In a grid"
        lead="Cards are designed for a 3-up grid on desktop (collapsing to 1-up on mobile). Hue is per-card, seeded from the card's identity so the same card always renders the same tint."
      >
        <Example
          code={`<ProductCard
  hue={8}
  rarity="Special"
  artLabel="151 · 199/165"
  name="Charizard ex"
  meta="151 · 199/165"
  price="$412.50"
  listings="41 listings"
  delta={{ dir: "up", value: "6.2%" }}
/>`}
        >
          <div className="ds-grid-cards" style={{ maxWidth: 720 }}>
            <ProductCard
              hue={8}
              rarity="Special"
              artLabel="151 · 199/165"
              name="Charizard ex"
              meta="151 · 199/165"
              price="$412.50"
              listings="41 listings"
              delta={{ dir: "up", value: "6.2%" }}
            />
            <ProductCard
              hue={48}
              rarity="Illustration"
              artLabel="151 · 173/165"
              name="Pikachu"
              meta="151 · 173/165"
              price="$134.00"
              listings="28 listings"
              delta={{ dir: "up", value: "11.4%" }}
            />
            <ProductCard
              hue={280}
              rarity="Special"
              artLabel="PAL · 253/193"
              name="Miraidon ex"
              meta="Paldea Evolved · 253/193"
              price="$64.25"
              listings="52 listings"
              delta={{ dir: "down", value: "3.8%" }}
            />
          </div>
        </Example>
      </DocSection>

      <DocSection
        id="favorite"
        title="Favoriting"
        lead="The heart button floats over the art on a blurred surface chip. Wire favorited + onToggleFavorite; the heart fills when active."
      >
        <Example
          code={`const [favorited, setFavorited] = React.useState(false);

<ProductCard
  {...card}
  favorited={favorited}
  onToggleFavorite={() => setFavorited((f) => !f)}
/>`}
        >
          <FavoriteProductDemo />
        </Example>
      </DocSection>

      <DocSection id="api" title="API">
        <PropsTable
          rows={[
            { prop: "hue", type: "number", description: "0–360 hue seeding the art placeholder. Required." },
            { prop: "name", type: "string", description: "Card name — heading font, 15.5px/700. Required." },
            { prop: "meta", type: "string", description: "Set · number line under the name. Required." },
            { prop: "price", type: "string", description: "Formatted price string. Required — formatting is the caller's concern." },
            { prop: "priceLabel", type: "string", default: '"from"', description: "Small label above the price." },
            { prop: "listings", type: "string", description: "Supply line under the price (“41 listings”)." },
            { prop: "delta", type: "PriceDelta", description: <>Trend chip: <Code>{'{ dir: "up" | "down", value: string }'}</Code>. Colors via the -text signal tokens.</> },
            { prop: "rarity", type: "string", description: "Rarity chip overlaid top-left on the art." },
            { prop: "artLabel", type: "string", description: "Caption inside the art placeholder." },
            { prop: "favorited", type: "boolean", default: "false", description: "Fills the heart and flips its aria-pressed/label." },
            { prop: "onToggleFavorite", type: "() => void", description: "Heart click handler." },
          ]}
        />
      </DocSection>

      <DocSection id="accessibility" title="Accessibility">
        <ul className="doc-ul">
          <li>
            The favorite button exposes <Code>aria-pressed</Code> and swaps
            its <Code>aria-label</Code> between “Add to favorites” / “Remove
            from favorites”.
          </li>
          <li>
            The trend delta pairs its color with an up/down icon and the
            literal value — never color alone.
          </li>
          <li>
            When cards link to a detail page, wrap the <em>name</em> in the
            link; don&apos;t put a click handler on the card div.
          </li>
        </ul>
      </DocSection>

      <DocSection id="usage" title="Usage">
        <Prose>
          Derive <Code>hue</Code> deterministically (e.g. hash the card ID) so
          re-renders and re-fetches keep each card&apos;s color stable.
        </Prose>
        <DoDont
          dos={[
            "Format prices before passing them in — the card renders strings verbatim.",
            "Keep meta to one line: set name · collector number.",
          ]}
          donts={[
            "Don't omit listings/delta and leave the footer lopsided — pass at least the price block.",
            "Don't use ProductCard for non-listing content; that's what Card is for.",
          ]}
        />
      </DocSection>

      <Related hrefs={["/components/card-art", "/components/badge", "/components/price-comparison"]} />
    </div>
  );
}

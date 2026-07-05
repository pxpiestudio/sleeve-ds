import type { Metadata } from "next";

import { CardArt } from "@/components/dc/card-art";
import { PageHeader, DocSection, Code, Prose, Related } from "@/components/docs/doc-bits";
import { Example } from "@/components/docs/example";
import { PropsTable } from "@/components/docs/props-table";
import { DoDont } from "@/components/docs/do-dont";

export const metadata: Metadata = {
  title: "Card art",
  description:
    "Hue-seeded gradient placeholder for card imagery, with an optional holo shimmer.",
};

const HUES = [8, 48, 140, 200, 260, 300, 320];

export default function CardArtPage() {
  return (
    <div>
      <PageHeader
        eyebrow="Components"
        title="Card art"
        lead={
          <>
            A stand-in for real card imagery: a 5:7 tile whose gradient,
            inner frame, and holo shimmer all key off a single CSS variable{" "}
            <Code>--h</Code> (0–360). When real art lands, swap the gradient
            for an <Code>&lt;img&gt;</Code> — the frame stays.
          </>
        }
        importCode={`import { CardArt } from "@pxpiestudio/sleeve-ds";`}
      />

      <DocSection
        id="hues"
        title="The hue axis"
        lead="One prop spans the whole spectrum. Derive it from the card's identity so color is stable across renders."
      >
        <Example
          code={`<CardArt hue={8} />
<CardArt hue={140} />
<CardArt hue={260} />`}
        >
          <div>
            <div className="hue-row">
              {HUES.map((h) => (
                <CardArt key={h} hue={h} style={{ width: 80, height: 112, borderRadius: 8 }} />
              ))}
            </div>
            <div
              style={{
                display: "flex",
                flexWrap: "wrap",
                gap: 10,
                marginTop: 8,
                fontSize: 11,
                color: "var(--faint)",
                fontFamily: "var(--font-mono)",
              }}
            >
              {HUES.map((h) => (
                <span key={h} style={{ width: 80, textAlign: "center" }}>
                  --h:{h}
                </span>
              ))}
            </div>
          </div>
        </Example>
      </DocSection>

      <DocSection
        id="label-holo"
        title="Label & holo"
        lead="An optional mono caption sits in the corner; the holo shimmer is on by default and disabled for small thumbnails."
      >
        <Example
          code={`<CardArt hue={320} label="151 · 199/165" />
<CardArt hue={320} holo={false} />  {/* thumbnails */}`}
        >
          <div className="ds-row" style={{ gap: 16 }}>
            <CardArt hue={320} label="151 · 199/165" style={{ width: 120, height: 168 }} />
            <CardArt hue={320} holo={false} style={{ width: 120, height: 168 }} />
            <CardArt hue={320} holo={false} style={{ width: 32, height: 44, borderRadius: 6 }} />
          </div>
        </Example>
        <Prose>
          The inbox row uses exactly that last form — a 32×44 no-holo
          thumbnail. Its <Code>dim</Code> treatment fades this element only,
          never the row&apos;s text.
        </Prose>
      </DocSection>

      <DocSection id="api" title="API">
        <PropsTable
          rows={[
            { prop: "hue", type: "number", default: "320", description: "0–360 hue seeding gradient and shimmer." },
            { prop: "label", type: "string", description: "Mono caption rendered in the bottom corner." },
            { prop: "holo", type: "boolean", default: "true", description: "Render the holo shimmer overlay. Turn off below ~60px width." },
            { prop: "...props", type: 'ComponentProps<"div">', description: "Size via style/className; aspect ratio defaults to 5:7." },
          ]}
        />
      </DocSection>

      <DocSection id="accessibility" title="Accessibility">
        <ul className="doc-ul">
          <li>
            The tile is decorative — it exposes no text alternative of its
            own. The accessible name of a listing lives in the adjacent title.
          </li>
          <li>
            The label caption is white-on-gradient at 9px and is duplicated
            in real text nearby (e.g. the card&apos;s meta line) — treat it as
            ornament, not information.
          </li>
        </ul>
      </DocSection>

      <DocSection id="usage" title="Usage">
        <DoDont
          dos={[
            "Hash a stable ID into the hue so the same card is always the same color.",
            "Disable holo on thumbnails — at small sizes it reads as noise.",
          ]}
          donts={[
            "Don't convey rarity or condition through hue; those have badges.",
            "Don't stretch the tile off its 5:7 ratio except for deliberate thumbnail crops.",
          ]}
        />
      </DocSection>

      <Related hrefs={["/components/product-card", "/components/inbox-row"]} />
    </div>
  );
}

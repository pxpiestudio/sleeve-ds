import type { Metadata } from "next";

import { PageHeader, DocSection, DocH3, Prose, Code } from "@/components/docs/doc-bits";
import { DoDont } from "@/components/docs/do-dont";
import {
  LogoAnatomy,
  ClearSpaceDiagram,
  ScaleRow,
  IncorrectUsageGrid,
} from "@/components/docs/logo-bits";

export const metadata: Metadata = {
  title: "Brand & logo",
  description:
    "Construction, clear space, scale, and incorrect-usage rules for the Deckcenter wordmark and the deckbox mark.",
};

const LOGO_VARIANTS = [
  {
    src: "/assets/deckcenter-logo.svg",
    alt: "Deckcenter logo",
    caption: "Default lockup",
    detail: "Self-backed (own navy plate) — safe on any background",
    boxStyle: { background: "var(--surface)", border: "1px solid var(--border)" },
  },
  {
    src: "/assets/deckcenter-mark.svg",
    alt: "Deckcenter mark",
    caption: "Mark only",
    detail: "Favicons, avatars, the docs sidebar",
    boxStyle: { background: "var(--surface)", border: "1px solid var(--border)" },
  },
];

export default function BrandPage() {
  return (
    <div>
      <PageHeader
        eyebrow="Foundations"
        title="Brand & logo"
        lead={
          <>
            Deckcenter&apos;s identity is a wordmark, a standalone mark, and
            four hues — magenta <Code>#de0e7f</Code>, purple{" "}
            <Code>#8a2bb8</Code>, navy <Code>#121427</Code>, and lavender{" "}
            <Code>#e8edf9</Code>. This page covers both logo assets in full:
            construction, clear space, scale, and incorrect usage.
          </>
        }
      />

      <DocSection
        id="concept"
        title="Concept"
        lead="Every TCG player owns a deckbox — the case that protects their deck between games. That premise names the product and draws the mark."
      >
        <div className="ds-grid-2" style={{ gap: 28, alignItems: "center" }}>
          <div
            className="ds-canvas"
            style={{
              background: "#121427",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              padding: 40,
            }}
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/assets/deckcenter-logo.svg"
              alt="Deckcenter core logo: the wordmark locked up with the isometric deckbox mark, a card sliding out of it"
              style={{ height: 130 }}
            />
          </div>
          <div>
            <Prose>
              <strong>Deckcenter</strong> is a compound of <em>deck</em> — the
              stack of cards a player builds, sleeves, and protects — and{" "}
              <em>center</em> — the marketplace hub where every deck, box, and
              accessory changes hands. The name states the product in two
              words: a dedicated center built around the deck.
            </Prose>
            <Prose>
              The mark reads the same way. It&apos;s an isometric deckbox,
              faceted for depth, with a single card sliding out along the
              diagonal — caught mid-draw, the way a card leaves a box at the
              table. The box stands for the marketplace&apos;s role: a place
              that holds and protects the collection. The card leaving it is
              the transaction — a listing going live, a card changing hands,
              a deck getting drafted.
            </Prose>
          </div>
        </div>
      </DocSection>

      {/* ══════════════════════ CORE LOGO (wordmark) ══════════════════════ */}
      <DocSection
        id="core-logo"
        title="Core logo"
        lead="The wordmark never appears alone — it's always locked up with the deckbox mark. Together they're a single fixed asset, not two elements to be recomposed."
      >
        <DocH3>Construction</DocH3>
        <Prose>
          The core logo is built from two independent pieces — the wordmark (
          <Code>word-logo.svg</Code>) and the deckbox mark (
          <Code>deckcenter-mark.svg</Code>) — that also ship pre-assembled as
          one fixed lockup (<Code>deckcenter-logo.svg</Code>) at a native
          325×169 canvas. Always use the pre-assembled lockup in product; the
          separate files exist for reference, not for hand-recomposing the
          layout. In the lockup, the mark is anchored to the right edge —
          flush top and bottom — occupying the right 42% of the width (136 of
          325 units), with the wordmark filling the remaining 58% on the
          left.
        </Prose>
        <LogoAnatomy />

        <DocH3>Clear space</DocH3>
        <Prose>
          Keep a minimum clear space of <strong>X</strong> — one quarter of
          the lockup&apos;s rendered height — free of text, icons, borders,
          and other logos on all four sides. The same unit governs the
          logomark below, so the two assets share one clear-space system.
        </Prose>
        <ClearSpaceDiagram src="/assets/deckcenter-logo.svg" imgHeight={132} />

        <DocH3>Scalability</DocH3>
        <Prose>
          The lockup is vector — there&apos;s no technical upper limit, only
          a practical one: don&apos;t render it larger than the most
          prominent text on the surface it sits beside.{" "}
          <strong>Minimum digital size is 30px</strong> tall, matching the
          compact navbar treatment below the 800px breakpoint — the smallest
          the lockup ever renders in product chrome. Below that, the
          letterforms in <Code>DECK</Code>/<Code>CENTER</Code> start to
          clot. In print, don&apos;t go below <strong>0.35in (≈9mm)</strong>{" "}
          tall. Scale uniformly from this floor; never stretch one axis.
        </Prose>
        <ScaleRow
          src="/assets/deckcenter-logo.svg"
          steps={[
            { height: 30, min: true },
            { height: 54 },
            { height: 96 },
            { height: 150 },
          ]}
        />

        <DocH3>Incorrect usage</DocH3>
        <IncorrectUsageGrid
          items={[
            {
              caption: "Don't stretch or squash the lockup on one axis — it flattens the isometric facets and warps the letterforms.",
              src: "/assets/deckcenter-logo.svg",
              imgHeight: 54,
              imgStyle: { transform: "scaleX(1.6)" },
            },
            {
              caption: "Don't rotate the lockup off its horizontal baseline.",
              src: "/assets/deckcenter-logo.svg",
              imgHeight: 54,
              imgStyle: { transform: "rotate(-16deg)" },
            },
            {
              caption: "Don't recolor the wordmark or the mark — the four brand hues are fixed, not swappable.",
              src: "/assets/deckcenter-logo.svg",
              imgHeight: 54,
              imgStyle: { filter: "hue-rotate(150deg) saturate(1.6)" },
            },
            {
              caption: "Don't add a stroke, keyline, or halo around the lockup.",
              src: "/assets/deckcenter-logo.svg",
              imgHeight: 54,
              frameStyle: { background: "#121427" },
              imgStyle: {
                filter:
                  "drop-shadow(1.4px 0 0 #e8edf9) drop-shadow(-1.4px 0 0 #e8edf9) drop-shadow(0 1.4px 0 #e8edf9) drop-shadow(0 -1.4px 0 #e8edf9)",
              },
            },
            {
              caption: "Don't add drop shadows, glows, or bevels — the mark's own facets already carry all the depth it needs.",
              src: "/assets/deckcenter-logo.svg",
              imgHeight: 54,
              imgStyle: { filter: "drop-shadow(8px 12px 10px rgba(18,20,39,.55))" },
            },
            {
              caption: "Don't place the lockup over gradients, photography, or busy art without a solid navy band behind it.",
              src: "/assets/deckcenter-logo.svg",
              imgHeight: 54,
              frameStyle: {
                background: "linear-gradient(135deg, #ff8a65, #7c4dff 45%, #26c6da)",
              },
            },
            {
              caption: "Don't crowd the lockup — always keep at least X of clear space on every side.",
              src: "/assets/deckcenter-logo.svg",
              imgHeight: 66,
              frameStyle: { padding: 4, border: "3px solid var(--danger)" },
            },
          ]}
        />
      </DocSection>

      {/* ══════════════════════════ LOGOMARK ══════════════════════════════ */}
      <DocSection
        id="logomark"
        title="Logomark"
        lead="The mark stands in for the full lockup once the brand is already established in context — favicons, avatars, the docs sidebar — never as a first introduction to the brand."
      >
        <DocH3>Construction</DocH3>
        <Prose>
          Seven flat facets build the box and the card exiting it — each one
          a step darker or lighter than its neighbor, which is what reads as
          isometric depth without any actual 3D.
        </Prose>
        <Prose>
          The mark&apos;s native canvas is 136×162 (roughly 5:6, taller than
          wide) — the box reads as a container, not a badge.
        </Prose>

        <DocH3>Clear space</DocH3>
        <Prose>
          Same system as the core logo: keep <strong>X</strong> — one quarter
          of the mark&apos;s rendered height — clear on all four sides.
        </Prose>
        <ClearSpaceDiagram src="/assets/deckcenter-mark.svg" imgHeight={115} />

        <DocH3>Scalability</DocH3>
        <Prose>
          The mark scales smaller than the lockup because it carries no
          type to blur — its facets are flat, high-contrast shapes with no
          fine detail.{" "}
          <strong>Minimum digital size is 16px</strong> tall, small enough
          for a browser tab or an avatar circle. In product chrome today it
          never actually goes below 32px (the docs sidebar), which is
          comfortably above that floor. Scale uniformly, preserving the
          native 5:6 proportions — never stretch one axis independently, or
          the isometric illusion collapses.
        </Prose>
        <ScaleRow
          src="/assets/deckcenter-mark.svg"
          steps={[
            { height: 16, min: true },
            { height: 32 },
            { height: 64 },
            { height: 128 },
          ]}
        />

        <DocH3>Incorrect usage</DocH3>
        <IncorrectUsageGrid
          items={[
            {
              caption: "Don't flip or mirror the mark — the card slides out to the right, matching the wordmark's reading direction.",
              src: "/assets/deckcenter-mark.svg",
              imgHeight: 72,
              imgStyle: { transform: "scaleX(-1)" },
            },
            {
              caption: "Don't rotate the mark off its isometric angle.",
              src: "/assets/deckcenter-mark.svg",
              imgHeight: 72,
              imgStyle: { transform: "rotate(24deg)" },
            },
            {
              caption: "Don't recolor the facets — magenta, purple, navy, and lavender are fixed brand tokens.",
              src: "/assets/deckcenter-mark.svg",
              imgHeight: 72,
              imgStyle: { filter: "hue-rotate(210deg) saturate(1.5)" },
            },
            {
              caption: "Don't flatten the facets to a single tone — the seven-step shading is what reads as a box, not a badge.",
              src: "/assets/deckcenter-mark.svg",
              imgHeight: 72,
              imgStyle: { filter: "grayscale(1) contrast(0.85) brightness(1.2)" },
            },
            {
              caption: "Don't drop the mark into a frame, badge, or container shape — let it sit on open space.",
              src: "/assets/deckcenter-mark.svg",
              imgHeight: 52,
              frameStyle: {
                borderRadius: "50%",
                background: "var(--surface-2)",
                border: "3px solid var(--border-strong)",
              },
            },
            {
              caption: "Don't add a stroke or keyline around the mark.",
              src: "/assets/deckcenter-mark.svg",
              imgHeight: 72,
              frameStyle: { background: "#121427" },
              imgStyle: {
                filter:
                  "drop-shadow(1.4px 0 0 #e8edf9) drop-shadow(-1.4px 0 0 #e8edf9) drop-shadow(0 1.4px 0 #e8edf9) drop-shadow(0 -1.4px 0 #e8edf9)",
              },
            },
            {
              caption: "Don't crop the mark — always show the complete box and the card sliding out of it.",
              src: "/assets/deckcenter-mark.svg",
              imgHeight: 90,
              imgStyle: { clipPath: "inset(0 0 38% 0)" },
            },
          ]}
        />
      </DocSection>

      <DocSection
        id="variants"
        title="Logo variants"
        lead="Two assets cover every placement: the self-backed default lockup, and the mark alone."
      >
        <div className="ds-grid-2" style={{ gap: 14 }}>
          {LOGO_VARIANTS.map((v) => (
            <div key={v.caption}>
              <div
                style={{
                  borderRadius: "var(--radius)",
                  padding: 28,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  ...v.boxStyle,
                }}
              >
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={v.src} alt={v.alt} style={{ height: 52 }} />
              </div>
              <div
                style={{
                  fontSize: 12,
                  color: "var(--faint)",
                  fontWeight: 600,
                  textAlign: "center",
                  marginTop: 8,
                }}
              >
                {v.caption}
              </div>
              <div
                style={{
                  fontSize: 11,
                  color: "var(--faint)",
                  textAlign: "center",
                  marginTop: 2,
                }}
              >
                {v.detail}
              </div>
            </div>
          ))}
        </div>
        <Prose>
          In product chrome, the default lockup renders at 38px height in the
          navbar (30px under 800px viewports) and the mark renders at 32px in
          the docs sidebar. The navbar applies a playful hover (
          <Code>rotate(-2deg) scale(1.03)</Code>) — that interaction is
          reserved for the primary logo link only.
        </Prose>
      </DocSection>

      <DocSection id="usage" title="General usage">
        <DoDont
          dos={[
            "Use the provided SVG assets — they scale and inherit nothing.",
            "Keep the mark square and unclipped in avatar slots.",
            "Scale either asset uniformly, keeping its native proportions.",
          ]}
          donts={[
            "Don't recolor, skew, or add effects to the wordmark or the mark.",
            "Don't set the logo over card art or gradient washes without the navy band behind it.",
            "Don't use the mark at sizes where the full lockup would still be legible.",
            "Don't detach the card from the box or straighten its diagonal — it has to read as mid-slide, not as a separate icon.",
          ]}
        />
      </DocSection>
    </div>
  );
}

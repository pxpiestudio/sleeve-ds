import type { Metadata } from "next";

import { PageHeader, DocSection, Code, Prose } from "@/components/docs/doc-bits";
import { TypeRow } from "@/components/docs/foundation-bits";
import { TokenTable } from "@/components/docs/token-table";
import { DoDont } from "@/components/docs/do-dont";
import { CodeBlock } from "@/components/docs/code-block";

export const metadata: Metadata = {
  title: "Typography",
  description:
    "Saira for headings and numerals, Geist for body copy — the Sleeve System type scale.",
};

const FACES = [
  {
    kicker: "Display / Headings",
    font: "var(--font-head)",
    weight: 700,
    ls: "-0.03em",
    name: "Saira",
    token: "--font-head",
  },
  {
    kicker: "Body / Inputs",
    font: "var(--font-body)",
    weight: 500,
    ls: "-0.01em",
    name: "Geist",
    token: "--font-body",
  },
];

export default function TypographyPage() {
  return (
    <div>
      <PageHeader
        eyebrow="Foundations"
        title="Typography"
        lead={
          <>
            <strong>Saira</strong> carries headings, labels, prices, and
            numerals with tight <Code>−0.02em</Code> tracking.{" "}
            <strong>Geist</strong> handles body copy and inputs.{" "}
            <strong>Geist Mono</strong> is reserved for code and token names.
          </>
        }
      />

      <DocSection
        id="faces"
        title="Typefaces"
        lead="Both families load via next/font with display: swap in weights 400–700."
      >
        <div className="ds-grid-2" style={{ marginBottom: 16 }}>
          {FACES.map((f) => (
            <div
              key={f.name}
              style={{
                background: "var(--surface)",
                border: "1px solid var(--border)",
                borderRadius: "var(--radius)",
                padding: 24,
                boxShadow: "var(--shadow)",
              }}
            >
              <div
                style={{
                  fontSize: 11,
                  fontWeight: 700,
                  letterSpacing: ".08em",
                  textTransform: "uppercase",
                  color: "var(--faint)",
                }}
              >
                {f.kicker}
              </div>
              <div
                style={{
                  fontFamily: f.font,
                  fontWeight: f.weight,
                  fontSize: 56,
                  letterSpacing: f.ls,
                  lineHeight: 1,
                  margin: "10px 0",
                }}
                aria-hidden="true"
              >
                Aa
              </div>
              <div style={{ fontFamily: "var(--font-head)", fontWeight: 700, fontSize: 16 }}>
                {f.name}
              </div>
              <div style={{ color: "var(--muted)", fontSize: 12.5, marginTop: 4 }}>
                400 · 500 · 600 · 700 — <Code>{f.token}</Code>
              </div>
            </div>
          ))}
        </div>
        <TokenTable
          rows={[
            { token: "--font-head", light: "Saira", dark: "Saira", usage: "Headings, card titles, prices, eyebrow labels, stat values.", noSwatch: true },
            { token: "--font-body", light: "Geist", dark: "Geist", usage: "Body copy, inputs, buttons, badges, meta text.", noSwatch: true },
            { token: "--font-mono", light: "Geist Mono", dark: "Geist Mono", usage: "Code, token names, set numbers.", noSwatch: true },
          ]}
        />
      </DocSection>

      <DocSection
        id="scale"
        title="Scale"
        lead="Eight steps cover the whole product. Display and H1 clamp fluidly with the viewport; everything below is fixed."
      >
        <div className="type-scale">
          <TypeRow spec="Saira 700 · clamp→96 / -.035em">
            <span style={{ fontFamily: "var(--font-head)", fontWeight: 700, fontSize: 46, letterSpacing: "-0.035em", lineHeight: 1 }}>
              Display
            </span>
          </TypeRow>
          <TypeRow spec="Saira 700 · clamp→44">
            <span style={{ fontFamily: "var(--font-head)", fontWeight: 700, fontSize: 36, letterSpacing: "-0.02em", lineHeight: 1 }}>
              Heading 1
            </span>
          </TypeRow>
          <TypeRow spec="Saira 700 · 26–30">
            <span style={{ fontFamily: "var(--font-head)", fontWeight: 700, fontSize: 26, letterSpacing: "-0.02em", lineHeight: 1 }}>
              Heading 2
            </span>
          </TypeRow>
          <TypeRow spec="Saira 700 · 15–19">
            <span style={{ fontFamily: "var(--font-head)", fontWeight: 700, fontSize: 18 }}>
              Heading 3 · card titles
            </span>
          </TypeRow>
          <TypeRow spec="Geist 400 · 16–17">
            <span style={{ fontFamily: "var(--font-body)", fontSize: 16, color: "var(--muted)" }}>
              Lead paragraph — comfortable reading for intros and subheads.
            </span>
          </TypeRow>
          <TypeRow spec="Geist 400 · 14–15">
            <span style={{ fontFamily: "var(--font-body)", fontSize: 14.5 }}>
              Body — default UI text across listings, forms and tables.
            </span>
          </TypeRow>
          <TypeRow spec="Geist 500 · 12–13">
            <span style={{ fontFamily: "var(--font-body)", fontSize: 12.5, color: "var(--muted)" }}>
              Small — meta, captions and helper text.
            </span>
          </TypeRow>
          <TypeRow spec="Saira 700 · 11 · .14em caps">
            <span style={{ fontFamily: "var(--font-head)", fontSize: 11, fontWeight: 700, letterSpacing: ".14em", textTransform: "uppercase", color: "var(--accent-text)" }}>
              EYEBROW LABEL
            </span>
          </TypeRow>
        </div>
      </DocSection>

      <DocSection
        id="in-code"
        title="In code"
        lead="Headings pick up Saira automatically from the base layer; opt into a face anywhere else with the mapped Tailwind utilities."
      >
        <CodeBlock
          code={`{/* h1–h4 inherit font-head, 700, -0.02em tracking from @layer base */}
<h2>Trending singles</h2>

{/* Tailwind utilities map to the same tokens */}
<span className="font-head text-lg font-bold">$412.50</span>
<p className="font-body text-sm text-muted">28 listings from $134</p>
<code className="font-mono">151 · 199/165</code>`}
        />
        <Prose>
          The base layer also applies <Code>text-wrap: balance</Code> to
          headings and antialiasing to the body — components don&apos;t need
          to restate either.
        </Prose>
      </DocSection>

      <DocSection id="usage" title="Usage">
        <DoDont
          dos={[
            <>Set prices and stat values in Saira (<Code>font-head</Code>) — its tabular feel keeps numerals steady.</>,
            "Keep body copy at 14–15px; use the small step only for genuinely secondary meta.",
            <>Use the eyebrow style (Saira 700 · 11px · 0.14em caps) to introduce sections.</>,
          ]}
          donts={[
            "Don't set long-form copy in Saira — it's a display face; Geist reads better at length.",
            "Don't go below 11px for any text, or below 12.5px for anything essential.",
            "Don't add new weights; 400–700 are loaded, anything else synthesizes badly.",
          ]}
        />
      </DocSection>
    </div>
  );
}

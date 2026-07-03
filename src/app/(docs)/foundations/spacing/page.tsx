import type { Metadata } from "next";

import { PageHeader, DocSection, Code, Prose } from "@/components/docs/doc-bits";
import { TokenTable } from "@/components/docs/token-table";
import { DoDont } from "@/components/docs/do-dont";
import { CodeBlock } from "@/components/docs/code-block";

export const metadata: Metadata = {
  title: "Spacing & radius",
  description:
    "The Sleeve System spacing rhythm, content rail, density multiplier, and radius tokens.",
};

const SPACING_STEPS = [
  { w: 8, label: "inline gaps, chip padding" },
  { w: 12, label: "card inner padding" },
  { w: 16, label: "section gutters" },
  { w: 24, label: "card padding" },
  { w: 48, label: "section side padding" },
  { w: 96, label: "section vertical rhythm" },
];

const RADII = [
  { r: "10px", label: "--radius-sm · ~10px" },
  { r: "var(--radius)", label: "--radius · 18px" },
  { r: "999px", label: "--radius-pill" },
];

export default function SpacingPage() {
  return (
    <div>
      <PageHeader
        eyebrow="Foundations"
        title="Spacing & radius"
        lead={
          <>
            Content lives in a 1240px max-width rail (<Code>--maxw</Code>). A
            single <Code>--d</Code> density multiplier scales padding
            globally, and every corner derives from one <Code>--radius</Code>{" "}
            token.
          </>
        }
      />

      <DocSection
        id="spacing"
        title="Spacing scale"
        lead="Six steps on a 4px grid cover the product. Use the smallest step that creates a legible separation."
      >
        <div
          style={{
            background: "var(--surface)",
            border: "1px solid var(--border)",
            borderRadius: "var(--radius)",
            padding: 22,
          }}
        >
          <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
            {SPACING_STEPS.map((s) => (
              <div key={s.w} style={{ display: "flex", alignItems: "center", gap: 12 }}>
                <div
                  aria-hidden="true"
                  style={{ height: 12, width: s.w, background: "var(--accent)", borderRadius: 2, flexShrink: 0 }}
                />
                <Code>{s.w}</Code>
                <span style={{ fontSize: 12.5, color: "var(--faint)" }}>{s.label}</span>
              </div>
            ))}
          </div>
        </div>
      </DocSection>

      <DocSection
        id="radius"
        title="Radius"
        lead="Every corner in the system derives from --radius, so a single override reshapes the whole product — dial it down for a squarer, more utilitarian feel."
      >
        <div className="ds-grid-2">
          <div
            style={{
              background: "var(--surface)",
              border: "1px solid var(--border)",
              borderRadius: "var(--radius)",
              padding: 22,
            }}
          >
            <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
              {RADII.map((s) => (
                <div key={s.label} style={{ display: "flex", alignItems: "center", gap: 12 }}>
                  <div
                    aria-hidden="true"
                    style={{
                      width: 56,
                      height: 32,
                      background: "var(--accent-soft)",
                      border: "1.5px solid var(--accent)",
                      borderRadius: s.r,
                      flexShrink: 0,
                    }}
                  />
                  <Code>{s.label}</Code>
                </div>
              ))}
            </div>
          </div>
          <div>
            <TokenTable
              rows={[
                { token: "--radius", light: "18px", dark: "18px", usage: "Cards, canvases, modals.", noSwatch: true },
                { token: "--radius-sm", light: "calc(× 0.55)", dark: "calc(× 0.55)", usage: "Nested corners: art inside cards, nav links.", noSwatch: true },
                { token: "--radius-pill", light: "999px", dark: "999px", usage: "Status chips, toggles, the portal button.", noSwatch: true },
              ]}
            />
          </div>
        </div>
      </DocSection>

      <DocSection
        id="density"
        title="Layout & density"
        lead="The rail and the density multiplier are both plain custom properties — override them per app, not per component."
      >
        <CodeBlock
          lang="css"
          code={`:root {
  --maxw: 1240px; /* content rail */
  --d: 1;         /* density multiplier — 0.85 tightens a data-heavy admin */
}`}
        />
        <Prose>
          <Code>--d</Code> exists so a dense context (a seller dashboard, an
          admin table) can compress padding globally without forking component
          styles. Components that opt in multiply their padding by it.
        </Prose>
      </DocSection>

      <DocSection id="usage" title="Usage">
        <DoDont
          dos={[
            "Stay on the scale — 8/12/16/24/48/96 covers virtually every gap.",
            <>Use <Code>--radius-sm</Code> for corners nested inside a <Code>--radius</Code> container so curvature reads concentric.</>,
            <>Let the rail (<Code>--maxw</Code>) own horizontal centering; don&apos;t re-implement it per page.</>,
          ]}
          donts={[
            "Don't invent between-step values like 14px or 20px padding.",
            "Don't hardcode 18px corners — the one app that overrides --radius will look broken.",
            "Don't tighten spacing by editing components; adjust --d at the scope that needs density.",
          ]}
        />
      </DocSection>
    </div>
  );
}

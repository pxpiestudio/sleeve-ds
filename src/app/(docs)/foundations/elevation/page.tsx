import type { Metadata } from "next";

import { PageHeader, DocSection, Code, Prose } from "@/components/docs/doc-bits";
import { TokenTable } from "@/components/docs/token-table";
import { DoDont } from "@/components/docs/do-dont";

export const metadata: Metadata = {
  title: "Elevation",
  description:
    "The two navy-tinted shadow levels of the Sleeve System and where each belongs.",
};

const LEVELS = [
  {
    shadow: "var(--shadow)",
    title: "Default shadow",
    token: "--shadow",
    use: "Cards, dropdowns, nav bar at rest",
  },
  {
    shadow: "var(--shadow-lg)",
    title: "Large shadow",
    token: "--shadow-lg",
    use: "Modals, overlays, hovered cards",
  },
];

export default function ElevationPage() {
  return (
    <div>
      <PageHeader
        eyebrow="Foundations"
        title="Elevation"
        lead={
          <>
            Two shadow levels — that&apos;s the whole system. Both tint toward
            the navy ink (<Code>rgba(18,20,39,…)</Code> in light,{" "}
            <Code>rgba(0,0,0,…)</Code> in dark) so depth feels warm rather
            than cold grey.
          </>
        }
      />

      <DocSection
        id="levels"
        title="Levels"
        lead="Resting surfaces get --shadow; anything that floats above the page — or lifts on hover — steps up to --shadow-lg."
      >
        <div className="ds-grid-2" style={{ marginTop: 4 }}>
          {LEVELS.map((s) => (
            <div
              key={s.token}
              style={{
                background: "var(--surface)",
                borderRadius: "var(--radius)",
                padding: 28,
                boxShadow: s.shadow,
                border: "1px solid var(--border)",
              }}
            >
              <div style={{ fontWeight: 700, fontSize: 14 }}>{s.title}</div>
              <code className="ds-code" style={{ display: "inline-block", marginTop: 8, fontSize: 11 }}>
                {s.token}
              </code>
              <p style={{ fontSize: 12.5, color: "var(--muted)", marginTop: 8, marginBottom: 0 }}>
                {s.use}
              </p>
            </div>
          ))}
        </div>
        <TokenTable
          rows={[
            {
              token: "--shadow",
              light: "0 1px 2px ·6% + 0 8px 24px ·7%",
              dark: "0 1px 2px ·40% + 0 10px 30px ·40%",
              usage: "Ambient resting elevation. Always paired with a 1px --border.",
              noSwatch: true,
            },
            {
              token: "--shadow-lg",
              light: "0 2px 4px ·5% + 0 24px 60px ·16%",
              dark: "0 2px 6px ·50% + 0 30px 70px ·55%",
              usage: "Floating elevation: modals, drawers, hover-lifted cards.",
              noSwatch: true,
            },
          ]}
        />
        <Prose>
          Dark theme shadows are much stronger because dark surfaces barely
          separate tonally — the border does most of the work and the shadow
          adds the depth. That&apos;s also why every elevated surface keeps
          its <Code>--border</Code> in both themes.
        </Prose>
      </DocSection>

      <DocSection id="usage" title="Usage">
        <DoDont
          dos={[
            <>Pair every shadow with a 1px <Code>--border</Code> — the shadow gives depth, the border gives definition in dark mode.</>,
            <>Step from <Code>--shadow</Code> to <Code>--shadow-lg</Code> on hover to signal interactivity (see the product card).</>,
          ]}
          donts={[
            "Don't compose custom box-shadows — two levels is the system.",
            "Don't elevate flat, non-interactive containers like the demo canvases.",
            "Don't use shadows to separate items in a dense list; borders do that.",
          ]}
        />
      </DocSection>
    </div>
  );
}

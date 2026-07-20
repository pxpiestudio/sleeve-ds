import type { Metadata } from "next";
import Link from "next/link";

import { PageHeader, DocSection, DocH3, Code, Prose } from "@/components/docs/doc-bits";
import { Swatch } from "@/components/docs/foundation-bits";
import { TokenTable } from "@/components/docs/token-table";
import { DoDont } from "@/components/docs/do-dont";
import { CodeBlock } from "@/components/docs/code-block";

export const metadata: Metadata = {
  title: "Color",
  description:
    "Brand, surface, and signal color tokens of the Sleeve System, and the WCAG-AA text variants.",
};

export default function ColorPage() {
  return (
    <div>
      <PageHeader
        eyebrow="Foundations"
        title="Color"
        lead={
          <>
            Four brand hues from the Deckcenter logo seed every surface in the
            system. Components only ever reference <em>semantic</em> tokens,
            which resolve per-theme — flip the <Code>.dark</Code> class on{" "}
            <Code>&lt;html&gt;</Code> and everything follows.
          </>
        }
      />

      <DocSection
        id="brand"
        title="Brand palette"
        lead="The fixed, theme-independent brand constants. Magenta is the accent seed; navy is the ink."
      >
        <div className="swatch-grid">
          <Swatch block="#de0e7f" name="Magenta" token="--magenta · #de0e7f" use="Primary accent · CTAs" />
          <Swatch block="#8a2bb8" name="Purple" token="--purple · #8a2bb8" use="Grades · gradients" />
          <Swatch block="#121427" name="Navy" token="--navy · #121427" use="Ink · dark surfaces" />
          <Swatch
            block="#e8edf9"
            name="Lavender"
            token="--lavender · #e8edf9"
            use="On-navy text"
            blockStyle={{ borderBottom: "1px solid var(--border)" }}
          />
        </div>
        <Prose>
          <Code>--accent</Code> defaults to <Code>var(--magenta)</Code> and is
          the only brand hue components bind to directly, which is what makes
          the system re-brandable — see{" "}
          <Link href="/patterns/theming">
            Theming
          </Link>
          . <Code>--accent-soft</Code> is a 14% oklch tint of the accent used
          for soft fills (hover washes, selected nav items, inline code).
        </Prose>
      </DocSection>

      <DocSection
        id="surfaces"
        title="Surfaces"
        lead="Five stacked levels, from page background to raised card. The swatch column always shows the value for the theme you're viewing right now."
      >
        <TokenTable
          rows={[
            { token: "--bg", light: "#f4f6fc", dark: "#0a0c18", usage: "Page background — the base of every screen." },
            { token: "--bg-2", light: "#eaeefa", dark: "#0e1124", usage: "Recessed wells: demo canvases, hero bands, input backdrops." },
            { token: "--surface", light: "#ffffff", dark: "#15182c", usage: "Cards, nav bar, dropdowns — anything that sits on the page." },
            { token: "--surface-2", light: "#f3f5fc", dark: "#1c2038", usage: "Nested fills inside a surface: table headers, chips, code bars." },
            { token: "--navy-surface", light: "#05060d", dark: "#05060d", usage: "The always-dark band (utility strip, hero) — fixed, darker than every other surface in either theme. Pair with --on-navy text." },
          ]}
        />
      </DocSection>

      <DocSection
        id="text"
        title="Text"
        lead="Three text levels cover every hierarchy need. All three clear WCAG AA on every surface token above — that pairing is enforced by the contrast test suite."
      >
        <TokenTable
          rows={[
            { token: "--text", light: "#14172b", dark: "#e8edf9", usage: "Default UI text, headings, values." },
            { token: "--muted", light: "#616892", dark: "#9aa0c4", usage: "Secondary copy: leads, descriptions, meta." },
            { token: "--faint", light: "#666a82", dark: "#8388aa", usage: "Tertiary: captions, specs, timestamps. Still AA — never go lighter." },
            { token: "--on-navy", light: "#e8edf9", dark: "#e8edf9", usage: "Text on --navy-surface, both themes." },
          ]}
        />
      </DocSection>

      <DocSection
        id="signal"
        title="Signal"
        lead="Status hues for order lifecycles, price deltas, and alerts. These stay at full brand saturation because they are used as fills — dots, icons, tint backgrounds — not as text."
      >
        <div className="swatch-grid">
          <Swatch block="#1fad66" name="Success / Up" token="--success · #1fad66" small />
          <Swatch block="#e0466b" name="Danger / Down" token="--danger · #e0466b" small />
          <Swatch block="#f0a030" name="Amber / Pending" token="--amber · #f0a030" small />
          <Swatch block="#2a6fdb" name="Info / Confirmed" token="--info · #2a6fdb" small />
        </div>
      </DocSection>

      <DocSection
        id="text-variants"
        title="AA text variants (-text tokens)"
        lead="Wherever a brand or signal color is the text itself, use its -text variant. The base hue usually fails 4.5:1 as text, and light and dark themes need independently tuned values — the same hex can pass in one theme and fail in the other."
      >
        <TokenTable
          rows={[
            { token: "--accent-text", light: "#b20b66", dark: "#e85ba8", usage: "Accent-colored text: prices, active nav, inline code." },
            { token: "--success-text", light: "#147042", dark: "#1fad66", usage: "Upward deltas, delivered/collected states." },
            { token: "--danger-text", light: "#ce4163", dark: "#e14d70", usage: "Downward deltas, destructive text." },
            { token: "--amber-text", light: "#895b1b", dark: "#f0a030", usage: "Pending / paid states." },
            { token: "--info-text", light: "#235db8", dark: "#538be2", usage: "Confirmed / at-store states." },
            { token: "--purple-text", light: "#8a2bb8", dark: "#b070cf", usage: "Grade badges, ready-to-pick-up states." },
          ]}
        />
        <DocH3>The rule</DocH3>
        <CodeBlock
          lang="css"
          code={`/* Dot, icon, or tint background → base token at full saturation */
.status-dot { background: var(--success); }

/* The color IS the text → always the -text variant */
.delta.up { color: var(--success-text); }`}
        />
        <Prose>
          Tint backgrounds built with{" "}
          <Code>color-mix(in oklch, X N%, transparent)</Code> are
          backdrop-dependent: the same tint composites differently over{" "}
          <Code>--bg</Code>, <Code>--surface</Code>, and <Code>--surface-2</Code>.
          If you change a tint percentage or its source color, re-measure the
          rendered pixel rather than hand-deriving it — the procedure is
          documented in{" "}
          <Link href="/foundations/accessibility">
            Accessibility
          </Link>
          .
        </Prose>
      </DocSection>

      <DocSection id="usage" title="Usage">
        <DoDont
          dos={[
            <>Reference semantic tokens (<Code>--surface</Code>, <Code>--text</Code>) — never raw hex — so both themes stay correct for free.</>,
            <>Use <Code>-text</Code> variants whenever a brand/signal hue colors text.</>,
            <>Keep the primary accent scarce: one magenta CTA per view keeps it meaningful.</>,
            <>Add a fixture row to <Code>contrast.test.ts</Code> when you introduce a new text/background pairing.</>,
          ]}
          donts={[
            <>Don&apos;t set text in <Code>--accent</Code>, <Code>--success</Code>, or other base signal hues — they don&apos;t clear 4.5:1.</>,
            <>Don&apos;t apply <Code>opacity</Code> to text-bearing containers to de-emphasize them; it silently drags AA-compliant colors below threshold.</>,
            <>Don&apos;t invent new grays — <Code>--muted</Code> and <Code>--faint</Code> are the only steps below <Code>--text</Code>.</>,
            <>Don&apos;t hand-derive the composite of an oklch tint; measure the rendered pixel.</>,
          ]}
        />
      </DocSection>
    </div>
  );
}

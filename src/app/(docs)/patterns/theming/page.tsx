import type { Metadata } from "next";
import Link from "next/link";

import { Button } from "@/components/ui/button";
import { ThemeToggle } from "@/components/dc/theme-toggle";
import { PageHeader, DocSection, Code, Prose, Related } from "@/components/docs/doc-bits";
import { Example } from "@/components/docs/example";
import { CodeBlock } from "@/components/docs/code-block";
import { DoDont } from "@/components/docs/do-dont";

export const metadata: Metadata = {
  title: "Theming",
  description:
    "Dark mode, accent overrides, density, and the theme-init script in the Sleeve System.",
};

export default function ThemingPage() {
  return (
    <div>
      <PageHeader
        eyebrow="Patterns"
        title="Theming"
        lead={
          <>
            The whole system is runtime-themeable because components bind to
            CSS custom properties, never to literal values. Three levers:
            the <Code>.dark</Code> class, the <Code>--accent</Code> seed, and
            the <Code>--radius</Code>/<Code>--d</Code> shape-and-density
            tokens.
          </>
        }
      />

      <DocSection
        id="dark"
        title="Dark mode"
        lead="A single .dark class on <html> re-resolves every semantic token. Try it — this toggle themes the page you're reading."
      >
        <Example code={`const { theme, toggleTheme } = useTheme();

<ThemeToggle />  {/* or call toggleTheme() from your own control */}`}>
          <ThemeToggle />
        </Example>
        <Prose>
          <Code>ThemeProvider</Code> reads the class with{" "}
          <Code>useSyncExternalStore</Code> — server renders light, the
          client reconciles without hydration warnings. The persisted choice
          lives in <Code>localStorage</Code> under <Code>dc-theme</Code>, and{" "}
          <Code>themeInitScript</Code> (inlined in <Code>&lt;head&gt;</Code>)
          applies it before first paint so there&apos;s never a flash of the
          wrong theme. With no stored choice, it follows{" "}
          <Code>prefers-color-scheme</Code>.
        </Prose>
      </DocSection>

      <DocSection
        id="accent"
        title="Accent override"
        lead="--accent defaults to the brand magenta. Scope an override to re-brand a section — a partner storefront, a seasonal event — without touching components."
      >
        <Example
          code={`<div style={{ "--accent": "#2a6fdb" } as React.CSSProperties}>
  <Button>Partner CTA</Button>
</div>`}
        >
          <div className="ds-row" style={{ gap: 14 }}>
            <Button>Default accent</Button>
            <div style={{ ["--accent" as string]: "#2a6fdb", display: "contents" }}>
              <Button>Info accent</Button>
            </div>
            <div style={{ ["--accent" as string]: "#8a2bb8", display: "contents" }}>
              <Button>Purple accent</Button>
            </div>
          </div>
        </Example>
        <Prose>
          <Code>--accent-soft</Code> derives automatically (a 14% oklch tint),
          so soft fills follow the override. <strong>Caveat:</strong>{" "}
          <Code>--accent-text</Code> does <em>not</em> derive — it&apos;s a
          hand-tuned AA value per theme. If you override the accent
          permanently, re-tune <Code>--accent-text</Code> for both themes and
          re-run the contrast suite (see{" "}
          <Link href="/foundations/accessibility">Accessibility</Link>).
        </Prose>
      </DocSection>

      <DocSection
        id="shape"
        title="Shape & density"
        lead="Corner radius and padding density are single-token decisions, made at :root or any scope below it."
      >
        <CodeBlock
          lang="css"
          code={`/* Squarer, denser admin area */
.admin-scope {
  --radius: 10px; /* every derived corner follows */
  --d: 0.85;      /* density multiplier tightens opt-in padding */
}`}
        />
      </DocSection>

      <DocSection id="usage" title="Usage">
        <DoDont
          dos={[
            <>Theme by overriding tokens at a scope — <Code>:root</Code>, a route segment, a widget.</>,
            <>Ship <Code>themeInitScript</Code> in the document head whenever you use ThemeProvider.</>,
            "Re-run npm run test:contrast after any permanent token override.",
          ]}
          donts={[
            "Don't fork component styles to re-brand — that's what the seed tokens exist for.",
            <>Don&apos;t toggle dark mode by swapping stylesheets; the <Code>.dark</Code> class is the single mechanism.</>,
            "Don't override --accent without checking --accent-text still passes AA.",
          ]}
        />
      </DocSection>

      <Related hrefs={["/foundations/color", "/components/toggles", "/getting-started"]} />
    </div>
  );
}

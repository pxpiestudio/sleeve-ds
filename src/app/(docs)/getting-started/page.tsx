import type { Metadata } from "next";
import Link from "next/link";

import { PageHeader, DocSection, Code, Prose } from "@/components/docs/doc-bits";
import { CodeBlock } from "@/components/docs/code-block";

export const metadata: Metadata = {
  title: "Getting started",
  description:
    "Install @pxpiestudio/sleeve-ds, mount the providers, import the stylesheet, and render your first component.",
};

export default function GettingStartedPage() {
  return (
    <div>
      <PageHeader
        eyebrow="Overview"
        title="Getting started"
        lead={
          <>
            The system ships as <Code>@pxpiestudio/sleeve-ds</Code> — a
            React 19 component library with one stylesheet that carries all
            tokens, themes, and component styles. Four steps to a themed app.
          </>
        }
      />

      <DocSection id="install" title="1 · Install">
        <Prose>
          The package is published to GitHub Packages under a restricted
          scope; authenticate your <Code>.npmrc</Code> against{" "}
          <Code>npm.pkg.github.com</Code> first.
        </Prose>
        <CodeBlock lang="bash" code={`npm install @pxpiestudio/sleeve-ds`} />
        <Prose>
          Peer dependencies: <Code>react ≥ 19</Code> and{" "}
          <Code>react-dom ≥ 19</Code>.
        </Prose>
      </DocSection>

      <DocSection
        id="styles"
        title="2 · Import the stylesheet"
        lead="One CSS file is the entire visual system: tokens for both themes, the Tailwind @theme bridge, base styles, and component classes."
      >
        <CodeBlock
          code={`// app/layout.tsx (or your app entry)
import "@pxpiestudio/sleeve-ds/styles.css";`}
        />
        <Prose>
          If your app uses Tailwind v4, the stylesheet&apos;s{" "}
          <Code>@theme inline</Code> block exposes every token as a utility
          (<Code>bg-surface</Code>, <Code>text-muted</Code>,{" "}
          <Code>font-head</Code>, …) that stays live across theme switches.
        </Prose>
      </DocSection>

      <DocSection
        id="providers"
        title="3 · Mount the providers"
        lead="ThemeProvider owns the .dark class; LanguageProvider owns the EN/ES dictionary. The themeInitScript sets the theme class before first paint so there's no flash."
      >
        <CodeBlock
          code={`import {
  ThemeProvider,
  LanguageProvider,
  themeInitScript,
} from "@pxpiestudio/sleeve-ds";

export default function RootLayout({ children }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeInitScript }} />
      </head>
      <body>
        <ThemeProvider>
          <LanguageProvider>{children}</LanguageProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}`}
        />
      </DocSection>

      <DocSection id="first-component" title="4 · Render something">
        <CodeBlock
          code={`import { Button, ProductCard, SearchBar } from "@pxpiestudio/sleeve-ds";

export function Hero() {
  return (
    <section>
      <h1>Every card. Every store.</h1>
      <SearchBar onSearch={(q) => console.log(q)} />
      <Button size="lg">Start browsing</Button>
    </section>
  );
}`}
        />
        <Prose>
          Fonts: the docs app loads <strong>Saira</strong>,{" "}
          <strong>Geist</strong>, and <strong>Geist Mono</strong> via{" "}
          <Code>next/font</Code> and exposes them as{" "}
          <Code>--font-saira</Code> / <Code>--font-geist</Code> /{" "}
          <Code>--font-geist-mono</Code>. Load the same families in your app
          (any method) and set those three variables; the token layer falls
          back to system fonts otherwise.
        </Prose>
      </DocSection>

      <DocSection
        id="next"
        title="Where to next"
      >
        <ul className="doc-ul">
          <li>
            <Link href="/foundations/color">Color</Link> — the token
            architecture everything else assumes.
          </li>
          <li>
            <Link href="/components">Components</Link> — the full inventory
            with APIs and usage guidance.
          </li>
          <li>
            <Link href="/patterns/theming">Theming</Link> — dark mode,
            accent overrides, and density.
          </li>
        </ul>
      </DocSection>
    </div>
  );
}

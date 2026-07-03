import type { Metadata } from "next";
import Link from "next/link";

import { PageHeader, DocSection, DocH3, Code, Prose } from "@/components/docs/doc-bits";
import { DoDont } from "@/components/docs/do-dont";
import { CodeBlock } from "@/components/docs/code-block";

export const metadata: Metadata = {
  title: "Accessibility",
  description:
    "WCAG 2 AA in the Sleeve System: the three audit layers, the contrast token doctrine, and focus management.",
};

export default function AccessibilityPage() {
  return (
    <div>
      <PageHeader
        eyebrow="Foundations"
        title="Accessibility"
        lead={
          <>
            The system targets <strong>WCAG 2 AA</strong>, and treats it as a
            build gate rather than a review step: three automated layers each
            catch a different class of issue, and the token architecture makes
            the hardest one — color contrast — a solved problem by default.
          </>
        }
      />

      <DocSection
        id="audit-layers"
        title="The three audit layers"
        lead="Run all three before shipping a change to tokens or components. Each catches what the others structurally can't."
      >
        <CodeBlock
          lang="bash"
          code={`npm run lint           # 1 · static structure (eslint-plugin-jsx-a11y, strict)
npm run test:contrast  # 2 · WCAG contrast math over every token pair
npm run test:a11y      # 3 · axe scan of every docs page, light + dark`}
        />
        <DocH3>1 · Static lint</DocH3>
        <Prose>
          <Code>eslint-plugin-jsx-a11y</Code> runs at <Code>strict</Code>{" "}
          level. It catches structural issues visible in the JSX itself:
          missing <Code>alt</Code>, invalid or redundant ARIA, unassociated
          form controls. It cannot see color — resolving CSS custom properties
          and <Code>color-mix()</Code> is beyond static analysis.
        </Prose>
        <DocH3>2 · Contrast unit suite</DocH3>
        <Prose>
          <Code>src/lib/contrast.test.ts</Code> computes the real WCAG
          contrast ratio for every foreground/background token pair the system
          renders, in both themes. It is the durable record of every
          text/background combination — when you add a pairing, you add a
          fixture row. This is the only layer that proves contrast at the
          token level.
        </Prose>
        <DocH3>3 · Runtime axe scan</DocH3>
        <Prose>
          Playwright + <Code>@axe-core/playwright</Code> boots the production
          build and scans every documentation page in light and dark. It
          catches what only a rendered DOM reveals — landmark and region
          problems, focus order, redundant alt text — and re-confirms contrast
          on real pixels.
        </Prose>
      </DocSection>

      <DocSection
        id="contrast-doctrine"
        title="The contrast token doctrine"
        lead="Two rules keep the system AA without per-feature audits."
      >
        <DocH3>Rule 1 — text uses the -text variant</DocH3>
        <Prose>
          Brand and signal hues (<Code>--accent</Code>, <Code>--success</Code>,{" "}
          <Code>--danger</Code>, <Code>--amber</Code>, <Code>--info</Code>,{" "}
          <Code>--purple</Code>) stay fully saturated for dots, icon fills,
          and backgrounds. Wherever the color is the <em>text itself</em>, use
          the <Code>-text</Code> variant — the base hue usually fails 4.5:1,
          and light/dark need independently tuned values. The full table is in{" "}
          <Link href="/foundations/color">Color</Link>.
        </Prose>
        <DocH3>Rule 2 — measure tints, never derive them</DocH3>
        <Prose>
          Translucent <Code>color-mix(in oklch, X N%, transparent)</Code>{" "}
          backgrounds are backdrop-dependent: the same tint composites
          differently over <Code>--bg</Code>, <Code>--surface</Code>,{" "}
          <Code>--bg-2</Code>, and <Code>--surface-2</Code>, and a naive sRGB
          alpha-blend formula gives the wrong answer. If you change a
          tint&apos;s mix percentage or source color, re-measure by rendering
          the element and sampling the real pixel (Playwright screenshot +
          canvas <Code>getImageData</Code>), against <em>every</em> ancestor
          surface the tint can realistically sit on — then update the{" "}
          <Code>measuredTints</Code> table in <Code>contrast.test.ts</Code>.
        </Prose>
        <DocH3>The opacity trap</DocH3>
        <Prose>
          Never scale <Code>opacity</Code> on a text-bearing container to
          de-emphasize it: it drags every descendant text color toward the
          background and silently pushes AA-compliant colors below threshold.
          De-emphasize non-text elements instead — the inbox row&apos;s{" "}
          <Code>dim</Code> prop fades only the thumbnail for exactly this
          reason.
        </Prose>
      </DocSection>

      <DocSection
        id="focus"
        title="Focus & keyboard"
        lead="A global focus-visible rule guarantees no interactive element is ever outline-less."
      >
        <CodeBlock
          lang="css"
          code={`a:focus-visible, button:focus-visible, input:focus-visible /* … */ {
  outline: 2px solid var(--accent);
  outline-offset: 2px;
}
:focus:not(:focus-visible) { outline: none; }`}
        />
        <ul className="doc-ul">
          <li>
            A <strong>skip link</strong> is the first tab stop on every docs
            page and jumps focus to the content region.
          </li>
          <li>
            Off-canvas drawers (docs sidebar, navbar menu) trap Escape, move
            focus to the close button on open, and restore it to the trigger
            on close. The closed drawer is <Code>visibility: hidden</Code> so
            it leaves the tab order entirely.
          </li>
          <li>
            Composite widgets (search bar) put the focus ring on the{" "}
            <em>container</em> via <Code>:focus-within</Code>, keeping one
            coherent focus target.
          </li>
        </ul>
      </DocSection>

      <DocSection id="usage" title="When you change something">
        <DoDont
          dos={[
            <>Add a fixture row to <Code>contrast.test.ts</Code> for every new text/background pair — it&apos;s the system&apos;s memory.</>,
            <>Run all three audit layers before merging token or component changes.</>,
            <>Give icon-only controls an <Code>aria-label</Code>, and associate every input with a <Code>&lt;label&gt;</Code>.</>,
          ]}
          donts={[
            "Don't hand-derive the composite color of an oklch tint — measure the rendered pixel.",
            "Don't de-emphasize with container opacity; fade the non-text element instead.",
            "Don't rely on the axe scan alone for contrast — it only sees states a page renders during the scan.",
          ]}
        />
      </DocSection>
    </div>
  );
}

import type { Metadata } from "next";

import { Badge } from "@/components/ui/badge";
import { GradeBadge, RarityChip } from "@/components/dc/badges";
import { PageHeader, DocSection, Code, Prose, Related } from "@/components/docs/doc-bits";
import { Example } from "@/components/docs/example";
import { PropsTable } from "@/components/docs/props-table";
import { DoDont } from "@/components/docs/do-dont";

export const metadata: Metadata = {
  title: "Badge",
  description:
    "Generic badges plus the Deckcenter grade and rarity chips built on top of them.",
};

export default function BadgePage() {
  return (
    <div>
      <PageHeader
        eyebrow="Components"
        title="Badge"
        lead={
          <>
            Small bold labels at 10–11px in <Code>font-body</Code> (Geist) for
            clean legibility at tiny sizes. The generic <Code>Badge</Code> has
            four variants; the domain wrappers — <Code>GradeBadge</Code> and{" "}
            <Code>RarityChip</Code> — encode marketplace meaning on top.
          </>
        }
        importCode={`import { Badge, GradeBadge, RarityChip } from "@pxpiestudio/sleeve-ds";`}
      />

      <DocSection
        id="variants"
        title="Badge variants"
        lead="Neutral by default; accent for brand-tinted counts; outline for quiet metadata; solid for the rare must-see count."
      >
        <Example
          code={`<Badge>Default</Badge>
<Badge variant="accent">12 new</Badge>
<Badge variant="outline">Optional</Badge>
<Badge variant="solid">3</Badge>`}
        >
          <div className="ds-row">
            <Badge>Default</Badge>
            <Badge variant="accent">12 new</Badge>
            <Badge variant="outline">Optional</Badge>
            <Badge variant="solid">3</Badge>
          </div>
        </Example>
      </DocSection>

      <DocSection
        id="grade"
        title="Grade badge"
        lead="Card condition and grading. Graded slabs (PSA/CGC numeric grades) read purple; raw conditions read neutral."
      >
        <Example
          code={`<GradeBadge graded>PSA 10</GradeBadge>
<GradeBadge graded>CGC 9.5</GradeBadge>
<GradeBadge>NM</GradeBadge>
<GradeBadge>LP</GradeBadge>
<GradeBadge>MP</GradeBadge>`}
        >
          <div className="ds-row">
            <GradeBadge graded>PSA 10</GradeBadge>
            <GradeBadge graded>CGC 9.5</GradeBadge>
            <GradeBadge>NM</GradeBadge>
            <GradeBadge>LP</GradeBadge>
            <GradeBadge>MP</GradeBadge>
          </div>
        </Example>
      </DocSection>

      <DocSection
        id="rarity"
        title="Rarity chip"
        lead="The navy chip that overlays card art — uppercase, on-navy text over an 88% navy tint. ProductCard positions it absolutely; on its own it flows inline."
      >
        <Example
          code={`<RarityChip>Special</RarityChip>
<RarityChip>Ultra</RarityChip>
<RarityChip>Illustration</RarityChip>
<RarityChip>Hyper</RarityChip>`}
        >
          <div className="ds-row">
            <RarityChip>Special</RarityChip>
            <RarityChip>Ultra</RarityChip>
            <RarityChip>Illustration</RarityChip>
            <RarityChip>Hyper</RarityChip>
          </div>
        </Example>
      </DocSection>

      <DocSection id="api" title="API">
        <PropsTable
          caption="Badge props"
          rows={[
            { prop: "variant", type: '"default" | "accent" | "outline" | "solid"', default: '"default"', description: "Visual treatment; all four keep the same 11px/700 metrics." },
            { prop: "asChild", type: "boolean", default: "false", description: <>Render into the child element (e.g. a link) via Radix <Code>Slot</Code>.</> },
            { prop: "...props", type: 'ComponentProps<"span">', description: "Spread onto the underlying element." },
          ]}
        />
        <PropsTable
          caption="GradeBadge props"
          rows={[
            { prop: "graded", type: "boolean", default: "false", description: "Purple treatment for numeric slab grades (PSA/CGC); raw conditions stay neutral." },
            { prop: "...props", type: 'ComponentProps<"span">', description: "Spread onto the underlying element." },
          ]}
        />
        <Prose>
          <Code>RarityChip</Code> takes only <Code>ComponentProps&lt;&quot;span&quot;&gt;</Code>{" "}
          — content and placement are up to the parent.
        </Prose>
      </DocSection>

      <DocSection id="accessibility" title="Accessibility">
        <ul className="doc-ul">
          <li>
            Badges are plain text in a <Code>&lt;span&gt;</Code> — they need no
            role, and screen readers read them inline where they appear.
          </li>
          <li>
            Never let a badge be the only signal: pair color-coded meaning
            with the literal label (the text “PSA 10” carries the meaning, the
            purple is reinforcement).
          </li>
          <li>
            All badge text/background pairs — including the purple grade tint
            and the on-navy rarity chip — have fixture rows in the contrast
            suite.
          </li>
        </ul>
      </DocSection>

      <DocSection id="usage" title="Usage">
        <DoDont
          dos={[
            "Keep badge text to one or two words — they're scannable metadata, not sentences.",
            <>Use <Code>GradeBadge</Code>/<Code>RarityChip</Code> in marketplace contexts so the vocabulary stays consistent.</>,
            <>Reserve <Code>solid</Code> for the one count that must interrupt (cart count).</>,
          ]}
          donts={[
            "Don't make badges interactive — if it's clickable, it's a button or a link.",
            "Don't stack more than three badges on one row; the signal flattens.",
            "Don't restate rarity as a colored dot only — text plus tint is the pattern.",
          ]}
        />
      </DocSection>

      <Related hrefs={["/components/status-badge", "/components/product-card", "/foundations/color"]} />
    </div>
  );
}

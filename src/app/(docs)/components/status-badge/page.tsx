import type { Metadata } from "next";
import Link from "next/link";

import { StatusBadge, STATUS_TONES } from "@/components/dc/badges";
import { PageHeader, DocSection, Code, Prose, Related } from "@/components/docs/doc-bits";
import { Example } from "@/components/docs/example";
import { PropsTable } from "@/components/docs/props-table";
import { DoDont } from "@/components/docs/do-dont";

export const metadata: Metadata = {
  title: "Status badge",
  description:
    "Order-lifecycle chips: six tones shared by the Deckcenter buyer and seller views.",
};

const TONE_LABELS: Record<(typeof STATUS_TONES)[number], string> = {
  active: "Active",
  sold: "Sold",
  pending: "Pending",
  confirmed: "Confirmed",
  shipped: "Shipped",
  delivered: "Delivered",
};

export default function StatusBadgePage() {
  return (
    <div>
      <PageHeader
        eyebrow="Components"
        title="Status badge"
        lead={
          <>
            Pill-shaped lifecycle chips with a leading tone dot. Each tone
            pairs a saturated dot with an AA-safe <Code>-text</Code> color
            over a 13–15% oklch tint — the visual grammar of the entire{" "}
            <Link href="/patterns/order-lifecycle">order lifecycle</Link>.
          </>
        }
        importCode={`import { StatusBadge, STATUS_TONES, type StatusTone } from "@pxpiestudio/sleeve-ds";`}
      />

      <DocSection
        id="tones"
        title="Tones"
        lead="Six tones cover listing state and order progress. The tone controls color only — the label is yours, so both the buyer and seller vocabularies map onto the same six."
      >
        <Example
          code={`<StatusBadge tone="active">Active</StatusBadge>
<StatusBadge tone="sold">Sold</StatusBadge>
<StatusBadge tone="pending">Pending</StatusBadge>
<StatusBadge tone="confirmed">Confirmed</StatusBadge>
<StatusBadge tone="shipped">Shipped</StatusBadge>
<StatusBadge tone="delivered">Delivered</StatusBadge>`}
        >
          <div className="ds-row">
            {STATUS_TONES.map((tone) => (
              <StatusBadge key={tone} tone={tone}>
                {TONE_LABELS[tone]}
              </StatusBadge>
            ))}
          </div>
        </Example>
        <Prose>
          Tone semantics: <Code>active</Code> (accent) — live listing;{" "}
          <Code>sold</Code> (neutral) — closed; <Code>pending</Code> (amber) —
          awaiting action; <Code>confirmed</Code> (info) — acknowledged;{" "}
          <Code>shipped</Code> (purple) — in motion / ready;{" "}
          <Code>delivered</Code> (success) — complete.
        </Prose>
      </DocSection>

      <DocSection id="api" title="API">
        <PropsTable
          rows={[
            { prop: "tone", type: "StatusTone", description: <>One of <Code>STATUS_TONES</Code>: active · sold · pending · confirmed · shipped · delivered. Required.</> },
            { prop: "children", type: "ReactNode", description: "The label. Keep it to one or two words." },
            { prop: "...props", type: 'ComponentProps<"span">', description: "Spread onto the underlying element." },
          ]}
        />
        <Prose>
          <Code>STATUS_TONES</Code> is exported as a const tuple so exhaustive
          switches over <Code>StatusTone</Code> type-check.
        </Prose>
      </DocSection>

      <DocSection id="accessibility" title="Accessibility">
        <ul className="doc-ul">
          <li>
            The dot is decorative (a CSS pseudo-element); the label text
            carries all meaning. Never render an unlabeled chip.
          </li>
          <li>
            Every tone&apos;s text-on-tint pair is pixel-measured and locked
            in the contrast suite — see{" "}
            <Link href="/foundations/accessibility">Accessibility</Link> for
            why tints must be measured, not derived.
          </li>
        </ul>
      </DocSection>

      <DocSection id="usage" title="Usage">
        <DoDont
          dos={[
            "Use the same tone for the same lifecycle stage everywhere — buyers and sellers see one color language.",
            "Keep labels short and stateful: “Pending”, “At store · Ready”.",
          ]}
          donts={[
            "Don't invent new tones inline; extend STATUS_TONES so the type system and contrast suite track it.",
            "Don't use status tones for non-lifecycle decoration — they're a vocabulary, not a palette.",
          ]}
        />
      </DocSection>

      <Related hrefs={["/patterns/order-lifecycle", "/components/inbox-row", "/components/badge"]} />
    </div>
  );
}

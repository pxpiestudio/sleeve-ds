import type { Metadata } from "next";
import Link from "next/link";

import { InboxRow } from "@/components/dc/inbox-row";
import { SellingInboxDemo } from "@/components/docs/demos";
import { PageHeader, DocSection, Code, Prose, Related } from "@/components/docs/doc-bits";
import { Example } from "@/components/docs/example";
import { PropsTable } from "@/components/docs/props-table";
import { DoDont } from "@/components/docs/do-dont";

export const metadata: Metadata = {
  title: "Inbox row",
  description:
    "The dense order-list row used in Purchases and Selling, reflowing into a stacked mobile card.",
};

export default function InboxRowPage() {
  return (
    <div>
      <PageHeader
        eyebrow="Components"
        title="Inbox row"
        lead={
          <>
            The dense list pattern behind both the Purchases and Selling
            tabs. Grid:{" "}
            <Code>checkbox · thumbnail · info · status · trailing</Code>.
            Named CSS grid areas let the same markup reflow from one desktop
            line into a stacked mobile card — no duplicate JSX. Scales to
            300+ orders where a card grid can&apos;t.
          </>
        }
        importCode={`import { InboxRow, type InboxCheckbox } from "@pxpiestudio/sleeve-ds";`}
      />

      <DocSection
        id="purchases"
        title="Purchases (buyer view)"
        lead="No checkbox; the trailing column carries price and date. Completed orders dim their thumbnail — only the thumbnail, so text contrast is untouched."
      >
        <Example
          code={`<InboxRow
  hue={22}
  title="Charizard ex"
  subtitle="Obsidian Flames · Seller: PokeVault"
  dim
  status={<StatusBadge tone="delivered">✅ Collected</StatusBadge>}
  trailing={<PriceAndDate price="$89.99" date="Jun 18" />}
/>`}
        >
          <div className="demo-inbox">
            <InboxRow
              hue={22}
              title="Charizard ex"
              subtitle="Obsidian Flames · Seller: PokeVault"
              dim
              status={
                <span
                  style={{
                    display: "inline-flex",
                    alignItems: "center",
                    gap: 4,
                    fontFamily: "var(--font-body)",
                    fontSize: 11,
                    fontWeight: 700,
                    padding: "4px 9px",
                    borderRadius: 7,
                    color: "var(--success-text)",
                    background: "color-mix(in oklch,#1fad66 12%,transparent)",
                    whiteSpace: "nowrap",
                  }}
                >
                  ✅ Collected
                </span>
              }
              trailing={
                <>
                  <div style={{ fontFamily: "var(--font-head)", fontWeight: 700, fontSize: 14, color: "var(--accent-text)" }}>
                    $89.99
                  </div>
                  <div style={{ fontSize: 11, color: "var(--faint)", marginTop: 2 }}>Jun 18</div>
                </>
              }
            />
            <InboxRow
              hue={260}
              title="Umbreon VMAX"
              subtitle="Evolving Skies · Seller: CardDen"
              note="📍 Pick up at PokeNest Kanto · 0.8 km"
              status={
                <span
                  style={{
                    display: "inline-flex",
                    alignItems: "center",
                    gap: 4,
                    fontFamily: "var(--font-body)",
                    fontSize: 11,
                    fontWeight: 700,
                    padding: "4px 9px",
                    borderRadius: 7,
                    color: "var(--purple-text)",
                    background: "color-mix(in oklch,#8a2bb8 13%,transparent)",
                    whiteSpace: "nowrap",
                  }}
                >
                  📍 At store · Ready
                </span>
              }
              trailing={
                <>
                  <div style={{ fontFamily: "var(--font-head)", fontWeight: 700, fontSize: 14, color: "var(--accent-text)" }}>
                    $44.50
                  </div>
                  <div style={{ fontSize: 11, color: "var(--faint)", marginTop: 2 }}>Jun 20</div>
                </>
              }
            />
          </div>
        </Example>
      </DocSection>

      <DocSection
        id="selling"
        title="Selling (seller view, bulk select)"
        lead="Pass checkbox to add the leading select control; selected tints the row with a 5% accent wash. The header bar with “Select all” and the bulk action is composition — the row only owns itself."
      >
        <Example
          code={`const [selected, setSelected] = React.useState(true);

<InboxRow
  hue={320}
  title="Hisuian Zoroark VSTAR"
  subtitle="Lost Origin"
  selected={selected}
  checkbox={{ checked: selected, onChange: setSelected }}
  trailing={<AdvanceStatusButton />}
/>`}
        >
          <SellingInboxDemo />
        </Example>
      </DocSection>

      <DocSection id="api" title="API">
        <PropsTable
          rows={[
            { prop: "hue", type: "number", description: "Thumbnail hue (see Card art). Required." },
            { prop: "title", type: "string", description: "Row title — truncates with ellipsis. Required." },
            { prop: "subtitle", type: "string", description: "Set / counterpart line. Required." },
            { prop: "note", type: "string", description: "Optional context pill (pickup location) rendered full-width under the info." },
            { prop: "status", type: "ReactNode", description: <>Status chip slot — typically a <Link href="/components/status-badge">StatusBadge</Link>.</> },
            { prop: "trailing", type: "ReactNode", description: "Right column: price + date, or an action button." },
            { prop: "checkbox", type: "InboxCheckbox", description: <><Code>{'{ checked, onChange }'}</Code> — renders the leading bulk-select control.</> },
            { prop: "dim", type: "boolean", default: "false", description: "Fades the thumbnail (55% opacity) for past orders. Text is never dimmed." },
            { prop: "selected", type: "boolean", default: "false", description: "Accent-tinted row background." },
            { prop: "className", type: "string", description: "Applied to the row." },
          ]}
        />
      </DocSection>

      <DocSection id="accessibility" title="Accessibility">
        <ul className="doc-ul">
          <li>
            The bulk-select control is a button with{" "}
            <Code>role=&quot;checkbox&quot;</Code>, <Code>aria-checked</Code>,
            and a per-row name (“Select Hisuian Zoroark VSTAR”).
          </li>
          <li>
            <Code>dim</Code> exists because container opacity would drag{" "}
            <Code>--muted</Code>/<Code>--faint</Code> text below AA — the
            reference case in{" "}
            <Link href="/foundations/accessibility">Accessibility</Link>.
          </li>
          <li>
            On mobile the grid re-areas into a stacked card; DOM order (title
            → subtitle → status → note) is the reading order in both layouts.
          </li>
        </ul>
      </DocSection>

      <DocSection id="usage" title="Usage">
        <Prose>
          Rows compose into an inbox inside a bordered wrapper (borders
          between rows come from the row itself; the wrapper rounds and clips
          the group).
        </Prose>
        <DoDont
          dos={[
            "Use rows for order lists past ~10 items — density is the point.",
            "Put exactly one action in trailing; bulk actions live in the header bar.",
          ]}
          donts={[
            "Don't dim whole rows for past orders — that's what dim (thumbnail-only) is for.",
            "Don't stack two status chips; combine states into one label instead.",
          ]}
        />
      </DocSection>

      <Related hrefs={["/components/status-badge", "/components/card-art", "/patterns/order-lifecycle"]} />
    </div>
  );
}

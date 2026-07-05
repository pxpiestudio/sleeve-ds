import type { Metadata } from "next";
import Link from "next/link";

import { PageHeader, DocSection, Code, Prose, Related } from "@/components/docs/doc-bits";
import { Step, Connector } from "@/components/docs/foundation-bits";
import { Example } from "@/components/docs/example";
import { DoDont } from "@/components/docs/do-dont";

export const metadata: Metadata = {
  title: "Order lifecycle",
  description:
    "The Deckcenter purchase and fulfillment status flows and their shared color mapping.",
};

export default function OrderLifecyclePage() {
  return (
    <div>
      <PageHeader
        eyebrow="Patterns"
        title="Order lifecycle"
        lead={
          <>
            Two synchronized lifecycles describe every order:{" "}
            <strong>purchase</strong> (what the buyer sees) and{" "}
            <strong>fulfillment</strong> (what the seller does). Each step maps
            to one signal color and one label pair — the same stage is always
            the same color on both sides.
          </>
        }
      />

      <DocSection
        id="purchase"
        title="Purchase lifecycle — buyer view"
        lead="Four steps from checkout to pickup. The pickup-location note appears on the Confirmed and Ready steps."
      >
        <Example>
          <div>
            <div style={{ display: "flex", alignItems: "center", gap: 0, flexWrap: "wrap" }}>
              <Step color="#f0a030" textColor="var(--amber-text)">⏳ Pending</Step>
              <Connector />
              <Step color="#2a6fdb" textColor="var(--info-text)">✓ Confirmed</Step>
              <Connector />
              <Step color="#8a2bb8" textColor="var(--purple-text)">📍 At store · Ready</Step>
              <Connector />
              <Step color="#1fad66" textColor="var(--success-text)">✅ Collected</Step>
            </div>
            <div
              style={{
                marginTop: 12,
                padding: "10px 14px",
                borderRadius: 10,
                background: "color-mix(in oklch,#8a2bb8 8%,transparent)",
                border: "1px solid color-mix(in oklch,#8a2bb8 20%,transparent)",
                fontSize: 13,
                color: "var(--purple-text)",
                fontFamily: "var(--font-body)",
                fontWeight: 600,
              }}
            >
              📍 Pick up at PokeNest Kanto · 0.8 km — shows on Confirmed + Ready steps
            </div>
          </div>
        </Example>
      </DocSection>

      <DocSection
        id="fulfillment"
        title="Fulfillment lifecycle — seller view"
        lead="Three steps mirror the buyer's middle stages. The seller advances each step via a CTA on the sold listing card; the buyer sees the reflected status in their Purchases tab."
      >
        <Example>
          <div style={{ display: "flex", alignItems: "center", gap: 0, flexWrap: "wrap" }}>
            <Step color="#f0a030" textColor="var(--amber-text)">💳 Paid</Step>
            <Connector />
            <Step color="#2a6fdb" textColor="var(--info-text)">🏪 At store</Step>
            <Connector />
            <Step color="#8a2bb8" textColor="var(--purple-text)">✅ Ready to pick up</Step>
          </div>
        </Example>
      </DocSection>

      <DocSection
        id="mapping"
        title="The color mapping"
        lead="One rule keeps both views coherent: a lifecycle stage owns its color."
      >
        <ul className="doc-ul">
          <li>
            <strong>Amber</strong> — money moved, action pending (<Code>pending</Code> / <Code>paid</Code>).
          </li>
          <li>
            <strong>Info blue</strong> — acknowledged, in the system (<Code>confirmed</Code> / <Code>at store</Code>).
          </li>
          <li>
            <strong>Purple</strong> — staged for handoff (<Code>ready</Code>).
          </li>
          <li>
            <strong>Success green</strong> — complete (<Code>collected</Code>).
          </li>
        </ul>
        <Prose>
          In UI, these stages render as{" "}
          <Link href="/components/status-badge">status badges</Link> in
          inboxes and as step pills in detail views. Colors are always
          accompanied by the label — the color is reinforcement, the words are
          the information.
        </Prose>
      </DocSection>

      <DocSection id="usage" title="Usage">
        <DoDont
          dos={[
            "Advance status only forward; corrections are a cancellation plus a new order, not a backwards step.",
            "Show the buyer the pickup note as soon as a store is assigned (Confirmed).",
            "Use the exact tone-to-stage mapping above in any new order surface.",
          ]}
          donts={[
            "Don't invent intermediate stages in one view that the other side can't see.",
            "Don't recolor stages per feature — the mapping is global.",
          ]}
        />
      </DocSection>

      <Related hrefs={["/components/status-badge", "/components/inbox-row", "/foundations/color"]} />
    </div>
  );
}

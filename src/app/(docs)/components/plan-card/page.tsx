import type { Metadata } from "next";

import { PlanCard } from "@/components/dc/plan-card";
import { PageHeader, DocSection, Prose, Related } from "@/components/docs/doc-bits";
import { Example } from "@/components/docs/example";
import { PropsTable } from "@/components/docs/props-table";
import { DoDont } from "@/components/docs/do-dont";

export const metadata: Metadata = {
  title: "Plan card",
  description: "Pricing tier card — header, benefit list, price footer, uppercase CTA.",
};

export default function PlanCardPage() {
  return (
    <div>
      <PageHeader
        eyebrow="Components"
        title="Plan card"
        lead={
          <>
            Plan cards share one skeleton — header, benefit list, price footer,
            uppercase CTA. The featured tier adds the <code className="ds-code">pro</code>{" "}
            prop for an accent ring, glow shadow, and a floating badge.
          </>
        }
        importCode={`import { PlanCard } from "@pxpiestudio/sleeve-ds";`}
      />

      <DocSection id="example" title="Free + featured pair" lead="Plan cards are designed side by side, 2-up, with the featured tier visually stepping forward.">
        <Example
          code={`<PlanCard
  name="Collector"
  tagline="For buyers building a personal collection."
  benefits={["Live price comparison", "Unlimited watchlist", "Cart across sellers"]}
  price="Free"
  cta={{ label: "Get started", variant: "ghost" }}
/>

<PlanCard
  name="Seller Pro"
  tagline="For power sellers moving real volume."
  benefits={["Everything in Collector", "Bulk listing tools", "Verified seller badge"]}
  price={{ amount: "$19", period: "/ mo", billed: "billed yearly" }}
  cta={{ label: "Upgrade to Pro", variant: "primary" }}
  pro
  badge="Popular"
/>`}
        >
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 20, maxWidth: 640 }}>
            <PlanCard
              name="Collector"
              tagline="For buyers building a personal collection."
              benefits={["Live price comparison", "Unlimited watchlist", "Cart across sellers"]}
              price="Free"
              cta={{ label: "Get started", variant: "ghost" }}
            />
            <PlanCard
              name="Seller Pro"
              tagline="For power sellers moving real volume."
              benefits={["Everything in Collector", "Bulk listing tools", "Verified seller badge"]}
              price={{ amount: "$19", period: "/ mo", billed: "billed yearly" }}
              cta={{ label: "Upgrade to Pro", variant: "primary" }}
              pro
              badge="Popular"
            />
          </div>
        </Example>
      </DocSection>

      <DocSection id="api" title="API">
        <PropsTable
          rows={[
            { prop: "name", type: "string", description: "Plan name — 24px heading. Required." },
            { prop: "tagline", type: "string", description: "One-line description under the name. Required." },
            { prop: "benefits", type: "string[]", description: "Benefit list, each prefixed with a check icon. Required." },
            { prop: "price", type: '"Free" | { amount, period?, billed? }', description: "Price footer content. Required." },
            { prop: "cta", type: '{ label, variant: "primary" | "ghost", onClick? }', description: "Full-width uppercase CTA button. Required." },
            { prop: "pro", type: "boolean", default: "false", description: "Featured-tier styling: accent ring + glow shadow." },
            { prop: "badge", type: "string", description: 'Floating pill (e.g. "Popular") — only rendered when `pro` is set.' },
          ]}
        />
      </DocSection>

      <DocSection id="usage" title="Usage">
        <Prose>Use exactly one <code className="ds-code">pro</code> card per pricing grid — it&apos;s designed to draw the eye once, not compete with a second highlighted tier.</Prose>
        <DoDont
          dos={['Use `variant: "primary"` on the featured tier\'s CTA and `"ghost"` on the rest.']}
          donts={["Don't set `badge` without `pro` — the badge only renders on the featured card."]}
        />
      </DocSection>

      <Related hrefs={["/components/button", "/components/badge"]} />
    </div>
  );
}

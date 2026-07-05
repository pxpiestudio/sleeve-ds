import type { Metadata } from "next";

import { QtyControl } from "@/components/dc/qty-control";
import { ControlledQtyDemo } from "@/components/docs/demos";
import { PageHeader, DocSection, Code, Prose, Related } from "@/components/docs/doc-bits";
import { Example } from "@/components/docs/example";
import { PropsTable } from "@/components/docs/props-table";
import { DoDont } from "@/components/docs/do-dont";

export const metadata: Metadata = {
  title: "Quantity control",
  description:
    "The Sleeve System +/− stepper for cart rows and listings, controlled or uncontrolled.",
};

export default function QtyControlPage() {
  return (
    <div>
      <PageHeader
        eyebrow="Components"
        title="Quantity control"
        lead={
          <>
            A compact stepper for cart rows and the product detail page. The
            +/− buttons disable at the bounds, and the readout announces
            changes via <Code>aria-live=&quot;polite&quot;</Code>.
          </>
        }
        importCode={`import { QtyControl } from "@pxpiestudio/sleeve-ds";`}
      />

      <DocSection
        id="uncontrolled"
        title="Uncontrolled"
        lead="Give it a defaultValue and bounds; it manages its own state. At min the − button disables; at max, +."
      >
        <Example
          code={`<QtyControl defaultValue={1} min={1} max={4} />`}
        >
          <QtyControl defaultValue={1} min={1} max={4} />
        </Example>
      </DocSection>

      <DocSection
        id="controlled"
        title="Controlled"
        lead="Pass value + onValueChange to own the state — the standard mode inside a cart where quantity drives a subtotal."
      >
        <Example
          code={`const [qty, setQty] = React.useState(2);

<QtyControl value={qty} onValueChange={setQty} max={8} />
<span>Subtotal: \${(qty * 44.5).toFixed(2)}</span>`}
        >
          <ControlledQtyDemo />
        </Example>
        <Prose>
          Out-of-range programmatic values are clamped to{" "}
          <Code>[min, max]</Code> before <Code>onValueChange</Code> fires.
        </Prose>
      </DocSection>

      <DocSection id="api" title="API">
        <PropsTable
          rows={[
            { prop: "value", type: "number", description: "Controlled value. Presence switches the component to controlled mode." },
            { prop: "defaultValue", type: "number", default: "1", description: "Initial value in uncontrolled mode." },
            { prop: "min", type: "number", default: "1", description: "Lower bound — the − button disables here." },
            { prop: "max", type: "number", default: "99", description: "Upper bound — the + button disables here. Set it to the seller's available stock." },
            { prop: "onValueChange", type: "(value: number) => void", description: "Fires with the clamped next value on every step." },
            { prop: "className", type: "string", description: "Applied to the wrapping element." },
          ]}
        />
      </DocSection>

      <DocSection id="accessibility" title="Accessibility">
        <ul className="doc-ul">
          <li>
            The buttons carry <Code>aria-label</Code>s (“Decrease quantity” /
            “Increase quantity”); the count is announced through the{" "}
            <Code>aria-live</Code> readout.
          </li>
          <li>
            Disabled bounds use real <Code>disabled</Code> — they leave the
            tab order and announce as unavailable.
          </li>
          <li>
            The focus ring is inset (<Code>outline-offset: -2px</Code>) so it
            stays visible inside the control&apos;s clipped corners.
          </li>
        </ul>
      </DocSection>

      <DocSection id="usage" title="Usage">
        <DoDont
          dos={[
            <>Set <Code>max</Code> to the actual available stock so the UI enforces the bound.</>,
            "Show the money consequence (subtotal) next to the control when quantity affects price.",
          ]}
          donts={[
            "Don't use it for values that legitimately reach dozens — steppers are for small counts; use an Input past ~10.",
            "Don't hide the value between the buttons; the readout is the point.",
          ]}
        />
      </DocSection>

      <Related hrefs={["/components/input", "/components/inbox-row"]} />
    </div>
  );
}

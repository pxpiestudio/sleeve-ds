import type { Metadata } from "next";
import type { CSSProperties } from "react";

import { Input } from "@/components/ui/input";
import { PageHeader, DocSection, Code, Prose, Related } from "@/components/docs/doc-bits";
import { Example } from "@/components/docs/example";
import { PropsTable } from "@/components/docs/props-table";
import { DoDont } from "@/components/docs/do-dont";

export const metadata: Metadata = {
  title: "Input",
  description:
    "The Sleeve System text field: focus ring, placeholder, disabled state, and labeling rules.",
};

const fieldLabelStyle: CSSProperties = {
  display: "block",
  fontSize: 10.5,
  fontWeight: 700,
  letterSpacing: ".08em",
  textTransform: "uppercase",
  color: "var(--faint)",
  marginBottom: 8,
  fontFamily: "var(--font-head)",
};

export default function InputPage() {
  return (
    <div>
      <PageHeader
        eyebrow="Components"
        title="Input"
        lead={
          <>
            A native <Code>&lt;input&gt;</Code> with system styling: 1.5px{" "}
            <Code>--border-strong</Code> border that turns accent on focus
            with a 3px <Code>--accent-soft</Code> halo. Labels are part of the
            pattern — an input never ships without one.
          </>
        }
        importCode={`import { Input } from "@pxpiestudio/sleeve-ds";`}
      />

      <DocSection
        id="default"
        title="With a label"
        lead="The canonical field: an eyebrow-style label associated via htmlFor. Click the label — focus lands in the field."
      >
        <Example
          code={`<label htmlFor="email" className="field-label">
  Email
</label>
<Input id="email" type="email" placeholder="you@email.com" />`}
        >
          <div style={{ maxWidth: 380 }}>
            <label htmlFor="input-demo-email" style={fieldLabelStyle}>
              Email
            </label>
            <Input id="input-demo-email" type="email" placeholder="you@email.com" />
          </div>
        </Example>
      </DocSection>

      <DocSection
        id="states"
        title="States"
        lead="Focus is the accent border + soft halo; disabled drops to 50% opacity with a not-allowed cursor."
      >
        <Example
          code={`<Input id="listing-price" placeholder="0.00" />
<Input id="seller-handle" defaultValue="PokeVault" disabled />`}
        >
          <div style={{ maxWidth: 380, display: "flex", flexDirection: "column", gap: 18 }}>
            <div>
              <label htmlFor="input-demo-price" style={fieldLabelStyle}>
                Listing price (USD)
              </label>
              <Input id="input-demo-price" inputMode="decimal" placeholder="0.00" />
            </div>
            <div>
              <label htmlFor="input-demo-disabled" style={fieldLabelStyle}>
                Seller handle
              </label>
              <Input id="input-demo-disabled" defaultValue="PokeVault" disabled />
            </div>
          </div>
        </Example>
      </DocSection>

      <DocSection id="api" title="API">
        <PropsTable
          rows={[
            { prop: "type", type: "string", default: '"text"', description: "Native input type — passes straight through." },
            { prop: "...props", type: 'ComponentProps<"input">', description: "The full native surface: value, onChange, placeholder, disabled, inputMode, aria-*, …" },
          ]}
        />
        <Prose>
          There is deliberately no size or variant axis — one field style
          keeps forms coherent. Width is the parent&apos;s concern.
        </Prose>
      </DocSection>

      <DocSection id="accessibility" title="Accessibility">
        <ul className="doc-ul">
          <li>
            Every input needs a programmatic label: a{" "}
            <Code>&lt;label htmlFor&gt;</Code> (preferred, adds a click
            target) or <Code>aria-label</Code> when the visual design truly
            has no room (see the search bar).
          </li>
          <li>
            Placeholder text is <Code>--faint</Code> and is a hint, never the
            label — it disappears on first keystroke.
          </li>
          <li>
            Tie validation messages to the field with{" "}
            <Code>aria-describedby</Code> and set{" "}
            <Code>aria-invalid</Code> on error.
          </li>
        </ul>
      </DocSection>

      <DocSection id="usage" title="Usage">
        <DoDont
          dos={[
            <>Use the right <Code>type</Code>/<Code>inputMode</Code> so mobile keyboards match the data.</>,
            "Keep labels short, in the eyebrow style, above the field.",
          ]}
          donts={[
            "Don't use placeholders as labels.",
            "Don't style focus on the input's own outline — the border + halo is the system's focus treatment.",
          ]}
        />
      </DocSection>

      <Related hrefs={["/components/search-bar", "/components/qty-control", "/foundations/accessibility"]} />
    </div>
  );
}

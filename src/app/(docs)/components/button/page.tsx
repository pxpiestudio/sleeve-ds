import type { Metadata } from "next";

import { Button } from "@/components/ui/button";
import { Icon } from "@/components/dc/icon";
import { PageHeader, DocSection, Code, Prose, Related } from "@/components/docs/doc-bits";
import { Example } from "@/components/docs/example";
import { PropsTable } from "@/components/docs/props-table";
import { DoDont } from "@/components/docs/do-dont";

export const metadata: Metadata = {
  title: "Button",
  description:
    "Sleeve System button: primary, ghost, and quiet intents in four sizes, built on cva + asChild.",
};

export default function ButtonPage() {
  return (
    <div>
      <PageHeader
        eyebrow="Components"
        title="Button"
        lead={
          <>
            Three intent levels in four sizes, built on the shadcn{" "}
            <Code>cva</Code> + <Code>asChild</Code> pattern. The primary
            button is the single accent CTA — everything else keeps structure
            without filled weight.
          </>
        }
        importCode={`import { Button, buttonVariants } from "@pxpiestudio/sleeve-ds";`}
      />

      <DocSection
        id="variants"
        title="Variants"
        lead="Intent maps to visual weight. Aim for one primary per view; ghost carries secondary actions; quiet is a text affordance."
      >
        <Example
          code={`<Button>Start browsing</Button>
<Button variant="ghost">Browse sets</Button>
<Button variant="quiet">Sign in</Button>`}
        >
          <div className="ds-row">
            <Button>Start browsing</Button>
            <Button variant="ghost">Browse sets</Button>
            <Button variant="quiet">Sign in</Button>
          </div>
        </Example>
        <Prose>
          The primary variant lifts 2px on hover under a soft accent glow;
          ghost swaps its surface; quiet only gains a wash. All three share
          the same pressed state (<Code>translate-y-px scale-[0.99]</Code>)
          and the global focus ring.
        </Prose>
      </DocSection>

      <DocSection
        id="sizes"
        title="Sizes"
        lead="Default for page-level CTAs, sm for inline and card actions, lg for hero moments, icon for square glyph-only controls."
      >
        <Example
          code={`<Button size="lg">Start selling</Button>
<Button>Add to cart</Button>
<Button size="sm">Add to cart</Button>
<Button size="icon" aria-label="Search">
  <Icon name="search" size={18} />
</Button>`}
        >
          <div className="ds-row">
            <Button size="lg">Start selling</Button>
            <Button>Add to cart</Button>
            <Button size="sm">Add to cart</Button>
            <Button size="icon" aria-label="Search">
              <Icon name="search" size={18} />
            </Button>
          </div>
        </Example>
      </DocSection>

      <DocSection
        id="states"
        title="States"
        lead="Disabled drops to 40% opacity and removes pointer events. Buttons with icons get a 9px gap for free."
      >
        <Example
          code={`<Button disabled>Out of stock</Button>
<Button variant="ghost" disabled>Back</Button>
<Button>
  <Icon name="bolt" size={16} /> Instant offer
</Button>`}
        >
          <div className="ds-row">
            <Button disabled>Out of stock</Button>
            <Button variant="ghost" disabled>Back</Button>
            <Button>
              <Icon name="bolt" size={16} /> Instant offer
            </Button>
          </div>
        </Example>
      </DocSection>

      <DocSection
        id="aschild"
        title="As a link"
        lead="asChild merges button styling onto your element — the rendered node is a real <a>, so navigation semantics stay intact."
      >
        <Example
          code={`<Button asChild>
  <Link href="/getting-started">Get started</Link>
</Button>`}
        >
          <div className="ds-row">
            <Button asChild>
              <a href="/getting-started">Get started</a>
            </Button>
          </div>
        </Example>
      </DocSection>

      <DocSection id="api" title="API">
        <PropsTable
          rows={[
            { prop: "variant", type: '"primary" | "ghost" | "quiet"', default: '"primary"', description: "Visual intent level." },
            { prop: "size", type: '"default" | "sm" | "lg" | "icon"', default: '"default"', description: <>Padding/type scale. <Code>icon</Code> is a 40px square with no padding.</> },
            { prop: "asChild", type: "boolean", default: "false", description: <>Render into the child element via Radix <Code>Slot</Code> instead of a <Code>&lt;button&gt;</Code>.</> },
            { prop: "...props", type: 'ComponentProps<"button">', description: "Everything else — type, disabled, onClick, aria-* — lands on the underlying element." },
          ]}
        />
        <Prose>
          <Code>buttonVariants</Code> is exported for styling non-Button
          elements (e.g. a third-party link component) with the same classes.
        </Prose>
      </DocSection>

      <DocSection id="accessibility" title="Accessibility">
        <ul className="doc-ul">
          <li>
            Renders a native <Code>&lt;button&gt;</Code> — space/enter
            activation, focusability, and disabled semantics come from the
            platform.
          </li>
          <li>
            The global <Code>:focus-visible</Code> ring (2px accent, 2px
            offset) applies automatically.
          </li>
          <li>
            <Code>size=&quot;icon&quot;</Code> buttons have no text content —
            an <Code>aria-label</Code> is mandatory.
          </li>
          <li>
            Primary&apos;s white-on-accent text and both other variants&apos;
            pairings are covered by the contrast suite.
          </li>
        </ul>
      </DocSection>

      <DocSection id="usage" title="Usage">
        <DoDont
          dos={[
            "Keep one primary button per view — it's the accent CTA, and scarcity is what makes it read.",
            <>Use <Code>asChild</Code> for navigation so links are links.</>,
            "Write labels as verbs: “Start browsing”, “Add to cart”.",
          ]}
          donts={[
            "Don't put two primary buttons side by side; demote one to ghost.",
            <>Don&apos;t build icon-only buttons without an <Code>aria-label</Code>.</>,
            "Don't disable buttons as a validation strategy — surface the error and keep the button pressable where feasible.",
          ]}
        />
      </DocSection>

      <Related hrefs={["/components/search-bar", "/components/navbar", "/foundations/color"]} />
    </div>
  );
}

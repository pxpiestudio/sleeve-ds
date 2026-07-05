import type { Metadata } from "next";

import { Icon, ICON_PATHS, type IconName } from "@/components/dc/icon";
import { PageHeader, DocSection, Code, Prose } from "@/components/docs/doc-bits";
import { PropsTable } from "@/components/docs/props-table";
import { DoDont } from "@/components/docs/do-dont";
import { Example } from "@/components/docs/example";

export const metadata: Metadata = {
  title: "Iconography",
  description:
    "The Sleeve System's inline SVG stroke icon set: every glyph, sizing, and color inheritance.",
};

const ICON_NAMES = Object.keys(ICON_PATHS) as IconName[];

export default function IconsPage() {
  return (
    <div>
      <PageHeader
        eyebrow="Foundations"
        title="Iconography"
        lead={
          <>
            All icons are hand-drawn Lucide-style strokes — 2px weight, round
            caps and joins — rendered inline as SVG. No icon font, no sprite:
            each glyph is directly editable and inherits{" "}
            <Code>currentColor</Code>.
          </>
        }
        importCode={`import { Icon, ICON_PATHS, type IconName } from "@pxpiestudio/sleeve-ds";`}
      />

      <DocSection
        id="set"
        title="The set"
        lead={`${ICON_NAMES.length} glyphs cover commerce, navigation, status, and social. Additions are drawn on the same 24×24 grid at 2px stroke.`}
      >
        <Example
          code={`<Icon name="search" size={22} />
<Icon name="cart" size={22} />
<Icon name="shield" size={22} />`}
        >
          <ul
            className="ds-row"
            style={{ gap: 20, flexWrap: "wrap", listStyle: "none", margin: 0, padding: 0 }}
          >
            {ICON_NAMES.map((name) => (
              <li
                key={name}
                style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 6 }}
              >
                <Icon name={name} size={22} />
                <span style={{ fontSize: 10.5, color: "var(--faint)", fontFamily: "var(--font-mono)" }}>
                  {name}
                </span>
              </li>
            ))}
          </ul>
        </Example>
      </DocSection>

      <DocSection
        id="sizing"
        title="Sizing & color"
        lead="Icons render at 18px by default and take their color from the surrounding text — set color on the parent, not the icon."
      >
        <Example
          code={`<span style={{ color: "var(--accent-text)" }}>
  <Icon name="bolt" size={16} /> Instant offers
</span>

{/* Thicker stroke for small decorative glyphs */}
<Icon name="up" size={12} sw={2.4} />`}
        >
          <div className="ds-row" style={{ gap: 24 }}>
            <span style={{ display: "inline-flex", alignItems: "center", gap: 7, color: "var(--accent-text)", fontWeight: 600, fontSize: 14 }}>
              <Icon name="bolt" size={16} /> Instant offers
            </span>
            <span style={{ display: "inline-flex", alignItems: "center", gap: 7, color: "var(--success-text)", fontWeight: 600, fontSize: 14 }}>
              <Icon name="up" size={14} sw={2.4} /> 6.2%
            </span>
            <span style={{ display: "inline-flex", alignItems: "center", gap: 7, color: "var(--muted)", fontWeight: 600, fontSize: 14 }}>
              <Icon name="globe" size={16} /> EN / ES
            </span>
          </div>
        </Example>
      </DocSection>

      <DocSection id="api" title="API">
        <PropsTable
          rows={[
            { prop: "name", type: "IconName", description: <>Glyph key into <Code>ICON_PATHS</Code>. Type-checked — an unknown name is a compile error.</> },
            { prop: "size", type: "number", default: "18", description: "Rendered width and height in px (viewBox stays 24×24)." },
            { prop: "sw", type: "number", default: "2", description: "Stroke width. Bump to 2.4 for glyphs under 14px so they don't wash out." },
            { prop: "...props", type: 'SVGProps<SVGSVGElement>', description: "Spread onto the <svg>. aria-hidden defaults to true." },
          ]}
        />
      </DocSection>

      <DocSection id="accessibility" title="Accessibility">
        <Prose>
          Icons are decorative by default (<Code>aria-hidden=&quot;true&quot;</Code>).
          When an icon is the only content of a control, the <em>control</em>{" "}
          carries the accessible name — an <Code>aria-label</Code> on the
          button, never on the SVG. See the product card&apos;s favorite
          button for the reference implementation.
        </Prose>
        <DoDont
          dos={[
            <>Label icon-only buttons: <Code>&lt;button aria-label=&quot;Close&quot;&gt;&lt;Icon name=&quot;close&quot; /&gt;&lt;/button&gt;</Code></>,
            "Keep stroke geometry on the 24×24 grid when adding glyphs.",
          ]}
          donts={[
            "Don't put aria-label on the SVG itself — it's hidden from the tree.",
            "Don't mix filled icons into the set; stroke-only is the language.",
            "Don't scale icons past 24px — draw a larger illustration instead.",
          ]}
        />
      </DocSection>
    </div>
  );
}

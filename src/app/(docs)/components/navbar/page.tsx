import type { Metadata } from "next";

import { Navbar } from "@/components/dc/navbar";
import { PageHeader, DocSection, DocH3, Code, Prose, Related } from "@/components/docs/doc-bits";
import { Example } from "@/components/docs/example";
import { PropsTable } from "@/components/docs/props-table";
import { DoDont } from "@/components/docs/do-dont";

export const metadata: Metadata = {
  title: "Navbar",
  description:
    "The Deckcenter navigation: navy utility strip plus main bar, with guest, buyer, and seller auth states.",
};

export default function NavbarPage() {
  return (
    <div>
      <PageHeader
        eyebrow="Components"
        title="Navbar"
        lead={
          <>
            A thin navy utility strip sits above the main bar. Auth state
            drives the right-side slot — <strong>guest</strong>,{" "}
            <strong>buyer</strong>, and <strong>seller</strong> each render a
            distinct action group. Below 800px the links and secondary
            actions collapse into a slide-in drawer.
          </>
        }
        importCode={`import { Navbar, type NavState } from "@pxpiestudio/sleeve-ds";`}
      />

      <DocSection
        id="states"
        title="Auth states"
        lead="One component, three configurations. The left side (logo, links) is constant; identity and calls-to-action change."
      >
        <DocH3>Guest — sign in + seller portal nudge</DocH3>
        <Example code={`<Navbar state="guest" />`}>
          <div className="nav-demo-wrap">
            <Navbar state="guest" />
          </div>
        </Example>

        <DocH3>Buyer — avatar + Start selling nudge</DocH3>
        <Example code={`<Navbar state="buyer" />`}>
          <div className="nav-demo-wrap">
            <Navbar state="buyer" />
          </div>
        </Example>

        <DocH3>Seller — role switcher + avatar</DocH3>
        <Example code={`<Navbar state="seller" />`}>
          <div className="nav-demo-wrap">
            <Navbar state="seller" />
          </div>
        </Example>
      </DocSection>

      <DocSection
        id="anatomy"
        title="Anatomy"
        lead="Utility strip (always navy, both themes) → main bar (surface). The strip carries locale, currency, and portal links; the bar carries brand, primary nav, search access, cart, and identity."
      >
        <Prose>
          The utility strip&apos;s text sits at 58–65% on-navy opacity — those
          exact composites are fixture rows in the contrast suite, so
          don&apos;t lighten them further. The cart button badges its count
          with the accent dot; the avatar is the accent circle with the
          user&apos;s initials.
        </Prose>
      </DocSection>

      <DocSection id="api" title="API">
        <PropsTable
          rows={[
            { prop: "state", type: '"guest" | "buyer" | "seller"', description: "Which right-side action group renders. Required." },
          ]}
        />
        <Prose>
          Labels inside the navbar come from the{" "}
          <Code>LanguageProvider</Code> dictionary, so the whole bar
          re-translates with the language toggle.
        </Prose>
      </DocSection>

      <DocSection id="accessibility" title="Accessibility">
        <ul className="doc-ul">
          <li>
            The mobile drawer moves focus to its close button on open,
            restores it to the hamburger on close, closes on Escape, and is{" "}
            <Code>visibility: hidden</Code> while closed so it leaves the tab
            order.
          </li>
          <li>
            The hamburger exposes <Code>aria-expanded</Code>; cart and avatar
            buttons carry <Code>aria-label</Code>s.
          </li>
          <li>
            Both bars are landmarks-friendly: render the component once per
            page, inside your <Code>&lt;header&gt;</Code>.
          </li>
        </ul>
      </DocSection>

      <DocSection id="usage" title="Usage">
        <DoDont
          dos={[
            "Drive state from your real auth session — the three states are the complete matrix.",
            "Keep primary nav to 3–4 links; overflow belongs in the drawer or footer.",
          ]}
          donts={[
            "Don't theme the utility strip — it stays navy in both themes by design.",
            "Don't add a second row of navigation below the bar; use in-page tabs instead.",
          ]}
        />
      </DocSection>

      <Related hrefs={["/components/toggles", "/components/search-bar", "/foundations/color"]} />
    </div>
  );
}

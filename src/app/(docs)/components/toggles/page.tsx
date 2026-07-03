import type { Metadata } from "next";
import Link from "next/link";

import { ThemeToggle } from "@/components/dc/theme-toggle";
import { LangToggle } from "@/components/dc/lang-toggle";
import { ControlledRoleDemo } from "@/components/docs/demos";
import { PageHeader, DocSection, Code, Prose, Related } from "@/components/docs/doc-bits";
import { Example } from "@/components/docs/example";
import { PropsTable } from "@/components/docs/props-table";
import { DoDont } from "@/components/docs/do-dont";

export const metadata: Metadata = {
  title: "Toggles & switchers",
  description:
    "Theme toggle, EN/ES language toggle, and the buyer/seller role switcher.",
};

export default function TogglesPage() {
  return (
    <div>
      <PageHeader
        eyebrow="Components"
        title="Toggles & switchers"
        lead={
          <>
            Three small mode controls share one grammar: segmented options in
            a pill or rounded group, the active segment filled with the
            accent, state exposed via <Code>aria-pressed</Code>.
          </>
        }
        importCode={`import { ThemeToggle, LangToggle, RoleSwitcher } from "@pxpiestudio/sleeve-ds";`}
      />

      <DocSection
        id="theme"
        title="Theme toggle"
        lead="Flips the .dark class through the ThemeProvider — this control switches the theme of the page you're reading. Label shows the destination, not the current state."
      >
        <Example code={`<ThemeToggle />`}>
          <ThemeToggle />
        </Example>
        <Prose>
          Theme state is read with <Code>useSyncExternalStore</Code>, so SSR
          (always light) reconciles to the real theme on the client without a
          hydration warning — details in{" "}
          <Link href="/patterns/theming">Theming</Link>.
        </Prose>
      </DocSection>

      <DocSection
        id="lang"
        title="Language toggle"
        lead="An EN/ES segmented control wired to the LanguageProvider. Self-contained: drop it anywhere inside the provider and the whole tree re-translates."
      >
        <Example code={`<LangToggle />`}>
          <LangToggle />
        </Example>
      </DocSection>

      <DocSection
        id="role"
        title="Role switcher"
        lead="The buyer/seller pill from the seller nav state. Controlled or uncontrolled, with overridable labels for localization."
      >
        <Example
          code={`const [role, setRole] = React.useState<Role>("seller");

<RoleSwitcher value={role} onValueChange={setRole} />`}
        >
          <ControlledRoleDemo />
        </Example>
      </DocSection>

      <DocSection id="api" title="API">
        <PropsTable
          caption="RoleSwitcher props"
          rows={[
            { prop: "value", type: '"buyer" | "seller"', description: "Controlled role." },
            { prop: "defaultValue", type: '"buyer" | "seller"', default: '"buyer"', description: "Initial role in uncontrolled mode." },
            { prop: "onValueChange", type: "(role: Role) => void", description: "Fires on selection." },
            { prop: "labels", type: "Record<Role, string>", default: '{ buyer: "Buyer", seller: "Seller" }', description: "Visible labels — override for localization." },
            { prop: "className", type: "string", description: "Applied to the group element." },
          ]}
        />
        <Prose>
          <Code>ThemeToggle</Code> and <Code>LangToggle</Code> take only{" "}
          <Code>className</Code> — their state lives in the providers, which
          must wrap the tree (see{" "}
          <Link href="/getting-started">Getting started</Link>).
        </Prose>
      </DocSection>

      <DocSection id="accessibility" title="Accessibility">
        <ul className="doc-ul">
          <li>
            Segmented groups have <Code>role=&quot;group&quot;</Code> with an{" "}
            <Code>aria-label</Code> (“Language”, “Account role”); each segment
            is a real button with <Code>aria-pressed</Code>.
          </li>
          <li>
            The theme toggle is a single button labeled “Toggle color theme” —
            its visible label (“Light”/“Dark”) names the destination state.
          </li>
          <li>
            Active segments use white-on-accent, a pairing locked in the
            contrast suite.
          </li>
        </ul>
      </DocSection>

      <DocSection id="usage" title="Usage">
        <DoDont
          dos={[
            "Keep segmented controls to 2–3 options; beyond that use a select.",
            "Place mode controls in chrome (nav, utility bar, footer) — not in content flow.",
          ]}
          donts={[
            "Don't use a segmented control for actions — segments represent state, not commands.",
            "Don't mix the toggle grammar with checkboxes for the same concept elsewhere.",
          ]}
        />
      </DocSection>

      <Related hrefs={["/patterns/theming", "/patterns/internationalization", "/components/navbar"]} />
    </div>
  );
}

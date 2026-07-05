import type { Metadata } from "next";

import { SearchBar } from "@/components/dc/search-bar";
import { PageHeader, DocSection, Code, Prose, Related } from "@/components/docs/doc-bits";
import { Example } from "@/components/docs/example";
import { PropsTable } from "@/components/docs/props-table";
import { DoDont } from "@/components/docs/do-dont";

export const metadata: Metadata = {
  title: "Search bar",
  description:
    "The Deckcenter hero search entry point: container-level focus and a submit CTA.",
};

export default function SearchBarPage() {
  return (
    <div>
      <PageHeader
        eyebrow="Components"
        title="Search bar"
        lead={
          <>
            The marketplace&apos;s primary entry point — a{" "}
            <Code>role=&quot;search&quot;</Code> form pairing a borderless
            input with a small primary button. Focus is handled at the{" "}
            <em>container</em> level via <Code>:focus-within</Code>, never on
            the input directly, so the whole bar lights up as one control.
          </>
        }
        importCode={`import { SearchBar } from "@pxpiestudio/sleeve-ds";`}
      />

      <DocSection
        id="default"
        title="Default"
        lead="Click into the field: the container border turns accent with a soft halo while the input itself stays chromeless."
      >
        <Example
          code={`<SearchBar onSearch={(query) => router.push(\`/search?q=\${query}\`)} />`}
        >
          <SearchBar className="max-w-[560px]" />
        </Example>
      </DocSection>

      <DocSection
        id="custom"
        title="Custom copy"
        lead="Placeholder and CTA label are props, so localized apps pass translated strings (see the internationalization pattern)."
      >
        <Example
          code={`<SearchBar
  placeholder="Busca Charizard ex, sets, producto sellado…"
  ctaLabel="Buscar"
/>`}
        >
          <SearchBar
            className="max-w-[560px]"
            placeholder="Busca Charizard ex, sets, producto sellado…"
            ctaLabel="Buscar"
          />
        </Example>
      </DocSection>

      <DocSection id="api" title="API">
        <PropsTable
          rows={[
            { prop: "placeholder", type: "string", default: '"Search Charizard ex, …"', description: "Hint text; also used as the input's aria-label." },
            { prop: "ctaLabel", type: "string", default: '"Search"', description: "Submit button label." },
            { prop: "defaultValue", type: "string", default: '""', description: "Initial query (uncontrolled)." },
            { prop: "onSearch", type: "(query: string) => void", description: "Called with the trimmed query on submit (Enter or button)." },
            { prop: "className", type: "string", description: "Applied to the form — constrain width here." },
          ]}
        />
      </DocSection>

      <DocSection id="accessibility" title="Accessibility">
        <ul className="doc-ul">
          <li>
            The form has <Code>role=&quot;search&quot;</Code>, giving screen
            reader users a search landmark.
          </li>
          <li>
            The input takes its accessible name from the placeholder via{" "}
            <Code>aria-label</Code> — keep placeholders descriptive of the
            domain, not generic (“Search cards, sets…”).
          </li>
          <li>
            Enter submits (native form behavior); the visible button is a
            true <Code>type=&quot;submit&quot;</Code>.
          </li>
        </ul>
      </DocSection>

      <DocSection id="usage" title="Usage">
        <Prose>
          One search bar per page, in the hero or the navbar — it&apos;s the
          primary action of the browse experience.
        </Prose>
        <DoDont
          dos={[
            "Constrain the width (≈560px) in wide layouts so the CTA stays adjacent to the text.",
            "Debounce live-suggestion fetching; onSearch itself fires only on submit.",
          ]}
          donts={[
            "Don't add a second border or focus ring to the inner input.",
            "Don't repurpose it as a filter field inside tables — it's the page-level search.",
          ]}
        />
      </DocSection>

      <Related hrefs={["/components/input", "/components/navbar", "/components/button"]} />
    </div>
  );
}

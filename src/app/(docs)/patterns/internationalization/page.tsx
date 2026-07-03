import type { Metadata } from "next";

import { LangToggle } from "@/components/dc/lang-toggle";
import { Navbar } from "@/components/dc/navbar";
import { PageHeader, DocSection, Code, Prose, Related } from "@/components/docs/doc-bits";
import { Example } from "@/components/docs/example";
import { CodeBlock } from "@/components/docs/code-block";
import { DoDont } from "@/components/docs/do-dont";

export const metadata: Metadata = {
  title: "Internationalization",
  description:
    "The Sleeve System EN/ES language layer: provider, hook, and translated components.",
};

export default function InternationalizationPage() {
  return (
    <div>
      <PageHeader
        eyebrow="Patterns"
        title="Internationalization"
        lead={
          <>
            Deckcenter ships bilingual (EN/ES). The system&apos;s i18n layer
            is deliberately minimal: a <Code>LanguageProvider</Code> holding a
            key→string dictionary, a <Code>useLanguage()</Code> hook exposing{" "}
            <Code>lang</Code>, <Code>setLang</Code>, and <Code>t()</Code>, and
            components that consume it.
          </>
        }
        importCode={`import { LanguageProvider, useLanguage, LangToggle, type Lang } from "@pxpiestudio/sleeve-ds";`}
      />

      <DocSection
        id="live"
        title="Try it"
        lead="The toggle and the navbar share the same provider — switch to ES and watch the nav labels re-translate."
      >
        <Example
          code={`<LangToggle />
<Navbar state="guest" />  {/* labels come from t("nav.*") */}`}
        >
          <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
            <LangToggle />
            <div className="nav-demo-wrap">
              <Navbar state="guest" />
            </div>
          </div>
        </Example>
      </DocSection>

      <DocSection
        id="hook"
        title="The hook"
        lead="t() resolves a key in the active language, falls back to English, then to the key itself — a missing translation degrades visibly instead of crashing."
      >
        <CodeBlock
          code={`"use client";
import { useLanguage } from "@pxpiestudio/sleeve-ds";

export function SellNudge() {
  const { lang, setLang, t } = useLanguage();
  return (
    <div>
      <p>{t("nav.howItWorks")}</p>
      <button onClick={() => setLang(lang === "en" ? "es" : "en")}>
        {t("nav.startSelling")}
      </button>
    </div>
  );
}`}
        />
        <Prose>
          The provider synchronizes <Code>document.documentElement.lang</Code>{" "}
          with the active language, so screen readers switch pronunciation
          rules when the user switches language.
        </Prose>
      </DocSection>

      <DocSection
        id="scope"
        title="Scope & philosophy"
        lead="The dictionary covers component chrome — nav labels, search copy, role names. Product content (card names, set names) stays in its source language by design."
      >
        <ul className="doc-ul">
          <li>
            Keys are namespaced (<Code>nav.*</Code>, <Code>search.*</Code>,{" "}
            <Code>role.*</Code>); additions extend the <Code>STRINGS</Code>{" "}
            table for both languages at once.
          </li>
          <li>
            Components with visible strings accept label overrides (e.g.{" "}
            <Code>RoleSwitcher labels</Code>, <Code>SearchBar placeholder</Code>)
            so app-level i18n systems can drive them instead.
          </li>
          <li>
            Spanish copy runs ~20% longer than English — components are built
            to tolerate that (wrapping chips, truncating rows), and new
            components should be too.
          </li>
        </ul>
      </DocSection>

      <DocSection id="usage" title="Usage">
        <DoDont
          dos={[
            <>Route all chrome strings through <Code>t()</Code> — a hardcoded label is a bug in one language.</>,
            "Add both EN and ES entries in the same change; the fallback is a safety net, not a workflow.",
            "Test layouts in ES — it's the longer language.",
          ]}
          donts={[
            "Don't translate product data (card names, set codes).",
            "Don't concatenate translated fragments; make each key a complete phrase.",
          ]}
        />
      </DocSection>

      <Related hrefs={["/components/toggles", "/components/navbar", "/components/search-bar"]} />
    </div>
  );
}

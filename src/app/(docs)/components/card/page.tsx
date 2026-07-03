import type { Metadata } from "next";

import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { PageHeader, DocSection, Code, Prose, Related } from "@/components/docs/doc-bits";
import { Example } from "@/components/docs/example";
import { PropsTable } from "@/components/docs/props-table";
import { DoDont } from "@/components/docs/do-dont";

export const metadata: Metadata = {
  title: "Card",
  description:
    "The shadcn-style surface primitive: header, title, description, content, and footer slots.",
};

export default function CardPage() {
  return (
    <div>
      <PageHeader
        eyebrow="Components"
        title="Card"
        lead={
          <>
            The generic elevated surface: <Code>--surface</Code> background,
            1px <Code>--border</Code>, <Code>--radius</Code> corners, and the
            default shadow. Six composable slots follow the shadcn card
            anatomy — use what a given card needs, skip the rest.
          </>
        }
        importCode={`import {
  Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter,
} from "@pxpiestudio/sleeve-ds";`}
      />

      <DocSection
        id="anatomy"
        title="Anatomy"
        lead="Header (title + description) → content → footer. Each slot only contributes spacing, so composition stays flexible."
      >
        <Example
          code={`<Card>
  <CardHeader>
    <CardTitle>Seller payout</CardTitle>
    <CardDescription>Transferred after pickup is confirmed.</CardDescription>
  </CardHeader>
  <CardContent>
    <p className="font-head text-2xl font-bold">$1,240.50</p>
  </CardContent>
  <CardFooter>
    <Button size="sm">Withdraw</Button>
  </CardFooter>
</Card>`}
        >
          <Card style={{ maxWidth: 420 }}>
            <CardHeader>
              <CardTitle>Seller payout</CardTitle>
              <CardDescription>Transferred after pickup is confirmed.</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="font-head text-2xl font-bold" style={{ margin: 0 }}>
                $1,240.50
              </p>
            </CardContent>
            <CardFooter>
              <Button size="sm">Withdraw</Button>
            </CardFooter>
          </Card>
        </Example>
        <Prose>
          For the marketplace listing surface — art, rarity, price, delta —
          use the purpose-built{" "}
          <Code>ProductCard</Code> instead of assembling one from these slots.
        </Prose>
      </DocSection>

      <DocSection id="api" title="API">
        <PropsTable
          rows={[
            { prop: "Card", type: 'ComponentProps<"div">', description: "Surface + border + radius + shadow. No layout opinions." },
            { prop: "CardHeader", type: 'ComponentProps<"div">', description: "Column with a 6px gap and 24px padding." },
            { prop: "CardTitle", type: 'ComponentProps<"div">', description: <>Heading-font, 16px/700. Not a semantic heading — add your own <Code>&lt;h*&gt;</Code> when the card titles a page region.</> },
            { prop: "CardDescription", type: 'ComponentProps<"div">', description: "13px muted supporting copy." },
            { prop: "CardContent", type: 'ComponentProps<"div">', description: "24px padding, no top padding (header owns the gap)." },
            { prop: "CardFooter", type: 'ComponentProps<"div">', description: "Horizontal flex row for actions." },
          ]}
        />
      </DocSection>

      <DocSection id="accessibility" title="Accessibility">
        <ul className="doc-ul">
          <li>
            Cards are generic <Code>&lt;div&gt;</Code>s — semantics come from
            content. If a card is a page-level region, give it a heading
            element; if it&apos;s one of many in a feed, a list wrapper helps
            navigation.
          </li>
          <li>
            Don&apos;t make the whole card a click target with a handler on
            the div; wrap the title in the link and expand its hit area
            instead.
          </li>
        </ul>
      </DocSection>

      <DocSection id="usage" title="Usage">
        <DoDont
          dos={[
            "Compose only the slots you need — a stat card may be Header + Content.",
            "Keep one action group per card, in the footer.",
          ]}
          donts={[
            "Don't nest cards; use surface-2 fills inside a card for sub-grouping.",
            "Don't override the radius or shadow per-card — that's a token decision.",
          ]}
        />
      </DocSection>

      <Related hrefs={["/components/product-card", "/foundations/elevation", "/foundations/spacing"]} />
    </div>
  );
}

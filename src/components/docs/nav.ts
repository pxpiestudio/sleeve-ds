/**
 * Documentation site map — single source of truth for the sidebar, the
 * home-page section cards, and the prev/next footer navigation. Order here
 * is reading order.
 *
 * Descriptions render on index tiles and Related lists — keep them to one
 * short scannable line; the page's own lead carries the full story.
 */

export type DocPage = {
  href: string;
  label: string;
  /** One-line summary shown on index/gallery cards. */
  description: string;
};

export type DocGroup = {
  title: string;
  pages: DocPage[];
};

export const DOCS_NAV: DocGroup[] = [
  {
    title: "Overview",
    pages: [
      {
        href: "/",
        label: "Introduction",
        description: "What the Sleeve System is and how the docs are organized.",
      },
      {
        href: "/getting-started",
        label: "Getting started",
        description: "Install, mount the providers, render your first component.",
      },
    ],
  },
  {
    title: "Foundations",
    pages: [
      {
        href: "/foundations/brand",
        label: "Brand & logo",
        description: "Construction, clear space, scale, and incorrect usage for the wordmark and the mark.",
      },
      {
        href: "/foundations/color",
        label: "Color",
        description: "Surface, text, and signal tokens — plus the AA text variants.",
      },
      {
        href: "/foundations/typography",
        label: "Typography",
        description: "Saira for headings, Geist for body — the full scale.",
      },
      {
        href: "/foundations/spacing",
        label: "Spacing & radius",
        description: "The spacing rhythm, density multiplier, and radius tokens.",
      },
      {
        href: "/foundations/elevation",
        label: "Elevation",
        description: "Two navy-tinted shadow levels.",
      },
      {
        href: "/foundations/motion",
        label: "Motion",
        description: "One easing curve, four duration bands.",
      },
      {
        href: "/foundations/icons",
        label: "Iconography",
        description: "The inline SVG stroke icon set.",
      },
      {
        href: "/foundations/accessibility",
        label: "Accessibility",
        description: "Contrast doctrine, focus rules, and the three audit layers.",
      },
    ],
  },
  {
    title: "Components",
    pages: [
      {
        href: "/components",
        label: "Overview",
        description: "Every component in the system at a glance.",
      },
      {
        href: "/components/button",
        label: "Button",
        description: "Primary, ghost, and quiet intents in four sizes.",
      },
      {
        href: "/components/badge",
        label: "Badge",
        description: "Generic badges plus grade and rarity chips.",
      },
      {
        href: "/components/status-badge",
        label: "Status badge",
        description: "Six order-lifecycle tones, one color language.",
      },
      {
        href: "/components/card",
        label: "Card",
        description: "The surface primitive with composable slots.",
      },
      {
        href: "/components/input",
        label: "Input",
        description: "The text field and its labeling rules.",
      },
      {
        href: "/components/search-bar",
        label: "Search bar",
        description: "The hero search entry point.",
      },
      {
        href: "/components/qty-control",
        label: "Quantity control",
        description: "A +/− stepper for cart rows.",
      },
      {
        href: "/components/toggles",
        label: "Toggles & switchers",
        description: "Theme, language, and role controls.",
      },
      {
        href: "/components/navbar",
        label: "Navbar",
        description: "Guest, buyer, and seller navigation states.",
      },
      {
        href: "/components/product-card",
        label: "Product card",
        description: "The marketplace listing surface.",
      },
      {
        href: "/components/card-art",
        label: "Card art",
        description: "Hue-seeded card-art placeholder.",
      },
      {
        href: "/components/price-comparison",
        label: "Price comparison",
        description: "Cross-marketplace price tiles.",
      },
      {
        href: "/components/inbox-row",
        label: "Inbox row",
        description: "Dense order rows that reflow on mobile.",
      },
      {
        href: "/components/listing-card",
        label: "Listing card",
        description: "One seller's row for a card — grade, seller, price.",
      },
      {
        href: "/components/expansion-tile",
        label: "Expansion tile",
        description: "Set selector for horizontal rails.",
      },
      {
        href: "/components/seller-card",
        label: "Seller card",
        description: "Public seller profile summary.",
      },
      {
        href: "/components/stat-stripe",
        label: "Stat stripe",
        description: "Hairline-divided headline metrics, plus a mini bar chart.",
      },
      {
        href: "/components/sealed-product-card",
        label: "Sealed product card",
        description: "Metallic placeholder for booster boxes and ETBs.",
      },
      {
        href: "/components/plan-card",
        label: "Plan card",
        description: "Pricing tier card, with a featured/pro variant.",
      },
    ],
  },
  {
    title: "Patterns",
    pages: [
      {
        href: "/patterns/order-lifecycle",
        label: "Order lifecycle",
        description: "Buyer and seller status flows and their colors.",
      },
      {
        href: "/patterns/theming",
        label: "Theming",
        description: "Dark mode, accent overrides, and density.",
      },
      {
        href: "/patterns/internationalization",
        label: "Internationalization",
        description: "The EN/ES language layer.",
      },
    ],
  },
];

export const ALL_PAGES: DocPage[] = DOCS_NAV.flatMap((g) => g.pages);

/** Group title for a given href (used for page eyebrows / breadcrumbs). */
export function groupOf(href: string): string {
  return (
    DOCS_NAV.find((g) => g.pages.some((p) => p.href === href))?.title ??
    "Overview"
  );
}

/** Previous / next page in reading order for the footer pager. */
export function neighborsOf(href: string): {
  prev: DocPage | null;
  next: DocPage | null;
} {
  const i = ALL_PAGES.findIndex((p) => p.href === href);
  if (i === -1) return { prev: null, next: null };
  return {
    prev: i > 0 ? ALL_PAGES[i - 1] : null,
    next: i < ALL_PAGES.length - 1 ? ALL_PAGES[i + 1] : null,
  };
}

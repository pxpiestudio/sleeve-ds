import { readFile } from "node:fs/promises";
import { join } from "node:path";
import type { ComponentType } from "react";
import { ImageResponse } from "next/og";

import { ALL_PAGES, groupOf } from "@/components/docs/nav";
import { OgChrome } from "./chrome";

export const size = { width: 1200, height: 630 } as const;
export const contentType = "image/png";

async function loadFonts() {
  const dir = join(process.cwd(), "src/assets/fonts");
  const [sairaBold, sairaSemiBold, geistRegular, geistMedium] = await Promise.all([
    readFile(join(dir, "Saira-Bold.ttf")),
    readFile(join(dir, "Saira-SemiBold.ttf")),
    readFile(join(dir, "Geist-Regular.ttf")),
    readFile(join(dir, "Geist-Medium.ttf")),
  ]);
  return [
    { name: "Saira", data: sairaBold, weight: 700 as const, style: "normal" as const },
    { name: "Saira", data: sairaSemiBold, weight: 600 as const, style: "normal" as const },
    { name: "Geist", data: geistRegular, weight: 400 as const, style: "normal" as const },
    { name: "Geist", data: geistMedium, weight: 500 as const, style: "normal" as const },
  ];
}

/**
 * Builds the default-exported Image function + `alt` for a doc route's
 * opengraph-image.tsx, pulling title/description/group straight from
 * nav.ts (the docs' single source of truth) so the OG card can never drift
 * from the page's own copy. `Preview` is the small brand-token mock that
 * goes in the card's right-hand panel.
 */
export function createOgImage(href: string, Preview: ComponentType) {
  const page = ALL_PAGES.find((p) => p.href === href);
  if (!page) {
    throw new Error(`createOgImage: no nav entry for "${href}"`);
  }
  const eyebrow = groupOf(href);
  const title = page.label;
  const description = page.description;
  const alt = `${title} — Sleeve System`;

  async function Image() {
    const fonts = await loadFonts();
    return new ImageResponse(
      (
        <OgChrome eyebrow={eyebrow} title={title} description={description}>
          <Preview />
        </OgChrome>
      ),
      { ...size, fonts },
    );
  }

  return { Image, alt };
}

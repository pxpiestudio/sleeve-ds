import { test, expect, type Page } from "@playwright/test";
import AxeBuilder from "@axe-core/playwright";

import { ALL_PAGES } from "../src/components/docs/nav";

/**
 * Axe scan of every documentation route in both themes. The docs are now
 * multi-page, so coverage comes from the site map itself (ALL_PAGES) — a new
 * page added to the nav is automatically scanned.
 *
 * Theme is set via localStorage before load (the same key themeInitScript
 * reads), so the correct theme applies before first paint and there is no
 * 0.5s body crossfade for axe to sample mid-transition.
 */
async function runAxe(page: Page) {
  const results = await new AxeBuilder({ page }).analyze();
  const summary = results.violations.map(
    (v) =>
      `[${v.impact}] ${v.id} — ${v.help} (${v.nodes.length} node${v.nodes.length === 1 ? "" : "s"})\n` +
      v.nodes.map((n) => `    ${n.target.join(" ")}`).join("\n"),
  );
  expect(summary, summary.join("\n\n")).toEqual([]);
}

for (const theme of ["light", "dark"] as const) {
  test.describe(`axe — ${theme} theme`, () => {
    test.use({ colorScheme: theme });

    for (const docPage of ALL_PAGES) {
      test(`${docPage.href} has no violations`, async ({ page }) => {
        await page.addInitScript(
          (t) => window.localStorage.setItem("dc-theme", t),
          theme,
        );
        await page.goto(docPage.href);
        if (theme === "dark") {
          await expect(page.locator("html")).toHaveClass(/dark/);
        }
        await runAxe(page);
      });
    }
  });
}

// `body` has a 0.5s color/background transition (theme crossfade). When the
// theme changes *after* load, wait for it to settle before scanning so axe
// doesn't sample an intermediate color.
const THEME_TRANSITION_MS = 1000;

test("theme toggle flips the document class and stays axe-clean", async ({ page }) => {
  await page.goto("/");
  await page
    .getByRole("button", { name: "Toggle color theme" })
    .first()
    .click();
  await expect(page.locator("html")).toHaveClass(/dark/);
  await page.waitForTimeout(THEME_TRANSITION_MS);
  await runAxe(page);
});

test("skip link is the first tab stop and targets the content region", async ({ page }) => {
  await page.goto("/");
  await page.keyboard.press("Tab");
  const skipLink = page.getByRole("link", { name: "Skip to content" });
  await expect(skipLink).toBeFocused();
  await skipLink.press("Enter");
  await expect(page).toHaveURL(/#docs-content$/);
});

test.describe("spotlight search", () => {
  test("Cmd+K opens the spotlight, focuses the input, and Escape restores focus", async ({ page }) => {
    await page.goto("/");
    const trigger = page.getByRole("button", { name: "Search docs…" });
    await trigger.focus();
    await page.keyboard.press("ControlOrMeta+k");
    const input = page.getByRole("combobox", { name: "Search the design system" });
    await expect(input).toBeFocused();
    await page.keyboard.press("Escape");
    // Closed state is opacity/inert-driven (matches the sidebar drawer
    // convention), not display:none, so assert on `inert` rather than
    // Playwright's toBeHidden() (which opacity: 0 doesn't satisfy).
    await expect(page.locator(".ds-spotlight")).toHaveAttribute("inert", "");
    await expect(trigger).toBeFocused();
  });

  test("typing filters results and Enter navigates to the selected page", async ({ page }) => {
    await page.goto("/");
    await page.getByRole("button", { name: "Search docs…" }).click();
    const input = page.getByRole("combobox", { name: "Search the design system" });
    await input.fill("badge");
    await expect(page.getByRole("option", { name: /^Badge/ })).toBeVisible();
    await page.keyboard.press("Enter");
    await expect(page).toHaveURL(/\/components\/badge$/);
  });

  test("spotlight search is axe-clean with results showing", async ({ page }) => {
    await page.goto("/");
    await page.getByRole("button", { name: "Search docs…" }).click();
    await page.getByRole("combobox", { name: "Search the design system" }).fill("color");
    await expect(page.getByRole("option").first()).toBeVisible();
    await runAxe(page);
  });
});

test("<html lang> follows the EN/ES language toggle", async ({ page }) => {
  await page.goto("/patterns/internationalization");
  await expect(page.locator("html")).toHaveAttribute("lang", "en");
  // Scope to the LangToggle group — the navbar demo has its own EN/ES buttons.
  const langGroup = page.getByRole("group", { name: "Language" });
  await langGroup.getByRole("button", { name: "ES" }).click();
  await expect(page.locator("html")).toHaveAttribute("lang", "es");
  await langGroup.getByRole("button", { name: "EN" }).click();
  await expect(page.locator("html")).toHaveAttribute("lang", "en");
});

import { defineConfig, devices } from "@playwright/test";

/**
 * Two independent suites share this one config, split by project so neither
 * clobbers the other:
 *  - "a11y"  → e2e/a11y.spec.ts, the WCAG 2 AA axe scan (see AGENTS.md).
 *  - general → tests/**, everyday Playwright specs for this app.
 * Both hit the same production build via the shared webServer below — axe
 * needs the real build (not next dev) per Next's own testing guide, and
 * reusing it for the general suite avoids running two servers.
 */
export default defineConfig({
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 2 : 0,
  workers: process.env.CI ? 1 : undefined,
  reporter: "list",
  use: {
    baseURL: "http://localhost:3000",
    trace: "on-first-retry",
  },
  projects: [
    {
      name: "a11y",
      testDir: "./e2e",
      use: { ...devices["Desktop Chrome"] },
    },
    {
      name: "chromium",
      testDir: "./tests",
      use: { ...devices["Desktop Chrome"] },
    },
    {
      name: "firefox",
      testDir: "./tests",
      use: { ...devices["Desktop Firefox"] },
    },
    {
      name: "webkit",
      testDir: "./tests",
      use: { ...devices["Desktop Safari"] },
    },
  ],
  // Test against the production build, per Next.js's own Playwright guide —
  // closer to real behavior than `next dev`.
  webServer: {
    command: "npm run build && npm run start",
    url: "http://localhost:3000",
    reuseExistingServer: !process.env.CI,
    timeout: 180_000,
  },
});

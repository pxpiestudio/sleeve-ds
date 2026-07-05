/**
 * Literal color values for the OG image renderer. `next/og` (Satori) has no
 * DOM/CSSOM — it can't resolve `var(--token)` or `color-mix()` from
 * deckcenter.css, so every value here is copy-pasted from the `.dark` block
 * in src/styles/deckcenter.css. OG cards always render in the dark palette
 * regardless of the viewer's site theme (same reasoning as the docs' code
 * blocks: a fixed look reads more consistently as a shared link than one
 * that depends on who's viewing it). Keep this in sync if those tokens move.
 */
export const T = {
  navy: "#121427",
  magenta: "#de0e7f",
  purple: "#8a2bb8",
  lavender: "#e8edf9",

  success: "#1fad66",
  danger: "#e0466b",
  amber: "#f0a030",
  info: "#2a6fdb",

  bg: "#0a0c18",
  bg2: "#0e1124",
  surface: "#15182c",
  surface2: "#1c2038",
  text: "#e8edf9",
  muted: "#9aa0c4",
  faint: "#8388aa",
  border: "rgba(232, 237, 249, 0.1)",
  borderStrong: "rgba(232, 237, 249, 0.18)",

  accentText: "#e85ba8",
  successText: "#1fad66",
  dangerText: "#e14d70",
  amberText: "#f0a030",
  infoText: "#538be2",
  purpleText: "#b070cf",
} as const;

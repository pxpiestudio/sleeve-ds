# Product

## Register

product

## Users

Developers and designers on the Deckcenter marketplace team (and downstream
consumers of `@pxpiestudio/sleeve-ds`). They come to the docs site mid-task:
to look up a component's API, copy a working example, check a token value, or
verify an accessibility rule before shipping.

## Product Purpose

The living documentation site for the Sleeve System — the design system behind
the Deckcenter Pokémon TCG marketplace. It is both the reference (tokens,
component APIs, patterns, do/don't guidance) and the proof: the site renders
from the same package consumers install, in both themes. Success = a consumer
finds the answer and a correct copy-pasteable example in under a minute.

## Brand Personality

Confident, playful-precise, trading-card energy. Saira's sporty display voice
and the magenta accent carry the personality; the documentation chrome itself
stays quiet and utilitarian so component demos are the loudest thing on any
page.

## Anti-references

- Generic Tailwind-template docs (wall of identical cards, no voice).
- Marketing-site treatment of reference pages — no hero moments inside
  component docs, no scroll choreography.
- Dense API dumps with no live examples (javadoc-style reference).

## Design Principles

1. **Practice what you preach** — the docs must pass every audit the system
   prescribes (AA contrast, focus, labels). A violation in the docs is a bug.
2. **Demos are the hierarchy** — chrome, prose, and tables support the live
   component previews, never compete with them.
3. **One source of truth** — the site renders the published package's tokens
   and components; nothing is re-styled for the docs.
4. **Scannable first, readable second** — mid-task users scan; leads, tables,
   and do/don'ts must answer before the prose does.

## Accessibility & Inclusion

WCAG 2 AA, enforced in CI-shaped gates: jsx-a11y strict lint, a contrast unit
suite over every text/background token pair (both themes), and an axe scan of
every route in light and dark. Reduced motion is honored globally.

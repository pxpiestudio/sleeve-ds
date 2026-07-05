import * as React from "react";

export type TokenRow = {
  token: string;
  /** Literal value in the light theme (shown as text). */
  light: string;
  /** Literal value in the dark theme (shown as text). */
  dark: string;
  usage: React.ReactNode;
  /** Skip the live swatch (for shadows, fonts, and other non-color values). */
  noSwatch?: boolean;
};

/**
 * Design-token reference table. The swatch renders `var(token)` live, so it
 * always shows the value for the active theme; the light/dark columns list
 * both literal values for reference.
 */
export function TokenTable({ rows }: { rows: TokenRow[] }) {
  return (
    // eslint-disable-next-line jsx-a11y/no-noninteractive-tabindex -- WCAG SCR26: makes the horizontally-scrollable wrapper keyboard-reachable
    <div className="doc-table-wrap" tabIndex={0}>
      <table className="doc-table doc-token-table">
        <caption className="sr-only">Design tokens</caption>
        <thead>
          <tr>
            <th scope="col">Token</th>
            <th scope="col">Light</th>
            <th scope="col">Dark</th>
            <th scope="col">Usage</th>
          </tr>
        </thead>
        <tbody>
          {rows.map((row) => (
            <tr key={row.token}>
              <td>
                <span className="doc-token-cell">
                  {!row.noSwatch && (
                    <span
                      className="doc-token-swatch"
                      style={{ background: `var(${row.token})` }}
                      aria-hidden="true"
                    />
                  )}
                  <code className="doc-table-code">{row.token}</code>
                </span>
              </td>
              <td>
                <code className="doc-table-code doc-table-type">{row.light}</code>
              </td>
              <td>
                <code className="doc-table-code doc-table-type">{row.dark}</code>
              </td>
              <td>{row.usage}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

import * as React from "react";

export type PropRow = {
  prop: string;
  type: string;
  default?: string;
  description: React.ReactNode;
};

/**
 * Component API table. Wrapped in an overflow container so wide type unions
 * scroll horizontally instead of breaking the page on small screens.
 */
export function PropsTable({
  rows,
  caption = "Props",
}: {
  rows: PropRow[];
  caption?: string;
}) {
  return (
    <div className="doc-table-wrap">
      <table className="doc-table">
        <caption className="sr-only">{caption}</caption>
        <thead>
          <tr>
            <th scope="col">Prop</th>
            <th scope="col">Type</th>
            <th scope="col">Default</th>
            <th scope="col">Description</th>
          </tr>
        </thead>
        <tbody>
          {rows.map((row) => (
            <tr key={row.prop}>
              <td>
                <code className="doc-table-code">{row.prop}</code>
              </td>
              <td>
                <code className="doc-table-code doc-table-type">{row.type}</code>
              </td>
              <td>
                {row.default ? (
                  <code className="doc-table-code">{row.default}</code>
                ) : (
                  <span aria-hidden="true">—</span>
                )}
              </td>
              <td>{row.description}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

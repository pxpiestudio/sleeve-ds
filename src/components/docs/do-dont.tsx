import * as React from "react";

type Item = React.ReactNode;

/**
 * Polaris-style guidance pair. Each side is a short list of imperative
 * statements; the preview slot is optional for visual examples.
 */
export function DoDont({
  dos,
  donts,
}: {
  dos: Item[];
  donts: Item[];
}) {
  return (
    <div className="doc-dodont">
      <div className="doc-dodont-card do">
        <p className="doc-dodont-title doc-dodont-title-do">✓ Do</p>
        <ul>
          {dos.map((item, i) => (
            <li key={i}>{item}</li>
          ))}
        </ul>
      </div>
      <div className="doc-dodont-card dont">
        <p className="doc-dodont-title doc-dodont-title-dont">✕ Don&apos;t</p>
        <ul>
          {donts.map((item, i) => (
            <li key={i}>{item}</li>
          ))}
        </ul>
      </div>
    </div>
  );
}

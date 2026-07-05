import * as React from "react";

import { cn } from "@/lib/utils";
import { CodeBlock } from "@/components/docs/code-block";

type ExampleProps = {
  children: React.ReactNode;
  /** Source snippet shown under the preview. Omit for preview-only demos. */
  code?: string;
  lang?: "tsx" | "css" | "bash";
  /** Render the preview on the navy surface (for on-dark components). */
  onNavy?: boolean;
  /** Extra classes for the preview canvas (e.g. max-widths, stacking). */
  previewClassName?: string;
  /** Open the code disclosure by default. */
  defaultOpen?: boolean;
};

/**
 * A live component preview with its source in a native <details> disclosure —
 * keyboard-accessible with no client JS. The preview canvas is `--bg-2`
 * (same as the old .ds-canvas), so component demos keep the backdrop their
 * contrast pairs were measured against.
 */
export function Example({
  children,
  code,
  lang = "tsx",
  onNavy = false,
  previewClassName,
  defaultOpen = false,
}: ExampleProps) {
  return (
    <figure className="doc-example">
      <div
        className={cn("doc-example-preview", onNavy && "on-navy", previewClassName)}
      >
        {children}
      </div>
      {code && (
        <details className="doc-example-code" open={defaultOpen || undefined}>
          <summary>Show code</summary>
          <CodeBlock code={code} lang={lang} />
        </details>
      )}
    </figure>
  );
}

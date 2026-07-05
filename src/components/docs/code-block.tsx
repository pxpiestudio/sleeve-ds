import * as React from "react";

import { cn } from "@/lib/utils";
import { highlight } from "@/components/docs/highlight";
import { CopyButton } from "@/components/docs/copy-button";

type CodeBlockProps = {
  code: string;
  lang?: "tsx" | "css" | "bash";
  className?: string;
};

/**
 * Syntax-highlighted, copyable code block. `pre` is focusable so keyboard
 * users can scroll long snippets horizontally.
 */
export function CodeBlock({ code, lang = "tsx", className }: CodeBlockProps) {
  const trimmed = code.trim();
  return (
    <div className={cn("doc-code", className)}>
      <div className="doc-code-bar">
        <span className="doc-code-lang">{lang}</span>
        <CopyButton text={trimmed} />
      </div>
      {/* eslint-disable-next-line jsx-a11y/no-noninteractive-tabindex */}
      <pre tabIndex={0}>
        <code>{highlight(trimmed, lang)}</code>
      </pre>
    </div>
  );
}

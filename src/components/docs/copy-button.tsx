"use client";

import * as React from "react";

import { Icon } from "@/components/dc/icon";

/** Copy-to-clipboard affordance for code blocks. */
export function CopyButton({ text }: { text: string }) {
  const [copied, setCopied] = React.useState(false);
  const timer = React.useRef<ReturnType<typeof setTimeout> | null>(null);

  React.useEffect(() => {
    return () => {
      if (timer.current) clearTimeout(timer.current);
    };
  }, []);

  return (
    <button
      type="button"
      className="doc-copy-btn"
      aria-label={copied ? "Copied" : "Copy code"}
      onClick={async () => {
        try {
          await navigator.clipboard.writeText(text);
          setCopied(true);
          if (timer.current) clearTimeout(timer.current);
          timer.current = setTimeout(() => setCopied(false), 1800);
        } catch {
          // Clipboard unavailable (permissions / insecure context) — no-op.
        }
      }}
    >
      <Icon name={copied ? "check" : "layers"} size={13} />
      {copied ? "Copied" : "Copy"}
    </button>
  );
}

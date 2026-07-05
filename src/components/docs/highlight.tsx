import * as React from "react";

/**
 * Minimal, dependency-free syntax highlighting for the controlled snippets in
 * these docs. Not a general-purpose TSX parser — it colors four durable
 * classes (comments, strings, keywords, JSX/CSS names) and leaves everything
 * else at the default code color. Colors map to existing AA-safe text tokens
 * (see .doc-tok-* in design-system.css and the fixtures in contrast.test.ts).
 */

type Lang = "tsx" | "css" | "bash";

const TSX_PATTERN = new RegExp(
  [
    String.raw`(?<comment>\/\/[^\n]*|\/\*[\s\S]*?\*\/)`,
    String.raw`(?<string>"(?:[^"\\\n]|\\.)*"|'(?:[^'\\\n]|\\.)*'|` +
      "`(?:[^`\\\\]|\\\\.)*`)",
    String.raw`(?<keyword>\b(?:import|from|export|const|let|var|function|return|default|type|interface|async|await|new|true|false|null|undefined|as|if|else|extends)\b)`,
    String.raw`(?<tag><\/?[A-Za-z][\w.]*)`,
  ].join("|"),
  "g",
);

const CSS_PATTERN = new RegExp(
  [
    String.raw`(?<comment>\/\*[\s\S]*?\*\/)`,
    String.raw`(?<string>"(?:[^"\\\n]|\\.)*"|'(?:[^'\\\n]|\\.)*')`,
    String.raw`(?<keyword>--[\w-]+)`,
    String.raw`(?<tag>@[\w-]+|\.[A-Za-z][\w-]*(?=[\s,{:.])) `.trimEnd(),
  ].join("|"),
  "g",
);

const BASH_PATTERN = new RegExp(
  [
    String.raw`(?<comment>#[^\n]*)`,
    String.raw`(?<string>"(?:[^"\\\n]|\\.)*"|'[^'\n]*')`,
    String.raw`(?<keyword>\b(?:npm|npx|run|install)\b)`,
  ].join("|"),
  "g",
);

const PATTERNS: Record<Lang, RegExp> = {
  tsx: TSX_PATTERN,
  css: CSS_PATTERN,
  bash: BASH_PATTERN,
};

const GROUP_CLASS: Record<string, string> = {
  comment: "doc-tok-c",
  string: "doc-tok-s",
  keyword: "doc-tok-k",
  tag: "doc-tok-t",
};

export function highlight(code: string, lang: Lang): React.ReactNode[] {
  // Fresh regex state per call — the shared patterns are sticky via /g.
  const pattern = new RegExp(PATTERNS[lang].source, "g");
  const out: React.ReactNode[] = [];
  let last = 0;
  let key = 0;

  for (const match of code.matchAll(pattern)) {
    const index = match.index ?? 0;
    if (index > last) out.push(code.slice(last, index));
    const groups = match.groups ?? {};
    const groupName = Object.keys(groups).find((g) => groups[g] !== undefined);
    const cls = groupName ? GROUP_CLASS[groupName] : undefined;
    out.push(
      <span key={key++} className={cls}>
        {match[0]}
      </span>,
    );
    last = index + match[0].length;
  }
  if (last < code.length) out.push(code.slice(last));
  return out;
}

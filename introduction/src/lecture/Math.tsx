import katex from "katex";
import "katex/dist/katex.min.css";
import { useMemo, type ReactNode } from "react";
import styles from "./Lecture.module.css";

type MathProps = {
  tex: string;
  display?: boolean;
  className?: string;
};

function renderTex(tex: string, display: boolean): string {
  try {
    return katex.renderToString(tex, {
      displayMode: display,
      throwOnError: false,
      strict: "ignore",
      trust: false,
    });
  } catch {
    return tex;
  }
}

export function Math({ tex, display = false, className }: MathProps) {
  const html = useMemo(() => renderTex(tex, display), [tex, display]);
  return (
    <span
      className={`${display ? styles.mathDisplay : styles.mathInline} ${className ?? ""}`.trim()}
      dangerouslySetInnerHTML={{ __html: html }}
    />
  );
}

export function DisplayMath({ tex, className }: { tex: string; className?: string }) {
  return <Math tex={tex} display className={className} />;
}

export function InlineMath({ tex, className }: { tex: string; className?: string }) {
  return <Math tex={tex} display={false} className={className} />;
}

const INLINE_MATH = /\$([^$]+)\$/g;

/** Parse a string with $...$ inline math segments. */
export function MathText({ text }: { text: string }): ReactNode {
  const nodes = useMemo(() => {
    const parts: ReactNode[] = [];
    let lastIndex = 0;
    for (const match of text.matchAll(INLINE_MATH)) {
      const index = match.index ?? 0;
      if (index > lastIndex) {
        parts.push(text.slice(lastIndex, index));
      }
      parts.push(<InlineMath key={index} tex={match[1]} />);
      lastIndex = index + match[0].length;
    }
    if (lastIndex < text.length) {
      parts.push(text.slice(lastIndex));
    }
    return parts.length > 0 ? parts : [text];
  }, [text]);

  return <>{nodes}</>;
}

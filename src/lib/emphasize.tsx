import { Fragment, type ReactNode } from "react";

/** Wraps every regex match in <strong>. The regex must have the `g` flag. */
export function emphasize(text: string, pattern: RegExp): ReactNode {
  const parts: ReactNode[] = [];
  let last = 0;
  let key = 0;

  for (const match of text.matchAll(pattern)) {
    const index = match.index ?? 0;
    if (index > last) parts.push(<Fragment key={key++}>{text.slice(last, index)}</Fragment>);
    parts.push(<strong key={key++}>{match[0]}</strong>);
    last = index + match[0].length;
  }
  if (last < text.length) parts.push(<Fragment key={key++}>{text.slice(last)}</Fragment>);
  return parts;
}

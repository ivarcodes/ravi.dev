import type { ReactNode } from "react";

export default function Tag({ children }: { children: ReactNode }) {
  return (
    <span className="inline-flex rounded-[0.25rem] border border-line-soft bg-line-soft px-2 py-px font-mono text-[0.725rem] font-semibold uppercase tracking-[0.05em] text-muted-soft hover:border-muted-soft hover:text-fg dark:border-line dark:bg-transparent dark:text-muted dark:hover:border-line dark:hover:text-muted">
      {children}
    </span>
  );
}

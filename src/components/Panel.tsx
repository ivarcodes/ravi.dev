import type { ReactNode } from "react";
import { useReveal } from "../lib/useReveal";

export type PanelSpace = "default" | "skills" | "projects" | "testimonials" | "education" | "contact";

/** Section spacing, mobile → ≥640px (same values as the original per-panel tokens). */
const SPACE: Record<PanelSpace, string> = {
  default: "[--panel-space:1.75rem] sm:[--panel-space:2.1rem]",
  skills: "[--panel-space:1.45rem] sm:[--panel-space:1.7rem]",
  projects: "[--panel-space:2.4rem] sm:[--panel-space:2.7rem]",
  testimonials: "[--panel-space:1.8rem] sm:[--panel-space:2rem]",
  education: "[--panel-space:2.6rem] sm:[--panel-space:2.9rem]",
  contact: "[--panel-space:2.9rem] sm:[--panel-space:3.2rem]",
};

interface PanelProps {
  id: string;
  children: ReactNode;
  space?: PanelSpace;
  /** The hero panel does not fade in. */
  reveal?: boolean;
}

export function Panel({ id, children, space = "default", reveal = true }: PanelProps) {
  const ref = useReveal<HTMLElement>(reveal);
  return (
    <section
      ref={ref}
      id={id}
      className={`${SPACE[space]} scroll-mt-[calc(var(--header-height)+1rem)] border-b border-line first:border-t`}>
      {children}
    </section>
  );
}

export function PanelHeader({ title, index }: { title: string; index: string }) {
  return (
    <div className="flex items-baseline justify-between gap-4 border-b border-line px-5 py-[0.85rem] sm:px-7">
      <span className="inline-flex items-center gap-2 font-mono text-[0.7rem] font-semibold uppercase tracking-[0.16em] text-muted before:h-[0.4rem] before:w-[0.4rem] before:shrink-0 before:rounded-full before:bg-accent before:content-['']">
        {title}
      </span>
      <span className="whitespace-nowrap font-mono text-[0.7rem] text-muted-soft">{index}</span>
    </div>
  );
}

export function PanelBody({ children }: { children: ReactNode }) {
  return <div className="px-5 py-[var(--panel-space)] sm:px-7">{children}</div>;
}

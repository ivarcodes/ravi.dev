import { Link } from "react-router-dom";

export interface PrevNextItem {
  to: string;
  label: string;
}

const card =
  "group flex min-w-0 flex-col gap-[0.2rem] rounded-card border border-line bg-card px-4 py-3 transition-[border-color,transform] duration-150 ease-snap hover:-translate-y-0.5 hover:border-muted-soft";

/** Previous / next links between sibling detail pages. Renders nothing for a single item. */
export default function PrevNext({ prev, next }: { prev?: PrevNextItem; next?: PrevNextItem }) {
  if (!prev && !next) return null;
  return (
    <nav className="grid gap-3 sm:grid-cols-2" aria-label="More">
      {prev ? (
        <Link to={prev.to} className={card}>
          <span className="font-mono text-[0.7rem] uppercase tracking-[0.12em] text-muted-soft">← Previous</span>
          <span className="truncate font-display text-[1rem] font-semibold">{prev.label}</span>
        </Link>
      ) : (
        <span className="hidden sm:block" />
      )}
      {next && (
        <Link to={next.to} className={`${card} sm:text-right`}>
          <span className="font-mono text-[0.7rem] uppercase tracking-[0.12em] text-muted-soft">Next →</span>
          <span className="truncate font-display text-[1rem] font-semibold">{next.label}</span>
        </Link>
      )}
    </nav>
  );
}

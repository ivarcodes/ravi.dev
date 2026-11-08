import { Link } from "react-router-dom";

export default function BackLink({ to, children }: { to: string; children: string }) {
  return (
    <Link
      to={to}
      className="inline-flex items-center gap-[0.4rem] font-mono text-[0.725rem] uppercase tracking-[0.1em] text-muted transition-colors duration-150 hover:text-fg">
      <span aria-hidden="true">←</span>
      {children}
    </Link>
  );
}

import { data } from "../data/portfolio";

export default function Footer() {
  return (
    <footer className="mt-16 border-t border-line py-6">
      <div className="mx-auto flex max-w-container flex-wrap items-center justify-between gap-3 px-4 font-mono text-[0.7rem] uppercase tracking-[0.1em] text-muted-soft">
        <p>
          © {new Date().getFullYear()} {data.profile.name} · {data.profile.role}
        </p>
        <button
          className="font-mono text-[0.7rem] uppercase tracking-[0.1em] text-muted transition-colors duration-150 hover:text-fg"
          type="button"
          onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}>
          Back to top ↑
        </button>
      </div>
    </footer>
  );
}

import { useEffect, useRef, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import SvgIcon from "./SvgIcon";
import { icons } from "../lib/icons";
import { toggleTheme } from "../lib/theme";
import { useTheme } from "../lib/useTheme";

export const NAV_ITEMS = [
  { label: "Experience", to: "/experience" },
  { label: "Projects", to: "/projects" },
  { label: "Testimonials", to: "/testimonials" },
] as const;

const iconBtn =
  "grid h-8 w-8 place-items-center rounded-lg text-muted transition-[color,background,transform] duration-150 hover:bg-line-soft hover:text-fg active:scale-[0.92]";

export default function Header() {
  const theme = useTheme();
  const { pathname } = useLocation();
  const [menuOpen, setMenuOpen] = useState(false);
  const progressRef = useRef<HTMLDivElement>(null);

  // Close the mobile menu after navigating.
  useEffect(() => {
    setMenuOpen(false);
  }, [pathname]);

  // Scroll progress bar
  useEffect(() => {
    let frame = 0;
    const update = () => {
      frame = 0;
      const max = document.documentElement.scrollHeight - window.innerHeight;
      const value = max > 0 ? window.scrollY / max : 0;
      if (progressRef.current) {
        progressRef.current.style.transform = `scaleX(${Math.min(1, Math.max(0, value))})`;
      }
    };
    const onScroll = () => {
      if (!frame) frame = requestAnimationFrame(update);
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", update);
    update();
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", update);
      if (frame) cancelAnimationFrame(frame);
    };
  }, [pathname]);

  return (
    <header className="sticky top-0 z-[60] border-b border-line bg-bg">
      <div className="mx-auto flex h-[var(--header-height)] max-w-container items-center gap-4 px-4">
        <Link className="group inline-flex items-center gap-[0.42rem] font-bold" to="/" aria-label="Home">
          <span className="text-fg transition-colors duration-150 group-hover:text-accent [&_svg]:h-[0.95rem] [&_svg]:w-[0.95rem]">
            <SvgIcon html={icons.home} />
          </span>
          <span className="font-display text-[0.95rem] tracking-[-0.025em] text-fg transition-colors duration-150 group-hover:text-accent">
            home
          </span>
        </Link>

        <nav
          className="ml-auto hidden gap-5 text-sm font-medium text-muted md:flex"
          aria-label="Primary">
          {NAV_ITEMS.map((item) => (
            <Link
              key={item.to}
              to={item.to}
              aria-current={pathname === item.to || pathname.startsWith(`${item.to}/`) ? "true" : undefined}
              className="relative py-1 transition-colors duration-150 after:absolute after:inset-x-0 after:-bottom-0.5 after:h-px after:origin-left after:scale-x-0 after:bg-accent after:transition-transform after:duration-150 after:ease-snap after:content-[''] hover:text-fg hover:after:scale-x-100 aria-[current=true]:text-fg aria-[current=true]:after:scale-x-100">
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="ml-3 flex items-center gap-1">
          <button
            className={iconBtn}
            type="button"
            aria-label="Toggle theme"
            onClick={() => toggleTheme()}>
            <SvgIcon html={theme === "dark" ? icons.sun : icons.moon} />
          </button>
          <button
            className={`${iconBtn} md:hidden`}
            type="button"
            aria-label="Open menu"
            aria-controls="mobile-nav"
            aria-expanded={menuOpen}
            onClick={() => setMenuOpen((open) => !open)}>
            <SvgIcon html={menuOpen ? icons.close : icons.menu} />
          </button>
        </div>
      </div>

      <div
        className="absolute bottom-[-1px] left-0 h-0.5 w-full origin-left scale-x-0 bg-accent pointer-events-none"
        ref={progressRef}
        aria-hidden="true"
      />

      {menuOpen && (
        <div
          id="mobile-nav"
          aria-label="Mobile"
          className="relative z-[1] border-t border-line bg-bg px-4 pb-4 pt-2 shadow-[0_24px_48px_rgba(0,0,0,0.15)] md:hidden">
          {NAV_ITEMS.map((item) => (
            <Link
              key={item.to}
              to={item.to}
              className="block px-1 py-2 text-[0.9375rem] font-medium text-muted hover:text-fg">
              {item.label}
            </Link>
          ))}
        </div>
      )}
    </header>
  );
}

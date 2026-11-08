import Lenis from "lenis";
import { useEffect, useRef } from "react";
import { Outlet, useLocation } from "react-router-dom";
import CommandPalette from "./CommandPalette";
import CursorEffect from "./CursorEffect";
import Footer from "./Footer";
import Header from "./Header";

export default function Layout() {
  const { pathname } = useLocation();
  const lenisRef = useRef<Lenis | null>(null);

  // Buttery smooth page scrolling (Lenis handles reduced-motion itself).
  useEffect(() => {
    const lenis = new Lenis({
      lerp: 0.1,
      smoothWheel: true,
      autoRaf: true,
      anchors: true,
    });
    lenisRef.current = lenis;

    return () => {
      lenis.destroy();
      lenisRef.current = null;
    };
  }, []);

  // Each route starts at the top.
  useEffect(() => {
    if (lenisRef.current) {
      lenisRef.current.scrollTo(0, { immediate: true });
    } else {
      window.scrollTo({ top: 0, behavior: "auto" });
    }
  }, [pathname]);

  return (
    <>
      <a
        className="absolute -left-[9999px] top-0 z-[100] rounded-br-card bg-fg px-4 py-2 text-bg focus:left-0"
        href="#main">
        Skip to content
      </a>
      <Header />
      <main id="main" className="mx-auto max-w-container px-4">
        <Outlet />
      </main>
      <Footer />
      <CommandPalette />
      <CursorEffect />
    </>
  );
}

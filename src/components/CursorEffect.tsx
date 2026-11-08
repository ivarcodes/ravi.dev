import { useEffect } from "react";
import { rainbowCursor } from "cursor-effects";

/**
 * Subtle slate trailing-ribbon cursor, powered by cursor-effects.
 * The package handles touch devices and prefers-reduced-motion automatically.
 */
export default function CursorEffect() {
  useEffect(() => {
    const effect = rainbowCursor({
      length: 18,
      colors: ["#94a3b8", "#475569"],
      size: 2,
    });
    return () => effect.destroy();
  }, []);

  return null;
}

import { useEffect, useRef } from "react";

/** Fades a panel in as it enters the viewport (same behaviour as the original). */
export function useReveal<T extends HTMLElement>(enabled = true) {
  const ref = useRef<T>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (!enabled || !("IntersectionObserver" in window)) {
      el.classList.add("is-visible");
      return;
    }

    el.classList.add("reveal");

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (!entry.isIntersecting) continue;
          entry.target.classList.add("is-visible");
          observer.unobserve(entry.target);
        }
      },
      { threshold: 0.05, rootMargin: "0px 0px -4% 0px" },
    );
    observer.observe(el);

    // Safety net: never leave a panel faded if an observer callback is missed.
    const timer = window.setTimeout(() => {
      const rect = el.getBoundingClientRect();
      if (rect.top < window.innerHeight && rect.bottom > 0) el.classList.add("is-visible");
    }, 1200);

    return () => {
      observer.disconnect();
      window.clearTimeout(timer);
    };
  }, [enabled]);

  return ref;
}

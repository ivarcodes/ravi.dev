import { useEffect, useRef } from "react";
import { Panel, PanelBody, PanelHeader } from "../components/Panel";
import SvgIcon from "../components/SvgIcon";
import { data } from "../data/portfolio";
import { icons } from "../lib/icons";

/** Auto-scroll speed in px per millisecond (~45px/s). */
const SPEED = 0.045;

export default function Testimonials() {
  const trackRef = useRef<HTMLDivElement>(null);
  const groupRef = useRef<HTMLDivElement>(null);
  const total = String(data.testimonials.length).padStart(2, "0");

  // Continuous marquee. Scrolls forever, pauses while hovered/focused/touched,
  // and resumes automatically when the pointer leaves.
  useEffect(() => {
    const track = trackRef.current;
    const group = groupRef.current;
    if (!track || !group) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    let raf = 0;
    let last = 0;
    let pos = 0;
    let paused = false;

    const tick = (time: number) => {
      if (!last) last = time;
      const dt = Math.min(time - last, 64);
      last = time;

      if (paused) {
        // Stay in sync if the user drags/scrolls manually while paused.
        pos = track.scrollLeft;
      } else {
        const loop = group.offsetWidth;
        if (loop > 0) {
          pos += SPEED * dt;
          while (pos >= loop) pos -= loop;
          track.scrollLeft = pos;
        }
      }
      raf = requestAnimationFrame(tick);
    };

    const pause = () => {
      paused = true;
    };
    const resume = () => {
      paused = false;
      last = 0;
    };

    track.addEventListener("mouseenter", pause);
    track.addEventListener("mouseleave", resume);
    track.addEventListener("focusin", pause);
    track.addEventListener("focusout", resume);
    track.addEventListener("touchstart", pause, { passive: true });
    track.addEventListener("touchend", resume, { passive: true });

    raf = requestAnimationFrame(tick);
    return () => {
      cancelAnimationFrame(raf);
      track.removeEventListener("mouseenter", pause);
      track.removeEventListener("mouseleave", resume);
      track.removeEventListener("focusin", pause);
      track.removeEventListener("focusout", resume);
      track.removeEventListener("touchstart", pause);
      track.removeEventListener("touchend", resume);
    };
  }, []);

  const cards = data.testimonials.map((t, index) => (
    <figure
      key={t.reviewUrl}
      className="relative m-0 flex flex-[0_0_72vw] flex-col gap-2 overflow-hidden rounded-card border border-line bg-card px-[0.9rem] py-[0.7rem] [transition:box-shadow_0.35s_var(--ease),border-color_150ms_ease,transform_150ms_var(--ease)] hover:-translate-y-1 hover:border-accent-line hover:shadow-[0_16px_32px_color-mix(in_srgb,var(--accent)_10%,transparent)] min-[560px]:flex-[0_0_clamp(18rem,38vw,26rem)]">
      <div className="flex items-center justify-between">
        <span
          className="inline-flex text-accent opacity-90 [&_svg]:h-[1.05rem] [&_svg]:w-[1.05rem]"
          aria-hidden="true">
          <SvgIcon html={icons.quote} />
        </span>
        <span className="font-mono text-[0.7rem] tracking-[0.12em] text-muted-soft">
          {String(index + 1).padStart(2, "0")} / {total}
        </span>
      </div>
      <blockquote className="m-0 text-[0.85rem] leading-[1.5] text-fg">{t.quote}</blockquote>
      <figcaption className="mt-auto flex items-center gap-2 border-t border-line-soft pt-[0.6rem]">
        <span
          className="grid h-[1.6rem] w-[1.6rem] shrink-0 place-items-center rounded-full border border-accent-line bg-accent-soft font-mono text-[0.7rem] font-semibold text-accent"
          aria-hidden="true">
          {t.initials}
        </span>
        <span className="flex min-w-0 flex-col">
          <strong className="text-[0.7rem] font-semibold">{t.name}</strong>
          <span className="text-[0.675rem] text-muted">
            {t.product} · {t.reviewedAt}
          </span>
        </span>
      </figcaption>
    </figure>
  ));

  return (
    <Panel id="testimonials-panel" space="testimonials">
      <PanelHeader title="Testimonials" index="05 / what people say" />
      <PanelBody>
        <div className="mb-4 flex items-start justify-between gap-4">
          <div className="flex min-w-0 flex-col gap-[0.4rem]">
            <p className="relative inline-block max-w-[28rem] font-display text-[clamp(1.2rem,3vw,1.6rem)] leading-[1.15] tracking-[-0.04em] after:absolute after:-bottom-1 after:left-0 after:h-0.5 after:w-0 after:bg-accent after:transition-[width] after:duration-500 after:ease-snap after:content-[''] hover:after:w-full">
              Real words from people using the work.
            </p>
            <p className="m-0 font-mono text-[0.65rem] uppercase tracking-[0.06em] text-muted">
              Reviews from the{" "}
              <a
                className="text-accent underline underline-offset-2 hover:text-fg"
                href="https://addons.mozilla.org/en-US/firefox/addon/unifetch/reviews/"
                target="_blank"
                rel="noreferrer noopener">
                Unifetch Firefox Add-ons listing
              </a>
              .
            </p>
          </div>
        </div>

        <div
          ref={trackRef}
          className="flex overflow-x-auto pb-[0.4rem] [overscroll-behavior-x:contain] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
          tabIndex={0}
          aria-label="Testimonials, auto-scrolling. Hover or focus to pause.">
          <div ref={groupRef} className="flex shrink-0 gap-3 pr-3">
            {cards}
          </div>
          <div className="flex shrink-0 gap-3 pr-3" aria-hidden="true">
            {cards}
          </div>
        </div>
      </PanelBody>
    </Panel>
  );
}

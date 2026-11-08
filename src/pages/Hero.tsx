import { useState } from "react";
import { Panel } from "../components/Panel";
import SocialButton from "../components/SocialButton";
import SvgIcon from "../components/SvgIcon";
import { data } from "../data/portfolio";
import { asset } from "../lib/asset";
import { emphasize } from "../lib/emphasize";
import { icons } from "../lib/icons";

const socialIcon: Record<string, string> = {
  email: icons.mail,
  linkedin: icons.linkedin,
  github: icons.github,
};

const BIO_PATTERN =
  /(\d+%)|(\d+\+ hours\/week)|(React Flow \+ Node\.js|Tally Prime \(XML\) and Odoo|SSE and request batching|WhatsApp Cloud API|Llama-3 via Groq)/g;

/** Random cover rotator — picks a different image on every load. */
function pickCover(): string {
  const { covers, cover } = data.profile;
  if (covers?.length) return covers[Math.floor(Math.random() * covers.length)];
  if (cover) return cover;
  const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  return asset(reduceMotion ? "assets/hero-cover-still.jpg" : "assets/hero-cover.gif");
}

export default function Hero() {
  const { profile, socials } = data;
  const [firstName, ...rest] = profile.name.split(" ");
  const [coverSrc, setCoverSrc] = useState(pickCover);
  const isExternalResume = /^https?:/i.test(profile.resume ?? "");

  return (
    <Panel id="hero-panel" reveal={false}>
      <div
        className="relative h-[clamp(6rem,16vw,9rem)] overflow-hidden border-b border-line bg-line-soft before:pointer-events-none before:absolute before:inset-0 before:bg-[linear-gradient(to_bottom,transparent_45%,color-mix(in_srgb,var(--background)_55%,transparent))] before:content-[''] [&:hover>img]:scale-[1.03]"
        aria-hidden="true">
        <img
          className="block h-full w-full object-cover object-center transition-transform duration-[600ms] ease-[ease] will-change-transform"
          src={coverSrc}
          alt=""
          loading="eager"
          decoding="async"
          onError={() => setCoverSrc(asset("assets/hero-cover-still.jpg"))}
        />
      </div>

      <div className="px-5 pb-4 pt-[0.9rem] text-center sm:px-7 sm:text-left min-[900px]:pb-[1.1rem] min-[900px]:pt-4">
        <div className="flex flex-col items-center gap-[0.9rem] text-center sm:flex-row sm:text-left min-[700px]:gap-7">
          <div className="flex min-w-0 flex-1 flex-col items-center text-center sm:items-start sm:text-left">
            <h1 className="mt-0 flex flex-wrap items-center justify-center gap-[0.4rem] text-[clamp(1.75rem,4.5vw,2.75rem)] font-bold tracking-[-0.05em] sm:justify-start">
              <span>{firstName}</span>
              <span className="font-medium text-muted">{rest.join(" ")}</span>
            </h1>
            <p className="mt-[0.4rem] font-mono text-[0.725rem] uppercase tracking-[0.09em] text-muted">
              {profile.role}
              <span className="mx-1 text-muted-soft" aria-hidden="true">
                /
              </span>
              <strong className="font-semibold text-fg">{profile.focus}</strong>
            </p>

            <div className="mt-2 max-w-[42rem] text-[0.95rem] leading-[1.6] text-muted [&_p+p]:mt-3 [&_strong]:font-semibold [&_strong]:text-fg">
              {profile.bio.map((p) => (
                <p key={p}>{emphasize(p, BIO_PATTERN)}</p>
              ))}
            </div>

            <div className="mt-[0.7rem] flex flex-wrap justify-start gap-2">
              {socials.map((s) => (
                <SocialButton key={s.label} href={s.href} external={s.href.startsWith("http")}>
                  <SvgIcon html={socialIcon[s.icon] ?? icons.mail} />
                  <span>{s.label}</span>
                </SocialButton>
              ))}
              {profile.resume && (
                <SocialButton
                  href={profile.resume}
                  primary
                  external={isExternalResume}
                  download={!isExternalResume}
                  ariaLabel="Download resume as PDF">
                  <SvgIcon html={icons.download} />
                  <span>Download Resume</span>
                </SocialButton>
              )}
            </div>
          </div>

          <div className="relative flex shrink-0 flex-col items-center gap-[0.6rem]">
            <img
              className="h-[5.5rem] w-[5.5rem] rounded-[0.9rem] border-2 border-[var(--avatar-border)] bg-card object-cover grayscale-0 transition-[transform,border-color,filter] duration-300 ease-[ease] hover:scale-[1.03] hover:border-muted-soft hover:grayscale-[20%] min-[700px]:h-[clamp(6rem,16vw,9rem)] min-[700px]:w-[clamp(6rem,16vw,9rem)] min-[700px]:rounded-2xl"
              src={asset(profile.avatar)}
              alt={profile.name}
              width={120}
              height={120}
              loading="eager"
              decoding="async"
              draggable={false}
            />
            {profile.location && (
              <span className="relative mt-[0.1rem] inline-flex items-center gap-[0.4rem] whitespace-nowrap rounded-full border border-line bg-line-soft px-[0.65rem] py-1 font-mono text-[0.75rem] font-semibold uppercase tracking-[0.05em] text-muted min-[700px]:text-[0.6875rem] [&_svg]:h-3 [&_svg]:w-3 [&_svg]:shrink-0 [&_svg]:text-muted-soft">
                <SvgIcon html={icons.pin} />
                <span>{profile.location}</span>
              </span>
            )}
          </div>
        </div>
      </div>

      {profile.stats && profile.stats.length > 0 && (
        <ul
          className="m-0 grid list-none grid-cols-2 gap-x-0 gap-y-[0.9rem] border-t border-line bg-line-soft px-5 py-[0.95rem] sm:px-7 min-[701px]:grid-cols-4 min-[701px]:gap-0"
          aria-label="Selected results">
          {profile.stats.map((stat) => (
            <li
              key={stat.label}
              className="flex flex-col gap-[0.125rem] border-l border-line pl-4 first:border-l-0 first:pl-0 max-[700px]:odd:border-l-0 max-[700px]:odd:pl-0">
              <strong className="font-display text-[1.1rem] leading-[1.15] text-fg">{stat.value}</strong>
              <span className="font-mono text-[0.7rem] uppercase leading-[1.4] tracking-[0.04em] text-muted">
                {stat.label}
              </span>
            </li>
          ))}
        </ul>
      )}
    </Panel>
  );
}

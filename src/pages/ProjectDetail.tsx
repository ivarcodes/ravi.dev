import type { CSSProperties } from "react";
import { Navigate, useParams } from "react-router-dom";
import BackLink from "../components/BackLink";
import HomeButton from "../components/HomeButton";
import { Panel, PanelBody, PanelHeader } from "../components/Panel";
import PrevNext from "../components/PrevNext";
import SvgIcon from "../components/SvgIcon";
import Tag from "../components/Tag";
import { data } from "../data/portfolio";
import { asset } from "../lib/asset";
import { icons } from "../lib/icons";

export default function ProjectDetail() {
  const { slug } = useParams<{ slug: string }>();
  const index = data.projects.findIndex((p) => p.slug === slug);

  if (index === -1) return <Navigate to="/projects" replace />;

  const p = data.projects[index];
  const prev = data.projects[index - 1];
  const next = data.projects[index + 1];
  const number = String(index + 1).padStart(2, "0");

  const sections: [label: string, body: string][] = [
    ["Problem", p.problem],
    ["Approach", p.approach],
    ["Architecture", p.architecture],
    ["Results", p.results],
  ];

  return (
    <Panel id={`project-${p.slug}`} space="projects">
      <PanelHeader title="Project" index={`${number} / ${p.slug}`} />
      <PanelBody>
        <div
          className="flex flex-col gap-8 [--project-accent:var(--accent)]"
          style={{ "--project-accent": p.accent ?? "var(--accent)" } as CSSProperties}>
          <div className="flex flex-wrap items-center gap-x-5 gap-y-2">
            <BackLink to="/projects">All projects</BackLink>
            <HomeButton />
          </div>

          <header className="flex flex-col gap-4">
            <div className="flex flex-wrap items-center gap-[0.6rem]">
              <h1 className="font-display text-[clamp(1.85rem,4.5vw,2.85rem)] leading-[1.02] tracking-[-0.05em]">
                {p.name}
              </h1>
              <Tag>{p.tag}</Tag>
            </div>
            <p className="max-w-[42rem] text-[0.95rem] leading-[1.65] text-muted">{p.summary}</p>

            <div className="flex flex-wrap items-center gap-x-[0.7rem] gap-y-[0.4rem]">
              <span className="inline-flex items-center gap-[0.4rem] font-mono text-[0.725rem] font-semibold text-[color-mix(in_srgb,var(--project-accent)_55%,#020617)] dark:text-[var(--project-accent)]">
                <span className="h-[0.375rem] w-[0.375rem] shrink-0 rounded-full bg-current" aria-hidden="true" />
                <span>{p.metric}</span>
              </span>
              <div className="flex flex-wrap gap-1">
                {p.stack.map((s) => (
                  <Tag key={s}>{s}</Tag>
                ))}
              </div>
            </div>

            <div className="flex flex-wrap gap-[0.4rem]">
              {p.links.map((l) => (
                <a
                  key={l.label}
                  className={`inline-flex items-center gap-[0.375rem] rounded-lg border px-[0.6rem] py-[0.275rem] text-[0.725rem] font-semibold transition-[color,background,border-color] duration-150 [&_svg]:h-[0.775rem] [&_svg]:w-[0.775rem] ${
                    l.primary
                      ? "border-fg bg-[#020617] text-white hover:opacity-[0.92] dark:bg-fg dark:text-bg"
                      : "border-line text-muted hover:border-muted-soft hover:text-fg"
                  }`}
                  href={l.href}
                  target="_blank"
                  rel="noreferrer noopener">
                  {l.label} <SvgIcon html={/github/i.test(l.label) ? icons.github : icons.arrowUpRight} />
                </a>
              ))}
            </div>
          </header>

          {p.image && (
            <figure className="m-0 overflow-hidden rounded-card border border-line bg-line-soft">
              <img
                className="block h-auto w-full object-cover"
                src={asset(p.image)}
                alt={p.imageAlt ?? `${p.name} preview`}
                loading="eager"
                decoding="async"
              />
            </figure>
          )}

          <dl className="m-0 grid">
            {sections.map(([label, body]) => (
              <div
                key={label}
                className="grid gap-[0.4rem] border-t border-line-soft py-4 first:border-t-0 first:pt-0 sm:grid-cols-[8rem_1fr] sm:gap-4">
                <dt className="pt-[0.125rem] font-mono text-[0.725rem] font-semibold uppercase tracking-[0.12em] text-muted-soft">
                  {label}
                </dt>
                <dd className="m-0 max-w-[42rem] text-[0.95rem] leading-[1.7] text-muted">{body}</dd>
              </div>
            ))}
          </dl>

          <PrevNext
            prev={prev && { to: `/projects/${prev.slug}`, label: prev.name }}
            next={next && { to: `/projects/${next.slug}`, label: next.name }}
          />
        </div>
      </PanelBody>
    </Panel>
  );
}

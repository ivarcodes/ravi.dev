import { Link } from "react-router-dom";
import Accordion from "../components/Accordion";
import HomeButton from "../components/HomeButton";
import { Panel, PanelBody, PanelHeader } from "../components/Panel";
import SvgIcon from "../components/SvgIcon";
import Tag from "../components/Tag";
import { data } from "../data/portfolio";
import { asset } from "../lib/asset";
import { icons } from "../lib/icons";

interface ProjectsProps {
  /** Shows a "Back to home" link when rendered on its own /projects route. */
  standalone?: boolean;
}

export default function Projects({ standalone = false }: ProjectsProps) {
  const items = data.projects.map((p, i) => ({
    id: p.slug,
    action: (
      <Link
        to={`/projects/${p.slug}`}
        className="grid h-8 w-8 place-items-center rounded-lg text-muted transition-[color,background] duration-150 hover:bg-line-soft hover:text-fg [&_svg]:h-4 [&_svg]:w-4"
        aria-label={`Open ${p.name} in a full page`}
        title="Open full page">
        <SvgIcon html={icons.arrowUpRight} />
      </Link>
    ),
    header: (
      <div>
        <div className="flex flex-wrap items-center gap-[0.45rem]">
          <span className="font-display text-[1.1rem] font-bold leading-[1.2] tracking-[-0.02em] text-fg">
            {p.name}
          </span>
          <Tag>{p.tag}</Tag>
          <span className="ml-auto font-mono text-[0.7rem] text-muted-soft" aria-hidden="true">
            {String(i + 1).padStart(2, "0")}
          </span>
        </div>
        <p className="mt-[0.2rem] inline-flex items-center gap-[0.4rem] font-mono text-[0.725rem] font-semibold text-muted">
          <span className="h-[0.375rem] w-[0.375rem] shrink-0 rounded-full bg-accent" aria-hidden="true" />
          {p.metric}
        </p>
      </div>
    ),
    content: (
      <div className="flex flex-col gap-4">
        <div className="flex flex-col gap-3 sm:flex-row sm:items-start">
          {p.image && (
            <figure className="m-0 aspect-square w-[5rem] shrink-0 overflow-hidden rounded-[0.5rem] border border-line-soft bg-line-soft">
              <img
                className="h-full w-full object-cover"
                src={asset(p.image)}
                alt={p.imageAlt ?? `${p.name} preview`}
                width={1000}
                height={1000}
                loading="lazy"
                decoding="async"/>
            </figure>
          )}
          <p className="max-w-[42rem] text-[0.875rem] leading-[1.65] text-muted">
            {p.summary ?? p.results}
          </p>
        </div>

        <div className="flex flex-wrap gap-1">
          {p.stack.map((s) => (
            <Tag key={s}>{s}</Tag>
          ))}
        </div>

        <Link
          to={`/projects/${p.slug}`}
          className="inline-flex w-fit items-center gap-[0.35rem] rounded-md border border-fg bg-fg px-[0.7rem] py-[0.35rem] text-[0.75rem] font-semibold text-bg transition-opacity duration-150 hover:opacity-90">
          View full project <span aria-hidden="true">→</span>
        </Link>
      </div>
    ),
  }));

  return (
    <Panel id="projects-panel" space="projects">
      <PanelHeader title="Projects" index="04 / selected work" />
      <PanelBody>
        {standalone && (
          <div className="mb-5">
            <HomeButton />
          </div>
        )}
        <Accordion items={items} defaultOpen={data.projects[0]?.slug} />
      </PanelBody>
    </Panel>
  );
}

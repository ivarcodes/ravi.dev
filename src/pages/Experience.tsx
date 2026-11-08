import { Link } from "react-router-dom";
import Accordion from "../components/Accordion";
import HomeButton from "../components/HomeButton";
import { Panel, PanelBody, PanelHeader } from "../components/Panel";
import SvgIcon from "../components/SvgIcon";
import Tag from "../components/Tag";
import { data } from "../data/portfolio";
import { icons } from "../lib/icons";

interface ExperienceProps {
  /** Shows a "Back to home" link when rendered on its own /experience route. */
  standalone?: boolean;
}

export default function Experience({ standalone = false }: ExperienceProps) {
  const items = data.experience.map((job) => ({
    id: job.slug,
    action: (
      <Link
        to={`/experience/${job.slug}`}
        className="grid h-8 w-8 place-items-center rounded-lg text-muted transition-[color,background] duration-150 hover:bg-line-soft hover:text-fg [&_svg]:h-4 [&_svg]:w-4"
        aria-label={`Open ${job.company} in a full page`}
        title="Open full page">
        <SvgIcon html={icons.arrowUpRight} />
      </Link>
    ),
    header: (
      <div className="flex flex-wrap items-start justify-between gap-x-4 gap-y-1">
        <div className="min-w-0">
          <div className="flex flex-wrap items-center gap-[0.45rem]">
            <span className="font-display text-[1.15rem] font-bold leading-[1.15] tracking-[-0.02em] text-fg">
              {job.company}
            </span>
            <span className="inline-flex items-center gap-[0.3rem] rounded-[0.35rem] border border-line bg-line-soft px-[0.45rem] py-[0.18rem] text-[0.6875rem] font-semibold text-muted">
              <span className="h-[0.4rem] w-[0.4rem] rounded-full bg-muted" />
              {/Present/.test(job.period) ? "Current" : "Completed"}
            </span>
          </div>
          <p className="mt-[0.12rem] font-mono text-[0.725rem] tracking-[0.035em] text-muted">
            {job.role}
          </p>
        </div>
        <div className="flex flex-col items-end gap-[0.12rem] whitespace-nowrap text-right text-[0.8rem] text-muted max-[559px]:items-start max-[559px]:text-left">
          <span>{job.period}</span>
          <span>{job.location}</span>
        </div>
      </div>
    ),
    content: (
      <div className="flex flex-col gap-4">
        {job.projects.length > 0 && (
          <div className="flex flex-wrap gap-1">
            {job.projects.map((project) => (
              <Tag key={project.tag}>{project.tag}</Tag>
            ))}
          </div>
        )}

        {job.projects.length > 0 && (
          <div>
            <span className="mb-2.5 block font-mono text-[0.725rem] font-semibold uppercase tracking-[0.14em] text-muted-soft">
              What I did
            </span>
            <ul className="m-0 grid list-none gap-4 p-0">
              {job.projects.map((project) => (
                <li
                  key={project.tag}
                  className="relative border-l border-line pl-[1.1rem] before:absolute before:-left-[0.275rem] before:top-[0.35rem] before:h-[0.375rem] before:w-[0.375rem] before:rounded-full before:border-2 before:border-bg before:bg-accent before:content-['']">
                  <p className="max-w-[42rem] text-[0.875rem] leading-[1.65] text-muted">
                    {project.description}
                  </p>
                </li>
              ))}
            </ul>
          </div>
        )}

        <Link
          to={`/experience/${job.slug}`}
          className="inline-flex w-fit items-center gap-[0.35rem] rounded-md border border-fg bg-fg px-[0.7rem] py-[0.35rem] text-[0.75rem] font-semibold text-bg transition-opacity duration-150 hover:opacity-90">
          View full role <span aria-hidden="true">→</span>
        </Link>
      </div>
    ),
  }));

  return (
    <Panel id="experience-panel">
      <PanelHeader title="Experience" index="02 / where I've worked" />
      <PanelBody>
        {standalone && (
          <div className="mb-5">
            <HomeButton />
          </div>
        )}
        <Accordion items={items} defaultOpen={data.experience[0]?.slug} />
      </PanelBody>
    </Panel>
  );
}

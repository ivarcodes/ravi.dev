import { Navigate, useParams } from "react-router-dom";
import BackLink from "../components/BackLink";
import HomeButton from "../components/HomeButton";
import { Panel, PanelBody, PanelHeader } from "../components/Panel";
import PrevNext from "../components/PrevNext";
import Tag from "../components/Tag";
import { data } from "../data/portfolio";
import { emphasize } from "../lib/emphasize";

const STRONG_PATTERN =
  /(\d+%|\d+\+ hours?\/week|React Flow \+ Node\.js|Tally Prime \(XML\)|Odoo|SSE|WhatsApp Cloud API|OAuth 2\.0|retry logic)/g;

export default function ExperienceDetail() {
  const { slug } = useParams<{ slug: string }>();
  const index = data.experience.findIndex((job) => job.slug === slug);

  if (index === -1) return <Navigate to="/experience" replace />;

  const job = data.experience[index];
  const prev = data.experience[index - 1];
  const next = data.experience[index + 1];
  const number = String(index + 1).padStart(2, "0");

  return (
    <Panel id={`experience-${job.slug}`}>
      <PanelHeader title="Experience" index={`${number} / ${job.slug}`} />
      <PanelBody>
        <div className="flex flex-col gap-8">
          <div className="flex flex-wrap items-center gap-x-5 gap-y-2">
            <BackLink to="/experience">All experience</BackLink>
            <HomeButton />
          </div>

          <header className="flex flex-wrap items-start justify-between gap-4">
            <div>
              <div className="flex flex-wrap items-center gap-[0.6rem]">
                <h1 className="font-display text-[clamp(1.85rem,4.5vw,2.85rem)] leading-[1.02] tracking-[-0.05em]">
                  {job.company}
                </h1>
                <span className="inline-flex items-center gap-[0.3rem] rounded-[0.35rem] border border-line bg-line-soft px-[0.45rem] py-[0.18rem] text-[0.6875rem] font-semibold text-muted">
                  <span className="h-[0.4rem] w-[0.4rem] rounded-full bg-muted" />
                  Completed
                </span>
              </div>
              <p className="mt-2 font-mono text-[0.8rem] tracking-[0.035em] text-muted">{job.role}</p>
            </div>
            <div className="flex flex-col items-end gap-[0.12rem] whitespace-nowrap text-right text-[0.85rem] text-muted max-[559px]:items-start max-[559px]:text-left">
              <span>{job.period}</span>
              <span>{job.location}</span>
            </div>
          </header>

          {job.projects.length > 0 && (
            <div className="flex flex-col border-t border-line pt-5">
              <span className="mb-4 block font-mono text-[0.725rem] font-semibold uppercase tracking-[0.14em] text-muted-soft">
                What I did
              </span>
              <ul className="m-0 grid list-none gap-5 p-0">
                {job.projects.map((project) => (
                  <li
                    key={project.tag}
                    className="relative border-l border-line pl-[1.1rem] before:absolute before:-left-[0.275rem] before:top-[0.35rem] before:h-[0.375rem] before:w-[0.375rem] before:rounded-full before:border-2 before:border-bg before:bg-accent before:content-['']">
                    <Tag>{project.tag}</Tag>
                    <p className="mt-2 max-w-[42rem] text-[0.95rem] leading-[1.7] text-muted [&_strong]:font-semibold [&_strong]:text-fg">
                      {emphasize(project.description, STRONG_PATTERN)}
                    </p>
                  </li>
                ))}
              </ul>
            </div>
          )}

          <PrevNext
            prev={prev && { to: `/experience/${prev.slug}`, label: prev.company }}
            next={next && { to: `/experience/${next.slug}`, label: next.company }}
          />
        </div>
      </PanelBody>
    </Panel>
  );
}

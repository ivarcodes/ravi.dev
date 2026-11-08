import { Panel, PanelBody, PanelHeader } from "../components/Panel";
import { data } from "../data/portfolio";

export default function Education() {
  return (
    <Panel id="education-panel" space="education">
      <PanelHeader title="Education" index="06 / academics" />
      <PanelBody>
        <div className="grid gap-4 sm:grid-cols-2">
          {data.education.map((e, i) => (
            <article
              key={e.degree}
              className={`relative rounded-card border bg-card p-5 transition-[border-color,transform] duration-150 ease-snap hover:-translate-y-0.5 hover:border-muted-soft ${
                e.current
                  ? "border-accent-line before:absolute before:left-5 before:top-0 before:h-0.5 before:w-8 before:bg-accent before:content-['']"
                  : "border-line"
              }`}>
              <div className="mb-3 flex items-center justify-between gap-3">
                <span className="font-mono text-[0.7rem] text-muted-soft" aria-hidden="true">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <span
                  className={`inline-flex whitespace-nowrap rounded-full border px-[0.6rem] py-[0.125rem] font-mono text-[0.725rem] ${
                    e.current
                      ? "border-accent-line bg-accent-soft text-accent"
                      : "border-line text-muted-soft"
                  }`}>
                  {e.period}
                </span>
              </div>
              <h3 className="font-display text-[1.1rem] leading-[1.3]">{e.degree}</h3>
              <p className="mt-[0.2rem] font-mono text-[0.725rem] uppercase tracking-[0.07em] text-muted">
                {e.school}
              </p>
              {e.highlight && (
                <p className="mt-[0.7rem] border-t border-line-soft pt-[0.7rem] text-[0.875rem] leading-[1.65] text-muted">
                  {e.highlight}
                </p>
              )}
            </article>
          ))}
        </div>
      </PanelBody>
    </Panel>
  );
}

import type { CSSProperties } from "react";
import { Panel, PanelBody, PanelHeader } from "../components/Panel";
import SvgIcon from "../components/SvgIcon";
import { data } from "../data/portfolio";
import { icons } from "../lib/icons";
import { stackIcons } from "../lib/stackIcons";

const iconFor = (name: string) => stackIcons[name] ?? icons[name] ?? icons.spark;
const slug = (value: string) =>
  value
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");

export default function Skills() {
  return (
    <Panel id="skills-panel" space="skills">
      <PanelHeader title="Skills" index="03 / tools" />
      <PanelBody>
        <div className="flex flex-col">
          {data.stack.map((group) => {
            const groupId = `skill-group-${slug(group.category)}`;
            return (
              <section
                key={group.category}
                className="grid grid-cols-1 gap-[0.55rem] border-t border-line-soft py-[0.9rem] first:border-t-0 first:pt-0 last:pb-0 min-[560px]:grid-cols-[9.5rem_minmax(0,1fr)] min-[560px]:gap-4"
                aria-labelledby={groupId}>
                <h3
                  className="m-0 flex items-center gap-[0.45rem] font-mono text-[0.7rem] font-semibold uppercase leading-normal tracking-[0.14em] text-muted-soft"
                  id={groupId}>
                  <span
                    className="inline-flex shrink-0 text-accent [&_svg]:h-[0.85rem] [&_svg]:w-[0.85rem]"
                    aria-hidden="true">
                    <SvgIcon html={icons[group.icon] ?? icons.layers} />
                  </span>
                  {group.category}
                </h3>
                <div className="flex flex-wrap gap-[0.35rem]">
                  {group.items.map((item) => (
                    <span
                      key={item.name}
                      className="skill-chip-anim inline-flex items-center gap-[0.45rem] rounded-full border border-line bg-card py-[0.275rem] pl-[0.325rem] pr-[0.65rem] text-[0.8rem] font-medium text-muted transition-[border-color,background,color,transform] duration-150 hover:-translate-y-px hover:border-muted-soft hover:text-fg"
                      style={{ "--skill-accent": group.accent ?? "var(--accent)" } as CSSProperties}>
                      <span
                        className="grid h-[1.2rem] w-[1.2rem] shrink-0 place-items-center rounded-full bg-line-soft text-muted [&_svg]:h-[0.675rem] [&_svg]:w-[0.675rem]"
                        aria-hidden="true">
                        <SvgIcon html={iconFor(item.icon)} />
                      </span>
                      <span>{item.name}</span>
                    </span>
                  ))}
                </div>
              </section>
            );
          })}
        </div>
      </PanelBody>
    </Panel>
  );
}

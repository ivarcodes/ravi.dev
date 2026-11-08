import { useState, type ReactNode } from "react";

export interface AccordionEntry {
  /** Unique id used for the panel and open state. */
  id: string;
  /** Always-visible summary shown in the toggle row. */
  header: ReactNode;
  /** Content revealed when the row is expanded. */
  content: ReactNode;
  /** Optional action (e.g. "open full page") rendered beside the toggle. */
  action?: ReactNode;
}

interface AccordionProps {
  items: AccordionEntry[];
  /** Item id to expand initially. Pass null to start fully collapsed. */
  defaultOpen?: string | null;
}

/** Single-open accordion with a smooth grid-rows height animation. */
export default function Accordion({ items, defaultOpen = null }: AccordionProps) {
  const [openId, setOpenId] = useState<string | null>(defaultOpen);

  return (
    <div className="flex flex-col gap-2.5">
      {items.map((item) => {
        const open = openId === item.id;
        const panelId = `accordion-panel-${item.id}`;

        return (
          <div
            key={item.id}
            className={`overflow-hidden rounded-card border bg-card transition-colors duration-200 ${
              open ? "border-muted-soft" : "border-line"
            }`}>
            <div className="flex items-stretch">
              <button
                type="button"
                className="flex min-w-0 flex-1 items-center gap-3 px-[0.9rem] py-3.5 text-left"
                aria-expanded={open}
                aria-controls={panelId}
                onClick={() => setOpenId(open ? null : item.id)}>
                <div className="min-w-0 flex-1">{item.header}</div>
                <svg
                  className={`h-4 w-4 shrink-0 text-muted transition-transform duration-300 ease-snap ${
                    open ? "rotate-180" : ""
                  }`}
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  aria-hidden="true">
                  <path d="m6 9 6 6 6-6" />
                </svg>
              </button>

              {item.action && (
                <div className="flex shrink-0 items-center border-l border-line-soft px-2.5">
                  {item.action}
                </div>
              )}
            </div>

            <div
              id={panelId}
              role="region"
              aria-hidden={!open}
              className={`grid transition-[grid-template-rows] duration-300 ease-snap ${
                open ? "grid-rows-[1fr]" : "grid-rows-[0fr]"
              }`}>
              <div className="overflow-hidden">
                <div className="border-t border-line-soft px-[0.9rem] py-4">{item.content}</div>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import SvgIcon from "./SvgIcon";
import { data } from "../data/portfolio";
import { icons } from "../lib/icons";
import { setTheme } from "../lib/theme";
import { useTheme } from "../lib/useTheme";

interface Action {
  label: string;
  group: string;
  hint: string;
  icon: string;
  keywords: string;
  run: () => void;
}

const SECTIONS: [label: string, to: string, hint: string][] = [
  ["Experience", "/experience", "02"],
  ["Skills", "/skills", "03"],
  ["Projects", "/projects", "04"],
  ["Testimonials", "/testimonials", "05"],
  ["Education", "/education", "06"],
  ["Contact", "/contact", "07"],
];

/** Cmd/Ctrl+K command palette: navigation + quick actions. */
export default function CommandPalette() {
  const navigate = useNavigate();
  const theme = useTheme();
  const dialogRef = useRef<HTMLDialogElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const listRef = useRef<HTMLDivElement>(null);
  const statusTimer = useRef<number | undefined>(undefined);

  const [query, setQuery] = useState("");
  const [activeIndex, setActiveIndex] = useState(0);
  const [status, setStatusText] = useState("");

  const emailHref = data.socials.find((s) => s.icon === "email")?.href ?? "mailto:";
  const email = emailHref.replace(/^mailto:/, "");
  const linkedin = data.socials.find((s) => s.icon === "linkedin")?.href ?? "https://linkedin.com";

  const setStatus = useCallback((message: string) => {
    setStatusText(message);
    window.clearTimeout(statusTimer.current);
    if (message) {
      statusTimer.current = window.setTimeout(() => setStatusText(""), 2400);
    }
  }, []);

  const close = useCallback(() => {
    const dialog = dialogRef.current;
    if (dialog?.open) dialog.close();
  }, []);

  const open = useCallback(() => {
    const dialog = dialogRef.current;
    if (!dialog || dialog.open) return;
    setQuery("");
    setActiveIndex(0);
    setStatus("");
    dialog.showModal();
    requestAnimationFrame(() => inputRef.current?.focus());
  }, [setStatus]);

  const copyEmail = useCallback(async () => {
    try {
      if (navigator.clipboard?.writeText) {
        await navigator.clipboard.writeText(email);
      } else {
        const textarea = document.createElement("textarea");
        textarea.value = email;
        textarea.style.position = "fixed";
        textarea.style.opacity = "0";
        document.body.appendChild(textarea);
        textarea.select();
        document.execCommand("copy");
        textarea.remove();
      }
      setStatus("Email copied to clipboard.");
    } catch {
      setStatus("Copy failed — use the contact section.");
    }
  }, [email, setStatus]);

  const actions: Action[] = useMemo(() => {
    const next = theme === "dark" ? "light" : "dark";
    return [
      ...SECTIONS.map(([label, to, hint]) => ({
        label,
        group: "Navigate",
        hint,
        icon: icons.arrowRight,
        keywords: `${label} section jump`,
        run: () => {
          close();
          navigate(to);
        },
      })),
      {
        label: "Copy email",
        group: "Actions",
        hint: email,
        icon: icons.copy,
        keywords: "email clipboard contact",
        run: () => void copyEmail(),
      },
      {
        label: "Open LinkedIn",
        group: "Actions",
        hint: "linkedin.com",
        icon: icons.linkedin,
        keywords: "work experience profile",
        run: () => {
          close();
          window.open(linkedin, "_blank", "noopener,noreferrer");
        },
      },
      {
        label: "Toggle theme",
        group: "Actions",
        hint: `${theme} → ${next}`,
        icon: theme === "dark" ? icons.sun : icons.moon,
        keywords: "dark light appearance color",
        run: () => {
          setTheme(next);
          setStatus(`Theme: ${next}.`);
        },
      },
    ];
  }, [theme, email, linkedin, close, navigate, copyEmail, setStatus]);

  const visible = useMemo(() => {
    const q = query.trim().toLowerCase();
    return actions.filter((action) => {
      if (!q) return true;
      return `${action.label} ${action.group} ${action.keywords}`.toLowerCase().includes(q);
    });
  }, [actions, query]);

  const active = Math.min(activeIndex, Math.max(0, visible.length - 1));

  const setActive = (index: number) => {
    if (!visible.length) return;
    const next = (index + visible.length) % visible.length;
    setActiveIndex(next);
    requestAnimationFrame(() =>
      listRef.current
        ?.querySelector(`[data-index="${next}"]`)
        ?.scrollIntoView({ block: "nearest" }),
    );
  };

  // Cmd/Ctrl+K
  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      const isModK = (event.metaKey || event.ctrlKey) && event.key.toLowerCase() === "k";
      if (!isModK) return;
      event.preventDefault();
      if (dialogRef.current?.open) close();
      else open();
    };
    document.addEventListener("keydown", onKeyDown);
    return () => document.removeEventListener("keydown", onKeyDown);
  }, [open, close]);

  return (
    <dialog
      ref={dialogRef}
      className="palette m-auto w-[min(34rem,calc(100vw-2rem))] max-w-[34rem] rounded-card border border-line bg-card p-0 text-fg shadow-[0_24px_80px_rgba(0,0,0,0.35)] backdrop:bg-[rgba(6,6,8,0.55)] backdrop:backdrop-blur-[8px]"
      aria-label="Command palette"
      onClick={(event) => {
        if (event.target === dialogRef.current) close();
      }}
      onClose={() => setStatus("")}>
      <div className="flex max-h-[min(70vh,32rem)] flex-col">
        <div className="flex items-center gap-[0.55rem] border-b border-line px-4 py-[0.8rem]">
          <span className="shrink-0 text-accent">
            <SvgIcon html={icons.search} />
          </span>
          <input
            ref={inputRef}
            className="min-w-0 flex-1 border-0 bg-transparent font-mono text-[0.8rem] text-fg outline-0 placeholder:text-muted-soft"
            type="text"
            role="combobox"
            aria-expanded="true"
            aria-controls="palette-list"
            aria-autocomplete="list"
            aria-activedescendant={visible.length ? `palette-item-${active}` : ""}
            autoComplete="off"
            spellCheck={false}
            placeholder="Jump to a section or run an action…"
            value={query}
            onChange={(event) => {
              setQuery(event.target.value);
              setActiveIndex(0);
            }}
            onKeyDown={(event) => {
              if (event.key === "ArrowDown") {
                event.preventDefault();
                setActive(active + 1);
              } else if (event.key === "ArrowUp") {
                event.preventDefault();
                setActive(active - 1);
              } else if (event.key === "Enter") {
                event.preventDefault();
                visible[active]?.run();
              }
            }}
          />
          <button
            className="grid h-6 w-6 shrink-0 place-items-center rounded-md text-muted hover:bg-line-soft hover:text-fg [&_svg]:h-[0.825rem] [&_svg]:w-[0.825rem]"
            type="button"
            aria-label="Close command palette"
            onClick={close}>
            <SvgIcon html={icons.close} />
          </button>
        </div>

        <div
          ref={listRef}
          className="overflow-y-auto p-[0.4rem]"
          data-lenis-prevent
          id="palette-list"
          role="listbox"
          aria-label="Commands">
          {visible.length === 0 ? (
            <p className="p-4 text-[0.725rem] text-muted">No commands match “{query}”.</p>
          ) : (
            visible.map((action, index) => (
              <div
                key={action.label}
                id={`palette-item-${index}`}
                role="option"
                aria-selected={index === active}
                data-index={index}
                className={`group flex cursor-pointer items-center gap-[0.65rem] rounded-lg px-[0.65rem] py-[0.55rem] ${
                  index === active ? "is-active bg-accent-soft" : ""
                }`}
                onMouseMove={() => {
                  if (index !== active) setActive(index);
                }}
                onClick={() => action.run()}>
                <span
                  className={`grid h-[1.7rem] w-[1.7rem] shrink-0 place-items-center rounded-[0.4rem] border [&_svg]:h-[0.825rem] [&_svg]:w-[0.825rem] ${
                    index === active ? "border-accent-line text-accent" : "border-line text-muted"
                  }`}>
                  <SvgIcon html={action.icon} />
                </span>
                <span className="flex min-w-0 flex-col">
                  <strong className="text-[0.8rem] font-medium">{action.label}</strong>
                  <span className="font-mono text-[0.725rem] uppercase tracking-[0.09em] text-muted-soft">
                    {action.group}
                  </span>
                </span>
                <span className="ml-auto hidden max-w-[12rem] overflow-hidden text-ellipsis whitespace-nowrap font-mono text-[0.725rem] text-muted-soft min-[521px]:block">
                  {action.hint}
                </span>
              </div>
            ))
          )}
        </div>

        <div className="flex items-start justify-between gap-4 border-t border-line px-4 py-[0.6rem] font-mono text-[0.725rem] text-muted-soft max-[520px]:flex-col max-[520px]:gap-[0.35rem] min-[521px]:items-center">
          <span className="text-success" role="status" aria-live="polite">
            {status}
          </span>
          <span className="inline-flex items-center gap-[0.2rem] whitespace-nowrap [&_kbd]:inline-grid [&_kbd]:h-[1.05rem] [&_kbd]:min-w-[1.05rem] [&_kbd]:place-items-center [&_kbd]:rounded-[0.25rem] [&_kbd]:border [&_kbd]:border-line [&_kbd]:bg-line-soft [&_kbd]:px-[0.2rem] [&_kbd]:font-mono [&_kbd]:text-[0.725rem] [&_kbd]:text-muted">
            <kbd>↑</kbd>
            <kbd>↓</kbd> navigate <kbd>↵</kbd> select <kbd>esc</kbd> close
          </span>
        </div>
      </div>
    </dialog>
  );
}

import { useRef, useState } from "react";
import { Panel, PanelBody, PanelHeader } from "../components/Panel";
import SvgIcon from "../components/SvgIcon";
import { data } from "../data/portfolio";
import { icons } from "../lib/icons";

const socialIcon: Record<string, string> = {
  linkedin: icons.linkedin,
  github: icons.github,
};

async function copyToClipboard(text: string) {
  if (navigator.clipboard?.writeText) {
    try {
      await navigator.clipboard.writeText(text);
      return;
    } catch {
      /* fall through to the legacy path */
    }
  }
  const textarea = document.createElement("textarea");
  textarea.value = text;
  textarea.style.position = "fixed";
  textarea.style.opacity = "0";
  document.body.appendChild(textarea);
  textarea.select();
  document.execCommand("copy");
  textarea.remove();
}

export default function Contact() {
  const emailHref = data.socials.find((s) => s.icon === "email")?.href ?? "mailto:";
  const email = emailHref.replace(/^mailto:/, "");
  const socials = data.socials.filter((s) => s.icon !== "email");

  const [label, setLabel] = useState("Copy email");
  const [copied, setCopied] = useState(false);
  const timer = useRef<number | undefined>(undefined);

  const onCopy = async () => {
    if (!email) return;
    try {
      await copyToClipboard(email);
      setLabel("Copied ✓");
      setCopied(true);
      window.clearTimeout(timer.current);
      timer.current = window.setTimeout(() => {
        setLabel("Copy email");
        setCopied(false);
      }, 1800);
    } catch {
      setLabel("Copy failed");
    }
  };

  return (
    <Panel id="contact-panel" space="contact">
      <PanelHeader title="Contact" index="07 / say hello" />
      <PanelBody>
        <div className="grid gap-8 min-[800px]:grid-cols-[minmax(0,1.2fr)_minmax(0,0.8fr)] min-[800px]:items-end min-[800px]:gap-12">
          <div>
            <p className="font-mono text-[0.7rem] uppercase tracking-[0.16em] text-accent"></p>
            <h2 className="relative mt-3 inline-block text-[clamp(1.85rem,4.5vw,2.85rem)] leading-[1.02] tracking-[-0.05em] after:absolute after:-bottom-1 after:left-0 after:h-0.5 after:w-0 after:bg-accent after:transition-[width] after:duration-500 after:ease-snap after:content-[''] hover:after:w-full">
              Let's build something
              <br />
              <span className="text-muted">that holds up.</span>
            </h2>
            <p className="mt-4 max-w-[30rem] text-base text-muted">
              For full-stack and platform roles, the fastest way to reach me is email.
            </p>
          </div>

          <div className="flex flex-col gap-3">
            <a
              className="flex items-center justify-between gap-4 border-b border-line pb-[0.6rem] font-mono text-[0.85rem] text-fg [transition:color_150ms_ease,border-color_150ms_ease,transform_0.25s_var(--ease)] hover:-translate-x-1 hover:border-accent hover:text-accent"
              href={emailHref}>
              <span>{email}</span>
              <span
                className="inline-flex text-accent [&_svg]:h-[0.85rem] [&_svg]:w-[0.85rem]"
                aria-hidden="true">
                <SvgIcon html={icons.arrowUpRight} />
              </span>
            </a>
            <div className="flex flex-wrap items-center justify-between gap-3">
              <button
                className={`inline-flex items-center gap-[0.375rem] rounded-full border px-[0.7rem] py-[0.35rem] font-mono text-[0.725rem] uppercase tracking-[0.07em] transition-[color,border-color,background] duration-150 [&_svg]:h-[0.7rem] [&_svg]:w-[0.7rem] ${
                  copied
                    ? "border-[color-mix(in_srgb,var(--success)_40%,transparent)] bg-[color-mix(in_srgb,var(--success)_8%,transparent)] text-success"
                    : "border-line text-muted hover:border-muted-soft hover:text-fg"
                }`}
                type="button"
                aria-live="polite"
                onClick={onCopy}>
                <SvgIcon html={icons.copy} />
                <span>{label}</span>
              </button>
              <div className="flex flex-wrap gap-[0.7rem]">
                {socials.map((s) => (
                  <a
                    key={s.label}
                    className="inline-flex items-center gap-[0.375rem] text-[0.8rem] text-muted transition-colors duration-150 hover:text-fg [&_svg]:h-[0.85rem] [&_svg]:w-[0.85rem] [&_svg]:text-accent"
                    href={s.href}
                    target="_blank"
                    rel="noreferrer noopener">
                    <SvgIcon html={socialIcon[s.icon] ?? icons.linkedin} />
                    <span>{s.label}</span>
                  </a>
                ))}
              </div>
            </div>
          </div>
        </div>
      </PanelBody>
    </Panel>
  );
}

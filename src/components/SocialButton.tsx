import type { ReactNode } from "react";

interface SocialButtonProps {
  href: string;
  primary?: boolean;
  external?: boolean;
  download?: boolean;
  ariaLabel?: string;
  children: ReactNode;
}

const base =
  "inline-flex items-center gap-[0.45rem] rounded-full border px-[0.85rem] py-[0.45rem] text-[0.85rem] font-medium transition-[color,border-color,background,transform] duration-150 ease-snap hover:-translate-y-px [&_svg]:shrink-0";

const secondary = "border-line bg-card text-muted hover:border-muted-soft hover:text-fg";

const primaryCls =
  "border-accent bg-[#020617] text-white hover:bg-[#020617] hover:text-white dark:bg-accent dark:text-bg dark:hover:bg-[color-mix(in_srgb,var(--accent)_85%,var(--foreground))] dark:hover:text-bg";

export default function SocialButton({
  href,
  primary,
  external,
  download,
  ariaLabel,
  children,
}: SocialButtonProps) {
  return (
    <a
      className={`${base} ${primary ? primaryCls : secondary}`}
      href={href}
      aria-label={ariaLabel}
      {...(external ? { target: "_blank", rel: "noreferrer noopener" } : {})}
      {...(download ? { download: true } : {})}>
      {children}
    </a>
  );
}

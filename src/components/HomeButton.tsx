import { Link } from "react-router-dom";
import SvgIcon from "./SvgIcon";
import { icons } from "../lib/icons";

/** Prominent "Back to home" pill with a house icon. */
export default function HomeButton() {
  return (
    <Link
      to="/"
      className="group inline-flex items-center gap-[0.45rem] rounded-full border border-line bg-card px-[0.72rem] py-[0.36rem] font-mono text-[0.725rem] font-medium uppercase tracking-[0.08em] text-muted transition-[color,border-color,transform] duration-150 ease-snap hover:-translate-y-0.5 hover:border-muted-soft hover:text-fg [&_svg]:h-[0.85rem] [&_svg]:w-[0.85rem] [&_svg]:transition-transform [&_svg]:duration-150 group-hover:[&_svg]:-translate-x-0.5">
      <SvgIcon html={icons.home} />
      <span>Back to home</span>
    </Link>
  );
}

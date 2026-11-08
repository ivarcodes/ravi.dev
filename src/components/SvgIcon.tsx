/** Renders one of the inline SVG strings from lib/icons without adding a layout box. */
export default function SvgIcon({ html }: { html: string }) {
  return <span className="contents" dangerouslySetInnerHTML={{ __html: html }} />;
}

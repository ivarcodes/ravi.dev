/** Resolve a path from /public against the site base (works under /ravi.dev/ too). */
export function asset(path: string): string {
  if (/^(https?:)?\/\//i.test(path) || path.startsWith("data:")) return path;
  return `${import.meta.env.BASE_URL}${path.replace(/^\//, "")}`;
}

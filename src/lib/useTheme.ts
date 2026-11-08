import { useEffect, useState } from "react";
import { getTheme, type Theme } from "./theme";

/** Current theme, kept in sync with the `themechange` event. */
export function useTheme(): Theme {
  const [theme, setThemeState] = useState<Theme>(getTheme);

  useEffect(() => {
    const onChange = () => setThemeState(getTheme());
    window.addEventListener("themechange", onChange);
    return () => window.removeEventListener("themechange", onChange);
  }, []);

  return theme;
}

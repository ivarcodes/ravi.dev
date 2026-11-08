/** @type {import('tailwindcss').Config} */
export default {
  darkMode: ["selector", "[data-theme=\"dark\"]"],
  content: ["./index.html", "./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        bg: "var(--background)",
        fg: "var(--foreground)",
        muted: "var(--muted)",
        "muted-soft": "var(--muted-soft)",
        line: "var(--line)",
        "line-soft": "var(--line-soft)",
        card: "var(--card)",
        accent: "var(--accent)",
        "accent-soft": "var(--accent-soft)",
        "accent-line": "var(--accent-line)",
        success: "var(--success)",
      },
      fontFamily: {
        sans: ["Geist", "ui-sans-serif", "system-ui", "-apple-system", "BlinkMacSystemFont", "Segoe UI", "Roboto", "sans-serif"],
        display: ["Hanken Grotesk", "ui-sans-serif", "system-ui", "-apple-system", "BlinkMacSystemFont", "Segoe UI", "Roboto", "sans-serif"],
        mono: ["Geist Mono", "ui-monospace", "SFMono-Registered", "Menlo", "Monaco", "Consolas", "monospace"],
      },
      maxWidth: { container: "72rem" },
      borderRadius: { card: "0.6rem" },
      transitionTimingFunction: { snap: "cubic-bezier(0.16, 1, 0.3, 1)" },
      keyframes: {
        revealUp: {
          from: { opacity: "0", transform: "translateY(14px)" },
          to: { opacity: "1", transform: "translateY(0)" },
        },
        chipPop: {
          from: { opacity: "0", transform: "translateY(6px) scale(0.95)" },
          to: { opacity: "1", transform: "translateY(0) scale(1)" },
        },
      },
    },
  },
  plugins: [],
};

import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// Set VITE_BASE=/ravi.dev/ when deploying to GitHub Pages under a repo path.
export default defineConfig({
  base: process.env.VITE_BASE ?? "/",
  plugins: [react()],
});

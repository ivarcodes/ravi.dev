# Ravi Bhushan V — Portfolio (React + TypeScript + Tailwind)

Route-based port of `Noobah/portfolio-v1`.

## Run

```
npm install
npm run dev        # http://localhost:5173
npm run build
```

## Routes

`/` (hero + every section; cards link to their detail pages) · `/experience` · `/experience/:slug` · `/skills` · `/projects` · `/projects/:slug` · `/testimonials` · `/education` · `/contact`

To add a page: create `src/pages/YourPage.tsx`, add a `<Route>` in `src/App.tsx`, and add it to `NAV_ITEMS` in `src/components/Header.tsx`.

## Edit content

Everything editable lives in `src/data/portfolio.ts`. Add a project or a job there with a unique `slug` and its list entry and detail page (`/projects/<slug>`, `/experience/<slug>`) appear automatically. Images and the resume are in `public/`.

## GitHub Pages

The workflow in `.github/workflows/deploy.yml` builds with `VITE_BASE=/ravi.dev/` and copies `index.html` to `404.html` so deep links work.

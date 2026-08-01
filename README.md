# Wiktoria Lewandowska — Portfolio

Vite + React portfolio site with prerendered HTML for SEO.

## Local development

```bash
npm install
npm run dev
```

Optional: copy `.env.example` to `.env` and set `VITE_SITE_URL` for correct SEO URLs locally.

```bash
npm run build   # production build + prerender
npm run preview # preview dist/
```

## Deploy to Railway (GitHub)

This repo is set up for Railway with a multi-stage **Dockerfile** (Node build → Caddy static serve).

1. Push this project to a GitHub repository.
2. In [Railway](https://railway.com/new), create a project → **Deploy from GitHub repo** → select the repo.
3. Railway will detect the `Dockerfile` and build/deploy automatically.
4. Open the service → **Settings** → **Networking** → **Generate Domain**.
5. Open the service → **Variables** and set:
   - `VITE_SITE_URL` — your public origin, no trailing slash  
     Examples: `https://your-app.up.railway.app` or `https://www.yourdomain.com`
6. Redeploy so the new `VITE_SITE_URL` is baked into the build (canonical, Open Graph, sitemap, robots).

Optional variables (see `.env.example`):

- `VITE_OG_IMAGE_PATH`
- `VITE_OG_IMAGE_WIDTH`
- `VITE_OG_IMAGE_HEIGHT`

Custom domain: add it under Networking, then update `VITE_SITE_URL` to that domain and redeploy.

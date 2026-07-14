# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

- `npm run dev` – Start local development server at http://localhost:4321 with mock data fallback.
- `npm run build` / `npm run pages:build` – Build for production (outputs to `dist/`).
- `npm run preview` – Preview the built site locally.
- `npx astro ...` – Run Astro CLI commands.

### Deployment & Database

- `npx wrangler login` – Authenticate with Cloudflare.
- `npx wrangler d1 create the-base-db` – Create a new D1 database (update `wrangler.toml` with `database_id`).
- `npx wrangler d1 execute the-base-db --remote --file=./migrations/0000_init_posts.sql` – Run migrations on remote D1.
- `npx wrangler pages deploy dist --project-name=actyourplan2026` – Deploy to Cloudflare Pages.
- `npx wrangler pages dev dist --d1=DB=the-base-db` – Local dev with remote D1 (use with caution).

## Architecture

### Stack
- **Framework**: Astro v5 SSR with `@astrojs/cloudflare` adapter (directory mode).
- **Database**: Cloudflare D1 (SQLite) bound as `env.DB`; local development uses mock data.
- **Styling**: Tailwind CSS v3 with custom tactical theme (colors, fonts, grid background).
- **UI Components**: Mix of Astro components and React (for interactive parts like `AdminDashboard`).
- **Module resolution**: Vite alias `@` maps to `./src` (configured in `astro.config.mjs`).
- **Routing**: File‑based routing in `src/pages/` with dynamic segments `[type]` and `[slug]`.

### i18n System
- **Locales**: `zh-TW` (default), `zh-CN`, `en`, `ja`.
- **Middleware**: `src/middleware.ts` intercepts requests, extracts locale prefix, rewrites path internally (e.g., `/en/blueprints` → `/blueprints`).
- **Default locale**: URLs without prefix are treated as `zh-TW`; `/zh-TW/...` redirects to prefix‑less version.
- **Helpers**: `src/lib/i18n.ts` provides `getLocalePath`, `getTranslations`, `removeLocaleFromPath`.
- **Translation strings**: All UI text is kept in the `translations` object per locale.

### Database & Mocking
- **Schema**: `posts` table with `id`, `slug`, `type`, `title`, `content`, `metadata`, `created_at`, `updated_at`.
- **Operations**: `src/lib/d1.ts` exports `getPosts`, `getPost`, `createPost`, `updatePost`, `deletePost`, `getAllPosts`.
- **Mock fallback**: If `env.DB` is missing (local dev) or query returns empty in DEV mode, functions return mock data defined in the same file.
- **Content types**: `blueprints`, `armory`, `signals`, `experiments`. Add new types in `src/lib/i18n.ts` (`nav`, `sections`) and `src/pages/[type]/index.astro` (`validTypes`).

### Routing Structure
- `src/pages/index.astro` – Homepage.
- `src/pages/[type]/index.astro` – Generic list page for any valid content type.
- `src/pages/[type]/[slug].astro` – Generic detail page.
- `src/pages/blueprints/index.astro` & `src/pages/blueprints/[slug].astro` – Customized blueprint pages (same pattern, but with dedicated styling).
- `src/pages/admin.astro` – Admin dashboard (renders React component `AdminDashboard`).

### Environment & Bindings
- **`DB`** (D1Database) – Bound via `wrangler.toml` (`[[d1_databases]]`).
- **`SESSION`** (KV namespace) – Required by Astro Cloudflare adapter for session storage.
- **`ADMIN_PASSWORD`** – Used for admin area authentication (set in Cloudflare Pages environment variables).
- **`NODE_VERSION`** – Should be `20` or `22` (set in Cloudflare Pages environment variables).
- **Type definitions**: `src/env.d.ts` extends `App.Locals` with `runtime.env.DB` and `locale`.

### Admin Dashboard
- Located at `/admin` (no locale prefix).
- React component `src/components/admin/AdminDashboard` (client‑only) with CRUD operations.
- Authentication uses `ADMIN_PASSWORD` cookie check; login logic and session management are in `src/lib/auth.ts`.

### Styling
- Tailwind config: `tailwind.config.ts` defines custom colors (`background`, `surface`, `primary`, etc.), fonts (`sans`, `heading`, `mono`), and grid‑pattern background.
- Global styles in `src/styles/global.css`.

### Deployment Notes
- Build output directory: `dist/`.
- Adapter mode: `directory` (Cloudflare Pages).
- Ensure D1 and KV bindings are configured in `wrangler.toml` and reflected in Cloudflare Dashboard (Pages → Settings → Functions).
- See `DEPLOY.md` for detailed step‑by‑step instructions.

## Development Tips
- Local dev works without a D1 database—mock data is automatically served.
- To test with real D1, run `npx wrangler pages dev dist --d1=DB=the-base-db`.
- When adding a new content type, update `src/lib/i18n.ts` (`nav`, `sections`) and `src/pages/[type]/index.astro` (`validTypes`).
- Always use `getLocalePath(locale, path)` for generating internal links.
- The middleware expects locale prefixes; avoid hard‑coding locale‑specific paths in components.
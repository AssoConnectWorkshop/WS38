# WS1

Next.js 15 App Router · TypeScript · Tailwind CSS v4 · Supabase · AssoConnect API · Deployed on Netlify.

## Stack
- **Tailwind v4**: `@import "tailwindcss"` in globals.css — no `@tailwind` directives, no `@apply` without `@reference`.
- **Supabase**: `@supabase/ssr` — `src/lib/supabase/server.ts` for server code, `src/lib/supabase/client.ts` for the browser.
- **AssoConnect API**: server-only client at `src/lib/assoconnect.ts`. Base URL `https://app.assoconnect.com/api/v1`, header `X-AUTH-TOKEN`, `Accept: application/ld+json`. Rate limit: 30 req/s, CRM scope only.
- **Config-driven**: navigation and site values in `src/config/site.ts`.

## Workflow
- After completing a task: commit → push → create PR → merge PR, without waiting for user confirmation.

## Rules
- Server Components by default; `'use client'` only when interactivity requires it.
- Secrets are server-only: no `NEXT_PUBLIC_` prefix for API keys, never import server-only modules into client components.
- No comments unless the WHY is non-obvious. No `@apply` without `@reference`.
- Run `npm run build` before every push — fix all type errors and lint warnings.

## Deployment
- All env vars live on Netlify — never commit secrets.
- Push to `main` → production (`https://assoconnect-ws1.netlify.app/`).
- Push to any branch + open a PR → Netlify Deploy Preview.
- After pushing, tell the user the URL and what to look for.

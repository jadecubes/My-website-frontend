# app/

Next.js 14 App Router. Each folder is a route; heavy interactive UI is split out into `../components/pages/*Client.tsx` so the route file can stay a Server Component and fetch data.

## Routes

| Path | File | Notes |
|---|---|---|
| `/` | `page.tsx` | Homepage — renders `HomeClient` |
| `/about` | `about/page.tsx` | Renders `AboutClient` |
| `/portfolio` | `portfolio/page.tsx` | Project gallery — fetches from `/api/projects` |
| `/portfolio/[slug]` | `portfolio/[slug]/page.tsx` | Single project detail |
| `/contact` | `contact/page.tsx` | Contact form — renders `ContactClient` |

## Shared

| File | Purpose |
|---|---|
| `layout.tsx` | Root layout — wraps every route with `<ThemeProvider>`, `<Navbar>`, `<Footer>` |
| `globals.css` | Tailwind layers + site-wide styles (including `.reveal` scroll animations) |

## Server vs client split

Route files (`page.tsx`, `layout.tsx`) are Server Components by default and run at request time — good for data fetching via `lib/api.ts`. Anything needing `useState`, `useEffect`, event handlers, or browser APIs lives in a `"use client"` component under `../components/pages/` or `../components/ui/`.

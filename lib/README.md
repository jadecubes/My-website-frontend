# lib/

Client/server-safe utilities. Primarily the HTTP layer that talks to the Laravel API, organised as one namespace per backend domain.

## Layout

```
api/
  _internal.ts    Shared API_URL + FetchOpts type
  projects.ts     projects.list / projects.get / projects.coverImage / projects.galleryImages
  services.ts     services.list
  contact.ts      contact.send
  nav.ts          nav.list
  siteSettings.ts siteSettings.get
  index.ts        re-exports the five namespaces
```

## Usage

Import the namespace you need; methods live on it:

```ts
import { projects, contact } from '@/lib/api';

const page = await projects.list();         // PaginatedResponse<Project>
const one  = await projects.get('my-slug'); // Project
await contact.send({ name, email, body });
```

`projects.coverImage(p)` and `projects.galleryImages(p)` are pure helpers operating on a `Project` record (no network call) — kept on the namespace for discoverability.

## Conventions

- Base URL comes from `process.env.NEXT_PUBLIC_API_URL`, defaulting to `http://localhost:8000` for local dev. One source of truth in `_internal.ts`.
- `GET` helpers use Next.js `fetch` with `next: { revalidate: N }` (60s for projects/nav/site settings, 3600s for services). Caching applies in Server Components; in `'use client'` components the directive is a no-op and every mount hits the network.
- Every method accepts `{ signal }` so callers can cancel in-flight requests on unmount via AbortController.
- Errors throw `Error` with the HTTP status embedded — callers catch and surface to the UI.

## Why namespaces (not flat exports)

Grouping endpoints by domain keeps related calls together (`projects.*` vs `contact.*`), makes auto-completion show what's available per domain, and gives a clear seam to add cross-cutting concerns later (logging, retry, error normalization) by extending the namespace object without touching every callsite.

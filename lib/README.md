# lib/

Client/server-safe utilities. Primarily the HTTP layer that talks to the Laravel API.

| File | Exports |
|---|---|
| `api.ts` | `fetchProjects`, `fetchProject`, `fetchServices`, `sendContactMessage`, `getCoverImage`, `getGalleryImages` |

## Conventions

- Base URL comes from `process.env.NEXT_PUBLIC_API_URL`, defaulting to `http://localhost:8000` for local dev.
- `GET` helpers use Next.js `fetch` with `next: { revalidate: N }` for ISR-style caching:
  - Projects: 60s
  - Services: 3600s
- Every helper accepts `{ signal }` so callers can cancel in-flight requests on unmount.
- Errors throw with the HTTP status embedded in the message — callers catch and surface to the UI.

## Typed responses

All return types come from `../types/index.ts`. `fetchProjects` returns a `PaginatedResponse<Project>` (mirrors Laravel's paginator shape); the others return plain arrays or objects.

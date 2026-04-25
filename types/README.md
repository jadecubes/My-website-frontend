# types/

Shared TypeScript types. Imported everywhere via the `@/types` alias (see `../tsconfig.json`).

| Export | Shape |
|---|---|
| `Category` | `{ id, name, slug }` |
| `Media` | `{ id, collection_name, original_url }` — Spatie Media Library record |
| `Project` | Portfolio project with `category`, `media[]`, publish flag, sort order |
| `Service` | Service offered — title, description, icon, sort order |
| `PaginatedResponse<T>` | Mirrors Laravel's paginator: `{ data, current_page, last_page, per_page, from, to, total }` |

## Source of truth

These types mirror the JSON returned by the Laravel API resources in `../../ethostudio-backend/app/Http/Controllers/Api/`. When an API response shape changes, update here too — there is no code-gen, it is a hand-maintained contract.

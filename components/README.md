# components/

React components, organised by role.

```
layout/   Site chrome shared across every page
pages/    Client components backing a specific route
ui/       Reusable presentational building blocks
```

## layout/

Wraps every page via `app/layout.tsx`.

| Component | Purpose |
|---|---|
| `Navbar.tsx` | Top nav with theme toggle (consumes `ThemeContext`) |
| `Footer.tsx` | Site footer |

## pages/

One `*Client.tsx` per route. Each is a `"use client"` component that holds the route's interactive state; the matching server component in `app/` fetches data and renders this client.

| Component | Route |
|---|---|
| `HomeClient.tsx` | `/` |
| `AboutClient.tsx` | `/about` |
| `PortfolioClient.tsx` | `/portfolio` (gallery + filters) |
| `ContactClient.tsx` | `/contact` (form submission) |

## ui/

Reusable primitives composed by the page clients.

| Component | Purpose |
|---|---|
| `PageHero.tsx` | Title/subtitle hero block used at the top of most pages |
| `PortfolioCard.tsx` | Project card (image, title, category) for the gallery grid |
| `PostCard.tsx` | Blog/post card (currently unused in routes — kept for upcoming posts feature) |
| `TagFilter.tsx` | Filter pills for category/tag selection |

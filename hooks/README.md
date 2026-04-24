# hooks/

Reusable React hooks.

| Hook | Purpose |
|---|---|
| `useScrollAnimation.ts` | Returns a `ref` for a container. Any descendant with class `.reveal` gets an IntersectionObserver attached — when it scrolls into view, the `visible` class is added and the observer stops watching that element. `.reveal` / `.reveal.visible` styles live in `../app/globals.css`. |

## Usage

Attach the returned `ref` to a container and give any descendant the class `reveal`.

```tsx
const ref = useScrollAnimation();
<div ref={ref}><div className="reveal">…</div></div>
```

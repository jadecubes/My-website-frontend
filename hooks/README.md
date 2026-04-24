# hooks/

Reusable React hooks.

| Hook | Purpose |
|---|---|
| `useScrollAnimation.ts` | Returns a `ref` for a container. Any descendant with class `.reveal` gets an IntersectionObserver attached — when it scrolls into view, the `visible` class is added and the observer stops watching that element. `.reveal` / `.reveal.visible` styles live in `../app/globals.css`. |

## Usage

```tsx
'use client';
import { useScrollAnimation } from '@/hooks/useScrollAnimation';

export function Section() {
  const ref = useScrollAnimation();
  return (
    <div ref={ref}>
      <div className="reveal">I fade in when scrolled into view</div>
    </div>
  );
}
```

Client-only hook — the file is marked `'use client'` because it touches the DOM and `IntersectionObserver`.

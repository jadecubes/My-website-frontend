# context/

React context providers.

| File | Provides |
|---|---|
| `ThemeContext.tsx` | `{ theme, toggle }` for light/dark theming |

## ThemeContext

- Reads the initial theme from `localStorage['theme']`, falling back to the OS `prefers-color-scheme` media query.
- Toggling flips a `dark` class on `<html>` (Tailwind's `darkMode: 'class'` strategy) and persists the choice to `localStorage`.
- Marked `'use client'` and mounted once from `app/layout.tsx`.

## Usage

```tsx
'use client';
import { useContext } from 'react';
import { ThemeContext } from '@/context/ThemeContext';

export function ThemeButton() {
  const { theme, toggle } = useContext(ThemeContext);
  return <button onClick={toggle}>{theme === 'dark' ? '☾' : '☀'}</button>;
}
```

`Navbar.tsx` is the main consumer.

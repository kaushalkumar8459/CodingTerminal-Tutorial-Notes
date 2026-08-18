---
title: Theme Management
slug: day-039-theme-management
dayLabel: Day 39
level: Intermediate
estimatedMinutes: 60
order: 39
track: react
---
# Day 39 [Intermediate]: Theme Management

## Goal

Build a theme system that combines Context, CSS custom properties, persistence, system preference, accessibility, and first-paint stability.

## 1. Why Theme Is a Good Context Use Case

Theme affects many distant components:

```text
App
├── Header
├── Sidebar
├── Dashboard
├── Modal
└── Footer
```

Passing `theme` through every level is unnecessary. A focused `ThemeContext` gives components access to the shared preference.

## 2. Store Semantic Theme State

Prefer a meaningful state model:

```jsx
const [theme, setTheme] = useState("light");
```

For a three-mode design:

```text
light
 dark
 system
```

`system` is a preference mode, not necessarily the final applied theme. The browser's `prefers-color-scheme` determines the effective theme.

## 3. CSS Variables

Keep visual tokens in CSS:

```css
:root {
  --color-bg: #ffffff;
  --color-text: #111111;
  --color-surface: #f5f5f5;
}

[data-theme="dark"] {
  --color-bg: #111111;
  --color-text: #f5f5f5;
  --color-surface: #1d1d1d;
}

body {
  background: var(--color-bg);
  color: var(--color-text);
}
```

Components consume semantic tokens instead of knowing whether the application is light or dark.

## 4. Theme Provider

```jsx
import { createContext, useContext, useEffect, useMemo, useState } from "react";

const ThemeContext = createContext(null);

function getInitialTheme() {
  const saved = localStorage.getItem("theme");
  return saved === "light" || saved === "dark" || saved === "system"
    ? saved
    : "system";
}

export function ThemeProvider({ children }) {
  const [theme, setTheme] = useState(getInitialTheme);

  const value = useMemo(
    () => ({ theme, setTheme }),
    [theme]
  );

  useEffect(() => {
    localStorage.setItem("theme", theme);
  }, [theme]);

  return (
    <ThemeContext.Provider value={value}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  const value = useContext(ThemeContext);
  if (value === null) {
    throw new Error("useTheme must be used within ThemeProvider");
  }
  return value;
}
```

This stores the user's **preference**. Applying the preference to the document is a separate concern.

## 5. Apply Theme to the Document

```jsx
useEffect(() => {
  const root = document.documentElement;

  const effectiveTheme =
    theme === "system"
      ? window.matchMedia("(prefers-color-scheme: dark)").matches
        ? "dark"
        : "light"
      : theme;

  root.dataset.theme = effectiveTheme;
}, [theme]);
```

This is a legitimate effect because it synchronizes React state with an external system: the DOM.

## 6. Support System Theme Changes

If `system` mode is supported, the application should respond when the operating-system preference changes.

```jsx
useEffect(() => {
  const media = window.matchMedia("(prefers-color-scheme: dark)");

  function handleChange() {
    if (theme === "system") {
      document.documentElement.dataset.theme = media.matches
        ? "dark"
        : "light";
    }
  }

  media.addEventListener("change", handleChange);
  return () => media.removeEventListener("change", handleChange);
}, [theme]);
```

Cleanup matters because the listener is attached to an external browser object.

## 7. Avoid Flash of Wrong Theme

If the theme is applied only after React mounts, the browser may briefly paint the default theme.

A robust application can run a tiny inline initialization script before the main bundle, or configure the document during server rendering when using an SSR framework.

Conceptually:

```text
HTML arrives
  ↓
Read saved/system preference
  ↓
Set data-theme
  ↓
Browser paints correct theme
  ↓
React hydrates/mounts
```

Do not claim that `useEffect` alone guarantees first-paint correctness; it runs after the initial render.

## 8. Persistence Is a User Preference, Not Security Data

`localStorage` is appropriate for theme preference:

```jsx
localStorage.setItem("theme", theme);
```

But it should not be used as secure storage for credentials, refresh tokens, or secrets.

## 9. Accessibility

Theme switching should remain understandable to assistive technologies:

```jsx
<button
  type="button"
  onClick={() => setTheme("dark")}
  aria-pressed={theme === "dark"}
>
  Dark mode
</button>
```

Also consider:

- sufficient color contrast
- visible focus indicators
- `color-scheme` where appropriate
- reduced-motion preferences
- avoiding color as the only status signal

## 10. Complete Theme System

```jsx
function ThemeControls() {
  const { theme, setTheme } = useTheme();

  return (
    <fieldset>
      <legend>Theme</legend>

      {[
        ["light", "Light"],
        ["dark", "Dark"],
        ["system", "System"],
      ].map(([value, label]) => (
        <label key={value}>
          <input
            type="radio"
            name="theme"
            value={value}
            checked={theme === value}
            onChange={(event) => setTheme(event.target.value)}
          />
          {label}
        </label>
      ))}
    </fieldset>
  );
}
```

This is preferable to a visual-only toggle when users need explicit control over three modes.

## 11. Theme Architecture

```text
ThemeProvider
   │
   ├── preference: light | dark | system
   │
   ├── persistence
   │
   └── document synchronization
          ↓
      data-theme
          ↓
    CSS semantic tokens
          ↓
       Components
```

## 12. Common Mistakes

### Storing final colors in React state

Usually unnecessary. Store the theme mode and let CSS tokens represent visual details.

### Using inline styles everywhere

This makes multi-theme maintenance harder and duplicates styling decisions.

### Ignoring system preference

If `system` is a supported option, subscribe to `matchMedia` changes.

### Applying theme only after mount

This can cause a first-paint flash.

### Forgetting cleanup

Browser media-query listeners should be removed when the effect is cleaned up.

### Persisting invalid values

Validate stored strings before using them.

## Hands-on Project: Coding Challenge Theme System

Implement:

```text
light
 dark
 system
```

Requirements:

- [ ] ThemeContext
- [ ] `useTheme` custom hook
- [ ] CSS variables
- [ ] localStorage persistence
- [ ] system preference support
- [ ] accessible controls
- [ ] root `data-theme`
- [ ] listener cleanup
- [ ] invalid-storage fallback
- [ ] no secret data in storage

## Debugging Scenarios

**Theme resets after refresh:** inspect storage key and initialization.

**Dark mode works manually but not in system mode:** inspect `matchMedia` and its change listener.

**Colors flash during startup:** move initial theme application earlier than React's post-render effects.

**Theme works but tests fail:** mock `localStorage`, `matchMedia`, and document behavior appropriately.

## Assessment

1. Why is theme a good Context use case?
2. Why should colors usually be CSS variables rather than React state?
3. What is the difference between a theme preference and effective theme?
4. Why does `system` mode need `matchMedia`?
5. Why is `useEffect` appropriate for changing `document.documentElement`?
6. Why can first-paint theme application require work before React effects?
7. Why is localStorage suitable for theme but not a secret store?
8. What cleanup is required for system-theme listeners?

## Interview Questions

**Why use Context for theme?**  
Many distant components need the same user preference.

**How do you avoid a flash of the wrong theme?**  
Apply the saved/system theme before the initial paint, often with an early inline script or framework-level document logic.

**Why use CSS variables?**  
They centralize semantic design tokens and let the entire UI respond to one theme attribute.

**How would you support system preference?**  
Use `matchMedia('(prefers-color-scheme: dark)')` and subscribe to changes while the preference is `system`.

**Is localStorage secure?**  
No. It is client-controlled browser storage and should not be treated as a secure credential store.

## Day 39 Outcome

You can now build a **persistent, accessible, system-aware theme architecture** and understand why theme synchronization is an external-system effect. Day 40 applies Context to authentication and clarifies the boundary between UI auth state and real authorization.
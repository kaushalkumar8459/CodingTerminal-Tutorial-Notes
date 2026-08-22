---
title: Theme Management
slug: day-039-theme-management
dayLabel: Day 39
level: Intermediate
estimatedMinutes: 150
order: 39
track: react
---
# Day 39 [Intermediate]: Theme Management

## Goal

Build a production-ready theme system using Context, CSS custom properties, persistence, system preference, accessibility, and first-paint protection. The lesson focuses on separating **theme preference**, **effective theme**, and **visual design tokens**.

## Prerequisites

- Day 36: Context API introduction
- Day 38: `useContext` in components
- `useState`, `useEffect`, `useMemo`
- custom Hooks
- CSS custom properties
- browser APIs such as `matchMedia` and `localStorage`

## Learning Outcomes

By the end of this lesson, you can:

- model `light`, `dark`, and `system` preferences
- distinguish preference from effective theme
- build a guarded `useTheme` Hook
- persist and validate theme preferences
- synchronize React state with the document
- respond to operating-system theme changes
- avoid first-paint theme flashes
- use semantic CSS variables instead of storing colors in React state
- build accessible theme controls
- test theme logic without depending on browser implementation details
- identify the security limits of `localStorage`
- reason about SSR/hydration and browser-only APIs

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

Passing `theme` through every level is unnecessary. A focused `ThemeContext` gives components access to a shared preference without turning every intermediate component into a prop-passing layer.

Context is a distribution mechanism, not a styling engine. CSS remains responsible for visual presentation.

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

`system` is a **preference mode**, not necessarily the final applied theme. The browser's `prefers-color-scheme` determines the effective theme.

A useful model is:

```text
preference = light | dark | system
                     ↓
            resolve system mode
                     ↓
effectiveTheme = light | dark
                     ↓
              CSS data-theme
```

Do not store both preference and effective theme in independent state unless there is a strong reason; the effective value is derived from the preference and environment.

## 3. CSS Variables and Semantic Tokens

Keep visual tokens in CSS:

```css
:root {
  color-scheme: light;
  --color-bg: #ffffff;
  --color-text: #111111;
  --color-surface: #f5f5f5;
  --color-border: #d0d0d0;
}

[data-theme="dark"] {
  color-scheme: dark;
  --color-bg: #111111;
  --color-text: #f5f5f5;
  --color-surface: #1d1d1d;
  --color-border: #444444;
}

body {
  background: var(--color-bg);
  color: var(--color-text);
}
```

Components consume semantic tokens instead of knowing whether the application is light or dark.

Prefer semantic names such as `--color-surface` over names such as `--dark-gray`. This keeps the component independent of the selected theme.

## 4. Theme Provider Contract

A useful provider contract is:

```text
ThemeContext
├── theme        → user preference
├── setTheme     → update preference
└── effectiveTheme → resolved light/dark mode
```

Whether `effectiveTheme` is exposed through Context or derived by consumers depends on the architecture. Keep the contract small and avoid exposing implementation details unnecessarily.

## 5. Validate Persisted Preferences

Never assume browser storage contains a valid application value:

```jsx
const THEMES = ["light", "dark", "system"];

function isTheme(value) {
  return THEMES.includes(value);
}

function getInitialTheme() {
  if (typeof window === "undefined") {
    return "system";
  }

  const saved = window.localStorage.getItem("theme");
  return isTheme(saved) ? saved : "system";
}
```

The fallback also matters for SSR environments where `window` does not exist during server rendering.

## 6. Theme Provider

```jsx
import {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";

const ThemeContext = createContext(null);
const THEMES = ["light", "dark", "system"];

function isTheme(value) {
  return THEMES.includes(value);
}

function getInitialTheme() {
  if (typeof window === "undefined") {
    return "system";
  }

  const saved = window.localStorage.getItem("theme");
  return isTheme(saved) ? saved : "system";
}

export function ThemeProvider({ children }) {
  const [theme, setTheme] = useState(getInitialTheme);

  const value = useMemo(
    () => ({ theme, setTheme }),
    [theme]
  );

  useEffect(() => {
    window.localStorage.setItem("theme", theme);
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

This stores the user's **preference**. Applying that preference to the document is a separate external-system synchronization concern.

### Important production note

`localStorage` can throw in some browser/privacy configurations. Production code can wrap storage access in small safe helper functions rather than allowing a theme preference to crash rendering.

## 7. Resolve the Effective Theme

A three-mode preference requires a resolved value:

```jsx
function resolveTheme(theme) {
  if (theme !== "system") {
    return theme;
  }

  return window.matchMedia("(prefers-color-scheme: dark)").matches
    ? "dark"
    : "light";
}
```

The resolved value should be treated as derived information. When the operating-system preference changes, the resolved value changes while the user's stored preference remains `system`.

## 8. Apply Theme to the Document

```jsx
useEffect(() => {
  const root = document.documentElement;
  root.dataset.theme = resolveTheme(theme);
}, [theme]);
```

This is a legitimate effect because it synchronizes React state with an external system: the browser DOM.

The effect should not be used to create a second source of truth. React owns the preference; the DOM attribute reflects the resolved result.

## 9. Support System Theme Changes

If `system` mode is supported, respond when the operating-system preference changes:

```jsx
useEffect(() => {
  const media = window.matchMedia("(prefers-color-scheme: dark)");

  function applyTheme() {
    const effectiveTheme = theme === "system"
      ? (media.matches ? "dark" : "light")
      : theme;

    document.documentElement.dataset.theme = effectiveTheme;
  }

  applyTheme();

  media.addEventListener("change", applyTheme);
  return () => media.removeEventListener("change", applyTheme);
}, [theme]);
```

Cleanup matters because the listener is attached to an external browser object.

For compatibility with older browser environments, projects may need the legacy `addListener`/`removeListener` API. Prefer the modern API for current browsers unless the project's browser support matrix requires otherwise.

## 10. Avoid Flash of Wrong Theme

If the theme is applied only after React mounts, the browser may briefly paint the default theme.

A production application can run a tiny initialization script before the main bundle, or configure the document during server rendering when using an SSR framework.

Conceptually:

```text
HTML arrives
  ↓
Read saved/system preference
  ↓
Resolve effective theme
  ↓
Set data-theme
  ↓
Browser paints correct theme
  ↓
React hydrates/mounts
```

Do not claim that `useEffect` alone guarantees first-paint correctness; it runs after the initial render/paint opportunity.

### Example pre-paint initializer

```html
<script>
  (() => {
    const saved = localStorage.getItem("theme");
    const theme = ["light", "dark", "system"].includes(saved)
      ? saved
      : "system";

    const effective = theme === "system"
      ? (matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light")
      : theme;

    document.documentElement.dataset.theme = effective;
  })();
</script>
```

For CSP-protected applications, use the project's approved nonce/hash strategy instead of adding an unrestricted inline script.

## 11. Persistence Is a User Preference, Not Security Data

`localStorage` is appropriate for a non-sensitive theme preference:

```jsx
localStorage.setItem("theme", theme);
```

But it should not be treated as secure storage for credentials, refresh tokens, secrets, or authorization decisions. Browser storage is client-controlled and accessible to JavaScript running in the page.

## 12. Accessibility

Theme switching should remain understandable to assistive technologies:

```jsx
<fieldset>
  <legend>Theme</legend>

  <label>
    <input
      type="radio"
      name="theme"
      value="light"
      checked={theme === "light"}
      onChange={() => setTheme("light")}
    />
    Light
  </label>

  <label>
    <input
      type="radio"
      name="theme"
      value="dark"
      checked={theme === "dark"}
      onChange={() => setTheme("dark")}
    />
    Dark
  </label>

  <label>
    <input
      type="radio"
      name="theme"
      value="system"
      checked={theme === "system"}
      onChange={() => setTheme("system")}
    />
    System
  </label>
</fieldset>
```

Also consider:

- sufficient WCAG-appropriate color contrast
- visible keyboard focus indicators
- `color-scheme` where appropriate
- `prefers-reduced-motion` for theme-related transitions
- avoiding color as the only status signal
- readable text and controls in every theme

Do not add animated color transitions merely because they look attractive; respect reduced-motion preferences.

## 13. Theme Controls

For three explicit modes, radio buttons communicate the state clearly. For a two-state light/dark preference, a button with an appropriate accessible name and state can be suitable.

Avoid a control whose visual appearance is the only explanation of what will happen when activated.

## 14. Complete Theme Architecture

```text
ThemeProvider
   │
   ├── preference: light | dark | system
   │
   ├── persistence
   │
   └── document synchronization
          ↓
      effective theme
          ↓
      data-theme
          ↓
    CSS semantic tokens
          ↓
       Components
```

Keep these responsibilities distinct:

| Responsibility | Best location |
|---|---|
| User preference | React state / Context |
| Persistence | browser storage helper |
| System preference | `matchMedia` |
| DOM synchronization | effect / document initializer |
| Visual colors | CSS variables |
| Authorization/security | backend |

## 15. SSR and Hydration Considerations

In an SSR application, the server cannot directly read browser `localStorage` or `matchMedia`.

This creates a potential mismatch:

```text
Server renders light
       ↓
Browser knows saved preference = dark
       ↓
Hydration begins
       ↓
Theme changes to dark
```

A production SSR strategy should decide how the initial preference is made available to the server/document, or intentionally defer theme-dependent rendering until the client can resolve it.

The goal is to avoid both a visual flash and hydration inconsistencies. Follow the SSR framework's documented document/head initialization pattern rather than inventing framework-specific APIs.

## 16. Common Mistakes

### Storing final colors in React state

Usually unnecessary. Store the theme preference and let CSS tokens represent visual details.

### Using inline styles everywhere

This makes multi-theme maintenance harder and duplicates styling decisions.

### Treating `system` as a permanent `dark`/`light` value

`system` is a preference. Its effective value can change when the operating system changes.

### Ignoring system preference changes

If `system` is supported, subscribe to `matchMedia` changes.

### Applying theme only after mount

This can cause a first-paint flash.

### Forgetting cleanup

Browser media-query listeners should be removed when the effect is cleaned up.

### Persisting invalid values

Validate stored strings before using them.

### Assuming localStorage is secure

It is client-controlled browser storage, not a credential vault.

### Overusing `useMemo`

Memoize provider values only when there is a concrete identity/performance reason. It is not required for correctness.

## 17. Hands-on Labs

### Lab 1 — Basic Theme Context

Implement:

```text
light
 dark
 system
```

Requirements:

- `ThemeContext`
- `ThemeProvider`
- `useTheme`
- CSS variables
- `data-theme`

### Lab 2 — Persistence

Persist the preference and test:

- no stored value
- valid `light`
- valid `dark`
- valid `system`
- invalid stored value

### Lab 3 — System Mode

Use `matchMedia` and verify that changing the OS/browser preference changes the effective theme only while the selected preference is `system`.

### Lab 4 — First Paint

Implement an early initializer and compare startup behavior with an effect-only implementation.

### Lab 5 — Accessibility

Build keyboard-accessible controls and verify focus visibility, labels, contrast, and reduced-motion behavior.

### Lab 6 — SSR/Hydration Reasoning

Document how your chosen framework obtains or resolves the initial theme without introducing a hydration mismatch.

## 18. Debugging Scenarios

### Theme resets after refresh

Inspect:

1. storage key
2. stored value validation
3. initialization timing
4. whether the provider is remounted unexpectedly

### Dark mode works manually but not in system mode

Inspect `matchMedia`, the selected preference, the listener, and cleanup.

### Theme changes but colors do not

Inspect the root `data-theme` attribute and CSS variable selectors. Confirm components actually use semantic variables.

### Colors flash during startup

Move initial theme application earlier than React's post-render effects.

### Theme works in the application but tests fail

Mock browser APIs such as `localStorage`, `matchMedia`, and document behavior through the test environment rather than relying on the real browser.

### Hydration warning appears

Check whether server-rendered markup and client-resolved theme-dependent markup differ. Keep theme initialization consistent with the SSR framework's rendering strategy.

## 19. Assessment

1. Why is theme a good Context use case?
2. Why should colors usually be CSS variables rather than React state?
3. What is the difference between a theme preference and effective theme?
4. Why does `system` mode need `matchMedia`?
5. Why is `useEffect` appropriate for changing `document.documentElement`?
6. Why can first-paint theme application require work before React effects?
7. Why is `localStorage` suitable for theme but not a secret store?
8. What cleanup is required for system-theme listeners?
9. Why must persisted theme values be validated?
10. What SSR/hydration problem can occur with client-only theme detection?
11. Why is `useMemo` on a Context value an optimization rather than a requirement?
12. Why should the theme preference and CSS color tokens remain separate?

### Answers

1. Many distant components need the same user preference, and Context avoids unnecessary prop drilling.
2. CSS variables centralize visual tokens and let the selected theme change presentation without duplicating React state.
3. Preference is what the user selected (`light`, `dark`, or `system`); effective theme is the resolved `light` or `dark` value currently applied.
4. `matchMedia("(prefers-color-scheme: dark)")` exposes the operating-system/browser preference and can notify the application when it changes.
5. The DOM is an external system outside React's state model, so synchronization belongs in an effect.
6. Post-render effects are too late to guarantee the browser's first paint uses the intended theme.
7. Theme is non-sensitive preference data; `localStorage` is client-controlled and not suitable for secrets or authorization decisions.
8. Remove the `change` listener when the effect is cleaned up.
9. Storage can contain arbitrary or stale values, so only supported modes should be accepted.
10. The server may render one theme while the client resolves another, producing a flash or hydration inconsistency.
11. It stabilizes an object reference when dependencies remain equal; it does not change correctness and should be justified by the provider/consumer architecture.
12. React state models user preference while CSS variables model presentation, keeping the architecture maintainable and theme-agnostic.

## 20. Interview Questions

### Beginner

**Why use Context for theme?**

Many distant components need the same preference without every intermediate component receiving it as a prop.

**Why use CSS variables?**

They centralize semantic design tokens and allow the UI to respond to one theme attribute.

### Intermediate

**How would you support light, dark, and system modes?**

Store the preference as `light | dark | system`, resolve `system` using `matchMedia`, and apply the effective theme through a document attribute consumed by CSS.

**How do you avoid a flash of the wrong theme?**

Resolve and apply the initial theme before the browser's first paint, often through an early document script or framework-level document logic.

**Why listen for `matchMedia` changes?**

The operating-system preference can change while the application is open. In `system` mode, the effective theme should follow it.

### Advanced

**How would you handle theme in SSR?**

Keep browser-only APIs out of server execution, establish a consistent initial document theme through the framework's SSR/document mechanism, and avoid client/server markup mismatches.

**Is `localStorage` secure?**

No. It is client-controlled browser storage and should not contain credentials, secrets, or authorization state.

**Why might `useMemo` be used around a theme context value?**

To preserve the provider value's object identity when its meaningful dependencies have not changed. It is a performance optimization, not a requirement.

**How would you test a theme provider?**

Test preference changes, persistence, invalid-storage fallback, system-mode resolution, listener cleanup, document synchronization, and accessible controls. Mock browser APIs where necessary.

**How would you prevent theme logic from becoming a security boundary?**

Treat it strictly as presentation/UI preference. Authentication and authorization decisions must be independently enforced by trusted backend systems.

## 21. Production Checklist

- [ ] Theme preference is modeled as `light | dark | system` where required.
- [ ] Effective theme is derived rather than duplicated unnecessarily in state.
- [ ] Provider scope is no wider than necessary.
- [ ] `useTheme` provides a clear consumer API.
- [ ] Stored values are validated.
- [ ] Storage access handles the target browser/runtime constraints.
- [ ] `matchMedia` is used for system mode.
- [ ] System preference listeners are cleaned up.
- [ ] DOM synchronization is treated as an external-system effect.
- [ ] CSS variables use semantic names.
- [ ] First-paint behavior is considered.
- [ ] SSR/hydration behavior is considered where applicable.
- [ ] Theme controls are keyboard and screen-reader accessible.
- [ ] Contrast and focus states work in every theme.
- [ ] Reduced-motion preferences are respected.
- [ ] `localStorage` is not used for secrets.
- [ ] `useMemo` is not added mechanically.
- [ ] Tests cover persistence and browser API boundaries.

## 22. Final Project — Production Theme System

Build a theme system for a course dashboard:

```text
ThemeProvider
   ├── Header
   │    └── ThemeControls
   ├── Sidebar
   ├── CourseList
   └── CoursePreview
```

Requirements:

- `light`, `dark`, and `system`
- `ThemeContext`
- guarded `useTheme` Hook
- CSS semantic variables
- root `data-theme`
- persistence with validation
- system preference detection
- system preference change listener
- cleanup
- first-paint initializer
- accessible controls
- reduced-motion support
- unit/component tests
- SSR/hydration strategy if the project uses SSR

### Acceptance Criteria

- Theme changes immediately after user selection.
- Refresh preserves the selected preference.
- Invalid stored values fall back safely.
- `system` follows the OS/browser preference.
- Changing the OS preference updates the app while `system` is selected.
- Explicit `light`/`dark` choices do not follow OS changes.
- No unnecessary duplicate effective-theme state exists.
- No credentials or secrets are persisted as part of theme management.
- Controls are keyboard accessible and correctly labeled.
- Focus and contrast remain usable in every theme.
- Listener cleanup is implemented.
- First-paint behavior is intentionally designed.
- Tests cover the main state transitions and browser API boundaries.

## 23. Self Check

- [ ] I can explain why theme is a good Context use case.
- [ ] I can distinguish preference from effective theme.
- [ ] I can implement `light`, `dark`, and `system` modes.
- [ ] I know why CSS variables are preferable to storing colors in state.
- [ ] I can persist and validate a theme preference.
- [ ] I can use `matchMedia` correctly.
- [ ] I understand effect cleanup.
- [ ] I know why first-paint initialization may happen before React.
- [ ] I understand SSR/hydration implications.
- [ ] I can build accessible theme controls.
- [ ] I know that `localStorage` is not secure credential storage.
- [ ] I can test browser-dependent theme logic.

## Day 39 Outcome

You can now build a **persistent, accessible, system-aware theme architecture** with a clear separation between user preference, effective theme, DOM synchronization, and CSS presentation.

**Next:** Day 40 — Authentication Context: UI auth state, protected UI, persistence boundaries, and the difference between authentication state and real authorization.

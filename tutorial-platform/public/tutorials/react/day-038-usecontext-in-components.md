---
title: useContext in Components
slug: day-038-usecontext-in-components
dayLabel: Day 38
level: Intermediate
estimatedMinutes: 60
order: 38
track: react
---
# Day 38 [Intermediate]: `useContext` in Components

## Goal

Learn how to consume context values and actions safely, build domain-specific consumer hooks, understand nearest-provider lookup, and reason about re-render behavior.

## 1. Basic Consumption

```jsx
const theme = useContext(ThemeContext);
```

`useContext` reads the value supplied by the **nearest matching provider above the component**.

```text
ThemeProvider A
   ↓
Layout
   ↓
ThemeProvider B
   ↓
Button ← reads B
```

A consumer does not search the entire application. It follows the component tree and uses the closest provider for that context.

## 2. Context Is Read During Render

```jsx
function Header() {
  const { user } = useAuth();
  return <h1>Hello {user.name}</h1>;
}
```

The component reads context as part of rendering. If the relevant context value changes, React updates consumers so the UI can reflect the new value.

Do not use an effect just to copy context into local state:

```jsx
// Usually unnecessary
const user = useAuth();
const [localUser, setLocalUser] = useState(user);
```

If the value is simply context data, read it directly.

## 3. Consume State and Actions

A context often exposes both:

```jsx
const { user, logout } = useAuth();
```

Then a button can express domain intent:

```jsx
<button type="button" onClick={logout}>
  Logout
</button>
```

The component does not need to know how logout changes the provider's internal state.

## 4. Build a Custom Consumer Hook

Instead of repeating:

```jsx
const value = useContext(AuthContext);
```

create:

```jsx
export function useAuth() {
  const value = useContext(AuthContext);

  if (value === null) {
    throw new Error("useAuth must be used within AuthProvider");
  }

  return value;
}
```

Now consumers have a domain-level API:

```jsx
const { user, logout } = useAuth();
```

Benefits:

- consistent imports
- centralized provider guard
- better refactoring
- easier testing
- smaller component code

## 5. Missing Provider Behavior

If no provider exists, React returns the context's default value.

For:

```jsx
const AuthContext = createContext(null);
```

that means:

```jsx
useContext(AuthContext) // null
```

A guarded hook turns a confusing runtime failure into a clear configuration error.

## 6. Multiple Consumers

Many components can read the same context:

```jsx
function Header() {
  const { language } = useSettings();
  return <span>{language}</span>;
}

function Footer() {
  const { language } = useSettings();
  return <small>{language}</small>;
}
```

This is one of Context's major strengths: the intermediate component does not have to become a data pipe.

## 7. Context Is Not a Selector API

This is an important advanced point.

Suppose a provider value is:

```jsx
{
  user,
  theme,
  cart
}
```

A component may read only `theme`:

```jsx
const { theme } = useAppContext();
```

But simply destructuring `theme` does not automatically make Context selective. If the provider value changes, consumers of that context can still be updated.

For highly dynamic state, consider:

- splitting contexts
- moving unrelated state to separate providers
- a state library with selector-based subscriptions

## 8. Nested Providers

Nested providers are useful when a subtree needs a different value:

```jsx
<ThemeContext.Provider value="light">
  <MainApp />

  <ThemeContext.Provider value="dark">
    <Preview />
  </ThemeContext.Provider>
</ThemeContext.Provider>
```

`Preview` sees `dark`; other descendants of the outer provider see `light` unless they have another nearer provider.

This is useful for scoped configuration, previews, embedded widgets, and tests.

## 9. Context and Event Handlers

Context actions are commonly called from events:

```jsx
function LogoutButton() {
  const { logout } = useAuth();

  return (
    <button type="button" onClick={logout}>
      Logout
    </button>
  );
}
```

Avoid calling an action while rendering:

```jsx
// Wrong: causes updates during render
logout();
```

Call actions in an event handler or an intentionally designed effect when synchronization with an external system is required.

## 10. Complete Example

```jsx
// AuthContext.jsx
import { createContext, useContext } from "react";

export const AuthContext = createContext(null);

export function useAuth() {
  const value = useContext(AuthContext);

  if (value === null) {
    throw new Error("useAuth must be used within AuthProvider");
  }

  return value;
}
```

Consumer:

```jsx
function Navbar() {
  const { user, logout } = useAuth();

  return (
    <nav>
      <span>{user ? user.name : "Guest"}</span>
      {user && (
        <button type="button" onClick={logout}>
          Logout
        </button>
      )}
    </nav>
  );
}
```

## 11. Testing Context Consumers

A consumer should normally be tested with the provider it expects:

```jsx
render(
  <AuthProvider>
    <Navbar />
  </AuthProvider>
);
```

For isolated tests, a small test provider can supply deterministic values:

```jsx
const testValue = {
  user: { name: "Test User" },
  logout: vi.fn(),
};
```

The key principle is to test the **consumer behavior**, not React's internal Context implementation.

## 12. Common Mistakes

### Wrong context object

Two independently created contexts do not share values.

### Consumer outside provider

Use the custom hook guard to identify this immediately.

### Copying context into state

Usually creates two sources of truth.

### Giant context

One context containing every application concern becomes difficult to reason about and can widen update impact.

### Treating Context as authentication security

Context can control UI state. It cannot enforce server authorization.

## Hands-on Lab

Create `UserContext` with:

```text
user
login(name)
logout()
```

Use `useUser()` in:

- Header
- ProfileCard
- CoursePage

Then add a `LogoutButton` that uses the action from context.

### Acceptance Criteria

- [ ] Consumers use a custom hook
- [ ] Missing provider produces a useful error
- [ ] At least three distant components consume the context
- [ ] One consumer invokes a context action
- [ ] No context value is copied unnecessarily into local state
- [ ] Tests render consumers with the required provider

## Debugging Scenarios

**The hook returns null:** verify provider placement and context import.

**A component still receives an old value:** inspect nested providers and confirm which provider is nearest.

**Many unrelated components update:** inspect context value design and split domains if necessary.

**A consumer works in production but fails in a unit test:** the test probably forgot to render the required provider.

## Assessment

1. What does `useContext` read?
2. Which provider wins when providers are nested?
3. Is destructuring a context value a selector mechanism?
4. Why use a custom consumer hook?
5. Why is copying context into state usually unnecessary?
6. How do you test a context consumer?
7. Can Context enforce backend authorization?
8. When should a large context be split?

## Interview Questions

**What does `useContext` return?**  
The value from the nearest matching provider, or the context default when no provider exists.

**Can a component consume multiple contexts?**  
Yes. It can call `useContext` or domain hooks for multiple contexts.

**Why create `useAuth` instead of exporting the context everywhere?**  
It gives consumers a stable domain API and centralizes missing-provider validation.

**Does destructuring one property prevent context re-renders?**  
No. Destructuring does not provide fine-grained context subscriptions.

**How do you optimize context consumers?**  
Split contexts by update domain, stabilize provider values where useful, narrow provider scope, or use a state solution with selective subscriptions for high-frequency state.

## Day 38 Outcome

You can now consume Context safely, build guarded consumer hooks, reason about nested providers, avoid duplicated state, and recognize the limits of Context's subscription model. Day 39 applies these patterns to a production-style theme system.
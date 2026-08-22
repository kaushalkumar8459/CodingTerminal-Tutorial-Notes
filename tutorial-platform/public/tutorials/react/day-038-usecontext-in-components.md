---
title: useContext in Components
slug: day-038-usecontext-in-components
dayLabel: Day 38
level: Intermediate
estimatedMinutes: 120
order: 38
track: react
---
# Day 38 [Intermediate]: `useContext` in Components

## Goal

Learn how to consume Context safely, build domain-specific consumer hooks, understand provider lookup, reason about consumer updates, and distinguish Context from a general-purpose state-management or authorization system.

## Prerequisites

- Day 36: Context API introduction
- Day 37: Context provider patterns
- `useState`, `useReducer`, `useEffect`
- custom Hooks
- React rendering and reference equality

## Learning Outcomes

By the end of this lesson, you can:

- consume Context with `useContext`
- explain nearest-provider lookup
- distinguish a Context default from a Provider value
- build a guarded custom consumer Hook
- consume both context state and actions
- explain why destructuring is not a selector mechanism
- diagnose unnecessary context update propagation
- split contexts by update domain
- test consumers with realistic providers or deterministic test providers
- avoid copying context into duplicate local state
- distinguish UI context from backend authorization

## 1. Basic Consumption

```jsx
const theme = useContext(ThemeContext);
```

`useContext(ThemeContext)` reads the value from the **closest matching provider above the component**.

Conceptually:

```text
ThemeProvider A
      ↓
    Layout
      ↓
ThemeProvider B
      ↓
   Button
      ↓
 reads B
```

The consumer does not search the whole application. Provider placement in the rendered tree determines which value is visible.

## 2. Context Is Read During Render

```jsx
function Header() {
  const { user } = useAuth();
  return <h1>Hello {user.name}</h1>;
}
```

Context is read as part of rendering. When the relevant context value changes, consumers can update so the UI reflects the new value.

Do not create duplicate state merely to mirror context:

```jsx
// Usually unnecessary
const user = useAuth();
const [localUser, setLocalUser] = useState(user);
```

This creates two sources of truth and can become stale.

Prefer reading the context directly unless the local state represents a genuinely different editing/draft value.

## 3. Consume State and Actions

A context often exposes both data and domain actions:

```jsx
const { user, logout } = useAuth();
```

Then the component can express intent:

```jsx
<button type="button" onClick={logout}>
  Logout
</button>
```

The consumer does not need to know how the provider stores or updates authentication state.

A useful context contract is explicit:

```text
AuthContext
├── user
├── login(credentials)
└── logout()
```

Keep provider implementation details behind that contract.

## 4. Build a Custom Consumer Hook

Instead of repeating:

```jsx
const value = useContext(AuthContext);
```

create a domain-specific Hook:

```jsx
import { useContext } from "react";

export function useAuth() {
  const value = useContext(AuthContext);

  if (value === null) {
    throw new Error("useAuth must be used within AuthProvider");
  }

  return value;
}
```

Consumers now use:

```jsx
const { user, logout } = useAuth();
```

Benefits:

- consistent imports
- centralized provider validation
- clearer component APIs
- easier refactoring
- easier test setup

A guarded Hook is especially useful when the context's default is deliberately `null` so that missing-provider usage is treated as a configuration error.

## 5. Default Value vs Provider Value

Consider:

```jsx
const AuthContext = createContext(null);
```

Without a matching provider above the consumer:

```jsx
useContext(AuthContext); // null
```

The default value is **not** a global mutable store. It is the fallback used when no matching provider is found.

If a provider supplies:

```jsx
<AuthContext.Provider value={authValue}>
  <App />
</AuthContext.Provider>
```

the consumer receives `authValue`, not the default.

For modern React versions that support it, the provider can also be written as:

```jsx
<AuthContext value={authValue}>
  <App />
</AuthContext>
```

Use the syntax supported by the React version and project conventions.

## 6. Multiple Consumers

Many components can consume the same context:

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

This prevents intermediate components from becoming data pipes.

Context is especially useful for values needed across a subtree, such as:

- theme
- locale
- authenticated-user information
- feature configuration
- domain-level UI state

## 7. Context Is Not a Selector API

Suppose a provider supplies:

```jsx
{
  user,
  theme,
  cart
}
```

A component may read only:

```jsx
const { theme } = useAppContext();
```

But destructuring does **not** create a fine-grained subscription to `theme`.

If the provider's context value changes, consumers of that Context can be updated even when a consumer uses only one property.

For frequently changing, unrelated domains, consider:

- splitting contexts
- separating providers by update frequency/domain
- narrowing provider scope
- a state solution that provides selector-based subscriptions

Do not introduce a selector library simply because Context exists; choose based on update frequency, complexity, and measured behavior.

## 8. Provider Value Identity

Provider values are often objects:

```jsx
<AuthContext.Provider value={{ user, login, logout }}>
  {children}
</AuthContext.Provider>
```

That object is recreated whenever the provider renders.

If appropriate, provider state/actions can be structured so that the value identity remains stable when its meaningful inputs have not changed:

```jsx
const value = useMemo(
  () => ({ user, login, logout }),
  [user, login, logout]
);
```

However, do **not** add `useMemo` mechanically. Measure and consider the actual consumer/update boundary. Memoizing the provider value also does not make unrelated context properties selective.

If `login` and `logout` themselves are recreated on every provider render, their identities can still invalidate the memoized object. Design the provider deliberately.

## 9. Nested Providers

Nested providers are useful when a subtree needs a different value:

```jsx
<ThemeContext.Provider value="light">
  <MainApp />

  <ThemeContext.Provider value="dark">
    <Preview />
  </ThemeContext.Provider>
</ThemeContext.Provider>
```

`Preview` receives `dark`; descendants outside the inner provider receive `light` unless another nearer provider exists.

Useful cases include:

- scoped configuration
- previews
- embedded widgets
- tests
- isolated sections of an application

When debugging a surprising value, inspect the rendered tree and find the nearest provider.

## 10. Context and Event Handlers

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

Do not call actions during render:

```jsx
// Wrong: can cause an update during render
logout();
```

Call actions from event handlers or from an intentionally designed synchronization effect when an external-system synchronization is actually required.

## 11. Complete Example

### AuthContext.jsx

```jsx
import { createContext, useContext, useMemo, useState } from "react";

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);

  function login(name) {
    setUser({ name });
  }

  function logout() {
    setUser(null);
  }

  const value = useMemo(
    () => ({ user, login, logout }),
    [user]
  );

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const value = useContext(AuthContext);

  if (value === null) {
    throw new Error("useAuth must be used within AuthProvider");
  }

  return value;
}
```

### Consumer

```jsx
function Navbar() {
  const { user, logout } = useAuth();

  return (
    <nav aria-label="Primary">
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

### Important note about the example

The `useMemo` above is not required for correctness. It is included to demonstrate provider-value identity. In a real application, keep it only when the provider's rendering behavior and consumer tree make that optimization worthwhile.

For a large provider, also consider splitting data and actions into separate contexts if their update patterns differ significantly.

## 12. Testing Context Consumers

A consumer should normally be rendered with the provider it expects:

```jsx
render(
  <AuthProvider>
    <Navbar />
  </AuthProvider>
);
```

For focused unit/component tests, a deterministic test provider can be useful:

```jsx
const testValue = {
  user: { name: "Test User" },
  logout: vi.fn(),
};
```

The important goal is to test **consumer behavior and contracts**, not React's internal Context implementation.

Example assertion:

```jsx
expect(screen.getByText("Test User")).toBeInTheDocument();
await user.click(screen.getByRole("button", { name: "Logout" }));
expect(testValue.logout).toHaveBeenCalledTimes(1);
```

## 13. Common Mistakes

### Wrong context object

Two independently created contexts do not share values:

```jsx
const A = createContext(null);
const B = createContext(null);
```

A provider for `A` cannot satisfy a consumer of `B`.

### Consumer outside provider

Use a custom-hook guard to identify this immediately.

### Copying context into state

Usually creates two sources of truth.

### Giant context

One context containing every application concern can widen update impact and make dependencies difficult to reason about.

### Assuming destructuring is selective

It is not a selector mechanism.

### Treating Context as authentication security

Context can control UI state. It cannot enforce server authorization. Backend/API authorization must be enforced on the server.

### Calling context actions during render

This can cause render-time updates and incorrect behavior.

## 14. Hands-on Labs

### Lab 1 — User Context

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

### Lab 2 — Nested Provider

Create an outer theme provider and a dark-theme provider around a preview section. Verify which value each consumer receives.

### Lab 3 — Provider Identity

Add an unrelated provider state update. Profile consumers before and after stabilizing the provider value. Explain whether the optimization was meaningful.

### Lab 4 — Split Contexts

Start with:

```text
AppContext = theme + user + notifications
```

Split it into domain contexts and explain which consumers should update for each change.

### Lab 5 — Test Provider

Create a deterministic test provider and verify a consumer action is called without testing the provider implementation.

## Acceptance Criteria

- [ ] Consumers use a domain-specific custom Hook.
- [ ] Missing provider produces a useful error where the context contract requires a provider.
- [ ] At least three components consume the context.
- [ ] One consumer invokes a context action.
- [ ] No context value is copied unnecessarily into local state.
- [ ] Nested provider behavior is demonstrated.
- [ ] Provider value identity is discussed.
- [ ] Tests render consumers with the required provider/test provider.
- [ ] Authorization is not incorrectly delegated to Context.

## 15. Debugging Scenarios

### Scenario A — The Hook returns `null`

Verify:

1. the provider exists
2. the provider wraps the consumer in the rendered tree
3. the consumer and provider import the **same context object**

### Scenario B — A component receives a surprising value

Inspect nested providers and identify the closest matching provider.

### Scenario C — Many unrelated components update

Inspect the context value design. Check whether unrelated state shares one context and whether provider scope is wider than necessary.

### Scenario D — A consumer works in the application but fails in a unit test

The test likely omitted the required provider or supplied an incompatible test value.

### Scenario E — Memoized provider value still changes

Inspect the identities of the dependencies (`user`, `login`, `logout`). A memoized object cannot remain stable if one of its dependencies changes identity.

## 16. Assessment

1. What does `useContext` read?
2. Which provider wins when providers are nested?
3. What is the role of the default context value?
4. Is destructuring a context value a selector mechanism?
5. Why use a custom consumer Hook?
6. Why is copying context into state usually unnecessary?
7. What can cause a provider value object to change identity?
8. How do you test a context consumer?
9. Can Context enforce backend authorization?
10. When should a large context be split?
11. Why can a memoized provider value still be invalidated?
12. When might a selector-based state solution be preferable?

### Answers

1. The value associated with the nearest matching provider, or the context's default when no provider is found.
2. The closest matching provider above the consumer.
3. It is the fallback value used when no matching provider is present; it is not a global mutable store.
4. No. Destructuring does not create fine-grained subscriptions.
5. It provides a domain-level API and can centralize missing-provider validation.
6. It duplicates the source of truth and can become stale.
7. A new object/function/array reference in the provider's value can produce a new value identity.
8. Render the consumer with its provider or a deterministic test provider and assert consumer behavior.
9. No. Server authorization must be enforced by the backend/API.
10. When it combines unrelated or high-frequency update domains and consumer update impact becomes difficult to control.
11. If one of its dependencies changes identity, `useMemo` recalculates the value.
12. When high-frequency, unrelated updates require fine-grained subscriptions and Context splitting is insufficient or overly complex.

## 17. Interview Questions

### Beginner

**What does `useContext` do?**

It reads a Context value from the nearest matching provider above the component.

**Can a component consume multiple contexts?**

Yes. It can call `useContext` or multiple domain hooks.

### Intermediate

**Why create `useAuth` instead of exporting the context everywhere?**

It gives consumers a stable domain-level API and centralizes provider validation.

**What happens when providers are nested?**

The nearest matching provider supplies the value to the consumer.

**Does destructuring one property prevent context updates?**

No. Context consumption is not automatically property-selective.

### Advanced

**How do you reduce unnecessary Context updates?**

Split contexts by update domain, narrow provider scope, design provider values carefully, and use selector-based state management when the update frequency and complexity justify it.

**Is `useMemo` on a provider value always necessary?**

No. It is a performance optimization. Use it when profiling or architecture provides a concrete reason.

**Can Context replace a server-state library?**

Context can distribute application values, but caching, deduplication, retries, invalidation, and synchronization with remote server state often need a dedicated server-state solution.

**Can Context secure an authenticated application?**

No. Context can expose UI/authentication state to components, but the server must independently validate credentials, sessions, permissions, and authorization.

## 18. Production Checklist

- [ ] Context represents a value that genuinely needs subtree-wide access.
- [ ] Provider scope is no wider than necessary.
- [ ] Consumer APIs are domain-specific where useful.
- [ ] Missing-provider behavior is explicit.
- [ ] Default values are not mistaken for global state.
- [ ] Contexts are split when update domains are unrelated or high-frequency.
- [ ] Provider value identity is considered, but not optimized mechanically.
- [ ] Consumers do not duplicate context into local state without a separate purpose.
- [ ] Context actions are invoked from events/effects, not during render.
- [ ] Tests cover consumer behavior with realistic providers/test providers.
- [ ] Backend authorization remains server-enforced.
- [ ] Server-state concerns are not forced into Context unnecessarily.

## 19. Final Project

Build a small authenticated course dashboard using Context:

```text
AuthProvider
   ├── Navbar
   ├── ProfileCard
   ├── CourseList
   └── LogoutButton
```

Requirements:

- `user` state
- `login(name)` and `logout()` actions
- `useAuth()` guarded consumer Hook
- nested theme provider for a course preview
- no duplicated context state
- accessible buttons and navigation
- tests for consumer rendering and logout behavior
- explanation of why Context does not provide backend authorization

## Final Acceptance Criteria

- [ ] Basic `useContext` consumption is correct.
- [ ] Nearest-provider behavior is explained.
- [ ] Default value behavior is correct.
- [ ] Custom consumer Hook is implemented.
- [ ] Context state/actions are consumed correctly.
- [ ] Provider value identity is understood.
- [ ] Destructuring vs selective subscriptions is clear.
- [ ] Nested providers are covered.
- [ ] Missing-provider debugging is covered.
- [ ] Testing strategy is included.
- [ ] Performance guidance avoids automatic memoization.
- [ ] Security boundary is clear.
- [ ] Server-state boundary is clear.
- [ ] Labs and final project are actionable.

## Self Check

- [ ] I can explain what `useContext` reads.
- [ ] I know how the nearest provider is selected.
- [ ] I understand default values.
- [ ] I can build a guarded custom consumer Hook.
- [ ] I know why copying context into state can be problematic.
- [ ] I understand why destructuring is not a selector.
- [ ] I can diagnose unnecessary context update propagation.
- [ ] I know when to split contexts.
- [ ] I can test consumers correctly.
- [ ] I understand that Context is not backend security.

## Day 38 Outcome

You can now consume Context safely, build guarded consumer Hooks, reason about nested providers and provider value identity, test consumers, and recognize when Context should be split or replaced by a more selective state-management approach.

**Next:** Day 39 — Production-style theme system with Context, persistence, accessibility, and scoped theming.

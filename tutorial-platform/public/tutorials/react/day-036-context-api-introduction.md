---
title: Context API Introduction
slug: day-036-context-api-introduction
dayLabel: Day 36
level: Intermediate
estimatedMinutes: 150
order: 36
track: react
---
# Day 36 [Intermediate]: Context API Introduction

## Goal

Understand **why Context exists, what problem it solves, how provider scope works, how updates affect consumers, and when Context is better—or worse—than props, composition, local state, or a dedicated state-management solution**.

## Prerequisites

- Days 4–35
- Props and callback props
- Component composition
- `useState`
- Custom hooks
- `useMemo` basics

## Learning Outcomes

By the end of Day 36, you should be able to:

- identify prop-drilling problems
- create and provide a context value
- consume context with `useContext`
- explain default values correctly
- reason about provider scope and nested providers
- distinguish Context from state management and server state
- explain context-driven updates and reference identity
- choose between props, composition, local state, and Context
- design a small domain-specific context safely
- identify common Context performance and architecture mistakes

## 1. Prop Drilling

Prop drilling happens when a value must travel through components that do not actually need it.

```text
App
 ↓ user
Layout
 ↓ user
Sidebar
 ↓ user
ProfileMenu
```

```jsx
function App() {
  const user = { name: "Asha" };
  return <Layout user={user} />;
}

function Layout({ user }) {
  return <Sidebar user={user} />;
}

function Sidebar({ user }) {
  return <ProfileMenu user={user} />;
}
```

The problem is not that passing props is bad. **Props are React's primary explicit data-flow mechanism.** The problem is a long chain of pass-through props.

## 2. What Context Solves

Context lets a component read a value from the nearest matching provider without receiving that value as a prop from every intermediate component.

```jsx
import { createContext, useContext } from "react";

const UserContext = createContext(null);

function App() {
  const user = { name: "Asha" };

  return (
    <UserContext.Provider value={user}>
      <Layout />
    </UserContext.Provider>
  );
}

function ProfileMenu() {
  const user = useContext(UserContext);
  return <span>{user?.name}</span>;
}
```

Context removes the need for intermediate components to forward a value they do not use.

## 3. Core Context APIs

### `createContext`

Creates the context object.

```jsx
const ThemeContext = createContext(null);
```

### Provider

Supplies a value to descendants.

```jsx
<ThemeContext.Provider value={theme}>
  <App />
</ThemeContext.Provider>
```

React 19 also supports the context object directly as the provider:

```jsx
<ThemeContext value={theme}>
  <App />
</ThemeContext>
```

For a course covering React 18 and React 19, know both forms. The `.Provider` form remains valid and is common in existing codebases.

### `useContext`

Reads the nearest matching context value.

```jsx
const theme = useContext(ThemeContext);
```

## 4. Default Value vs Provider

This distinction is critical.

```jsx
const AuthContext = createContext(null);
```

`null` is the fallback returned when no matching provider exists. It does **not** create global state and does not store mutable application state.

A static fallback is also possible:

```jsx
const LocaleContext = createContext("en");
```

For required application contexts, a `null` default plus a guarded custom hook often makes configuration mistakes fail loudly.

## 5. Provider Scope and Nearest Provider

Context follows the rendered tree. A consumer reads from the **nearest matching provider above it**.

```jsx
<ThemeContext.Provider value="light">
  <Page />
  <ThemeContext.Provider value="dark">
    <Modal />
  </ThemeContext.Provider>
</ThemeContext.Provider>
```

`Page` reads `light`; `Modal` reads `dark`.

This is useful for intentional overrides, but accidental nested providers can produce confusing behavior.

## 6. When Context Is a Good Fit

Common examples:

- theme
- locale/language
- authenticated user/session information
- feature configuration
- permissions used across a subtree
- design-system configuration

Context is especially useful when many distant components need the same value and explicit prop passing becomes noisy.

## 7. When Context Is Not the Best Choice

Do not put everything into Context.

Prefer local state when only one feature needs the state:

```jsx
const [isOpen, setIsOpen] = useState(false);
```

Prefer props when only a small number of components need explicit communication.

Prefer composition when a component can receive a ready-made child instead of requiring broad shared state:

```jsx
<Layout header={<UserHeader user={user} />} />
```

For large, frequently changing client state, a dedicated state-management solution may provide better separation and selective subscriptions.

For remote data, prefer a server-state approach rather than treating Context as a cache.

## 8. Context Is Not a Complete State-Management Solution

Context is primarily a **delivery mechanism**. It does not automatically provide reducers, persistence, caching, middleware, server synchronization, invalidation, or selective subscriptions.

```text
Context
  ↓
How a value reaches descendants

State management
  ↓
How complex client state is modeled and updated

Server-state library
  ↓
How remote data is cached, synchronized and invalidated
```

Context can carry state managed by `useState` or `useReducer`, but those are separate concerns.

## 9. Context Updates and Re-renders

When the provider's context value changes, consumers that read that context are eligible for an update.

This makes provider value identity important:

```jsx
<AuthContext.Provider value={{ user, login }}>
```

The object is newly created on every provider render. In a performance-sensitive tree, a stable value can help:

```jsx
const value = useMemo(
  () => ({ user, login }),
  [user, login]
);
```

Do **not** blindly memoize every provider. First understand the render behavior and measure meaningful performance problems.

Also remember: memoizing the provider value does not automatically stop consumers from updating when a context value they use actually changes.

## 10. Props vs Context vs Composition

| Situation | Good first choice |
|---|---|
| Parent → direct child | Props |
| Sibling coordination | Lift state + callbacks |
| Small subtree shared value | Context or composition |
| Theme/auth used widely | Context |
| Complex global client state | Context + reducer or state library |
| Remote server data | Server-state library |

The simplest mechanism that clearly expresses ownership should usually win.

## 11. End-to-End Settings Example

```jsx
import { createContext, useContext, useState } from "react";

const SettingsContext = createContext(null);

function useSettings() {
  const context = useContext(SettingsContext);

  if (!context) {
    throw new Error("useSettings must be used inside SettingsProvider");
  }

  return context;
}

function SettingsProvider({ children }) {
  const [language, setLanguage] = useState("en");
  const [timezone, setTimezone] = useState("Asia/Kolkata");

  const value = {
    language,
    setLanguage,
    timezone,
    setTimezone,
  };

  return (
    <SettingsContext.Provider value={value}>
      {children}
    </SettingsContext.Provider>
  );
}

function Header() {
  const { language, setLanguage } = useSettings();

  return (
    <header>
      <span>Language: {language}</span>
      <button type="button" onClick={() => setLanguage("hi")}>
        Hindi
      </button>
    </header>
  );
}

function Footer() {
  const { timezone } = useSettings();
  return <footer>Timezone: {timezone}</footer>;
}

function App() {
  return (
    <SettingsProvider>
      <Header />
      <Footer />
    </SettingsProvider>
  );
}
```

The important design points are:

1. the context is created once
2. the provider owns the state
3. consumers do not need pass-through props
4. the custom hook provides a useful error when the provider is missing
5. the context has a clear domain-specific shape

For a very small provider, the object can remain simple. Later lessons will cover provider architecture and performance in more depth.

## 12. Debugging Checklist

If a consumer receives `null` or an unexpected value:

1. Is the provider rendered above the consumer?
2. Is the consumer using the exact same context object?
3. Is another nearer provider overriding the value?
4. Does the provider value have the expected shape?
5. Is the custom hook importing the correct context?
6. Did a test render the component without its required provider?

A common mistake is creating two contexts with the same conceptual name in different modules. They are different context objects and do not share values.

## 13. Debugging Lab

### Bug

```jsx
const UserContext = createContext(null);

function UserProvider({ children }) {
  const value = { name: "Asha" };
  return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
}

const AnotherUserContext = createContext(null);

function Profile() {
  const user = useContext(AnotherUserContext);
  return <p>{user?.name}</p>;
}
```

### Question

Why does `Profile` not receive the user?

### Answer

`UserContext` and `AnotherUserContext` are different context objects. The provider supplies one; the consumer reads the other.

## 14. Hands-on Coding

Build a `SettingsContext` with:

```text
appTitle
language
timezone
```

Use it in three distant components without passing these values through intermediate components.

Then add an action that changes the language.

### Acceptance Criteria

- [ ] Context is created once
- [ ] Provider owns the state
- [ ] Three distant consumers read the context
- [ ] Language changes propagate
- [ ] No unnecessary pass-through props remain
- [ ] Local-only state remains local
- [ ] Missing-provider usage produces a useful error
- [ ] Context value has a documented shape

## 15. Assessment

1. What problem does Context solve?
2. Why are props still preferred for direct parent-child communication?
3. Is the default value from `createContext` the same as provider state?
4. What happens when a nearer provider exists?
5. Why can a broad context become a performance concern?
6. When is composition preferable to Context?
7. Is Context a server-state library?
8. Why should context values have a clear domain-specific shape?
9. What makes two context objects different even if they have the same conceptual purpose?
10. Why should provider scope be kept as narrow as practical?

## 16. Interview Questions

**What is prop drilling?**  
Passing data through components that do not need the data just to reach a deeper component.

**Does Context replace props?**  
No. Props remain the clearest choice for explicit local data flow.

**Does Context prevent re-renders?**  
No. Context is not a rendering optimization. Consumers that read a changed context value can update.

**How do you optimize a large context?**  
Split contexts by concern, keep provider scope appropriate, stabilize values when useful, and consider a state solution that supports selective subscriptions when necessary.

**Can a component consume a context without a provider?**  
Yes. It receives the context's default value. If the context is required, a custom hook can throw a descriptive error instead.

**Why split contexts?**  
Independent concerns can change at different frequencies. Splitting them can reduce unnecessary coupling and make ownership clearer.

## 17. Modern React Notes

### React 19 provider syntax

React 19 allows the context object itself to be rendered as a provider:

```jsx
<ThemeContext value={theme}>
  <App />
</ThemeContext>
```

The traditional form remains important for existing React 18/19 codebases:

```jsx
<ThemeContext.Provider value={theme}>
  <App />
</ThemeContext.Provider>
```

### Context is still tree-scoped

Neither provider syntax changes the fundamental model: a consumer reads the nearest matching provider in the rendered tree.

### Performance rule

Do not introduce `useMemo` simply because a provider contains an object. First establish whether provider re-renders and consumer updates are actually a problem. If optimization is needed, split contexts by concern, narrow provider scope, stabilize values where useful, and profile the result.

## 18. Production Checklist

Before introducing Context into a production feature, verify:

- [ ] There is a real prop-drilling or shared-subtree problem.
- [ ] Props or composition were considered first.
- [ ] The context has one clear domain responsibility.
- [ ] Provider scope is no broader than necessary.
- [ ] Default-value behavior is intentional.
- [ ] The context value shape is documented.
- [ ] Nested providers are intentional.
- [ ] Consumers have a clear missing-provider behavior.
- [ ] Frequently changing unrelated values are not bundled together unnecessarily.
- [ ] Provider value memoization is based on an actual need, not a blanket rule.
- [ ] Server state is not being used as an ad-hoc Context cache.
- [ ] Tests cover provider behavior and consumer behavior.
- [ ] The team understands whether the codebase targets React 18, React 19, or a mixed/legacy environment.

## Self Check

- [ ] I can explain prop drilling.
- [ ] I can create a context and provider.
- [ ] I understand `useContext` and nearest-provider lookup.
- [ ] I know why the default context value is not global state.
- [ ] I can choose between props, composition, and Context.
- [ ] I understand Context's update and identity implications.
- [ ] I can explain why Context is not a complete state-management or server-state solution.
- [ ] I can design a small, domain-specific provider.
- [ ] I can explain both React 18-style and React 19 provider syntax.

## Day 36 Outcome

You can now explain **prop drilling, Context, provider scope, default values, context updates, composition alternatives, and Context's architectural boundaries**.

Day 37 will turn this mental model into a reusable **`createContext` + Provider architecture**, including provider contracts, custom hooks, value design, testing, and scalable composition.

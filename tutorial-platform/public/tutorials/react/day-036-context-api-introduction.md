---
title: Context API Introduction
slug: day-036-context-api-introduction
dayLabel: Day 36
level: Intermediate
estimatedMinutes: 60
order: 36
track: react
---
# Day 36 [Intermediate]: Context API Introduction

## Goal

Understand **why Context exists, what problem it solves, what it does not solve, and when it is better to use composition or local state instead**.

## Prerequisites

- Days 4–35
- Props and callback props
- Component composition
- `useState`
- Custom hooks
- `useMemo` basics

## 1. The Problem: Prop Drilling

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

The intermediate components become coupled to data they do not own or consume.

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

The problem is not that passing props is bad. **Props are the primary explicit data-flow mechanism in React.** The problem is a long chain of pass-through props.

## 2. What Context Solves

Context lets a component read a value from the nearest matching provider without receiving that value as a prop from every intermediate component.

```jsx
const UserContext = createContext(null);

function App() {
  const user = { name: "Asha" };

  return (
    <UserContext.Provider value={user}>
      <Layout />
    </UserContext.Provider>
  );
}
```

A deep component can read it directly:

```jsx
function ProfileMenu() {
  const user = useContext(UserContext);
  return <span>{user.name}</span>;
}
```

## 3. The Three Core Pieces

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

### `useContext`
Reads the value from the nearest provider.

```jsx
const theme = useContext(ThemeContext);
```

Modern React also supports the provider shorthand in React 19:

```jsx
<ThemeContext value={theme}>
  <App />
</ThemeContext>
```

For a course that targets React 18 and React 19, know both forms. The classic `.Provider` form remains widely used and is perfectly valid.

## 4. Default Value Is Not a Provider

This distinction is critical.

```jsx
const AuthContext = createContext(null);
```

`null` is returned when there is no matching provider. It does **not** create global state.

A useful default can also be supplied:

```jsx
const LocaleContext = createContext("en");
```

But if a context is required, `null` plus a guarded custom hook is often safer because configuration mistakes fail loudly.

## 5. When Context Is a Good Fit

Common examples:

- theme
- locale/language
- authenticated user/session information
- feature configuration
- permissions used across a subtree
- design-system configuration

Context is especially useful when many distant components need the same value.

## 6. When Context Is NOT the Best Choice

Do not put everything into Context.

Prefer local state when only one feature needs the state:

```jsx
const [isOpen, setIsOpen] = useState(false);
```

Prefer props when only one or two components need explicit communication.

Prefer composition when a component can receive a ready-made child instead of requiring broad shared state:

```jsx
<Layout header={<UserHeader user={user} />} />
```

For large, frequently changing shared state, a dedicated state-management solution may provide better organization or selective subscriptions.

## 7. Context Does Not Automatically Mean Global State Management

Context is a **delivery mechanism**. It does not automatically provide reducers, caching, persistence, middleware, server-state synchronization, or selective subscriptions.

A useful mental model is:

```text
Context
  ↓
How a value reaches descendants

State management
  ↓
How complex state is modeled and updated

Server-state library
  ↓
How remote data is cached, synchronized and invalidated
```

Context can carry state managed by `useState` or `useReducer`, but the concepts are separate.

## 8. Context Update and Re-render Behavior

When a provider's context value changes, consumers that read that context are updated.

This makes provider value identity important:

```jsx
<AuthContext.Provider value={{ user, login }}>
```

The object is newly created on every render. In performance-sensitive trees, a stable value can help:

```jsx
const value = useMemo(
  () => ({ user, login }),
  [user, login]
);
```

Do **not** blindly memoize every provider. Measure and use memoization when it has a reason.

## 9. Context vs Props vs Composition

| Situation | Good first choice |
|---|---|
| Parent → direct child | Props |
| Sibling coordination | Lift state + callbacks |
| Small subtree shared value | Context or composition |
| Theme/auth used widely | Context |
| Complex global client state | Context + reducer or state library |
| Remote server data | Server-state library |

## 10. Practical Example: Settings Context

```jsx
import { createContext, useContext, useState } from "react";

const SettingsContext = createContext(null);

function SettingsProvider({ children }) {
  const [language, setLanguage] = useState("en");

  return (
    <SettingsContext.Provider value={{ language, setLanguage }}>
      {children}
    </SettingsContext.Provider>
  );
}

function Header() {
  const { language, setLanguage } = useContext(SettingsContext);

  return (
    <header>
      <span>Language: {language}</span>
      <button type="button" onClick={() => setLanguage("hi")}>
        Hindi
      </button>
    </header>
  );
}

function App() {
  return (
    <SettingsProvider>
      <Header />
    </SettingsProvider>
  );
}
```

Notice that `Header` does not need `language` as a prop.

## 11. Debugging Checklist

If a consumer gets `null` or an unexpected value:

1. Is the provider rendered above the consumer?
2. Is the consumer using the exact same context object?
3. Is there another nearer provider overriding the value?
4. Is the provider value the expected shape?
5. Is the custom hook importing the correct context?

A particularly common mistake is creating two contexts with the same name in different files. They are different objects and therefore do not share values.

## Hands-on Exercise

Build `SettingsContext` with:

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

## Assessment

1. What problem does Context solve?
2. Why are props still preferred for direct parent-child communication?
3. Is the default value from `createContext` the same as provider state?
4. What happens when a nearer provider exists?
5. Why can a broad context become a performance concern?
6. When is composition preferable to Context?
7. Is Context a server-state library?
8. Why should context values have a clear domain-specific shape?

## Interview Questions

**What is prop drilling?**  
Passing data through components that do not need the data just to reach a deeper component.

**Does Context replace props?**  
No. Props remain the clearest choice for explicit local data flow.

**Does Context prevent re-renders?**  
No. Context consumers update when the consumed context value changes.

**How do you optimize a large context?**  
Split contexts by concern, keep provider scope appropriate, stabilize values when useful, and consider a state library when selective subscriptions are required.

**Can a component consume a context without a provider?**  
Yes. It receives the context's default value. If the context is required, a custom hook can throw a descriptive error instead.

## Day 36 Outcome

You can now explain **prop drilling, Context, provider scope, default values, context updates, composition alternatives, and Context's boundaries**. Day 37 will turn this mental model into a reusable provider architecture.
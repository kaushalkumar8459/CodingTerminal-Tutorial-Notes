---
title: createContext and Provider Setup
slug: day-037-createcontext-and-provider-setup
dayLabel: Day 37
level: Intermediate
estimatedMinutes: 60
order: 37
track: react
---
# Day 37 [Intermediate]: `createContext` and Provider Setup

## Goal

Build a reusable provider that owns shared state and actions, exposes a small public API, has a deliberate scope, and fails safely when consumed incorrectly.

## 1. Context File Design

A domain context normally contains three layers:

```text
AuthContext
├── context object
├── provider component
└── consumer hook
```

Example:

```jsx
import { createContext, useContext, useMemo, useState } from "react";

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  // state + actions
}

export function useAuth() {
  const value = useContext(AuthContext);
  if (value === null) {
    throw new Error("useAuth must be used within AuthProvider");
  }
  return value;
}
```

Keeping the public hook close to the provider gives consumers a stable API and hides implementation details.

## 2. `createContext` Default Value

```jsx
const AuthContext = createContext(null);
```

Use `null` when the provider is required. Then the custom hook can distinguish a missing provider from a valid provider value.

Avoid misleading fake defaults such as:

```jsx
createContext({ user: null, login: () => {} });
```

Such defaults can hide configuration errors because a component appears to work even when the provider is missing.

## 3. Provider Owns State

The provider is responsible for the shared state and actions:

```jsx
function AuthProvider({ children }) {
  const [user, setUser] = useState(null);

  function login(name) {
    setUser({ id: crypto.randomUUID(), name });
  }

  function logout() {
    setUser(null);
  }

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}
```

This creates a clear contract:

```text
Provider
  ├── state
  └── actions
       ↓
consumer API
```

## 4. Provider Scope

Do not automatically place every provider around the entire application.

Ask:

> Which components actually need this value?

If only checkout pages need a provider, scope it to checkout:

```jsx
<CheckoutProvider>
  <CheckoutRoutes />
</CheckoutProvider>
```

Benefits:

- smaller dependency surface
- clearer ownership
- easier testing
- less accidental coupling

Global providers such as theme or authenticated session may legitimately sit near the application root.

## 5. Provider Composition

Multiple providers can be composed:

```jsx
function AppProviders({ children }) {
  return (
    <ThemeProvider>
      <AuthProvider>
        <SettingsProvider>{children}</SettingsProvider>
      </AuthProvider>
    </ThemeProvider>
  );
}
```

If nesting becomes excessive, a composition component can improve readability. Do not create an abstraction merely to hide three providers; use it when the provider composition is reused or has a meaningful application boundary.

## 6. Expose Data and Actions, Not Implementation Details

Prefer:

```jsx
{
  user,
  login,
  logout,
}
```

over exposing internal setters everywhere:

```jsx
{
  user,
  setUser,
}
```

A domain action communicates intent. `logout()` is more meaningful than `setUser(null)` and lets the provider change its internal implementation later.

## 7. Provider Value Identity

This creates a new object every render:

```jsx
<AuthContext.Provider value={{ user, login, logout }}>
```

That may cause consumers to receive a changed context value even when the meaningful data did not change.

A provider can stabilize the value:

```jsx
const login = useCallback((name) => {
  setUser({ id: crypto.randomUUID(), name });
}, []);

const logout = useCallback(() => {
  setUser(null);
}, []);

const value = useMemo(
  () => ({ user, login, logout }),
  [user, login, logout]
);
```

Do not add this mechanically. First make the architecture correct; then optimize measured hot paths.

## 8. Split Context by Domain

Avoid one giant object:

```jsx
<AppContext.Provider value={{
  user,
  theme,
  language,
  cart,
  notifications,
  search,
}}>
```

Prefer focused contexts:

```text
AuthContext
ThemeContext
LocaleContext
CartContext
```

This makes ownership and update boundaries clearer.

## 9. Read/Write Context Separation

For high-frequency or large shared state, separate contexts can sometimes reduce update impact:

```jsx
const CartStateContext = createContext(null);
const CartActionsContext = createContext(null);
```

A component that only needs actions can subscribe to the actions context rather than the changing state context.

This is an optimization pattern, not a requirement for every application.

## 10. Complete Provider Example

```jsx
import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useState,
} from "react";

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);

  const login = useCallback((name) => {
    setUser({
      id: crypto.randomUUID(),
      name,
      role: "user",
    });
  }, []);

  const logout = useCallback(() => {
    setUser(null);
  }, []);

  const value = useMemo(
    () => ({ user, login, logout }),
    [user, login, logout]
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

## 11. Common Provider Mistakes

### Mistake 1: Provider below consumer

```jsx
<Header />
<AuthProvider>{/* too late */}</AuthProvider>
```

The header cannot receive the provider value.

### Mistake 2: Duplicate contexts

If `AuthContext` is created in two different modules, they are different context objects even if their names match.

### Mistake 3: Provider owns unrelated state

A theme provider should not become the home for search, cart, notifications, and authentication simply because it is already available.

### Mistake 4: Exposing setters everywhere

Prefer domain actions when the domain has meaningful behavior.

### Mistake 5: Premature memoization

`useMemo` and `useCallback` add complexity. Use them when provider value stability matters, not as a ritual.

## Hands-on Lab: Enrollment Provider

Build:

```text
enrolledCourses
isLoading
error

enroll(course)
unenroll(courseId)
clearAll()
```

Use this structure:

```jsx
const EnrollmentContext = createContext(null);
```

### Acceptance Criteria

- [ ] Provider owns the state
- [ ] Consumers cannot directly mutate state
- [ ] Actions express domain intent
- [ ] Provider scope is deliberate
- [ ] Missing-provider usage fails clearly
- [ ] At least two consumers use the provider
- [ ] No giant unrelated context is introduced

## Debugging Scenarios

**Scenario A:** Consumer always receives `null`.  
Check provider placement and imports.

**Scenario B:** All consumers update whenever an unrelated field changes.  
Consider splitting contexts by domain.

**Scenario C:** Provider code is 500 lines long.  
Separate domain logic, reducer/actions, persistence, or server-state concerns rather than making one provider responsible for everything.

## Assessment

1. Why should a provider own shared state?
2. Why is `createContext(null)` useful for required contexts?
3. What is provider scope?
4. Why expose `logout()` instead of `setUser(null)`?
5. When can memoizing provider value help?
6. Why split contexts?
7. When is read/write context separation useful?
8. Why can fake default functions hide bugs?

## Interview Questions

**What is a Provider?**  
A component that supplies a context value to descendants.

**Where should a Provider be placed?**  
At the nearest common ancestor that needs to supply the value, or higher when the value is intentionally application-wide.

**Why use a custom hook around `useContext`?**  
It creates a clean API and can enforce provider usage.

**Should every provider memoize its value?**  
No. Memoization is an optimization and should be justified by rendering behavior.

**How would you structure many contexts?**  
Split them by domain and compose providers at meaningful application boundaries.

## Day 37 Outcome

You can now design **provider ownership, scope, domain actions, provider composition, guarded custom hooks, and context performance boundaries**. Day 38 will focus on consuming this API safely.
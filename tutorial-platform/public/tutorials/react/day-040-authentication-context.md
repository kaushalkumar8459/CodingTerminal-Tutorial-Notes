---
title: Authentication Context
slug: day-040-authentication-context
dayLabel: Day 40
level: Intermediate
estimatedMinutes: 70
order: 40
track: react
---
# Day 40 [Intermediate]: Authentication Context

## Goal

Build an auth-aware React UI with Context while clearly separating **authentication state, UI protection, authorization, persistence, and real backend security**.

## Important Security Rule

Context can control what the **client renders**. It cannot make an API secure.

```text
React Context
   ↓
UI/session awareness

Backend authorization
   ↓
Actual access control
```

A user can modify client-side JavaScript. Therefore every protected API must enforce authorization on the server.

## 1. Model Authentication State

A simple learning model can use:

```jsx
const [user, setUser] = useState(null);
```

Then:

```text
user === null → signed out
user !== null → signed in
```

Do not store a second `isAuthenticated` state unless it represents an independently meaningful state. Usually it is derived:

```jsx
const isAuthenticated = user !== null;
```

## 2. Real Authentication Has More States

Production authentication is often closer to:

```text
checking
unauthenticated
authenticated
error
```

For example, while restoring a server session, the app may not yet know whether the user is authenticated.

```jsx
const [status, setStatus] = useState("checking");
const [user, setUser] = useState(null);
```

This prevents the UI from incorrectly showing "logged out" while session restoration is still running.

## 3. Provider API

Expose domain actions instead of raw setters:

```text
user
status
login()
logout()
refreshSession()
```

Example:

```jsx
const value = {
  user,
  status,
  login,
  logout,
  refreshSession,
};
```

The consumer should not need to know how the session is stored or refreshed.

## 4. Mock Authentication Provider

For learning purposes:

```jsx
import { createContext, useContext, useMemo, useState } from "react";

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);

  function login(email) {
    setUser({
      id: crypto.randomUUID(),
      email,
      role: "student",
    });
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

## 5. Auth-Aware UI

```jsx
function Navbar() {
  const { user, logout } = useAuth();

  return (
    <nav>
      <a href="/">Home</a>

      {user ? (
        <>
          <a href="/profile">Profile</a>
          <button type="button" onClick={logout}>
            Logout
          </button>
        </>
      ) : (
        <a href="/login">Login</a>
      )}
    </nav>
  );
}
```

This is **conditional rendering**, not security.

## 6. Authentication vs Authorization

These are different:

**Authentication:** Who are you?

**Authorization:** Are you allowed to perform this action?

A logged-in student may be authenticated but not authorized to open an admin screen.

```jsx
const canManageUsers = user?.role === "admin";
```

Even this UI check must be backed by server authorization.

## 7. Protected UI Component

```jsx
function DashboardGate() {
  const { user } = useAuth();

  if (!user) {
    return <p>Please sign in to continue.</p>;
  }

  return <Dashboard />;
}
```

This improves user experience, but the dashboard's API requests must still be authorized by the backend.

## 8. Role-Based UI

```jsx
function AdminLink() {
  const { user } = useAuth();

  if (user?.role !== "admin") {
    return null;
  }

  return <a href="/admin">Admin</a>;
}
```

Do not rely on hidden UI to protect data. A user can still call an endpoint directly.

## 9. Session Restoration

A production-style provider might restore a session from a backend:

```jsx
useEffect(() => {
  let ignore = false;

  async function restoreSession() {
    try {
      const response = await fetch("/api/session", {
        credentials: "include",
      });

      if (!response.ok) {
        throw new Error("Session restore failed");
      }

      const data = await response.json();

      if (!ignore) {
        setUser(data.user);
        setStatus("authenticated");
      }
    } catch {
      if (!ignore) {
        setUser(null);
        setStatus("unauthenticated");
      }
    }
  }

  restoreSession();

  return () => {
    ignore = true;
  };
}, []);
```

The exact authentication architecture depends on the backend. The important React lesson is that session restoration is an asynchronous external-system synchronization problem.

## 10. Persistence and Token Storage

For demos, you may store mock user data in localStorage:

```jsx
localStorage.setItem("authUser", JSON.stringify(user));
```

But production authentication needs careful security decisions.

A common web architecture uses secure, appropriately configured cookies, often with `HttpOnly`, `Secure`, and suitable `SameSite` settings, so sensitive session credentials are not directly readable by JavaScript.

Do not teach students that "store JWT in localStorage" is universally safe. Storage strategy depends on the threat model and backend architecture.

## 11. Logout Must Clear the Real Session

A UI-only implementation:

```jsx
setUser(null);
```

is enough for a mock project.

A real application may need to:

1. invalidate/revoke the server session when applicable
2. clear client auth state
3. clear relevant cached private data
4. redirect to a public area

## 12. Avoid Sensitive Data in Context

Do not put secrets into React context merely because components need access.

Context values can be inspected by application code and browser tooling.

Store only the client information required for UI behavior, such as:

```text
user id
name
role/permissions summary
session status
```

The server remains the source of truth for authorization.

## 13. Auth Context and API Clients

A larger application may integrate auth state with an API layer:

```text
AuthProvider
    ↓
session state
    ↓
API client
    ↓
backend
```

If the backend returns `401`, the application may need a session-expired flow. Avoid putting every API operation directly inside AuthProvider; keep responsibilities focused.

## 14. Complete Learning Example

```jsx
function App() {
  return (
    <AuthProvider>
      <Navbar />
      <MainContent />
    </AuthProvider>
  );
}

function MainContent() {
  const { user } = useAuth();

  return user ? (
    <Dashboard />
  ) : (
    <LoginScreen />
  );
}
```

The architecture is simple:

```text
AuthProvider
   │
   ├── Navbar
   │     └── login/logout UI
   │
   └── MainContent
         ├── LoginScreen
         └── Dashboard
```

## 15. Common Mistakes

### Mistake 1: Separate `isAuthenticated` state

Often unnecessary when authentication is represented by `user` and a session status.

### Mistake 2: Treating hidden buttons as authorization

A hidden button does not secure an endpoint.

### Mistake 3: Parsing invalid persisted JSON

Storage can be corrupted or manually changed. Validate and handle parse failures.

### Mistake 4: Storing secrets in Context

Context is not a secure secret store.

### Mistake 5: Flashing authenticated UI before session restoration

Use an explicit `checking` state when the initial session is asynchronous.

### Mistake 6: Putting the entire API layer in AuthProvider

Keep authentication responsibilities separate from generic data fetching.

## Hands-on Project: Exam Portal Authentication

Build:

```text
AuthProvider
├── user
├── status
├── login
├── logout
└── role
```

Roles:

```text
student
admin
```

Requirements:

- [ ] Login screen
- [ ] Logout action
- [ ] Auth-aware navbar
- [ ] Student dashboard
- [ ] Admin-only link
- [ ] Loading/checking state
- [ ] Missing-provider guard
- [ ] No fake security claims
- [ ] Mock persistence or documented server-session approach

### Acceptance Criteria

1. Signed-out users see login UI.
2. Signed-in users see their profile information.
3. Admin-only UI is conditional.
4. Logout clears client auth state.
5. Refresh behavior is intentional.
6. The documentation explicitly states that backend authorization is required.

## Debugging Scenarios

**Dashboard flashes before redirect:** inspect the initial `checking` state.

**User disappears after refresh:** inspect session restoration/persistence.

**Admin link appears for a student:** inspect role normalization and authorization rules.

**Logout changes the UI but API calls still succeed:** client state was cleared but server session was not invalidated or protected correctly.

**Tests fail with `useAuth` error:** render the consumer inside `AuthProvider` or provide a test provider.

## Assessment

1. What is authentication?
2. What is authorization?
3. Why is `isAuthenticated` often derived from user/session state?
4. Why can production auth require a `checking` state?
5. Why is client-side route/UI protection insufficient for security?
6. What should logout do in a real application?
7. Why should sensitive credentials not be casually stored in localStorage?
8. Why should AuthProvider not own every API operation?
9. How does a role affect UI rendering?
10. What is the backend's role in authorization?

## Interview Questions

**Why use Context for authentication?**  
Many components need session information and auth actions.

**Does AuthContext protect an API?**  
No. The backend must authenticate requests and authorize access to protected resources.

**Authentication vs authorization?**  
Authentication establishes identity; authorization determines allowed actions/resources.

**Why use an auth loading state?**  
Because session restoration is asynchronous and the application may initially not know the user's session status.

**Should JWT always be stored in localStorage?**  
No. Token/session storage is a security architecture decision. Secure cookie-based sessions are often preferred for web applications when appropriate.

**How would you handle session expiration?**  
Detect an unauthorized response, update auth state, clear or invalidate appropriate client cache, and provide a clear re-authentication path.

**How would you reduce context re-render impact?**  
Split contexts by concern, stabilize provider values where useful, narrow provider scope, and use selective-subscription state solutions for high-frequency state.

## Day 40 Outcome

You can now design an **auth-aware React application without confusing UI state with real security**. You understand session state, authentication vs authorization, role-aware rendering, persistence boundaries, restoration/loading states, logout semantics, and backend responsibility.

Day 41 begins the routing section, where these authentication concepts can be connected to navigation and protected routes.
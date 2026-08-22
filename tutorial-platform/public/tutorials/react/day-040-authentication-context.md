---
title: Authentication Context
slug: day-040-authentication-context
dayLabel: Day 40
level: Intermediate
estimatedMinutes: 150
order: 40
track: react
---
# Day 40 [Intermediate]: Authentication Context

## Goal

Build an auth-aware React UI with Context while clearly separating **authentication state, session restoration, UI protection, authorization, persistence, and real backend security**.

## Prerequisites

- Day 36: Context API introduction
- Day 38: `useContext` in components
- Day 39: Theme management
- `useState`, `useEffect`, `useMemo`
- custom Hooks
- basic HTTP/API concepts

## Learning Outcomes

By the end of this lesson, you can:

- model authentication as an explicit state machine
- distinguish authentication from authorization
- build a guarded `useAuth()` Hook
- represent `checking`, `authenticated`, and `unauthenticated` states
- restore a server session safely
- prevent authenticated-content flashes during session restoration
- implement role-aware UI without treating it as security
- design logout and session-expiration flows
- explain cookie/session vs token-storage trade-offs
- avoid putting secrets or security assumptions into Context
- test auth consumers and protected UI boundaries
- keep authentication responsibilities separate from generic API/server-state concerns

## Important Security Rule

Context can control what the **client renders**. It cannot make an API secure.

```text
React Context
   ↓
UI/session awareness

Backend authentication + authorization
   ↓
Actual access control
```

A user can modify client-side JavaScript, call APIs directly, or manipulate browser storage. Therefore every protected API must enforce authentication and authorization on the server.

## 1. Authentication vs Authorization

These concepts must remain separate.

**Authentication:** Who are you?

**Authorization:** What are you allowed to access or do?

Example:

```text
Authentication
    ↓
User = Alice
    ↓
Authorization
    ├── read courses ✓
    ├── submit exam ✓
    └── manage users ✗
```

A logged-in student may be authenticated but not authorized to access an admin operation.

## 2. Model Authentication State

A simple learning model can use:

```jsx
const [user, setUser] = useState(null);
```

Then:

```text
user === null → signed out
user !== null → signed in
```

Do not create a second `isAuthenticated` state merely to mirror `user`:

```jsx
const isAuthenticated = user !== null;
```

However, `user !== null` alone is insufficient when the application must asynchronously restore a session.

## 3. Real Authentication Has More States

Production authentication is better modeled explicitly:

```text
checking
unauthenticated
authenticated
error
```

A small state machine can prevent contradictory combinations:

```text
checking
   ↓
 ┌───────────────┐
 ↓               ↓
signed out    signed in
                  ↓
             session expires
                  ↓
             signed out
```

For example:

```jsx
const [status, setStatus] = useState("checking");
const [user, setUser] = useState(null);
```

While `status === "checking"`, do not render the application as definitely signed out.

## 4. Auth Provider Contract

Expose domain actions instead of raw setters:

```text
user
status
login(credentials)
logout()
refreshSession()
```

A useful contract is:

```jsx
{
  user,
  status,
  login,
  logout,
  refreshSession,
}
```

Consumers should not need to know whether the provider uses cookies, a token exchange, a session endpoint, or another backend mechanism.

## 5. Mock Authentication Provider

For learning purposes, a mock provider can be intentionally simple:

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

This is a teaching example, not a production authentication implementation.

## 6. Auth-Aware UI

```jsx
function Navbar() {
  const { user, logout } = useAuth();

  return (
    <nav aria-label="Primary">
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

## 7. Protected UI Boundary

```jsx
function DashboardGate() {
  const { user, status } = useAuth();

  if (status === "checking") {
    return <p role="status">Checking your session…</p>;
  }

  if (!user) {
    return <p>Please sign in to continue.</p>;
  }

  return <Dashboard />;
}
```

The gate improves user experience. The dashboard's API requests must still be authenticated and authorized by the backend.

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

Role checks are useful for navigation and UX, but they are not an authorization boundary.

A safer mental model is:

```text
Client role check → what the user sees
Server permission check → what the user can actually do
```

## 9. Session Restoration

A production-style provider may restore a session from a backend:

```jsx
useEffect(() => {
  const controller = new AbortController();

  async function restoreSession() {
    try {
      setStatus("checking");

      const response = await fetch("/api/session", {
        credentials: "include",
        signal: controller.signal,
      });

      if (response.status === 401) {
        setUser(null);
        setStatus("unauthenticated");
        return;
      }

      if (!response.ok) {
        throw new Error("Session restore failed");
      }

      const data = await response.json();
      setUser(data.user);
      setStatus("authenticated");
    } catch (error) {
      if (error?.name === "AbortError") {
        return;
      }

      setUser(null);
      setStatus("error");
    }
  }

  restoreSession();

  return () => controller.abort();
}, []);
```

`AbortController` makes the external request cancellable when the provider unmounts. The exact authentication architecture depends on the backend.

## 10. Avoid Incorrect Session States

Avoid rendering authenticated UI simply because an old local value exists while a server session is being checked.

Prefer an explicit contract:

```text
checking → show neutral/loading state
          ↓
authenticated → render protected UI
          ↓
unauthenticated → render login/public UI
```

This avoids common flashes and redirects caused by assuming the session is known before restoration finishes.

## 11. Login Flow

A real login operation should model asynchronous status and failure:

```jsx
async function login(credentials) {
  setStatus("checking");

  const response = await fetch("/api/login", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    credentials: "include",
    body: JSON.stringify(credentials),
  });

  if (!response.ok) {
    setStatus("unauthenticated");
    throw new Error("Login failed");
  }

  const data = await response.json();
  setUser(data.user);
  setStatus("authenticated");
}
```

Production code should also normalize expected validation/authentication errors and prevent duplicate submissions at the UI boundary.

## 12. Persistence and Token Storage

For demos, mock user data may be stored in localStorage:

```jsx
localStorage.setItem("authUser", JSON.stringify(user));
```

But production authentication requires a deliberate security architecture.

For many web applications, secure cookie-based sessions are preferable when appropriate, using options such as `HttpOnly`, `Secure`, and an appropriate `SameSite` policy. Exact choices depend on deployment and threat model.

Do **not** teach:

```text
JWT in localStorage = always safe
```

That is false. Browser storage is accessible to JavaScript and therefore has important XSS-related consequences.

## 13. Never Treat Client Storage as Trusted

A user can manually change:

```text
localStorage
sessionStorage
cookies accessible to JavaScript
React state
```

Therefore this is never sufficient authorization:

```jsx
if (localStorage.getItem("role") === "admin") {
  showAdminControls();
}
```

The server must derive trusted identity/permissions from its own validated session or credentials.

## 14. Logout Must Clear the Real Session

A mock project can use:

```jsx
setUser(null);
```

A real application may need to:

1. invalidate/revoke the server session when applicable
2. clear client auth state
3. clear relevant private cached data
4. cancel or ignore protected requests where appropriate
5. redirect to a public area

A UI-only logout is not sufficient if the server still considers the session active.

## 15. Session Expiration and `401`

Protected APIs can return `401 Unauthorized` when the session is missing or expired.

A typical flow is:

```text
Protected request
      ↓
     401
      ↓
Update auth/session state
      ↓
Clear private client cache
      ↓
Show re-authentication path
```

Avoid scattering ad-hoc logout logic across every component. Centralize the session boundary in an API client/interceptor layer where the architecture supports it.

## 16. Avoid Sensitive Data in Context

Do not put secrets into React Context merely because components need access.

Context values can be inspected by application code and browser tooling.

Prefer client-visible information needed for UI behavior:

```text
user id
name
role/permission summary
session status
```

The server remains the source of truth for authorization.

## 17. Auth Context and API Clients

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

Keep responsibilities focused:

```text
AuthProvider
→ identity/session lifecycle

API client
→ HTTP requests, errors, credentials

Server-state layer
→ caching, invalidation, retries, synchronization
```

Do not put every course, user, payment, or dashboard API operation inside `AuthProvider`.

## 18. Authentication Is Not Server State

The authentication context can expose the current session identity, but remote application data such as:

- course lists
- notifications
- invoices
- exam results
- profile details

may belong in a server-state/data-fetching layer.

This separation keeps the authentication provider small and easier to reason about.

## 19. Complete Learning Example

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
  const { user, status } = useAuth();

  if (status === "checking") {
    return <p role="status">Loading session…</p>;
  }

  return user ? <Dashboard /> : <LoginScreen />;
}
```

Architecture:

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

## 20. Common Mistakes

### Mistake 1: Separate `isAuthenticated` state

Often unnecessary when authentication is represented by `user` and explicit session status.

### Mistake 2: Treating hidden buttons as authorization

A hidden button does not secure an endpoint.

### Mistake 3: Trusting persisted role data

Client storage is user-controlled and cannot be the source of authorization truth.

### Mistake 4: Parsing invalid persisted JSON

Storage can be corrupted or manually changed. Validate and handle parse failures.

### Mistake 5: Flashing authenticated UI before session restoration

Use an explicit `checking` state when the initial session is asynchronous.

### Mistake 6: Treating `401` as a generic network error

A `401` often means the session boundary needs to be updated.

### Mistake 7: Putting the entire API layer in AuthProvider

Keep authentication responsibilities separate from generic data fetching.

### Mistake 8: Assuming Context makes authentication secure

Context only informs the client. The backend must validate every protected operation.

## 21. Testing Authentication Context

Test the consumer contract rather than React's internal Context implementation.

Example:

```jsx
render(
  <AuthProvider>
    <Navbar />
  </AuthProvider>
);
```

Test important states:

```text
checking
unauthenticated
authenticated
login failure
logout
session expiration
missing provider
```

For provider-independent consumer tests, a deterministic test value can be supplied:

```jsx
const testValue = {
  user: { id: "1", name: "Test User", role: "student" },
  status: "authenticated",
  login: vi.fn(),
  logout: vi.fn(),
  refreshSession: vi.fn(),
};
```

The test should verify observable behavior such as rendered content and action calls.

## 22. Hands-on Project: Exam Portal Authentication

Build:

```text
AuthProvider
├── user
├── status
├── login
├── logout
└── refreshSession
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
- [ ] Checking/loading state
- [ ] Missing-provider guard
- [ ] Session restoration
- [ ] `401` session-expiration flow
- [ ] Mock persistence or documented server-session approach
- [ ] No fake security claims
- [ ] Accessible controls

### Acceptance Criteria

1. Signed-out users see login UI.
2. Signed-in users see their profile information.
3. Admin-only UI is conditional.
4. Logout clears client auth state and documents server-session behavior.
5. Refresh behavior is intentional.
6. Session restoration has a neutral `checking` state.
7. Protected APIs are documented as server-authorized.
8. Tests cover authenticated and unauthenticated states.

## 23. Debugging Scenarios

**Dashboard flashes before redirect:** inspect the initial `checking` state.

**User disappears after refresh:** inspect session restoration/persistence and backend session behavior.

**Admin link appears for a student:** inspect role normalization and server-backed authorization assumptions.

**Logout changes the UI but API calls still succeed:** client state was cleared but the server session may not have been invalidated or the API may lack authorization enforcement.

**Protected request returns `401`:** update auth state and follow the application's session-expiration path rather than treating it as a generic UI error.

**Tests fail with `useAuth` error:** render the consumer inside `AuthProvider` or provide a compatible test provider.

**Authenticated UI flashes on first paint:** inspect whether session restoration is asynchronous and whether the app renders a neutral state before the result is known.

## 24. Assessment

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
11. Why is a `401` different from an ordinary UI error?
12. Why should client-persisted role information never be trusted for authorization?
13. How should authentication state and server-state data be separated?

### Answers

1. Authentication establishes the identity of the requester.
2. Authorization determines which resources/actions that identity is permitted to access.
3. It avoids maintaining duplicate derived state.
4. Session restoration is asynchronous, so the application may initially not know the session result.
5. Users control the client and can bypass UI checks; protected APIs must enforce access on the server.
6. Clear client state and, when applicable, invalidate the real server session and private cached data.
7. Browser storage is client-accessible and has important security implications, especially under XSS.
8. A focused provider is easier to maintain; generic server data belongs in API/server-state layers.
9. It can control what navigation or UI controls are shown, but not server authorization.
10. The backend validates identity/session credentials and enforces permissions for protected resources.
11. `401` commonly indicates an authentication/session problem and can trigger a re-authentication flow.
12. Client storage is user-controlled and therefore untrusted.
13. Keep identity/session lifecycle in auth state while remote domain data is handled by appropriate server-state/data-fetching mechanisms.

## 25. Interview Questions

### Beginner

**Why use Context for authentication?**

Many components need session information and auth actions without prop drilling.

**Does AuthContext protect an API?**

No. The backend must authenticate requests and authorize access to protected resources.

### Intermediate

**Authentication vs authorization?**

Authentication establishes identity; authorization determines allowed actions/resources.

**Why use an auth loading state?**

Because session restoration is asynchronous and the application may initially not know the user's session status.

**Why should `isAuthenticated` usually be derived?**

A second boolean can drift out of sync with the actual user/session state.

**Should JWT always be stored in localStorage?**

No. Token/session storage is a security architecture decision. Secure cookie-based sessions are often preferred for web applications when appropriate.

### Advanced

**How would you handle session expiration?**

Detect an authentication failure such as `401`, update auth state, clear or invalidate appropriate private client data, and provide a clear re-authentication path.

**How would you reduce Context re-render impact?**

Split contexts by concern, stabilize provider values where useful, narrow provider scope, and use selective-subscription state solutions for high-frequency state.

**Can Context replace a server-state library?**

Context can distribute application values, but caching, deduplication, retries, invalidation, and synchronization with remote data often need a dedicated server-state solution.

**Can Context secure an authenticated application?**

No. Context can expose UI/session state to components, but the server must independently validate credentials, sessions, permissions, and authorization.

**Why is `checking` an important state?**

It prevents the application from treating an unresolved session as either authenticated or signed out before the backend result is known.

## 26. Production Checklist

- [ ] Authentication and authorization are explicitly distinguished.
- [ ] Session state has an explicit initial/checking state where required.
- [ ] `isAuthenticated` is derived rather than duplicated unnecessarily.
- [ ] Provider exposes domain actions rather than raw state setters.
- [ ] Missing-provider behavior is explicit.
- [ ] Client-side role checks are treated as UX only.
- [ ] Every protected API enforces authorization on the server.
- [ ] Session restoration handles success, `401`, unexpected errors, and cancellation.
- [ ] Logout handles both client state and real session invalidation where applicable.
- [ ] Sensitive credentials are not casually placed in Context or localStorage.
- [ ] Private client/server-state caches are considered during logout/session expiration.
- [ ] AuthProvider does not become the application's generic API layer.
- [ ] Tests cover key auth states and consumer behavior.
- [ ] Accessibility is considered for login/logout/loading UI.

## 27. Final Project

Build a small authenticated course dashboard:

```text
AuthProvider
   ├── Navbar
   ├── ProfileCard
   ├── CourseList
   ├── AdminLink
   └── LogoutButton
```

Requirements:

- `user` state
- explicit `status`
- `login(credentials)` and `logout()` actions
- `refreshSession()`
- guarded `useAuth()` consumer Hook
- role-aware UI
- session restoration
- `401` handling
- accessible navigation and controls
- tests for consumer rendering and logout behavior
- explanation of why Context does not provide backend authorization

### Final Acceptance Criteria

- [ ] Authentication state is explicit and correct.
- [ ] `checking` state prevents incorrect initial UI.
- [ ] Authentication and authorization are clearly separated.
- [ ] Basic `useAuth` consumer pattern is correct.
- [ ] Role-aware UI is implemented without security claims.
- [ ] Session restoration is cancellable.
- [ ] Logout/session expiration behavior is documented.
- [ ] Storage security limitations are explained.
- [ ] Auth context remains focused.
- [ ] Server authorization is explicitly required.
- [ ] Tests cover authenticated, unauthenticated, and checking states.
- [ ] Accessibility requirements are met.

## Self Check

- [ ] I can explain authentication vs authorization.
- [ ] I know why client-side guards are not security boundaries.
- [ ] I can model `checking`, `authenticated`, and `unauthenticated` states.
- [ ] I can build a guarded `useAuth()` Hook.
- [ ] I understand why persisted client data is untrusted.
- [ ] I can explain secure cookie/session trade-offs at a high level.
- [ ] I know how to handle a `401` session-expiration flow.
- [ ] I understand why AuthProvider should not own all API data.
- [ ] I can test authentication consumers.
- [ ] I can explain where backend authorization belongs.

## Day 40 Outcome

You can now design an **auth-aware React application without confusing UI state with real security**. You understand session state, authentication vs authorization, role-aware rendering, persistence boundaries, restoration/loading states, cancellation, logout semantics, session expiration, and backend responsibility.

**Next:** Day 41 — Routing fundamentals and connecting authentication state to navigation and protected routes.

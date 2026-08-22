---
title: Protected Routes
slug: day-045-protected-routes
dayLabel: Day 45
level: Intermediate
estimatedMinutes: 150
order: 45
track: react
---
# Day 45 [Intermediate]: Protected Routes

## Goal

Build authentication-aware route guards with React Router. Learn how to protect individual routes and route groups, handle asynchronous session restoration, preserve intended destinations, support role-based UI decisions, and keep client-side routing separate from real backend authorization.

## Prerequisites

- Day 40: Authentication Context
- Day 41: React Router setup
- Day 42: Routes and navigation
- Day 43: Route parameters
- Day 44: Nested routes

## Learning Outcomes

By the end of this lesson, you can:

- distinguish authentication from authorization
- build reusable protected-route patterns
- use `Navigate` and `useLocation` safely
- preserve an intended internal destination after login
- avoid redirecting while authentication is still loading
- protect entire route/layout groups
- implement role-aware UI and route decisions
- handle forbidden vs unauthenticated states
- avoid redirect loops
- validate return destinations
- test protected navigation behavior
- explain why frontend guards do not secure backend APIs

## 1. Authentication vs Authorization

These concepts must be separated.

**Authentication:** Who is the user?

```text
Authenticated → user/session exists
Unauthenticated → no valid session
```

**Authorization:** What is the authenticated user allowed to do?

```text
admin → can access admin features
user  → cannot access admin-only features
```

A protected route commonly performs a client-side UX check for both, but the server must independently enforce access to protected resources and operations.

## 2. Basic Protected Route

A reusable guard can render children only when a user is available:

```jsx
import { Navigate } from "react-router-dom";
import { useAuth } from "./useAuth";

function ProtectedRoute({ children }) {
  const { user, isLoading } = useAuth();

  if (isLoading) {
    return <p>Checking session...</p>;
  }

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  return children;
}
```

The important sequence is:

```text
Loading → wait
   ↓
Authenticated → allow
   ↓
Unauthenticated → redirect
```

Do not treat an initial `user === null` as proof that the session is invalid when the application has not finished restoring the session.

## 3. Why `replace` Is Useful

Use:

```jsx
<Navigate to="/login" replace />
```

when the protected page should not remain as a useless history entry behind the login page.

Without `replace`, the browser history can become confusing:

```text
/private → login → private → login → ...
```

`replace` is not a security feature. It only changes browser history behavior.

## 4. Preserve the Intended Destination

If a user opens:

```text
/reports/42?tab=activity
```

while unauthenticated, the application can remember the intended internal location:

```jsx
import { Navigate, useLocation } from "react-router-dom";

function ProtectedRoute({ children }) {
  const { user, isLoading } = useAuth();
  const location = useLocation();

  if (isLoading) return <p>Checking session...</p>;

  if (!user) {
    return (
      <Navigate
        to="/login"
        state={{ from: location.pathname + location.search }}
        replace
      />
    );
  }

  return children;
}
```

The login page can then use the stored destination after successful authentication.

## 5. Safe Post-Login Redirect

A return destination is client-controlled input. Do not blindly redirect to arbitrary URLs.

Prefer an internal pathname:

```jsx
const from = location.state?.from;
```

Then validate it before navigation:

```jsx
function getSafeReturnPath(value) {
  if (typeof value !== "string") return "/dashboard";

  if (!value.startsWith("/")) return "/dashboard";
  if (value.startsWith("//")) return "/dashboard";

  return value;
}
```

After successful login:

```jsx
const destination = getSafeReturnPath(location.state?.from);
navigate(destination, { replace: true });
```

For more complex applications, prefer an allowlist or route-aware policy rather than relying only on string checks.

This prevents an **open redirect**, where an attacker manipulates the return destination to send a user somewhere unintended.

## 6. Authentication Loading State

Session restoration is often asynchronous:

```text
Application starts
       ↓
Restore session
       ↓
Loading?
  ↙         ↘
Yes          No
 ↓            ↓
Wait       user exists?
             ↙    ↘
           Yes     No
            ↓       ↓
          Allow   Login
```

A robust auth context often exposes:

```js
{
  user,
  isLoading,
  login,
  logout,
}
```

Without an explicit loading state, applications can briefly redirect valid users to login before their existing session is restored.

## 7. Protecting Route Groups

When several pages share the same authentication requirement, protect the layout boundary rather than duplicating the guard.

```jsx
<Route element={<ProtectedRoute />}> 
  <Route path="/dashboard" element={<DashboardLayout />}>
    <Route index element={<Overview />} />
    <Route path="reports" element={<Reports />} />
    <Route path="settings" element={<Settings />} />
  </Route>
</Route>
```

With an `Outlet`-based guard:

```jsx
import { Navigate, Outlet, useLocation } from "react-router-dom";

function ProtectedRoute() {
  const { user, isLoading } = useAuth();
  const location = useLocation();

  if (isLoading) return <p>Checking session...</p>;

  if (!user) {
    return (
      <Navigate
        to="/login"
        state={{ from: location.pathname + location.search }}
        replace
      />
    );
  }

  return <Outlet />;
}
```

This pattern scales well for authenticated application shells.

## 8. Role-Based Access

Authentication alone is not enough for admin-only features.

A role-aware guard can make a client-side routing decision:

```jsx
function AdminRoute() {
  const { user, isLoading } = useAuth();
  const location = useLocation();

  if (isLoading) return <p>Checking session...</p>;

  if (!user) {
    return (
      <Navigate
        to="/login"
        state={{ from: location.pathname }}
        replace
      />
    );
  }

  if (user.role !== "admin") {
    return <Navigate to="/forbidden" replace />;
  }

  return <Outlet />;
}
```

A useful UX distinction is:

```text
401-style experience → not authenticated
403-style experience → authenticated but not allowed
```

The exact API status handling belongs to the backend/API layer, but the UI should preserve the conceptual distinction.

## 9. Never Trust Client Roles for Security

This is critical.

A browser user can manipulate client-side state. Therefore this is **not** security:

```jsx
if (user.role === "admin") {
  return <AdminPage />;
}
```

It is only a UI/routing decision.

The backend must independently verify:

```text
Authenticated user
        ↓
Valid session/token
        ↓
Required permission
        ↓
Resource-level authorization
        ↓
Allow / deny
```

Never assume that hiding an admin button or route protects an admin API.

## 10. Avoid Redirect Loops

A common mistake is protecting `/login` with the same guard that redirects users to `/login`.

Bad conceptual flow:

```text
/login
  ↓ guard
not authenticated
  ↓
/login
  ↓ guard
/login
```

Keep public authentication routes outside the protected route group:

```jsx
<Routes>
  <Route path="/login" element={<Login />} />

  <Route element={<ProtectedRoute />}>
    <Route path="/dashboard" element={<Dashboard />} />
    <Route path="/reports" element={<Reports />} />
  </Route>
</Routes>
```

Also consider public routes such as:

```text
/forgot-password
/reset-password
```

according to the application's authentication flow.

## 11. Prevent Authenticated Users from Visiting Login

Some applications redirect an already authenticated user away from the login page:

```jsx
function PublicOnlyRoute() {
  const { user, isLoading } = useAuth();

  if (isLoading) return <p>Checking session...</p>;
  if (user) return <Navigate to="/dashboard" replace />;

  return <Outlet />;
}
```

Use this only when it matches the desired product behavior. A public login page may still be useful for account switching or explicit re-authentication flows.

## 12. Guard Placement Strategy

Choose the smallest meaningful boundary.

### Individual route

Use when only one page needs special access.

```jsx
<Route
  path="/admin/reports"
  element={<AdminReports />}
/>
```

with protection applied by a wrapper/layout.

### Route group

Use when many routes share the same requirement.

```text
ProtectedLayout
├── Dashboard
├── Reports
└── Settings
```

### Nested permission boundaries

A large application may have:

```text
AuthenticatedLayout
├── UserRoutes
└── AdminLayout
    ├── AdminDashboard
    └── AdminReports
```

Keep permission boundaries aligned with product/domain ownership rather than creating guards for every component.

## 13. Complete Protected Application Example

```jsx
import {
  Navigate,
  Outlet,
  Route,
  Routes,
  useLocation,
} from "react-router-dom";
import { useAuth } from "./useAuth";

function ProtectedRoute() {
  const { user, isLoading } = useAuth();
  const location = useLocation();

  if (isLoading) {
    return <p>Checking session...</p>;
  }

  if (!user) {
    return (
      <Navigate
        to="/login"
        replace
        state={{ from: location.pathname + location.search }}
      />
    );
  }

  return <Outlet />;
}

function AdminRoute() {
  const { user, isLoading } = useAuth();

  if (isLoading) return <p>Checking permissions...</p>;
  if (!user) return <Navigate to="/login" replace />;
  if (user.role !== "admin") {
    return <Navigate to="/forbidden" replace />;
  }

  return <Outlet />;
}

export default function AppRoutes() {
  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route path="/forbidden" element={<Forbidden />} />

      <Route element={<ProtectedRoute />}>
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/reports" element={<Reports />} />

        <Route element={<AdminRoute />}>
          <Route path="/admin" element={<AdminDashboard />} />
          <Route path="/admin/reports" element={<AdminReports />} />
        </Route>
      </Route>
    </Routes>
  );
}
```

This structure makes the access hierarchy visible:

```text
Public
├── Login
└── Forbidden

Authenticated
├── Dashboard
├── Reports
└── Admin
    ├── Admin Dashboard
    └── Admin Reports
```

## 14. Common Mistakes

### Redirecting while auth is still loading

This causes false redirects and login flicker.

### Protecting `/login` with the same unauthenticated guard

This can create an infinite redirect loop.

### Storing only `pathname` when query/hash matters

If the intended destination includes useful query state, preserve the required URL information.

### Trusting `location.state.from`

It is client-controlled. Validate return destinations.

### Using role checks as backend security

Client role checks can be bypassed.

### Redirecting every unauthorized user to login

An authenticated user without permission should usually receive a forbidden experience rather than being treated as logged out.

### Duplicating guard logic across every page

Use route-group/layout boundaries when the same rule applies to multiple routes.

### Putting authentication tokens/secrets into URLs

URLs can appear in browser history, logs, analytics, referrers, and other systems. Do not put sensitive credentials in route parameters or query strings.

## 15. Accessibility and UX

Protected navigation should provide clear user feedback:

- show a meaningful session-checking state
- provide a clear login destination
- provide a useful forbidden page
- preserve keyboard navigation
- avoid unexpected redirect loops
- provide descriptive headings
- manage route-level focus appropriately

Do not rely on color alone to communicate access state.

## 16. Hands-on Labs

### Lab 1 — Protected Dashboard

Build:

```text
/dashboard
/reports
/settings
```

Requirements:

- authentication guard
- loading state
- redirect to login
- return to intended route

### Lab 2 — Admin Area

Build:

```text
/admin
/admin/reports
/admin/settings
```

Requirements:

- authenticated users allowed into the application
- admin-only routes
- forbidden page for non-admin users
- shared admin guard

### Lab 3 — Safe Return URL

Implement login redirection using `location.state`.

Test:

```text
/reports/42?tab=activity
```

and verify that the user returns to the intended internal location after login.

### Lab 4 — Session Restoration

Simulate a delayed session lookup. Verify that the guard shows a loading state rather than immediately redirecting to login.

### Lab 5 — Nested Guard Boundaries

Create an authenticated application shell and a nested admin permission boundary.

## 17. Debugging Scenarios

### Scenario A — User briefly sees login before dashboard

Check whether session restoration has an explicit loading state.

### Scenario B — Login redirects back to login

Check whether `/login` is accidentally inside the unauthenticated guard.

### Scenario C — User loses the requested query string

Check whether the return destination preserved `pathname + search` when needed.

### Scenario D — Normal user is sent to login instead of forbidden

Separate authentication failure from authorization failure.

### Scenario E — Admin API can still be called manually

This is expected if only the frontend was protected. Add/verify server-side authorization.

### Scenario F — Redirect sends users to an unexpected external site

Audit and validate the return destination. Do not trust arbitrary URLs from navigation state or query parameters.

## 18. Testing Strategy

Test protected routing as user-visible behavior.

Useful scenarios include:

- authenticated user sees the protected page
- unauthenticated user is redirected to login
- auth-loading state does not redirect prematurely
- intended destination is preserved
- login returns to a safe internal destination
- non-admin user reaches forbidden UI
- admin user can access admin routes
- protected route groups work through nested layouts
- login is not caught in a redirect loop

Example:

```jsx
render(
  <MemoryRouter initialEntries={["/reports"]}>
    <AppRoutes />
  </MemoryRouter>
);
```

Mock the authentication boundary and network/API boundary in tests. Avoid making route tests depend on a real production authentication service.

## 19. Assessment

1. What is authentication?
2. What is authorization?
3. Why is `isLoading` important in a protected route?
4. What does `Navigate` do?
5. Why use `replace` during a login redirect?
6. How can you preserve the intended destination?
7. Why must a return path be validated?
8. What is the difference between unauthenticated and forbidden?
9. Why can frontend role checks not secure an API?
10. How can route-group guards reduce duplication?

### Answers

1. Verifying who the user/session represents.
2. Determining what an authenticated user is allowed to access or perform.
3. Session restoration may be asynchronous; without loading state, valid users can be redirected incorrectly.
4. It declaratively redirects to another route.
5. To avoid leaving the protected destination as an unnecessary history entry.
6. Pass a safe internal destination through navigation state and use it after successful login.
7. Navigation state is client-controlled and can be manipulated.
8. Unauthenticated means the user has no valid authenticated session; forbidden means the user is authenticated but lacks permission.
9. Browser code can be modified/bypassed; the server must enforce authorization.
10. They place a shared access rule around a meaningful route/layout boundary.

## 20. Interview Questions

### Beginner

**What is a protected route?**

A route whose UI access is conditionally controlled based on authentication/permission state.

**What does `Navigate` do?**

It performs declarative navigation to another route.

### Intermediate

**Why should protected routes wait for auth restoration?**

Because an initial empty user state may represent "not loaded yet," not "logged out."

**How do you return a user to the page they originally requested?**

Store the intended internal location during the login redirect and navigate there after successful authentication.

**Why use route-group guards?**

They centralize common access rules and reduce duplicated guard logic.

### Advanced

**How would you design authentication and authorization for a production SPA?**

Use a centralized auth/session model, explicit loading state, route guards for UX, safe return destinations, and authoritative backend authentication/authorization for every protected API/resource.

**How do you prevent an open redirect in post-login navigation?**

Allow only validated internal destinations or use an explicit allowlist of permitted application routes.

**Why should permissions not be trusted from localStorage or arbitrary client state?**

Client storage is user-controlled and can be modified. The server must derive/enforce authorization from trusted session/credential context.

**Where should a permission boundary be placed in a large route tree?**

At a meaningful feature/layout boundary that owns the permission requirement, rather than around every individual component.

## 21. Production Checklist

- [ ] Authentication and authorization are clearly separated.
- [ ] Auth restoration exposes an explicit loading state.
- [ ] Unauthenticated users are redirected to login.
- [ ] Intended destinations preserve required pathname/search information.
- [ ] Return destinations are validated.
- [ ] Open redirects are prevented.
- [ ] `replace` is used intentionally for auth redirects.
- [ ] Login/public routes are outside protected guards.
- [ ] Authenticated-but-forbidden users receive an appropriate forbidden experience.
- [ ] Shared route groups use layout/Outlet guard boundaries where appropriate.
- [ ] Client role checks are treated as UX only.
- [ ] Backend authorization protects every sensitive API/resource.
- [ ] Secrets/tokens are not placed in URLs.
- [ ] Protected navigation is accessible.
- [ ] Authentication and navigation behavior is tested.

## Final Project — Secure Admin Portal Navigation

Build:

```text
Public
├── /login
└── /forbidden

Authenticated
├── /dashboard
├── /reports
└── /admin
    ├── /admin/overview
    ├── /admin/users
    └── /admin/reports
```

Requirements:

- centralized authentication context
- asynchronous session restoration
- protected route-group layout
- safe return-to-original-route flow
- admin permission boundary
- forbidden page
- accessible navigation
- no redirect loops
- return-path validation
- tests for authenticated, unauthenticated, loading, and forbidden states
- explanation of frontend guard vs backend authorization

## Final Acceptance Criteria

- [ ] Authentication vs authorization is clearly understood.
- [ ] Protected routes wait for auth restoration.
- [ ] Unauthenticated users are redirected correctly.
- [ ] Intended destinations are preserved safely.
- [ ] Open redirects are prevented.
- [ ] Role/permission boundaries are implemented.
- [ ] Forbidden and login states are distinguished.
- [ ] Route-group protection avoids duplication.
- [ ] Redirect loops are avoided.
- [ ] Frontend guards are not treated as backend security.
- [ ] Tests cover important access states.
- [ ] Final project is completed.

## Self Check

- [ ] I can explain authentication vs authorization.
- [ ] I can build a loading-aware protected route.
- [ ] I can use `Navigate` correctly.
- [ ] I can preserve an intended destination.
- [ ] I can validate a return path.
- [ ] I can create an admin permission boundary.
- [ ] I can distinguish forbidden from unauthenticated.
- [ ] I can avoid redirect loops.
- [ ] I know why frontend guards do not secure APIs.
- [ ] I can test protected navigation flows.

## Day 45 Outcome

You can now design production-oriented protected routing with authentication-aware guards, safe return navigation, asynchronous session handling, role/permission boundaries, accessible failure states, and a clear separation between frontend UX protection and backend security.

**Next:** Day 46 — Lazy Loading and Route-Based Code Splitting.

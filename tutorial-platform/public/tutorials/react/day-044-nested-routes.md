---
title: Nested Routes
slug: day-044-nested-routes
dayLabel: Day 44
level: Intermediate
estimatedMinutes: 150
order: 44
track: react
---
# Day 44 [Intermediate]: Nested Routes

## Goal

Build maintainable React Router route hierarchies using shared layouts, `Outlet`, index routes, relative navigation, nested parameters, route-level error handling, and modular route organization.

## Prerequisites

- Day 41: React Router setup
- Day 42: Routes and navigation
- Day 43: Route parameters

## Learning Outcomes

By the end of this lesson, you can:

- design parent/child route hierarchies
- build shared layouts with `Outlet`
- use index routes correctly
- create relative links and navigation
- understand route-relative vs path-relative behavior
- combine nested routes with dynamic parameters
- distinguish layout routes from URL segments
- add route-level error boundaries/fallbacks
- organize large route trees by feature
- prepare nested routes for lazy loading
- test nested route behavior

## 1. What Are Nested Routes?

Nested routes model a UI hierarchy as a route hierarchy.

For example:

```text
/dashboard
├── overview
├── reports
├── reports/:id
└── settings
```

The dashboard shell can remain mounted while only the child content changes.

This is different from copying the same sidebar/header into every page component.

## 2. Parent Route + Children

A parent route can contain child routes:

```jsx
import { Route, Routes } from "react-router-dom";

<Routes>
  <Route path="dashboard" element={<DashboardLayout />}>
    <Route index element={<Overview />} />
    <Route path="reports" element={<Reports />} />
    <Route path="settings" element={<Settings />} />
  </Route>
</Routes>
```

The URL `/dashboard/reports` matches the parent and child route. The parent layout renders its shared UI and the child renders at the layout's `Outlet`.

## 3. `Outlet`

`Outlet` is the insertion point for the currently matched child route:

```jsx
import { NavLink, Outlet } from "react-router-dom";

function DashboardLayout() {
  return (
    <div className="dashboard">
      <header>Dashboard</header>

      <nav aria-label="Dashboard navigation">
        <NavLink to=".">Overview</NavLink>
        <NavLink to="reports">Reports</NavLink>
        <NavLink to="settings">Settings</NavLink>
      </nav>

      <main>
        <Outlet />
      </main>
    </div>
  );
}
```

Think of `Outlet` as the child-route slot in the parent layout.

Without an `Outlet`, the child route can match but its UI has nowhere in the parent layout to render.

## 4. Index Routes

An index route is the default child for a parent route:

```jsx
<Route path="dashboard" element={<DashboardLayout />}>
  <Route index element={<Overview />} />
  <Route path="reports" element={<Reports />} />
</Route>
```

Therefore:

```text
/dashboard         → DashboardLayout + Overview
/dashboard/reports → DashboardLayout + Reports
```

An index route does **not** need a `path`.

Use an index route when the parent URL should have meaningful default content rather than redirecting simply to create a default child URL.

## 5. Relative Navigation

Nested routes make relative navigation useful:

```jsx
<NavLink to="reports">Reports</NavLink>
```

From the dashboard layout this resolves to the appropriate child route.

A relative link can make route relationships easier to maintain than repeating absolute paths throughout feature components.

For example:

```jsx
<Link to="../settings">Settings</Link>
```

Use `..` when intentionally moving to a parent route and test the behavior against the actual route hierarchy.

### Avoid accidental path assumptions

Relative routing depends on the route tree and the current routing context. If a destination is truly global and independent of the current hierarchy, an absolute path can be clearer:

```jsx
<Link to="/help">Help</Link>
```

## 6. Layout Routes vs URL Segments

A route can be used primarily as a layout boundary.

For example:

```jsx
<Route element={<AuthenticatedLayout />}>
  <Route path="dashboard" element={<Dashboard />} />
  <Route path="reports" element={<Reports />} />
</Route>
```

The parent has no `path`, so it does not add a URL segment. It provides shared UI/behavior around its children.

This pattern is useful for:

- authenticated application shells
- shared headers
- common providers
- error boundaries
- feature layouts

## 7. Nested Parameters

Nested routes can contain dynamic segments:

```jsx
<Route path="dashboard" element={<DashboardLayout />}>
  <Route path="reports" element={<Reports />} />
  <Route path="reports/:reportId" element={<ReportDetails />} />
</Route>
```

The URL becomes:

```text
/dashboard/reports/42
```

The detail component can read the parameter:

```jsx
import { useParams } from "react-router-dom";

function ReportDetails() {
  const { reportId } = useParams();

  return <h1>Report {reportId}</h1>;
}
```

Route parameters remain strings and must be validated/normalized according to the application's domain rules.

## 8. Parent Params and Child Routes

A child route can consume parameters defined by an ancestor route.

For example:

```jsx
<Route path="projects/:projectId" element={<ProjectLayout />}>
  <Route path="tasks" element={<Tasks />} />
  <Route path="settings" element={<ProjectSettings />} />
</Route>
```

For `/projects/42/tasks`, both the layout and child route are part of the match, and the route parameter can be read by components within that matched branch.

This is useful when the entire feature is scoped to a parent resource.

## 9. Route-Level Error Handling

A large application should not necessarily let one route failure destroy the entire application shell.

React Router supports route-level error handling through an `errorElement`:

```jsx
<Route
  path="dashboard"
  element={<DashboardLayout />}
  errorElement={<DashboardError />}
>
  <Route index element={<Overview />} />
  <Route path="reports" element={<Reports />} />
</Route>
```

The exact behavior depends on the router configuration and the type of error. Route error boundaries are especially useful for keeping failure handling close to the route that owns the UI.

Do not confuse route error handling with an ordinary component `ErrorBoundary`; they solve related but different failure boundaries.

## 10. Shared Layout vs Child Loading/Error UI

A child route may need its own loading, empty, or error state while the parent shell remains visible.

Conceptually:

```text
DashboardLayout
├── Sidebar
├── Header
└── Outlet
    └── Reports
        ├── Loading
        ├── Empty
        ├── Error
        └── Data
```

This creates a good UX boundary: global navigation remains stable while the feature-specific content changes.

## 11. Complete Dashboard Example

```jsx
import {
  Link,
  NavLink,
  Outlet,
  Route,
  Routes,
} from "react-router-dom";

function DashboardLayout() {
  return (
    <div>
      <header>
        <h1>Admin Dashboard</h1>
      </header>

      <nav aria-label="Dashboard navigation">
        <NavLink to=".">Overview</NavLink>{" "}
        <NavLink to="reports">Reports</NavLink>{" "}
        <NavLink to="settings">Settings</NavLink>
      </nav>

      <main>
        <Outlet />
      </main>
    </div>
  );
}

function Overview() {
  return <h2>Overview</h2>;
}

function Reports() {
  return (
    <section>
      <h2>Reports</h2>
      <Link to="42">Open report 42</Link>
    </section>
  );
}

function ReportDetails() {
  return <h2>Report Details</h2>;
}

function Settings() {
  return <h2>Settings</h2>;
}

export default function AppRoutes() {
  return (
    <Routes>
      <Route path="dashboard" element={<DashboardLayout />}>
        <Route index element={<Overview />} />
        <Route path="reports" element={<Reports />} />
        <Route path="reports/:reportId" element={<ReportDetails />} />
        <Route path="settings" element={<Settings />} />
      </Route>
    </Routes>
  );
}
```

Notice that `Link to="42"` inside `/dashboard/reports` produces the child detail URL `/dashboard/reports/42`.

## 12. Feature-Based Route Organization

Avoid putting a very large route tree into one file.

A feature-oriented structure can look like:

```text
src/
├── app/
│   └── router.jsx
├── features/
│   ├── dashboard/
│   │   ├── DashboardLayout.jsx
│   │   ├── Overview.jsx
│   │   └── dashboard.routes.jsx
│   └── reports/
│       ├── Reports.jsx
│       ├── ReportDetails.jsx
│       └── reports.routes.jsx
└── shared/
    └── navigation/
```

The exact structure can vary. The goal is clear ownership and a route tree that remains understandable as the application grows.

## 13. Lazy Loading and Route Boundaries

Nested routes naturally provide useful boundaries for code splitting.

A large feature can be lazy-loaded rather than shipping every screen in the initial bundle.

Depending on the React Router architecture and application setup, use the router's supported lazy/data APIs or React's `lazy`/`Suspense` patterns.

Example with React `lazy`:

```jsx
import { lazy, Suspense } from "react";

const Reports = lazy(() => import("./Reports"));

function ReportsRoute() {
  return (
    <Suspense fallback={<p>Loading reports…</p>}>
      <Reports />
    </Suspense>
  );
}
```

Do not split every tiny component simply because lazy loading exists. Split meaningful feature boundaries where bundle size and user navigation justify it.

## 14. Accessibility

Nested layouts should preserve good navigation semantics:

- use `<nav>` for navigation
- provide an accessible navigation label when there are multiple navigation regions
- use links for navigation
- provide visible keyboard focus
- expose active state clearly
- use meaningful headings
- avoid moving focus unnecessarily

If route-level focus management is implemented, move focus to an appropriate heading or main landmark after significant navigation and test it with keyboard and assistive technologies.

## 15. Common Mistakes

### Forgetting `Outlet`

The child route matches, but its UI is not rendered inside the layout.

### Giving an index route a `path`

Index routes are the default child and do not need a path.

### Repeating absolute child paths everywhere

This can make refactoring nested route trees harder. Use relative navigation where it improves maintainability.

### Making every route deeply nested

Deep hierarchy can increase mental overhead. Nest only when the URL/UI ownership relationship is meaningful.

### Duplicating layouts

If several pages share the same shell, make that shell a layout route instead of copying it into every page.

### Treating route nesting as authorization

A nested route can improve organization and UX, but it does not secure backend resources.

### Overusing lazy loading

Code splitting has overhead. Split by meaningful product/feature boundaries rather than every component.

## 16. Hands-on Labs

### Lab 1 — Dashboard Shell

Create:

```text
/dashboard
/dashboard/reports
/dashboard/settings
```

Requirements:

- shared layout
- `Outlet`
- index overview
- relative `NavLink`s
- accessible navigation

### Lab 2 — Nested Report Details

Add:

```text
/dashboard/reports/:reportId
```

Requirements:

- report list
- relative detail link
- `useParams`
- invalid/not-found handling

### Lab 3 — Parent Resource

Create:

```text
/projects/:projectId/tasks
/projects/:projectId/settings
```

Use the parent parameter as the feature scope and explain why the URL hierarchy matches the UI hierarchy.

### Lab 4 — Layout Error Boundary

Add an `errorElement` to a feature route and simulate a child route failure. Verify the appropriate fallback behavior.

### Lab 5 — Feature Code Splitting

Lazy-load the Reports feature and explain why the feature boundary is a better split point than individual buttons or small components.

## 17. Debugging Scenarios

### Scenario A — Child page is blank

Check whether the parent layout renders `<Outlet />`.

### Scenario B — `/dashboard` shows the shell but no overview

Check whether an index child route exists.

### Scenario C — `Link to="42"` goes somewhere unexpected

Inspect the current route hierarchy and relative resolution. Use an absolute path when the destination is intentionally independent.

### Scenario D — Shared header disappears when switching child pages

Check whether the header belongs to the parent layout or was incorrectly implemented inside individual children.

### Scenario E — Nested page can access data it should not access

Route hierarchy is not authorization. Verify backend authentication and resource-level authorization.

## 18. Testing Strategy

Test the rendered route behavior with a router test environment:

```jsx
render(
  <MemoryRouter initialEntries={["/dashboard/reports"]}>
    <AppRoutes />
  </MemoryRouter>
);
```

Useful assertions include:

- dashboard shell remains visible
- correct child renders inside the outlet
- `/dashboard` renders the index route
- relative links navigate to expected nested URLs
- parameterized child routes render the correct resource
- route-level fallback renders for route errors

Focus tests on user-visible behavior rather than React Router internals.

## 19. Assessment

1. What is a nested route?
2. What does `Outlet` do?
3. What is an index route?
4. Why are relative links useful?
5. What is a pathless layout route?
6. How can a child route consume a parent parameter?
7. Why can route-level error handling be useful?
8. When is route-level lazy loading valuable?
9. Why should route trees not become unnecessarily deep?
10. Does nested routing provide backend authorization?

### Answers

1. A child route rendered within a parent route hierarchy.
2. It renders the currently matched child route at that location in the parent layout.
3. The default child route rendered when its parent matches without a more specific child path.
4. They express route relationships without duplicating full absolute paths.
5. A parent route without a URL path that provides shared layout/behavior around its children.
6. React Router exposes matched route params to components in the route branch through `useParams`.
7. It keeps failures close to the route/feature that owns the UI.
8. When a meaningful feature boundary is large enough to benefit from deferred code loading.
9. Deep nesting can make routing and ownership harder to understand and maintain.
10. No. Authorization must be enforced by the backend.

## 20. Interview Questions

### Beginner

**What is nested routing?**

It models a child-page hierarchy inside a parent route, commonly allowing shared layouts.

**Why is `Outlet` important?**

It defines where the matched child route renders inside the parent layout.

### Intermediate

**What is the difference between an index route and a normal child route?**

An index route is the default child for the parent URL and does not add another path segment.

**Why use a pathless layout route?**

To share UI or behavior across multiple routes without adding a URL segment.

**How do relative links improve maintainability?**

They express relationships in the route hierarchy and can reduce duplication of full paths.

### Advanced

**How would you structure nested routes in a large application?**

Group routes by feature/domain, use layout boundaries for shared UI, keep the central router understandable, and split meaningful feature routes when code size warrants it.

**How can nested routes support code splitting?**

Feature/layout boundaries can become lazy-loading boundaries so users do not download unrelated feature code up front.

**What is the trade-off of deep route nesting?**

It can accurately model complex UI ownership, but excessive depth increases cognitive and maintenance complexity.

**How would you secure `/projects/:projectId/settings`?**

Use the route hierarchy for UX and organization, but enforce authentication and project-level authorization on the server for protected operations/data.

## 21. Production Checklist

- [ ] Shared shells are implemented as layout routes.
- [ ] Parent layouts render `Outlet`.
- [ ] Default child content uses index routes where appropriate.
- [ ] Relative links are used where they clarify route ownership.
- [ ] Absolute links are used when destinations are intentionally global.
- [ ] Nested parameters are validated as untrusted URL input.
- [ ] Child loading/error/empty states preserve the shared shell where appropriate.
- [ ] Route-level error handling is considered for meaningful feature boundaries.
- [ ] Route trees are organized by feature/domain.
- [ ] Deep nesting is used only when it represents meaningful UI/URL hierarchy.
- [ ] Code splitting targets meaningful feature boundaries.
- [ ] Navigation is keyboard and assistive-technology friendly.
- [ ] Backend authentication and authorization remain independent of route nesting.
- [ ] Nested route behavior is covered by tests.

## Final Project — Admin Portal

Build:

```text
/admin
├── overview
├── users
├── users/:userId
├── reports
├── reports/:reportId
└── settings
```

Requirements:

- shared admin layout
- sidebar with accessible `NavLink`s
- index route
- nested user and report details
- parameter validation/not-found UI
- relative navigation
- route-level error fallback
- meaningful feature code splitting
- nested route tests
- clear explanation of routing vs authorization

## Final Acceptance Criteria

- [ ] Parent/child route hierarchy is correct.
- [ ] `Outlet` is used correctly.
- [ ] Index route is implemented.
- [ ] Relative navigation works.
- [ ] Pathless layout routes are understood.
- [ ] Nested parameters are handled.
- [ ] Route-level error handling is demonstrated.
- [ ] Feature-based organization is clear.
- [ ] Code splitting strategy is justified.
- [ ] Accessibility requirements are addressed.
- [ ] Nested route tests are included.
- [ ] Security boundary is clear.

## Self Check

- [ ] I can design a nested route tree.
- [ ] I can build a shared layout with `Outlet`.
- [ ] I know when to use an index route.
- [ ] I can use relative links safely.
- [ ] I understand pathless layout routes.
- [ ] I can combine nested routes with route parameters.
- [ ] I understand route-level error handling.
- [ ] I can identify sensible code-splitting boundaries.
- [ ] I know nested routing does not enforce authorization.

## Day 44 Outcome

You can now model complex React Router UI hierarchies with shared layouts, index routes, relative navigation, nested parameters, route-level error boundaries, feature organization, and scalable code-splitting boundaries.

**Next:** Day 45 — Protected Routes and Authentication Guards.

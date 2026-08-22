---
title: Lazy Loading Routes
slug: day-046-lazy-loading-routes
dayLabel: Day 46
level: Intermediate
estimatedMinutes: 150
order: 46
track: react
---
# Day 46 [Intermediate]: Lazy Loading Routes

## Goal

Learn how route-level code splitting works in React, how `lazy` and `Suspense` work together, how to choose useful loading boundaries, how to handle chunk failures, and how to measure whether lazy loading actually improves application performance.

## Prerequisites

- Day 41: React Router setup
- Day 44: Nested routes and layouts
- Day 45: Protected routes
- React components and dynamic imports
- Basic browser DevTools knowledge

## Learning Outcomes

By the end of this lesson, you can:

- explain code splitting and route-level lazy loading
- use `lazy(() => import(...))` correctly
- place `Suspense` at an appropriate route boundary
- distinguish initial bundle size from total downloaded code
- choose eager vs lazy routes based on user journeys
- combine lazy routes with protected routes and layouts
- design useful loading fallbacks
- handle lazy chunk/network failures with an Error Boundary
- understand named-export limitations with `React.lazy`
- reason about prefetching and when not to use it
- verify chunks with browser DevTools
- test lazy routes without coupling tests to implementation details
- avoid common performance and UX mistakes

## 1. Why Lazy Loading Exists

A large React application can contain many screens:

```text
Home
Dashboard
Reports
Analytics
Admin
Billing
Settings
Help
```

If every screen is included in the initial JavaScript bundle, the browser may download and parse code that the user never visits.

Code splitting divides application code into independently loaded chunks. Route-level lazy loading makes a route's code available when that route is needed.

The goal is not simply "fewer files". The goal is to improve the user's loading experience by avoiding unnecessary work on the critical path.

## 2. `React.lazy`

`lazy` accepts a function that dynamically imports a module:

```jsx
import { lazy } from "react";

const ReportsPage = lazy(() => import("./pages/ReportsPage"));
```

The import returns a Promise. React can then load the component when it is first rendered.

The imported module should provide a default export:

```jsx
export default function ReportsPage() {
  return <h1>Reports</h1>;
}
```

### Named exports

If the module only has a named export:

```jsx
export function ReportsPage() {
  return <h1>Reports</h1>;
}
```

adapt it explicitly:

```jsx
const ReportsPage = lazy(() =>
  import("./pages/ReportsPage").then((module) => ({
    default: module.ReportsPage,
  }))
);
```

For consistency, default exports are often simpler for route components.

## 3. `Suspense` Is the Loading Boundary

A lazy component can suspend while its code is being loaded. Wrap it in `Suspense`:

```jsx
import { Suspense } from "react";

<Suspense fallback={<p>Loading reports...</p>}>
  <ReportsPage />
</Suspense>
```

The fallback is not the application error state. It represents the temporary loading state while the component's code is unavailable.

## 4. Route-Level Lazy Loading

A typical route setup is:

```jsx
import { lazy, Suspense } from "react";
import { Route, Routes } from "react-router-dom";
import HomePage from "./pages/HomePage";

const ReportsPage = lazy(() => import("./pages/ReportsPage"));
const SettingsPage = lazy(() => import("./pages/SettingsPage"));

export default function AppRoutes() {
  return (
    <Suspense fallback={<p>Loading page...</p>}>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/reports" element={<ReportsPage />} />
        <Route path="/settings" element={<SettingsPage />} />
      </Routes>
    </Suspense>
  );
}
```

Home remains eager while reports and settings are deferred.

## 5. Choosing the `Suspense` Boundary

You can place `Suspense` around the entire route tree:

```jsx
<Suspense fallback={<FullPageLoader />}>
  <Routes>...</Routes>
</Suspense>
```

Or around a specific feature area:

```jsx
<DashboardLayout>
  <Suspense fallback={<SectionLoader />}>
    <ReportsPage />
  </Suspense>
</DashboardLayout>
```

The choice affects UX.

A full-page fallback is appropriate when the entire page must wait. A smaller boundary can preserve shared navigation/header UI while only the changing feature area shows a loader.

With nested routes, the second approach is often a better UX when the shell should remain stable.

## 6. Lazy Routes + Nested Layouts

Day 44 introduced shared layouts. Combine them with lazy feature pages:

```jsx
const Reports = lazy(() => import("./Reports"));
const Settings = lazy(() => import("./Settings"));

<Route path="dashboard" element={<DashboardLayout />}>
  <Route index element={<Overview />} />
  <Route
    path="reports"
    element={
      <Suspense fallback={<SectionLoader />}>
        <Reports />
      </Suspense>
    }
  />
  <Route
    path="settings"
    element={
      <Suspense fallback={<SectionLoader />}>
        <Settings />
      </Suspense>
    }
  />
</Route>
```

The dashboard shell can remain visible while a child feature chunk loads.

## 7. Lazy Loading + Protected Routes

Lazy loading does not replace authentication or authorization.

A protected lazy route can be structured like this:

```jsx
const AdminPage = lazy(() => import("./pages/AdminPage"));

<Route
  path="/admin"
  element={
    <ProtectedRoute>
      <Suspense fallback={<PageLoader />}>
        <AdminPage />
      </Suspense>
    </ProtectedRoute>
  }
/>
```

The guard decides whether the user may enter the route. `Suspense` handles loading the route component.

For sensitive applications, remember that client-side lazy loading is not a security boundary. Server-side authorization remains mandatory.

## 8. Lazy Loading Is Not the Same as Data Loading

These are separate operations:

```text
Route navigation
      ↓
Load JavaScript chunk
      ↓
Render component
      ↓
Fetch route data
      ↓
Render data
```

A page can have:

- chunk loading state
- data loading state
- empty state
- API error state
- authorization state

Do not use a single generic loader to hide all of these distinct states.

## 9. Eager vs Lazy: How to Decide

Do not lazy-load everything automatically.

### Good lazy candidates

- admin sections
- analytics
- large reports
- infrequently visited settings
- heavy editors
- feature areas used by a small percentage of users

### Good eager candidates

- application shell
- landing page
- primary first-use route
- tiny components needed immediately

The correct boundary depends on real navigation behavior and bundle cost.

## 10. Initial Bundle vs Total Download

Lazy loading often reduces the amount of JavaScript required for the first route, but the user may eventually download the same overall application code if they visit every feature.

Think in terms of:

```text
Initial cost ↓
Later route cost ↑
Total eventual code ≈ application code
```

The benefit is reducing work on the critical path, not magically removing code.

## 11. Chunk Loading Failures

A lazy import can fail because of:

- temporary network failure
- deployment/version mismatch
- stale browser HTML referencing removed chunks
- CDN problems
- offline state

`Suspense` does not provide an error UI for a rejected dynamic import. Use an Error Boundary around the lazy route/feature.

A simple class-based Error Boundary:

```jsx
import React from "react";

class ChunkErrorBoundary extends React.Component {
  state = { hasError: false };

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  componentDidCatch(error, info) {
    console.error("Lazy route failed", error, info);
  }

  render() {
    if (this.state.hasError) {
      return (
        <section role="alert">
          <h2>Page could not be loaded</h2>
          <button onClick={() => window.location.reload()}>
            Reload page
          </button>
        </section>
      );
    }

    return this.props.children;
  }
}
```

In a production application, log the failure to your monitoring system and provide a recovery path appropriate to the failure.

## 12. Retry Strategy and Deployment Awareness

Blindly retrying a failed chunk forever is not a good strategy.

If a deployment changed asset names, a browser may have stale HTML while the server now exposes a new chunk graph. A single controlled retry or full reload can sometimes recover, but the underlying deployment should also provide stable asset caching/versioning practices.

For example:

```text
Old HTML → old chunk URL → chunk missing
                 ↓
            controlled reload
                 ↓
New HTML → new chunk URL
```

Do not hide persistent failures behind infinite retries.

## 13. Prefetching

Prefetching can reduce the delay when a user is likely to visit a route soon.

Conceptually:

```jsx
const loadReports = () => import("./pages/ReportsPage");

const ReportsPage = lazy(loadReports);
```

You can call the import at an intentional time, such as after the initial interaction or when a navigation is highly likely, depending on the bundler and application architecture.

Prefetching is a trade-off:

- possible faster navigation later
- extra network and cache usage now

Do not prefetch every route simply because it is technically possible.

## 14. Measuring the Benefit

Use browser DevTools and application performance tooling to verify the result.

Look for:

- initial JavaScript transfer size
- number/size of route chunks
- timing of chunk requests
- parse/evaluation work
- navigation latency
- cache behavior
- user-visible loading time

A successful code split should be measurable. If splitting creates dozens of tiny chunks and increases navigation overhead without improving the critical path, reconsider the boundaries.

## 15. Complete Practical Example

```jsx
import { lazy, Suspense } from "react";
import { Route, Routes } from "react-router-dom";
import HomePage from "./pages/HomePage";
import DashboardLayout from "./pages/DashboardLayout";
import Overview from "./pages/Overview";
import ProtectedRoute from "./auth/ProtectedRoute";

const ReportsPage = lazy(() => import("./pages/ReportsPage"));
const SettingsPage = lazy(() => import("./pages/SettingsPage"));

function PageLoader() {
  return <p role="status">Loading page...</p>;
}

export default function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />

      <Route
        path="/dashboard"
        element={
          <ProtectedRoute>
            <DashboardLayout />
          </ProtectedRoute>
        }
      >
        <Route index element={<Overview />} />
        <Route
          path="reports"
          element={
            <Suspense fallback={<PageLoader />}>
              <ReportsPage />
            </Suspense>
          }
        />
        <Route
          path="settings"
          element={
            <Suspense fallback={<PageLoader />}>
              <SettingsPage />
            </Suspense>
          }
        />
      </Route>
    </Routes>
  );
}
```

This example demonstrates the progression from previous lessons:

```text
Day 44 → nested layout
Day 45 → protected route
Day 46 → lazy child routes
```

## 16. Common Mistakes

### Lazy-loading every component

This can create excessive chunks and request overhead.

### Forgetting `Suspense`

Lazy components need a Suspense boundary that can display while they load.

### Treating Suspense as an error boundary

A loading fallback does not catch rejected dynamic imports.

### No recovery for chunk failures

Production applications need an error/recovery path.

### Using lazy loading as security

Code splitting is a performance technique, not authorization.

### Ignoring the first route

Lazy-loading the first screen can make the application feel slower even if the overall bundle is smaller.

### Over-prefetching

Prefetching can waste bandwidth and battery, especially on constrained networks.

### Measuring only bundle file count

More chunks do not automatically mean better performance. Measure transfer, parsing, execution and user-perceived navigation.

## 17. Hands-on Labs

### Lab 1 — Basic Route Splitting

Keep Home eager and lazy-load:

```text
/reports
/settings
```

Verify separate chunks in DevTools Network.

### Lab 2 — Nested Dashboard

Build:

```text
/dashboard
/dashboard/reports
/dashboard/settings
```

Keep the dashboard shell visible while child chunks load.

### Lab 3 — Protected Lazy Admin

Build:

```text
/admin/users
/admin/reports
```

Requirements:

- protected route
- lazy route components
- loading fallback
- forbidden state

### Lab 4 — Chunk Failure

Simulate a failed dynamic import and verify that an Error Boundary displays a recovery action.

### Lab 5 — Measure Before/After

Compare initial JavaScript transfer and route navigation before and after splitting. Record what improved and what became slower.

### Lab 6 — Prefetch Experiment

Implement prefetching for one highly probable next route. Compare navigation timing with and without prefetching and document the bandwidth trade-off.

## 18. Debugging Scenarios

### Scenario A — Page crashes while navigating

Check the browser console and Error Boundary. A rejected lazy import is different from a Suspense loading state.

### Scenario B — Loader appears forever

Check the Network tab for a failed or stalled chunk request and inspect whether the dynamic import path is correct.

### Scenario C — Lazy component has no default export

Either change the module to a default export or map the named export to the shape expected by `lazy`.

### Scenario D — Initial page became slower

You may have lazy-loaded a critical first-use route. Compare the initial chunk and navigation timing.

### Scenario E — Too many network requests

Inspect chunk boundaries. Tiny lazy components can create unnecessary request overhead.

### Scenario F — New deployment breaks old browser tabs

Investigate stale HTML/chunk version mismatch and use controlled reload/recovery plus appropriate asset-cache deployment practices.

## 19. Testing Strategy

Test user-visible behavior rather than whether `React.lazy` was called.

Example route test:

```jsx
render(
  <MemoryRouter initialEntries={["/reports"]}>
    <AppRoutes />
  </MemoryRouter>
);
```

Useful assertions include:

- loading UI can appear while the chunk is unresolved
- the reports page eventually renders
- a failed chunk shows recovery UI
- protected lazy routes still enforce the auth guard
- the eager home route renders without the reports chunk

For deterministic tests, mock dynamic imports/network boundaries according to your test runner rather than relying on real network requests.

## 20. Assessment

1. What does route-level lazy loading optimize?
2. What does `React.lazy` return?
3. Why is `Suspense` needed?
4. What is the difference between a loading fallback and an Error Boundary?
5. Why should some routes remain eager?
6. Does lazy loading reduce total eventual application code?
7. What can cause a chunk-load failure after deployment?
8. Why can prefetching be harmful?
9. How should performance improvements be verified?
10. Is lazy loading a security mechanism?

### Answers

1. It can reduce initial JavaScript work by deferring non-critical route code.
2. A lazy component whose code is loaded through a dynamic import when needed.
3. It provides fallback UI while the lazy component is suspended during loading.
4. Suspense handles the waiting state; an Error Boundary handles rendering errors such as a rejected lazy import.
5. Critical first-use routes should not incur unnecessary navigation-time loading.
6. Not necessarily. Users may eventually download the same feature code if they visit those routes.
7. Network failures, stale deployments, CDN problems, offline state, or missing assets.
8. It spends network/cache resources before the route is actually needed.
9. Measure transfer size, request timing, parse/evaluation work and user-perceived navigation performance.
10. No. It is a performance optimization.

## 21. Interview Questions

### Beginner

**What is route-level lazy loading?**

Loading a route's JavaScript only when the route is needed instead of including all route code in the initial bundle.

**Why use `Suspense`?**

To show fallback UI while a lazy component's code is loading.

### Intermediate

**How do you combine lazy loading with protected routes?**

Keep authorization in the guard and wrap the lazy component in an appropriate `Suspense` boundary.

**Why not lazy-load Home?**

If Home is the first-use route, adding a chunk request can delay the initial experience.

**What is the difference between code loading and data loading?**

Code loading retrieves JavaScript needed to render a component; data loading retrieves the resource data that component displays.

### Advanced

**How would you recover from a chunk-load failure?**

Use an Error Boundary, log the failure, offer a controlled retry/reload, and ensure deployment/cache practices do not continually serve stale chunk references.

**How would you decide where to split a large application?**

Use meaningful feature/navigation boundaries, bundle analysis, actual usage patterns, and performance measurements rather than arbitrary component boundaries.

**When is prefetching appropriate?**

When navigation probability is high enough that the latency reduction justifies the extra network/cache cost.

**Can lazy loading improve Core Web Vitals automatically?**

No. It can help reduce initial work, but the actual effect depends on bundle composition, rendering, network conditions, and application architecture. Measure the result.

## 22. Production Checklist

- [ ] Critical first-use routes remain appropriately eager.
- [ ] Heavy/infrequent feature routes are candidates for lazy loading.
- [ ] Dynamic imports resolve to valid route modules.
- [ ] `Suspense` boundaries provide meaningful loading UI.
- [ ] Lazy chunk failures have an Error Boundary/recovery path.
- [ ] Loading UI is accessible (`role="status"` where appropriate).
- [ ] Data loading and code loading are treated as separate states.
- [ ] Protected routes still enforce authentication/authorization.
- [ ] Prefetching is based on measured/high-probability navigation.
- [ ] Chunk boundaries are reviewed for excessive fragmentation.
- [ ] DevTools/bundle analysis is used to verify the optimization.
- [ ] Deployment and asset caching support versioned chunks safely.
- [ ] Lazy route behavior is tested.
- [ ] Performance is measured before and after the change.

## Final Project — Performance-Aware Admin Portal

Build an admin portal with:

```text
/
/dashboard
/dashboard/analytics
/dashboard/reports
/admin/users
/admin/settings
```

Requirements:

- Home eager
- analytics/reports lazy
- admin features lazy
- nested dashboard layout
- protected admin routes
- route-level Suspense fallback
- lazy chunk Error Boundary
- accessible loading states
- one justified prefetch optimization
- DevTools before/after measurements
- tests for successful and failed lazy navigation

## Final Acceptance Criteria

- [ ] `React.lazy` and dynamic import are understood.
- [ ] Suspense boundaries are correctly placed.
- [ ] Eager vs lazy route decisions are justified.
- [ ] Nested layouts remain usable while child chunks load.
- [ ] Protected routes and lazy loading work together.
- [ ] Chunk-load failures have recovery behavior.
- [ ] Named export limitations are understood.
- [ ] Prefetch trade-offs are understood.
- [ ] DevTools measurement is completed.
- [ ] Testing strategy covers success/loading/failure behavior.
- [ ] Security is not delegated to code splitting.

## Self Check

- [ ] I can explain code splitting.
- [ ] I can create a lazy route with `lazy(() => import(...))`.
- [ ] I can place `Suspense` at an appropriate boundary.
- [ ] I can decide which routes should remain eager.
- [ ] I can combine lazy routes with protected routes.
- [ ] I know how chunk failures differ from loading states.
- [ ] I understand prefetching trade-offs.
- [ ] I can verify chunks in DevTools.
- [ ] I can test lazy route behavior.

## Day 46 Outcome

You can now design performance-aware route-level code splitting with React `lazy`, `Suspense`, nested layouts, protected routes, error recovery, prefetching decisions, measurement, and production deployment considerations.

**Next:** Day 47 — Advanced Code Splitting and Performance Optimization.

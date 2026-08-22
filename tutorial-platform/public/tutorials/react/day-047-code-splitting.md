---
title: Code Splitting
slug: day-047-code-splitting
dayLabel: Day 47
level: Advanced
estimatedMinutes: 150
order: 47
track: react
---
# Day 47 [Advanced]: Code Splitting

## Goal

Move beyond route-level lazy loading and design effective application-wide code-splitting strategies for heavy components, optional features, dynamic imports, Suspense boundaries, caching, prefetching, and measurable performance improvements.

## Prerequisites

- Day 44: Nested routes
- Day 45: Protected routes
- Day 46: Lazy loading routes
- React `lazy` and `Suspense`
- Basic browser DevTools and production-build knowledge

## Learning Outcomes

By the end of this lesson, you can:

- distinguish route splitting from component/feature splitting
- identify meaningful split points
- use `React.lazy` for optional UI
- use dynamic `import()` for non-component functionality
- defer heavy libraries until a feature is used
- place local Suspense boundaries without damaging UX
- understand shared/vendor chunk trade-offs
- reason about caching and hashed assets
- prefetch selectively
- measure bundle and runtime impact
- diagnose over-splitting and chunk-loading problems
- design a production-oriented code-splitting strategy

## 1. What Code Splitting Actually Solves

Code splitting divides JavaScript into separately loadable chunks so the browser does not have to download, parse, and execute every feature before the user can start using the current screen.

A large application might contain:

```text
Core application
├── Dashboard
├── Analytics
├── Rich text editor
├── PDF export
├── Charts
├── Admin tools
└── Rarely used configuration screens
```

Without useful split points, all of these can contribute to the initial JavaScript cost.

With code splitting:

```text
Initial visit
   ↓
Core chunk
   ↓
User opens Analytics
   ↓
Analytics chunk
   ↓
User opens Export
   ↓
Export utility chunk
```

The goal is **not** to maximize the number of chunks. The goal is to minimize unnecessary critical-path work while keeping later navigation responsive.

## 2. Route Splitting vs Component Splitting

### Route-level splitting

Day 46 focused on loading an entire route when it is needed:

```jsx
const ReportsPage = lazy(() => import("./ReportsPage"));
```

This is a natural boundary because navigation already creates a user journey boundary.

### Component-level splitting

Sometimes a page is immediately needed, but one part of it is expensive or rarely opened:

```jsx
const AnalyticsChart = lazy(() => import("./AnalyticsChart"));
```

For example:

```text
Dashboard
├── KPI cards          ← immediate
├── Recent activity    ← immediate
└── Analytics chart    ← optional/heavy
```

Component splitting can defer the chart without delaying the rest of the dashboard.

## 3. What Makes a Good Split Point?

Good candidates usually have one or more of these properties:

- large dependency graph
- expensive library dependency
- low usage frequency
- optional interaction
- clear feature boundary
- meaningful navigation boundary
- expensive editor/viewer/chart

Examples:

```text
PDF viewer
Rich text editor
Charting library
Gantt chart
CSV/XLSX export
Map visualization
Admin analytics
```

Do not split a tiny button simply because it can technically be lazy-loaded.

## 4. `React.lazy` for Optional Components

```jsx
import { lazy, Suspense, useState } from "react";

const AnalyticsChart = lazy(() => import("./AnalyticsChart"));

export default function Dashboard() {
  const [showAnalytics, setShowAnalytics] = useState(false);

  return (
    <section>
      <h1>Dashboard</h1>

      <button onClick={() => setShowAnalytics(true)}>
        Open Analytics
      </button>

      {showAnalytics && (
        <Suspense fallback={<p role="status">Loading analytics…</p>}>
          <AnalyticsChart />
        </Suspense>
      )}
    </section>
  );
}
```

The chart code is not needed until the feature is rendered.

## 5. Dynamic `import()` for Non-UI Code

`React.lazy` is for components. Native JavaScript dynamic `import()` is useful for utilities and libraries.

For example, an export feature can load its implementation only when requested:

```jsx
async function handleExport(rows) {
  const { exportCsv } = await import("./exportCsv");
  exportCsv(rows);
}
```

This is especially useful for functionality that users may never invoke during a session.

### Component vs utility

```text
UI component     → React.lazy + Suspense
Utility/library  → dynamic import() + async handling
```

Do not use `React.lazy` for ordinary helper functions.

## 6. Conditional Loading Correctly

A common mistake is to dynamically import code during render:

```jsx
// Avoid doing arbitrary imports during render.
```

Instead, let the component lifecycle or user interaction determine when the feature should be loaded.

For a utility:

```jsx
async function handleOpenExport() {
  const module = await import("./exportUtils");
  module.openExportDialog();
}
```

For a component, render the lazy component behind a state-controlled condition:

```jsx
{isOpen && (
  <Suspense fallback={<FeatureLoader />}>
    <ExportPanel />
  </Suspense>
)}
```

The distinction is important because code loading should correspond to a meaningful product event.

## 7. Local Suspense Boundaries

A broad Suspense boundary can make unrelated UI disappear behind one loader:

```jsx
<Suspense fallback={<FullPageLoader />}>
  <Dashboard />
</Suspense>
```

A local boundary can preserve stable content:

```jsx
<div className="dashboard">
  <Header />
  <KpiCards />

  <Suspense fallback={<ChartSkeleton />}>
    <AnalyticsChart />
  </Suspense>
</div>
```

This creates a better UX when only the optional feature is waiting.

### Loading UI should preserve layout

Prefer a skeleton or reserved area that approximately matches the final component's dimensions. This can reduce layout movement while the chunk arrives.

## 8. Lazy Loading and User Interaction

Interaction-driven loading is powerful for features such as:

```text
Click "Advanced filters"
        ↓
Load filter-builder chunk
        ↓
Render filter builder
```

```text
Click "Export"
        ↓
Load export library
        ↓
Generate file
```

```text
Open "Analytics"
        ↓
Load charting library
        ↓
Render charts
```

This is often better than downloading expensive feature dependencies for every user.

## 9. Heavy Third-Party Libraries

Sometimes the component itself is small but its dependency is large.

For example:

```jsx
const AnalyticsChart = lazy(() => import("./AnalyticsChart"));
```

If `AnalyticsChart` imports a large charting library, the dependency can move into a deferred chunk.

This is useful when the chart is optional.

However, verify the build output. Tree-shaking, shared dependencies, and bundler configuration can affect where code actually lands.

## 10. Shared and Vendor Chunks

Modern bundlers may create shared chunks for dependencies used by multiple features.

Conceptually:

```text
                    ┌── Dashboard chunk
React/runtime ──────┼── Reports chunk
                    └── Analytics chunk

Shared dependency → reusable shared chunk
```

This can avoid downloading the same library repeatedly, but the exact chunk graph depends on the bundler.

Do not assume that "one dynamic import = one independent file". Inspect the production build.

## 11. Over-Splitting

More chunks are not automatically better.

If an application creates hundreds of tiny chunks:

```text
Button A → chunk
Button B → chunk
Card A   → chunk
Card B   → chunk
Icon A   → chunk
...
```

navigation may require many requests and additional scheduling/parsing overhead.

Prefer meaningful boundaries:

```text
Analytics feature → chunk
Export feature    → chunk
Admin feature     → chunk
```

The right number of chunks depends on application size, browser behavior, network conditions, caching, and navigation patterns.

## 12. Prefetching and Preloading

Sometimes a feature is not needed immediately but is highly likely to be needed soon.

For example, after the user opens a dashboard, Analytics may be the next likely destination.

A bundler/application can prefetch that feature intentionally.

Conceptually:

```jsx
const loadAnalytics = () => import("./AnalyticsPanel");
```

The application can trigger the import at a deliberate time rather than waiting for the final click.

### Prefetch vs preload

- **Prefetch:** generally prepares resources for likely future use.
- **Preload:** signals that a resource is important to the current page and should be fetched with higher priority.

Exact behavior depends on the browser and build tooling. Use these mechanisms intentionally; unnecessary high-priority downloads can hurt the current page.

## 13. Long-Term Caching

Production builds commonly generate content-hashed assets:

```text
app.a31f8.js
analytics.91cd2.js
export.2fa90.js
```

If `analytics.91cd2.js` does not change between deployments, a browser can reuse its cached copy.

This means code splitting can improve returning-user performance as well as first-use behavior.

### Important deployment principle

HTML/app entry files should generally be revalidated more aggressively than immutable hashed assets. A deployment must also handle stale clients that reference chunks from an older version.

## 14. Chunk Load Failures

A lazy chunk can fail because of:

- network interruption
- offline mode
- CDN failure
- stale HTML
- deployment/version mismatch
- deleted asset

`Suspense` handles the waiting state, not a rejected dynamic import.

Use an Error Boundary for component lazy loading:

```jsx
class ChunkErrorBoundary extends React.Component {
  state = { hasError: false };

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  render() {
    if (this.state.hasError) {
      return (
        <section role="alert">
          <h2>Feature could not be loaded</h2>
          <button onClick={() => window.location.reload()}>
            Reload
          </button>
        </section>
      );
    }

    return this.props.children;
  }
}
```

For production, log the failure and provide an appropriate recovery path.

Do not implement infinite automatic retries.

## 15. Bundle Analysis

A code-splitting decision should be evidence-driven.

Useful questions:

- What is in the initial bundle?
- Which dependency is responsible for the size?
- Which route/feature downloads it?
- Is the dependency shared by critical and optional features?
- How large is the deferred chunk?
- Is the feature actually used often enough to justify eager loading?

Use your build tool's bundle analyzer or generated statistics rather than guessing from source code.

## 16. Performance Metrics

Measure before and after.

Useful measurements include:

### Network

- initial JavaScript transfer
- compressed and uncompressed asset size
- chunk request duration
- cache hit/miss behavior

### Runtime

- JavaScript parse/evaluation cost
- main-thread work
- rendering cost

### User experience

- time until useful UI
- navigation response time
- loading duration for deferred features
- layout stability

Do not use an old metric such as TTI as the only success criterion. Modern performance analysis should consider the actual user journey and current browser performance signals.

## 17. Before vs After Example

Suppose the initial application loads:

```text
Initial JS: 1.8 MB compressed
Analytics library: 500 KB
Export library: 350 KB
PDF viewer: 400 KB
```

If all optional features are deferred, the first route might need only:

```text
Initial JS: 550 KB compressed
```

Later:

```text
Analytics → +500 KB when opened
Export    → +350 KB when used
PDF       → +400 KB when opened
```

The exact result depends on the build and shared dependencies, but the principle is important: **move unnecessary work away from the critical path instead of pretending the code disappeared.**

## 18. End-to-End Example: Performance-Aware Dashboard

```jsx
import { lazy, Suspense, useState } from "react";

const AnalyticsPanel = lazy(() => import("./AnalyticsPanel"));
const AuditLogPanel = lazy(() => import("./AuditLogPanel"));

function PanelLoader({ label }) {
  return (
    <div role="status" aria-label={`Loading ${label}`}>
      Loading {label}…
    </div>
  );
}

export default function Dashboard() {
  const [panel, setPanel] = useState(null);

  return (
    <main>
      <h1>Dashboard</h1>

      <button onClick={() => setPanel("analytics")}>
        Analytics
      </button>
      <button onClick={() => setPanel("audit")}>
        Audit Logs
      </button>

      {panel === "analytics" && (
        <Suspense fallback={<PanelLoader label="analytics" />}>
          <AnalyticsPanel />
        </Suspense>
      )}

      {panel === "audit" && (
        <Suspense fallback={<PanelLoader label="audit logs" />}>
          <AuditLogPanel />
        </Suspense>
      )}
    </main>
  );
}
```

This keeps the dashboard shell available while optional feature code is loaded only when requested.

## 19. Dynamic Utility Example: Export Center

```jsx
export async function exportReport(rows) {
  const { generateCsv } = await import("./csvExporter");
  return generateCsv(rows);
}
```

Usage:

```jsx
async function handleExport() {
  try {
    const file = await exportReport(rows);
    downloadFile(file);
  } catch (error) {
    console.error("Export failed", error);
  }
}
```

Here the export library is not part of the normal dashboard interaction path.

## 20. Common Mistakes

### Mistake 1 — Lazy-loading everything

This creates unnecessary loading boundaries and can make common interactions slower.

### Mistake 2 — Splitting tiny components

A split point should have enough value to justify its loading overhead.

### Mistake 3 — One giant Suspense boundary

A small optional feature should not necessarily hide the entire application behind a loader.

### Mistake 4 — No chunk failure handling

A failed chunk can leave users with an unusable feature unless recovery is provided.

### Mistake 5 — Treating code splitting as security

Lazy-loaded admin code is not authorization. The backend must enforce permissions.

### Mistake 6 — Assuming dynamic import always creates an isolated chunk

Bundler optimizations and shared dependencies affect the final graph.

### Mistake 7 — Optimizing without measurement

Always compare real build output and user-facing performance.

### Mistake 8 — Aggressive preloading

Preloading optional code can compete with resources required by the current page.

## 21. Hands-on Labs

### Lab 1 — Heavy Chart

Create a dashboard with an optional chart.

Requirements:

- lazy-load chart component
- local Suspense boundary
- stable placeholder
- inspect resulting chunk

### Lab 2 — Export Utility

Create an Export button that dynamically imports CSV generation code only when clicked.

Requirements:

- loading state
- error state
- successful download

### Lab 3 — Feature Modal

Lazy-load a large recommendations/configuration modal.

Requirements:

- modal code is not required for initial dashboard
- local fallback
- close/reopen behavior works

### Lab 4 — Over-Splitting Experiment

Create many tiny lazy components, inspect the build, then consolidate them into meaningful feature chunks. Document the trade-off.

### Lab 5 — Cache Experiment

Build production output twice, change only one feature, and inspect which hashed chunks changed.

### Lab 6 — Performance Report

Record before/after:

```text
Initial JS transfer
Initial request count
Largest deferred chunk
Feature navigation latency
Cache behavior
```

Explain whether the optimization was worth the added complexity.

## 22. Debugging Scenarios

### Scenario A — Chart loading blocks dashboard

Move the Suspense boundary closer to the optional chart instead of wrapping the whole dashboard.

### Scenario B — Export code still appears in initial bundle

Inspect imports and shared dependencies. A dependency may still be reachable from an eager module.

### Scenario C — Feature creates too many chunks

Consolidate related components and reconsider split boundaries.

### Scenario D — New deployment causes chunk errors

Check stale HTML, asset versioning, CDN caching, and controlled reload behavior.

### Scenario E — Prefetch increases initial load time

The prefetch may be competing for bandwidth with critical resources. Remove or delay it unless measurement supports it.

### Scenario F — Lazy component fails but Suspense stays visible

Add an Error Boundary. Suspense is not a replacement for error handling.

## 23. Testing Strategy

Test behavior rather than implementation details.

For a lazy component:

```jsx
render(<Dashboard />);

await user.click(screen.getByRole("button", { name: /analytics/i }));

expect(screen.getByRole("status")).toBeInTheDocument();
```

Then wait for the loaded UI according to your testing library.

For dynamic utilities, mock the module boundary so tests remain deterministic.

Test at least:

- optional feature opens successfully
- loading UI appears where appropriate
- failed chunk produces recovery UI
- eager UI remains usable while optional code loads
- export utility loads only when requested

Avoid asserting exact generated chunk filenames in ordinary component tests; those are build artifacts and can change.

## 24. Assessment

1. What is the difference between route splitting and component splitting?
2. When should you use `React.lazy`?
3. When should you use dynamic `import()` directly?
4. Why are local Suspense boundaries useful?
5. What is over-splitting?
6. Why can shared chunks exist even with dynamic imports?
7. What is the difference between prefetch and preload?
8. Why are hashed assets useful?
9. How should chunk failures be handled?
10. How do you prove code splitting improved performance?

### Answers

1. Route splitting defers route code; component splitting defers optional/heavy UI within a route.
2. For lazily rendered React components.
3. For utilities, libraries, and other non-component modules loaded asynchronously.
4. They prevent an optional feature from unnecessarily blocking unrelated UI.
5. Creating more chunks than the application's navigation and performance characteristics justify.
6. Bundlers can extract dependencies shared by multiple chunks.
7. Prefetch prepares likely future resources; preload prioritizes resources needed for the current page.
8. Content hashes allow unchanged assets to remain cached across deployments.
9. Use an Error Boundary/recovery strategy and operational logging; avoid infinite retries.
10. Compare production build output and real performance measurements before and after.

## 25. Interview Questions

### Beginner

**What is code splitting?**

Dividing application code into independently loaded pieces so unnecessary code is not required on the initial path.

**What is a split point?**

A boundary at which code can be loaded separately, such as a route or optional heavy feature.

### Intermediate

**Why use component-level splitting?**

To defer an expensive optional section without delaying the rest of an already-needed page.

**Why is `Suspense` placement important?**

The boundary determines how much UI is replaced by the fallback while the code loads.

**Why can too many chunks hurt performance?**

They can increase request scheduling, parsing, and navigation overhead.

### Advanced

**How would you choose split points in a production application?**

Analyze dependency size, user navigation frequency, critical-path cost, cache behavior, and measured performance. Prefer meaningful product/feature boundaries.

**How can code splitting improve returning-user performance?**

Stable hashed chunks can remain cached, so unchanged feature code does not need to be downloaded again after every deployment.

**How would you handle a chunk mismatch after deployment?**

Use versioned/hashed assets, appropriate cache policy, observability, and a controlled recovery/reload path for stale clients.

**Why might a dynamic import fail to reduce initial bundle size?**

The module may still be reachable through an eager import, or shared dependencies may remain in the initial graph.

**How would you prove a code-splitting optimization was worthwhile?**

Compare production builds and user journeys: initial transfer, request count, main-thread work, route/feature latency, caching, and relevant real-user performance signals.

## 26. Production Checklist

- [ ] Split points are based on meaningful route/feature boundaries.
- [ ] Critical first-use code remains eager where appropriate.
- [ ] Heavy optional components are candidates for lazy loading.
- [ ] Non-UI utilities use dynamic `import()` appropriately.
- [ ] Suspense boundaries preserve stable UI.
- [ ] Loading placeholders minimize layout movement.
- [ ] Chunk-load failures have recovery behavior.
- [ ] Shared dependencies are considered when analyzing bundles.
- [ ] Over-splitting has been evaluated.
- [ ] Prefetch/preload is used only when justified.
- [ ] Production assets use an appropriate cache/versioning strategy.
- [ ] Bundle analysis is part of the optimization process.
- [ ] Performance is measured before and after changes.
- [ ] Tests cover success/loading/failure behavior.
- [ ] Code splitting is not treated as an authorization mechanism.

## Final Project — Performance-Aware SaaS Dashboard

Build:

```text
Dashboard
├── KPI cards
├── Analytics
├── Audit logs
├── Export center
├── PDF viewer
└── Advanced filters
```

Requirements:

- KPI cards remain eager
- Analytics is component-lazy
- Audit logs are component-lazy
- Export center uses dynamic `import()` for its utility/library
- PDF viewer is lazy-loaded
- Advanced filters load on user interaction
- each optional area has a local fallback
- chunk failures have recovery UI
- one justified prefetch strategy
- production build is analyzed
- before/after performance report is documented
- tests cover successful and failed feature loading

## Final Acceptance Criteria

- [ ] Route and component splitting are clearly distinguished.
- [ ] `React.lazy` is used correctly for lazy components.
- [ ] Dynamic `import()` is used for non-UI functionality.
- [ ] Split points are justified by product/performance needs.
- [ ] Suspense boundaries are appropriately scoped.
- [ ] Shared chunk behavior is understood.
- [ ] Over-splitting risks are understood.
- [ ] Caching strategy is understood.
- [ ] Chunk failures have recovery behavior.
- [ ] Performance is measured rather than assumed.
- [ ] Tests cover important loading/failure behavior.
- [ ] Security boundaries remain clear.

## Self Check

- [ ] I can identify a useful component-level split point.
- [ ] I can lazy-load an optional component.
- [ ] I can dynamically import a utility.
- [ ] I can choose a local Suspense boundary.
- [ ] I understand shared chunks and over-splitting.
- [ ] I understand prefetch vs preload.
- [ ] I understand hashed asset caching.
- [ ] I can diagnose chunk failures.
- [ ] I can measure whether a split improved performance.

## Day 47 Outcome

You can now design production-oriented code splitting beyond routes, including optional component loading, dynamic utility imports, local Suspense boundaries, shared dependency analysis, caching, prefetch decisions, failure recovery, testing, and measurement.

**Next:** Day 48 — Advanced React Performance Optimization.

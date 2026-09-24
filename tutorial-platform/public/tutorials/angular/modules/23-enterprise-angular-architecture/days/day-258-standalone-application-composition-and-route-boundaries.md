---
id: angular-day-258
title: Standalone Application Composition and Route Boundaries
day: 258
module: 23
---

# Day 258 — Standalone Application Composition and Route Boundaries

## Goal

Use standalone Angular composition and routing to create clear application boundaries.

## Route boundary

A route can represent a feature boundary:

~~~ts
export const routes: Routes = [
  {
    path: 'jobs',
    loadChildren: () =>
      import('./features/jobs/jobs.routes').then(m => m.JOB_ROUTES),
  },
];
~~~

Lazy routes can split feature code into separate chunks that are loaded when needed. Angular also supports route-level providers, which can scope dependencies to a feature route.

## Why this matters

A route boundary can provide:

- navigation ownership
- lazy loading
- provider scope
- authorization boundaries
- a natural feature entry point

## Exercise

Refactor JobHub so that /jobs belongs to Job Search, /recruiter belongs to Recruiter, and /admin belongs to Admin. Keep the root route configuration small.

## Common mistakes

- Putting every route in one giant file.
- Nesting lazy routes without a reason.
- Creating a route boundary for every tiny component.
- Assuming lazy loading automatically improves every application.

## Interview questions

1. What is a route boundary?
2. How can routes support feature architecture?
3. What is the relationship between lazy loading and architecture?
4. When would route-level providers be useful?

## Outcome

You can use standalone routes as architectural boundaries rather than only navigation configuration.

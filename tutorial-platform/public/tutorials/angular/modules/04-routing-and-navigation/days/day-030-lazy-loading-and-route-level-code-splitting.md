---
id: "r4n09"
title: Lazy Loading and Route-Level Code Splitting
slug: day-030-lazy-loading-and-route-level-code-splitting
dayLabel: Day 30
level: Intermediate
estimatedMinutes: 90
order: 30
track: angular
youtubeVideos: []
---

# Day 30 — Lazy Loading and Route-Level Code Splitting

## Goal

Understand how route-level lazy loading reduces feature code loaded up front.

## Eager vs lazy

An eager route references a component directly:

    {
      path: 'about',
      component: AboutComponent
    }

A lazy standalone route can load the component on demand:

    {
      path: 'reports',
      loadComponent: () =>
        import('./reports/reports.component')
          .then(m => m.ReportsComponent)
    }

A feature can lazy-load its route configuration:

    {
      path: 'admin',
      loadChildren: () =>
        import('./admin/admin.routes')
          .then(m => m.ADMIN_ROUTES)
    }

## Why this matters

Large applications contain features users may never visit during the initial session. Route-level code splitting lets the browser fetch those feature chunks when navigation requires them.

Lazy loading is an optimization and architecture technique, not a guarantee of good performance.

## Practical exercise

Take the Admin area from Day 28 and lazy-load it.

Verify:

- Main application still loads
- Admin code is requested when navigating to Admin
- Admin child routes continue to work

## Common mistakes

- Lazy-loading every tiny component without a reason
- Assuming lazy loading automatically makes an app fast
- Confusing lazy loading with API loading
- Creating meaningless route boundaries

## Interview questions

1. What is lazy loading?
2. What is route-level code splitting?
3. loadComponent vs loadChildren?
4. Does lazy loading reduce API calls?

## Assignment

Create a lazy-loaded Reports feature and explain why it should not be part of the initial feature bundle.

## Outcome

You can design meaningful route boundaries and use standalone Angular lazy loading.

---
title: Component and Route-Level Providers
slug: component-and-route-level-providers
dayLabel: Day 62
level: Intermediate
estimatedMinutes: 70
order: 62
track: angular
youtubeVideos: []
---

# Day 62 — Component and Route-Level Providers

## Goal

Learn how to deliberately create narrower service scopes.

## Component provider

~~~ts
@Component({
  selector: 'app-job-workspace',
  providers: [JobWorkspaceService],
  template: '...'
})
export class JobWorkspaceComponent {}
~~~

This creates a provider at that component injector boundary.

## Route-level provider

~~~ts
export const routes: Routes = [
  {
    path: 'jobs',
    providers: [JobWorkspaceService],
    loadComponent: () => import('./jobs/jobs-page').then(m => m.JobsPage)
  }
];
~~~

A route provider makes the dependency available within that route's injector scope.

## Why use a narrower scope?

Temporary feature state can belong to a job workspace, multi-step wizard, route-specific filters, or local draft.

## Scope mental model

~~~text
root
 └── route
      └── component
~~~

A child provider can override an ancestor provider for the same token.

## Exercise

Build a local two-page Job Portal. /jobs uses a route-scoped JobWorkspaceService; /profile does not. Children under /jobs share the workspace instance.

## Interview questions

1. Where can Angular providers be registered?
2. What happens when a child injector provides the same token as a parent?
3. Why use route-level providers?

## Outcome

You can select provider scope based on ownership and lifetime.

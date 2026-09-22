# Day 238 — Server Routes and Render Modes

## Goal

Configure rendering behavior per route.

## Concept

Angular server routes can use render modes such as:

- RenderMode.Server
- RenderMode.Prerender
- RenderMode.Client

A server route configuration can look like:

~~~ts
import { RenderMode, ServerRoute } from '@angular/ssr';

export const serverRoutes: ServerRoute[] = [
  { path: '', renderMode: RenderMode.Client },
  { path: 'about', renderMode: RenderMode.Prerender },
  { path: 'profile', renderMode: RenderMode.Server },
];
~~~

This allows one application to use multiple rendering strategies. citeturn0search2

## Exercise

Configure JobHub so:

- public landing → prerender;
- public job details → prerender or server;
- authenticated profile → server or client based on requirements;
- admin workspace → client.

Explain every choice.

## Common Mistakes

- Using one render mode for every route without evaluating requirements.
- Prerendering user-specific pages.
- Forgetting that dynamic server routes require server infrastructure.
- Mixing client-only assumptions into server-rendered routes.

## Interview Questions

1. What is RenderMode.Server?
2. What is RenderMode.Prerender?
3. What is RenderMode.Client?
4. Why configure render mode per route?

## Outcome

You can design a hybrid rendering map for a real Angular application.

---
id: "r4n08"
title: Route Guards
slug: day-029-route-guards
dayLabel: Day 29
level: Intermediate
estimatedMinutes: 90
order: 29
track: angular
youtubeVideos: []
---

# Day 29 — Route Guards

## Goal

Understand how navigation can be allowed, redirected, or blocked according to application rules.

## Why guards?

A settings page may require a signed-in user. An admin page may require a permission.

A guard is a navigation policy. It is not the complete security boundary.

## Functional guard

    import { inject } from '@angular/core';
    import { CanActivateFn, Router } from '@angular/router';

    export const authGuard: CanActivateFn = () => {
      const router = inject(Router);
      const isLoggedIn = true; // Demo only

      return isLoggedIn
        ? true
        : router.createUrlTree(['/login']);
    };

Route:

    {
      path: 'admin',
      canActivate: [authGuard],
      loadComponent: () =>
        import('./admin/admin.component')
          .then(m => m.AdminComponent)
    }

## Security distinction

A browser-side guard improves navigation behavior but does not secure backend resources. Real authorization must also be enforced by the server/API.

Full authentication and authorization are covered later.

## Practical exercise

Create a demo login signal:

- Logged out → /admin redirects to /login
- Logged in → /admin is allowed
- Add logout
- No backend

## Common mistakes

- Treating guards as server security
- Putting large business workflows inside guards
- Creating redirect loops
- Imperative navigation when a UrlTree is appropriate

## Interview questions

1. What is a route guard?
2. What does CanActivateFn represent?
3. Why return a UrlTree for redirects?
4. Are Angular guards sufficient for backend security?

## Assignment

Implement a protected Admin route using a functional guard.

## Outcome

You understand route protection and client-vs-server authorization.

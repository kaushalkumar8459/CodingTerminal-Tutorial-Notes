id="r4n03"
---
title: Route Configuration and provideRouter
slug: day-024-route-configuration-and-providerouter
dayLabel: Day 24
level: Beginner
estimatedMinutes: 75
order: 24
track: angular
youtubeVideos: []
---

# Day 24 — Route Configuration and provideRouter

## Goal

Configure Angular Router in a standalone application.

## Core pieces

- Routes — route definitions
- provideRouter() — registers the router
- RouterOutlet — placeholder for the matched component

## Example

    import { Routes } from '@angular/router';

    export const routes: Routes = [
      {
        path: '',
        title: 'Home',
        loadComponent: () =>
          import('./home/home.component').then(m => m.HomeComponent)
      },
      {
        path: 'about',
        title: 'About',
        loadComponent: () =>
          import('./about/about.component').then(m => m.AboutComponent)
      }
    ];

Application configuration:

    import { ApplicationConfig } from '@angular/core';
    import { provideRouter } from '@angular/router';
    import { routes } from './app.routes';

    export const appConfig: ApplicationConfig = {
      providers: [provideRouter(routes)]
    };

Root template:

    <router-outlet />

Import RouterOutlet in a standalone component that uses it.

## Route matching

The router examines the current URL, finds a matching route, and renders its component in the outlet.

## Practical exercise

Build Home, About, and Contact pages. Configure all three routes and add a wildcard Not Found route.

## Common mistakes

- Forgetting provideRouter(routes)
- Forgetting RouterOutlet
- Incorrect route paths
- Assuming routed components render without an outlet

## Interview questions

1. What does provideRouter() do?
2. What is RouterOutlet?
3. What is a Routes array?
4. Why is loadComponent useful?

## Assignment

Create a four-page application with Home, Products, About, and Not Found routes.

## Outcome

You can configure basic standalone Angular routes.

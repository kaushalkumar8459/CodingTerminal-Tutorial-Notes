id="r4n02"
---
title: Why Routing and Navigation
slug: day-023-why-routing-and-navigation
dayLabel: Day 23
level: Beginner
estimatedMinutes: 60
order: 23
track: angular
youtubeVideos: []
---

# Day 23 — Why Routing and Navigation?

## Goal

Understand why a real Angular application needs multiple URLs and screens.

## The problem

A small profile app can work with one component. A real application may need Home, Products, Product Details, Login, Dashboard, and Settings.

Putting every screen into one component creates large templates and tangled state.

Routing gives each screen a URL and lets Angular display the matching component without a traditional full-page reload.

## Mental model

URL → Route match → Component → Router outlet

Examples:

    /products → ProductsComponent
    /products/101 → ProductDetailsComponent

## SPA navigation

An Angular single-page application normally loads the application shell once. Navigation changes the displayed view while Angular manages the route.

This provides predictable URLs, browser Back/Forward support, deep links, and shareable pages.

## Practical exercise

Create Home, About, and Contact standalone components. Sketch these URLs:

- /
- /about
- /contact

## Common mistake

Do not create routing merely because Angular has a router. Introduce it when an application has multiple screens that need navigation.

## Interview questions

1. What problem does Angular Router solve?
2. What is an SPA?
3. Why does a routed application need URLs?
4. Component state change vs route navigation?

## Assignment

Explain why a dashboard with ten screens should not be implemented as one giant component.

## Outcome

You can identify when routing is needed and describe the URL-to-component mental model.

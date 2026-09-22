id="r4n06"
---
title: Query Parameters and Navigation State
slug: day-027-query-parameters-and-navigation-state
dayLabel: Day 27
level: Beginner
estimatedMinutes: 75
order: 27
track: angular
youtubeVideos: []
---

# Day 27 — Query Parameters and Navigation State

## Goal

Use query parameters for optional UI state such as search, filters, sorting, and pagination.

## Route vs query parameter

Route parameter identifies a resource:

    /products/101

Query parameters represent optional view state:

    /products?category=books&sort=price

## Template example

    <a
      [routerLink]="['/products']"
      [queryParams]="{ category: 'books', sort: 'price' }">
      Books
    </a>

## Reading query parameters

    private readonly route = inject(ActivatedRoute);

    readonly category =
      this.route.snapshot.queryParamMap.get('category');

For changing query parameters while the component remains active, use reactive parameter handling.

## Navigation state

Navigation can carry transient state:

    void this.router.navigate(['/checkout'], {
      state: { source: 'cart' }
    });

Navigation state is not a replacement for durable application state or server data.

## Practical exercise

Enhance the Product Catalog with:

- Search in query parameters
- Category in query parameters
- Sort order in query parameters
- Details using a route parameter

Example:

    /products?search=phone&category=electronics&sort=price

## Common mistakes

- Putting every piece of state into the URL
- Using query parameters as a security mechanism
- Confusing route and query parameters
- Assuming navigation state is durable

## Interview questions

1. When should you use a query parameter?
2. Route parameter vs query parameter?
3. Why are URL filters useful?
4. Is navigation state persistent application state?

## Assignment

Build a filterable product page whose filter state can be copied as a URL.

## Outcome

You can represent shareable UI state with query parameters.

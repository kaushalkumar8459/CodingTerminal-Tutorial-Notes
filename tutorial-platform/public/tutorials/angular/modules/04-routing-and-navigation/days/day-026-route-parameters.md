id="r4n05"
---
title: Route Parameters
slug: day-026-route-parameters
dayLabel: Day 26
level: Beginner
estimatedMinutes: 75
order: 26
track: angular
youtubeVideos: []
---

# Day 26 — Route Parameters

## Goal

Pass identity information through the URL so one component can display different records.

## Why route parameters?

One Product Details component can display many products through a route such as:

    /products/:id

Examples:

    /products/101
    /products/202

## Route definition

    {
      path: 'products/:id',
      component: ProductDetailsComponent
    }

## Reading the parameter

    private readonly route = inject(ActivatedRoute);

    readonly productId =
      this.route.snapshot.paramMap.get('id');

Snapshot is useful for a component created for a navigation. If the same component instance can remain active while parameters change, use reactive parameter handling.

## Practical exercise

Create a product list and details page.

Requirements:

- Five or more products
- Each product links to /products/:id
- Details displays the selected ID
- Back to Products link

No HTTP is required yet.

## Common mistakes

- Confusing route and query parameters
- Treating a URL ID as trusted business data
- Assuming every ID is numeric
- Not handling an invalid record

## Interview questions

1. What is a route parameter?
2. What does :id mean?
3. What is ActivatedRoute?
4. Snapshot vs reactive parameter handling?

## Assignment

Create a reusable Product Details page driven by a route ID.

## Outcome

You can build list-to-detail navigation with route parameters.

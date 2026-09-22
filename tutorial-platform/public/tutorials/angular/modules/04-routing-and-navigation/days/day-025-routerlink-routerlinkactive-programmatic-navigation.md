id="r4n04"
---
title: RouterLink, RouterLinkActive and Programmatic Navigation
slug: day-025-routerlink-routerlinkactive-programmatic-navigation
dayLabel: Day 25
level: Beginner
estimatedMinutes: 75
order: 25
track: angular
youtubeVideos: []
---

# Day 25 — RouterLink, RouterLinkActive and Programmatic Navigation

## Goal

Navigate between routes from templates and TypeScript.

## Template navigation

Use RouterLink for normal navigation:

    <a routerLink="/">Home</a>
    <a routerLink="/products">Products</a>

For route commands:

    <a [routerLink]="['/products', product.id]">View Product</a>

## Active links

RouterLinkActive identifies the current navigation item.

    <a
      routerLink="/products"
      routerLinkActive="active"
      [routerLinkActiveOptions]="{ exact: true }">
      Products
    </a>

## Programmatic navigation

Inject Router when navigation is a consequence of application logic:

    private readonly router = inject(Router);

    openDetails(id: number): void {
      void this.router.navigate(['/products', id]);
    }

Use template links for ordinary destinations and programmatic navigation after actions or decisions.

## Practical exercise

Create a navigation header with Home, Products, and About. Highlight the active route and add a Product Details button.

## Common mistakes

- Using programmatic navigation for every simple link
- Forgetting router directives in standalone components
- Building URLs through unsafe string concatenation

## Interview questions

1. RouterLink vs Router.navigate()?
2. What does RouterLinkActive do?
3. When should navigation be programmatic?

## Assignment

Build a reusable navigation component with active-route styling.

## Outcome

You can implement declarative and programmatic Angular navigation.

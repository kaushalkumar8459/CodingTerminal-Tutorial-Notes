---
title: @for and List Rendering
slug: day-018-for-list-rendering
dayLabel: Day 18
level: Beginner
estimatedMinutes: 60
order: 18
track: angular
youtubeVideos: []
---

# Day 18 [Beginner]: @for and List Rendering

## Goal

Render a collection of data in an Angular template.

## The Problem

Suppose the application has:

```ts
skills = ['Angular', 'TypeScript', 'HTML', 'CSS'];
```

Writing four separate HTML elements is not scalable.

Use `@for`:

```html
<ul>
  @for (skill of skills; track skill) {
    <li>{{ skill }}</li>
  }
</ul>
```

## Rendering Objects

```ts
products = [
  { id: 1, name: 'Laptop', price: 70000 },
  { id: 2, name: 'Keyboard', price: 3000 },
];
```

```html
@for (product of products; track product.id) {
  <article>
    <h2>{{ product.name }}</h2>
    <p>₹{{ product.price }}</p>
  </article>
}
```

## Context Variables

Angular provides useful contextual values such as:

- `$index`
- `$first`
- `$last`
- `$even`
- `$odd`

Example:

```html
@for (product of products; track product.id; let i = $index) {
  <p>{{ i + 1 }}. {{ product.name }}</p>
}
```

Use only the contextual values the UI actually needs.

## Exercise

Create a product list containing:

- ID
- Name
- Price
- Category

Render all products with `@for`.

## Interview Questions

**Why use `@for`?** To render a collection without manually duplicating markup.

**What is `track`?** It tells Angular how to identify items across collection changes.

**What is `$index`?** The current zero-based position in the rendered collection.

## Assignment

Convert the hard-coded Skills section into an `@for` loop and build a Product List.

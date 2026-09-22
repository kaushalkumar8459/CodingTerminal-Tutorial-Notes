---
title: @if and Conditional Rendering
slug: day-017-if-conditional-rendering
dayLabel: Day 17
level: Beginner
estimatedMinutes: 60
order: 17
track: angular
youtubeVideos: []
---

# Day 17 [Beginner]: @if and Conditional Rendering

## Goal

Show or hide template content according to component state.

## Basic Syntax

```ts
isAvailable = true;
```

```html
@if (isAvailable) {
  <p>Available for work</p>
}
```

If the condition is false, that block is not rendered.

## @else

```html
@if (isAvailable) {
  <p>Available</p>
} @else {
  <p>Not Available</p>
}
```

## @else if

```html
@if (status === 'active') {
  <p>Active</p>
} @else if (status === 'pending') {
  <p>Pending</p>
} @else {
  <p>Unknown</p>
}
```

Use this when the UI genuinely has ordered conditions.

## Keep Conditions Understandable

Prefer clear state:

```ts
isProfileVisible = true;
```

Then:

```html
@if (isProfileVisible) {
  <app-profile-card />
}
```

Avoid huge expressions that mix unrelated business rules.

## Practical Exercise

Add these states to the Profile UI:

- Profile visible.
- Profile hidden.
- Available.
- Not available.

Create clear UI for each state.

## Common Mistakes

- Nesting many conditions unnecessarily.
- Putting business calculations directly in the template.
- Using legacy `*ngIf` as the primary syntax in new course code.

## Interview Questions

**What does `@if` do?** Conditionally renders a template block.

**Can `@if` have an else block?** Yes.

**Can it have multiple conditions?** Yes, with `@else if`.

## Assignment

Create a profile status panel with Active, Inactive, and Unknown states.

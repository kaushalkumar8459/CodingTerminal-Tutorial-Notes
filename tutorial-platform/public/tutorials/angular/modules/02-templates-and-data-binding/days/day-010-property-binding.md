---
title: Property Binding
slug: day-010-property-binding
dayLabel: Day 10
level: Beginner
estimatedMinutes: 60
order: 10
track: angular
youtubeVideos: []
---

# Day 10 [Beginner]: Property Binding

## Goal

Bind component expressions to DOM or directive properties.

## Syntax

```html
[property]="expression"
```

Example:

```ts
imageUrl = 'assets/profile.png';
isSaving = false;
```

```html
<img [src]="imageUrl" alt="Profile">
<button [disabled]="isSaving">Save</button>
```

## Common Examples

```html
<img [src]="imageUrl" alt="Profile">
<button [disabled]="isSaving">Save</button>
<input [value]="name">
<progress [value]="progress" max="100"></progress>
```

## Mental Model

```text
Component expression
        ↓
Property binding
        ↓
DOM/directive property
        ↓
Browser UI
```

Interpolation is primarily text-oriented. Property binding clearly communicates that a value is being assigned to a property.

## Exercise

Add a profile image, disabled Save state, input value, and progress indicator to the Profile UI.

## Interview Questions

**What is property binding?** Binding a component expression to a DOM or directive property.

**Syntax?** `[property]="expression"`

## Assignment

Build a Profile Card whose image URL and button disabled state are controlled by component state.

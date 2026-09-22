---
title: Interpolation
slug: day-009-interpolation
dayLabel: Day 9
level: Beginner
estimatedMinutes: 60
order: 9
track: angular
youtubeVideos: []
---

# Day 9 [Beginner]: Interpolation

## Goal

Display component values inside an Angular template.

## Syntax

Interpolation uses double curly braces:

```html
<h1>{{ name }}</h1>
<p>{{ role }}</p>
```

```ts
name = 'Asha';
role = 'Frontend Developer';
```

Angular evaluates the expression and renders its result as text.

## Objects

```ts
profile = {
  name: 'Asha',
  role: 'Angular Developer',
};
```

```html
<h2>{{ profile.name }}</h2>
<p>{{ profile.role }}</p>
```

Simple expressions are supported:

```html
<p>{{ firstName + ' ' + lastName }}</p>
<p>{{ price * quantity }}</p>
```

Keep expressions readable. Avoid large calculations and business processes in templates.

## Interpolation vs Property Binding

Use interpolation primarily for text:

```html
<h1>Welcome {{ name }}</h1>
```

Use property binding when intentionally binding a DOM or directive property; that is the next lesson.

## Exercise

Create a profile object and display its name, role, location, experience, and introduction.

## Interview Questions

**What is interpolation?** Angular template syntax that evaluates an expression and inserts its result into text.

**What syntax is used?** `{{ expression }}`

**Should complex business logic be placed in interpolation?** No. Keep templates simple.

## Assignment

Convert the static Profile UI from Day 8 so its visible values come from component properties.

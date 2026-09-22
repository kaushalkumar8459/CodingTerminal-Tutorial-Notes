---
title: Template Expressions and Best Practices
slug: day-014-template-expressions-and-best-practices
dayLabel: Day 14
level: Beginner
estimatedMinutes: 60
order: 14
track: angular
youtubeVideos: []
---

# Day 14 [Beginner]: Template Expressions and Best Practices

## Goal

Learn what belongs in templates and what should remain in TypeScript.

## Keep Templates Readable

Good:

```html
<h1>{{ profile.name }}</h1>
<button [disabled]="isSaving" (click)="save()">Save</button>
```

Avoid large business algorithms directly in template expressions.

## Clear State

Prefer meaningful names:

```ts
isSaving = false;
isEditable = true;
profileName = 'Asha';
```

As the course progresses, Signals and `computed()` will provide a modern way to represent derived reactive state.

## Avoid Side Effects

Templates should primarily read state and connect user interaction.

Do not use them for:

- API calls
- Large calculations
- Business workflows
- State-management processes
- Logging-heavy behavior

## Exercise

Refactor a profile template containing long expressions and unclear names. Move meaningful behavior into TypeScript.

## Interview Questions

**Should business logic live in templates?** No.

**Why avoid complex expressions?** They reduce readability and make rendering behavior harder to reason about.

**Where should derived state live?** In the component or a suitable reactive abstraction.

## Assignment

Make the Day 13 Profile Editor template simple enough that another developer can understand it quickly.

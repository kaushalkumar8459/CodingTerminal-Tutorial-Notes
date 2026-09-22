---
title: Two-Way Binding
slug: day-013-two-way-binding
dayLabel: Day 13
level: Beginner
estimatedMinutes: 60
order: 13
track: angular
youtubeVideos: []
---

# Day 13 [Beginner]: Two-Way Binding

## Goal

Understand two-way binding and the role of `ngModel`.

## The Problem

A profile editor needs component state to populate an input, while user edits need to update that state.

For a template-driven control:

```html
<input [(ngModel)]="name">
<p>{{ name }}</p>
```

Import `FormsModule` in a standalone component:

```ts
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-profile-editor',
  standalone: true,
  imports: [FormsModule],
  template: `...`,
})
export class ProfileEditorComponent {
  name = 'Asha';
}
```

## Mental Model

Conceptually, two-way binding combines property-style value flow with event-style change handling.

```text
Component → input
     ↑        ↓
     └ user change
```

## Important Context

Two-way binding is convenient, but it is not the universal solution for forms. Later modules will cover template-driven forms, reactive forms, validation, and modern Signal Forms.

## Exercise

Create a profile editor for name, role, and location using `[(ngModel)]`.

## Interview Questions

**What is two-way binding?** Synchronizing a value between component state and a supported form control.

**What syntax is commonly used?** `[(ngModel)]="value"`

**What import is required for ngModel?** `FormsModule`.

## Assignment

Build a small editable Profile UI using two-way binding. Do not introduce routing, services, HTTP, or RxJS.

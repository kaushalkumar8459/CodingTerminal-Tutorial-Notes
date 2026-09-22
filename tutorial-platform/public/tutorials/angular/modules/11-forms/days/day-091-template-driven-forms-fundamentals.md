---
id: "angular-day-091"
title: "Template-Driven Forms Fundamentals"
slug: "day-091-template-driven-forms-fundamentals"
dayLabel: Day 91
level: Beginner
estimatedMinutes: 75
order: 91
track: angular
youtubeVideos: []
---
# Day 91 — Template-Driven Forms Fundamentals

## Goal

Build a basic form using Angular's template-driven approach.

## Setup

Import FormsModule in the standalone component:

```ts
import { FormsModule } from '@angular/forms';

@Component({
  standalone: true,
  imports: [FormsModule]
})
```

## Basic Form

```html
<form #profileForm="ngForm" (ngSubmit)="save()">
  <label>
    Name
    <input name="name" [(ngModel)]="name">
  </label>

  <button type="submit">Save</button>
</form>
```

The name attribute is important because Angular uses it to register the control with the form.

## Mental Model

```
HTML input
   ↓
ngModel
   ↓
NgForm
   ↓
form state
```

## Exercise

Create a profile form with name, email, and location.

Display the submitted values below the form.

## Common Mistakes

- Forgetting FormsModule.
- Forgetting name on controls inside ngForm.
- Using button type incorrectly.
- Putting business logic directly into the template.

## Interview Questions

1. What is ngForm?
2. Why is name required with ngModel inside a form?
3. What is ngSubmit?
4. What does FormsModule provide?

## Outcome

You can create and submit a basic template-driven form.

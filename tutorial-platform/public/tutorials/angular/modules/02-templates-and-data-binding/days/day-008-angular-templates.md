---
title: Angular Templates
slug: day-008-angular-templates
dayLabel: Day 8
level: Beginner
estimatedMinutes: 60
order: 8
track: angular
youtubeVideos: []
---

# Day 8 [Beginner]: Angular Templates

## Goal

Understand how an Angular component class connects to the HTML displayed in the browser.

## What is a Template?

An Angular template is HTML enhanced with Angular template syntax.

```ts
@Component({
  selector: 'app-profile',
  standalone: true,
  template: `
    <h1>My Profile</h1>
    <p>Frontend Developer</p>
  `,
})
export class ProfileComponent {}
```

For larger templates, use `templateUrl`:

```ts
@Component({
  selector: 'app-profile',
  standalone: true,
  templateUrl: './profile.component.html',
})
export class ProfileComponent {}
```

## Template Responsibilities

A template should primarily describe:

- What the user sees.
- Where data is displayed.
- How UI events are connected.
- How visual state is represented.

Keep substantial business logic in TypeScript rather than turning templates into large programs.

## Mental Model

```text
Component state
      ↓
Angular template
      ↓
Rendered DOM
      ↓
User interaction
```

The following lessons add the individual binding mechanisms.

## Practical Exercise

Create a Profile component containing:

- Heading
- Name
- Role
- Introduction
- Save button

Keep the UI static for now.

## Interview Questions

### What is an Angular template?

HTML enhanced with Angular template syntax for displaying state and responding to user interaction.

### Can Angular templates contain normal HTML?

Yes. Angular extends normal HTML rather than replacing it.

## Assignment

Create the static Profile UI and prepare it for data binding in Day 9.

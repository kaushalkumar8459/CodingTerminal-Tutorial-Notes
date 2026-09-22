---
title: Event Binding
slug: day-012-event-binding
dayLabel: Day 12
level: Beginner
estimatedMinutes: 60
order: 12
track: angular
youtubeVideos: []
---

# Day 12 [Beginner]: Event Binding

## Goal

Respond to browser events such as clicks and input changes.

## Syntax

```html
<button (click)="saveProfile()">Save</button>
```

The browser produces an event, Angular handles the binding, and the component method runs.

## Mental Model

```text
User action
   ↓
Browser event
   ↓
Angular event binding
   ↓
Component handler
   ↓
State change
   ↓
UI update
```

## Event Object

Use `$event` when the handler needs event information:

```html
<input (input)="onInput($event)">
```

```ts
onInput(event: Event) {
  const input = event.target as HTMLInputElement;
  console.log(input.value);
}
```

Prefer specific TypeScript types instead of `any`.

## Common Events

```html
<button (click)="save()">Save</button>
<input (input)="onInput($event)">
<input (change)="onChange($event)">
<form (submit)="submit()">...</form>
```

## Common Mistake

Use `(click)="save()"` when you intend to invoke the method. Keep substantial behavior in TypeScript.

## Exercise

Add Save, Reset, Increment Experience, and Toggle Availability actions to the Profile UI.

## Interview Questions

**What is event binding?** Connecting a browser event to Angular template logic.

**Syntax?** `(event)="expression"`

**How access the event?** With `$event`.

## Assignment

Create an interactive profile card whose buttons change component state.

---
id="angular-day-095"
title="FormControl and FormGroup"
slug="day-095-formcontrol-and-formgroup"
dayLabel: Day 95
level: Intermediate
estimatedMinutes: 75
order: 95
track: angular
youtubeVideos: []
---
# Day 95 — FormControl and FormGroup

## Goal

Understand the building blocks of reactive forms.

## FormControl

A FormControl represents one field:

```ts
readonly email = new FormControl('');
```

It contains value and state such as validity, dirty, touched, and pending.

## FormGroup

A FormGroup combines controls:

```ts
readonly form = new FormGroup({
  firstName: new FormControl(''),
  lastName: new FormControl(''),
  email: new FormControl('')
});
```

## Nested Groups

Complex forms can contain groups inside groups:

```ts
readonly form = new FormGroup({
  personal: new FormGroup({
    firstName: new FormControl(''),
    lastName: new FormControl('')
  }),
  contact: new FormGroup({
    email: new FormControl('')
  })
});
```

## Exercise

Build a Job Application form with personal and contact groups.

## Interview Questions

1. FormControl vs FormGroup?
2. Why nest FormGroups?
3. How is aggregate validity calculated?
4. How do you access a nested control?

## Outcome

You understand the reactive form tree.

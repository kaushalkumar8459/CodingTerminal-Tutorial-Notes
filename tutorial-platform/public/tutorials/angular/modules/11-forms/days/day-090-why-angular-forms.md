---
id="angular-day-090"
title="Why Angular Forms?"
slug="day-090-why-angular-forms"
dayLabel: Day 90
level: Beginner
estimatedMinutes: 60
order: 90
track: angular
youtubeVideos: []
---
# Day 90 — Why Angular Forms?

## Goal

Understand why forms need more than simply reading input values.

## The Problem

A real form must answer:

- What value did the user enter?
- Is it valid?
- Has the user touched the field?
- Has the value changed?
- Should an error be shown?
- Can the form be submitted?
- Which fields are required?

A form therefore has both **data state** and **interaction state**.

## Two Angular Form Approaches

Angular provides:

1. Template-driven forms
2. Reactive forms

Template-driven forms keep more of the form model in the template. Reactive forms make the form model explicit in TypeScript.

## Learning Order

We start with template-driven forms because the learner already knows templates and two-way binding. Then we move to reactive forms for larger and more explicit form models.

## Exercise

Design a Job Application form containing:

- name
- email
- phone
- experience
- preferred location
- skills
- resume consent

Do not implement it yet. Identify values, validation rules, and interaction states.

## Interview Questions

1. What problem do Angular Forms solve?
2. Template-driven vs reactive forms?
3. What is form state?
4. When does a simple form become complex?

## Outcome

You understand why Angular provides a form abstraction instead of treating inputs as unrelated variables.

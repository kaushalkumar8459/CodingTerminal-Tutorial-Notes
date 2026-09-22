---
id: "angular-day-076"
title: "Why Signals & Modern Reactivity?"
slug: "day-076-why-signals-and-modern-reactivity"
dayLabel: Day 76
level: Beginner
estimatedMinutes: 60
order: 76
track: angular
youtubeVideos: []
---
# Day 76 — Why Signals & Modern Reactivity?

## Prerequisites

- Days 1–75
- Components, templates, services, and dependency injection
- Basic lifecycle concepts

## Goal
Understand the problem signals solve before learning the APIs.

## Concept
A UI contains source state such as search text, selected job, filters, and loading state. Other values are derived from that state.

A signal is a reactive wrapper around a value. Angular tracks where signals are read and can update affected consumers when their values change. 

## Mental Model
```
source state
   ↓
signals
   ↓
computed / template / effect
   ↓
UI or external side effect
```

## Signal Families
- signal() → writable state
- computed() → derived read-only state
- effect() → side effects
- linkedSignal() → writable state linked to another state
- resource() → asynchronous reactive state
- input() → reactive component input
- model() → two-way component value
- viewChild() / viewChildren() → reactive view queries

## Exercise
Design a job dashboard and classify each value as source state or derived state. Do not write code yet.

## Interview Questions
1. What problem do Angular Signals solve?
2. What is the difference between source and derived state?
3. Why is a signal read using ()?
4. When would RxJS be unnecessary?

## Outcome
You can identify where signal-based reactivity belongs before choosing an API.


## Real-World JobHub Scenario

JobHub search contains source state such as search text and selected filters, derived state such as the filtered job list, and side effects such as analytics logging. The key interview skill is deciding which values should be source state and which should be derived.

## Common Mistakes

- Using `effect()` to calculate derived values that belong in `computed()`.
- Making every piece of state global.
- Treating `resource()` as a stable production requirement in Angular 21; it is experimental.
- Introducing RxJS before stream semantics are actually needed.

## Challenge

Design the reactive state for a job filter panel. Identify writable state, derived state, and side effects before writing code.

## Expected Outcome

You can explain the problem Signals solve and choose between source state, derived state, and side effects.

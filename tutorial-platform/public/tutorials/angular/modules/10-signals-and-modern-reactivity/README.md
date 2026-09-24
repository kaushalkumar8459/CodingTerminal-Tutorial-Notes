---
id: "angular-module-10"
title: "Signals & Modern Reactivity"
slug: "signals-and-modern-reactivity"
level: Beginner
order: 10
track: angular
---
# Module 10 — Signals & Modern Reactivity

## Goal
Learn Angular's modern signal-based reactivity from first principles: writable state, derived state, effects, signal component APIs, signal queries, dependent state, async resources, and feature state.

## Days
76. Why Signals & Modern Reactivity?
77. signal() — Writable Reactive State
78. computed() — Derived State
79. Signal Reads, Writes & Dependency Tracking
80. effect() — Side Effects and Common Mistakes
81. Signals in Component Templates
82. Signal Inputs with input()
83. output() and model() for Reactive Component APIs
84. Signal Queries with viewChild() and viewChildren()
85. linkedSignal() — Writable Derived State
86. resource() — Async Resource State
87. Signals in Services and Feature State
88. Signal Patterns, Anti-Patterns & Reactive UI States
89. Mini Project — Reactive Job Dashboard

## Dependency Flow
source state → derived state → dependency tracking → side effects → template reactivity → component APIs → signal queries → dependent writable state → async resource → feature state → architecture patterns → project

## Teaching Rules
- Signals are the primary local reactive state model.
- Prefer computed() for derived values.
- Use effect() only for genuine side effects.
- Keep HTTP and httpResource() for the later HTTP module.
- Use modern input(), output(), model(), viewChild(), and viewChildren().
- Angular 21 note: resource() is experimental. Teach it as an advanced/experimental API and verify its status before production guidance.
- Do not introduce RxJS, NgRx/SignalStore, or HTTP in this module.
- Keep state ownership explicit.

## Outcome
By Day 89, learners can build a meaningful Angular feature with modern signal-based reactivity.

## Prerequisite
Complete Days 1–75, especially component communication, services/DI, and lifecycle fundamentals.

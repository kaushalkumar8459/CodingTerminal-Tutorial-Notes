# Day 228 — Zoneless Angular and Event/Async Scheduling

## Goal
Understand the modern Angular zoneless scheduling model.

## Angular 21+ Context
Zoneless change detection is the default in Angular v21+. Angular uses framework-level notifications such as signal updates, component input updates, and bound listeners to schedule synchronization instead of relying on ZoneJS to observe broad asynchronous activity.

## Mental Model
Zone-based: browser activity → ZoneJS → Angular checks

Zoneless: Angular-relevant notification → Angular schedules synchronization

OnPush is recommended for zoneless-compatible application components. Avoid using NgZone stability events as a generic synchronization mechanism in zoneless applications.

## Exercise
Inspect JobHub for code that depends on zone stability or broad application-wide refreshes.

## Common Mistakes
- Assuming every async operation updates arbitrary state.
- Using zone-stability events as generic synchronization.
- Removing ZoneJS from legacy code without checking dependencies.
- Assuming zoneless automatically fixes expensive rendering.

## Interview Questions
1. What is zoneless Angular?
2. Is it the default in Angular 21+?
3. What notifications can schedule synchronization?
4. Why is OnPush useful for zoneless compatibility?

## Outcome
You understand the scheduling model behind modern Angular rendering.
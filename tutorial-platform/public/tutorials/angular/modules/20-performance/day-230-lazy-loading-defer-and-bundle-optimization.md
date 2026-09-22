# Day 230 — Lazy Loading, @defer and Bundle Optimization

## Learning Goal
Choose the correct loading boundary for routes, secondary UI and heavy dependencies.

## Prerequisites
- Days 23–31: routing and lazy routes
- Day 225: performance measurement

## Three Loading Boundaries

### Initial UI
Load what is required to make the first screen useful.

### Route-Level Lazy Loading
Lazy-load features users do not need on the initial route.

### @defer
Defer secondary components inside an already loaded screen.

```html
@defer (on interaction) {
  <app-advanced-analytics />
} @placeholder {
  <button type="button">Load analytics</button>
}
```

## Triggers
Common triggers include `idle`, `viewport`, `interaction`, `hover`, `immediate`, `timer`, and `when`.

Choose based on user behavior.

## Do Not Defer Critical Content
Consider:
- LCP
- CLS
- accessibility
- interaction latency

Use `@placeholder`, `@loading` and `@error` when they improve the experience.

## Exercise
For JobHub classify search controls, job details, analytics and a heavy reporting library as initial, lazy-route or deferred work. Measure the network waterfall before and after.

## Common Mistakes
- Deferring everything.
- Creating too many tiny chunks.
- Deferring above-the-fold critical content.
- Ignoring accessible loading states.
- Optimizing source size without measuring browser behavior.

## Interview Questions
1. Route lazy loading vs `@defer`?
2. What does `@defer` split?
3. How can excessive code splitting hurt?
4. When should content not be deferred?

## Expected Outcome
You can select loading boundaries based on user behavior and measured startup cost.

# Day 230 — Lazy Loading, @defer and Bundle Optimization

## Goal
Reduce initial JavaScript and work by loading features when users need them.

## Concept
Route-level lazy loading is useful for feature navigation. @defer is useful for secondary UI inside an already loaded application.

~~~html
@defer (on interaction) {
  <app-advanced-analytics />
} @placeholder {
  <button>Load analytics</button>
}
~~~

Ask: what must load immediately, what can wait for the route, what can wait for interaction, and what can wait for visibility?

## Exercise
Split JobHub into critical dashboard UI, secondary analytics, and rarely used reporting. Choose the appropriate loading boundary for each.

## Common Mistakes
- Deferring content users immediately need.
- Creating excessive chunks.
- Measuring source size instead of browser experience.
- Ignoring request waterfalls.

## Interview Questions
1. What does route lazy loading solve?
2. What does @defer solve?
3. When should content not be deferred?
4. How can code splitting increase latency?

## Outcome
You can choose loading boundaries based on user behavior.
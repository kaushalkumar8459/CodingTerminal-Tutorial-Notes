# Day 234 — Performance Architecture and Anti-Patterns

## Goal
Turn individual optimizations into sustainable architecture.

## Prefer
- small feature boundaries;
- route-level lazy loading;
- clear state ownership;
- signal-based derived state;
- stable collection identity;
- deferred secondary UI;
- efficient API projections;
- lightweight reusable components.

## Anti-Patterns
- Global state for everything.
- Expensive template work.
- Giant components.
- Premature memoization.
- Unnecessary effects for derived state.
- Over-fetching.
- Excessive eager loading.

## Exercise
Review JobHub and create a performance checklist for component boundaries, state, routes, API calls, assets, rendering, and profiling.

## Interview Questions
1. What is premature optimization?
2. Why can global state hurt maintainability and performance?
3. Why should derived state not use unnecessary effects?
4. How does architecture affect performance?

## Outcome
You can design for performance without turning the application into micro-optimizations.
# Day 022 — Frontend System-Design-Style Problems

Level: Senior / Staff-oriented problem solving. Treat each item as an interview exercise: clarify constraints, propose a baseline, optimize, and explain production trade-offs.

1. Autocomplete architecture.
2. Infinite-scroll feed.
3. Real-time notifications.
4. Chat state model.
5. Collaborative document state.
6. File-upload manager.
7. Video upload pipeline.
8. Dashboard data layer.
9. Reusable data-table architecture.
10. Client-side search.
11. Offline web app.
12. API caching.
13. Multi-tab synchronization.
14. Browser job queue.
15. Feature flags.
16. RBAC navigation.
17. Micro-frontend communication.
18. Shared MFE state.
19. Route data prefetching.
20. Telemetry batching.

## Required answer format

1. Clarify assumptions.
2. Explain brute force or baseline.
3. Explain optimized design.
4. State time and space complexity.
5. Discuss failure modes and testing.

<!-- codingterminal-solution:start -->

# Day 022 — Frontend System Design — Detailed Solution

## What to Build

Design autocomplete: debounce, cancellation, cache, keyboard navigation and states.

## Core Implementation / Algorithm

```js
// State: query, suggestions, loading, error, activeIndex. Use debounce + AbortController + cache.
```

## Complexity

State the time and space complexity of the chosen implementation. For UI tasks, also discuss render cost, network cost, and memory growth.

## Edge Cases

- Empty or missing input
- Duplicate data
- Rapid repeated interaction
- Slow/failing async work
- Cleanup/lifecycle
- Keyboard and accessibility behavior
- Large datasets

## Interview Explanation

1. Clarify requirements and constraints.
2. Identify source vs derived state.
3. Implement the simplest correct path.
4. Explain complexity and trade-offs.
5. Test boundary and failure cases.
6. Explain how the design changes at production scale.

## Extension

Add one requirement without rewriting the entire feature. Explain what changed and why.

> This is original interview practice material. Company names elsewhere in the curriculum should not be interpreted as claims that this exact exercise was asked by that company.

<!-- codingterminal-solution:end -->


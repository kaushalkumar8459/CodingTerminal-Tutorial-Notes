# Day 022 — Virtualized List — Solution Guide

## Approach

Start with the smallest working implementation for **Virtualized List**, then add production concerns incrementally.

### State Model

Use a small explicit state model such as:

- idle
- loading
- success
- error

Keep source state minimal. Derive counts, totals, filtered collections, labels, and other display values instead of duplicating them.

### Responsibilities

- **UI:** rendering and user interaction.
- **State:** feature state and transitions.
- **Domain logic:** pure transformations and validation.
- **Side effects:** network, timers, storage, and browser APIs.

### Edge Cases

Consider empty data, invalid input, rapid repeated actions, slow or failed requests, cleanup, keyboard interaction, screen readers, duplicate data, and stale responses.

### Interview Review

Explain:

1. Requirements you clarified.
2. State model.
3. Component boundaries.
4. Async and side-effect handling.
5. Accessibility decisions.
6. Performance trade-offs.
7. Testing strategy.

## Practice

Implement the challenge without copying the guide. Add one new requirement afterward and refactor without breaking existing behavior.

## Self-Check

- [ ] Happy path works
- [ ] Edge cases work
- [ ] State is not unnecessarily duplicated
- [ ] Cleanup is handled
- [ ] Critical behavior is tested
- [ ] I can explain the design in an interview

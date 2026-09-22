# Day 004 — Arrays, Strings, Map & Set — Detailed Revision Solutions

## What to Master

Use this file for active recall. Explain each concept before reading the implementation.

## Executable Practice

```js
const numbers = [1, 2, 3, 4];
const doubled = numbers.map(n => n * 2);
const unique = [...new Set([1, 1, 2, 3])];

const counts = new Map();
for (const n of numbers) counts.set(n, (counts.get(n) ?? 0) + 1);
```

## Interview Drill

1. Define the concept in 30–60 seconds.
2. Explain what happens at runtime.
3. Write the smallest working example.
4. Give one edge case.
5. State time/space complexity when applicable.
6. Give one production frontend use case.
7. Explain one trade-off.

## Edge-Case Checklist

- Empty input
- Boundary values
- Duplicate data
- Invalid input
- Large data
- Repeated/concurrent operations

## Testing Checklist

- [ ] Happy path
- [ ] Boundary case
- [ ] Failure case
- [ ] Async/race case when applicable
- [ ] Cleanup/lifecycle case when applicable
- [ ] Accessibility/performance case for UI topics

## Final Interview Habit

Do not jump directly into code. First state **assumptions → approach → complexity → implementation → validation**.

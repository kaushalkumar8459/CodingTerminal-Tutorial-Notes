# Day 002 — Functions, Closures & this — Detailed Revision Solutions

## What to Master

Use this file for active recall. Explain each concept before reading the implementation.

## Executable Practice

```js
function outer() {
  let count = 0;
  return () => ++count;
}
const counter = outer();
counter(); // 1
counter(); // 2

const user = { name: "A" };
function getName() { return this.name; }
console.log(getName.call(user)); // A
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

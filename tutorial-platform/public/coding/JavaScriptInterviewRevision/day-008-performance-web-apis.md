# Day 008 — Performance, Web APIs & Memory

## Objective

Use this day as a **fast interview revision sheet**, not as a first-time learning lesson.

## Must Know

- Review the core definitions and mental models.
- Explain the concept without reading notes.
- Write one small example from memory.
- Know common edge cases and trade-offs.
- Connect the topic to real frontend work.

## Rapid Questions

1. What is the concept and why does it exist?
2. What is the most common misconception?
3. What happens internally at a high level?
4. What are the important edge cases?
5. How would you debug a failure involving this concept?
6. Where would you use it in a production frontend application?

## Coding Drill

Implement one small example from this topic without copying a solution.

## Interview Rule

Prefer: **definition → example → internal behavior → trade-off → real-world use case**.

## Revision Checklist

- [ ] Explain in 60 seconds
- [ ] Write a working example
- [ ] Handle edge cases
- [ ] State complexity where applicable
- [ ] Connect it to frontend development
- [ ] Answer follow-up questions

<!-- codingterminal-solution:start -->

# Day 008 — Performance, Web APIs & Memory — Detailed Revision Solutions

## What to Master

Use this file for active recall. Explain each concept before reading the implementation.

## Executable Practice

```js
function expensive(a, b) { return a * b; }
function memoize(fn) {
  const cache = new Map();
  return (...args) => {
    const key = JSON.stringify(args);
    if (cache.has(key)) return cache.get(key);
    const result = fn(...args);
    cache.set(key, result);
    return result;
  };
}
const fast = memoize(expensive);
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

<!-- codingterminal-solution:end -->


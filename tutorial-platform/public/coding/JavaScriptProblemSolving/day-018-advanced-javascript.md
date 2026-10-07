# Day 018 — Advanced JavaScript Problem Solving

Level: Advanced. Solve first, then optimize. For every problem record approach, invariant, edge cases, time complexity, space complexity, and mutation behavior.

1. bind polyfill.
2. call polyfill.
3. apply polyfill.
4. map polyfill.
5. filter polyfill.
6. reduce polyfill.
7. flat polyfill.
8. once.
9. debounce.
10. throttle.
11. memoization.
12. currying.
13. partial application.
14. compose.
15. pipe.
16. EventEmitter.
17. Promise.all.
18. Promise.race.
19. Promise.allSettled.
20. Promise.any.

<!-- codingterminal-solution:start -->

# Day 018 — Advanced JavaScript — Detailed Solution

## What to Build

Implement memoization and once.

## Core Implementation / Algorithm

```js
function once(fn){let done=false,result;return function(...args){if(!done){done=true;result=fn.apply(this,args);}return result;}}
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


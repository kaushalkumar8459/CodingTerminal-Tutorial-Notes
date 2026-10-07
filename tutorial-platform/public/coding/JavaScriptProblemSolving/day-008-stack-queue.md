# Day 008 — Stacks, Queues & Monotonic Structures

Progression level: Beginner

Solve each problem first without looking at a solution. For every problem record: approach, edge cases, time complexity, space complexity, mutation behavior, and at least two tests.

1. Implement a stack.
2. Implement a queue.
3. Implement a queue using two stacks.
4. Implement a stack using two queues.
5. Reverse a string using a stack.
6. Validate balanced brackets.
7. Min stack.
8. Max stack.
9. Evaluate postfix expression.
10. Convert infix to postfix.
11. Evaluate an infix expression.
12. Decode a nested string.
13. Remove adjacent duplicates.
14. Remove K adjacent duplicates.
15. Next greater element.
16. Next smaller element.
17. Daily temperatures.
18. Stock span problem.
19. Largest rectangle in histogram.
20. Maximal rectangle in a matrix.
21. Simplify a Unix path.
22. Browser back-forward history.
23. Undo-redo using two stacks.
24. Circular queue.
25. Deque implementation.
26. Generate binary numbers using a queue.
27. First non-repeating character in a stream.
28. Sliding-window maximum with deque.
29. Asteroid collision simulation.
30. Parentheses score.

## Interview expectation

Explain the brute-force approach first, then improve it when a better complexity is possible. Prefer clear JavaScript and justify every data structure.

<!-- codingterminal-solution:start -->

# Day 008 — Stack & Queue — Detailed Solution

## What to Build

Valid parentheses.

## Core Implementation / Algorithm

```js
function valid(s){const st=[],pair={")":"(","]":"[","}":"{"};for(const c of s){if("([{".includes(c))st.push(c);else if(st.pop()!==pair[c])return false;}return st.length===0;}
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


# Day 015 — Greedy Algorithms

Level: Advanced. Solve first, then optimize. For every problem record approach, invariant, edge cases, time complexity, space complexity, and mutation behavior.

1. Activity selection.
2. Minimum platforms.
3. Fractional knapsack.
4. Assign cookies.
5. Jump game.
6. Minimum jumps.
7. Gas station.
8. Candy distribution.
9. Lemonade change.
10. Partition labels.
11. Merge intervals.
12. Erase overlaps.
13. Meeting scheduling.
14. Job sequencing.
15. Minimum arrows.
16. Canonical coin change.
17. Huffman coding.
18. Connect ropes.
19. Task scheduling.
20. Maximum units.

<!-- codingterminal-solution:start -->

# Day 015 — Greedy — Detailed Solution

## What to Build

Activity selection after sorting by finish time.

## Core Implementation / Algorithm

```js
function maxActivities(items){items=[...items].sort((a,b)=>a.end-b.end);let end=-Infinity,count=0;for(const x of items){if(x.start>=end){count++;end=x.end;}}return count;}
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


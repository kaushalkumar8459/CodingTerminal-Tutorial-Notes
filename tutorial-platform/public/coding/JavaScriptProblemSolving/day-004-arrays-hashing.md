# Day 004 — Arrays, Hashing & Frequency Patterns

Progression level: Beginner

Solve each problem first without looking at a solution. For every problem record: approach, edge cases, time complexity, space complexity, mutation behavior, and at least two tests.

1. Two Sum with a frequency map.
2. Three Sum with duplicate handling.
3. Four Sum with duplicate handling.
4. Find the majority element.
5. Find elements occurring more than N/3 times.
6. Group anagrams.
7. Top K frequent values.
8. Longest consecutive sequence.
9. Product of array except self.
10. Maximum subarray sum.
11. Maximum product subarray.
12. Count subarrays with sum K.
13. Longest subarray with sum K.
14. Subarray sum for positive values.
15. Merge overlapping intervals.
16. Insert an interval.
17. Minimum intervals to remove for non-overlap.
18. Find the equilibrium index.
19. Find leaders in an array.
20. Next greater element.
21. Daily temperatures.
22. Best time to buy and sell stock once.
23. Best time to buy and sell stock multiple times.
24. Rotate an array by K.
25. Move zeroes in-place.
26. Find the smallest missing positive.
27. Find duplicate without modifying the array.
28. Maximum circular subarray.
29. Container with most water.
30. Trapping rain water.

## Interview expectation

Explain the brute-force approach first, then improve it when a better complexity is possible. Prefer clear JavaScript and justify every data structure.

<!-- codingterminal-solution:start -->

# Day 004 — Arrays & Hashing — Detailed Solution

## What to Build

Two Sum and duplicate detection.

## Core Implementation / Algorithm

```js
function twoSum(nums, target) { const m=new Map(); for(let i=0;i<nums.length;i++){const n=target-nums[i]; if(m.has(n)) return [m.get(n),i]; m.set(nums[i],i);} return []; }
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


# Day 010 — Binary Search & Search-on-Answer

Progression level: Intermediate

Solve each problem first without looking at a solution. For every problem record: approach, edge cases, time complexity, space complexity, mutation behavior, and at least two tests.

1. Classic binary search.
2. Find first occurrence.
3. Find last occurrence.
4. Count occurrences in a sorted array.
5. Search insert position.
6. Find floor and ceiling.
7. Integer square root.
8. Find a peak element.
9. Find minimum in rotated sorted array.
10. Search rotated sorted array.
11. Search rotated array with duplicates.
12. Find rotation count.
13. Find minimum speed to finish work.
14. Capacity to ship packages in D days.
15. Allocate books among students.
16. Split array to minimize largest sum.
17. Aggressive cows placement.
18. Kth missing positive number.
19. Search a 2D matrix.
20. Search a row-and-column sorted matrix.
21. Median of two sorted arrays.
22. Kth element of two sorted arrays.
23. Find single element in sorted pairs.
24. Find duplicate using binary search.
25. Find local minimum.
26. Find smallest feasible value.
27. Find maximum feasible value.
28. Binary search over timestamps.
29. Find first bad version.
30. Range query with binary search.

## Interview expectation

Explain the brute-force approach first, then improve it when a better complexity is possible. Prefer clear JavaScript and justify every data structure.

<!-- codingterminal-solution:start -->

# Day 010 — Binary Search — Detailed Solution

## What to Build

Classic binary search.

## Core Implementation / Algorithm

```js
function binarySearch(a,target){let l=0,r=a.length-1;while(l<=r){const m=l+Math.floor((r-l)/2);if(a[m]===target)return m;a[m]<target?l=m+1:r=m-1;}return -1;}
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


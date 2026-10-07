# Day 011 — Sorting & Searching Algorithms

Progression level: Intermediate

Solve each problem first without looking at a solution. For every problem record: approach, edge cases, time complexity, space complexity, mutation behavior, and at least two tests.

1. Bubble sort.
2. Selection sort.
3. Insertion sort.
4. Merge sort.
5. Quick sort.
6. Heap sort.
7. Counting sort.
8. Radix sort.
9. Bucket sort.
10. Stable sorting of records.
11. Sort by multiple keys.
12. Sort nearly sorted data.
13. Find kth smallest with quickselect.
14. Find kth largest with quickselect.
15. Median using quickselect.
16. Merge sorted arrays.
17. Merge sorted linked lists.
18. External-style chunk sorting.
19. Custom comparator sorting.
20. Sort 0s, 1s and 2s.
21. Sort an array by frequency.
22. Sort characters by frequency.
23. Largest number from numeric strings.
24. Meeting rooms scheduling.
25. Minimum meeting rooms.
26. Interval scheduling.
27. Inversion count.
28. Count smaller elements after self.
29. Sort a stack.
30. Verify whether an array is a valid sorting output.

## Interview expectation

Explain the brute-force approach first, then improve it when a better complexity is possible. Prefer clear JavaScript and justify every data structure.

<!-- codingterminal-solution:start -->

# Day 011 — Sorting & Searching — Detailed Solution

## What to Build

Merge sort.

## Core Implementation / Algorithm

```js
function mergeSort(a){if(a.length<2)return a;const m=Math.floor(a.length/2);const l=mergeSort(a.slice(0,m)),r=mergeSort(a.slice(m));const out=[];while(l.length&&r.length)out.push(l[0]<=r[0]?l.shift():r.shift());return out.concat(l,r);}
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


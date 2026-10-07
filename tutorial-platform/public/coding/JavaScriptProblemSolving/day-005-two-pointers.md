# Day 005 — Two Pointers & Partitioning

Progression level: Beginner

Solve each problem first without looking at a solution. For every problem record: approach, edge cases, time complexity, space complexity, mutation behavior, and at least two tests.

1. Pair sum in a sorted array.
2. Remove duplicates from a sorted array.
3. Remove a target value in-place.
4. Move zeroes with two pointers.
5. Reverse vowels in a string.
6. Valid palindrome with ignored characters.
7. Two Sum in a sorted array.
8. Three Sum using sorting and pointers.
9. Four Sum using nested pointers.
10. Closest three-sum.
11. Partition an array around a pivot.
12. Dutch national flag sorting.
13. Sort colors in-place.
14. Merge two sorted arrays in-place.
15. Intersection of sorted arrays.
16. Union of sorted arrays.
17. Find a pair with a given difference.
18. Find squares of a sorted array.
19. Compare strings with backspaces.
20. Check subsequence using two pointers.
21. Longest mountain in an array.
22. Minimum difference pair.
23. Pair closest to target.
24. Separate positive and negative values.
25. Rearrange array by parity.
26. Find duplicate using Floyd pointers.
27. Cycle detection in a linked list.
28. Find linked-list cycle entry.
29. Find middle of linked list.
30. Palindrome linked list with slow/fast pointers.

## Interview expectation

Explain the brute-force approach first, then improve it when a better complexity is possible. Prefer clear JavaScript and justify every data structure.

<!-- codingterminal-solution:start -->

# Day 005 — Two Pointers — Detailed Solution

## What to Build

Sorted pair sum and in-place compaction.

## Core Implementation / Algorithm

```js
function twoSumSorted(a,target){let l=0,r=a.length-1;while(l<r){const s=a[l]+a[r];if(s===target)return[l,r];s<target?l++:r--;}return[];}
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


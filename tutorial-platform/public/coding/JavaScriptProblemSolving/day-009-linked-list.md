# Day 009 — Linked Lists

Progression level: Beginner

Solve each problem first without looking at a solution. For every problem record: approach, edge cases, time complexity, space complexity, mutation behavior, and at least two tests.

1. Create a singly linked list.
2. Insert at head.
3. Insert at tail.
4. Insert at an index.
5. Delete by value.
6. Delete at an index.
7. Find list length.
8. Search a linked list.
9. Reverse a linked list iteratively.
10. Reverse a linked list recursively.
11. Find the middle node.
12. Detect a cycle.
13. Find cycle entry.
14. Remove a cycle.
15. Merge two sorted lists.
16. Merge K sorted lists.
17. Remove Nth node from end.
18. Remove duplicates from sorted list.
19. Remove duplicates from unsorted list.
20. Check palindrome list.
21. Find intersection of two lists.
22. Add two numbers represented by lists.
23. Rotate a linked list.
24. Partition a list around a value.
25. Reverse nodes in groups of K.
26. Swap nodes in pairs.
27. Copy list with random pointers.
28. Flatten a multilevel linked list.
29. Sort a linked list.
30. Reorder a linked list.

## Interview expectation

Explain the brute-force approach first, then improve it when a better complexity is possible. Prefer clear JavaScript and justify every data structure.

<!-- codingterminal-solution:start -->

# Day 009 — Linked List — Detailed Solution

## What to Build

Floyd cycle detection.

## Core Implementation / Algorithm

```js
function hasCycle(head){let slow=head,fast=head;while(fast&&fast.next){slow=slow.next;fast=fast.next.next;if(slow===fast)return true;}return false;}
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


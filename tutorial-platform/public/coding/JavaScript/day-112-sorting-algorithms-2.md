# Day 112 — Sorting Algorithms II (Merge Sort, Quick Sort)

Bonus practice. Covers the two classic "divide and conquer" sorting algorithms, more
efficient than Day 111's simple sorts. No limit on how many variations you try.

## Basic

1. Implement `mergeSort(array)` — split the array in half recursively until each piece
   has 1 element, then merge the sorted halves back together.
2. Implement a helper `merge(left, right)` that combines two already-sorted arrays into
   one sorted array.
3. Implement `quickSort(array)` — pick a pivot, partition the array into
   less-than/greater-than groups, then recursively sort each group.
4. Test both against `.sort((a, b) => a - b)` on the same arrays to confirm correctness.

## Concept

5. Try 3 different pivot-choosing strategies for `quickSort` (first element, last
   element, middle element) and compare performance on an already-sorted array —
   notice how pivot choice affects worst-case behavior.
6. Measure (roughly, using `Date.now()`) how `mergeSort`/`quickSort` compare to
   `bubbleSort`/`selectionSort` (Day 111) on a large array (10,000+ random numbers).
7. Make `mergeSort` and `quickSort` both accept an optional comparator function, like
   real `.sort()` does.

## Interview-style questions

8. Why is merge sort's time complexity O(n log n) in ALL cases, while quick sort's
   worst case is O(n²)?
9. Why does merge sort need extra memory (creating new arrays), while quick sort can
   sort "in place"?
10. When would you prefer merge sort over quick sort in a real system (hint: think
    about stability and worst-case guarantees)?

## Notes

- These two algorithms are the most commonly asked sorting questions in technical
  interviews — being able to implement both from memory, with correct recursion, is a
  genuinely valuable skill.
- Recursion is central to both — if it feels unfamiliar, trace through a 4-element
  array step by step on paper first.

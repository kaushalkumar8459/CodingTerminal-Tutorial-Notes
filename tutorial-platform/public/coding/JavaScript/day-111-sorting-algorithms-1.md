# Day 111 — Sorting Algorithms I (Bubble, Selection, Insertion)

Bonus practice, continuing after the core 110-day roadmap. Classic sorting algorithms,
implemented by hand (not `.sort()`), since Day 40 only covered the built-in method.
No limit on how many variations you try.

## Basic

1. Implement `bubbleSort(array)` — repeatedly swap adjacent out-of-order elements
   until the array is sorted.
2. Implement `selectionSort(array)` — repeatedly find the minimum remaining element
   and move it to the front.
3. Implement `insertionSort(array)` — build up a sorted section one element at a time,
   inserting each new element into its correct position.
4. Test each implementation against `.sort((a, b) => a - b)` on the same random array
   to confirm they produce identical results.

## Concept

5. Add a counter to each sort that tracks how many comparisons/swaps it performs, and
   compare the three algorithms on the SAME array (already sorted, reverse sorted,
   random) — note which performs best in each case.
6. Modify `bubbleSort` to stop early if a full pass makes zero swaps (the array is
   already sorted) — a simple but real optimization.
7. Make each sort function accept an optional comparator (like real `.sort()` does),
   so it can sort numbers, strings, or objects by a property.

## Interview-style questions

8. What is the time complexity of bubble sort, selection sort, and insertion sort in
   the worst case?
9. Why is insertion sort often faster in practice on nearly-sorted data, despite having
   the same worst-case complexity as bubble sort?
10. Why do real languages (including JavaScript's `.sort()`) not use these simple
    algorithms internally for large arrays?

## Notes

- These three are the classic "beginner" sorting algorithms — the goal is understanding
  exactly how each one moves elements, not just getting a sorted result.
- Trace through a small array (5-6 elements) by hand on paper before coding each one —
  it makes the loop logic much clearer.

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

<!-- codingterminal-solution:start -->

# Day 111 — Solution: Sorting Algorithms I

```js
function bubbleSort(input, compare = (a, b) => a - b) {
  const array = [...input];
  for (let end = array.length - 1; end > 0; end--) {
    let swapped = false;
    for (let i = 0; i < end; i++)
      if (compare(array[i], array[i + 1]) > 0) {
        [array[i], array[i + 1]] = [array[i + 1], array[i]];
        swapped = true;
      }
    if (!swapped) break;
  }
  return array;
}
function selectionSort(input, compare = (a, b) => a - b) {
  const array = [...input];
  for (let start = 0; start < array.length - 1; start++) {
    let best = start;
    for (let i = start + 1; i < array.length; i++)
      if (compare(array[i], array[best]) < 0) best = i;
    [array[start], array[best]] = [array[best], array[start]];
  }
  return array;
}
function insertionSort(input, compare = (a, b) => a - b) {
  const array = [...input];
  for (let i = 1; i < array.length; i++) {
    const value = array[i];
    let j = i - 1;
    while (j >= 0 && compare(array[j], value) > 0) {
      array[j + 1] = array[j];
      j--;
    }
    array[j + 1] = value;
  }
  return array;
}
const values = [5, 2, 9, 1, 3];
console.log(bubbleSort(values), selectionSort(values), insertionSort(values));
console.log(
  JSON.stringify(insertionSort(values)) ===
    JSON.stringify(values.sort((a, b) => a - b)),
);
```

All three have worst-case O(n²) time. Insertion sort is often faster on nearly sorted data because it shifts only nearby out-of-order values. Real engines use more advanced hybrid algorithms for large inputs.

<!-- codingterminal-solution:end -->


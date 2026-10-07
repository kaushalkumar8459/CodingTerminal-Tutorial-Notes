# Day 113 — Searching Algorithms (Linear Search, Binary Search)

Bonus practice. No limit on how many variations you try.

## Basic

1. Implement `linearSearch(array, target)` — check each element one by one, returning
   its index, or `-1` if not found.
2. Implement `binarySearch(sortedArray, target)` — repeatedly halve the search range
   on a SORTED array, returning the index or `-1`.
3. Test `binarySearch` against `.indexOf()` on the same sorted array to confirm
   correctness.
4. Confirm `binarySearch` gives WRONG results if the array isn't actually sorted first
   — this is an important precondition to remember.

## Concept

5. Implement `binarySearch` recursively (instead of with a loop), and compare the two
   versions.
6. Build `findInsertPosition(sortedArray, value)` using binary search — returns the
   index where `value` should be inserted to keep the array sorted (even if `value`
   isn't present).
7. Measure roughly how many comparisons `linearSearch` vs `binarySearch` take on a
   10,000-element array, searching for a value near the end.

## Interview-style questions

8. What is the time complexity of linear search vs binary search?
9. Why does binary search require the array to already be sorted?
10. Why might linear search still be the right choice for a SMALL or UNSORTED array?

## Notes

- Binary search is one of the most fundamental algorithms in computer science — get
  comfortable with both the iterative and recursive versions.
- The "wrong results on unsorted data" test (#4) is a genuinely important lesson —
  it's a very common real bug.

<!-- codingterminal-solution:start -->

# Day 113 — Solution: Searching Algorithms

```js
function linearSearch(array, target) {
  for (let i = 0; i < array.length; i++) if (array[i] === target) return i;
  return -1;
}
function binarySearch(array, target) {
  let left = 0,
    right = array.length - 1;
  while (left <= right) {
    const middle = Math.floor((left + right) / 2);
    if (array[middle] === target) return middle;
    if (array[middle] < target) left = middle + 1;
    else right = middle - 1;
  }
  return -1;
}
function binarySearchRecursive(
  array,
  target,
  left = 0,
  right = array.length - 1,
) {
  if (left > right) return -1;
  const middle = Math.floor((left + right) / 2);
  return array[middle] === target
    ? middle
    : array[middle] < target
      ? binarySearchRecursive(array, target, middle + 1, right)
      : binarySearchRecursive(array, target, left, middle - 1);
}
function findInsertPosition(array, value) {
  let left = 0,
    right = array.length;
  while (left < right) {
    const middle = Math.floor((left + right) / 2);
    if (array[middle] < value) left = middle + 1;
    else right = middle;
  }
  return left;
}
const values = [1, 3, 5, 7, 9];
console.log(
  linearSearch(values, 7),
  binarySearch(values, 7),
  binarySearchRecursive(values, 7),
  findInsertPosition(values, 6),
);
```

Linear search is O(n); binary search is O(log n), but only on sorted data. Linear search remains useful for small or unsorted arrays because sorting first may cost more than scanning once.

<!-- codingterminal-solution:end -->


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

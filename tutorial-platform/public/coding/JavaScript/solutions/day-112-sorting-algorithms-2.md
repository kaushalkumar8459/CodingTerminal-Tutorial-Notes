# Day 112 — Solution: Sorting Algorithms II

```js
function merge(left, right, compare = (a, b) => a - b) {
  const result = [];
  let i = 0,
    j = 0;
  while (i < left.length && j < right.length)
    result.push(compare(left[i], right[j]) <= 0 ? left[i++] : right[j++]);
  return result.concat(left.slice(i), right.slice(j));
}
function mergeSort(array, compare = (a, b) => a - b) {
  if (array.length <= 1) return [...array];
  const middle = Math.floor(array.length / 2);
  return merge(
    mergeSort(array.slice(0, middle), compare),
    mergeSort(array.slice(middle), compare),
    compare,
  );
}
function quickSort(array, compare = (a, b) => a - b) {
  if (array.length <= 1) return [...array];
  const pivot = array[array.length - 1];
  const less = [],
    greater = [];
  for (let i = 0; i < array.length - 1; i++)
    (compare(array[i], pivot) < 0 ? less : greater).push(array[i]);
  return [...quickSort(less, compare), pivot, ...quickSort(greater, compare)];
}
const values = [5, 2, 9, 1, 3];
console.log(mergeSort(values), quickSort(values));
```

Merge sort is O(n log n) in every case because it always splits evenly and merges linearly. Quick sort is usually O(n log n), but a poor pivot can produce O(n²). Merge sort uses extra arrays and is preferable when stable ordering and worst-case guarantees matter.

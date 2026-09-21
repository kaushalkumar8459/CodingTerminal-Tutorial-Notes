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

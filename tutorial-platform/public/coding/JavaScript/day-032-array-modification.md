# Day 032 — Array Modification (push, pop, shift, unshift, splice)

Matches Tutorial Day 32 (Advanced Number Concepts). No limit on how many you solve.

## Basic

1. Use `.push()` to add an item to the end of an array.
2. Use `.pop()` to remove the last item from an array, and print what was removed.
3. Use `.shift()` to remove the first item from an array, and print what was removed.
4. Use `.unshift()` to add an item to the beginning of an array.
5. Use `.splice()` to remove 2 items starting at a specific index.

## Concept

6. Use `.splice()` to insert new items into the middle of an array without removing anything.
7. Use `.splice()` to both remove AND insert items at the same position in one call.
8. Build a small "to-do list" array: add tasks with `.push()`, remove a completed task with `.splice()`.
9. Use `.pop()` in a loop to remove items one at a time until the array is empty.
10. Compare `.push()`/`.pop()` (end of array) with `.unshift()`/`.shift()` (start of array) — which
    would be faster for a large array, and why (just reason about it, don't worry about
    measuring performance formally yet)?

## Challenge

11. Implement your own `myPush(array, value)` that adds a value to the end of an array
    without using the real `.push()` (hint: you can use `array[array.length] = value`).
12. Implement your own `myPop(array)` that removes and returns the last value without
    using the real `.pop()`.
13. Implement your own `myShift(array)` that removes and returns the first value without
    using the real `.shift()`.
14. Implement your own `myUnshift(array, value)` that adds a value to the beginning
    without using the real `.unshift()` (hint: you'll need to shift every other element
    over by one first).

## Interview-style questions

15. Which array methods modify the array in place, and which return a new array instead?
16. What does `.splice()` return — the modified array, or the removed items?
17. Why is adding/removing from the beginning of a large array generally more expensive
    than doing so at the end?

## Notes

- `push`, `pop`, `shift`, `unshift`, and `splice` all **mutate** the original array — unlike
  string methods, which never mutate. This is an important contrast to remember.
- Building your own `myPush`/`myPop`/etc. is one of the best exercises for really
  understanding how arrays work under the hood.

<!-- codingterminal-solution:start -->

# Day 032 — Solution: Array Modification

## Basic

```js
const values = [2, 4, 6];
values.push(8); // 1. add at end
console.log(values);
console.log(values.pop()); // 2. removes 8
console.log(values.shift()); // 3. removes 2
values.unshift(1); // 4. add at beginning
console.log(values);
console.log(values.splice(1, 2)); // 5. removes two items
console.log(values);
```

**6. Insert without removing**

```js
const numbers = [1, 4, 5];
numbers.splice(1, 0, 2, 3);
console.log(numbers); // [1, 2, 3, 4, 5]
```

**7. Remove and insert together**

```js
const letters = ["a", "b", "e"];
letters.splice(2, 1, "c", "d");
console.log(letters); // ["a", "b", "c", "d"]
```

**8. To-do list**

```js
const tasks = [];
tasks.push("Read", "Practice", "Review");
tasks.splice(1, 1); // completed "Practice"
console.log(tasks); // ["Read", "Review"]
```

**9. Remove with `pop()` until empty**

```js
const queue = ["a", "b", "c"];
while (queue.length > 0) console.log(queue.pop());
```

**10. End versus beginning:** `push`/`pop` usually only change the last position, so they are generally O(1). `shift`/`unshift` move the other elements to new indexes, so they are generally O(n) for a large array.

## Challenge

**11. Manual `myPush`**

```js
function myPush(array, value) {
  array[array.length] = value;
  return array.length;
}
```

**12. Manual `myPop`**

```js
function myPop(array) {
  if (array.length === 0) return undefined;
  const lastIndex = array.length - 1;
  const value = array[lastIndex];
  array.length = lastIndex;
  return value;
}
```

**13. Manual `myShift`**

```js
function myShift(array) {
  if (array.length === 0) return undefined;
  const first = array[0];
  for (let index = 1; index < array.length; index++)
    array[index - 1] = array[index];
  array.length--;
  return first;
}
```

**14. Manual `myUnshift`**

```js
function myUnshift(array, value) {
  for (let index = array.length; index > 0; index--)
    array[index] = array[index - 1];
  array[0] = value;
  return array.length;
}
```

## Interview-style questions

**15.** Mutating methods include `push`, `pop`, `shift`, `unshift`, `splice`, `sort`, and `reverse`. Methods such as `map`, `filter`, and `slice` return new arrays without changing the original.

**16.** `splice()` returns an array containing the removed items, not the modified original array.

**17.** Beginning operations must move every remaining element to a new index. End operations do not need that shifting work.

<!-- codingterminal-solution:end -->


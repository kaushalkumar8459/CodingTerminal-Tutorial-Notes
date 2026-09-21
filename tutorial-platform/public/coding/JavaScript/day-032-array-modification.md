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

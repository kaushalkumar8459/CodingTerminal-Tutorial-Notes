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

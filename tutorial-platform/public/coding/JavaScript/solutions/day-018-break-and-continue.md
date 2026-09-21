# Day 018 — Solution: break & continue

Reference solutions for `day-018-break-and-continue.md`. Try the practice file
yourself first before checking these.

## Basic

**1. Break at 10**

```js
for (let i = 1; i <= 20; i++) {
  if (i === 10) break;
  console.log(i); // prints 1 through 9
}
```

**2. Skip multiples of 3**

```js
for (let i = 1; i <= 20; i++) {
  if (i % 3 === 0) continue;
  console.log(i);
}
```

**3. Stop at a specific value**

```js
const values = [4, 8, 15, 16, 23, 42];
for (const value of values) {
  if (value === 16) {
    console.log("Found it:", value);
    break;
  }
}
```

**4. First number divisible by both 7 and 3**

```js
for (let i = 1; i <= 100; i++) {
  if (i % 7 === 0 && i % 3 === 0) {
    console.log(i); // 21
    break;
  }
}
```

**5. Skip even numbers**

```js
for (let i = 1; i <= 20; i++) {
  if (i % 2 === 0) continue;
  console.log(i);
}
```

## Concept

**6. First negative number**

```js
const numbers = [4, 8, -3, 12, -7];
for (const n of numbers) {
  if (n < 0) {
    console.log("First negative:", n);
    break;
  }
}
```

**7. First prime between 2 and 50**

```js
function isPrime(n) {
  if (n <= 1) return false;
  for (let i = 2; i <= Math.sqrt(n); i++) {
    if (n % i === 0) return false;
  }
  return true;
}

for (let n = 2; n <= 50; n++) {
  if (isPrime(n)) {
    console.log("First prime:", n); // 2
    break;
  }
}
```

**8. `break` only stops the inner loop**

```js
for (let row = 1; row <= 3; row++) {
  for (let col = 1; col <= 3; col++) {
    if (col === 2) break; // stops only THIS inner loop's iterations
    console.log(`row ${row}, col ${col}`);
  }
}
// the outer loop still runs all 3 rows
```

**9. Labeled loop breaking both loops**

```js
outer: for (let row = 1; row <= 3; row++) {
  for (let col = 1; col <= 3; col++) {
    if (row === 2 && col === 2) {
      break outer; // stops BOTH loops immediately
    }
    console.log(`row ${row}, col ${col}`);
  }
}
```

**10. Skip completed tasks**

```js
const tasks = [
  { name: "Buy milk", done: true },
  { name: "Clean house", done: false },
  { name: "Write report", done: true },
  { name: "Call mom", done: false },
];

for (const task of tasks) {
  if (task.done) continue;
  console.log("Pending:", task.name);
}
```

## Interview-style questions

**11. `break` vs `continue`**

`break` exits the loop entirely — no more iterations happen at all. `continue` skips
only the CURRENT iteration and moves on to the next one — the loop itself keeps going.

**12. Does `break` stop the outer loop too?**

No — by default, `break` (and `continue`) only affect the NEAREST enclosing loop
(usually the innermost one). To stop an outer loop from inside a nested loop, you need
a labeled loop with `break labelName`.

**13. Labeled loops**

A label (`labelName: for (...) {...}`) lets `break`/`continue` target a SPECIFIC
outer loop directly. They're rarely needed in everyday code, but useful for the
specific case of exiting multiple nested loops at once, as in problem #9.

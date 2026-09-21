# Day 019 — Solution: Nested Loops

Reference solutions for `day-019-nested-loops.md`. Try the practice file yourself
first before checking these.

## Basic

**1. 5x5 square of stars**

```js
for (let row = 1; row <= 5; row++) {
  let line = "";
  for (let col = 1; col <= 5; col++) {
    line += "* ";
  }
  console.log(line);
}
```

**2. Multiplication tables 1-10**

```js
for (let table = 1; table <= 10; table++) {
  let line = "";
  for (let i = 1; i <= 10; i++) {
    line += `${table * i} `;
  }
  console.log(line);
}
```

**3. Right-angled triangle (increasing)**

```js
for (let row = 1; row <= 5; row++) {
  console.log("*".repeat(row));
}
```

**4. Inverted right-angled triangle**

```js
for (let row = 5; row >= 1; row--) {
  console.log("*".repeat(row));
}
```

**5. Number triangle repeating row number**

```js
for (let row = 1; row <= 5; row++) {
  console.log(String(row).repeat(row).split("").join(" "));
}
// row 3 -> "3 3 3"
```

## Concept / Patterns

**6. Pyramid pattern**

```js
const rows = 5;
for (let row = 1; row <= rows; row++) {
  const spaces = " ".repeat(rows - row);
  const stars = "*".repeat(2 * row - 1);
  console.log(spaces + stars);
}
```

**7. Inverted pyramid**

```js
for (let row = rows; row >= 1; row--) {
  const spaces = " ".repeat(rows - row);
  const stars = "*".repeat(2 * row - 1);
  console.log(spaces + stars);
}
```

**8. Floyd's Triangle**

```js
let current = 1;
for (let row = 1; row <= 4; row++) {
  let line = "";
  for (let col = 1; col <= row; col++) {
    line += `${current} `;
    current++;
  }
  console.log(line);
}
// 1 / 2 3 / 4 5 6 / 7 8 9 10
```

**9. Diamond (pyramid + inverted pyramid)**

```js
function printPyramid(rows) {
  for (let row = 1; row <= rows; row++) {
    console.log(" ".repeat(rows - row) + "*".repeat(2 * row - 1));
  }
}
function printInvertedPyramid(rows) {
  for (let row = rows; row >= 1; row--) {
    console.log(" ".repeat(rows - row) + "*".repeat(2 * row - 1));
  }
}

printPyramid(4);
printInvertedPyramid(4);
```

**10. Hollow square**

```js
const size = 5;
for (let row = 1; row <= size; row++) {
  let line = "";
  for (let col = 1; col <= size; col++) {
    const isBorder = row === 1 || row === size || col === 1 || col === size;
    line += isBorder ? "*" : " ";
  }
  console.log(line);
}
```

**11. Up-then-down number pattern**

```js
for (let row = 1; row <= 3; row++) {
  let line = "";
  for (let i = 1; i <= row; i++) line += i;
  for (let i = row - 1; i >= 1; i--) line += i;
  console.log(line);
}
// 1 / 121 / 12321
```

**12. Checkerboard pattern**

```js
const size = 6;
for (let row = 0; row < size; row++) {
  let line = "";
  for (let col = 0; col < size; col++) {
    line += (row + col) % 2 === 0 ? "*" : " ";
  }
  console.log(line);
}
```

## Interview-style questions

**13. Why nested loop iterations multiply**

For EVERY single step of the outer loop, the ENTIRE inner loop runs from start to
finish — so the total number of times the innermost code runs is `outerCount ×
innerCount`.

**14. Decreasing pattern instead of increasing**

Use a formula based on `totalRows - row` instead of just `row` directly — this
reverses the relationship so earlier rows get MORE items and later rows get fewer (see
the inverted triangle/pyramid solutions above).

**15. Build the row as a string first**

Accumulate each row's characters into a single string variable inside the inner loop,
then `console.log()` that ONE string once per row — this is cleaner and faster than
calling `console.log()` for every individual character.

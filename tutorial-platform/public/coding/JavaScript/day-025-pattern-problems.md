# Day 025 — Pattern Problems

Matches Tutorial Day 25 (Number Problem Solving Practice). No limit on how many you solve.

## Patterns to build

1. Solid right-angled triangle (stars, increasing rows).
2. Inverted right-angled triangle (stars, decreasing rows).
3. Pyramid (centered stars, increasing per row).
4. Inverted pyramid.
5. Diamond (pyramid + inverted pyramid combined).
6. Floyd's Triangle (sequential numbers, increasing count per row).
7. Hollow square (border only).
8. Hollow triangle (border only, triangular shape).
9. Number pyramid where each row repeats the row number (e.g. row 3 → `3 3 3`).
10. A pattern that counts up then back down per row (e.g. `1 2 3 2 1`).
11. A checkerboard pattern of alternating `*`/space based on row+column parity.
12. Your own original pattern — design one and implement it (no limit on how many you invent).

## Interview-style questions

13. What's the general two-step process for solving any new pattern problem
    (rows first, then per-row logic)?
14. How would you adapt a solid pyramid pattern into a hollow one — what single condition
    needs to change?
15. Why is it useful to build each row as a string before printing it, rather than
    printing individual characters directly?

## Notes

- If a pattern doesn't come out right on the first try, first print just the row and
  column _numbers_ (no pattern characters) to confirm your loop bounds are correct.
- Try recreating at least 3 of these from memory a day or two later — that's a much
  stronger test of understanding than solving them once and moving on.

<!-- codingterminal-solution:start -->

# Day 025 — Solution: Pattern Problems

```js
function printRows(rows) {
  for (const row of rows) console.log(row);
}
```

**1. Solid right triangle**

```js
function triangle(n) {
  for (let row = 1; row <= n; row++) console.log("*".repeat(row));
}
triangle(4);
```

**2. Inverted triangle**

```js
for (let row = 4; row >= 1; row--) console.log("*".repeat(row));
```

**3. Pyramid**

```js
for (let row = 1; row <= 4; row++)
  console.log(" ".repeat(4 - row) + "* ".repeat(row));
```

**4. Inverted pyramid**

```js
for (let row = 4; row >= 1; row--)
  console.log(" ".repeat(4 - row) + "* ".repeat(row));
```

**5. Diamond**

```js
for (let row = 1; row <= 4; row++)
  console.log(" ".repeat(4 - row) + "* ".repeat(row));
for (let row = 3; row >= 1; row--)
  console.log(" ".repeat(4 - row) + "* ".repeat(row));
```

**6. Floyd's Triangle**

```js
let value = 1;
for (let row = 1; row <= 4; row++) {
  let line = "";
  for (let column = 1; column <= row; column++) line += `${value++} `;
  console.log(line.trim());
}
```

**7. Hollow square**

```js
const size = 5;
for (let row = 1; row <= size; row++) {
  let line = "";
  for (let column = 1; column <= size; column++)
    line +=
      row === 1 || row === size || column === 1 || column === size ? "*" : " ";
  console.log(line);
}
```

**8. Hollow triangle**

```js
for (let row = 1; row <= 5; row++) {
  let line = "";
  for (let column = 1; column <= row; column++)
    line += column === 1 || column === row || row === 5 ? "*" : " ";
  console.log(line);
}
```

**9. Repeated row number**

```js
for (let row = 1; row <= 4; row++) console.log(`${row} `.repeat(row).trim());
```

**10. Count up and down**

```js
for (let row = 1; row <= 4; row++) {
  let line = "";
  for (let value = 1; value <= row; value++) line += `${value} `;
  for (let value = row - 1; value >= 1; value--) line += `${value} `;
  console.log(line.trim());
}
```

**11. Checkerboard**

```js
for (let row = 0; row < 4; row++) {
  let line = "";
  for (let column = 0; column < 6; column++)
    line += (row + column) % 2 === 0 ? "*" : " ";
  console.log(line);
}
```

**12. Original pattern: numbered hourglass**

```js
for (let row = 4; row >= 1; row--) console.log(`${row} `.repeat(row).trim());
for (let row = 2; row <= 4; row++) console.log(`${row} `.repeat(row).trim());
```

**13. General process:** decide the number of rows, then decide what each column prints for every row.

**14.** Replace the unconditional star with a border condition: first/last row or first/last column.

**15.** Building a row first makes spacing and debugging easier, then prints one complete visual unit at a time.

<!-- codingterminal-solution:end -->


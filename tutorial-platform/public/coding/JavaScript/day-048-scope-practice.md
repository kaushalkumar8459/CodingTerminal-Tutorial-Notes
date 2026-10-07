# Day 048 — Scope Practice

Matches Tutorial Day 48 (Scope). No limit on how many you solve.

## Basic

1. Declare a global variable and access it from inside a function.
2. Declare a `var` inside a function and confirm it's not accessible outside.
3. Declare a `let` inside an `if` block and confirm it's not accessible outside.
4. Declare a `var` inside an `if` block and confirm it IS accessible outside (contrast
   with problem 3).
5. Declare the same variable name in two different functions and confirm they don't
   conflict with each other.

## Concept

6. Write a nested function where the inner function accesses a variable from the outer
   function.
7. Demonstrate that a `for (let i = ...)` loop's `i` is scoped separately for each
   iteration (this matters a lot once closures are involved on Day 57 — just observe it
   for now).
8. Write two functions with a parameter of the same name, and confirm changing one
   doesn't affect the other.
9. Create a variable inside a `{ }` block on its own (not attached to `if`/`for`) using
   `let`, and confirm it's block-scoped just like inside `if`/`for`.
10. Predict, then verify: what happens if you try to use a variable before its `let`
    declaration within the same block?

## Interview-style questions

11. What's the core difference between function scope and block scope?
12. Why does `var` "leak" out of `if`/`for` blocks, while `let`/`const` don't?
13. What does it mean for scope to be "lexical" rather than determined at call time?

## Notes

- Try predicting the output of each scope example BEFORE running it — scope mistakes
  are one of the most common sources of "why doesn't this work?!" confusion for
  beginners, and prediction practice builds real intuition.
- Keep this day's examples handy — they become the foundation for understanding
  closures on Day 57.

<!-- codingterminal-solution:start -->

# Day 048 — Solution: Scope Practice

**1–5. Function and block scope**

```js
const globalMessage = "global";
function readGlobal() {
  return globalMessage;
}

function functionScope() {
  var inside = "private";
  return inside;
}
console.log(functionScope());

if (true) {
  let blockValue = 1;
  console.log(blockValue);
}
if (true) {
  var leakedValue = 2;
}
console.log(leakedValue); // 2

function first() {
  const value = "first";
  return value;
}
function second() {
  const value = "second";
  return value;
}
```

**6. Nested scope**

```js
function outer() {
  const message = "outer";
  function inner() {
    return message;
  }
  return inner();
}
```

**7. `let` in a loop**

```js
const readers = [];
for (let index = 0; index < 3; index++) readers.push(() => index);
console.log(readers.map((read) => read())); // [0, 1, 2]
```

**8. Independent parameters**

```js
function addTax(price) {
  price += 10;
  return price;
}
function addFee(price) {
  price += 5;
  return price;
}
```

**9. Standalone block**

```js
{
  const blockOnly = "inside";
  console.log(blockOnly);
}
```

**10. Temporal Dead Zone**

```js
{
  // console.log(value); // ReferenceError: value is in the TDZ
  let value = 10;
}
```

## Interview-style questions

**11.** Function scope lasts for a whole function; block scope lasts for a `{}` block. `let` and `const` are block-scoped, while `var` is function-scoped.

**12.** `var` ignores ordinary block boundaries, but `let` and `const` create bindings for each block.

**13.** Lexical scope is determined by where code is written. A function can access bindings from its written outer scopes, regardless of where it is later called.

<!-- codingterminal-solution:end -->


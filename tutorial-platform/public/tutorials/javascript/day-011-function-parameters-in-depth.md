---
title: Function Parameters In Depth
slug: day-011-function-parameters-in-depth
dayLabel: Day 11
level: Beginner
estimatedMinutes: 30
order: 11
track: javascript
---

# Day 11 [Beginner]: Function Parameters In Depth

## Goal

Go deeper into function parameters — default values, handling multiple parameters cleanly, the real difference between returning and logging, function scope, and writing genuinely reusable functions.

## Prerequisites

- Day 10 (functions introduction, parameters vs arguments, return values)

## Explanation

A **default parameter** gives a parameter a fallback value to use when no argument (or `undefined`) is passed in for it. This avoids `undefined` sneaking into your calculations and removes the need for manual "if missing, use this instead" checks.

When a function needs several inputs, keeping parameters in a clear, predictable order (and naming them well) makes the function much easier to use correctly. It's also important to firmly separate **returning a value** (which makes it usable elsewhere) from just **printing a value** (which only shows it once, in the console).

Every function also creates its own **function scope** — variables declared inside a function are not visible outside it. This is what keeps functions self-contained and prevents them from accidentally interfering with the rest of your program. A function is genuinely **reusable** when it doesn't depend on anything outside itself except its parameters.

## Topic by Topic

### Topic 1: Default parameters

Theory:
A default parameter provides a fallback value, used automatically whenever the caller doesn't supply an argument (or explicitly passes `undefined`).

Practical:
Use defaults for values that are "usually the same" but occasionally need to be overridden — like a tax rate or a currency symbol.

Code Example:

```js
function greet(name = "Guest") {
  console.log("Hello, " + name);
}

greet("Meena"); // Hello, Meena
greet(); // Hello, Guest - default kicks in
```

**Explanation:** Because no argument was passed in the second call, `name` falls back to `"Guest"` automatically — no manual check needed.

**Key Points:**

- Default parameters only apply when the argument is missing or explicitly `undefined`.
- Passing `null` or `0` will NOT trigger the default — only `undefined` does.
- Defaults make functions safer to call with incomplete information.

### Topic 2: Handling multiple parameters cleanly

Theory:
As functions take on more parameters, keeping their order logical and their names descriptive becomes essential for usability.

Practical:
If a function starts needing 4+ parameters, consider whether an object parameter (`function createUser({name, age, email}) {}`) would be clearer — we'll practice this pattern more once we cover destructuring (Day 44).

Code Example:

```js
function calculateSalary(basic, hra, deductions = 0) {
  return basic + hra - deductions;
}

console.log(calculateSalary(30000, 5000)); // 35000
console.log(calculateSalary(30000, 5000, 2000)); // 33000
```

**Explanation:** `deductions` has a sensible default (`0`), so callers who don't have any deductions can simply omit that argument.

**Key Points:**

- Order matters — parameters are matched to arguments by position.
- Give parameters clear, descriptive names so the function is self-explanatory at the call site.
- Defaults reduce how many arguments callers are forced to provide.

### Topic 3: Return values vs console output

Theory:
`return` hands a usable value back to the caller. `console.log()` only displays a value — it cannot be reused elsewhere in your code.

Practical:
If you ever try to use a function's result in a calculation and get `undefined`, check whether that function actually uses `return` or just `console.log()`.

Code Example:

```js
function calculateTotalLogOnly(price, qty) {
  console.log(price * qty); // just prints - nothing is returned
}

function calculateTotal(price, qty) {
  return price * qty; // returns - can be reused
}

let total = calculateTotalLogOnly(10, 3); // total is undefined!
let realTotal = calculateTotal(10, 3); // realTotal is 30
console.log(realTotal * 2); // 60 - works because it's a real value
```

**Explanation:** `calculateTotalLogOnly` only shows the value once — it never hands it back, so `total` ends up `undefined`. `calculateTotal` correctly returns a usable number.

**Key Points:**

- `console.log()` is for humans watching the program run — a one-time display.
- `return` is for code — it makes a value available for further use.
- This distinction is one of the most common early bugs — always check which one you actually need.

### Topic 4: Function scope and reusable functions

Theory:
Variables declared inside a function only exist inside that function (function scope). A genuinely reusable function relies only on its parameters, not on external variables that might change unexpectedly.

Practical:
Avoid reading or modifying variables from outside a function unless they're passed in as parameters — this keeps functions predictable and safe to reuse anywhere.

Code Example:

```js
function calculateArea(length, width) {
  let area = length * width; // "area" only exists inside this function
  return area;
}

console.log(calculateArea(5, 4)); // 20
// console.log(area); // Error! "area" is not defined out here
```

**Explanation:** `area` is scoped to `calculateArea` — it disappears once the function finishes running, and nothing outside the function can see it.

**Key Points:**

- Function scope means variables declared inside a function stay inside it.
- Reusable functions depend only on their parameters, not on outside state.
- This makes functions predictable — the same inputs always produce the same output.

## Recap

- Default parameters provide fallback values when an argument is missing or `undefined`.
- Keep multi-parameter functions clean with logical order and descriptive names.
- `return` makes a value reusable; `console.log()` only displays it once.
- Function scope keeps a function's internal variables private and predictable.

## What's Next

Practice for today: `public/coding/JavaScript/day-011-arrow-functions.md`. Day 12 covers arrow functions — a shorter, modern way to write functions.

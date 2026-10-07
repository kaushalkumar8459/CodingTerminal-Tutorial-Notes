# Day 042 — Destructuring

Matches Tutorial Day 42 (Advanced Objects) — practice moves into destructuring here,
ahead of Tutorial Day 44's deep dive. No limit on how many you solve.

## Basic

1. Destructure `name` and `age` from a user object into separate variables.
2. Destructure the first two elements of an array into named variables.
3. Destructure an object property into a variable with a different name (renaming),
   e.g. `const { name: userName } = user`.
4. Destructure a function's object parameter directly (e.g. `function greet({ name }) {}`).
5. Provide a default value while destructuring, for a property that might be missing.

## Concept

6. Destructure a nested object's inner property directly (e.g. `const { address: { city } } = user`).
7. Destructure an array while skipping an element (e.g. `const [first, , third] = arr`).
8. Use array destructuring to cleanly swap two variables' values.
9. Destructure the rest of an array into a new array using `...rest`
   (e.g. `const [first, ...others] = arr`).
10. Destructure the rest of an object's properties into a new object using `...rest`.

## Challenge

11. **Refactor 20 of your earlier day's answers** (from Modules 1–3 so far) to use
    destructuring wherever it improves readability — especially function parameters
    that currently access `obj.property` repeatedly.

## Interview-style questions

12. What's the practical benefit of destructuring a function's parameters directly,
    instead of accessing `params.property` throughout the function body?
13. How do you provide a fallback/default value for a property that might not exist,
    while destructuring?
14. What's the difference between array destructuring and object destructuring in terms
    of how position vs name determines what gets assigned?

## Notes

- Destructuring doesn't change how objects/arrays work — it's just a shorter way to pull
  values out into variables. Everything you could do before destructuring is still valid.
- The refactoring challenge (#11) is one of the most valuable exercises today — seeing
  destructuring applied to code you already wrote makes the benefit click immediately.

<!-- codingterminal-solution:start -->

# Day 042 — Solution: Destructuring

**1–5. Basic destructuring**

```js
const user = { name: "Asha", age: 25 };
const { name, age } = user;
const [first, second] = ["red", "blue"];
const { name: userName } = user;
function greet({ name: personName }) {
  return `Hello, ${personName}`;
}
const { city = "Unknown" } = user;
```

**6. Nested property**

```js
const profile = { address: { city: "Pune", country: "India" } };
const {
  address: { city },
} = profile;
```

**7. Skip an array element**

```js
const [firstColor, , thirdColor] = ["red", "green", "blue"];
```

**8. Swap variables**

```js
let left = "left";
let right = "right";
[left, right] = [right, left];
```

**9. Rest of an array**

```js
const [head, ...tail] = [1, 2, 3, 4];
```

**10. Rest of an object**

```js
const account = { id: 1, name: "Asha", role: "admin" };
const { id, ...accountDetails } = account;
```

**11. Refactoring pattern**

```js
function displayStudent({ name, marks: { math, science } }) {
  return `${name}: ${math + science}`;
}
```

## Interview-style questions

**12.** Destructured parameters document the fields a function needs and remove repeated `params.property` expressions.

**13.** Add `= fallback` to the property: `const { theme = "light" } = settings`.

**14.** Array destructuring assigns by position; object destructuring assigns by property name.

<!-- codingterminal-solution:end -->


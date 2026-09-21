---
title: The Rest Operator
slug: day-052-the-rest-operator
dayLabel: Day 52
level: Intermediate
estimatedMinutes: 25
order: 52
track: javascript
---

# Day 52 [Intermediate]: The Rest Operator

## Goal

Master the rest operator (`...`) — the counterpart to spread — for collecting multiple values into a single array or object.

## Prerequisites

- Day 51 (spread operator)
- Day 44 (destructuring rest patterns, briefly seen)

## Explanation

The rest operator uses the exact same `...` syntax as spread, but does the **opposite job**: instead of "expanding" a collection into individual items, it **collects** multiple individual items into a single array or object. The direction (spread vs rest) is determined entirely by context: spread appears when _creating_ an array/object or _calling_ a function; rest appears when _receiving_ function parameters or _destructuring_.

## Topic by Topic

### Topic 1: Rest parameters in functions

Theory:
`function name(...args) { }` collects any number of arguments passed into the function into a single real array called `args` (or whatever name you choose).

Code Example:

```js
function sum(...numbers) {
  return numbers.reduce((total, n) => total + n, 0);
}

console.log(sum(1, 2, 3)); // 6
console.log(sum(10, 20, 30, 40)); // 100
```

**Explanation:** No matter how many arguments are passed, they're all collected into the `numbers` array inside the function — allowing the function to accept an unlimited number of arguments.

**Key Points:**

- Rest parameters collect all remaining arguments into a real array.
- The rest parameter must be the LAST parameter in the function signature.
- This is how you build functions that accept a flexible/unlimited number of arguments.

### Topic 2: Rest with fixed parameters combined

Theory:
Rest parameters can follow one or more regular named parameters — the regular parameters get their specific values, and rest collects everything else.

Code Example:

```js
function introduce(greeting, ...names) {
  names.forEach((name) => console.log(`${greeting}, ${name}!`));
}

introduce("Hello", "Aisha", "Ben", "Chen");
// Hello, Aisha!
// Hello, Ben!
// Hello, Chen!
```

**Explanation:** `greeting` captures the first argument (`"Hello"`); every argument after that gets collected into the `names` array — a common, flexible function shape.

**Key Points:**

- Fixed parameters come first, rest parameter comes last.
- Only ONE rest parameter is allowed per function, and it must be at the very end.
- This pattern is useful whenever a function has some required arguments plus an open-ended list.

### Topic 3: Rest in array destructuring

Theory:
When destructuring an array, `...rest` collects any remaining elements (after the ones already named) into a new array.

Code Example:

```js
const scores = [95, 88, 76, 65, 50];
const [highest, secondHighest, ...remaining] = scores;

console.log(highest); // 95
console.log(secondHighest); // 88
console.log(remaining); // [76, 65, 50]
```

**Explanation:** `highest` and `secondHighest` take the first two positions; `...remaining` scoops up everything left over into its own array.

**Key Points:**

- `...rest` in destructuring must come last, just like in function parameters.
- Useful whenever you want to separate "the first few items" from "everything else."
- Combines naturally with array methods — you can immediately call `.reduce()`/`.map()` on the rest array.

### Topic 4: Rest in object destructuring

Theory:
Similarly, when destructuring an object, `...rest` collects any properties not explicitly named into a new object.

Code Example:

```js
const user = {
  id: 1,
  name: "Farah",
  email: "farah@example.com",
  role: "admin",
};
const { id, ...otherDetails } = user;

console.log(id); // 1
console.log(otherDetails); // { name: "Farah", email: "farah@example.com", role: "admin" }
```

**Explanation:** `id` is pulled out individually; every other property from `user` is gathered into `otherDetails` as a new object — useful for separating "one specific field" from "the rest of the data."

**Key Points:**

- Object rest collects unnamed properties into a new object, similar to array rest.
- Commonly used to remove a specific field while keeping the rest (e.g. omitting a password field before displaying user data).
- Rest (in both arrays and objects) always creates a genuinely new array/object for the leftover values.

## Recap

- Rest parameters (`...args`) collect multiple function arguments into a real array.
- Array/object destructuring can use `...rest` to collect leftover elements/properties.
- Spread expands; rest collects — same syntax, opposite direction, determined by context.

## What's Next

Practice for today: `public/coding/JavaScript/day-052-callback-functions.md`. Day 53 covers default parameters and other modern syntax refinements.

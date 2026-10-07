# Day 011 — Arrow Functions

Matches Tutorial Day 11 (Function Parameters In Depth) — practice moves into arrow
function syntax here, ahead of Tutorial Day 12. No limit on how many you solve.

## Basic

1. Convert `function add(a, b) { return a + b; }` into an arrow function.
2. Write an arrow function `square = (n) => n * n` using implicit return.
3. Write an arrow function with a single parameter, omitting the parentheses (e.g. `n => n * 2`).
4. Write an arrow function with no parameters (e.g. `() => "Hello"`).
5. Write an arrow function `isEven = (n) => n % 2 === 0`.
6. Write an arrow function version of `greet(name)` from Day 9.
7. Write an arrow function that takes 3 parameters and returns their sum.
8. Write an arrow function with a default parameter.
9. Store an arrow function in a `const` and call it multiple times.
10. Write an arrow function with an explicit `{ return ... }` block body (not implicit return).

## Concept

11. Convert 10 of your Day 9/Day 10 regular functions into arrow functions.
12. Show an example where implicit return works cleanly for a one-line function, but you'd
    need a block body (`{ }` with `return`) for a multi-step function.
13. Write an arrow function that returns an object literal directly — note the parentheses
    needed around `{ }` to avoid it being read as a function body.
14. Rewrite a `filter`-style manual loop as a short arrow function you could reuse as a
    condition-checker (don't worry about actually using `.filter()` yet — just the arrow syntax).
15. Compare calling a regular function vs an arrow function stored in a variable — are they
    called the same way?

## Interview-style questions

16. What is the main syntax difference between a regular function and an arrow function?
17. What does "implicit return" mean, and when can you use it?
18. Why do you need parentheses around an object literal when using implicit return, like `() => ({ name: "Sam" })`?

## Challenge

19. Build an **arrow-function utility library**: rewrite at least 10 of your existing
    Day 9/10 utility functions purely as arrow functions in one file (e.g. `utilsArrow.js`).

## Notes

- Arrow functions don't have their own `this` (they use the surrounding scope's `this`) —
  you don't need to fully understand this yet, just note it; we'll dig into it on Day 12
  and again on Day 58.
- Implicit return only works for single-expression bodies — the moment you need more than
  one statement, switch to a `{ }` block body with an explicit `return`.

<!-- codingterminal-solution:start -->

# Day 011 — Solution: Arrow Functions

Reference solutions for `day-011-arrow-functions.md`. Try the practice file yourself
first before checking these.

## Basic

**1. Convert `add` to an arrow function**

```js
const add = (a, b) => a + b;
console.log(add(2, 3)); // 5
```

**2. `square` with implicit return**

```js
const square = (n) => n * n;
console.log(square(5)); // 25
```

**3. Single parameter, no parentheses**

```js
const double = (n) => n * 2;
console.log(double(4)); // 8
```

**4. No parameters**

```js
const sayHello = () => "Hello";
console.log(sayHello()); // "Hello"
```

**5. `isEven`**

```js
const isEven = (n) => n % 2 === 0;
console.log(isEven(6)); // true
```

**6. Arrow version of `greet(name)`**

```js
const greet = (name) => "Hello, " + name;
console.log(greet("Kabir")); // "Hello, Kabir"
```

**7. Three parameters, returns their sum**

```js
const sumThree = (a, b, c) => a + b + c;
console.log(sumThree(1, 2, 3)); // 6
```

**8. Arrow function with a default parameter**

```js
const greetWithDefault = (name = "Guest") => `Hi, ${name}`;
console.log(greetWithDefault()); // "Hi, Guest"
```

**9. Store in `const`, call multiple times**

```js
const triple = (n) => n * 3;
console.log(triple(2)); // 6
console.log(triple(10)); // 30
```

**10. Explicit block body**

```js
const describe = (n) => {
  const label = n % 2 === 0 ? "even" : "odd";
  return `${n} is ${label}`;
};

console.log(describe(7)); // "7 is odd"
```

## Concept

**11. Convert regular functions to arrow functions (a few examples)**

```js
// Regular (from Day 9)
function isPrime(n) {
  if (n <= 1) return false;
  for (let i = 2; i <= Math.sqrt(n); i++) {
    if (n % i === 0) return false;
  }
  return true;
}

// Arrow version — block body needed since it has multiple steps
const isPrimeArrow = (n) => {
  if (n <= 1) return false;
  for (let i = 2; i <= Math.sqrt(n); i++) {
    if (n % i === 0) return false;
  }
  return true;
};

console.log(isPrimeArrow(17)); // true
```

**12. Implicit vs block body**

```js
// One line -> implicit return works cleanly
const cube = (n) => n ** 3;

// Multiple steps -> needs a block body with explicit return
const factorial = (n) => {
  let result = 1;
  for (let i = 2; i <= n; i++) {
    result *= i;
  }
  return result;
};

console.log(cube(3), factorial(5)); // 27 120
```

**13. Implicitly returning an object literal**

```js
const createUser = (name, age) => ({ name, age });
console.log(createUser("Zoe", 25)); // { name: "Zoe", age: 25 }
// Parentheses around { } are required — without them, JS reads { as the start
// of a function BODY, not an object literal.
```

**14. Filter-style condition-checker as an arrow function**

```js
const isAdult = (person) => person.age >= 18;

console.log(isAdult({ age: 20 })); // true
console.log(isAdult({ age: 10 })); // false
```

**15. Calling a regular function vs an arrow function stored in a variable**

```js
function regularAdd(a, b) {
  return a + b;
}
const arrowAdd = (a, b) => a + b;

console.log(regularAdd(2, 3)); // 5 — called the same way
console.log(arrowAdd(2, 3)); // 5 — called the same way
// Both are called identically: name(arguments). The difference is only in how
// they're DEFINED, and in how they handle `this` (covered fully on Day 58).
```

<!-- codingterminal-solution:end -->


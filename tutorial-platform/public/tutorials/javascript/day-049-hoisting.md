---
title: Hoisting
slug: day-049-hoisting
dayLabel: Day 49
level: Intermediate
estimatedMinutes: 30
order: 49
track: javascript
---

# Day 49 [Intermediate]: Hoisting

## Goal

Understand hoisting — how JavaScript processes declarations before running code — and the Temporal Dead Zone for `let`/`const`.

## Prerequisites

- Day 48 (scope)

## Explanation

Before running your code line by line, JavaScript first scans through and "registers" variable and function declarations in advance — this is called **hoisting**. It doesn't literally move code around; it just means declarations are set up before execution begins, which explains some behavior that looks surprising at first glance.

`var` declarations are hoisted and initialized with `undefined` immediately — meaning you can reference them before their line runs (you just get `undefined`, not an error). `let`/`const` are also hoisted, but they are NOT initialized early — accessing them before their declaration line throws an error, because they sit in the **Temporal Dead Zone (TDZ)** until that line runs. Function _declarations_ are fully hoisted (usable before they appear); function _expressions_ are not.

## Topic by Topic

### Topic 1: Variable hoisting with `var`

Theory:
`var` declarations are hoisted to the top of their scope and initialized with `undefined` — so referencing them early doesn't error, but gives `undefined`.

Code Example:

```js
console.log(city); // undefined - NOT an error, thanks to hoisting
var city = "Mumbai";
console.log(city); // "Mumbai"
```

**Explanation:** Behind the scenes, JavaScript treats this as if `var city;` was moved to the top, and the assignment (`city = "Mumbai"`) stayed in place — so the first `console.log` sees the hoisted, but not-yet-assigned, variable.

**Key Points:**

- `var` declarations are hoisted and initialized to `undefined` automatically.
- Only the declaration is hoisted, not the assignment — the value isn't available until that line actually runs.
- This behavior is a common source of confusing bugs, another reason `var` is avoided in modern code.

### Topic 2: The Temporal Dead Zone (`let`/`const`)

Theory:
`let`/`const` are hoisted too, but they remain in an inaccessible state (the "Temporal Dead Zone") from the start of their scope until their declaration line actually executes.

Code Example:

```js
console.log(age); // ReferenceError! Cannot access 'age' before initialization
let age = 25;
```

**Explanation:** Unlike `var`, `let`/`const` refuse to be used at all before their declaration runs — this "fail loudly" behavior is actually safer, since it surfaces bugs immediately instead of silently returning `undefined`.

**Key Points:**

- `let`/`const` are hoisted but not initialized — using them early throws a `ReferenceError`.
- This period before the declaration line is called the Temporal Dead Zone (TDZ).
- This stricter behavior is one more reason `let`/`const` are preferred over `var`.

### Topic 3: Function declaration hoisting

Theory:
Function _declarations_ (`function name() {}`) are fully hoisted — including their entire body — so they can be called before they appear in the file.

Code Example:

```js
sayHi(); // "Hi!" - works, even though sayHi is defined below

function sayHi() {
  console.log("Hi!");
}
```

**Explanation:** The entire function (not just its name) is hoisted, so calling it earlier in the file works perfectly fine — a genuinely useful and safe form of hoisting.

**Key Points:**

- Function declarations are fully hoisted, body included — safe to call before their definition appears.
- This is different from variable hoisting, which only hoists the declaration, not the value.
- This is one hoisting behavior that's actually convenient and commonly relied upon.

### Topic 4: Function expressions are NOT hoisted the same way

Theory:
A function stored in a variable (`const name = function() {}` or an arrow function) follows variable hoisting rules for that variable — meaning it can't be called before the assignment line runs.

Code Example:

```js
// greet(); // TypeError! greet is not a function yet (or ReferenceError with const/let)

const greet = function () {
  console.log("Hello!");
};

greet(); // "Hello!" - works fine here, after the assignment
```

**Explanation:** Since `greet` is declared with `const`, it's in the TDZ until the assignment line runs — calling it earlier fails, unlike a true function declaration.

**Key Points:**

- Function expressions (including arrow functions) follow the hoisting rules of the variable they're stored in.
- Only function _declarations_ are safe to call before they appear in the file.
- When in doubt, define functions before using them — relying on hoisting for readability is generally discouraged anyway.

## Recap

- `var` is hoisted and initialized to `undefined`; `let`/`const` are hoisted but stay inaccessible (TDZ) until their line runs.
- Function declarations are fully hoisted, including their body; function expressions are not.
- Understanding hoisting explains several "surprising" behaviors, but relying on it for style isn't recommended.

## What's Next

Practice for today: `public/coding/JavaScript/day-049-hoisting-challenges.md` — predict-the-output questions. Day 50 covers primitive vs reference values.

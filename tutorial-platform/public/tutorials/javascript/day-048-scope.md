---
title: Scope
slug: day-048-scope
dayLabel: Day 48
level: Intermediate
estimatedMinutes: 30
order: 48
track: javascript
---

# Day 48 [Intermediate]: Scope

## Goal

Understand global, function, and block scope precisely, and how lexical scope determines what variables are visible where.

## Prerequisites

- Day 4 (var/let/const), Module 3 (functions used throughout)

## Explanation

**Scope** determines where in your code a variable is accessible. **Global scope** means a variable is accessible everywhere in your program. **Function scope** means a variable is only accessible inside the function it was declared in — `var` follows this rule specifically. **Block scope** means a variable is only accessible inside the nearest `{ }` block it was declared in — `let` and `const` follow this rule, which is one reason they're preferred over `var`.

**Lexical scope** means scope is determined by _where code is physically written_ in the file, not by how or when it's called. A function can always "see" variables from the scope it was written inside, no matter where that function is later called from — this becomes essential for understanding closures on Day 57.

## Topic by Topic

### Topic 1: Global scope

Theory:
A variable declared outside any function or block is in the global scope — accessible from anywhere in the program.

Code Example:

```js
const appName = "MyApp"; // global scope

function showAppName() {
  console.log(appName); // accessible here too
}

showAppName(); // "MyApp"
console.log(appName); // "MyApp"
```

**Explanation:** `appName` is declared outside everything, so both the function and the top-level code can access it freely.

**Key Points:**

- Global variables are accessible from anywhere, including inside functions.
- Overusing global variables makes code harder to reason about — minimize their use in real projects.
- Global scope is the "outermost" layer everything else is nested inside.

### Topic 2: Function scope

Theory:
A variable declared with `var` inside a function is only accessible within that function — not from outside it.

Code Example:

```js
function calculate() {
  var result = 100; // function-scoped
  console.log(result); // accessible here
}

calculate();
// console.log(result); // Error! "result" is not defined out here
```

**Explanation:** `result` only exists while `calculate()` is running, and only within that function's body — it disappears entirely once the function finishes.

**Key Points:**

- `var` variables are scoped to the nearest enclosing function, not to blocks like `if`/`for`.
- Trying to access a function-scoped variable from outside always throws an error.
- This was the ONLY kind of scope `var` supported, before `let`/`const` introduced block scope.

### Topic 3: Block scope

Theory:
A variable declared with `let` or `const` inside any `{ }` block (not just functions) is only accessible within that specific block.

Code Example:

```js
if (true) {
  let message = "Hello from inside the block";
  console.log(message); // accessible here
}
// console.log(message); // Error! block-scoped, not visible out here

for (let i = 0; i < 3; i++) {
  // "i" is scoped to this loop's block
}
// console.log(i); // Error! not accessible outside the loop
```

**Explanation:** `let`/`const` respect `{ }` boundaries strictly — a variable declared inside an `if` or `for` block simply doesn't exist outside that block.

**Key Points:**

- `let`/`const` are block-scoped — any `{ }` creates a new scope boundary for them.
- This is more predictable than `var`'s "leaking" behavior shown back on Day 4.
- Block scope is one of the strongest reasons to prefer `let`/`const` over `var` in modern code.

### Topic 4: Lexical scope

Theory:
Lexical scope means a function's access to outer variables is determined by _where the function is written_ in the source code, not by where or how it's later called.

Code Example:

```js
function outer() {
  const secret = "hidden value";

  function inner() {
    console.log(secret); // inner can see "secret" because of WHERE it's written
  }

  inner();
}

outer(); // "hidden value"
```

**Explanation:** `inner()` is physically written inside `outer()`, so it lexically "sees" `outer`'s variables — this nesting relationship is fixed by the code's structure, not by anything that happens at runtime.

**Key Points:**

- Lexical scope is determined by the physical nesting of code, fixed when the code is written.
- Inner functions can always access variables from any enclosing outer function/scope.
- This exact mechanism is what makes closures (Day 57) possible.

## Recap

- Global scope: accessible everywhere. Function scope (`var`): accessible only inside that function.
- Block scope (`let`/`const`): accessible only inside the nearest `{ }` block.
- Lexical scope: a function's access to outer variables is fixed by where it's written in the code.

## What's Next

Practice for today: `public/coding/JavaScript/day-048-scope-practice.md`. Day 49 covers hoisting — how declarations are processed before code runs.

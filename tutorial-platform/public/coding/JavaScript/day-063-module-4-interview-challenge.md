# Day 063 — Module 4 Interview Challenge (25 Advanced Questions)

Matches Tutorial Day 63 (Module 4 Revision and Interview Lab). Covers scope, hoisting,
closures, this, call/apply/bind, prototype, and higher-order functions. No limit on
revisiting or extending further.

## Scope & Hoisting (6)

1. Explain the difference between global, function, and block scope with one example each.
2. What is the Temporal Dead Zone, and which declarations does it apply to?
3. Why does `var` "leak" out of `if`/`for` blocks, but `let`/`const` do not?
4. Predict the output: a `var` declared and used before its line, inside a function.
5. Predict the output: a function DECLARATION called before its definition in the file.
6. Predict the output: a function EXPRESSION (arrow or regular) called before its
   definition in the file.

## Closures (5)

7. Define a closure in your own words.
8. Build `createCounter()` from memory and explain why multiple calls to it produce
   independent counters.
9. Why are closures useful for creating "private" variables?
10. What's a real-world use case for `memoize()`, and how does it rely on closures?
11. Predict the output of a classic "closures in a loop with `var`" gotcha example
    (write one yourself using `var i` inside a loop with a `setTimeout`, and predict
    what all the callbacks will log).

## this, call/apply/bind (7)

12. What determines `this` inside a regular function?
13. What determines `this` inside an arrow function?
14. Why does extracting an object's method into a standalone variable break its `this`?
15. What's the difference between `.call()` and `.apply()`?
16. What does `.bind()` return, and how is that different from `.call()`/`.apply()`?
17. Why would you use `.bind()` when passing an object's method as an event listener
    or `setTimeout` callback?
18. Predict the output of an arrow function used as a DIRECT object method vs an arrow
    function nested INSIDE a regular object method.

## Prototypes (4)

19. What is a prototype, and what is the prototype chain?
20. Why do all arrays share the same `.map()`/`.filter()` methods instead of each having
    their own copy?
21. What does `Object.create(proto)` do?
22. How does `instanceof` relate to the prototype chain?

## Higher-Order Functions (3)

23. What makes a function a "higher-order function"?
24. Give one example of a function that ACCEPTS another function, and one that RETURNS
    another function.
25. Implement a simple `once(fn)` function from memory, and explain how closures make
    it possible.

## Notes

- Treat this as a genuine interview simulation — try answering out loud or in writing
  before checking back against the tutorial days, just like a real interview would feel.
- If more than a handful of these feel shaky, that's valuable signal — Module 5 (OOP)
  builds directly on `this` and prototypes, so it's worth the extra revision time now.

<!-- codingterminal-solution:start -->

# Day 063 — Solution: Module 4 Interview Challenge

## Scope and hoisting

1. Global scope is available broadly, function scope exists inside a function, and block scope exists inside `{}`. `var` is function-scoped; `let` is block-scoped.
2. The Temporal Dead Zone is the period before a `let` or `const` declaration initializes; access during it throws.
3. `var` belongs to the function, while `let` and `const` belong to the block.
4. `var value; console.log(value);` prints `undefined` when used before assignment.
5. A function declaration can be called before its definition because it is initialized during setup.
6. A function expression or arrow stored in `let`/`const` cannot be called before initialization.

## Closures

7. A closure is a function that retains access to variables from its creation scope.

```js
function createCounter() {
  let count = 0;
  return () => ++count;
}
```

8. Every `createCounter()` call creates a separate `count` variable.
9. Closures keep local variables reachable through controlled methods while preventing direct access.
10. `memoize()` stores previous results in a private closure cache, avoiding repeated expensive work.
11. A `var` loop callback usually logs `3, 3, 3` because all callbacks share the final loop variable.

## this, call, apply, and bind

12. Regular-function `this` is determined by the call site.
13. Arrow-function `this` is inherited lexically from its surrounding scope.
14. Extracting a method removes the object receiver, so the standalone call no longer supplies the original object as `this`.
15. `call` takes individual arguments; `apply` takes an argument array.
16. `bind` returns a new function with a fixed receiver; `call` and `apply` invoke immediately.
17. `bind` preserves the intended object when a method is later used as a callback.
18. An arrow direct object method does not receive the object as `this`; an arrow nested inside a regular method captures that method's object receiver.

## Prototypes

19. A prototype is the object used for inherited lookup; the prototype chain is the sequence JavaScript searches.
20. Arrays share methods through `Array.prototype`, avoiding one copy of each method per array.
21. `Object.create(proto)` creates an object whose prototype is `proto`.
22. `instanceof` checks whether a constructor's prototype appears in the object's prototype chain.

## Higher-order functions

23. A higher-order function accepts a function, returns a function, or both.
24. `numbers.map(double)` accepts a function; `makeAdder(2)` can return a function.
25.

```js
function once(fn) {
  let called = false;
  let result;
  return (...args) => {
    if (!called) {
      called = true;
      result = fn(...args);
    }
    return result;
  };
}
```

The closure stores `called` and `result` privately between invocations.

<!-- codingterminal-solution:end -->


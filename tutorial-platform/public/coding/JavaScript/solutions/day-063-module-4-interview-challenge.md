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

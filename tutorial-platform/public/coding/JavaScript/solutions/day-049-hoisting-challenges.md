# Day 049 — Solution: Hoisting Challenges

**1.** `undefined`: the `var` declaration is initialized before the assignment.

**2–3.** Both `let` and `const` throw a `ReferenceError` because they are in the temporal dead zone until their declaration executes.

**4.** Prints `hi`; function declarations are initialized before the surrounding code runs.

**5.** Throws a `ReferenceError`; the `const` arrow function is not initialized before the call.

**6.** Prints `undefined`. The function-scoped `var x` shadows the outer `x` and is hoisted to the top of `test`.

**7.** Prints `10`; `var` is not block-scoped.

**8.** Throws a `ReferenceError`; `z` is block-scoped and unavailable outside the `if` block.

**9.** Prints `function`; the inner function declaration is available throughout `outer`.

**10.** Prints `undefined`; the `var` binding exists before its assignment.

**11.** Prints `3`; `var i` remains available after the loop.

**12.** Throws a `ReferenceError`; the `let i` binding belongs to the loop block.

**13.** The Temporal Dead Zone is the time between entering a scope and executing a `let`/`const` declaration. Accessing the binding during that time throws.

**14.** Hoisting does not physically move source lines. JavaScript creates bindings during setup before executing the code, then assignments still happen in their written order.

**15.** Function declarations are initialized during setup; a `const` arrow function is only initialized when its assignment line executes.

**16.** Throws a `ReferenceError`: the inner `let value` shadows the outer variable for the whole function block and is still in its TDZ when logged.

**17.** Yes, generator function declarations are hoisted like regular function declarations.

**18. Closure gotcha:**

```js
var callbacks = [];
for (var index = 0; index < 3; index++) callbacks.push(() => index);
console.log(callbacks.map((callback) => callback())); // [3, 3, 3]
```

**19.** Relying on hoisting can hide a function's dependencies and make reading the file's execution order harder. Defining code before using it is usually clearer.

**20.** Hoisting means JavaScript prepares declarations before executing a scope. Function declarations can be called early, `var` exists as `undefined`, and `let`/`const` exist but cannot be accessed until their declaration line runs.

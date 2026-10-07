# Day 049 — Hoisting Challenges (Predict the Output)

Matches Tutorial Day 49 (Hoisting). 20 predict-the-output questions — write down your
prediction BEFORE running each one. No limit on adding more of your own afterward.

1. `console.log(a); var a = 5;` — what prints?
2. `console.log(b); let b = 5;` — what happens?
3. `console.log(c); const c = 5;` — what happens?
4. `sayHello(); function sayHello() { console.log("hi"); }` — what prints?
5. `sayBye(); const sayBye = () => console.log("bye");` — what happens?
6. ```js
   var x = 1;
   function test() {
     console.log(x);
     var x = 2;
   }
   test();
   ```
   What prints, and why (think about hoisting WITHIN the function)?
7. ```js
   if (true) {
     var y = 10;
   }
   console.log(y);
   ```
   What prints?
8. ```js
   if (true) {
     let z = 10;
   }
   console.log(z);
   ```
   What happens?
9. ```js
   function outer() {
     console.log(typeof inner);
     function inner() {}
   }
   outer();
   ```
   What prints?
10. ```js
    console.log(typeof myVar);
    var myVar = "hello";
    ```
    What prints?
11. ```js
    for (var i = 0; i < 3; i++) {}
    console.log(i);
    ```
    What prints?
12. ```js
    for (let i = 0; i < 3; i++) {}
    console.log(i);
    ```
    What happens?
13. What is the Temporal Dead Zone, in your own words, based on questions 2-3 and 8?
14. Does hoisting move code around physically, or is that just a common misconception?
    Explain what's actually happening.
15. Why does calling a function declaration before its definition work, but calling a
    `const` arrow function before its definition does not?
16. ```js
    let value = "outer";
    function test() {
      console.log(value);
      let value = "inner";
    }
    test();
    ```
    What happens, and why (careful — this is trickier than it looks)?
17. Are `function*` (generator functions, previewed later) hoisted the same way as
    regular function declarations? (You can research this one, since generators haven't
    been covered yet.)
18. Write your own hoisting "gotcha" example using `var` inside a loop combined with a
    function that captures it (a preview of closures + hoisting interacting).
19. Explain why relying on hoisting for code style (calling functions before they're
    defined in the file) is generally discouraged, even though it technically works for
    function declarations.
20. Write a short explanation (a few sentences) of hoisting that you could give to
    someone who has never heard of it — teaching it back is a great way to confirm you
    understand it.

## Notes

- Always write your prediction down BEFORE running the code — comparing your prediction
  to the actual result is what actually builds understanding, not just seeing the
  answer.
- If several of these surprised you, that's completely normal — hoisting is one of the
  most commonly misunderstood JavaScript topics, even among experienced developers.

<!-- codingterminal-solution:start -->

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

<!-- codingterminal-solution:end -->


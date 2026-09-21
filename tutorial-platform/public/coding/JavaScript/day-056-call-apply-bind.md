# Day 056 — call/apply/bind (borrowFunction, bindFunction)

Matches Tutorial Day 56 (Higher-Order Functions In Depth) — practice previews
call/apply/bind here, ahead of Tutorial Day 59's full explanation. No limit on how many
you solve.

## Basic

1. Use `.call()` to invoke a function with a specific `this` value.
2. Use `.apply()` to invoke a function with a specific `this` value AND an array of arguments.
3. Use `.bind()` to create a new function with `this` permanently set, then call that
   new function later.
4. Compare `.call()` and `.apply()` on the same function — one with individual
   arguments, one with an array — confirm they produce the same result.
5. Use `.bind()` to pre-fill (partially apply) one argument of a function, creating a
   more specific version of it.

## Concept — function borrowing

6. Given two objects with similar `introduce()` methods, use `.call()` to "borrow" one
   object's method and run it with the OTHER object as `this`.
7. Write a `borrowFunction(sourceObj, methodName, targetObj)` helper that calls
   `sourceObj[methodName]` with `targetObj` as `this`, using `.call()`.
8. Write a `bindFunction(fn, context)` helper that returns a new function permanently
   bound to `context`, without using the real `.bind()` (implement it using a closure
   and `.apply()` internally).
9. Use `.apply()` combined with `Math.max()` to find the maximum value in an array
   (revisiting the Day 31 spread-based approach, but with `apply` instead).
10. Create an object method using a regular function, then extract it into a standalone
    variable and use `.bind(originalObject)` to fix its `this` value permanently before
    passing it elsewhere (e.g. as a callback).

## Interview-style questions

11. What's the key difference between `.call()` and `.apply()`?
12. What does `.bind()` return — does it call the function immediately, or does it
    return something to be called later?
13. Why would you need `.bind()` specifically when passing an object's method as a
    callback (like to `setTimeout` or an event listener)?

## Notes

- `.call(thisArg, arg1, arg2, ...)` takes individual arguments; `.apply(thisArg, [args])`
  takes an array of arguments — that's the entire difference between them.
- `.bind()` is the one of these three that does NOT call the function immediately — it
  returns a new, permanently-bound function for you to call whenever you're ready.

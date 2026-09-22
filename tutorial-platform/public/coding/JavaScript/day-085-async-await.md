# Day 085 — Async/Await (Convert Promise Solutions)

Matches Tutorial Day 85 (Promise Combinators In Depth) — practice previews async/await
here, ahead of Tutorial Day 86's full explanation. No limit on how many you convert.

## Basic

1. Write a simple `async function getMessage() { return "Hello"; }` and call it —
   observe that it actually returns a PROMISE, not a plain string.
2. Use `await` inside an `async function` to "unwrap" a Promise's resolved value
   directly, instead of using `.then()`.
3. Convert one of your Day 80 Promise-returning functions (e.g. `login()`) into an
   `async` function that uses `await` to call it and log the result.
4. Add a `try/catch` block around an `await` call that might reject, and confirm
   errors are caught there instead of needing `.catch()`.
5. Convert a simple two-step `.then().then()` chain into equivalent `async/await` code
   using two `await` statements in sequence.

## Concept — converting your Day 81 chain

6. Convert your Day 81 Promise-chain version of `login → getUser → getOrders → getProducts`
   into a single `async` function using multiple `await` statements in sequence.
7. Add one `try/catch` around the ENTIRE async function body to handle any failure
   from any of the awaited steps.
8. Compare this async/await version SIDE BY SIDE with your Day 79 callback version and
   your Day 81 Promise-chain version — which do you find most readable, and why?
9. Convert your Day 83 `Promise.all()` example into an async function that
   `await`s the `Promise.all([...])` call directly.

## Interview-style questions

10. Does an `async function` always return a Promise, even if you `return` a plain
    value inside it?
11. What does `await` actually do to the surrounding `async function`'s execution?
12. Why does `try/catch` work for handling errors with `await`, when it wouldn't work
    directly with a plain (non-awaited) Promise?

## Notes

- `async/await` doesn't replace Promises — it's built directly ON TOP of them, as a
  cleaner way to WRITE Promise-based code, making it look more like familiar synchronous
  code.
- Converting all three versions (callback, Promise chain, async/await) of the exact same
  operation is one of the best exercises for truly appreciating why async/await exists.

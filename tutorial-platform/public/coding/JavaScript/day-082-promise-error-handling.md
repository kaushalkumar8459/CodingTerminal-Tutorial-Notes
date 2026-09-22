# Day 082 — Promise Error Handling

Matches Tutorial Day 82 (Callback-Based Async and Callback Hell Solutions). No limit on
how many you build.

## Basic

1. Create a Promise that rejects with a custom `Error` object, and handle it with `.catch()`.
2. Create a Promise chain where the SECOND step fails — confirm the third step never
   runs, and `.catch()` handles the failure correctly.
3. Add a `.finally()` to a Promise chain that logs "Cleanup done" regardless of success
   or failure.
4. Create a custom Error class (`class ValidationError extends Error`) and reject a
   Promise with an instance of it — check the error's `instanceof` in your `.catch()`.
5. Handle DIFFERENT error types differently in one `.catch()` (e.g. check
   `error instanceof ValidationError` vs a generic error).

## Concept

6. Build a `validateAge(age)` function returning a Promise that rejects with a specific
   error message if age is negative or non-numeric.
7. Chain `validateAge()` into a longer Promise chain (e.g. validate, then "save" via
   another simulated async step) and confirm a validation failure correctly short-circuits
   the rest of the chain.
8. Build a retry mechanism: if a simulated Promise-based operation fails, automatically
   retry it up to 3 times before finally rejecting for real.
9. Add error handling at a SPECIFIC step (a `.catch()` in the MIDDLE of a chain) that
   recovers from an error and lets the chain continue, instead of stopping it entirely
   — compare this to a `.catch()` only at the very end.

## Interview-style questions

10. What's the difference between a `.catch()` placed in the MIDDLE of a chain vs one
    placed at the very END?
11. Does `.finally()` receive the resolved value or rejection reason as an argument?
    What is `.finally()` typically used for?
12. Why might you create custom Error subclasses (like `ValidationError`) instead of
    just using generic `Error` objects everywhere?

## Notes

- A `.catch()` placed mid-chain can "recover" from an error and let the chain continue
  normally afterward — this is a genuinely useful, sometimes overlooked pattern.
- `.finally()` is perfect for cleanup work (hiding a loading spinner, closing a
  connection) that needs to happen NO MATTER what the outcome was.

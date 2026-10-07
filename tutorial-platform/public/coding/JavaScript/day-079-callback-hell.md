# Day 079 — Callback Hell

Matches Tutorial Day 79 (The Call Stack). No limit on how many variations you try.

## The problem

1. Reuse your `login`, `getUser`, `getOrders`, `getProducts` functions from Day 78, and
   chain ALL FOUR together, nesting each call inside the previous one's callback. Notice
   how deeply indented ("nested") this becomes — this is "callback hell."
2. Add basic error handling (checking for an error in each callback) to the nested
   chain, and notice how much MORE nested and repetitive it becomes.

## Refactoring attempts

3. Refactor the nested chain by extracting each step into its own NAMED function
   (instead of anonymous inline callbacks), reducing the visual nesting while keeping
   the same callback-based flow.
4. Try flattening the structure slightly by having each step call the next as a
   separate statement, rather than nesting callbacks directly inside each other's
   function bodies.
5. Write a short comment explaining exactly WHY this nested pattern becomes hard to
   read and maintain as more steps are added.

## Concept

6. Count how many levels of nesting your ORIGINAL (non-refactored) 4-step chain has.
7. Identify at least 3 specific problems with deeply nested callbacks (readability,
   error handling repetition, difficulty reordering steps, etc.) and write them down.
8. Predict: how might a `Promise`-based version of this exact same chain look
   different or cleaner? (You'll build the actual Promise version starting tomorrow.)

## Interview-style questions

9. What is "callback hell," and why does it tend to happen naturally when chaining
   multiple async operations?
10. Why is repeated error-checking in every single callback level a maintenance
    problem?

## Notes

- Don't try to "solve" callback hell today — the goal is to genuinely EXPERIENCE the
  problem firsthand, so that Promises (starting Day 80/83) feel like a clear, motivated
  improvement rather than an arbitrary new syntax to memorize.
- Keep today's messy, deeply-nested code around — you'll rewrite this exact same
  4-step chain using Promises and then async/await later in this module, for a direct
  side-by-side comparison.

<!-- codingterminal-solution:start -->

# Day 079 — Solution: Callback Hell

**1–2. Nested chain**

```js
login("asha", "secret", (error, account) => {
  if (error) return console.error(error);
  getUser(account.username, (error, user) => {
    if (error) return console.error(error);
    getOrders(user.id, (error, orders) => {
      if (error) return console.error(error);
      getProducts((error, products) => {
        if (error) return console.error(error);
        console.log({ account, user, orders, products });
      });
    });
  });
});
```

**3–4. Named-step refactor**

```js
function finish(account, user, orders, products) {
  console.log({ account, user, orders, products });
}
function loadProducts(account, user, orders) {
  getProducts((error, products) =>
    error ? console.error(error) : finish(account, user, orders, products),
  );
}
function loadOrders(account, user) {
  getOrders(user.id, (error, orders) =>
    error ? console.error(error) : loadProducts(account, user, orders),
  );
}
function loadUser(account) {
  getUser(account.username, (error, user) =>
    error ? console.error(error) : loadOrders(account, user),
  );
}
login("asha", "secret", (error, account) =>
  error ? console.error(error) : loadUser(account),
);
```

**5–8.** The original four-step chain has four nested callback levels. It becomes hard to read, repeats error handling, makes reordering steps awkward, and spreads one workflow across many indentation levels. Promises represent each result as a value and allow a flatter `.then().then().catch()` chain.

## Interview-style questions

**9.** Callback hell is deeply nested callback code produced when each asynchronous step starts inside the previous step's callback.

**10.** Repeated error checks increase duplication and create opportunities to forget a failure path; one shared Promise `.catch()` can centralize many failures.

<!-- codingterminal-solution:end -->


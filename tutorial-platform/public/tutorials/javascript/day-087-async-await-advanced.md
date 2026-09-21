---
title: Async/Await Advanced
slug: day-087-async-await-advanced
dayLabel: Day 87
level: Advanced
estimatedMinutes: 30
order: 87
track: javascript
---

# Day 87 [Advanced]: Async/Await Advanced

## Goal

Master sequential vs parallel execution with `async`/`await`, and recognize the most common mistakes developers make with it.

## Prerequisites

- Day 86 (async/await), Day 86 practice (sequential vs parallel)

## Explanation

Today formalizes exactly when to use sequential `await` calls (each genuinely depends on the previous result) versus parallel execution with `Promise.all()` (independent operations that don't need to wait for each other). This distinction directly affects your program's real-world performance — accidentally making independent operations sequential is one of the most common async/await mistakes in production code.

## Topic by Topic

### Topic 1: Sequential execution — when it's necessary

Theory:
Sequential `await` calls are correct and necessary when each step genuinely depends on the result of the previous one.

Code Example:

```js
async function checkoutFlow(cartId) {
  const cart = await getCart(cartId); // step 2 needs cart's items
  const total = await calculateTotal(cart.items); // step 3 needs the calculated total
  const receipt = await processPayment(total); // depends on all previous steps
  return receipt;
}
```

**Explanation:** Each step here genuinely NEEDS the previous step's result to proceed — `calculateTotal` needs `cart.items`, and `processPayment` needs `total` — so sequential `await` calls are the CORRECT choice, not a mistake.

**Key Points:**

- Sequential `await` is correct when each step depends on the previous step's actual result.
- This isn't something to "optimize away" — the dependency is real and unavoidable.
- Recognizing genuine dependencies is the first step before considering parallelization.

### Topic 2: The common mistake — accidental sequential execution

Theory:
A very common mistake is writing independent operations with separate `await` calls in a row, which needlessly forces them to run one after another instead of simultaneously.

Code Example:

```js
// MISTAKE - these don't depend on each other, but run sequentially anyway
async function loadPageDataSlow() {
  const user = await getUser(1); // waits fully before starting next line
  const products = await getProducts(); // could have started at the same time as getUser!
  return { user, products };
}

// CORRECT - run genuinely independent operations in parallel
async function loadPageDataFast() {
  const [user, products] = await Promise.all([getUser(1), getProducts()]);
  return { user, products };
}
```

**Explanation:** `getUser(1)` and `getProducts()` have nothing to do with each other — `loadPageDataSlow` wastes time waiting for `getUser` to fully finish before even STARTING `getProducts`, while `loadPageDataFast` starts both at the same time.

**Key Points:**

- This exact mistake is extremely common and easy to miss in real code reviews.
- The fix: identify independent operations, then start them together with `Promise.all()`.
- Always ask "could this next line have started immediately, without waiting?" when reviewing sequential `await` calls.

### Topic 3: Mixing sequential and parallel patterns

Theory:
Real applications often need a mix — some steps genuinely sequential, others parallelizable — requiring you to structure the function thoughtfully.

Code Example:

```js
async function loadUserDashboard(userId) {
  const user = await getUser(userId); // must happen first - other calls need user.id

  const [orders, recommendations] = await Promise.all([
    getOrders(user.id), // independent of each other
    getRecommendations(user.id), // independent of each other
  ]);

  return { user, orders, recommendations };
}
```

**Explanation:** `getUser` must run first (nothing else can start without `user.id`), but once it's done, `getOrders` and `getRecommendations` are independent of EACH OTHER, so they run together via `Promise.all()`.

**Key Points:**

- Real functions often combine sequential steps (genuine dependencies) with parallel groups (independent operations).
- Structure your function to reflect the ACTUAL dependency graph of your operations, not just habit.
- This mixed pattern is extremely common in real-world dashboard/data-loading code.

### Topic 4: Common async/await mistakes to watch for

Theory:
Beyond accidental sequential execution, a few other common mistakes are worth specifically watching for.

Code Example:

```js
// MISTAKE - forgetting "await" entirely
async function badExample() {
  const result = someAsyncFunction(); // missing "await" - result is a Promise, not the value!
  console.log(result); // Promise {<pending>}, not the actual data
}

// MISTAKE - using .forEach() with async callbacks (doesn't actually wait!)
async function processAllBad(items) {
  items.forEach(async (item) => {
    await processItem(item); // forEach does NOT wait for these to finish!
  });
  console.log("This runs BEFORE all items are actually processed");
}
```

**Explanation:** Forgetting `await` leaves you with an unresolved Promise instead of the actual value; `.forEach()` with an `async` callback looks like it should work, but `.forEach()` itself has no concept of waiting for async callbacks — use a `for...of` loop with `await` instead for genuinely sequential async processing.

**Key Points:**

- Forgetting `await` is a very common, easy-to-miss bug — always double-check you're awaiting Promise-returning calls.
- `.forEach()` does NOT wait for `async` callbacks — use a plain `for...of` loop (with `await` inside) when you need sequential async processing of a list.
- `.map()` combined with `Promise.all()` is the correct pattern for PARALLEL async processing of a list.

## Recap

- Sequential `await` is correct only when a genuine dependency exists between steps.
- Accidentally sequential independent operations should be parallelized with `Promise.all()`.
- Watch for common mistakes: forgetting `await`, and using `.forEach()` with async callbacks (which doesn't actually wait).

## What's Next

Practice for today: `public/coding/JavaScript/day-087-event-loop-challenges.md` — 30 predict-the-output questions. Day 88 begins working with the Fetch API for real network requests.

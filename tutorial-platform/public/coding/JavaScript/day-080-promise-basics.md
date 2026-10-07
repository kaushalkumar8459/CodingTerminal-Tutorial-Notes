# Day 080 — Promise Basics

Matches Tutorial Day 80 (The JavaScript Runtime) — practice previews Promises here,
ahead of Tutorial Day 83's full explanation. No limit on how many you build.

## Basic

1. Create a `new Promise((resolve, reject) => { resolve("Done!"); })` and log its
   result using `.then()`.
2. Create a Promise that calls `reject(new Error("Something went wrong"))`, and log
   the error using `.catch()`.
3. Create a Promise that uses `setTimeout()` internally to resolve after a delay
   (simulating an async operation).
4. Create a Promise-based version of your Day 78 `login(username, password)` function
   — return a `new Promise` instead of using a callback parameter.
5. Call your Promise-based `login()` and handle both success (`.then()`) and failure
   (`.catch()`).

## Concept

6. Build Promise-based versions of `getUser`, `getOrders`, and `getProducts` from
   Day 78, each wrapped in `setTimeout()` to simulate delay.
7. Build a `simulatePayment(amount)` function returning a Promise that resolves if
   `amount > 0`, and rejects otherwise.
8. Build a `simulateFileUpload(fileSizeMB)` function returning a Promise that resolves
   after a delay proportional to file size (larger files "take longer").
9. Create a Promise, then log something IMMEDIATELY after creating it (before
   `.then()` fires) — observe and explain the order of the output.

## Interview-style questions

10. What are the three states a Promise can be in?
11. Once a Promise is `resolved` or `rejected`, can it ever change to a different
    state again?
12. Why is a Promise generally considered clearer than a plain callback-based async
    function, based on what you experienced with callback hell on Day 79?

## Notes

- A Promise is a placeholder for a value that isn't available yet, but will be (or
  will fail) at some point — creating one doesn't block anything, exactly like the
  Web APIs from today's tutorial.
- Keep your Day 78 callback-based functions handy — you'll be comparing them directly
  against these Promise-based rewrites over the next few days.

<!-- codingterminal-solution:start -->

# Day 080 — Solution: Promise Basics

**1–5. Basic Promises**

```js
new Promise((resolve) => resolve("Done!")).then(console.log);
new Promise((resolve, reject) =>
  reject(new Error("Something went wrong")),
).catch(console.error);
function delayedResult(value, delay = 100) {
  return new Promise((resolve) => setTimeout(() => resolve(value), delay));
}
function login(username, password) {
  return new Promise((resolve, reject) =>
    setTimeout(
      () =>
        password === "secret"
          ? resolve({ username })
          : reject(new Error("Invalid credentials")),
      100,
    ),
  );
}
login("asha", "secret").then(console.log).catch(console.error);
```

**6. Promise-based data functions**

```js
const getUser = (id) => delayedResult({ id, name: "Asha" });
const getOrders = (userId) => delayedResult([{ id: 1, userId }]);
const getProducts = () => delayedResult([{ id: 1, name: "Book" }]);
login("asha", "secret")
  .then((account) => getUser(account.username))
  .then((user) => getOrders(user.id))
  .then(console.log)
  .catch(console.error);
```

**7. Payment**

```js
function simulatePayment(amount) {
  return amount > 0
    ? Promise.resolve({ paid: amount })
    : Promise.reject(new Error("Amount must be positive"));
}
```

**8. File upload**

```js
function simulateFileUpload(fileSizeMB) {
  return delayedResult(`Uploaded ${fileSizeMB} MB`, fileSizeMB * 10);
}
```

**9. Ordering**

```js
const task = delayedResult("done", 0);
console.log("immediate");
task.then(console.log); // immediate prints first; handlers run later as microtasks
```

## Interview-style questions

**10.** Pending, fulfilled, and rejected.

**11.** No. A Promise settles only once; later resolve/reject calls are ignored.

**12.** Promises flatten sequential workflows and provide a shared rejection path, avoiding much of the nesting and repeated error handling in callback hell.

<!-- codingterminal-solution:end -->


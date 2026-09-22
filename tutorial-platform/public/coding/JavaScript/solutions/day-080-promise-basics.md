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

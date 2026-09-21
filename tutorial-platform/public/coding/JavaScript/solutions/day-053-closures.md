# Day 053 — Solution: Closures

**1. Counter**

```js
function createCounter() {
  let count = 0;
  return () => ++count;
}
const counter = createCounter();
console.log(counter(), counter()); // 1 2
```

**2. Private secret**

```js
function createSecretHolder(secret) {
  return { reveal: () => secret };
}
```

**3. Login tracker**

```js
function createLoginTracker(maxAttempts) {
  let failed = 0;
  return () => {
    failed++;
    return { failed, remaining: Math.max(0, maxAttempts - failed) };
  };
}
```

**4. Bank account**

```js
function createBankAccount(initialBalance) {
  let balance = initialBalance;
  return {
    deposit: (amount) => { balance += amount; return balance; },
    withdraw: (amount) => amount <= balance ? (balance -= amount) : balance,
    getBalance: () => balance,
    reset: () => { balance = initialBalance; }
  };
}
```

**5. `once()`**

```js
function once(fn) {
  let called = false;
  let result;
  return (...args) => {
    if (!called) { called = true; result = fn(...args); }
    return result;
  };
}
```

**6–9.** Each `createCounter()` call creates a new `count` binding, so counters are independent. The account's `reset()` changes the closed-over balance. A login tracker can lock with a `locked` flag after `failed >= maxAttempts`; later calls return a locked result. Wrapping `console.log` with `once()` prints only on the first call.

## Interview-style questions

**10.** A closure is a function together with access to the variables in the scope where it was created, even after that outer function has returned.

**11.** Each factory call creates a fresh execution scope and therefore a fresh `count` variable.

**12.** `balance` is local to `createBankAccount`; outside code can use only the methods exposed by the returned object.

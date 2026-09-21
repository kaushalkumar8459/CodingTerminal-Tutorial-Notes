# Day 078 — Solution: Callback Async

```js
function login(username, password, callback) {
  setTimeout(
    () =>
      password === "secret"
        ? callback(null, { username })
        : callback(new Error("Invalid credentials")),
    100,
  );
}
function getUser(userId, callback) {
  setTimeout(() => callback(null, { id: userId, name: "Asha" }), 100);
}
function getOrders(userId, callback) {
  setTimeout(() => callback(null, [{ id: 1, userId }]), 100);
}
function getProducts(callback) {
  setTimeout(() => callback(null, [{ id: 1, name: "Book" }]), 100);
}

login("asha", "secret", (error, result) => {
  if (error) return console.error(error);
  console.log(result);
});
getUser(1, (error, result) => {
  if (!error) console.log(result);
});
getOrders(1, (error, result) => {
  if (!error) console.log(result);
});
getProducts((error, result) => {
  if (!error) console.log(result);
});
```

**6–9. Chained error-first callbacks**

```js
login("asha", "secret", (error, account) => {
  if (error) return console.error(error);
  getUser(account.username, (error, user) => {
    if (error) return console.error(error);
    getOrders(user.id, (error, orders) => {
      if (error) return console.error(error);
      getProducts((error, products) => {
        if (error) return console.error(error);
        console.log({ user, orders, products });
      });
    });
  });
});
```

## Interview-style questions

**10.** `setTimeout` stands in for the delay of a network, file, or database operation and lets us practice the callback timing without a real service.

**11.** Error-first callbacks give every operation a consistent success and failure channel, so callers can handle both explicitly.

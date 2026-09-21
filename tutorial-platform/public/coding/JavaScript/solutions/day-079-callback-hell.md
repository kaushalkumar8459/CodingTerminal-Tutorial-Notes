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

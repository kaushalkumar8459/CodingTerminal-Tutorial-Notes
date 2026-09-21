# Day 085 — Solution: Async/Await

```js
async function getMessage() {
  return "Hello";
}
console.log(getMessage()); // Promise

async function readMessage() {
  const message = await getMessage();
  console.log(message);
}

async function runLogin() {
  try {
    const account = await login("asha", "secret");
    console.log(account);
  } catch (error) {
    console.error(error);
  }
}
```

**5–7. Convert the full chain**

```js
async function loadEverything() {
  try {
    const account = await login("asha", "secret");
    const user = await getUser(account.username);
    const orders = await getOrders(user.id);
    const products = await getProducts();
    return { account, user, orders, products };
  } catch (error) {
    console.error(error);
  }
}
```

**9. Await `Promise.all`**

```js
async function loadDashboard() {
  const [users, products, orders] = await Promise.all([
    loadUsers(),
    loadProducts(),
    loadOrders(),
  ]);
  return { users, products, orders };
}
```

## Interview-style questions

**10.** Yes. An async function always returns a Promise, even when it returns a plain value.

**11.** `await` pauses that async function until the Promise settles, while allowing the event loop to continue other work.

**12.** `try/catch` sees a rejection when `await` converts it into a thrown exception inside the async function.

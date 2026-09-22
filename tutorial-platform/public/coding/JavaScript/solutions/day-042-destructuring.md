# Day 042 — Solution: Destructuring

**1–5. Basic destructuring**

```js
const user = { name: "Asha", age: 25 };
const { name, age } = user;
const [first, second] = ["red", "blue"];
const { name: userName } = user;
function greet({ name: personName }) {
  return `Hello, ${personName}`;
}
const { city = "Unknown" } = user;
```

**6. Nested property**

```js
const profile = { address: { city: "Pune", country: "India" } };
const {
  address: { city },
} = profile;
```

**7. Skip an array element**

```js
const [firstColor, , thirdColor] = ["red", "green", "blue"];
```

**8. Swap variables**

```js
let left = "left";
let right = "right";
[left, right] = [right, left];
```

**9. Rest of an array**

```js
const [head, ...tail] = [1, 2, 3, 4];
```

**10. Rest of an object**

```js
const account = { id: 1, name: "Asha", role: "admin" };
const { id, ...accountDetails } = account;
```

**11. Refactoring pattern**

```js
function displayStudent({ name, marks: { math, science } }) {
  return `${name}: ${math + science}`;
}
```

## Interview-style questions

**12.** Destructured parameters document the fields a function needs and remove repeated `params.property` expressions.

**13.** Add `= fallback` to the property: `const { theme = "light" } = settings`.

**14.** Array destructuring assigns by position; object destructuring assigns by property name.

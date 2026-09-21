# Day 033 — Solution: Array Search

```js
const numbers = [12, 67, 25, 67, 4];
console.log(numbers.includes(25)); // 1. true
console.log(numbers.indexOf(67)); // 2. 1
console.log(numbers.indexOf(100)); // 3. -1
console.log(numbers.find((number) => number > 50)); // 4. 67
console.log(numbers.findIndex((number) => number > 50)); // 5. 1
```

**6. Find a user by ID**

```js
const users = [
  { id: 1, name: "Asha" },
  { id: 2, name: "Ben" },
];
console.log(users.find((user) => user.id === 2));
```

**7. Find a product by name**

```js
const products = [
  { name: "Pen", price: 10 },
  { name: "Book", price: 20 },
];
const book = products.find((product) => product.name === "Book");
```

**8. Find an employee index**

```js
const employees = [
  { id: 4, name: "Maya" },
  { id: 8, name: "Leo" },
];
console.log(employees.findIndex((employee) => employee.id === 8)); // 1
```

**9. First even number**

```js
console.log([3, 7, 12, 14].find((number) => number % 2 === 0)); // 12
```

**10. Case-sensitive `includes`**

```js
console.log(["JavaScript", "Python"].includes("JavaScript")); // true
console.log(["JavaScript", "Python"].includes("javascript")); // false
```

**11. Last repeated value**

```js
console.log(numbers.lastIndexOf(67)); // 3
```

**12. Find user with not-found handling**

```js
function findUserById(userList, id) {
  const user = userList.find((item) => item.id === id);
  return user === undefined ? undefined : user;
}
```

**13. Multiple conditions**

```js
const available = products.find(
  (product) => product.price < 500 && product.inStock === true,
);
```

## Interview-style questions

**14.** `indexOf` searches for an exact value and returns its index. `find` runs a callback and returns the matching element itself.

**15.** `find()` returns `undefined` when no item matches.

**16.** `includes()` clearly expresses a simple existence check and returns a boolean directly, while `indexOf()` returns an index that must be compared with `-1`.

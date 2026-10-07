# Day 033 — Array Search (includes, indexOf, find, findIndex)

Matches Tutorial Day 33 (Arrays Fundamentals). No limit on how many you solve.

## Basic

1. Use `.includes()` to check if a number exists in an array.
2. Use `.indexOf()` to find the position of a value in an array.
3. Use `.indexOf()` on a value that doesn't exist, and note the result (`-1`).
4. Use `.find()` to get the first number in an array greater than 50.
5. Use `.findIndex()` to get the position of the first number greater than 50.

## Concept

6. Given an array of user objects (`{id, name}`), use `.find()` to find a user by `id`.
7. Given an array of product objects (`{name, price}`), use `.find()` to find a product by name.
8. Use `.findIndex()` to locate an employee object by `id` in an array of employees.
9. Find the first even number in an array using `.find()`.
10. Check whether an array of strings `.includes()` a specific case-sensitive value.
11. Use `.lastIndexOf()` to find the LAST position of a repeated value in an array.
12. Write a function `findUserById(users, id)` that returns the matching user object, or
    `undefined` if not found — handle the "not found" case explicitly.
13. Given an array of objects, use `.find()` combined with multiple conditions (e.g. find
    a product that's both `inStock: true` AND `price < 500`).

## Interview-style questions

14. What's the difference between `.indexOf()` and `.find()` — in terms of what they
    search for and what they return?
15. What does `.find()` return when nothing matches?
16. When would `.includes()` be a better choice than `.indexOf()` for a simple existence
    check?

## Notes

- `.find()`/`.findIndex()` accept a **callback function** (a small function you provide)
  describing what to search for — this is your first real taste of the array-method
  style you'll use constantly starting tomorrow (`forEach`, `map`, `filter`, `reduce`).
- `.includes()`/`.indexOf()` work well for simple values; `.find()`/`.findIndex()` are
  needed once you're searching arrays of objects.

<!-- codingterminal-solution:start -->

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

<!-- codingterminal-solution:end -->


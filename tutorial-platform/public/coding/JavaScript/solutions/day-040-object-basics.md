# Day 040 — Solution: Object Basics

**1–5. Create, access, add, and update**

```js
const person = { name: "Asha", age: 25, city: "Pune" };
console.log(person.name); // 2. dot notation
console.log(person["city"]); // 3. bracket notation
person.job = "Developer"; // 4. add property
person.age = 26; // 5. update property
```

**6. Delete a property**

```js
delete person.job;
```

**7. Count properties**

```js
let propertyCount = 0;
for (const key in person) propertyCount++;
console.log(propertyCount);
```

**8. Check property existence**

```js
console.log("age" in person); // true
```

**9. Update a product**

```js
const product = { name: "Laptop", price: 1000 };
product.price = 900;
product.discount = 100;
```

**10. Create a user**

```js
function createUser(name, age) {
  return { name, age };
}
const user = createUser("Ben", 30);
```

**11. Compare one property**

```js
const first = createUser("Asha", 25);
const second = createUser("Asha", 31);
console.log(first.name === second.name); // true
```

**12. Toggle a setting**

```js
const settings = { darkMode: true, notifications: false, autoSave: true };
settings.darkMode = !settings.darkMode;
console.log(settings.darkMode); // false
```

**13. Highest numeric property**

```js
function highestNumericProperty(object) {
  let bestKey;
  for (const key in object) {
    if (
      typeof object[key] === "number" &&
      (bestKey === undefined || object[key] > object[bestKey])
    )
      bestKey = key;
  }
  return bestKey;
}
console.log(highestNumericProperty({ math: 88, science: 94, english: 82 })); // science
```

## Interview-style questions

**14.** Dot notation uses a literal identifier, such as `person.name`. Bracket notation accepts a variable or unusual property name, such as `person[propertyName]` or `person["home city"]`.

**15.** Objects are mutable. Updating a property changes the existing object; it does not automatically create a new object.

**16.** The `in` operator checks whether a property exists, even if its value is `false`, `0`, or `undefined`. A truthy check tests the value instead, so it cannot distinguish a missing property from an existing falsy one.

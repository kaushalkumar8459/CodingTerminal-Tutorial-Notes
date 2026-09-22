# Day 044 — Solution: Shallow vs Deep Copy

**1–5. Primitive, shallow, and reference copies**

```js
let originalNumber = 5;
let copiedNumber = originalNumber;
copiedNumber = 10;
console.log(originalNumber); // 5

const originalArray = [1, 2];
const copiedArray = [...originalArray];
copiedArray[0] = 9;
console.log(originalArray); // [1, 2]

const originalObject = { name: "Asha" };
const copiedObject = { ...originalObject };
copiedObject.name = "Ben";
console.log(originalObject.name); // Asha

const assignedObject = Object.assign({}, originalObject);
console.log(assignedObject); // equivalent shallow copy here

const shared = originalArray;
shared[0] = 99; // both variables point to the same array
console.log(originalArray[0]); // 99
```

**6–7. Shallow-copy trap**

```js
const nested = { address: { city: "Pune" } };
const shallowNested = { ...nested };
shallowNested.address.city = "Delhi";
console.log(nested.address.city); // Delhi

const people = [{ name: "Asha" }];
const peopleCopy = [...people];
peopleCopy[0].name = "Ben";
console.log(people[0].name); // Ben
```

**8. `structuredClone()`**

```js
const deepNested = { address: { city: "Pune" } };
const deepCopy = structuredClone(deepNested);
deepCopy.address.city = "Delhi";
console.log(deepNested.address.city); // Pune
```

**9. JSON deep copy**

```js
function deepCopy(value) {
  return JSON.parse(JSON.stringify(value));
}
const copy = deepCopy({ user: { name: "Asha" } });
copy.user.name = "Ben";
```

**10. JSON limitations:** functions and `undefined` are removed, `Date` becomes a string, and special values such as `Map`, `Set`, and `BigInt` are not preserved correctly.

**11. Reference example:** spread and `Object.assign` protect top-level properties, but nested arrays and objects remain shared. `structuredClone` protects nested data when the values are cloneable.

## Interview-style questions

**12.** A shallow copy duplicates only the outer container; a deep copy recursively duplicates nested objects and arrays.

**13.** Spread copies each top-level property value. If that value is an object, the copied property receives the same nested reference.

**14.** `structuredClone()` supports more value types and preserves nested structures, while JSON cloning is simple but loses functions, `undefined`, dates, and special types.

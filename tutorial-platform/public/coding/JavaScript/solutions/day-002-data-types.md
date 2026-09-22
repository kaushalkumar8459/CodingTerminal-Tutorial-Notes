# Day 002 — Solution: Data Types

Reference solutions for `day-002-data-types.md`. Where a problem could be solved with
a built-in method OR by hand, both approaches are shown — try the practice file
yourself first before checking these.

## Basic

**1. String, number, boolean in three variables**

```js
const name = "Priya";
const age = 28;
const isStudent = false;

console.log(name);
console.log(age);
console.log(isStudent);
```

**2. `typeof` on a string**

```js
console.log(typeof "hello"); // "string"
```

**3. `typeof` on a number**

```js
console.log(typeof 42); // "number"
```

**4. `typeof` on a boolean**

```js
console.log(typeof true); // "boolean"
```

**5. `typeof` on `undefined`**

```js
let city;
console.log(typeof city); // "undefined"
```

**6. `typeof` on `null`**

```js
const empty = null;
console.log(typeof empty); // "object" — a famous, long-standing JS quirk (see #19)
```

**7. `BigInt` and its `typeof`**

```js
const bigNumber = 123n;
console.log(typeof bigNumber); // "bigint"
```

**8. `Symbol` and its `typeof`**

```js
const uniqueId = Symbol("id");
console.log(typeof uniqueId); // "symbol"
```

**9. `typeof` on an array**

```js
const colors = ["red", "green", "blue"];
console.log(typeof colors); // "object" — arrays are a special kind of object, so
// typeof doesn't distinguish them; use Array.isArray() instead (see the Challenge).
```

**10. `typeof` on an object literal**

```js
const user = { name: "Zoe" };
console.log(typeof user); // "object"
```

## Concept

**11. `identifyType(value)`**

```js
function identifyType(value) {
  return typeof value;
}

console.log(identifyType(42)); // "number"
console.log(identifyType("hi")); // "string"
```

**12. Check whether a value is a number**

```js
function isNumber(value) {
  return typeof value === "number";
}

console.log(isNumber(10)); // true
console.log(isNumber("10")); // false
```

**13. Check whether a value is a string**

```js
function isString(value) {
  return typeof value === "string";
}

console.log(isString("hello")); // true
console.log(isString(5)); // false
```

**14. Number to string, confirm with `typeof`**

```js
// Approach A — built-in String() conversion function
const numA = 42;
const asStringA = String(numA);
console.log(typeof asStringA); // "string"

// Approach B — built-in .toString() instance method
const numB = 42;
const asStringB = numB.toString();
console.log(typeof asStringB); // "string"
```

**15. String to number, confirm with `typeof`**

```js
// Approach A — built-in Number() conversion function
const strA = "42";
const asNumberA = Number(strA);
console.log(typeof asNumberA); // "number"

// Approach B — unary + operator (shorthand built-in coercion)
const strB = "42";
const asNumberB = +strB;
console.log(typeof asNumberB); // "number"
```

**16. Check for exactly `undefined`**

```js
function isUndefined(value) {
  return value === undefined;
}

let notSet;
console.log(isUndefined(notSet)); // true
console.log(isUndefined(0)); // false
```

**17. Check for exactly `null`**

```js
function isNull(value) {
  return value === null;
}

console.log(isNull(null)); // true
console.log(isNull(undefined)); // false — they are NOT the same value
```

**18. Detect `NaN` with `Number.isNaN()`**

```js
const result = 0 / 0;
console.log(Number.isNaN(result)); // true
console.log(Number.isNaN(42)); // false

// Without Number.isNaN() — the manual trick: NaN is the ONLY value in JavaScript
// that is never equal to itself, so this comparison also works (but is less readable):
console.log(result !== result); // true
```

**19. Why `typeof null === "object"`**

```js
// In the very first version of JavaScript, every value was stored with a small "type
// tag." Objects were tagged with 0, and null was represented internally as an
// all-zero value — so it accidentally got the SAME tag as objects, making
// `typeof null` incorrectly return "object". Fixing it now would break too much
// existing code across the web, so it has stayed this way ever since. It's simply a
// historical quirk to remember, not a rule to reason deeply about.
```

**20. Primitive types (from memory)**

```js
// The 7 primitive types in JavaScript:
// 1. String
// 2. Number
// 3. Boolean
// 4. Undefined
// 5. Null
// 6. BigInt
// 7. Symbol
```

## Interview-style questions

**21. All primitive data types**

`String`, `Number`, `Boolean`, `Undefined`, `Null`, `BigInt`, `Symbol` — seven in total.
Everything else (objects, arrays, functions) is a non-primitive (reference) type.

**22. `undefined` vs `null`**

- `undefined` means "JavaScript hasn't assigned a value here yet" — it's the automatic
  default for declared-but-unassigned variables, missing function arguments, etc.
- `null` means "a developer deliberately set this to represent nothing/empty."

```js
let a; // undefined — nobody has set it yet
let b = null; // null — intentionally set to "no value"
```

**23. Why `typeof NaN === "number"`**

`NaN` stands for "Not a Number," but it's still a special VALUE that belongs to the
`Number` type in JavaScript — it represents "a numeric operation that failed to
produce a real number," not "the absence of a number type." So `typeof` correctly
reports its type as `"number"`, even though its meaning is "not a valid number."

## Challenge

**24. `getDataType(value)` — every primitive plus array/object**

```js
function getDataType(value) {
  if (Array.isArray(value)) {
    return "array";
  }

  if (value === null) {
    return "null"; // handled explicitly, since typeof null is misleadingly "object"
  }

  return typeof value; // covers string, number, boolean, undefined, bigint, symbol, object
}

console.log(getDataType("hi")); // "string"
console.log(getDataType(42)); // "number"
console.log(getDataType(true)); // "boolean"
console.log(getDataType(undefined)); // "undefined"
console.log(getDataType(null)); // "null"
console.log(getDataType(123n)); // "bigint"
console.log(getDataType(Symbol("x"))); // "symbol"
console.log(getDataType([1, 2, 3])); // "array"
console.log(getDataType({ a: 1 })); // "object"
```

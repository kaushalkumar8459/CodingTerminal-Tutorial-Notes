# Day 005 — Solution: Comparison Operators

Reference solutions for `day-005-comparison-operators.md`. Try the practice file
yourself first before checking these.

## Basic

**1-2. Greater/smaller of two numbers**

```js
const a = 10;
const b = 20;

console.log(a > b ? `${a} is greater` : `${b} is greater`); // "20 is greater"
console.log(a < b ? `${a} is smaller` : `${b} is smaller`); // "10 is smaller"
```

**3. Equality with `===`**

```js
console.log(5 === 5); // true
```

**4-5. `==` vs `===`**

```js
console.log(5 == "5"); // true  — "5" is converted to a number first
console.log(5 === "5"); // false — different types, no conversion, so not equal
```

**6. String equality with `===`**

```js
console.log("hello" === "hello"); // true
```

**7-8. `>=` and `<=`**

```js
const score = 42;
console.log(score >= 40); // true — meets the minimum passing score
console.log(score <= 100); // true — within the maximum limit
```

**9-10. `null` vs `undefined` comparisons**

```js
console.log(null == undefined); // true  — a special case built into the == rules
console.log(null === undefined); // false — different types, strict equality fails
```

## Concept

**11. Age eligibility check**

```js
function isEligibleToVote(age) {
  return age >= 18;
}

console.log(isEligibleToVote(20)); // true
console.log(isEligibleToVote(15)); // false
```

**12. Compare two passwords**

```js
function passwordsMatch(passwordA, passwordB) {
  return passwordA === passwordB;
}

console.log(passwordsMatch("secret123", "secret123")); // true
console.log(passwordsMatch("secret123", "wrongpass")); // false
```

**13. Range validator**

```js
function isInRange(value, min, max) {
  return value >= min && value <= max;
}

console.log(isInRange(50, 1, 100)); // true
console.log(isInRange(150, 1, 100)); // false
```

**14. Five `==` vs `===` examples**

```js
console.log(0 == "0"); // true  — "0" converts to 0
console.log(0 === "0"); // false — different types
console.log("" == false); // true  — both convert to a falsy comparison
console.log("" === false); // false — different types
console.log(null == 0); // false — this is a special exception in the == rules!
```

**15. Comparing arrays with `===`**

```js
console.log([1, 2] === [1, 2]); // false!
// Arrays (and objects) are compared by REFERENCE, not by content — these are two
// completely separate arrays in memory that just happen to look the same.

const shared = [1, 2];
console.log(shared === shared); // true — same exact reference
```

**16. PIN comparison — string vs number**

```js
const enteredPin = "1234"; // from a text input, always a string
const storedPin = 1234; // stored as a number

console.log(enteredPin == storedPin); // true  — coerced to the same type first
console.log(enteredPin === storedPin); // false — different types, strict check fails
// Lesson: always convert to the SAME type explicitly before comparing important data.
```

**17. `isInRange` (already built in #13)**

```js
console.log(isInRange(0, 1, 10)); // false
```

**18. Adulthood check from birth year**

```js
function isAdult(birthYear, currentYear = new Date().getFullYear()) {
  const age = currentYear - birthYear;
  return age >= 18;
}

console.log(isAdult(2000)); // true (in 2026)
console.log(isAdult(2015)); // false
```

**19. Chained comparisons with `&&`**

```js
const number = 42;
console.log(number > 0 && number < 100); // true
```

**20. `isEqualStrict(a, b)` against tricky pairs**

```js
function isEqualStrict(a, b) {
  return a === b;
}

console.log(isEqualStrict(0, false)); // false
console.log(isEqualStrict("", false)); // false
console.log(isEqualStrict(null, undefined)); // false
```

## Interview-style questions

**21. `==` vs `===` — 3 differing examples**

```js
console.log(1 == "1"); // true  vs
console.log(1 === "1"); // false

console.log(null == undefined); // true  vs
console.log(null === undefined); // false

console.log([] == false); // true  vs
console.log([] === false); // false
```

**22. Why `null == undefined` is `true`**

This is a specific, deliberate exception written into the `==` rules: `null` and
`undefined` are defined to be loosely equal ONLY to each other (and to nothing else).
`===` never applies this exception, so it correctly reports `false` since they're
different types.

**23. A surprising `==` result**

```js
console.log("0" == false); // true — "0" converts to 0, false converts to 0, 0 == 0
```

## Challenge (Interview Challenge)

**24. Ten `==` vs `===` examples**

```js
console.log(1 == "1"); // true
console.log(1 === "1"); // false

console.log(0 == false); // true
console.log(0 === false); // false

console.log("" == 0); // true
console.log("" === 0); // false

console.log(null == undefined); // true
console.log(null === undefined); // false

console.log(NaN == NaN); // false — NaN is never equal to anything, even itself
console.log(NaN === NaN); // false — same result, same reason
```

Three surprising ones to remember: `"0" == false`, `"" == 0`, and `NaN == NaN` being
`false` even though it "should" be the same value compared to itself.

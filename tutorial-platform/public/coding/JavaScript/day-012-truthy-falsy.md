# Day 012 — Truthy/Falsy

Matches Tutorial Day 12 (Arrow Functions) — practice covers truthy/falsy in depth here,
reinforcing Day 6's intro. No limit on how many you solve.

## Basic

1. List all 6 falsy values from memory, then verify each with `if (!value)`.
2. Check whether `0` is truthy or falsy by testing it in an `if`.
3. Check whether `"0"` (a string) is truthy or falsy by testing it in an `if`.
4. Check whether `[]` (empty array) is truthy or falsy.
5. Check whether `{}` (empty object) is truthy or falsy.
6. Write a condition that only runs code when a variable is NOT `undefined`.
7. Write a condition that only runs code when a string is non-empty.
8. Use `!!value` to convert any value into an explicit `true`/`false`.
9. Test `!!0`, `!!"hello"`, `!!null`, `!!NaN` and print each result.
10. Write a condition that treats both `null` and `undefined` as "missing" using `==`.

## Concept

11. Write a `validateUsername(username)` function: must be truthy and at least 3 characters.
12. Write a `validateEmail(email)` function: must be truthy and contain `"@"`.
13. Write a function that provides a default value using `||` when a parameter is falsy.
14. Show a case where using `||` for a default is WRONG (hint: think about a value of `0`),
    then fix it using `??` instead.
15. Write a form validator that checks 3 fields are all truthy before allowing submission.
16. Build a function `hasValue(x)` that returns `true` only for values that are NOT falsy.
17. Write a function that treats an empty array as "no items" using truthy/falsy logic.
18. Write a function that safely provides a fallback display name when a user's name field is empty or missing.
19. Build a simple "required field" checker for a signup form (name, email, password all required).
20. Explain, using an example, why checking `if (array.length)` is a common truthy-based pattern for "array is not empty."

## Interview-style questions

21. What are the exact 6 falsy values in JavaScript? Is there any value people commonly
    assume is falsy but actually isn't (e.g. `"0"`, `[]`)?
22. What does `!!value` actually do, step by step?
23. Why is `??` sometimes a better choice than `||` when providing default values?

## Notes

- Truthy/falsy checks appear constantly in real form validation — today's practice is
  directly useful for later projects like the Expense Tracker (Day 15) and beyond.
- Keep testing "trick" values (`"0"`, `[]`, `{}`) until the truthy/falsy list feels fully
  natural — this is one of the most commonly misunderstood areas for beginners.

<!-- codingterminal-solution:start -->

# Day 012 — Solution: Truthy/Falsy

Reference solutions for `day-012-truthy-falsy.md`. Try the practice file yourself
first before checking these.

## Basic

**1. The 6 falsy values**

```js
const falsyValues = [false, 0, "", null, undefined, NaN];
falsyValues.forEach((value) => console.log(value, "->", !value));
// every one prints `true` for !value, confirming each is falsy
```

**2-5. Truthy/falsy checks**

```js
console.log(0 ? "truthy" : "falsy"); // "falsy"
console.log("0" ? "truthy" : "falsy"); // "truthy" — non-empty string!
console.log([] ? "truthy" : "falsy"); // "truthy" — empty array is truthy!
console.log({} ? "truthy" : "falsy"); // "truthy" — empty object is truthy!
```

**6. Only run code when NOT `undefined`**

```js
function processIfDefined(value) {
  if (value !== undefined) {
    console.log("Processing:", value);
  }
}

processIfDefined(5); // "Processing: 5"
processIfDefined(undefined); // nothing happens
```

**7. Only run code when a string is non-empty**

```js
function greetIfNamed(name) {
  if (name) {
    console.log(`Hello, ${name}`);
  }
}

greetIfNamed("Asha"); // "Hello, Asha"
greetIfNamed(""); // nothing happens
```

**8-9. `!!value` conversion**

```js
console.log(!!0); // false
console.log(!!"hello"); // true
console.log(!!null); // false
console.log(!!NaN); // false
```

**10. Treat `null`/`undefined` as "missing" with `==`**

```js
function isMissing(value) {
  return value == null; // catches BOTH null and undefined in one check
}

console.log(isMissing(null)); // true
console.log(isMissing(undefined)); // true
console.log(isMissing(0)); // false
```

## Concept

**11. `validateUsername(username)`**

```js
function validateUsername(username) {
  return Boolean(username) && username.length >= 3;
}

console.log(validateUsername("ab")); // false
console.log(validateUsername("abc")); // true
```

**12. `validateEmail(email)`**

```js
function validateEmail(email) {
  return Boolean(email) && email.includes("@");
}

console.log(validateEmail("")); // false
console.log(validateEmail("user@test.com")); // true
```

**13. Default value with `||`**

```js
function greetUser(name) {
  const finalName = name || "Guest";
  return `Hello, ${finalName}`;
}

console.log(greetUser()); // "Hello, Guest"
console.log(greetUser("Ravi")); // "Hello, Ravi"
```

**14. Why `||` is wrong for a `0` default, fixed with `??`**

```js
function getDiscount(discount) {
  return discount || 10; // WRONG: a real discount of 0 gets replaced by 10!
}

console.log(getDiscount(0)); // 10 — incorrect, 0 was a valid discount

function getDiscountFixed(discount) {
  return discount ?? 10; // only falls back for null/undefined
}

console.log(getDiscountFixed(0)); // 0 — correct!
```

**15. Form validator — 3 truthy fields**

```js
function isFormValid(name, email, password) {
  return Boolean(name) && Boolean(email) && Boolean(password);
}

console.log(isFormValid("Ana", "a@test.com", "secret")); // true
console.log(isFormValid("", "a@test.com", "secret")); // false
```

**16. `hasValue(x)`**

```js
function hasValue(x) {
  return Boolean(x);
}

console.log(hasValue(0)); // false
console.log(hasValue("text")); // true
```

**17. Empty array as "no items"**

```js
function hasItems(items) {
  return items.length > 0; // .length is the reliable truthy/falsy check for arrays
}

console.log(hasItems([])); // false
console.log(hasItems([1, 2])); // true
```

**18. Fallback display name**

```js
function getDisplayName(name) {
  return name || "Anonymous";
}

console.log(getDisplayName("")); // "Anonymous"
console.log(getDisplayName("Meera")); // "Meera"
```

**19. Required-field checker for a signup form**

```js
function getMissingFields(fields) {
  const required = ["name", "email", "password"];
  return required.filter((field) => !fields[field]);
}

console.log(getMissingFields({ name: "Ana", email: "", password: "1234" }));
// ["email"]
```

**20. Check whether an array is non-empty**

```js
function hasItems(items) {
  return Boolean(items.length);
}

console.log(hasItems([])); // false
console.log(hasItems(["item"])); // true
```

## Interview-style questions

**21. The exact 6 falsy values**

`false`, `0`, `""` (empty string), `null`, `undefined`, `NaN`. Commonly-assumed-falsy
values that are actually TRUTHY: `"0"` (a non-empty string), `[]` (an empty array),
and `{}` (an empty object).

**22. What `!!value` does**

The first `!` converts `value` to its boolean opposite (`true` becomes `false`, and
any truthy/falsy value becomes a plain boolean). The second `!` flips it back to the
correct boolean — the net result is `value` converted directly into `true`/`false`.

**23. Why `??` is safer than `||` for defaults**

`||` treats ANY falsy value (including valid values like `0`, `""`, `false`) as
"missing" and replaces it. `??` only replaces `null`/`undefined` specifically, leaving
legitimate falsy values like `0` untouched — which is usually what you actually want
for default values.

<!-- codingterminal-solution:end -->


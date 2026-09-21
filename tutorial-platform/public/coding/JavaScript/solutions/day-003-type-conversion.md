# Day 003 — Solution: Type Conversion

Reference solutions for `day-003-type-conversion.md`. Try the practice file yourself
first before checking these.

## Basic

**1. `"25"` to a number**

```js
console.log(Number("25")); // 25
```

**2. `25` to a string**

```js
console.log(String(25)); // "25"
```

**3. `"0"` to a boolean**

```js
console.log(Boolean("0")); // true — any non-empty string is truthy, even "0"
```

**4. `""` to a boolean**

```js
console.log(Boolean("")); // false — the empty string is one of the 6 falsy values
```

**5. `parseInt("42px")`**

```js
console.log(parseInt("42px")); // 42 — parseInt reads digits until it hits a non-digit
```

**6. `parseFloat("3.14 is pi")`**

```js
console.log(parseFloat("3.14 is pi")); // 3.14 — same idea, but keeps the decimal point
```

**7. `true`/`false` to strings**

```js
console.log(String(true)); // "true"
console.log(String(false)); // "false"
```

**8. `"3.99"` to a number, then round it**

```js
// Approach A — built-in Math.round()
console.log(Math.round(Number("3.99"))); // 4

// Approach B — without Math.round() (manual rounding logic)
const value = Number("3.99");
const rounded =
  value - Math.floor(value) >= 0.5 ? Math.floor(value) + 1 : Math.floor(value);
console.log(rounded); // 4
```

**9. `Number("hello")`**

```js
console.log(Number("hello")); // NaN — the string isn't a valid number at all
```

**10. `Number("   42   ")`**

```js
console.log(Number("   42   ")); // 42 — Number() trims surrounding whitespace automatically
```

## Concept

**11. Double a string number**

```js
function doubleFromString(strNum) {
  return Number(strNum) * 2;
}

console.log(doubleFromString("21")); // 42
```

**12. Add two string numbers correctly**

```js
function addStrings(a, b) {
  return Number(a) + Number(b);
}

console.log(addStrings("10", "20")); // 30 (not "1020"!)
console.log("10" + "20"); // "1020" — this is what happens WITHOUT converting first
```

**13. Decimal string to a whole number**

```js
console.log(parseInt("99.99")); // 99
```

**14. `toBoolean(value)`**

```js
function toBoolean(value) {
  return Boolean(value);
}

console.log(toBoolean(0)); // false
console.log(toBoolean(1)); // true
console.log(toBoolean("")); // false
console.log(toBoolean("hi")); // true
console.log(toBoolean(null)); // false
console.log(toBoolean(undefined)); // false
```

**15. Total of string prices**

```js
const prices = ["10", "20", "30"];

// Approach A — built-in reduce(), converting each value
const totalA = prices.reduce((sum, price) => sum + Number(price), 0);
console.log(totalA); // 60

// Approach B — manual loop, no array methods
let totalB = 0;
for (let i = 0; i < prices.length; i++) {
  totalB += Number(prices[i]);
}
console.log(totalB); // 60
```

**16. Handle an invalid number string gracefully**

```js
function safeConvert(strNum) {
  const value = Number(strNum);
  if (Number.isNaN(value)) {
    return "Invalid number";
  }
  return value;
}

console.log(safeConvert("42")); // 42
console.log(safeConvert("abc")); // "Invalid number"
```

**17. Detect `NaN`**

```js
console.log(Number.isNaN(Number("abc"))); // true
console.log(Number.isNaN(Number("42"))); // false
```

**18. Convert user input safely before doing math**

```js
function addUserInputs(inputA, inputB) {
  const a = Number(inputA);
  const b = Number(inputB);

  if (Number.isNaN(a) || Number.isNaN(b)) {
    return "Please enter valid numbers";
  }
  return a + b;
}

console.log(addUserInputs("10", "5")); // 15
console.log(addUserInputs("10", "abc")); // "Please enter valid numbers"
```

**19. `parseInt("10.99")` vs `Number("10.99")`**

```js
console.log(parseInt("10.99")); // 10 — parseInt stops at the decimal point
console.log(Number("10.99")); // 10.99 — Number() keeps the full decimal value
```

**20. Number with commas, e.g. `"1,000"`**

```js
console.log(Number("1,000")); // NaN — the comma makes the whole string invalid

// Fix: strip the commas first, THEN convert
const cleaned = "1,000".replaceAll(",", "");
console.log(Number(cleaned)); // 1000
```

## Interview-style questions

**21. Implicit vs explicit conversion**

- **Explicit conversion**: you deliberately convert a value, e.g. `Number("25")`.
- **Implicit conversion (coercion)**: JavaScript converts automatically behind the
  scenes, e.g. `"5" + 3` becomes `"53"` because `+` triggers string coercion.

**22. Why `Number("")` and `Number(" ")` both return `0`**

`Number()` treats whitespace-only strings (including a fully empty string) as
representing "nothing," which it maps to `0` — this is a specific, documented rule of
the `Number()` conversion, not a bug.

**23. `parseInt("42abc")` vs `Number("42abc")`**

```js
console.log(parseInt("42abc")); // 42 — reads valid leading digits, ignores the rest
console.log(Number("42abc")); // NaN — the ENTIRE string must be a valid number, or it fails
```

## Challenge

**24. Calculator accepting string input**

```js
function stringCalculator(strA, strB, operator) {
  const a = Number(strA);
  const b = Number(strB);

  if (Number.isNaN(a) || Number.isNaN(b)) {
    return "Invalid input";
  }

  switch (operator) {
    case "+":
      return a + b;
    case "-":
      return a - b;
    case "*":
      return a * b;
    case "/":
      return b === 0 ? "Cannot divide by zero" : a / b;
    default:
      return "Unknown operator";
  }
}

console.log(stringCalculator("10", "5", "+")); // 15
console.log(stringCalculator("10", "0", "/")); // "Cannot divide by zero"
console.log(stringCalculator("abc", "5", "+")); // "Invalid input"
```

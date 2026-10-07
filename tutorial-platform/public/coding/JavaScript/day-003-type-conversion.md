# Day 003 — Type Conversion

Matches Tutorial Day 3 (Syntax basics) — practice here jumps ahead slightly to type
conversion, since it naturally follows Day 2's data types. No limit on how many you solve.

## Basic

1. Convert the string `"25"` to a number using `Number()`.
2. Convert the number `25` to a string using `String()`.
3. Convert the string `"0"` to a boolean using `Boolean()` — check the result.
4. Convert the string `""` (empty) to a boolean using `Boolean()` — check the result.
5. Use `parseInt("42px")` and print the result.
6. Use `parseFloat("3.14 is pi")` and print the result.
7. Convert `true` and `false` to strings using `String()`.
8. Convert the string `"3.99"` to a number and then round it.
9. Try `Number("hello")` and print the result — what do you get?
10. Try `Number("   42   ")` (with spaces) and print the result.

## Concept

11. Write a function that takes a string number and returns it doubled (convert first).
12. Add two values that arrive as strings (e.g. `"10"` and `"20"`) and return the correct numeric sum.
13. Convert a decimal string like `"99.99"` into a whole number using `parseInt()`.
14. Write a function `toBoolean(value)` that shows how `Boolean()` treats different inputs.
15. Given a list of string prices (e.g. `["10", "20", "30"]`), calculate their total as numbers.
16. Handle an invalid number string (e.g. `"abc"`) gracefully — check with `Number.isNaN()`.
17. Detect and print `true`/`false` for whether a value is `NaN`.
18. Convert user input (always a string in real forms) into a number safely before doing math on it.
19. Show the difference between `parseInt("10.99")` and `Number("10.99")`.
20. Convert a number with commas as a string, e.g. `"1,000"`, and try to convert it — what goes wrong, and how would you fix it?

## Interview-style questions

21. What is the difference between implicit and explicit type conversion? Give one example of each.
22. Why does `Number("")` return `0` but `Number(" ")` (a space) also return `0`?
23. What's the difference between `parseInt()` and `Number()` when converting `"42abc"`?

## Challenge

24. Build a small **calculator that accepts string input** for both numbers (e.g. `"10"` and
    `"5"`), converts them safely, performs `+ - * /`, and handles invalid input without crashing.

## Notes

- Always convert to the right type _before_ doing math — mixing strings and numbers with `+`
  is one of the most common beginner bugs (`"10" + 5` gives `"105"`, not `15`).
- Keep testing with weird/edge-case inputs (empty strings, spaces, letters mixed with numbers)
  — that's where conversion bugs usually hide.

<!-- codingterminal-solution:start -->

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

<!-- codingterminal-solution:end -->


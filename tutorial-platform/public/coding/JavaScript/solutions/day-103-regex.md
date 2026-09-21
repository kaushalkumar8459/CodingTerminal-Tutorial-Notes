# Day 103 — Solution: Regex

```js
const patterns = {
  email: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
  phone: /^\d{10}$/,
  password: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[^\w\s]).{8,}$/,
  url: /^https?:\/\/[^\s]+$/,
  username: /^[A-Za-z0-9_]{3,16}$/,
  postalCode: /^\d{6}$/,
};
console.log(patterns.email.test("asha@example.com"));
console.log(patterns.phone.test("9876543210"));
console.log(patterns.password.test("Strong@123"));
console.log(patterns.url.test("https://example.com"));
console.log(patterns.username.test("user_123"));
console.log(patterns.postalCode.test("411001"));
```

**Extraction and redaction**

```js
const text = "Order #123 has 4 items at $56";
console.log(text.match(/\d+/g)); // ["123", "4", "56"]
console.log("Call 9876543210".replace(/\d/g, "*"));
console.log(
  "Email a@example.com or b@test.org".match(/[\w.-]+@[\w.-]+\.[A-Za-z]+/g),
);
```

**Reusable validators**

```js
const validators = {
  email: (value) => patterns.email.test(value),
  phone: (value) => patterns.phone.test(value),
  password: (value) => patterns.password.test(value),
  username: (value) => patterns.username.test(value),
  postalCode: (value) => patterns.postalCode.test(value),
};
const validateField = (value, name) => Boolean(validators[name]?.(value));
```

Use `^` and `$` to require the whole string to match. `test()` returns a boolean; `match()` returns matched text/details. A perfect email regex is impractical because the full email specification is extremely complex; applications usually choose a useful approximation and verify ownership separately.

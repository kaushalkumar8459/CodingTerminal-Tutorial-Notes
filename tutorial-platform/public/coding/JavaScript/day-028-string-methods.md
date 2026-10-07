# Day 028 — String Methods (slice, substring, includes, startsWith, endsWith, trim)

Matches Tutorial Day 28 (Strings Fundamentals). 15 problems — no limit on extending further.

1. Use `.slice()` to extract the first 5 characters of a string.
2. Use `.slice()` with a negative index to extract the last 3 characters of a string.
3. Use `.substring()` to extract characters between two given positions.
4. Compare `.slice(-3)` and `.substring(-3)` on the same string — note the different behavior.
5. Check whether a string `.includes()` a specific word.
6. Check whether a string `.startsWith()` a specific prefix.
7. Check whether a string `.endsWith()` a specific suffix.
8. Use `.trim()` to remove leading/trailing spaces from a user-input-style string.
9. Combine `.trim()` and `.length` to validate that a username isn't just empty spaces.
10. Extract a file extension from a filename string using `.slice()` (e.g. `"photo.png"` → `"png"`).
11. Check if an email string `.includes("@")` as a very basic validation step.
12. Extract the domain part of an email using `.slice()`/`.includes()`/`indexOf` together (e.g. `"user@test.com"` → `"test.com"`).
13. Use `.startsWith()` to check if a URL begins with `"https://"`.
14. Build a function `truncate(text, maxLength)` that uses `.slice()` to shorten long text and adds `"..."` if it was cut.
15. Use `.trimStart()` and `.trimEnd()` separately and observe the difference from `.trim()`.

## Notes

- `.slice()` is generally the more flexible/forgiving choice (supports negative indexes);
  `.substring()` treats negative arguments as `0`.
- None of these methods change the original string — always store the result if you need it.

<!-- codingterminal-solution:start -->

# Day 028 — Solution: String Methods

```js
const text = "JavaScript is useful";
console.log(text.slice(0, 5)); // JavaS
console.log(text.slice(-3)); // ful
console.log(text.substring(0, 10)); // JavaScript
console.log("abcdef".slice(-3)); // def
console.log("abcdef".substring(-3)); // abcdef
console.log(text.includes("useful"));
console.log(text.startsWith("Java"));
console.log(text.endsWith("useful"));
console.log("  hello  ".trim());
console.log("   ".trim().length > 0); // false
```

**10. File extension**

```js
function extension(filename) {
  const dot = filename.lastIndexOf(".");
  return dot === -1 ? "" : filename.slice(dot + 1);
}
console.log(extension("photo.png")); // png
```

**11. Basic email check**

```js
const hasAtSign = (email) => email.includes("@");
```

**12. Email domain**

```js
function domain(email) {
  const at = email.indexOf("@");
  return at === -1 ? "" : email.slice(at + 1);
}
console.log(domain("user@test.com")); // test.com
```

**13. HTTPS URL**

```js
const isSecureUrl = (url) => url.startsWith("https://");
```

**14. Truncate text**

```js
function truncate(text, maxLength) {
  return text.length > maxLength ? text.slice(0, maxLength) + "..." : text;
}
console.log(truncate("JavaScript tutorial", 10)); // JavaScript...
```

**15. Trim separately**

```js
const value = "  hello  ";
console.log(value.trimStart()); // "hello  "
console.log(value.trimEnd()); // "  hello"
console.log(value.trim()); // "hello"
```

The string methods return new strings; they do not mutate the original string.

<!-- codingterminal-solution:end -->


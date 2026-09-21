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

---
title: JSON In Depth
slug: day-100-json-in-depth
dayLabel: Day 100
level: Advanced
estimatedMinutes: 25
order: 100
track: javascript
---

# Day 100 [Advanced]: JSON In Depth

## Goal

Fully understand JSON — its syntax rules, `JSON.stringify()`/`JSON.parse()` in depth, and common pitfalls when working with it.

## Prerequisites

- Day 14 (JSON preview with Local Storage), Day 90 (API JSON responses)

## Explanation

**JSON** (JavaScript Object Notation) is a text-based data format used for storing and transmitting structured data — it looks similar to JavaScript object/array literals, but with stricter rules (like requiring double quotes around every key). You've already used `JSON.stringify()`/`JSON.parse()` throughout this course (Local Storage, API responses) — today formalizes exactly how they work, including what they can and can't represent.

## Topic by Topic

### Topic 1: JSON syntax rules

Theory:
JSON syntax looks like JavaScript object/array literals, but is STRICTER: keys must be double-quoted strings, no trailing commas, no comments, and only a limited set of value types are allowed.

Code Example:

```json
{
  "name": "Aria",
  "age": 28,
  "isActive": true,
  "tags": ["admin", "verified"],
  "address": { "city": "Pune" }
}
```

**Explanation:** Every key is in double quotes (single quotes or unquoted keys are NOT valid JSON, even though they're valid in plain JavaScript object literals); values can be strings, numbers, booleans, `null`, arrays, or nested objects — but NOTHING else.

**Key Points:**

- JSON keys must ALWAYS be double-quoted strings.
- No trailing commas, no comments — JSON is stricter than JavaScript object literal syntax.
- Only strings, numbers, booleans, `null`, arrays, and objects are valid JSON values.

### Topic 2: What JSON CANNOT represent

Theory:
Several JavaScript values have no JSON equivalent: `undefined`, functions, `Symbol`, and `Date` objects (though `Date` gets converted to a string, losing its "Date-ness").

Code Example:

```js
const data = {
  name: "Test",
  createdAt: new Date(),
  callback: function () {},
  missing: undefined,
  id: Symbol("id"),
};

console.log(JSON.stringify(data));
// {"name":"Test","createdAt":"2026-01-01T00:00:00.000Z"}
// - callback, missing, and id are SILENTLY DROPPED entirely!
```

**Explanation:** `JSON.stringify()` doesn't throw an error for unsupported values — it simply OMITS them from the output entirely (for object properties) or converts them to `null` (inside arrays) — a subtle behavior worth knowing well.

**Key Points:**

- `undefined`, functions, and `Symbol` values are silently DROPPED by `JSON.stringify()` when they're object properties.
- `Date` objects are converted to ISO date STRINGS — you lose the actual `Date` object type, needing to manually re-convert after parsing.
- Always double-check what actually survives a round-trip through `JSON.stringify()`/`JSON.parse()` for complex objects.

### Topic 3: `JSON.stringify()` formatting options

Theory:
`JSON.stringify(value, replacer, space)` accepts optional arguments for filtering properties and pretty-printing with indentation.

Code Example:

```js
const user = { name: "Kabir", password: "secret123", age: 30 };

console.log(JSON.stringify(user, ["name", "age"])); // only include these keys
console.log(JSON.stringify(user, null, 2)); // pretty-print with 2-space indentation
```

**Explanation:** The second argument (a `replacer`) can be an array of keys to include (filtering out `password` here); the third argument (`space`) controls indentation for human-readable, pretty-printed output — useful for logging/debugging.

**Key Points:**

- The `replacer` array parameter lets you selectively include only specific properties.
- The `space` parameter (a number or string) pretty-prints the output with indentation.
- Both are optional — `JSON.stringify(value)` alone is the most common usage.

### Topic 4: Handling `JSON.parse()` errors safely

Theory:
`JSON.parse()` throws an error if given invalid/malformed JSON text — always wrap it in `try/catch` when parsing data you don't fully control (like Local Storage or API responses).

Code Example:

```js
function safeJSONParse(text, fallback = null) {
  try {
    return JSON.parse(text);
  } catch (error) {
    console.log("Invalid JSON:", error.message);
    return fallback;
  }
}

const data = safeJSONParse(localStorage.getItem("settings"), {});
```

**Explanation:** If `localStorage.getItem("settings")` returns `null` (never set) or corrupted text, `JSON.parse()` would throw — this wrapper safely falls back to a default value instead of crashing the program.

**Key Points:**

- `JSON.parse()` throws on invalid input — always wrap it in `try/catch` for data you don't fully control.
- A reusable `safeJSONParse()` helper with a fallback value is a genuinely useful pattern.
- This directly connects back to Day 14/99's Local Storage work, where this exact risk exists.

## Recap

- JSON syntax is stricter than JavaScript object literals — double-quoted keys, no trailing commas/comments, limited value types.
- `undefined`, functions, and `Symbol` are silently dropped by `JSON.stringify()`; `Date` becomes a string.
- Always wrap `JSON.parse()` in `try/catch` when parsing data you don't fully control.

## What's Next

Practice for today: `public/coding/JavaScript/day-100-json-data-viewer.md` — build a JSON Data Viewer. Day 101 covers ES Modules — organizing code across multiple files.

---
title: Optional Chaining and Nullish Coalescing In Depth
slug: day-054-optional-chaining-and-nullish-coalescing-in-depth
dayLabel: Day 54
level: Intermediate
estimatedMinutes: 25
order: 54
track: javascript
---

# Day 54 [Intermediate]: Optional Chaining and Nullish Coalescing In Depth

## Goal

Go beyond the Day 9 introduction — using optional chaining with function calls and arrays, and combining it fluently with nullish coalescing for safe defaults.

## Prerequisites

- Day 9 (intro to `?.` and `??`)

## Explanation

Optional chaining (`?.`) and nullish coalescing (`??`) were introduced on Day 9. Now that you've worked with more realistic, nested objects (Module 3) and functions (Module 4), today revisits them in more advanced, practical scenarios: optional method calls, optional array access, and chaining several `?.` together across a deeply nested structure — all combined with `??` for clean fallback values.

## Topic by Topic

### Topic 1: Optional chaining with function calls

Theory:
`object.method?.()` only calls `method` if it actually exists (and is a function) — otherwise the whole expression short-circuits to `undefined`, without throwing an error.

Code Example:

```js
const user = {
  name: "Iris",
  // no "logout" method defined
};

user.logout?.(); // does nothing, no error - method doesn't exist
console.log(user.login?.() ?? "No login method available");
```

**Explanation:** Without `?.()`, calling a missing method (`user.logout()`) would throw an error. With `?.()`, the call is simply skipped if the method doesn't exist.

**Key Points:**

- `object.method?.()` safely handles a method that might not exist.
- Combine with `??` to provide a fallback message/value when the method is missing.
- Useful for optional callbacks/handlers that a caller may or may not have provided.

### Topic 2: Optional chaining with arrays

Theory:
`array?.[index]` safely accesses an array element, in case the array itself might be missing (`undefined`/`null`).

Code Example:

```js
function getFirstItem(cart) {
  return cart?.[0] ?? "Cart is empty or missing";
}

console.log(getFirstItem(["Apple", "Bread"])); // "Apple"
console.log(getFirstItem(undefined)); // "Cart is empty or missing"
console.log(getFirstItem([])); // "Cart is empty or missing" (index 0 is undefined too)
```

**Explanation:** `cart?.[0]` avoids an error if `cart` itself is `undefined`; `??` then provides a friendly fallback whether the array was missing OR simply empty.

**Key Points:**

- `array?.[index]` protects against the array itself being missing, not against an out-of-range index (which is already safely `undefined`).
- Combining `?.` and `??` together is an extremely common, powerful pattern.
- This pattern shows up constantly when working with data that might not have loaded yet (previewed more in Module 6's Fetch API work).

### Topic 3: Chaining multiple `?.` together

Theory:
You can chain several `?.` operators together across a deeply nested structure, and the entire chain short-circuits to `undefined` at the first missing link.

Code Example:

```js
const company = {
  name: "Acme",
  // no "ceo" property
};

console.log(company.ceo?.address?.city ?? "City unknown");
```

**Explanation:** Since `company.ceo` doesn't exist, the entire chain (`?.address?.city`) short-circuits immediately — there's no need for `ceo` to exist for the expression to safely resolve to `undefined`, which `??` then replaces with a friendly message.

**Key Points:**

- A chain of `?.` stops safely at the very first missing link, however deep the chain is.
- You don't need `?.` at every single step if you're certain some earlier links always exist — but it doesn't hurt to be safe.
- This is essential for working with real-world, sometimes-incomplete data (like API responses).

### Topic 4: `??` vs `||` — a practical reminder

Theory:
As covered on Day 9, `??` only falls back for `null`/`undefined`, while `||` falls back for ANY falsy value — this distinction matters even more once combined with optional chaining.

Code Example:

```js
const settings = { volume: 0 }; // a deliberately valid "0" value

console.log(settings.volume || 50); // 50 - WRONG, 0 is a valid volume!
console.log(settings.volume ?? 50); // 0  - CORRECT, only null/undefined fall back
```

**Explanation:** If `volume` legitimately being `0` should be respected (not replaced), `??` is the only correct choice — `||` would incorrectly treat a valid `0` as "missing."

**Key Points:**

- Default to `??` over `||` whenever `0`, `""`, or `false` could be legitimate values.
- This combination (`?.` for safe access, `??` for safe defaults) is one of the most useful pairings in modern JavaScript.
- Always double-check: could this specific value legitimately be a "falsy but valid" value?

## Recap

- `?.()` safely calls a method that might not exist; `?.[index]` safely accesses an array element.
- Chained `?.` operators short-circuit safely at the first missing link, however deep.
- `??` is the correct default-value operator whenever `0`/`""`/`false` could be legitimate, valid values.

## What's Next

Practice for today: `public/coding/JavaScript/day-054-advanced-closure-problems.md`. Day 55 covers callback functions in more theoretical depth, connecting to the Day 52 practice.

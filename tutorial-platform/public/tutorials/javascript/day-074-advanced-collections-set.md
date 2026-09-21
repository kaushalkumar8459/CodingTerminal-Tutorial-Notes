---
title: Advanced Collections - Set
slug: day-074-advanced-collections-set
dayLabel: Day 74
level: Intermediate
estimatedMinutes: 25
order: 74
track: javascript
---

# Day 74 [Intermediate]: Advanced Collections — `Set`

## Goal

Consolidate `Set` in full depth — building on the Day 72 preview — including its methods and common practical use cases.

## Prerequisites

- Day 72 (Set practice preview)

## Explanation

A `Set` is a built-in collection that stores only **unique** values — attempting to add a duplicate value simply has no effect. Unlike arrays, a `Set` doesn't have indexed positions; you interact with it through methods like `.add()`, `.has()`, `.delete()`, and `.size` (not `.length`). `Set` is the standard tool whenever "no duplicates allowed" is a genuine requirement of your data, rather than something you'd otherwise have to check manually with `.includes()`.

## Topic by Topic

### Topic 1: Creating and modifying a `Set`

Theory:
`new Set()` creates an empty Set; `new Set(iterable)` creates one pre-filled from an array (or any iterable), automatically removing duplicates.

Code Example:

```js
const uniqueNumbers = new Set([1, 2, 2, 3, 3, 3]);
console.log(uniqueNumbers); // Set(3) {1, 2, 3} - duplicates removed automatically

uniqueNumbers.add(4);
uniqueNumbers.add(2); // no effect - 2 already exists
console.log(uniqueNumbers.size); // 4
```

**Explanation:** Creating a `Set` from an array with duplicates automatically deduplicates it; `.add()` only actually adds a value if it isn't already present.

**Key Points:**

- `new Set(array)` is the standard, one-line way to remove duplicates from an array.
- `.add()` silently does nothing if the value already exists — no error, no duplicate.
- Use `.size`, not `.length`, to get the count of items in a `Set`.

### Topic 2: Checking and removing values

Theory:
`.has(value)` checks membership; `.delete(value)` removes a specific value if present.

Code Example:

```js
const tags = new Set(["js", "web", "coding"]);

console.log(tags.has("web")); // true
console.log(tags.has("python")); // false

tags.delete("coding");
console.log(tags); // Set(2) {"js", "web"}
```

**Explanation:** `.has()` and `.delete()` work directly on VALUES, not positions — there's no concept of "index" in a `Set`, unlike arrays.

**Key Points:**

- `.has(value)` is generally faster for large collections than `array.includes(value)`.
- `.delete(value)` removes by value directly, with no index involved.
- `Set` has no indexed access (`set[0]` doesn't work) — convert to an array first if you need that.

### Topic 3: Converting between `Set` and array

Theory:
Since a `Set` doesn't support array methods (`.map()`, `.filter()`, etc.) directly, you often convert it to an array to use those, then possibly back to a `Set`.

Code Example:

```js
const uniqueTags = new Set(["js", "web", "js", "css"]);

const tagsArray = [...uniqueTags]; // convert to array
const upperTags = tagsArray.map((tag) => tag.toUpperCase());

console.log(upperTags); // ["JS", "WEB", "CSS"]
```

**Explanation:** `[...uniqueTags]` (spread) converts the `Set` into a real array, unlocking `.map()`/`.filter()`/`.reduce()` — a very common pattern when you need both deduplication AND array methods.

**Key Points:**

- Spread (`[...set]`) or `Array.from(set)` both convert a `Set` into a real array.
- This "dedupe with Set, then process with array methods" pattern is extremely common.
- Converting back to a `Set` afterward (`new Set(processedArray)`) is fine if you still need uniqueness guaranteed.

### Topic 4: Practical `Set` use cases

Theory:
`Set` shines in real scenarios: removing duplicates, tracking "seen" items while looping, and set-theory operations (union/intersection/difference from Day 72).

Code Example:

```js
function hasDuplicates(array) {
  return new Set(array).size !== array.length;
}

console.log(hasDuplicates([1, 2, 3])); // false
console.log(hasDuplicates([1, 2, 2, 3])); // true
```

**Explanation:** If converting to a `Set` reduces the count, there were duplicates — a very compact, readable way to answer "does this array have duplicates?"

**Key Points:**

- Comparing `Set` size to original array length is a quick, elegant duplicate-detection trick.
- `Set` is ideal for "track what I've already seen" patterns while looping through data.
- Combined with the union/intersection/difference operations from Day 72, `Set` covers most "uniqueness"-related problems cleanly.

## Recap

- `Set` stores only unique values, using `.add()`, `.has()`, `.delete()`, and `.size` (not array-style indexing).
- Convert between `Set` and array with spread/`Array.from()` to combine uniqueness with array methods.
- `Set` is ideal for deduplication, membership tracking, and set-theory operations.

## What's Next

Practice for today: `public/coding/JavaScript/day-074-weakmap-weakset.md`. Day 75 covers `Map` and weak collections in full depth.

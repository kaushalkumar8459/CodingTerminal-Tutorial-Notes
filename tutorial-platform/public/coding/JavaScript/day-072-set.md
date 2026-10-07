# Day 072 — Set (union, intersection, difference)

Matches Tutorial Day 72 (Composition In Depth). No limit on how many you solve.

## Basic

1. Create a `Set` from an array with duplicate values and confirm duplicates are removed.
2. Add a value to a `Set` using `.add()`.
3. Check if a value exists in a `Set` using `.has()`.
4. Remove a value from a `Set` using `.delete()`.
5. Convert a `Set` back into an array using `[...set]`.

## Concept

6. Use a `Set` to remove duplicates from an array of user IDs.
7. Use a `Set` to track unique tags across a list of blog posts (each post has a `tags`
   array — combine and dedupe them all).
8. Use a `Set` to check if a username is already taken from a growing collection of
   registered usernames.
9. Use `.size` to count how many unique values a `Set` contains.
10. Loop over a `Set` using `for...of` (revisit Day 22) and print each value.

## Challenge — Set operations

11. Implement `union(setA, setB)` — returns a new `Set` containing all values from both sets.
12. Implement `intersection(setA, setB)` — returns a new `Set` containing only values
    present in BOTH sets.
13. Implement `difference(setA, setB)` — returns a new `Set` containing values in
    `setA` that are NOT in `setB`.
14. Test all three operations with two sets of numbers, and with two sets of strings
    (e.g. two users' sets of "interests").

## Interview-style questions

15. What's the main advantage of a `Set` over an array for storing unique values?
16. Why is checking `.has()` on a `Set` generally faster than checking `.includes()`
    on a large array?
17. How would you convert a `Set` back into a regular array, and why might you need to?

## Notes

- `Set` is the right tool whenever "no duplicates" is a requirement of your data, not
  just an array with extra filtering logic bolted on.
- Union/intersection/difference are genuinely useful, common operations — e.g. finding
  "friends in common," "tags shared between two posts," or "features unique to one
  plan vs another."

<!-- codingterminal-solution:start -->

# Day 072 — Solution: Set

```js
const values = new Set([1, 2, 2, 3]);
values.add(4);
console.log(values.has(2));
values.delete(1);
console.log([...values]);
console.log(values.size);
for (const value of values) console.log(value);
```

**6–10. Practical uses**

```js
const uniqueUserIds = [...new Set([101, 101, 202, 303])];
const posts = [{ tags: ["js", "web"] }, { tags: ["web", "dom"] }];
const tags = new Set(posts.flatMap((post) => post.tags));
const registered = new Set(["asha", "ben"]);
const isTaken = (username) => registered.has(username);
registered.add("maya");
```

**11–13. Set operations**

```js
function union(setA, setB) {
  return new Set([...setA, ...setB]);
}
function intersection(setA, setB) {
  return new Set([...setA].filter((value) => setB.has(value)));
}
function difference(setA, setB) {
  return new Set([...setA].filter((value) => !setB.has(value)));
}

const first = new Set([1, 2, 3]);
const second = new Set([3, 4, 5]);
console.log(union(first, second));
console.log(intersection(first, second));
console.log(difference(first, second));
console.log(intersection(new Set(["js", "web"]), new Set(["web", "dom"])));
```

## Interview-style questions

**15.** A Set guarantees uniqueness without manual duplicate checks.

**16.** Set membership is generally near constant-time, while array `includes()` scans values linearly.

**17.** Use `[...set]` or `Array.from(set)` when array methods, indexing, or JSON-style serialization are needed.

<!-- codingterminal-solution:end -->


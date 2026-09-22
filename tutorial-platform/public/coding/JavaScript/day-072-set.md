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

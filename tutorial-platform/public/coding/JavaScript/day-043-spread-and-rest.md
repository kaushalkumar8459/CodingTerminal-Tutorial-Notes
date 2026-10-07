# Day 043 — Spread & Rest

Matches Tutorial Day 43 (Built-in Object Methods) — practice previews spread/rest here,
ahead of Tutorial Day 51's full deep dive. No limit on how many you solve.

## Basic

1. Merge two arrays into one using the spread operator (`[...arr1, ...arr2]`).
2. Merge two objects into one using the spread operator (`{...obj1, ...obj2}`).
3. Copy an array using spread (`[...original]`) and confirm changing the copy doesn't
   affect the original.
4. Copy an object using spread (`{...original}`) and confirm the same for objects.
5. Write a function using rest parameters (`...args`) that accepts any number of numbers
   and returns their sum.

## Concept

6. Merge two objects where the second one should override matching properties from the first.
7. Remove duplicates from an array by combining spread with a `Set`
   (`[...new Set(array)]`).
8. Add a new property to a copy of an object without mutating the original, using spread.
9. Write a function `multiply(...numbers)` using rest parameters that multiplies any
   number of arguments together.
10. Combine spread and destructuring: extract the first item of an array and collect the
    rest into a new array (`const [first, ...rest] = arr`).
11. Write a function that takes a fixed first parameter and then any number of
    additional parameters using rest (e.g. `function logAll(prefix, ...items) {}`).

## Interview-style questions

12. What's the difference between the spread operator and the rest parameter — they use
    the same `...` syntax, so what determines which one is happening?
13. Why is `[...array]` generally considered safer than `array` alone when you want to
    avoid mutating the original?
14. How would you merge two objects with spread if you specifically wanted the FIRST
    object's values to win on conflicts (hint: think about argument order)?

## Notes

- Spread (`...`) is used when "expanding" an existing array/object into individual
  elements/properties. Rest (`...`) is used when "collecting" multiple individual
  values into one array. Same symbol, opposite direction — context tells them apart.
- These shallow copies (spread) only copy one level deep — nested objects/arrays inside
  are still shared by reference. We'll cover this fully on Day 44 (shallow vs deep copy).

<!-- codingterminal-solution:start -->

# Day 043 — Solution: Spread & Rest

**1–4. Spread copies and merges**

```js
const first = [1, 2];
const second = [3, 4];
const combined = [...first, ...second];
const mergedObject = { name: "Asha", ...{ age: 25 } };
const copiedArray = [...first];
copiedArray[0] = 99;
const originalObject = { active: true };
const copiedObject = { ...originalObject };
copiedObject.active = false;
```

**5. Sum with rest**

```js
function sum(...numbers) {
  return numbers.reduce((total, number) => total + number, 0);
}
```

**6. Second object overrides**

```js
const merged = { ...{ theme: "light", size: "m" }, ...{ theme: "dark" } };
```

**7. Remove duplicates**

```js
const unique = [...new Set([1, 2, 2, 3, 1])];
```

**8. Add without mutation**

```js
const updated = { ...originalObject, language: "JavaScript" };
```

**9. Multiply with rest**

```js
function multiply(...numbers) {
  return numbers.reduce((result, number) => result * number, 1);
}
```

**10. First and rest**

```js
const [head, ...rest] = [10, 20, 30];
```

**11. Fixed parameter plus rest**

```js
function logAll(prefix, ...items) {
  items.forEach((item) => console.log(prefix, item));
}
```

## Interview-style questions

**12.** Spread expands values at a call, array, or object location. Rest collects remaining values in a parameter or destructuring pattern.

**13.** `array` creates another reference, while `[...array]` creates a new outer array.

**14.** Put the first object last: `{ ...second, ...first }`, so the first object's values override conflicts.

<!-- codingterminal-solution:end -->


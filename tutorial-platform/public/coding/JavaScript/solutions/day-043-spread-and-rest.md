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

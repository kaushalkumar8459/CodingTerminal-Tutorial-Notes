# Day 050 — Reference vs Value

Matches Tutorial Day 50 (Primitive vs Reference Types). No limit on how many you solve.

## Basic

1. Copy a primitive number into a new variable, change the copy, confirm the original is unaffected.
2. Copy an array into a new variable WITHOUT spread, change an element in the "copy",
   and confirm the original changed too.
3. Copy an object into a new variable WITHOUT spread, change a property, confirm the
   original changed too.
4. Compare two identical-looking objects with `===` and confirm the result is `false`.
5. Compare an object to itself (assigned to a second variable) with `===` and confirm
   the result is `true`.

## Concept

6. Write a function that takes a number parameter and tries to change it inside the
   function — confirm the caller's original variable is unaffected.
7. Write a function that takes an object parameter and changes one of its properties —
   confirm the caller's original object IS affected.
8. Write a function that takes an object parameter and reassigns the entire parameter
   to a brand-new object — confirm the caller's original object is NOT affected this time
   (contrast with problem 7).
9. Given an array of objects, copy the array with spread (shallow copy) — confirm the
   array itself is independent, but the objects inside are still shared.
10. Write a simple `isEqualByValue(objA, objB)` function that compares two SIMPLE flat
    objects (no nesting) property by property, instead of using `===`.

## Interview-style questions

11. Why does `===` return `false` for two different objects with identical properties?
12. What's the practical difference between "passing by value" and "passing by
    reference" when calling a function?
13. If you reassign a parameter INSIDE a function (`param = newValue`), does that ever
    affect the caller's original variable, for either primitives or objects? Explain why or why not.

## Notes

- This topic connects directly back to Day 44 (shallow vs deep copy) — today focuses on
  the underlying "why," while Day 44 focused on the practical copying techniques.
- A huge number of real-world bugs come from assuming an object was copied when it
  actually wasn't — build strong intuition here before moving forward.

<!-- codingterminal-solution:start -->

# Day 050 — Solution: Reference vs Value

**1–5. Basic behavior**

```js
let originalNumber = 5;
let copiedNumber = originalNumber;
copiedNumber = 10;
console.log(originalNumber); // 5

const originalArray = [1, 2];
const arrayCopy = originalArray;
arrayCopy[0] = 9;
console.log(originalArray); // [9, 2]

const originalObject = { name: "Asha" };
const objectCopy = originalObject;
objectCopy.name = "Ben";
console.log(originalObject.name); // Ben

console.log({ a: 1 } === { a: 1 }); // false
const sameObject = originalObject;
console.log(originalObject === sameObject); // true
```

**6. Primitive parameter**

```js
function changeNumber(number) {
  number = 99;
}
let value = 5;
changeNumber(value);
console.log(value); // 5
```

**7. Mutate object parameter**

```js
function renameUser(user) {
  user.name = "Maya";
}
const user = { name: "Asha" };
renameUser(user);
console.log(user.name); // Maya
```

**8. Reassign object parameter**

```js
function replaceUser(user) {
  user = { name: "New user" };
}
const account = { name: "Original" };
replaceUser(account);
console.log(account.name); // Original
```

**9. Shallow copy of object array**

```js
const people = [{ name: "Asha" }];
const peopleCopy = [...people];
peopleCopy.push({ name: "Ben" });
peopleCopy[0].name = "Maya";
console.log(people.length); // 1
console.log(people[0].name); // Maya, nested object is shared
```

**10. Compare simple flat objects by value**

```js
function isEqualByValue(first, second) {
  const firstKeys = Object.keys(first);
  const secondKeys = Object.keys(second);
  if (firstKeys.length !== secondKeys.length) return false;
  return firstKeys.every(
    (key) => Object.hasOwn(second, key) && first[key] === second[key],
  );
}
console.log(isEqualByValue({ a: 1, b: 2 }, { a: 1, b: 2 })); // true
```

## Interview-style questions

**11.** Objects are reference values. Two separately created objects have different identities even when their properties look identical.

**12.** JavaScript passes argument values. For objects, that value is a reference to an object, so a function can mutate the shared object but cannot replace the caller's variable by reassigning its local parameter.

**13.** Reassigning a parameter never changes the caller's binding. For objects, mutating a property through the parameter changes the shared object; assigning `parameter = newValue` changes only the local parameter.

<!-- codingterminal-solution:end -->


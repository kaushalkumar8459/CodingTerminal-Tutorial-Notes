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

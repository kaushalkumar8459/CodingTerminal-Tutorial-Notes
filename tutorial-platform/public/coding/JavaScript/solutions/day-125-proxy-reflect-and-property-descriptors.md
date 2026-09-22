# Solution — Day 125: Proxy, Reflect & Property Descriptors

## 1. Inspect a descriptor
```js
const user = { name: "Asha" };
console.log(Object.getOwnPropertyDescriptor(user, "name"));
```

## 2. Non-writable property
```js
Object.defineProperty(user, "id", {
  value: 101,
  writable: false,
  enumerable: true,
  configurable: false
});
```

## 3. Non-enumerable property
A non-enumerable property exists but is skipped by common enumeration methods such as `Object.keys()`.

## 4–5. Descriptor flags
- `writable`: value may be changed.
- `enumerable`: property appears in enumeration.
- `configurable`: descriptor/property can be reconfigured or deleted.

## 6–9. Reflect
```js
Reflect.get(user, "name");
Reflect.set(user, "name", "Ravi");
Reflect.has(user, "name");
Reflect.ownKeys(user);
```

Reflect methods return predictable values and are especially useful inside Proxy traps.

## 10. Log reads
```js
const logged = new Proxy(user, {
  get(target, property, receiver) {
    console.log("read:", property);
    return Reflect.get(target, property, receiver);
  }
});
```

## 11. Validate writes
```js
const validated = new Proxy({}, {
  set(target, property, value, receiver) {
    if (property === "age" && (!Number.isInteger(value) || value < 0)) {
      throw new TypeError("age must be a non-negative integer");
    }
    return Reflect.set(target, property, value, receiver);
  }
});
```

## 12. Protect deletion
```js
const protectedUser = new Proxy({ id: 1 }, {
  deleteProperty(target, property) {
    if (property === "id") return false;
    return Reflect.deleteProperty(target, property);
  }
});
```

## 13. Default values
```js
const defaults = new Proxy({ name: "Guest" }, {
  get(target, property, receiver) {
    return Reflect.has(target, property)
      ? Reflect.get(target, property, receiver)
      : "N/A";
  }
});
```

## 14. Access counter
Keep a counter object and increment the relevant property inside the `get` trap.

## 15. Reactive-style object
Use a `set` trap to compare the old and new value, call a subscriber when the value changes, then delegate the actual write to `Reflect.set()`.

## 16. Why Reflect inside Proxy
Reflect preserves ordinary JavaScript object semantics and correctly forwards the receiver.

## Interview Answers

17. Proxy intercepts selected operations performed on an object.
18. Reflect provides standard operations that can be forwarded from traps without manually reproducing language semantics.
19. A descriptor defines how an object's property behaves.
20. A Proxy can intercept many object operations dynamically; a wrapper generally exposes explicitly written methods.
21. Proxy can make control flow harder to understand and may introduce performance/debugging complexity.
22. No. Only operations represented by available Proxy traps can be intercepted.

# Day 058 — Prototype (Properties, Methods, Chain, Object.create)

Matches Tutorial Day 58 (The this Keyword) — practice previews prototypes here, ahead of
Tutorial Day 60's full explanation. No limit on how many you solve.

## Basic

1. Create a constructor function `Animal(name)`, then add a method `speak()` to
   `Animal.prototype` that logs `"${name} makes a sound"`.
2. Create two `Animal` instances and confirm both can call `.speak()`, even though it's
   defined only once on the prototype (not copied per instance).
3. Use `Object.getPrototypeOf(instance)` to confirm what an instance's prototype
   actually is.
4. Add a NEW method to `Animal.prototype` AFTER creating some instances, and confirm the
   existing instances can immediately use the new method too.
5. Use `console.log(instance.__proto__ === Animal.prototype)` to confirm the
   relationship directly (noting `__proto__` is somewhat old-style, `Object.getPrototypeOf`
   is preferred).

## Concept

6. Create an object using `Object.create(someProto)` directly (without a constructor
   function at all), and confirm it can use methods defined on `someProto`.
7. Build a small prototype chain manually: create a `baseObject` with a `greet()`
   method, then use `Object.create(baseObject)` to create a `childObject` — confirm
   `childObject` can call `greet()` even though it's not defined directly on it.
8. Add a property directly to an instance (not the prototype) that has the SAME name as
   a prototype method — confirm the instance's own property "wins" (this is called
   shadowing).
9. Explain, with an example, why putting methods on the prototype (rather than
   assigning them individually inside the constructor, like `this.speak = function(){}`)
   is more memory-efficient for many instances.

## Interview-style questions

10. What is the prototype chain, in your own words?
11. Why do methods added to `Constructor.prototype` get shared across ALL instances,
    while properties set with `this.property = value` inside the constructor do NOT?
12. What does `Object.create(proto)` do, exactly?

## Notes

- The core idea: every object has an internal link to another object (its prototype),
  and JavaScript looks UP this chain when a property/method isn't found directly on the
  object itself.
- This mechanism is what makes shared methods (like array methods `.map()`/`.filter()`
  themselves!) work without every single array/object needing its own private copy of
  every method.

<!-- codingterminal-solution:start -->

# Day 058 — Solution: Prototype

## Basic

```js
function Animal(name) { this.name = name; }
Animal.prototype.speak = function () { console.log(`${this.name} makes a sound`); };
const first = new Animal("Leo");
const second = new Animal("Milo");
first.speak();
second.speak();
console.log(Object.getPrototypeOf(first) === Animal.prototype); // true

Animal.prototype.describe = function () { return `Animal: ${this.name}`; };
console.log(first.describe()); // existing instances see new prototype methods
console.log(first.__proto__ === Animal.prototype); // true
```

**6. Object.create**

```js
const proto = { greet() { return "hello"; } };
const directObject = Object.create(proto);
console.log(directObject.greet());
```

**7. Manual chain**

```js
const baseObject = { greet() { return `Hello, ${this.name}`; } };
const childObject = Object.create(baseObject);
childObject.name = "Asha";
console.log(childObject.greet());
```

**8. Shadowing**

```js
first.speak = () => console.log("instance sound");
first.speak(); // own property wins over the prototype method
```

**9.** A prototype holds one shared method function for many instances. Assigning `this.speak = function(){}` creates a separate function object inside every instance, using more memory.

## Interview-style questions

**10.** The prototype chain is the sequence JavaScript searches when a property is not found directly on an object.

**11.** `this.property` creates an own property per instance; `Constructor.prototype.method` creates one shared property found through the chain.

**12.** `Object.create(proto)` creates a new object whose internal prototype link points to `proto`, without calling a constructor.

<!-- codingterminal-solution:end -->


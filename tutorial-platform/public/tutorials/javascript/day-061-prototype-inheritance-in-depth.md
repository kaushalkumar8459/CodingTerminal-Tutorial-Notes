---
title: Prototype Inheritance In Depth
slug: day-061-prototype-inheritance-in-depth
dayLabel: Day 61
level: Intermediate
estimatedMinutes: 30
order: 61
track: javascript
---

# Day 61 [Intermediate]: Prototype Inheritance In Depth

## Goal

Fully understand how constructor functions and prototypes combine to implement inheritance, connecting the Day 59 practice with Day 60's theory.

## Prerequisites

- Day 57 (constructor practice), Day 59 (inheritance practice), Day 60 (prototype theory)

## Explanation

**Constructor functions** create objects using `new`, and every object created this way is automatically linked (via its prototype) to `Constructor.prototype`. This is how methods can be shared efficiently across every instance, instead of each instance carrying its own private copy.

**Prototype inheritance** happens when you deliberately link one constructor's prototype to another's — so instances of the "child" constructor gain access to the "parent" constructor's shared methods too, while still being able to override specific ones. This was exactly the pattern you practiced manually on Day 59; today explains precisely why each piece of that pattern is necessary.

## Topic by Topic

### Topic 1: How `new` and constructor functions connect to prototypes

Theory:
When you call `new Constructor()`, JavaScript automatically creates a new object whose prototype is set to `Constructor.prototype` — this is the built-in link that makes shared methods work.

Code Example:

```js
function Animal(name) {
  this.name = name;
}

Animal.prototype.speak = function () {
  console.log(`${this.name} makes a sound`);
};

const dog = new Animal("Rex");
console.log(Object.getPrototypeOf(dog) === Animal.prototype); // true
dog.speak(); // "Rex makes a sound"
```

**Explanation:** `dog` doesn't have its own copy of `speak` — it's found via the prototype chain, exactly as explained on Day 60, because `new Animal(...)` automatically links `dog`'s prototype to `Animal.prototype`.

**Key Points:**

- `new Constructor()` automatically sets the new object's prototype to `Constructor.prototype`.
- Methods placed on `Constructor.prototype` (not inside the constructor function body) are shared by all instances.
- This is the standard, memory-efficient pattern for adding behavior to many instances.

### Topic 2: Linking a child prototype to a parent prototype

Theory:
To make one constructor "inherit" from another, you set the child's prototype to a new object created via `Object.create(Parent.prototype)` — establishing the chain link explicitly.

Code Example:

```js
function Dog(name, breed) {
  Animal.call(this, name); // borrow Animal's constructor logic for "this"
  this.breed = breed;
}

Dog.prototype = Object.create(Animal.prototype); // link the chain
Dog.prototype.constructor = Dog; // fix up the constructor reference

const rex = new Dog("Rex", "Labrador");
rex.speak(); // "Rex makes a sound" - inherited from Animal.prototype
```

**Explanation:** `Animal.call(this, name)` runs `Animal`'s constructor logic in the context of the new `Dog` instance (setting `this.name`); `Dog.prototype = Object.create(Animal.prototype)` links `Dog`'s prototype chain up to `Animal.prototype`, so `speak()` is found there.

**Key Points:**

- `Animal.call(this, name)` reuses the parent constructor's property-setting logic.
- `Object.create(Animal.prototype)` (not `Animal.prototype` directly) avoids accidentally sharing/mutating the parent's actual prototype object.
- `Dog.prototype.constructor = Dog` is a small cleanup step, fixing a reference that `Object.create()` would otherwise leave pointing at `Animal`.

### Topic 3: Overriding inherited methods

Theory:
A child constructor's prototype can define its OWN version of a method with the same name — this new version takes priority over the parent's, without needing to modify the parent at all.

Code Example:

```js
Dog.prototype.speak = function () {
  console.log(`${this.name} barks`); // overrides Animal.prototype.speak specifically for Dog
};

const rex = new Dog("Rex", "Labrador");
rex.speak(); // "Rex barks" - Dog's own version wins
```

**Explanation:** Since the prototype chain lookup stops at the FIRST match found, `Dog.prototype.speak` is found before ever reaching `Animal.prototype.speak` — this is exactly how overriding works in a prototype chain.

**Key Points:**

- Overriding simply means defining a method with the same name further down the chain (closer to the instance).
- The parent's original method (`Animal.prototype.speak`) is completely unaffected — other Animal instances (that aren't Dogs) still use it normally.
- This overriding behavior is the foundation for what "method overriding" means once you reach classes and polymorphism (Day 70).

### Topic 4: `instanceof` and the prototype chain

Theory:
`instanceof` checks whether a constructor's `.prototype` object appears anywhere in an instance's prototype chain — which is exactly why inherited instances pass multiple `instanceof` checks.

Code Example:

```js
const rex = new Dog("Rex", "Labrador");

console.log(rex instanceof Dog); // true
console.log(rex instanceof Animal); // true - Animal.prototype is further up rex's chain
console.log(rex instanceof Object); // true - every object chain eventually reaches Object.prototype
```

**Explanation:** `rex`'s prototype chain is `rex → Dog.prototype → Animal.prototype → Object.prototype → null` — `instanceof` checks against each of these links, so all three checks return `true`.

**Key Points:**

- `instanceof` walks the entire prototype chain, not just the immediate prototype.
- An inherited instance is simultaneously an instance of its own constructor AND every "ancestor" constructor in the chain.
- This is a useful way to verify your inheritance setup is actually linked correctly.

## Recap

- `new Constructor()` automatically links a new object's prototype to `Constructor.prototype`, enabling shared methods.
- Child prototypes link to parent prototypes via `Object.create(Parent.prototype)`, combined with `Parent.call(this, ...)` to reuse constructor logic.
- Overriding means defining a same-named method further down the chain; `instanceof` confirms the full chain relationship.

## What's Next

Practice for today: `public/coding/JavaScript/day-061-advanced-object-challenge.md`. Day 62 covers advanced object concepts — property descriptors, getters, and setters in full depth.

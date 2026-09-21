---
title: Inheritance with extends and super
slug: day-069-inheritance-with-extends-and-super
dayLabel: Day 69
level: Intermediate
estimatedMinutes: 30
order: 69
track: javascript
---

# Day 69 [Intermediate]: Inheritance with `extends` and `super`

## Goal

Fully understand `extends` and `super` — the modern, clean syntax for prototype inheritance that replaces the manual Day 59/61 approach.

## Prerequisites

- Day 61 (manual prototype inheritance), Day 68 (inheritance preview)

## Explanation

`class Child extends Parent` establishes an inheritance relationship in one line — internally, this does exactly what you built manually back on Day 59/61 (linking `Child.prototype` to `Parent.prototype`), but with far simpler, safer syntax. Inside a child class's constructor, `super(args)` calls the parent class's constructor — this MUST be called before you can use `this` in the child constructor, since the parent's constructor is what actually initializes the base object.

`super.methodName()` (without parentheses after `super` itself) lets a child class call the PARENT's version of a method — useful when overriding a method but still wanting to reuse some of the parent's original behavior.

## Topic by Topic

### Topic 1: `extends` — establishing inheritance

Theory:
`class Child extends Parent { }` links `Child`'s prototype chain to `Parent`, so `Child` instances automatically gain access to `Parent`'s methods.

Code Example:

```js
class Animal {
  constructor(name) {
    this.name = name;
  }
  speak() {
    console.log(`${this.name} makes a sound`);
  }
}

class Dog extends Animal {
  // inherits "speak()" automatically, no extra code needed
}

const rex = new Dog("Rex");
rex.speak(); // "Rex makes a sound" - inherited directly from Animal
```

**Explanation:** `Dog` doesn't define `speak()` itself, but because it `extends Animal`, it inherits `speak()` through the prototype chain — automatically, with no manual `Object.create()` needed.

**Key Points:**

- `extends` automatically sets up the prototype chain link — no manual `Object.create()` required.
- A child class automatically inherits ALL of the parent's methods, unless it overrides them.
- This is the direct, cleaner replacement for the manual pattern from Day 59/61.

### Topic 2: `super()` in the constructor

Theory:
When a child class defines its own `constructor`, it must call `super(args)` before using `this` — this runs the parent's constructor logic on the new object first.

Code Example:

```js
class Dog extends Animal {
  constructor(name, breed) {
    super(name); // MUST be called before using "this" below
    this.breed = breed;
  }
}

const rex = new Dog("Rex", "Labrador");
console.log(rex.name); // "Rex" - set by Animal's constructor via super()
console.log(rex.breed); // "Labrador" - set directly in Dog's constructor
```

**Explanation:** `super(name)` runs `Animal`'s constructor logic (setting `this.name = name`) before `Dog`'s own constructor continues to set `this.breed` — this ordering is enforced by JavaScript itself.

**Key Points:**

- `super(args)` must be called before any use of `this` in a child constructor.
- It runs the parent constructor's logic on the SAME new object being created.
- Forgetting `super()` when the child defines its own constructor throws a `ReferenceError`.

### Topic 3: Overriding methods and calling `super.method()`

Theory:
A child class can define its own version of an inherited method (overriding it), and can still call the parent's original version using `super.methodName()`.

Code Example:

```js
class Dog extends Animal {
  constructor(name, breed) {
    super(name);
    this.breed = breed;
  }

  speak() {
    super.speak(); // calls Animal's original speak() first
    console.log(`${this.name} also barks`);
  }
}

const rex = new Dog("Rex", "Labrador");
rex.speak();
// "Rex makes a sound"
// "Rex also barks"
```

**Explanation:** `super.speak()` explicitly calls the PARENT's version of `speak`, even though `Dog` has its own `speak` method too — this lets you extend/build upon parent behavior instead of completely replacing it.

**Key Points:**

- `super.methodName()` (no `()` directly after `super`) calls the parent's version of that specific method.
- This lets a child class ADD to inherited behavior, rather than only replacing it entirely.
- Extremely useful when a child needs "everything the parent does, plus a bit more."

### Topic 4: When NOT to define a constructor in the child

Theory:
If a child class doesn't need any additional properties beyond the parent's, it doesn't need its own `constructor` at all — JavaScript automatically calls the parent's constructor.

Code Example:

```js
class Cat extends Animal {
  // no constructor needed - Animal's constructor is used automatically
  speak() {
    console.log(`${this.name} meows`);
  }
}

const whiskers = new Cat("Whiskers");
console.log(whiskers.name); // "Whiskers" - Animal's constructor ran automatically
whiskers.speak(); // "Whiskers meows"
```

**Explanation:** `Cat` overrides `speak()` but has no reason to add new properties, so it simply omits its own `constructor` entirely — JavaScript automatically uses `Animal`'s constructor in that case.

**Key Points:**

- A child class without new properties doesn't need to define its own constructor at all.
- JavaScript automatically calls the parent's constructor with the same arguments in that case.
- Only add a constructor when the child genuinely needs additional setup beyond the parent's.

## Recap

- `extends` automatically links a child class's prototype chain to its parent.
- `super(args)` calls the parent's constructor and must run before using `this` in a child constructor.
- `super.methodName()` calls the parent's version of an overridden method, letting you extend rather than fully replace behavior.

## What's Next

Practice for today: `public/coding/JavaScript/day-069-polymorphism.md`. Day 70 covers polymorphism — method overriding in more depth.

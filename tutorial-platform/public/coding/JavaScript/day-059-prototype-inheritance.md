# Day 059 — Prototype Inheritance (Animal->Dog/Cat, Vehicle->Car/Bike)

Matches Tutorial Day 59 (call, apply and bind) — practice previews prototype
inheritance here, ahead of Tutorial Day 61's full explanation. No limit on how many
you build.

## Build these

1. Create a base constructor `Animal(name)` with a `speak()` method on
   `Animal.prototype` that logs `"${name} makes a sound"`.
2. Create `Dog(name, breed)` that "inherits" from `Animal` (research/try using
   `Animal.call(this, name)` inside `Dog`, and
   `Dog.prototype = Object.create(Animal.prototype)` to link the prototypes).
3. Override `speak()` on `Dog.prototype` specifically to log `"${name} barks"` instead
   of the generic animal sound.
4. Create `Cat(name)` similarly, inheriting from `Animal`, overriding `speak()` to log
   `"${name} meows"`.
5. Create instances of both `Dog` and `Cat`, and confirm each correctly uses its OWN
   `speak()`, not the base `Animal` one.

## Concept

6. Build the same inheritance relationship for `Vehicle(brand)` → `Car(brand, doors)`
   and `Vehicle(brand)` → `Bike(brand, hasCarrier)`.
7. Add a method to `Vehicle.prototype` that both `Car` and `Bike` instances can use
   WITHOUT overriding it (confirming shared inheritance still works for non-overridden
   methods).
8. Confirm that a `Dog` instance is both `instanceof Dog` AND `instanceof Animal` — and
   explain why, based on the prototype chain.
9. Try calling a method that only exists on `Cat.prototype` from a `Dog` instance —
   confirm it fails, and explain why (different branches of the chain).

## Interview-style questions

10. What's the purpose of calling `Animal.call(this, name)` inside the `Dog`
    constructor? What would break if you skipped this step?
11. Why is `Dog.prototype = Object.create(Animal.prototype)` used instead of just
    `Dog.prototype = Animal.prototype` directly (hint: think about what happens if you
    then modify `Dog.prototype`)?
12. How does overriding `speak()` on `Dog.prototype` prevent `Dog` instances from using
    the version on `Animal.prototype`, even though both exist in the chain?

## Notes

- This manual prototype-inheritance pattern is exactly what `class ... extends ...`
  (starting Day 66) does automatically and much more readably — today's manual version
  builds a strong foundation for understanding what's happening "under the hood" once
  you get there.
- Don't worry if this feels a bit fiddly with the exact syntax — the goal today is
  exposure and pattern recognition, not perfect memorization.

<!-- codingterminal-solution:start -->

# Day 059 — Solution: Prototype Inheritance

```js
function Animal(name) { this.name = name; }
Animal.prototype.speak = function () { console.log(`${this.name} makes a sound`); };

function Dog(name, breed) { Animal.call(this, name); this.breed = breed; }
Dog.prototype = Object.create(Animal.prototype);
Dog.prototype.constructor = Dog;
Dog.prototype.speak = function () { console.log(`${this.name} barks`); };

function Cat(name) { Animal.call(this, name); }
Cat.prototype = Object.create(Animal.prototype);
Cat.prototype.constructor = Cat;
Cat.prototype.speak = function () { console.log(`${this.name} meows`); };

const dog = new Dog("Rex", "Beagle");
const cat = new Cat("Luna");
dog.speak();
cat.speak();
console.log(dog instanceof Dog, dog instanceof Animal); // true true
```

**6–7. Vehicle inheritance**

```js
function Vehicle(brand) { this.brand = brand; }
Vehicle.prototype.start = function () { return `${this.brand} starts`; };
function Car(brand, doors) { Vehicle.call(this, brand); this.doors = doors; }
Car.prototype = Object.create(Vehicle.prototype);
Car.prototype.constructor = Car;
function Bike(brand, hasCarrier) { Vehicle.call(this, brand); this.hasCarrier = hasCarrier; }
Bike.prototype = Object.create(Vehicle.prototype);
Bike.prototype.constructor = Bike;
```

**8.** `dog` is an instance of both because its prototype is linked to `Animal.prototype` through `Dog.prototype`.

**9.** A Dog cannot use a Cat-only method; its chain goes through Dog, Animal, and Object, not Cat.

## Interview-style questions

**10.** `Animal.call(this, name)` initializes the inherited `name` property on the new Dog instance.

**11.** `Object.create` gives Dog a separate prototype object linked to Animal. Assigning `Dog.prototype = Animal.prototype` would make changes intended for Dog affect Animal too.

**12.** Property lookup finds Dog's own `speak` first, so it shadows the same-named method farther up the chain.

<!-- codingterminal-solution:end -->


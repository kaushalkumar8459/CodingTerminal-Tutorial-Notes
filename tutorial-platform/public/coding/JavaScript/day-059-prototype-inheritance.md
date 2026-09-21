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

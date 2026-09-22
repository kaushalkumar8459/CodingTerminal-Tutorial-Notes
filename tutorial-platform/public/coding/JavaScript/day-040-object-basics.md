# Day 040 — Object Basics

Matches Tutorial Day 40 (Advanced Array Methods). No limit on how many you solve.

## Basic

1. Create an object representing a person with `name`, `age`, and `city`.
2. Access a property using dot notation.
3. Access a property using bracket notation.
4. Add a new property to an existing object.
5. Update the value of an existing property.

## Concept

6. Remove a property from an object using the `delete` keyword.
7. Count how many properties an object has (using `for...in` or `Object.keys().length`
   if you want to peek ahead).
8. Check whether a specific property exists on an object using the `in` operator
   (e.g. `"age" in person`).
9. Given an object representing a product, update its price and add a new `discount` property.
10. Create a function `createUser(name, age)` that returns a new object with those values.
11. Given two separately created objects, compare whether they have the same `name`
    property value (not the whole object, just one property).
12. Build a simple "settings" object with several boolean flags (e.g. `darkMode: true,
notifications: false`), then toggle one flag.
13. Search through an object's properties (using `for...in`) to find which one has the
    highest numeric value.

## Interview-style questions

14. What's the difference between dot notation and bracket notation for accessing
    object properties — and when would you be FORCED to use bracket notation (hint:
    property names with spaces or stored in a variable)?
15. Does modifying an object property change the object itself, or create a new one?
16. What does the `in` operator check, exactly, compared to just checking if
    `object.property` is truthy?

## Notes

- Bracket notation (`obj["key"]`) is required whenever the property name is dynamic
  (stored in a variable) or contains characters that aren't valid in dot notation
  (like spaces or hyphens).
- Objects are mutable, just like arrays — updating a property changes the object
  directly, it does not create a new object automatically.

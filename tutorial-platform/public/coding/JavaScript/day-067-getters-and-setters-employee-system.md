# Day 067 — Getters & Setters: Employee Management System

Matches Tutorial Day 67 (Class Properties and Methods). No limit on how far you extend
this project.

## Project: Employee Management System

Build a `class Employee` with:

1. Private fields `#salary` and `#department`.
2. A `get salary()` getter that returns the current salary.
3. A `set salary(value)` setter that validates the value is a positive number before
   accepting it (log an error and reject invalid updates).
4. A `get department()` getter and `set department(value)` setter (validate it's a
   non-empty string).
5. A static method `Employee.compareBySalary(empA, empB)` usable with `.sort()`.
6. An instance method `getAnnualSalary()` that uses the private `#salary` internally.

## Concept

7. Create an array of 5-6 `Employee` instances and sort them using
   `Employee.compareBySalary`.
8. Add a static property `Employee.count` that automatically increments every time a
   new `Employee` is created (increment it inside the constructor).
9. Add a `get isSenior()` getter that returns `true` if annual salary is above a
   threshold.
10. Try setting `employee.salary = -500` and confirm your setter correctly rejects it
    without crashing the program.

## Interview-style questions

11. Why use a getter/setter pair for `salary` instead of just making `#salary` a
    regular (non-private) property?
12. What's the benefit of a static property like `Employee.count` over an external
    global variable tracking the same thing?
13. How would you decide whether a piece of employee data should be public, private
    with a getter/setter, or fully private with no external access at all?

## Notes

- This project directly combines everything from today's tutorial — private fields,
  getters/setters, and static members — into one realistic system.
- Keep validation logic INSIDE the setters, not scattered across your code wherever
  salary happens to be updated — that's the whole point of encapsulating it this way.

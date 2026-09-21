# Day 069 — Polymorphism (calculateSalary, calculateArea, calculatePayment)

Matches Tutorial Day 69 (Inheritance with extends and super). No limit on how many you build.

## Basic

1. Create a base `class Shape` with a method `calculateArea()` that returns `0` by
   default (meant to be overridden).
2. Create `class Circle extends Shape` that overrides `calculateArea()` using
   `Math.PI * radius ** 2`.
3. Create `class Rectangle extends Shape` that overrides `calculateArea()` using
   `length * width`.
4. Create `class Triangle extends Shape` that overrides `calculateArea()` using
   `0.5 * base * height`.
5. Create an array containing one instance of each shape, and loop through calling
   `.calculateArea()` on each — notice each uses its own correct formula automatically.

## Concept

6. Create a base `class Employee` with a method `calculateSalary()` returning a basic
   fixed calculation.
7. Create `class Manager extends Employee` and `class Intern extends Employee`, each
   overriding `calculateSalary()` with their own specific formula (e.g. manager gets a
   bonus, intern gets a stipend).
8. Create a base `class PaymentMethod` with a method `calculatePayment(amount)`.
9. Create `class CreditCardPayment extends PaymentMethod` and
   `class CashPayment extends PaymentMethod`, each overriding `calculatePayment` (e.g.
   credit card adds a small processing fee, cash doesn't).
10. Write a function `processPayment(paymentMethodInstance, amount)` that calls
    `.calculatePayment(amount)` WITHOUT knowing or caring which specific subclass it
    received — demonstrating polymorphism directly.

## Interview-style questions

11. What is polymorphism, in your own words, based on what you just built?
12. Why is it useful that `processPayment()` doesn't need to know which specific
    payment method class it's dealing with?
13. How does polymorphism rely on both inheritance (Day 69) and method overriding
    together?

## Notes

- The core idea: the SAME method call (`.calculateArea()`, `.calculatePayment()`)
  behaves differently depending on which specific subclass instance you're calling it
  on — that's polymorphism in action.
- This pattern is extremely common in real applications (payment processors, shape
  libraries, notification systems) — you're building genuinely realistic examples today.

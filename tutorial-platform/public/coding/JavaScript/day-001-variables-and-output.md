# Day 001 — Variables & Output

Matches Tutorial Day 1 (Introduction to JavaScript). Goal: get comfortable printing
output and storing values, before worrying about "real" data types (that's Day 2).

No limit on how many of these you solve — do as many as you need until it feels easy.

## Basic

1. Print `"Hello, World!"` to the console.
2. Print your name using `console.log()`.
3. Store your age in a variable and print it.
4. Store two numbers in variables and print their sum.
5. Store your first name and last name in two variables and print them together.
6. Print the result of `10 + 5`, `10 - 5`, `10 * 5`, `10 / 5` on separate lines.
7. Store a price in a variable and print `"Price: " + price`.
8. Print three separate `console.log()` statements on three separate lines.
9. Store a boolean value (`true`/`false`) in a variable and print it.
10. Print the same value twice using two different variables that point to it.

## Concept (understand _why_, not just _how_)

11. Declare a variable with `let` without giving it a value, print it — what do you see, and why?
12. Try declaring the same variable name twice with `let` in the same scope — what happens?
13. Declare a variable with `const` and try to reassign it — what error do you get, and why does it happen?
14. Calculate the area of a rectangle (length × width) using variables.
15. Calculate the area of a circle (π × r²) using variables (`Math.PI` is available).
16. Convert a Celsius value to Fahrenheit using a formula and variables.
17. Swap the values of two variables without using a third/temporary variable.
18. Calculate the total price of 3 items, each with its own price variable.
19. Calculate what percentage one number is of another (e.g., 45 out of 60).
20. Calculate simple interest given principal, rate, and time as variables.

## Interview-style questions

21. What is the difference between `var`, `let`, and `const`? Give one example of each.
22. Why is `const` not the same as "the value can never change" (think objects/arrays)?
23. What does "variables are containers for values" actually mean in your own words?

## Challenge

24. Build a **basic salary calculator**: given `basicPay`, `hra`, and `deductions` as
    variables, calculate and print the final `netSalary`.

## Notes

- Keep every answer in a separate `.js` file (or one file with clear section comments)
  so you can revisit and compare your solutions later.
- Don't move to Day 2 until swapping variables (#17) and the salary calculator (#24)
  feel comfortable — those two catch most beginner mistakes.

<!-- codingterminal-solution:start -->

# Day 001 — Solution: Variables & Output

Reference solutions for `day-001-variables-and-output.md`. Where a problem could
reasonably be solved with a built-in method OR by hand, both approaches are shown —
try the practice file yourself first before checking these.

## Basic

**1. Print `"Hello, World!"`**

```js
console.log("Hello, World!");
```

**2. Print your name**

```js
console.log("Kabir");
```

**3. Store your age and print it**

```js
const age = 25;
console.log(age);
```

**4. Sum of two numbers**

```js
const a = 10;
const b = 20;
console.log(a + b); // 30
```

**5. First name + last name**

```js
// Approach A — template literal (modern, built-in string feature)
const firstName = "Asha";
const lastName = "Verma";
console.log(`${firstName} ${lastName}`);

// Approach B — plain concatenation (no template literal)
console.log(firstName + " " + lastName);
```

**6. Arithmetic on separate lines**

```js
console.log(10 + 5); // 15
console.log(10 - 5); // 5
console.log(10 * 5); // 50
console.log(10 / 5); // 2
```

**7. Price string**

```js
const price = 499;

// Approach A — concatenation with +
console.log("Price: " + price);

// Approach B — template literal
console.log(`Price: ${price}`);
```

**8. Three separate console.log statements**

```js
console.log("Line 1");
console.log("Line 2");
console.log("Line 3");
```

**9. Boolean value**

```js
const isActive = true;
console.log(isActive);
```

**10. Same value, two variables**

```js
const original = "shared value";
const alias = original;
console.log(original);
console.log(alias);
```

## Concept

**11. `let` without a value**

```js
let city;
console.log(city); // undefined — declared but never assigned a value yet
```

**12. Redeclaring the same `let` name**

```js
let score = 10;
// let score = 20; // SyntaxError: Identifier 'score' has already been declared
```

**13. Reassigning a `const`**

```js
const pi = 3.14;
// pi = 3.14159; // TypeError: Assignment to constant variable.
// const creates a read-only BINDING — the variable name can never point to a new value.
```

**14. Area of a rectangle**

```js
const length = 5;
const width = 4;
const area = length * width;
console.log(area); // 20
```

**15. Area of a circle**

```js
const radius = 3;

// Approach A — built-in Math.PI and exponent operator
const areaA = Math.PI * radius ** 2;
console.log(areaA.toFixed(2));

// Approach B — without ** (manual multiplication instead of exponent)
const areaB = Math.PI * radius * radius;
console.log(areaB.toFixed(2));
```

**16. Celsius to Fahrenheit**

```js
const celsius = 30;
const fahrenheit = celsius * (9 / 5) + 32;
console.log(fahrenheit); // 86
```

**17. Swap two variables**

```js
let x = 1;
let y = 2;

// Approach A — built-in array destructuring (modern, no temp variable)
[x, y] = [y, x];
console.log(x, y); // 2 1

// Approach B — manual arithmetic swap (no destructuring, no temp variable)
let p = 1;
let q = 2;
p = p + q; // p = 3
q = p - q; // q = 1
p = p - q; // p = 2
console.log(p, q); // 2 1

// Approach C — classic temp-variable swap (uses a third variable — simplest to read)
let m = 1;
let n = 2;
const temp = m;
m = n;
n = temp;
console.log(m, n); // 2 1
```

**18. Total price of 3 items**

```js
const item1 = 100;
const item2 = 250;
const item3 = 75;
const total = item1 + item2 + item3;
console.log(total); // 425
```

**19. Percentage of one number vs another**

```js
const part = 45;
const whole = 60;
const percentage = (part / whole) * 100;
console.log(percentage); // 75
```

**20. Simple interest**

```js
const principal = 10000;
const rate = 5; // percent
const time = 2; // years

const simpleInterest = (principal * rate * time) / 100;
console.log(simpleInterest); // 1000
```

## Interview-style questions

**21. `var` vs `let` vs `const`**

- `var`: function-scoped, can be redeclared and reassigned. Avoid in modern code.
- `let`: block-scoped, can be reassigned, cannot be redeclared in the same scope.
- `const`: block-scoped, cannot be reassigned or redeclared — the binding is fixed.

```js
var a = 1; // function-scoped
let b = 2; // block-scoped, reassignable
const c = 3; // block-scoped, fixed binding
```

**22. Why `const` doesn't mean "never changes"**

```js
const user = { name: "Zoe" };
user.name = "Ann"; // allowed! const only locks the variable BINDING, not the object's contents
console.log(user.name); // "Ann"

// user = {}; // TypeError — this WOULD be blocked, because it reassigns the binding itself
```

**23. "Variables are containers for values"**

In plain words: a variable is a labeled box. `let score = 10;` creates a box named
`score` and puts `10` inside it. Later, `console.log(score)` looks inside the box and
reads whatever value is currently there — the box's label (`score`) stays the same,
even if what's inside it changes.

## Challenge

**24. Basic salary calculator**

```js
function calculateNetSalary(basicPay, hra, deductions) {
  const netSalary = basicPay + hra - deductions;
  return netSalary;
}

const netSalary = calculateNetSalary(30000, 8000, 2500);
console.log(netSalary); // 35500
```

<!-- codingterminal-solution:end -->


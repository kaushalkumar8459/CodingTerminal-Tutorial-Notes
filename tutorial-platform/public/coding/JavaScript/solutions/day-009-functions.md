# Day 009 — Solution: Functions

Reference solutions for `day-009-functions.md`. Try the practice file yourself first
before checking these.

## Basic

**1-4. Basic arithmetic functions**

```js
function add(a, b) {
  return a + b;
}
function subtract(a, b) {
  return a - b;
}
function multiply(a, b) {
  return a * b;
}
function divide(a, b) {
  if (b === 0) return "Cannot divide by zero";
  return a / b;
}

console.log(add(2, 3), subtract(5, 2), multiply(4, 3), divide(10, 0));
// 5 3 12 "Cannot divide by zero"
```

**5-6. `isEven`/`isOdd`**

```js
function isEven(n) {
  return n % 2 === 0;
}
function isOdd(n) {
  return !isEven(n); // reuses isEven, as suggested
}

console.log(isEven(4), isOdd(4)); // true false
```

**7-8. `square`/`cube`**

```js
function square(n) {
  return n * n;
}
function cube(n) {
  return n ** 3;
}

console.log(square(5), cube(3)); // 25 27
```

**9. `greet(name)`**

```js
function greet(name) {
  return "Hello, " + name;
}

console.log(greet("Meera")); // "Hello, Meera"
```

**10. `isPositive`**

```js
function isPositive(n) {
  return n > 0;
}

console.log(isPositive(-3)); // false
```

## Concept

**11. `isPrime(n)`**

```js
function isPrime(n) {
  if (n <= 1) return false;
  for (let i = 2; i <= Math.sqrt(n); i++) {
    if (n % i === 0) return false;
  }
  return true;
}

console.log(isPrime(17)); // true
console.log(isPrime(15)); // false
```

**12-13. `findMax`/`findMin` of three**

```js
// Approach A — using built-in Math.max()/Math.min()
function findMaxA(a, b, c) {
  return Math.max(a, b, c);
}
function findMinA(a, b, c) {
  return Math.min(a, b, c);
}

// Approach B — without Math.max()/Math.min() (manual comparisons)
function findMaxB(a, b, c) {
  let max = a;
  if (b > max) max = b;
  if (c > max) max = c;
  return max;
}
function findMinB(a, b, c) {
  let min = a;
  if (b < min) min = b;
  if (c < min) min = c;
  return min;
}

console.log(findMaxA(3, 9, 5), findMinB(3, 9, 5)); // 9 3
```

**14. `calculatePercentage`**

```js
function calculatePercentage(score, total) {
  return (score / total) * 100;
}

console.log(calculatePercentage(45, 60)); // 75
```

**15. `factorial(n)` using a loop**

```js
function factorial(n) {
  let result = 1;
  for (let i = 2; i <= n; i++) {
    result *= i;
  }
  return result;
}

console.log(factorial(5)); // 120
```

**16. `sumRange(start, end)`**

```js
function sumRange(start, end) {
  let sum = 0;
  for (let i = start; i <= end; i++) {
    sum += i;
  }
  return sum;
}

console.log(sumRange(1, 10)); // 55
```

**17. `reverseNumber(n)`**

```js
function reverseNumber(n) {
  let reversed = 0;
  let num = Math.abs(n);
  while (num > 0) {
    reversed = reversed * 10 + (num % 10);
    num = Math.floor(num / 10);
  }
  return reversed;
}

console.log(reverseNumber(1234)); // 4321
```

**18. `countDigits(n)`**

```js
// Approach A — math-based (no string conversion)
function countDigitsA(n) {
  if (n === 0) return 1;
  let count = 0;
  let num = Math.abs(n);
  while (num > 0) {
    count++;
    num = Math.floor(num / 10);
  }
  return count;
}

// Approach B — built-in string conversion
function countDigitsB(n) {
  return String(Math.abs(n)).length;
}

console.log(countDigitsA(4567), countDigitsB(4567)); // 4 4
```

**19. No-parameter greeting function**

```js
function getWelcomeMessage() {
  return "Welcome to the course!";
}

console.log(getWelcomeMessage());
```

**20. A function calling other functions internally**

```js
function describeNumber(n) {
  const evenOrOdd = isEven(n) ? "even" : "odd";
  const sign = isPositive(n) ? "positive" : "not positive";
  return `${n} is ${evenOrOdd} and ${sign}`;
}

console.log(describeNumber(-4)); // "-4 is even and not positive"
```

## Interview-style questions

**21. Parameters vs arguments**

Parameters are the placeholder names listed in a function's definition (`function
add(a, b)` — `a` and `b` are parameters). Arguments are the actual values supplied
when the function is called (`add(2, 3)` — `2` and `3` are arguments).

**22. `return` vs `console.log()`**

`return` sends a usable value back to whatever called the function, so it can be
stored in a variable and reused elsewhere. `console.log()` only displays a value once,
in the console — it can't be captured or reused. Mixing these up is a very common
beginner bug (expecting a logged value to be usable elsewhere).

**23. Can a function call itself?**

Yes — this is called recursion. You must be careful to include a clear **base case**
that stops the recursion; without one, the function keeps calling itself forever,
eventually causing a "Maximum call stack size exceeded" (stack overflow) error.

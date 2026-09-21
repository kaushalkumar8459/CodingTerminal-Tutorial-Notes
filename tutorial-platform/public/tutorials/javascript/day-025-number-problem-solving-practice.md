---
title: Number Problem Solving Practice
slug: day-025-number-problem-solving-practice
dayLabel: Day 25
level: Beginner
estimatedMinutes: 25
order: 25
track: javascript
---

# Day 25 [Beginner]: Number Problem Solving Practice

## Goal

Consolidate everything learned so far about loops and conditions by solving a focused set of classic number problems, and understand the reasoning behind each one.

## Prerequisites

- Day 16–24 (all of conditions, loops, break/continue, for...of/for...in)

## Explanation

Today doesn't introduce new syntax — it's a dedicated practice day to make sure number-based problem solving feels natural. Classic problems like checking for prime numbers, reversing digits, and calculating factorials show up constantly, both in interviews and as building blocks for larger programs.

The goal isn't just to get the right answer, but to get comfortable **breaking a problem into small steps** before writing any code — this habit is the single biggest predictor of successfully solving new, unfamiliar problems later.

## Topic by Topic

### Topic 1: Even/odd and reverse number

Theory:
These are the simplest number problems — checking `% 2` for even/odd, and extracting digits one at a time (using `% 10` and `/ 10`) to reverse a number.

Code Example:

```js
function reverseNumber(n) {
  let reversed = 0;
  while (n > 0) {
    let lastDigit = n % 10;
    reversed = reversed * 10 + lastDigit;
    n = Math.floor(n / 10);
  }
  return reversed;
}

console.log(reverseNumber(1234)); // 4321
```

**Explanation:** Each loop step pulls off the last digit (`n % 10`), adds it to `reversed` (shifted left by one place), and removes that digit from `n` (`Math.floor(n / 10)`) — repeating until nothing is left.

**Key Points:**

- `% 10` gets the last digit; `Math.floor(n / 10)` removes it.
- This digit-by-digit pattern is the foundation for many other number problems (palindrome, digit sum, Armstrong numbers).
- Understanding this one pattern well unlocks several related problems at once.

### Topic 2: Prime number checking

Theory:
A number is prime if it's greater than 1 and has no divisors other than 1 and itself.

Code Example:

```js
function isPrime(n) {
  if (n <= 1) return false;
  for (let i = 2; i <= Math.sqrt(n); i++) {
    if (n % i === 0) return false;
  }
  return true;
}

console.log(isPrime(17)); // true
console.log(isPrime(15)); // false (divisible by 3 and 5)
```

**Explanation:** We only need to check divisors up to the square root of `n`, since any larger factor would have a matching smaller factor already checked — a small but meaningful optimization over checking all the way up to `n`.

**Key Points:**

- A prime number has no divisors besides 1 and itself.
- Checking only up to `Math.sqrt(n)` is enough — no need to go further.
- `n <= 1` should always return `false` immediately (0 and 1 are not prime).

### Topic 3: Factorial and Fibonacci

Theory:
Factorial multiplies a number by every positive integer below it (`5! = 5×4×3×2×1`). Fibonacci builds a sequence where each number is the sum of the two before it.

Code Example:

```js
function factorial(n) {
  let result = 1;
  for (let i = 2; i <= n; i++) {
    result *= i;
  }
  return result;
}

function fibonacciSequence(count) {
  let sequence = [0, 1];
  for (let i = 2; i < count; i++) {
    sequence.push(sequence[i - 1] + sequence[i - 2]);
  }
  return sequence;
}

console.log(factorial(5)); // 120
console.log(fibonacciSequence(8)); // [0,1,1,2,3,5,8,13]
```

**Explanation:** `factorial` multiplies step by step; `fibonacciSequence` builds an array where each new entry adds the previous two — both are classic examples of building up a result incrementally inside a loop.

**Key Points:**

- Factorial: multiply, starting from 1, up through `n`.
- Fibonacci: each new value is the sum of the previous two.
- Both patterns — accumulate a result, build up a sequence — reappear constantly in programming.

### Topic 4: A structured approach for any new number problem

Theory:
When facing an unfamiliar number problem, a consistent process helps: (1) understand the definition precisely, (2) work through one example by hand, (3) identify the repeating step, (4) write the loop.

Practical:
Before coding, write the steps as plain-English comments first — this practice alone prevents most "I don't know where to start" moments.

**Key Points:**

- Work through a small example by hand before writing any code.
- Identify what repeats — that's almost always your loop body.
- This structured process matters more long-term than memorizing any single problem's solution.

## Recap

- Digit extraction (`% 10`, `/ 10`) is a foundational pattern behind many number problems.
- Prime checking only needs divisors up to the square root of the number.
- Factorial and Fibonacci both build up a result incrementally — a very common pattern.

## What's Next

Practice for today: `public/coding/JavaScript/day-025-pattern-problems.md`. Day 26 is a dedicated string problem-solving practice day.

# Day 021 — Solution: More Number Problems

Reference solutions for `day-021-more-number-problems.md`.

## Basic

**1. Find the GCD of two numbers**

Approach A — Euclidean algorithm (fast, standard):

```js
function gcd(a, b) {
  while (b !== 0) {
    [a, b] = [b, a % b];
  }
  return Math.abs(a);
}

console.log(gcd(48, 18)); // 6
```

Approach B — brute-force loop (manual, slower):

```js
function gcdBruteForce(a, b) {
  let result = 1;
  const smaller = Math.min(Math.abs(a), Math.abs(b));
  for (let i = 1; i <= smaller; i++) {
    if (a % i === 0 && b % i === 0) {
      result = i;
    }
  }
  return result;
}

console.log(gcdBruteForce(48, 18)); // 6
```

**2. Find the LCM of two numbers**

```js
function gcd(a, b) {
  while (b !== 0) [a, b] = [b, a % b];
  return Math.abs(a);
}

function lcm(a, b) {
  return Math.abs(a * b) / gcd(a, b);
}

console.log(lcm(4, 6)); // 12
```

**3. Count the number of digits in a number**

Approach A — using `String()` (built-in):

```js
function countDigits(num) {
  return String(Math.abs(num)).length;
}

console.log(countDigits(45872)); // 5
```

Approach B — manual, without converting to a string:

```js
function countDigitsManual(num) {
  num = Math.abs(num);
  if (num === 0) return 1;
  let count = 0;
  while (num > 0) {
    num = Math.floor(num / 10);
    count++;
  }
  return count;
}

console.log(countDigitsManual(45872)); // 5
```

**4. Find the sum of the digits of a number**

```js
function sumOfDigits(num) {
  num = Math.abs(num);
  let sum = 0;
  while (num > 0) {
    sum += num % 10;
    num = Math.floor(num / 10);
  }
  return sum;
}

console.log(sumOfDigits(1234)); // 10
```

**5. Find the product of the digits of a number**

```js
function productOfDigits(num) {
  num = Math.abs(num);
  let product = 1;
  while (num > 0) {
    product *= num % 10;
    num = Math.floor(num / 10);
  }
  return product;
}

console.log(productOfDigits(1234)); // 24
console.log(productOfDigits(105)); // 0 (any zero digit makes the product 0)
```

## Concept

**6. Convert a decimal number to binary manually (no `.toString(2)`)**

```js
function decimalToBinary(num) {
  if (num === 0) return "0";
  let n = Math.abs(num);
  let binary = "";
  while (n > 0) {
    binary = (n % 2) + binary;
    n = Math.floor(n / 2);
  }
  return num < 0 ? "-" + binary : binary;
}

console.log(decimalToBinary(13)); // "1101"
console.log(decimalToBinary(0)); // "0"
```

**7. Convert a binary string to a decimal number manually (no `parseInt(x, 2)`)**

```js
function binaryToDecimal(binaryStr) {
  let decimal = 0;
  for (let i = 0; i < binaryStr.length; i++) {
    const digit = Number(binaryStr[i]);
    const power = binaryStr.length - 1 - i;
    decimal += digit * Math.pow(2, power);
  }
  return decimal;
}

console.log(binaryToDecimal("1101")); // 13
```

**8. GCD using the Euclidean algorithm (repeated modulo)**

```js
function gcdEuclidean(a, b) {
  a = Math.abs(a);
  b = Math.abs(b);
  while (b !== 0) {
    const remainder = a % b;
    a = b;
    b = remainder;
  }
  return a;
}

console.log(gcdEuclidean(1071, 462)); // 21
```

Why it's faster: brute-force checks every number up to the smaller value (O(min(a, b))
work), while the Euclidean algorithm shrinks the problem by taking a modulo each step,
reaching the answer in a small number of steps (roughly proportional to the number of
digits, not the size of the numbers).

**9. Find the GCD of a list of numbers**

```js
function gcdTwo(a, b) {
  while (b !== 0) [a, b] = [b, a % b];
  return Math.abs(a);
}

function gcdOfList(numbers) {
  return numbers.reduce((acc, num) => gcdTwo(acc, num));
}

console.log(gcdOfList([12, 18, 24])); // 6
console.log(gcdOfList([5, 10, 15, 25])); // 5
```

**10. Find GCD and LCM together, and verify `GCD * LCM === num1 * num2`**

```js
function gcd(a, b) {
  while (b !== 0) [a, b] = [b, a % b];
  return Math.abs(a);
}

function gcdAndLcm(num1, num2) {
  const g = gcd(num1, num2);
  const l = Math.abs(num1 * num2) / g;
  return { gcd: g, lcm: l };
}

const num1 = 15;
const num2 = 20;
const { gcd: g, lcm: l } = gcdAndLcm(num1, num2);

console.log(g, l); // 5 60
console.log(g * l === num1 * num2); // true
```

## Interview-style questions

**11. What is the relationship between GCD and LCM of two numbers?**

For any two positive integers `a` and `b`:

```
GCD(a, b) * LCM(a, b) === a * b
```

The GCD is the largest number that divides both evenly; the LCM is the smallest number
both divide into evenly. Their product always equals the product of the original two
numbers.

**12. Why is the Euclidean algorithm generally faster than checking every number up to the smaller value?**

Brute-force scans every integer from 1 up to `min(a, b)`, so it takes time proportional
to the size of the numbers themselves (O(n)). The Euclidean algorithm instead replaces
`(a, b)` with `(b, a % b)` each step — this shrinks the numbers geometrically (roughly
by the golden ratio in the worst case), so it finishes in a number of steps proportional
to the number of _digits_, not the value — much faster for large numbers.

**13. What's the simplest way to check a manual binary conversion is correct?**

Compare the manual result against the built-in method purely as a test, not as the
main logic:

```js
function decimalToBinary(num) {
  let n = Math.abs(num);
  if (n === 0) return "0";
  let binary = "";
  while (n > 0) {
    binary = (n % 2) + binary;
    n = Math.floor(n / 2);
  }
  return binary;
}

const testValues = [0, 5, 13, 255, 1024];
testValues.forEach((value) => {
  const manual = decimalToBinary(value);
  const builtIn = value.toString(2);
  console.log(value, manual, builtIn, manual === builtIn ? "✅" : "❌");
});
```

This way the built-in method is only used to double-check correctness during
development — the actual solution stays manual.

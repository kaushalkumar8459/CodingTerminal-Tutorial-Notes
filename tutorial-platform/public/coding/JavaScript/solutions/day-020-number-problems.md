# Day 020 — Solution: Number Problems

Reference solutions for `day-020-number-problems.md`. Try the practice file yourself
first before checking these.

## Basic

**1. Reverse the digits**

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

console.log(reverseNumber(456)); // 654
```

**2. Palindrome check**

```js
function isPalindromeNumber(n) {
  return n === reverseNumber(n);
}

console.log(isPalindromeNumber(121)); // true
console.log(isPalindromeNumber(123)); // false
```

**3. Prime check**

```js
function isPrime(n) {
  if (n <= 1) return false;
  for (let i = 2; i <= Math.sqrt(n); i++) {
    if (n % i === 0) return false;
  }
  return true;
}

console.log(isPrime(29)); // true
```

**4. Factorial**

```js
function factorial(n) {
  let result = 1;
  for (let i = 2; i <= n; i++) result *= i;
  return result;
}

console.log(factorial(6)); // 720
```

**5. First 10 Fibonacci numbers**

```js
function firstNFibonacci(count) {
  const sequence = [0, 1];
  for (let i = 2; i < count; i++) {
    sequence.push(sequence[i - 1] + sequence[i - 2]);
  }
  return sequence;
}

console.log(firstNFibonacci(10)); // [0,1,1,2,3,5,8,13,21,34]
```

## Concept

**6. Armstrong number**

```js
function isArmstrong(n) {
  const digits = String(n).split("");
  const power = digits.length;
  const sum = digits.reduce(
    (total, digit) => total + Number(digit) ** power,
    0,
  );
  return sum === n;
}

console.log(isArmstrong(153)); // true (1^3 + 5^3 + 3^3 = 153)
```

**7. Perfect number**

```js
function isPerfectNumber(n) {
  let sum = 0;
  for (let i = 1; i < n; i++) {
    if (n % i === 0) sum += i;
  }
  return sum === n;
}

console.log(isPerfectNumber(6)); // true (1 + 2 + 3 = 6)
console.log(isPerfectNumber(28)); // true (1+2+4+7+14 = 28)
```

**8. Strong number**

```js
function factorial(n) {
  let result = 1;
  for (let i = 2; i <= n; i++) result *= i;
  return result;
}

function isStrongNumber(n) {
  const digits = String(n).split("").map(Number);
  const sum = digits.reduce((total, digit) => total + factorial(digit), 0);
  return sum === n;
}

console.log(isStrongNumber(145)); // true (1! + 4! + 5! = 1 + 24 + 120 = 145)
```

**9. All primes between 1 and 100**

```js
const primes = [];
for (let n = 2; n <= 100; n++) {
  if (isPrime(n)) primes.push(n);
}
console.log(primes);
```

**10. Sum of first N Fibonacci numbers**

```js
function sumFirstNFibonacci(count) {
  return firstNFibonacci(count).reduce((sum, n) => sum + n, 0);
}

console.log(sumFirstNFibonacci(10)); // 88
```

**11. Palindrome without converting to a string (pure math)**

```js
function isPalindromePureMath(n) {
  const original = n;
  let reversed = 0;
  let num = n;
  while (num > 0) {
    reversed = reversed * 10 + (num % 10);
    num = Math.floor(num / 10);
  }
  return original === reversed;
}

console.log(isPalindromePureMath(1221)); // true
```

**12. Both prime AND palindrome**

```js
function isPrimeAndPalindrome(n) {
  return isPrime(n) && isPalindromeNumber(n);
}

console.log(isPrimeAndPalindrome(131)); // true — prime and a palindrome
console.log(isPrimeAndPalindrome(29)); // false — prime, but not a palindrome
```

## Interview-style questions

**13. What makes a number prime + the square root optimization**

A prime number is greater than 1 and has no divisors other than 1 and itself. The
optimization: you only need to check divisors up to `Math.sqrt(n)` — any factor
LARGER than the square root would have a matching factor SMALLER than the square
root that you'd have already found, so checking further is redundant.

**14. String reversal vs pure math palindrome check**

String reversal (`.split("").reverse().join("")`) is shorter to write but creates
extra arrays/strings in memory. The pure math approach (digit extraction with `%` and
`/`) avoids any string conversion entirely, which can matter for performance-sensitive
code, though both give identical correct results.

**15. Why loops are safer than recursion for factorial**

Each recursive call adds a new frame to the call stack (Day 79) — for a very large
`n`, this can exceed the stack's size limit and throw a "Maximum call stack size
exceeded" error. A loop uses a single stack frame regardless of how large `n` is,
so it doesn't have this risk.

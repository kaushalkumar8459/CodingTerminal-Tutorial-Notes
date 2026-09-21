# Day 004 — Solution: Arithmetic Operators

Reference solutions for `day-004-arithmetic-operators.md`. Try the practice file
yourself first before checking these.

## Basic

**1. Even or odd using `%`**

```js
function isEven(n) {
  return n % 2 === 0;
}

console.log(isEven(4)); // true
console.log(isEven(7)); // false
```

**2. Last digit using `%`**

```js
const number = 4567;
console.log(number % 10); // 7
```

**3. Sum of digits**

```js
// Approach A — using % and / in a loop (no string conversion)
function sumDigitsA(n) {
  let sum = 0;
  let num = Math.abs(n);
  while (num > 0) {
    sum += num % 10;
    num = Math.floor(num / 10);
  }
  return sum;
}
console.log(sumDigitsA(123)); // 6

// Approach B — convert to a string and split into characters (built-in string methods)
function sumDigitsB(n) {
  return String(Math.abs(n))
    .split("")
    .reduce((sum, digit) => sum + Number(digit), 0);
}
console.log(sumDigitsB(123)); // 6
```

**4. Square of a number**

```js
const n = 5;
console.log(n ** 2); // 25 — using the exponent operator
console.log(n * n); // 25 — without the exponent operator
```

**5. Cube of a number**

```js
const n = 3;
console.log(n ** 3); // 27
console.log(n * n * n); // 27 — without **
```

**6. Quotient and remainder**

```js
const a = 17;
const b = 5;
console.log(Math.floor(a / b)); // quotient: 3
console.log(a % b); // remainder: 2
```

**7. Area of a rectangle**

```js
function rectangleArea(length, width) {
  return length * width;
}

console.log(rectangleArea(5, 4)); // 20
```

**8. Area of a triangle**

```js
function triangleArea(base, height) {
  return 0.5 * base * height;
}

console.log(triangleArea(6, 4)); // 12
```

**9. Average of 3 numbers**

```js
function averageOfThree(a, b, c) {
  return (a + b + c) / 3;
}

console.log(averageOfThree(10, 20, 30)); // 20
```

**10. Average of an array**

```js
const numbers = [10, 20, 30, 40];

// Approach A — built-in reduce()
const averageA = numbers.reduce((sum, n) => sum + n, 0) / numbers.length;
console.log(averageA); // 25

// Approach B — manual loop
let total = 0;
for (let i = 0; i < numbers.length; i++) {
  total += numbers[i];
}
const averageB = total / numbers.length;
console.log(averageB); // 25
```

## Concept

**11. Remainder calculator**

```js
function remainder(a, b) {
  return a % b;
}

console.log(remainder(17, 5)); // 2
```

**12. Perimeter of a rectangle**

```js
function rectanglePerimeter(length, width) {
  return 2 * (length + width);
}

console.log(rectanglePerimeter(5, 4)); // 18
```

**13. Area of a circle**

```js
function circleArea(radius) {
  return Math.PI * radius ** 2;
}

console.log(circleArea(3).toFixed(2)); // "28.27"
```

**14. Total pay from hours and rate**

```js
function calculatePay(hoursWorked, hourlyRate) {
  return hoursWorked * hourlyRate;
}

console.log(calculatePay(40, 25)); // 1000
```

**15. Positive, negative, or zero**

```js
function describeSign(n) {
  if (n > 0) return "positive";
  if (n < 0) return "negative";
  return "zero";
}

console.log(describeSign(-5)); // "negative"
```

**16. Minutes to hours and remaining minutes**

```js
function minutesToHoursAndMinutes(totalMinutes) {
  const hours = Math.floor(totalMinutes / 60);
  const minutes = totalMinutes % 60;
  return `${hours} hours ${minutes} minutes`;
}

console.log(minutesToHoursAndMinutes(130)); // "2 hours 10 minutes"
```

**17. Speed from distance and time**

```js
function calculateSpeed(distance, time) {
  return distance / time;
}

console.log(calculateSpeed(150, 3)); // 50
```

**18. Average of three scores, rounded**

```js
function averageScore(a, b, c) {
  const average = (a + b + c) / 3;
  return Number(average.toFixed(2));
}

console.log(averageScore(85, 90, 78)); // 84.33
```

**19. Step-by-step compound calculation**

```js
let value = 5;
console.log(value); // 5

value += 10;
console.log(value); // 15

value *= 2;
console.log(value); // 30

value -= 5;
console.log(value); // 25
```

**20. `average(...numbers)` with rest parameters**

```js
function average(...numbers) {
  const total = numbers.reduce((sum, n) => sum + n, 0);
  return total / numbers.length;
}

console.log(average(1, 2, 3)); // 2
console.log(average(10, 20, 30, 40)); // 25
```

## Interview-style questions

**21. `%` vs `/`**

`/` performs division and returns the full quotient (including decimals). `%`
(modulo) returns only the REMAINDER left over after dividing — `17 / 5` is `3.4`,
while `17 % 5` is `2`.

**22. Why `0.1 + 0.2 !== 0.3`**

Computers store decimal numbers in binary, and some decimal fractions (like `0.1`)
can't be represented exactly in binary — leading to a tiny rounding error. This
happens in nearly every programming language, not just JavaScript.

```js
console.log(0.1 + 0.2); // 0.30000000000000004
```

**23. `**`vs`Math.pow()`\*\*

Both raise a number to a power. `**` is the modern operator syntax (`2 ** 3`);
`Math.pow(2, 3)` is the older function-call syntax. They produce identical results —
`**` is generally preferred in new code for its shorter, more readable syntax.

## Challenge

**24. Marks percentage calculator**

```js
function calculatePercentage(marksScored, totalMarks) {
  const percentage = (marksScored / totalMarks) * 100;
  return Number(percentage.toFixed(2));
}

console.log(calculatePercentage(450, 500)); // 90
console.log(calculatePercentage(333, 500)); // 66.6
```

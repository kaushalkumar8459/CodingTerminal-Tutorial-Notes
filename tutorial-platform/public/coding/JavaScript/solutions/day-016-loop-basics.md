# Day 016 — Solution: Loop Basics

Reference solutions for `day-016-loop-basics.md`. Try the practice file yourself
first before checking these.

## Basic

**1-3. Print 1-100, evens, odds**

```js
for (let i = 1; i <= 100; i++) console.log(i);

for (let i = 2; i <= 50; i += 2) console.log(i); // evens

for (let i = 1; i <= 50; i += 2) console.log(i); // odds
```

**4. Sum of 1 to 100**

```js
// Approach A — loop
let sumA = 0;
for (let i = 1; i <= 100; i++) sumA += i;
console.log(sumA); // 5050

// Approach B — built-in math formula (Gauss's trick), no loop needed
const n = 100;
const sumB = (n * (n + 1)) / 2;
console.log(sumB); // 5050
```

**5. Multiplication table of 7**

```js
for (let i = 1; i <= 10; i++) {
  console.log(`7 x ${i} = ${7 * i}`);
}
```

**6. Countdown from 100 to 1**

```js
for (let i = 100; i >= 1; i--) console.log(i);
```

**7. Every 5th number from 0 to 100**

```js
for (let i = 0; i <= 100; i += 5) console.log(i);
```

**8. Count divisible by both 3 and 5**

```js
let count = 0;
for (let i = 1; i <= 100; i++) {
  if (i % 3 === 0 && i % 5 === 0) count++;
}
console.log(count); // 6 (15, 30, 45, 60, 75, 90)
```

**9. Squares of 1 to 10**

```js
for (let i = 1; i <= 10; i++) console.log(i ** 2);
```

**10. Factorial with a loop**

```js
function factorial(n) {
  let result = 1;
  for (let i = 2; i <= n; i++) result *= i;
  return result;
}

console.log(factorial(5)); // 120
```

## Concept

**11. Multiplication tables 1 through 5**

```js
for (let table = 1; table <= 5; table++) {
  for (let i = 1; i <= 10; i++) {
    console.log(`${table} x ${i} = ${table * i}`);
  }
}
```

**12. Sum only even numbers from 1 to 100**

```js
let evenSum = 0;
for (let i = 2; i <= 100; i += 2) evenSum += i;
console.log(evenSum); // 2550
```

**13. Largest number in a list (no `Math.max`)**

```js
const numbers = [4, 19, 2, 45, 12];
let largest = numbers[0];

for (let i = 1; i < numbers.length; i++) {
  if (numbers[i] > largest) largest = numbers[i];
}

console.log(largest); // 45
```

**14. Count vowels using a loop**

```js
const text = "Hello World";
const vowels = "aeiouAEIOU";
let vowelCount = 0;

for (let i = 0; i < text.length; i++) {
  if (vowels.includes(text[i])) vowelCount++;
}

console.log(vowelCount); // 3
```

**15. Countdown then "Liftoff!"**

```js
for (let i = 10; i >= 1; i--) console.log(i);
console.log("Liftoff!");
```

## Interview-style questions

**16. The three parts of a `for` loop**

`for (initialization; condition; increment)` — initialization runs once at the start
(setting up a counter), the condition is checked before every iteration (loop
continues while true), and the increment runs after every iteration's body finishes.

**17. Forgetting to update the counter**

The condition never becomes false, so the loop runs forever — an infinite loop that
freezes the browser tab or Node process.

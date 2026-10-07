# Day 027 — Module 2 Assessment (30 Problems)

Matches Tutorial Day 27 (Module 2 Practical Lab). This is the Module 2 checkpoint test —
10 beginner, 10 easy, 10 intermediate. No limit on revisiting or adding more after.

## Beginner (10)

1. Check if a number is positive, negative, or zero.
2. Print all even numbers from 1 to 50.
3. Find the sum of numbers from 1 to 100.
4. Check if a number is even or odd.
5. Print the multiplication table of a given number.
6. Find the largest of three numbers.
7. Reverse the digits of a number.
8. Count the vowels in a string.
9. Print a right-angled triangle pattern of stars.
10. Check whether a number is within a given range (e.g. 1–100).

## Easy (10)

11. Check if a number is prime.
12. Check if a string is a palindrome.
13. Find the factorial of a number.
14. Print the first N Fibonacci numbers.
15. Find the GCD of two numbers.
16. Count the frequency of each character in a string.
17. Print a hollow square pattern.
18. Find duplicate characters in a string.
19. Build a grade calculator using `if/else if` for a given average.
20. Solve FizzBuzz (1 to 50: Fizz for multiples of 3, Buzz for 5, FizzBuzz for both).

## Intermediate (10)

21. Check if a number is an Armstrong number.
22. Convert a decimal number to binary manually.
23. Find all prime numbers between 1 and 100 and print them in one line, comma-separated.
24. Check if two strings are anagrams of each other.
25. Build a full Student Result System for 3 students (reuse/extend today's tutorial project).
26. Find the second largest number in a fixed array without using `.sort()`.
27. Print Floyd's Triangle for a given number of rows.
28. Given a sentence, find the most frequently occurring word.
29. Check if a string has balanced parentheses.
30. Given an array of numbers, separate them into evens and odds into two new arrays,
    then print both.

## Notes

- Treat this like a real timed test first (try to finish in one sitting), then go back
  and polish/extend any weak answers afterward — that mirrors how real assessments work.
- If more than a few of the "Beginner" set feel difficult, it's worth revisiting Days
  16–21 before continuing further into Module 2's intermediate problems.

<!-- codingterminal-solution:start -->

# Day 027 — Solution: Module 2 Assessment

```js
const isPrime = (n) =>
  n >= 2 &&
  Array.from({ length: Math.floor(Math.sqrt(n)) - 1 }, (_, i) => i + 2).every(
    (d) => n % d !== 0,
  );
const gcd = (a, b) => {
  while (b) [a, b] = [b, a % b];
  return Math.abs(a);
};
const reverse = (text) => [...text].reverse().join("");
const vowels = (text) =>
  [...text.toLowerCase()].filter((c) => "aeiou".includes(c)).length;
const frequency = (text) => {
  const result = {};
  for (const c of text) result[c] = (result[c] || 0) + 1;
  return result;
};
const duplicateCharacters = (text) =>
  Object.keys(frequency(text)).filter((c) => frequency(text)[c] > 1);
const isAnagram = (a, b) =>
  [...a.toLowerCase()].sort().join("") === [...b.toLowerCase()].sort().join("");
const isArmstrong = (number) => {
  const digits = String(number).split("");
  return (
    digits.reduce((sum, d) => sum + Number(d) ** digits.length, 0) === number
  );
};
const balanced = (text) => {
  let count = 0;
  for (const c of text) {
    if (c === "(") count++;
    if (c === ")" && --count < 0) return false;
  }
  return count === 0;
};
```

**1–10 Beginner**

```js
const sign = (n) => (n > 0 ? "positive" : n < 0 ? "negative" : "zero");
for (let n = 2; n <= 50; n += 2) console.log(n);
console.log((100 * 101) / 2);
const parity = (n) => (n % 2 === 0 ? "even" : "odd");
function table(n) {
  for (let i = 1; i <= 10; i++) console.log(`${n} x ${i} = ${n * i}`);
}
const largest = (a, b, c) => Math.max(a, b, c);
const reverseNumber = (n) =>
  Number(reverse(String(Math.abs(n)))) * Math.sign(n || 1);
function triangle(n) {
  for (let i = 1; i <= n; i++) console.log("*".repeat(i));
}
const inRange = (n, low, high) => n >= low && n <= high;
```

**11–20 Easy**

```js
const factorial = (n) => {
  let result = 1;
  for (let i = 2; i <= n; i++) result *= i;
  return result;
};
function fibonacci(count) {
  const result = [];
  let a = 0,
    b = 1;
  for (let i = 0; i < count; i++) {
    result.push(a);
    [a, b] = [b, a + b];
  }
  return result;
}
function hollowSquare(n) {
  for (let r = 1; r <= n; r++) {
    let line = "";
    for (let c = 1; c <= n; c++)
      line += r === 1 || r === n || c === 1 || c === n ? "*" : " ";
    console.log(line);
  }
}
function grade(average) {
  return average >= 90
    ? "A"
    : average >= 80
      ? "B"
      : average >= 70
        ? "C"
        : average >= 60
          ? "D"
          : "F";
}
for (let n = 1; n <= 50; n++)
  console.log(
    n % 15 === 0 ? "FizzBuzz" : n % 3 === 0 ? "Fizz" : n % 5 === 0 ? "Buzz" : n,
  );
```

**21–30 Intermediate**

```js
function decimalToBinary(n) {
  if (n === 0) return "0";
  let result = "";
  while (n) {
    result = (n % 2) + result;
    n = Math.floor(n / 2);
  }
  return result;
}
const primesTo100 = [];
for (let n = 2; n <= 100; n++) if (isPrime(n)) primesTo100.push(n);
function studentResults(students) {
  return students.map(({ name, marks }) => ({
    name,
    total: marks.reduce((a, b) => a + b, 0),
    average: marks.reduce((a, b) => a + b, 0) / marks.length,
  }));
}
function secondLargest(numbers) {
  return [...new Set(numbers)].sort((a, b) => b - a)[1];
}
function floyd(rows) {
  let n = 1;
  for (let r = 1; r <= rows; r++) {
    let line = "";
    for (let c = 1; c <= r; c++) line += `${n++} `;
    console.log(line);
  }
}
function mostFrequentWord(sentence) {
  const counts = {};
  for (const word of sentence.toLowerCase().split(/\s+/))
    counts[word] = (counts[word] || 0) + 1;
  return Object.keys(counts).reduce((a, b) => (counts[a] >= counts[b] ? a : b));
}
const separate = (numbers) => ({
  evens: numbers.filter((n) => n % 2 === 0),
  odds: numbers.filter((n) => n % 2 !== 0),
});
```

The assessment combines the same patterns from Days 16–26: conditions, loops, functions, strings, numeric algorithms, and patterns.

<!-- codingterminal-solution:end -->


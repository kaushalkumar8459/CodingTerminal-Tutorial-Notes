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

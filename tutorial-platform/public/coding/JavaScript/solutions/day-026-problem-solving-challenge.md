# Day 026 — Solution: Problem-Solving Challenge

**1. Multiple of 4 and 6**

```js
const isMultipleOfBoth = (number) => number % 4 === 0 && number % 6 === 0;
```

**2. Numbers not divisible by 3**

```js
for (let number = 1; number <= 50; number++)
  if (number % 3 !== 0) console.log(number);
```

**3. Words starting with a vowel**

```js
function vowelStartCount(sentence) {
  let count = 0;
  for (const word of sentence.split(/\s+/))
    if ("aeiou".includes(word[0].toLowerCase())) count++;
  return count;
}
```

**4. Count negatives**

```js
const negativeCount = (numbers) =>
  numbers.filter((number) => number < 0).length;
```

Manual:

```js
function negativeCountManual(numbers) {
  let count = 0;
  for (const number of numbers) if (number < 0) count++;
  return count;
}
```

**5. Second largest without sorting**

```js
function secondLargest(numbers) {
  let largest = -Infinity;
  let second = -Infinity;
  for (const number of numbers) {
    if (number > largest) {
      second = largest;
      largest = number;
    } else if (number > second && number < largest) second = number;
  }
  return second;
}
```

**6. Only digits**

```js
const onlyDigits = (text) =>
  text !== "" &&
  [...text].every((character) => character >= "0" && character <= "9");
```

**7. Reverse digits one per line**

```js
function printDigitsReverse(number) {
  for (const digit of String(Math.abs(number)).split("").reverse())
    console.log(digit);
}
```

**8. Shortest word**

```js
function shortestWord(sentence) {
  let shortest = sentence.trim().split(/\s+/)[0] || "";
  for (const word of sentence.trim().split(/\s+/))
    if (word.length < shortest.length) shortest = word;
  return shortest;
}
```

**9. Leap year**

```js
const isLeapYear = (year) =>
  year % 400 === 0 || (year % 4 === 0 && year % 100 !== 0);
```

**10. Count primes**

```js
function isPrime(number) {
  if (number < 2) return false;
  for (let divisor = 2; divisor * divisor <= number; divisor++)
    if (number % divisor === 0) return false;
  return true;
}
const primeCount = (numbers) => numbers.filter(isPrime).length;
```

**11. Remove vowels**

```js
const removeVowels = (text) =>
  text
    .split("")
    .filter((character) => !"aeiouAEIOU".includes(character))
    .join("");
```

**12. Happy number**

```js
function isHappy(number) {
  const seen = new Set();
  while (number !== 1 && !seen.has(number)) {
    seen.add(number);
    let sum = 0;
    for (const digit of String(number)) sum += Number(digit) ** 2;
    number = sum;
  }
  return number === 1;
}
```

**13. String rotation**

```js
const isRotation = (first, second) =>
  first.length === second.length && (first + first).includes(second);
```

**14. Capitalize only the sentence start**

```js
function capitalizeSentence(sentence) {
  const trimmed = sentence.trim();
  return trimmed ? trimmed[0].toUpperCase() + trimmed.slice(1) : "";
}
```

**15. Sum even-indexed elements**

```js
function sumEvenIndexes(numbers) {
  let sum = 0;
  for (let index = 0; index < numbers.length; index += 2) sum += numbers[index];
  return sum;
}
```

**16. FizzBuzz**

```js
for (let number = 1; number <= 50; number++) {
  let result = "";
  if (number % 3 === 0) result += "Fizz";
  if (number % 5 === 0) result += "Buzz";
  console.log(result || number);
}
```

**17. Balanced parentheses**

```js
function balancedParentheses(text) {
  let balance = 0;
  for (const character of text) {
    if (character === "(") balance++;
    if (character === ")" && --balance < 0) return false;
  }
  return balance === 0;
}
```

**18. Trailing zeros in a factorial**

```js
function factorialTrailingZeros(number) {
  let zeros = 0;
  for (let divisor = 5; divisor <= number; divisor *= 5)
    zeros += Math.floor(number / divisor);
  return zeros;
}
```

**19. Most frequent word**

```js
function mostFrequentWord(sentence) {
  const counts = {};
  let best = "";
  for (const word of sentence.toLowerCase().match(/[a-z0-9]+/g) || []) {
    counts[word] = (counts[word] || 0) + 1;
    if (!best || counts[word] > counts[best]) best = word;
  }
  return best;
}
```

**20. Evens before odds**

```js
const evensFirst = (numbers) =>
  numbers
    .filter((number) => number % 2 === 0)
    .concat(numbers.filter((number) => number % 2 !== 0));
```

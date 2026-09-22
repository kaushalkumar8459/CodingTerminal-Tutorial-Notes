# Day 007 — Solution: Conditional Practice

Reference solutions for `day-007-conditional-practice.md`. Try the practice file
yourself first before checking these.

## Basic

**1. Positive, negative, or zero**

```js
function describeNumber(n) {
  if (n > 0) return "positive";
  if (n < 0) return "negative";
  return "zero";
}

console.log(describeNumber(-3)); // "negative"
```

**2. Even or odd**

```js
function isEven(n) {
  return n % 2 === 0;
}

console.log(isEven(7) ? "even" : "odd"); // "odd"
```

**3. Largest of 2**

```js
function largerOfTwo(a, b) {
  if (a > b) return a;
  return b;
}

console.log(largerOfTwo(5, 9)); // 9
```

**4. Largest of 3**

```js
function largerOfThree(a, b, c) {
  if (a >= b && a >= c) return a;
  if (b >= a && b >= c) return b;
  return c;
}

console.log(largerOfThree(5, 9, 3)); // 9
```

**5. In range 1–10**

```js
function isInRange1To10(n) {
  return n >= 1 && n <= 10;
}

console.log(isInRange1To10(15)); // false
```

**6. Vowel check**

```js
function isVowel(char) {
  const lower = char.toLowerCase();
  if (
    lower === "a" ||
    lower === "e" ||
    lower === "i" ||
    lower === "o" ||
    lower === "u"
  ) {
    return true;
  }
  return false;
}

console.log(isVowel("E")); // true
```

**7. Leap year**

```js
function isLeapYear(year) {
  return (year % 4 === 0 && year % 100 !== 0) || year % 400 === 0;
}

console.log(isLeapYear(2024)); // true
console.log(isLeapYear(2100)); // false
```

**8. Voting eligibility**

```js
function canVote(age) {
  return age >= 18;
}

console.log(canVote(17)); // false
```

**9. Valid triangle**

```js
function isValidTriangle(a, b, c) {
  return a + b > c && b + c > a && a + c > b;
}

console.log(isValidTriangle(3, 4, 5)); // true
console.log(isValidTriangle(1, 1, 10)); // false
```

**10. Multiple of both 3 and 5**

```js
function isMultipleOf3And5(n) {
  return n % 3 === 0 && n % 5 === 0;
}

console.log(isMultipleOf3And5(30)); // true
console.log(isMultipleOf3And5(9)); // false
```

## Concept

**11. Grade calculator**

```js
function getGrade(marks) {
  if (marks >= 90) return "A";
  if (marks >= 75) return "B";
  if (marks >= 60) return "C";
  return "F";
}

console.log(getGrade(82)); // "B"
```

**12. Age category checker**

```js
function getAgeCategory(age) {
  if (age <= 12) return "child";
  if (age <= 19) return "teen";
  if (age <= 59) return "adult";
  return "senior";
}

console.log(getAgeCategory(65)); // "senior"
```

**13. BMI category checker**

```js
function getBmiCategory(heightMeters, weightKg) {
  const bmi = weightKg / heightMeters ** 2;
  if (bmi < 18.5) return "underweight";
  if (bmi < 25) return "normal";
  if (bmi < 30) return "overweight";
  return "obese";
}

console.log(getBmiCategory(1.75, 70)); // "normal"
```

**14. Shipping cost calculator**

```js
function getShippingCost(orderTotal) {
  if (orderTotal >= 500) return 0;
  return 50;
}

console.log(getShippingCost(600)); // 0
console.log(getShippingCost(200)); // 50
```

**15. Traffic light description**

```js
function describeTrafficLight(color) {
  if (color === "red") return "stop";
  if (color === "yellow") return "slow down";
  if (color === "green") return "go";
  return "unknown signal";
}

console.log(describeTrafficLight("yellow")); // "slow down"
```

**16. Discount calculator with tiers**

```js
function getDiscount(purchaseTotal) {
  if (purchaseTotal >= 5000) return 20;
  if (purchaseTotal >= 2000) return 10;
  if (purchaseTotal >= 500) return 5;
  return 0;
}

console.log(getDiscount(3000)); // 10
```

**17. Login validity**

```js
function isValidLogin(
  enteredUsername,
  enteredPassword,
  storedUsername,
  storedPassword,
) {
  return (
    enteredUsername === storedUsername && enteredPassword === storedPassword
  );
}

console.log(isValidLogin("asha", "1234", "asha", "1234")); // true
```

**18. Season from month number**

```js
function getSeason(month) {
  if (month === 12 || month === 1 || month === 2) return "winter";
  if (month >= 3 && month <= 5) return "spring";
  if (month >= 6 && month <= 8) return "summer";
  return "autumn";
}

console.log(getSeason(7)); // "summer"
```

**19. Weekday/weekend checker**

```js
function getDayType(dayNumber) {
  if (dayNumber === 6 || dayNumber === 7) return "weekend";
  return "weekday";
}

console.log(getDayType(6)); // "weekend"
```

**20. Temperature description**

```js
function describeTemperature(celsius) {
  if (celsius <= 0) return "freezing";
  if (celsius <= 15) return "cold";
  if (celsius <= 25) return "warm";
  return "hot";
}

console.log(describeTemperature(30)); // "hot"
```

## Interview-style questions

**21. Nested `if` vs combining with `&&`**

Use nested `if` when the inner check should only make sense/run within the context of
the outer condition, and you may want DIFFERENT actions at each level. Use `&&`
combined in a single `if` when you just need one final true/false answer from multiple
conditions together — it's usually more concise and readable for that case.

**22. `else if` vs multiple separate `if` statements**

An `else if` chain guarantees only ONE branch runs, and stops checking further
conditions once one matches. Multiple separate `if` statements each get checked
independently, so more than one could run — which can cause the wrong behavior if
your logic assumes only one should ever match.

**23. Why order matters in `else if` range checks**

```js
// WRONG order - marks of 95 would incorrectly match the FIRST condition it reaches
function gradeWrong(marks) {
  if (marks >= 60) return "C or better"; // this catches EVERYTHING >= 60, even 95!
  if (marks >= 90) return "A"; // never reached
}
```

Since `else if` stops at the first TRUE match, broader/lower conditions must come
LAST, and more specific/higher conditions must come FIRST — otherwise a broad
condition "steals" cases meant for a later, more specific one.

## Mini Project

**24. Student Grade Calculator**

```js
function studentGradeCalculator(marks) {
  const total = marks.reduce((sum, mark) => sum + mark, 0);
  const average = total / marks.length;

  let grade;
  if (average >= 90) grade = "A";
  else if (average >= 75) grade = "B";
  else if (average >= 60) grade = "C";
  else grade = "F";

  return { total, average: Number(average.toFixed(2)), grade };
}

console.log(studentGradeCalculator([85, 90, 78, 92, 88]));
// { total: 433, average: 86.6, grade: "B" }
```
